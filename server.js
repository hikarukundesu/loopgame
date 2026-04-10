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
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const APP_BASE_URL = process.env.APP_BASE_URL || "";

const PREMIUM_PACKS = [
  {
    id: "starter",
    name: "スターターパック",
    priceJpy: 120,
    moneyAmount: 1200,
    description: "まず試したい人向けの小さめチャージ。",
  },
  {
    id: "boost",
    name: "ブーストパック",
    priceJpy: 490,
    moneyAmount: 5600,
    description: "序盤の車や家に届きやすい定番チャージ。",
  },
  {
    id: "vault",
    name: "ボールトパック",
    priceJpy: 980,
    moneyAmount: 12000,
    description: "長く遊ぶ人向けの大きめチャージ。",
  },
];

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are required");
}

let stripe = null;
if (STRIPE_SECRET_KEY) {
  // Lazy-optional Stripe setup so local development still boots without payment env vars.
  stripe = require("stripe")(STRIPE_SECRET_KEY);
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

function getPremiumPack(packId) {
  return PREMIUM_PACKS.find((pack) => pack.id === packId) || null;
}

function isStripeReady() {
  return Boolean(stripe);
}

function createDefaultSaveData(initialMoney = 0) {
  return {
    money: initialMoney,
    inventory: {
      car: 0,
      bike: 0,
      gear: 0,
    },
    house: {
      level: 0,
      buildingName: null,
      totalEarned: 0,
      streamCount: 0,
    },
    purchasedItems: [],
    savedAt: Date.now(),
  };
}

function applyMoneyGrantToSaveData(saveData, grantAmount) {
  const baseSave = saveData && typeof saveData === "object"
    ? {
        ...saveData,
        inventory: { car: 0, bike: 0, gear: 0, ...(saveData.inventory || {}) },
        house: {
          level: 0,
          buildingName: null,
          totalEarned: 0,
          streamCount: 0,
          ...(saveData.house || {}),
        },
        purchasedItems: Array.isArray(saveData.purchasedItems) ? saveData.purchasedItems : [],
      }
    : createDefaultSaveData();

  baseSave.money = Math.max(0, Math.round(Number(baseSave.money) || 0) + Math.round(Number(grantAmount) || 0));
  baseSave.savedAt = Date.now();
  return baseSave;
}

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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS stripe_checkout_sessions (
      session_id TEXT PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES cloud_users(id) ON DELETE CASCADE,
      pack_id TEXT NOT NULL,
      amount_jpy INTEGER NOT NULL,
      money_amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'created',
      payment_status TEXT,
      checkout_url TEXT,
      payment_intent_id TEXT,
      granted_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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

async function ensureCloudUser(user, client = pool) {
  await client.query(
    `
      INSERT INTO cloud_users (id, email)
      VALUES ($1, $2)
      ON CONFLICT (id)
      DO UPDATE SET email = EXCLUDED.email
    `,
    [user.id, user.email || `${user.id}@users.local`]
  );
}

async function ensureCloudUserPlaceholder(userId, client = pool) {
  await client.query(
    `
      INSERT INTO cloud_users (id, email)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
    `,
    [userId, `${userId}@users.local`]
  );
}

async function upsertCheckoutSessionRecord({ sessionId, userId, pack, checkoutUrl, status, paymentStatus, paymentIntentId }, client = pool) {
  await client.query(
    `
      INSERT INTO stripe_checkout_sessions (
        session_id,
        user_id,
        pack_id,
        amount_jpy,
        money_amount,
        status,
        payment_status,
        checkout_url,
        payment_intent_id,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      ON CONFLICT (session_id)
      DO UPDATE SET
        status = EXCLUDED.status,
        payment_status = EXCLUDED.payment_status,
        checkout_url = COALESCE(EXCLUDED.checkout_url, stripe_checkout_sessions.checkout_url),
        payment_intent_id = COALESCE(EXCLUDED.payment_intent_id, stripe_checkout_sessions.payment_intent_id),
        updated_at = NOW()
    `,
    [
      sessionId,
      userId,
      pack.id,
      pack.priceJpy,
      pack.moneyAmount,
      status || "created",
      paymentStatus || null,
      checkoutUrl || null,
      paymentIntentId || null,
    ]
  );
}

async function grantCheckoutSession({ sessionId, userId, pack, paymentStatus, paymentIntentId }, client = pool) {
  await client.query("BEGIN");

  try {
    await ensureCloudUserPlaceholder(userId, client);
    const existingResult = await client.query(
      `
        SELECT *
        FROM stripe_checkout_sessions
        WHERE session_id = $1
        FOR UPDATE
      `,
      [sessionId]
    );

    if (!existingResult.rowCount) {
      throw new Error("Checkout session record not found");
    }

    const existing = existingResult.rows[0];
    if (existing.user_id !== userId) {
      throw new Error("Checkout session owner mismatch");
    }

    if (existing.granted_at) {
      const saveResult = await client.query(
        "SELECT save_data, updated_at FROM cloud_game_saves WHERE user_id = $1",
        [userId]
      );
      await client.query("COMMIT");
      return {
        alreadyGranted: true,
        grantedMoneyAmount: existing.money_amount,
        saveData: saveResult.rows[0]?.save_data || null,
        updatedAt: saveResult.rows[0]?.updated_at || null,
      };
    }

    const saveResult = await client.query(
      "SELECT save_data FROM cloud_game_saves WHERE user_id = $1 FOR UPDATE",
      [userId]
    );
    const nextSaveData = applyMoneyGrantToSaveData(saveResult.rows[0]?.save_data || null, pack.moneyAmount);

    await client.query(
      `
        INSERT INTO cloud_game_saves (user_id, save_data, updated_at)
        VALUES ($1, $2::jsonb, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET save_data = EXCLUDED.save_data, updated_at = NOW()
      `,
      [userId, JSON.stringify(nextSaveData)]
    );

    await client.query(
      `
        UPDATE stripe_checkout_sessions
        SET
          status = 'paid',
          payment_status = $2,
          payment_intent_id = COALESCE($3, payment_intent_id),
          granted_at = NOW(),
          updated_at = NOW()
        WHERE session_id = $1
      `,
      [sessionId, paymentStatus || "paid", paymentIntentId || null]
    );

    await client.query("COMMIT");
    return {
      alreadyGranted: false,
      grantedMoneyAmount: pack.moneyAmount,
      saveData: nextSaveData,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

function getBaseUrl(req) {
  if (APP_BASE_URL) {
    return APP_BASE_URL.replace(/\/+$/, "");
  }
  return `${req.protocol}://${req.get("host")}`;
}

function requireStripeReady(res) {
  if (!isStripeReady()) {
    res.status(503).json({ error: "Stripe is not configured on the server" });
    return false;
  }
  return true;
}

app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  if (!isStripeReady() || !STRIPE_WEBHOOK_SECRET) {
    return res.status(404).send("Webhook is not configured");
  }

  const signature = req.headers["stripe-signature"];
  if (!signature) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Stripe webhook signature check failed", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        const pack = getPremiumPack(session.metadata?.packId);
        const userId = session.metadata?.userId;
        if (pack && userId) {
          await ensureCloudUserPlaceholder(userId);
          await upsertCheckoutSessionRecord({
            sessionId: session.id,
            userId,
            pack,
            checkoutUrl: session.url || null,
            status: "completed",
            paymentStatus: session.payment_status,
            paymentIntentId: session.payment_intent || null,
          });
          await grantCheckoutSession({
            sessionId: session.id,
            userId,
            pack,
            paymentStatus: session.payment_status,
            paymentIntentId: session.payment_intent || null,
          });
        }
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      await pool.query(
        `
          UPDATE stripe_checkout_sessions
          SET status = 'expired', payment_status = $2, updated_at = NOW()
          WHERE session_id = $1
        `,
        [session.id, session.payment_status || "unpaid"]
      );
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handling failed", error);
    return res.status(500).send("Webhook processing failed");
  }
});

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
});

app.get("/api/config", (_req, res) => {
  res.json({
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    stripeEnabled: isStripeReady(),
    premiumPacks: PREMIUM_PACKS,
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

app.post("/api/payments/checkout", authMiddleware, async (req, res) => {
  if (!requireStripeReady(res)) {
    return;
  }

  const pack = getPremiumPack(req.body?.packId);
  if (!pack) {
    return res.status(400).json({ error: "Unknown premium pack" });
  }

  try {
    await ensureCloudUser(req.user);
    const baseUrl = getBaseUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?payment=cancel`,
      client_reference_id: req.user.id,
      customer_email: req.user.email || undefined,
      metadata: {
        userId: req.user.id,
        packId: pack.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "jpy",
            unit_amount: pack.priceJpy,
            product_data: {
              name: `${pack.name} / ${pack.moneyAmount} Money`,
              description: pack.description,
            },
          },
        },
      ],
    });

    await upsertCheckoutSessionRecord({
      sessionId: session.id,
      userId: req.user.id,
      pack,
      checkoutUrl: session.url,
      status: "created",
      paymentStatus: session.payment_status || "unpaid",
      paymentIntentId: session.payment_intent || null,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed", error);
    res.status(500).json({ error: "Checkout session creation failed" });
  }
});

app.post("/api/payments/confirm", authMiddleware, async (req, res) => {
  if (!requireStripeReady(res)) {
    return;
  }

  const sessionId = req.body?.sessionId;
  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    await ensureCloudUser(req.user);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || session.metadata?.userId !== req.user.id) {
      return res.status(403).json({ error: "This checkout session does not belong to the current user" });
    }

    const pack = getPremiumPack(session.metadata?.packId);
    if (!pack) {
      return res.status(400).json({ error: "Premium pack metadata is invalid" });
    }

    await upsertCheckoutSessionRecord({
      sessionId: session.id,
      userId: req.user.id,
      pack,
      checkoutUrl: session.url || null,
      status: session.status || "open",
      paymentStatus: session.payment_status || "unpaid",
      paymentIntentId: session.payment_intent || null,
    });

    if (session.payment_status !== "paid") {
      return res.json({
        status: session.payment_status || "open",
        grantedMoneyAmount: 0,
        saveData: null,
      });
    }

    const grantResult = await grantCheckoutSession({
      sessionId: session.id,
      userId: req.user.id,
      pack,
      paymentStatus: session.payment_status,
      paymentIntentId: session.payment_intent || null,
    });

    return res.json({
      status: "paid",
      grantedMoneyAmount: grantResult.grantedMoneyAmount,
      alreadyGranted: grantResult.alreadyGranted,
      saveData: grantResult.saveData,
      updatedAt: grantResult.updatedAt,
    });
  } catch (error) {
    console.error("Stripe checkout confirmation failed", error);
    return res.status(500).json({ error: "Checkout confirmation failed" });
  }
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
