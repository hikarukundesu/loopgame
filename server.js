const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are required");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
});

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cloud_users (
      id UUID PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cloud_game_saves (
      user_id UUID PRIMARY KEY REFERENCES cloud_users(id) ON DELETE CASCADE,
      save_data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

function isValidSaveData(saveData) {
  return saveData && typeof saveData === "object" && typeof saveData.money === "number";
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid Supabase session" });
    }

    req.user = data.user;
    next();
  } catch (error) {
    console.error("Supabase auth verification failed", error);
    return res.status(500).json({ error: "Authentication check failed" });
  }
}

async function ensureCloudUser(user) {
  await pool.query(
    `
      INSERT INTO cloud_users (id, email)
      VALUES ($1, $2)
      ON CONFLICT (id)
      DO UPDATE SET email = EXCLUDED.email
    `,
    [user.id, user.email || `${user.id}@users.local`]
  );
}

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
});

app.get("/api/config", (_req, res) => {
  res.json({
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
  });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  await ensureCloudUser(req.user);
  const saveResult = await pool.query(
    "SELECT updated_at FROM cloud_game_saves WHERE user_id = $1",
    [req.user.id]
  );

  res.json({
    email: req.user.email,
    hasSave: saveResult.rowCount > 0,
  });
});

app.get("/api/save", authMiddleware, async (req, res) => {
  await ensureCloudUser(req.user);

  const result = await pool.query(
    "SELECT save_data, updated_at FROM cloud_game_saves WHERE user_id = $1",
    [req.user.id]
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

  await ensureCloudUser(req.user);

  const result = await pool.query(
    `
      INSERT INTO cloud_game_saves (user_id, save_data, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET save_data = EXCLUDED.save_data, updated_at = NOW()
      RETURNING updated_at
    `,
    [req.user.id, JSON.stringify(saveData)]
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
