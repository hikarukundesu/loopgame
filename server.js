const express = require("express");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
});

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      username VARCHAR(24) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS game_saves (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      save_data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

function createToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (_) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function isValidSaveData(saveData) {
  return saveData && typeof saveData === "object" && typeof saveData.money === "number";
}

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
  const username = normalizeUsername(req.body.username);
  const password = String(req.body.password || "");

  if (!username || username.length < 3 || username.length > 24) {
    return res.status(400).json({ error: "Username must be 3-24 characters" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();

  try {
    const result = await pool.query(
      "INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3) RETURNING id, username",
      [id, username, passwordHash]
    );
    const user = result.rows[0];
    res.status(201).json({
      token: createToken(user),
      username: user.username,
      hasSave: false,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Username already exists" });
    }
    throw error;
  }
});

app.post("/api/auth/login", async (req, res) => {
  const username = normalizeUsername(req.body.username);
  const password = String(req.body.password || "");

  const result = await pool.query(
    "SELECT id, username, password_hash FROM users WHERE username = $1",
    [username]
  );
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const saveResult = await pool.query(
    "SELECT updated_at FROM game_saves WHERE user_id = $1",
    [user.id]
  );

  res.json({
    token: createToken(user),
    username: user.username,
    hasSave: saveResult.rowCount > 0,
  });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  res.json({ username: req.user.username });
});

app.get("/api/save", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT save_data, updated_at FROM game_saves WHERE user_id = $1",
    [req.user.sub]
  );

  if (!result.rowCount) {
    return res.json({ saveData: null, updatedAt: null });
  }

  res.json({
    saveData: result.rows[0].save_data,
    updatedAt: result.rows[0].updated_at,
  });
});

app.put("/api/save", authMiddleware, async (req, res) => {
  const saveData = req.body.saveData;
  if (!isValidSaveData(saveData)) {
    return res.status(400).json({ error: "Invalid save data" });
  }

  const result = await pool.query(
    `
      INSERT INTO game_saves (user_id, save_data, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET save_data = EXCLUDED.save_data, updated_at = NOW()
      RETURNING updated_at
    `,
    [req.user.sub, JSON.stringify(saveData)]
  );

  res.json({ ok: true, updatedAt: result.rows[0].updated_at });
});

app.use(express.static(__dirname));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

ensureSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Loopgame server listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
