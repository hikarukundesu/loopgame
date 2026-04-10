const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const moneyLabel = document.getElementById("money");
const moneyChangeIndicator = document.getElementById("money-change-indicator");
const moneyGoalLabel = document.getElementById("money-goal-label");
const timeOfDayLabel = document.getElementById("time-of-day-label");
const timeDisplayLabel = document.getElementById("time-display-label");
const missionStatusLabel = document.getElementById("mission-status");
const inventoryStatusLabel = document.getElementById("inventory-status");
const interactionStatusLabel = document.getElementById("interaction-status");
const enterShopButton = document.getElementById("enter-shop-button");
const bikeShopOverlay = document.getElementById("bike-shop-overlay");
const bikeShopItems = document.getElementById("bike-shop-items");
const closeBikeShopButton = document.getElementById("close-bike-shop-button");
const carShopOverlay = document.getElementById("car-shop-overlay");
const carShopItems = document.getElementById("car-shop-items");
const closeCarShopButton = document.getElementById("close-car-shop-button");
const hackOverlay = document.getElementById("hack-overlay");
const closeHackButton = document.getElementById("close-hack-button");
const startHackButton = document.getElementById("start-hack-button");
const hackStopButton = document.getElementById("hack-stop-button");
const hackIntroView = document.getElementById("hack-intro-view");
const hackSlotView = document.getElementById("hack-slot-view");
const hackStatusLabel = document.getElementById("hack-status-label");
const hackTargetSymbol = document.getElementById("hack-target-symbol");
const hackReelOne = document.getElementById("hack-reel-1");
const hackReelTwo = document.getElementById("hack-reel-2");
const hackReelThree = document.getElementById("hack-reel-3");
const objectiveLabel = document.getElementById("objective");
const currentTargetArrowLabel = document.getElementById("current-target-arrow");
const currentTargetLabel = document.getElementById("current-target");
const acceptMissionButton = document.getElementById("accept-mission-button");
const startPostingButton = document.getElementById("start-posting-button");
const mapButton = document.getElementById("map-button");
const foodDeliveryButton = document.getElementById("food-delivery-button");
const vehicleButton = document.getElementById("vehicle-button");
const postingButton = document.getElementById("posting-button");
const taxiButton = document.getElementById("taxi-button");
const specialOpsButton = document.getElementById("special-ops-button");
const housingButton = document.getElementById("housing-button");
const premiumButton = document.getElementById("premium-button");
const mapHomeButton = document.getElementById("map-home-button");
const foodHomeButton = document.getElementById("food-home-button");
const vehicleHomeButton = document.getElementById("vehicle-home-button");
const postingHomeButton = document.getElementById("posting-home-button");
const taxiHomeButton = document.getElementById("taxi-home-button");
const specialHomeButton = document.getElementById("special-home-button");
const housingHomeButton = document.getElementById("housing-home-button");
const premiumHomeButton = document.getElementById("premium-home-button");
const phoneMapShell = document.getElementById("phone-map-shell");
const phoneMapCanvasUi = document.getElementById("phone-map-canvas-ui");
const phoneMapPlayerPin = document.getElementById("phone-map-player-pin");
const phoneMapShopLayer = document.getElementById("phone-map-shop-layer");
const phoneHomeScreen = document.getElementById("phone-home-screen");
const mapAppScreen = document.getElementById("map-app-screen");
const foodAppScreen = document.getElementById("food-app-screen");
const postingAppScreen = document.getElementById("posting-app-screen");
const taxiAppScreen = document.getElementById("taxi-app-screen");
const vehicleAppScreen = document.getElementById("vehicle-app-screen");
const specialOpsScreen = document.getElementById("special-ops-screen");
const housingAppScreen = document.getElementById("housing-app-screen");
const premiumAppScreen = document.getElementById("premium-app-screen");
const phoneScrollIndicator = document.getElementById("phone-scroll-indicator");
const foodPayLabel = document.getElementById("food-pay-label");
const foodObjectiveLabel = document.getElementById("food-objective");
const foodProgressLabel = document.getElementById("food-progress-label");
const postingPayLabel = document.getElementById("posting-pay-label");
const postingObjectiveLabel = document.getElementById("posting-objective");
const postingProgressLabel = document.getElementById("posting-progress-label");
const taxiRentalLabel = document.getElementById("taxi-rental-label");
const taxiStatusLabel = document.getElementById("taxi-status-label");
const taxiFareLabel = document.getElementById("taxi-fare-label");
const taxiProgressLabel = document.getElementById("taxi-progress-label");
const vehicleStatusLabel = document.getElementById("vehicle-status-label");
const vehicleSelectionLabel = document.getElementById("vehicle-selection-label");
const vehicleList = document.getElementById("vehicle-list");
const startSpecialButton = document.getElementById("start-special-button");
const startSmallMissionButton = document.getElementById("start-small-mission-button");
const startRescueButton = document.getElementById("start-rescue-button");
const startCashoutButton = document.getElementById("start-cashout-button");
const startTaxiButton = document.getElementById("start-taxi-button");
const endTaxiButton = document.getElementById("end-taxi-button");
const specialProgressLabel = document.getElementById("special-progress-label");
const specialObjectiveLabel = document.getElementById("special-objective-label");
const housingCurrentHouseLabel = document.getElementById("housing-current-house-label");
const housingIncomeLabel = document.getElementById("housing-income-label");
const housingStatusLabel = document.getElementById("housing-status-label");
const housingList = document.getElementById("housing-list");
const premiumStatusLabel = document.getElementById("premium-status-label");
const premiumPackList = document.getElementById("premium-pack-list");
const toast = document.getElementById("toast");
const missionCompleteBanner = document.getElementById("mission-complete-banner");
const gameOverlay = document.querySelector(".game-overlay");
const worldMapOverlay = document.getElementById("world-map-overlay");
const debugPanelOverlay = document.getElementById("debug-panel-overlay");
const accountButton = document.getElementById("account-button");
const accountOverlay = document.getElementById("account-overlay");
const closeAccountButton = document.getElementById("close-account-button");
const accountStatusText = document.getElementById("account-status-text");
const accountEmailInput = document.getElementById("account-email-input");
const accountPasswordInput = document.getElementById("account-password-input");
const accountLoginButton = document.getElementById("account-login-button");
const accountRegisterButton = document.getElementById("account-register-button");
const accountLogoutButton = document.getElementById("account-logout-button");
const debugTimeButtons = document.querySelectorAll(".debug-time-button");
const worldMapCanvas = document.getElementById("world-map-canvas");
const worldMapCtx = worldMapCanvas.getContext("2d");

// ====== AUDIO ENGINE ======
const AudioEngine = (() => {
  let actx = null;
  let muted = false;
  let bgmStarted = false;
  let currentMusicKey = null;
  const MUSIC_TRACKS = {
    bgm: { src: "assets/bgm.mp3", volume: 0.18 },
    car: { src: "assets/car.mp3", volume: 0.16 },
    gun: { src: "assets/gun.mp3", volume: 0.2 },
  };
  const musicPlayers = {};

  function getCtx() {
    if (!actx) {
      try {
        actx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (_) {}
    }
    if (actx && actx.state === "suspended") actx.resume();
    return actx;
  }

  function tone(freq, duration, type = "sine", gain = 0.2, startDelay = 0) {
    const ac = getCtx();
    if (!ac || muted) return;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime + startDelay);
    g.gain.setValueAtTime(0.001, ac.currentTime + startDelay);
    g.gain.linearRampToValueAtTime(gain, ac.currentTime + startDelay + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startDelay + duration);
    osc.start(ac.currentTime + startDelay);
    osc.stop(ac.currentTime + startDelay + duration + 0.05);
  }

  function noise(duration, gain = 0.1, startDelay = 0) {
    const ac = getCtx();
    if (!ac || muted) return;
    const frames = Math.ceil(ac.sampleRate * duration);
    const buf = ac.createBuffer(1, frames, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    const src = ac.createBufferSource();
    src.buffer = buf;
    const g = ac.createGain();
    src.connect(g);
    g.connect(ac.destination);
    g.gain.setValueAtTime(gain, ac.currentTime + startDelay);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startDelay + duration);
    src.start(ac.currentTime + startDelay);
    src.stop(ac.currentTime + startDelay + duration + 0.05);
  }

  function getMusicPlayer(trackKey) {
    if (!musicPlayers[trackKey]) {
      const track = MUSIC_TRACKS[trackKey];
      if (!track) {
        return null;
      }
      const player = new Audio(track.src);
      player.loop = true;
      player.preload = "auto";
      player.volume = track.volume;
      player.muted = muted;
      musicPlayers[trackKey] = player;
    }
    return musicPlayers[trackKey];
  }

  function syncMusicMuteState() {
    Object.values(musicPlayers).forEach((player) => {
      player.muted = muted;
    });
  }

  function playMusic(trackKey) {
    const music = getMusicPlayer(trackKey);
    if (!music) return;
    currentMusicKey = trackKey;
    syncMusicMuteState();
    const playPromise = music.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        bgmStarted = false;
        if (currentMusicKey === trackKey) {
          currentMusicKey = null;
        }
      });
    }
    bgmStarted = true;
  }

  function pauseInactiveMusic(activeTrackKey) {
    Object.entries(musicPlayers).forEach(([trackKey, player]) => {
      if (trackKey === activeTrackKey) return;
      if (!player.paused) {
        player.pause();
        player.currentTime = 0;
      }
    });
  }

  return {
    isMuted() { return muted; },
    toggleMute() {
      muted = !muted;
      syncMusicMuteState();
      if (!muted && bgmStarted && currentMusicKey) {
        playMusic(currentMusicKey);
      }
      return muted;
    },
    primeBgm() {
      if (bgmStarted) return;
      this.setMusic("bgm");
    },
    setMusic(trackKey) {
      const nextTrackKey = MUSIC_TRACKS[trackKey] ? trackKey : "bgm";
      pauseInactiveMusic(nextTrackKey);
      const currentPlayer = getMusicPlayer(nextTrackKey);
      if (!currentPlayer) return;
      if (currentMusicKey === nextTrackKey && !currentPlayer.paused) {
        return;
      }
      playMusic(nextTrackKey);
    },

    footstep() { noise(0.04, 0.045); },

    moneyPickup(amount) {
      const base = Math.min(700, 260 + (amount / 8));
      tone(base, 0.12, "sine", 0.22);
      tone(base * 1.26, 0.18, "sine", 0.16, 0.06);
      tone(base * 1.5, 0.22, "sine", 0.12, 0.13);
    },

    missionComplete() {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.32, "sine", 0.2, i * 0.09));
    },

    missionStart() {
      tone(440, 0.1, "square", 0.16);
      tone(660, 0.15, "square", 0.13, 0.1);
    },

    toast() { tone(740, 0.07, "sine", 0.13); },

    purchase() {
      tone(330, 0.08, "square", 0.13);
      tone(495, 0.12, "sine", 0.15, 0.07);
      tone(660, 0.18, "sine", 0.17, 0.14);
    },

    housePurchase() {
      [330, 415, 523, 659, 784].forEach((f, i) => tone(f, 0.22, "sine", 0.17, i * 0.07));
    },

    gunshot() {
      noise(0.07, 0.28);
      tone(120, 0.12, "sawtooth", 0.2);
    },
  };
})();

// ====== SCREEN SHAKE ======
const screenShake = { x: 0, y: 0, intensity: 0, duration: 0, elapsed: 0 };

function triggerScreenShake(intensity, duration) {
  screenShake.intensity = Math.max(screenShake.intensity, intensity);
  screenShake.duration = duration;
  screenShake.elapsed = 0;
}

function updateScreenShake(deltaTime) {
  if (screenShake.elapsed < screenShake.duration) {
    screenShake.elapsed += deltaTime;
    const t = 1 - screenShake.elapsed / screenShake.duration;
    const mag = screenShake.intensity * t;
    screenShake.x = (Math.random() * 2 - 1) * mag;
    screenShake.y = (Math.random() * 2 - 1) * mag;
  } else {
    screenShake.x = 0;
    screenShake.y = 0;
  }
}

// ====== PARTICLE SYSTEM ======
const particles = [];

function spawnParticles(worldX, worldY, options = {}) {
  const count = options.count ?? 8;
  const color = options.color ?? "#ffd866";
  const speed = options.speed ?? 80;
  const life = options.life ?? 0.7;
  const size = options.size ?? 4;
  const gravity = options.gravity ?? 0;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.8;
    const spd = speed * (0.4 + Math.random() * 0.6);
    particles.push({
      x: worldX, y: worldY,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      gravity, life: life * (0.6 + Math.random() * 0.4), maxLife: life,
      size, color,
    });
  }
}

function updateParticles(deltaTime) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * deltaTime;
    p.y += p.vy * deltaTime;
    p.vy += p.gravity * deltaTime;
    p.vx *= 0.90;
    p.vy *= 0.90;
    p.life -= deltaTime;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawParticles() {
  particles.forEach((p) => {
    const alpha = Math.max(0, p.life / p.maxLife);
    const sz = p.size * (0.4 + alpha * 0.6);
    if (sz < 0.5) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

// ====== SAVE / LOAD ======
const SAVE_KEY = "nightdelivery_v1";
const API_BASE = "/api";
let supabaseClient = null;

function resetTransientInputState() {
  Object.keys(keys).forEach((key) => {
    keys[key] = false;
  });
  inputState.fireHeld = false;
}

function saveGame() {
  const snapshot = getSaveSnapshot();
  saveGameLocal(snapshot);
  queueCloudSave(snapshot);
}

function getSaveSnapshot() {
  return {
    money: gameState.money,
    inventory: { ...gameState.inventory },
    house: { level: gameState.house.level, buildingName: gameState.house.buildingName, totalEarned: gameState.house.totalEarned, streamCount: gameState.house.streamCount },
    purchasedItems: [...purchasedItemIds],
    savedAt: Date.now(),
  };
}

function saveGameLocal(snapshot = getSaveSnapshot()) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
  } catch (_) {}
}

function readLocalSaveSnapshot() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function applySaveData(data) {
  if (!data || typeof data.money !== "number") {
    return false;
  }

  gameState.money = data.money;
  if (data.inventory) Object.assign(gameState.inventory, data.inventory);
  if (data.house) {
    gameState.house.level = data.house.level ?? 0;
    gameState.house.buildingName = data.house.buildingName ?? null;
    gameState.house.totalEarned = data.house.totalEarned ?? 0;
    gameState.house.streamCount = data.house.streamCount ?? 0;
  }
  purchasedItemIds.clear();
  Object.values(catalogById).forEach((item) => {
    item.owned = false;
  });
  if (Array.isArray(data.purchasedItems)) {
    data.purchasedItems.forEach((id) => {
      purchasedItemIds.add(id);
      const item = catalogById[id];
      if (item) item.owned = true;
    });
  }
  return true;
}

function loadGame() {
  const data = readLocalSaveSnapshot();
  if (!data) return false;
  return applySaveData(data);
}

function clearAuthSession() {
  gameState.cloud.token = null;
  gameState.cloud.username = null;
  gameState.cloud.saveUpdatedAt = null;
  gameState.cloud.statusMessage = null;
}

async function initializeSupabaseAuth() {
  try {
    gameState.cloud.statusMessage = null;
    const response = await fetch(`${API_BASE}/config`);
    const config = await response.json();
    if (!response.ok || !config.supabaseUrl || !config.supabaseAnonKey) {
      throw new Error("Supabase 設定を読み込めませんでした");
    }
    supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    gameState.cloud.isReady = true;
    gameState.payments.enabled = Boolean(config.stripeEnabled);
    gameState.payments.packs = Array.isArray(config.premiumPacks) ? config.premiumPacks : [];
    gameState.payments.statusMessage = config.stripeEnabled
      ? null
      : "Stripeの環境変数が未設定です。サーバー設定後に購入を開放できます。";
    renderPremiumShop();
    const { data } = await supabaseClient.auth.getSession();
    applySupabaseSession(data.session || null);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      applySupabaseSession(session || null);
    });
    if (gameState.cloud.token) {
      await pullCloudSave(false);
      await handlePaymentReturnIfNeeded();
    }
  } catch (error) {
    gameState.cloud.isReady = true;
    gameState.cloud.statusMessage = error.message || "Supabase 初期化に失敗しました。";
    updateAccountUi();
    renderPremiumShop();
  }
}

function applySupabaseSession(session) {
  gameState.cloud.token = session?.access_token || null;
  gameState.cloud.username = session?.user?.email || null;
  if (!session) {
    gameState.cloud.saveUpdatedAt = null;
  } else {
    gameState.cloud.statusMessage = null;
  }
  updateAccountUi();
  renderPremiumShop();
  if (gameState.cloud.token) {
    handlePaymentReturnIfNeeded();
  }
}

function setAccountOverlayOpen(open) {
  gameState.isAccountOverlayOpen = open;
  if (open) {
    toggleDebugPanel(false);
    toggleWorldMap(false);
    resetTransientInputState();
  }
  if (!accountOverlay) {
    return;
  }
  accountOverlay.classList.toggle("hidden", !open);
  accountOverlay.setAttribute("aria-hidden", String(!open));
}

function setAccountStatus(message) {
  if (accountStatusText) {
    accountStatusText.textContent = message;
  }
}

function updateAccountUi() {
  if (accountButton) {
    accountButton.textContent = gameState.cloud.username ? "クラウド" : "同期";
  }
  if (accountLogoutButton) {
    accountLogoutButton.disabled = !gameState.cloud.token;
  }
  if (accountLoginButton) {
    accountLoginButton.disabled = gameState.cloud.isSyncing;
  }
  if (accountRegisterButton) {
    accountRegisterButton.disabled = gameState.cloud.isSyncing;
  }
  if (gameState.cloud.username) {
    setAccountStatus(
      `${gameState.cloud.username} でログイン中。${gameState.cloud.saveUpdatedAt ? "クラウド保存に接続済みです。" : "この端末の進行は自動で保存されます。"}`
    );
  } else if (gameState.cloud.statusMessage) {
    setAccountStatus(gameState.cloud.statusMessage);
  } else {
    setAccountStatus(
      gameState.cloud.isReady
        ? "新規登録して今の進行を保存するか、ログインしてクラウド保存を復元できます。"
      : "Supabase を初期化しています。"
    );
  }
}

function setPremiumStatus(message) {
  gameState.payments.statusMessage = message;
  if (premiumStatusLabel) {
    premiumStatusLabel.textContent = message;
  }
}

function renderPremiumShop() {
  if (!premiumPackList) {
    return;
  }

  let statusMessage = "ログインすると購入パックを選べます";
  if (!gameState.payments.enabled) {
    statusMessage = gameState.payments.statusMessage || "Stripeの設定がまだ入っていません";
  } else if (!gameState.cloud.token) {
    statusMessage = "購入するには右上の同期からログインしてください";
  } else if (!gameState.payments.packs.length) {
    statusMessage = "販売パックはまだ登録されていません";
  } else if (gameState.payments.isCreatingCheckout) {
    statusMessage = "Stripe Checkout を準備しています...";
  } else if (gameState.payments.isConfirmingReturn) {
    statusMessage = "決済結果を確認しています...";
  } else {
    statusMessage = `購入先: ${gameState.cloud.username || "ログイン中のアカウント"}`;
  }
  setPremiumStatus(statusMessage);

  premiumPackList.innerHTML = "";
  gameState.payments.packs.forEach((pack) => {
    const card = document.createElement("article");
    card.className = "premium-pack-card";

    const copy = document.createElement("div");
    copy.className = "premium-pack-copy";

    const title = document.createElement("strong");
    title.textContent = pack.name;
    copy.append(title);

    const desc = document.createElement("p");
    desc.textContent = pack.description || `${formatCurrency(pack.priceJpy)} の決済で ${formatCurrency(pack.moneyAmount)} をチャージ`;
    copy.append(desc);

    const meta = document.createElement("div");
    meta.className = "premium-pack-meta";

    const amount = document.createElement("strong");
    amount.textContent = `${formatCurrency(pack.moneyAmount)} マネー`;
    meta.append(amount);

    const bonus = document.createElement("span");
    const bonusAmount = Math.max(0, Number(pack.moneyAmount) - Number(pack.priceJpy));
    bonus.textContent = bonusAmount > 0 ? `ボーナス +${formatCurrency(bonusAmount)}` : "スタンダード";
    meta.append(bonus);
    copy.append(meta);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "premium-pack-buy-button";
    button.textContent = gameState.payments.isCreatingCheckout ? "準備中..." : `${formatCurrency(pack.priceJpy)} で購入`;
    button.disabled =
      !gameState.payments.enabled ||
      !gameState.cloud.token ||
      gameState.payments.isCreatingCheckout ||
      gameState.payments.isConfirmingReturn;
    button.addEventListener("click", () => beginPremiumCheckout(pack.id));

    card.append(copy, button);
    premiumPackList.append(card);
  });
}

function applyConfirmedSaveData(saveData) {
  if (!saveData) {
    return false;
  }

  if (!applySaveData(saveData)) {
    return false;
  }

  saveGameLocal(saveData);
  updateHUD();
  updateButtonState();
  updateInventoryStatus();
  updateVehicleApp();
  renderBikeShopItems();
  renderCarShopItems();
  renderHousingApp();
  updateHousingUI();
  return true;
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (gameState.cloud.token) {
    headers.Authorization = `Bearer ${gameState.cloud.token}`;
  }
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "リクエストに失敗しました");
  }
  return data;
}

async function beginPremiumCheckout(packId) {
  if (!gameState.payments.enabled) {
    showToast("Stripeの設定がまだ完了していません");
    return;
  }
  if (!gameState.cloud.token) {
    setAccountOverlayOpen(true);
    showToast("購入するには先にログインしてください");
    return;
  }
  if (gameState.payments.isCreatingCheckout || gameState.payments.isConfirmingReturn) {
    return;
  }

  try {
    gameState.payments.isCreatingCheckout = true;
    renderPremiumShop();
    // Keep cloud save current before Stripe adds purchased money on the server.
    await pushCloudSave(getSaveSnapshot(), true);
    const result = await apiRequest("/payments/checkout", {
      method: "POST",
      body: { packId },
    });
    if (!result.url) {
      throw new Error("Checkout URL の作成に失敗しました");
    }
    window.location.assign(result.url);
  } catch (error) {
    showToast(error.message || "決済ページの作成に失敗しました");
    gameState.payments.isCreatingCheckout = false;
    renderPremiumShop();
  }
}

function clearPaymentReturnQuery() {
  const url = new URL(window.location.href);
  url.searchParams.delete("payment");
  url.searchParams.delete("session_id");
  window.history.replaceState({}, "", url.pathname + url.search + url.hash);
}

async function handlePaymentReturnIfNeeded() {
  const params = new URLSearchParams(window.location.search);
  const paymentState = params.get("payment");
  const sessionId = params.get("session_id");

  if (!paymentState) {
    return false;
  }

  if (paymentState === "cancel") {
    clearPaymentReturnQuery();
    showToast("購入をキャンセルしました");
    return true;
  }

  if (paymentState !== "success" || !sessionId) {
    clearPaymentReturnQuery();
    return false;
  }

  gameState.payments.pendingReturnSessionId = sessionId;
  if (!gameState.cloud.token || gameState.payments.isConfirmingReturn) {
    renderPremiumShop();
    return false;
  }

  try {
    gameState.payments.isConfirmingReturn = true;
    renderPremiumShop();
    const result = await apiRequest("/payments/confirm", {
      method: "POST",
      body: { sessionId: gameState.payments.pendingReturnSessionId },
    });
    gameState.cloud.saveUpdatedAt = result.updatedAt || new Date().toISOString();
    updateAccountUi();
    if (result.saveData) {
      applyConfirmedSaveData(result.saveData);
    } else {
      await pullCloudSave(false);
    }
    const grantedMoney = Number(result.grantedMoneyAmount || 0);
    if (grantedMoney > 0) {
      showToast(`${formatCurrency(grantedMoney)} をチャージしました`);
    } else if (result.status === "paid") {
      showToast("決済を確認しました");
    } else {
      showToast("決済はまだ確定待ちです");
    }
    clearPaymentReturnQuery();
    gameState.payments.pendingReturnSessionId = null;
    return true;
  } catch (error) {
    showToast(error.message || "決済結果の確認に失敗しました");
    return false;
  } finally {
    gameState.payments.isConfirmingReturn = false;
    gameState.payments.isCreatingCheckout = false;
    renderPremiumShop();
  }
}

async function pushCloudSave(snapshot = getSaveSnapshot(), silent = true) {
  if (!gameState.cloud.token || gameState.cloud.isSyncing) {
    return false;
  }

  try {
    gameState.cloud.isSyncing = true;
    updateAccountUi();
    const result = await apiRequest("/save", {
      method: "PUT",
      body: { saveData: snapshot },
    });
    gameState.cloud.saveUpdatedAt = result.updatedAt || new Date().toISOString();
    updateAccountUi();
    if (!silent) {
      showToast("クラウド保存を更新しました");
    }
    return true;
  } catch (error) {
    if (!silent) {
      showToast(error.message || "クラウド保存に失敗しました");
    }
    return false;
  } finally {
    gameState.cloud.isSyncing = false;
    updateAccountUi();
  }
}

function queueCloudSave(snapshot = getSaveSnapshot()) {
  if (!gameState.cloud.token) {
    return;
  }
  if (gameState.cloud.syncTimeoutId) {
    window.clearTimeout(gameState.cloud.syncTimeoutId);
  }
  gameState.cloud.syncTimeoutId = window.setTimeout(() => {
    pushCloudSave(snapshot, true);
  }, 700);
}

async function pullCloudSave(showToastOnSuccess = false) {
  if (!gameState.cloud.token) {
    return false;
  }

  try {
    gameState.cloud.isSyncing = true;
    updateAccountUi();
    const result = await apiRequest("/save");
    if (result.saveData) {
      const localSnapshot = readLocalSaveSnapshot();
      const localSavedAt = Number(localSnapshot?.savedAt || 0);
      const cloudSavedAt = Number(result.saveData.savedAt || 0);

      if (cloudSavedAt >= localSavedAt) {
        applyConfirmedSaveData(result.saveData);
      } else {
        const syncResult = await apiRequest("/save", {
          method: "PUT",
          body: { saveData: localSnapshot },
        });
        gameState.cloud.saveUpdatedAt = syncResult.updatedAt || new Date().toISOString();
      }
    }
    gameState.cloud.saveUpdatedAt = result.updatedAt || null;
    updateAccountUi();
    if (showToastOnSuccess) {
      showToast(result.saveData ? "クラウド保存を読み込みました" : "クラウド保存はまだ空です");
    }
    return true;
  } catch (error) {
    if (showToastOnSuccess) {
      showToast(error.message || "クラウド保存の取得に失敗しました");
    }
    if (/401|token|unauthorized|認証/i.test(error.message || "")) {
      clearAuthSession();
      updateAccountUi();
    }
    return false;
  } finally {
    gameState.cloud.isSyncing = false;
    updateAccountUi();
  }
}

async function submitAccountForm(mode) {
  const email = accountEmailInput?.value.trim();
  const password = accountPasswordInput?.value || "";

  if (!supabaseClient) {
    showToast("Supabase の初期化がまだ完了していません");
    return;
  }
  if (!email || password.length < 8) {
    showToast("メールアドレスと8文字以上のパスワードを入力してください");
    return;
  }

  try {
    gameState.cloud.isSyncing = true;
    updateAccountUi();
    let authResult;
    if (mode === "register") {
      authResult = await supabaseClient.auth.signUp({ email, password });
    } else {
      authResult = await supabaseClient.auth.signInWithPassword({ email, password });
    }
    if (authResult.error) {
      throw authResult.error;
    }

    const session = authResult.data?.session || null;
    applySupabaseSession(session);
    updateAccountUi();
    if (session) {
      const me = await apiRequest("/auth/me");
      await pullCloudSave(false);
      if (!me.hasSave) {
        await pushCloudSave(getSaveSnapshot(), true);
      }
    }
    gameState.cloud.statusMessage =
      mode === "register" && !session
        ? "確認メールを送信しました。メール認証後にログインしてください。"
        : null;
    setAccountStatus(
      gameState.cloud.statusMessage ||
      (mode === "register" ? `${email} の進行データ保存を開始しました。` : `${email} のクラウド保存を復元しました。`)
    );
    showToast(
      mode === "register"
        ? session
          ? "新規登録して保存しました"
          : "確認メールを送信しました"
        : "ログインして復元しました"
    );
  } catch (error) {
    showToast(error.message || "認証に失敗しました");
    updateAccountUi();
  } finally {
    gameState.cloud.isSyncing = false;
    updateAccountUi();
  }
}

// ====== SPEED HUD ======
function drawSpeedHUD() {
  const vehicle = getVehicleById(gameState.ridingVehicleId);
  if (!vehicle) return;
  const speed = Math.hypot(player.motion.x, player.motion.y);
  const maxSpeed = vehicle.maxSpeed ?? 300;
  const displayKmh = Math.round((speed / maxSpeed) * 120);
  const x = 26;
  const y = VIEWPORT.height - 26;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.52)";
  roundRect(ctx, x - 10, y - 24, 108, 34, 8);
  ctx.fill();
  ctx.fillStyle = displayKmh > 85 ? "#ff5aab" : "#58f4ff";
  ctx.font = 'bold 17px "Trebuchet MS", sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`${displayKmh} km/h`, x, y - 7);
  ctx.restore();
}

// ====== HEADLIGHTS ======
function drawHeadlights() {
  const vehicle = getVehicleById(gameState.ridingVehicleId);
  if (!vehicle || vehicle.inventoryKey !== "car") return;
  const tod = getTimeOfDay();
  if (tod.key !== "night" && tod.key !== "evening") return;
  const dirMap = {
    right: Math.PI * 0,
    left: Math.PI,
    up: -Math.PI / 2,
    down: Math.PI / 2,
  };
  const angle = dirMap[player.direction] ?? 0;
  const coneLen = 200;
  const halfAngle = 0.32;
  const grad = ctx.createRadialGradient(player.x, player.y, 8, player.x, player.y, coneLen);
  const opacity = tod.key === "night" ? 0.22 : 0.12;
  grad.addColorStop(0, `rgba(255, 255, 210, ${opacity})`);
  grad.addColorStop(1, "rgba(255, 255, 180, 0)");
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.arc(player.x, player.y, coneLen, angle - halfAngle, angle + halfAngle);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

// ====== FOOTSTEP TRACKER ======
let _footPhase = 0;
let _footLastSign = 0;

function trackFootstep(deltaTime) {
  if (!player.isMoving || gameState.ridingVehicleId) return;
  _footPhase += deltaTime * 6.5;
  const sign = Math.sign(Math.sin(_footPhase));
  if (sign > 0 && _footLastSign <= 0) AudioEngine.footstep();
  _footLastSign = sign;
}

const VIEWPORT = {
  width: canvas.width,
  height: canvas.height,
};

const WORLD = {
  width: 4320,
  height: 3040,
};

const OCEAN = {
  viewMargin: 220,
  coastGlowWidth: 42,
  waveGrid: 96,
};

const camera = {
  x: 0,
  y: 0,
};

const keys = {};
const inputState = {
  fireHeld: false,
};

const gameState = {
  money: 0,
  lastTime: 0,
  timeElapsedSeconds: 0,
  toastTimeoutId: null,
  missionCompleteTimeoutId: null,
  moneyIndicatorTimeoutId: null,
  isWorldMapOpen: false,
  isDebugPanelOpen: false,
  isShopOpen: false,
  selectedJobType: "posting",
  currentPhoneScreen: "home",
  nearbyShop: null,
  isHackOverlayOpen: false,
  isAccountOverlayOpen: false,
  selectedVehicleId: null,
  ridingVehicleId: null,
  currentMode: "world",
  inventory: {
    car: 0,
    bike: 0,
    gear: 0,
  },
  wallet: {
    lastChange: 0,
    lastReason: "",
    ledger: [],
  },
  house: {
    level: 0,
    buildingName: null,
    cooldown: 0,
    streaming: null,
    totalEarned: 0,
    streamCount: 0,
  },
  cloud: {
    token: null,
    username: null,
    saveUpdatedAt: null,
    statusMessage: null,
    syncTimeoutId: null,
    isSyncing: false,
    isReady: false,
  },
  payments: {
    enabled: false,
    packs: [],
    isCreatingCheckout: false,
    pendingReturnSessionId: null,
    isConfirmingReturn: false,
    statusMessage: null,
  },
};

const mission = {
  active: false,
  type: null,
  stage: "idle",
  pickupPoint: null,
  deliveryPoint: null,
  stops: [],
  currentStopIndex: 0,
  perStopReward: 0,
  reward: 0,
  vehiclePoint: null,
  entryPoint: null,
  returnPoint: null,
  bankPoint: null,
  hasBriefcase: false,
  rescueVan: null,
  hostage: null,
  hack: null,
  cashBagCollected: false,
  cashoutCombat: null,
};

const taxiState = {
  status: "inactive",
  passenger: null,
  destination: null,
  rentalFee: 0,
  currentFare: 0,
  totalFares: 0,
  tripsCompleted: 0,
  statusTimer: 0,
};

const UI_TEXT = {
  idle: "待機中",
  pickup: "受取先へ向かう",
  delivery: "配達先へ向かう",
  posting: "投函先へ向かう",
  smallMissionPickup: "依頼品の回収へ向かう",
  smallMissionDelivery: "受け渡し先へ向かう",
  briefcaseVehicle: "任務車両へ向かう",
  briefcaseDrive: "潜入地点へ向かう",
  briefcaseInfiltration: "マンション潜入中",
  briefcaseEscape: "ケースを持って脱出",
  briefcaseReturn: "受渡し地点へ向かう",
  vanSpawned: "護送車を追跡中",
  playerNearVan: "護送車へ侵入可能",
  hacking: "護送車をハッキング中",
  hostageFreed: "人質を保護する",
  rewardReady: "人質から報酬を受け取る",
  cashoutPickup: "現金回収ポイントへ向かう",
  cashoutBank: "現金を銀行へ護送中",
  complete: "仕事完了！",
  taxiReadyToStart: "タクシー営業所で待機中",
  taxiRented: "タクシー車両を受領",
  taxiSearchingPassenger: "乗客を探す",
  taxiPassengerOnBoard: "乗客が乗車した",
  taxiDelivering: "目的地へ送迎中",
  taxiFareComplete: "送迎完了",
  taxiEnded: "タクシー業務を終了",
};

const MISSION_VEHICLE = {
  id: "mission-van",
  name: "任務用車両",
  description: "特別業務専用の高速車両です。",
  inventoryKey: "car",
  speedBonus: 78,
};

const TAXI_VEHICLE = {
  id: "taxi-rental",
  name: "Metro Taxi",
  description: "営業中のみ使えるレンタルタクシーです。",
  inventoryKey: "car",
  type: "standard",
  maxSpeed: 352,
  acceleration: 5.6,
  handling: 5.3,
  color: "#ffd447",
  taxi: true,
};

const RESCUE_SYMBOLS = ["◆", "◎", "▲", "◼"];
const RESCUE_REEL_SPEEDS = [6.8, 7.5, 8.2];
const RESCUE_STOP_ASSIST_WINDOW = 0.22;
const WORLD_COMBAT_CONFIG = {
  playerBulletSpeed: 620,
  enemyBulletSpeed: 300,
  playerFireInterval: 0.18,
  enemyFireIntervalMin: 0.7,
  enemyFireIntervalMax: 1.15,
  bulletRadius: 4,
  enemyRadius: 11,
  enemyMoveSpeed: 104,
  attackRange: 260,
  disengageRange: 360,
};
const DEBUG_MONEY_STEP = 10000;
const ECONOMY = {
  currencySymbol: "¥",
  startingMoney: 3000,
  wallet: {
    ledgerLimit: 24,
  },
  jobs: {
    posting: {
      label: "ポスティング",
      role: "最低賃金の地味仕事",
      min: 60,
      max: 90,
      entryFee: 15,
      stopCountMin: 4,
      stopCountMax: 5,
    },
    delivery: {
      label: "Foodデリバリー",
      role: "安定収入",
      min: 100,
      max: 160,
      entryFee: 30,
    },
    smallMission: {
      label: "小ミッション",
      role: "中間層向けの短期案件",
      min: 200,
      max: 350,
      entryFee: 60,
    },
    riskyBriefcase: {
      label: "危険ジョブ",
      role: "高リスク高報酬",
      min: 900,
      max: 1300,
      entryFee: 240,
    },
    riskyRescue: {
      label: "危険ジョブ",
      role: "一発逆転の高難度案件",
      min: 700,
      max: 1500,
      entryFee: 220,
    },
    riskyCashout: {
      label: "危険ジョブ",
      role: "武装妨害つきの護送任務",
      min: 1200,
      max: 1800,
      entryFee: 380,
    },
  },
  taxi: {
    rentalFee: 400,
    fareMin: 180,
    fareMax: 420,
    pickupRadius: 42,
    dropoffRadius: 46,
  },
  shops: {
    vehicles: {
      used_car: 4000,
      standard_car: 15000,
      suv: 45000,
      supercar: 150000,
    },
    bikes: {
      usedBike: 900,
      crossBike: 1600,
      roadBike: 2600,
    },
    gear: {
      flashBaton: 2200,
      streetArmor: 4800,
    },
  },
  houses: {
    1: { label: "ボロ屋", price: 2200, min: 10, max: 40, viewersMin: 3, viewersMax: 12, baseName: "Forest Shack" },
    2: { label: "安アパート", price: 9000, min: 50, max: 120, viewersMin: 12, viewersMax: 28, baseName: "Maple Heights" },
    3: { label: "普通の家", price: 26000, min: 150, max: 300, viewersMin: 30, viewersMax: 64, baseName: "Willow Commons" },
    4: { label: "高級住宅", price: 92000, min: 400, max: 900, viewersMin: 70, viewersMax: 140, baseName: "Stonegate House" },
    5: { label: "高級マンション", price: 220000, min: 1000, max: 3000, viewersMin: 160, viewersMax: 360, baseName: "Silver Crest" },
  },
  streaming: {
    durationMin: 6.5,
    durationMax: 9.5,
    cooldownSeconds: 8,
    bonusChance: 0.34,
    bonusMinRatio: 0.12,
    bonusMaxRatio: 0.32,
    viralChance: 0.1,
    viralMultiplier: 1.45,
  },
  progression: {
    beginnerHourly: 1000,
    skilledHourlyMin: 2000,
    skilledHourlyMax: 3500,
    vehicleGoals: [
      { id: "used_car", label: "中古車", description: "最初の大きな目標" },
      { id: "standard_car", label: "普通車", description: "生活が上がる中期目標" },
      { id: "suv", label: "SUV", description: "かなり高価な長期目標" },
      { id: "supercar", label: "スーパーカー", description: "かなり遠い夢の最上位" },
    ],
  },
  premiumHooks: {
    unifiedCurrency: "money",
    supportedSources: ["job", "purchase", "premium"],
  },
};
const TIME_OF_DAY_CONFIG = {
  dayDurationSeconds: 12 * 60,
  startMinutes: 9 * 60,
  segments: [
    {
      key: "morning",
      label: "朝",
      durationSeconds: 2 * 60,
      overlayColor: "rgba(255, 216, 180, 0.10)",
      ambientAlpha: 0.04,
      skyTint: "rgba(255, 232, 198, 0.06)",
      playerLightRadius: 150,
    },
    {
      key: "day",
      label: "昼",
      durationSeconds: 5 * 60,
      overlayColor: "rgba(255, 249, 228, 0.02)",
      ambientAlpha: 0.01,
      skyTint: "rgba(255, 255, 255, 0.02)",
      playerLightRadius: 130,
    },
    {
      key: "evening",
      label: "夕方",
      durationSeconds: 2 * 60,
      overlayColor: "rgba(255, 148, 92, 0.15)",
      ambientAlpha: 0.08,
      skyTint: "rgba(255, 172, 104, 0.07)",
      playerLightRadius: 170,
    },
    {
      key: "night",
      label: "夜",
      durationSeconds: 3 * 60,
      overlayColor: "rgba(7, 14, 32, 0.40)",
      ambientAlpha: 0.24,
      skyTint: "rgba(76, 118, 196, 0.06)",
      playerLightRadius: 235,
    },
  ],
};

const CONFIG = {
  movement: {
    onFootMaxSpeed: 138,
    onFootAcceleration: 11,
    onFootDeceleration: 12,
    onFootHandling: 10,
    bikeBaseSpeed: 190,
    bikeAcceleration: 9,
    bikeDeceleration: 10,
    bikeHandling: 8,
  },
};

const interiorState = {
  active: false,
  width: 1480,
  height: 960,
  player: { x: 92, y: 560, radius: 12, direction: "right" },
  walls: [],
  props: [],
  enemies: [],
  bullets: [],
  enemyBullets: [],
  effects: [],
  scorchMarks: [],
  bulletTrails: [],
  briefcase: { x: 0, y: 0, radius: 18, collected: false },
  exitZone: { x: 0, y: 0, width: 0, height: 0 },
  fireCooldown: 0,
  reloadTime: 0,
  resetFlash: 0,
  hitFlash: 0,
  hitGraceTime: 0,
  armor: 100,
  maxArmor: 100,
  hp: 100,
  maxHp: 100,
  lives: 3,
  maxLives: 3,
  ammoInClip: 12,
  clipSize: 12,
  reserveAmmo: 60,
};

const interiorCamera = {
  x: 0,
  y: 0,
};

const houseState = {
  active: false,
  width: VIEWPORT.width,
  height: VIEWPORT.height,
  player: { x: 132, y: VIEWPORT.height - 124, radius: 12, direction: "right" },
  walls: [],
  props: [],
  pcZone: { x: 0, y: 0, width: 0, height: 0 },
  exitZone: { x: 0, y: 0, width: 0, height: 0 },
};

const INTERIOR_CONFIG = {
  cameraLag: 7.5,
  lookAhead: 54,
  playerSpeed: 210,
  bulletSpeed: 520,
  enemyBulletSpeed: 250,
  fireInterval: 0.16,
  reloadDuration: 1.2,
  playerDamage: 34,
  enemyDamage: 18,
  armorAbsorbRatio: 1,
  hitGraceDuration: 0.42,
  detectionRange: 300,
  attackRange: 210,
  disengageRange: 340,
  coverSeekRange: 180,
  minimapScale: 0.16,
  patrolPauseMin: 0.7,
  patrolPauseMax: 1.6,
};

const SHOP_CATALOG = {
  carshop: [
    {
      id: "used_car",
      name: "中古車",
      price: ECONOMY.shops.vehicles.used_car,
      type: "used",
      inventoryKey: "car",
      maxSpeed: 320,
      acceleration: 4.2,
      handling: 3.6,
      color: "#7b7f89",
      description: "少し古い小型ボディ。安いが遅く、最初の一台向け。",
      owned: false,
    },
    {
      id: "standard_car",
      name: "普通車",
      price: ECONOMY.shops.vehicles.standard_car,
      type: "standard",
      inventoryKey: "car",
      maxSpeed: 368,
      acceleration: 5.7,
      handling: 5.1,
      color: "#4d74c9",
      description: "街乗りにちょうどいい万能セダン。価格と性能のバランスが良い。",
      owned: false,
    },
    {
      id: "suv",
      name: "SUV",
      price: ECONOMY.shops.vehicles.suv,
      type: "suv",
      inventoryKey: "car",
      maxSpeed: 382,
      acceleration: 5,
      handling: 4.4,
      color: "#55606d",
      description: "大きな車体と安定感が魅力。重厚感ある上位モデル。",
      owned: false,
    },
    {
      id: "supercar",
      name: "スーパーカー",
      price: ECONOMY.shops.vehicles.supercar,
      type: "super",
      inventoryKey: "car",
      maxSpeed: 470,
      acceleration: 8.1,
      handling: 6.8,
      color: "#ff7a4f",
      description: "低く鋭い最上位モデル。圧倒的な加速と最高速を誇る。",
      owned: false,
    },
  ],
  bikeshop: [
    {
      id: "used-bike",
      name: "中古自転車",
      description: "街乗り向けの手頃な一台。はじめての移動強化にちょうどいい。",
      price: ECONOMY.shops.bikes.usedBike,
      inventoryKey: "bike",
      speedBonus: 0,
      owned: false,
    },
    {
      id: "cross-bike",
      name: "クロスバイク",
      description: "巡航しやすく、配達にも使いやすい万能モデル。",
      price: ECONOMY.shops.bikes.crossBike,
      inventoryKey: "bike",
      speedBonus: 22,
      owned: false,
    },
    {
      id: "road-bike",
      name: "ロードバイク",
      description: "軽量フレームで加速が鋭い。BUYストリート最速クラス。",
      price: ECONOMY.shops.bikes.roadBike,
      inventoryKey: "bike",
      speedBonus: 42,
      owned: false,
    },
  ],
  weaponshop: [
    { id: "flash-baton", name: "Flash Baton", price: ECONOMY.shops.gear.flashBaton, inventoryKey: "gear", owned: false },
    { id: "street-armor", name: "Street Armor", price: ECONOMY.shops.gear.streetArmor, inventoryKey: "gear", owned: false },
  ],
};

const purchasedItemIds = new Set();
const catalogById = Object.values(SHOP_CATALOG).flat().reduce((lookup, item) => {
  lookup[item.id] = item;
  return lookup;
}, {});

const CITY_DISTRICTS = [
  {
    name: "Old Market",
    x: 0,
    y: 0,
    width: 1120,
    height: 760,
    tint: "rgba(255, 147, 92, 0.045)",
    ground: "#0a1220",
    roadGlow: "rgba(255, 161, 117, 0.04)",
  },
  {
    name: "Downtown Core",
    x: 1120,
    y: 0,
    width: 1160,
    height: 980,
    tint: "rgba(88, 244, 255, 0.05)",
    ground: "#08111d",
    roadGlow: "rgba(88, 244, 255, 0.05)",
  },
  {
    name: "Tower Mile",
    x: 2280,
    y: 0,
    width: 1080,
    height: 980,
    tint: "rgba(125, 181, 255, 0.05)",
    ground: "#09121d",
    roadGlow: "rgba(125, 181, 255, 0.05)",
  },
  {
    name: "Night Arcade",
    x: 0,
    y: 760,
    width: 1200,
    height: 800,
    tint: "rgba(255, 90, 171, 0.04)",
    ground: "#09101a",
    roadGlow: "rgba(255, 90, 171, 0.05)",
  },
  {
    name: "Warehouse Belt",
    x: 1200,
    y: 980,
    width: 1120,
    height: 1260,
    tint: "rgba(255, 216, 102, 0.035)",
    ground: "#0b1017",
    roadGlow: "rgba(255, 216, 102, 0.045)",
  },
  {
    name: "Harbor Edge",
    x: 2320,
    y: 980,
    width: 1040,
    height: 1260,
    tint: "rgba(88, 244, 255, 0.03)",
    ground: "#071018",
    roadGlow: "rgba(88, 244, 255, 0.04)",
  },
  {
    name: "Market Strip",
    x: 3360,
    y: 0,
    width: 960,
    height: 2240,
    tint: "rgba(255, 216, 102, 0.05)",
    ground: "#0b1018",
    roadGlow: "rgba(255, 216, 102, 0.05)",
  },
];

const ROAD_LAYOUT = [
  { kind: "horizontal", x: 0, y: 178, width: WORLD.width, height: 138, sidewalk: 22, crosswalks: [220, 760, 1260, 1740, 2280, 2820] },
  { kind: "horizontal", x: 0, y: 556, width: WORLD.width, height: 160, sidewalk: 24, crosswalks: [220, 760, 1260, 1740, 2280, 2820] },
  { kind: "horizontal", x: 0, y: 980, width: WORLD.width, height: 160, sidewalk: 24, crosswalks: [220, 760, 1260, 1740, 2280, 2820] },
  { kind: "horizontal", x: 0, y: 1440, width: WORLD.width, height: 150, sidewalk: 22, crosswalks: [220, 760, 1260, 1740, 2280, 2820] },
  { kind: "horizontal", x: 0, y: 1860, width: WORLD.width, height: 150, sidewalk: 20, crosswalks: [220, 760, 1260, 1740, 2280, 2820] },
  { kind: "vertical", x: 148, y: 0, width: 144, height: WORLD.height, sidewalk: 24, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 688, y: 0, width: 160, height: WORLD.height, sidewalk: 24, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 1188, y: 0, width: 160, height: WORLD.height, sidewalk: 24, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 1668, y: 0, width: 156, height: WORLD.height, sidewalk: 22, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 2208, y: 0, width: 166, height: WORLD.height, sidewalk: 24, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 2748, y: 0, width: 150, height: WORLD.height, sidewalk: 22, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 3288, y: 0, width: 150, height: WORLD.height, sidewalk: 22, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 3828, y: 0, width: 150, height: WORLD.height, sidewalk: 22, crosswalks: [248, 636, 1060, 1515, 1935] },
  { kind: "vertical", x: 3040, y: 1040, width: 76, height: 1120, sidewalk: 12, crosswalks: [1515, 1935], isAlley: true },
  { kind: "horizontal", x: 2400, y: 1224, width: 920, height: 74, sidewalk: 12, crosswalks: [2520, 2940], isAlley: true },
  { kind: "horizontal", x: 180, y: 1680, width: 940, height: 72, sidewalk: 10, crosswalks: [312, 760], isAlley: true },
  { kind: "horizontal", x: 3360, y: 760, width: 960, height: 92, sidewalk: 16, crosswalks: [3520, 4060], isAlley: true },
  { kind: "horizontal", x: 3360, y: 1680, width: 960, height: 92, sidewalk: 16, crosswalks: [3520, 4060], isAlley: true },
  { kind: "horizontal", x: 0, y: 2280, width: WORLD.width, height: 150, sidewalk: 20, crosswalks: [220, 760, 1260, 1740, 2280, 2820, 3360, 3900] },
  { kind: "horizontal", x: 0, y: 2680, width: WORLD.width, height: 150, sidewalk: 20, crosswalks: [220, 760, 1260, 1740, 2280, 2820, 3360, 3900] },
  { kind: "vertical", x: 1000, y: 2240, width: 92, height: 800, sidewalk: 16, crosswalks: [2360, 2760], isAlley: true },
  { kind: "horizontal", x: 180, y: 2472, width: 1320, height: 76, sidewalk: 12, crosswalks: [360, 760, 1180], isAlley: true },
  { kind: "horizontal", x: 1680, y: 2478, width: 1460, height: 92, sidewalk: 16, crosswalks: [1860, 2280, 2820], isAlley: true },
  { kind: "vertical", x: 2580, y: 2240, width: 88, height: 800, sidewalk: 12, crosswalks: [2360, 2760], isAlley: true },
  { kind: "vertical", x: 3360, y: 2240, width: 84, height: 800, sidewalk: 10, crosswalks: [2360, 2760], isAlley: true },
];

const BUILDING_BLUEPRINTS = [
  { name: "Burger Barn", type: "burger", sign: "BURGER BARN", district: "Old Market", x: 340, y: 42, width: 188, height: 134, signColor: "#ff8a5b" },
  { name: "Maple Heights", type: "loft", sign: "MAPLE HEIGHTS", district: "Old Market", x: 878, y: 28, width: 220, height: 148, signColor: "#8edaff" },
  { name: "Donut Bloom", type: "donut", sign: "DONUT BLOOM", district: "Old Market", x: 314, y: 340, width: 172, height: 166, signColor: "#ff8bdd" },
  { name: "Oak Terrace", type: "loft", sign: "OAK TERRACE", district: "Old Market", x: 858, y: 354, width: 210, height: 156, signColor: "#79ffb5" },
  { name: "Clover Court", type: "loft", sign: "CLOVER COURT", district: "Downtown Core", x: 1380, y: 36, width: 228, height: 144, signColor: "#e5feff" },
  { name: "Silver Crest", type: "tower", sign: "SILVER CREST", district: "Tower Mile", x: 2446, y: 28, width: 248, height: 246, signColor: "#7db5ff" },
  { name: "Riverstone Plaza", type: "tower", sign: "RIVERSTONE PLAZA", district: "Downtown Core", x: 1924, y: 38, width: 252, height: 232, signColor: "#9dc8ff" },
  { name: "Grand Elm Tower", type: "tower", sign: "GRAND ELM TOWER", district: "Tower Mile", x: 2988, y: 34, width: 214, height: 210, signColor: "#79ffb5" },
  { name: "Golden Chicken", type: "chicken", sign: "GOLDEN CHICKEN", district: "Night Arcade", x: 320, y: 778, width: 224, height: 168, signColor: "#ffd866" },
  { name: "Linden Square", type: "loft", sign: "LINDEN SQUARE", district: "Night Arcade", x: 888, y: 784, width: 226, height: 170, signColor: "#8edaff" },
  { name: "Sushi Wave", type: "sushi", sign: "SUSHI WAVE", district: "Night Arcade", x: 330, y: 1188, width: 186, height: 152, signColor: "#58f4ff" },
  { name: "Juniper House", type: "loft", sign: "JUNIPER HOUSE", district: "Night Arcade", x: 884, y: 1188, width: 200, height: 150, signColor: "#79ffb5" },
  { name: "Bricklane Homes", type: "loft", sign: "BRICKLANE HOMES", district: "Warehouse Belt", x: 1360, y: 1186, width: 230, height: 166, signColor: "#58f4ff" },
  { name: "Harborview Residences", type: "loft", sign: "HARBORVIEW RESID", district: "Warehouse Belt", x: 1902, y: 1198, width: 254, height: 172, signColor: "#ffd866" },
  { name: "Coffee Corner", type: "cafe", sign: "COFFEE CORNER", district: "Harbor Edge", x: 2468, y: 1188, width: 226, height: 162, signColor: "#d8fbff" },
  { name: "Pizza Port", type: "pizza", sign: "PIZZA PORT", district: "Harbor Edge", x: 2998, y: 1192, width: 214, height: 154, signColor: "#ff9a62" },
  { name: "Cedar Point", type: "loft", sign: "CEDAR POINT", district: "Harbor Edge", x: 2452, y: 1622, width: 214, height: 152, signColor: "#58f4ff" },
  { name: "Marina Towers", type: "tower", sign: "MARINA TOWERS", district: "Harbor Edge", x: 2968, y: 1534, width: 232, height: 242, signColor: "#9abfff" },
  { name: "Ashford Flats", type: "loft", sign: "ASHFORD FLATS", district: "Warehouse Belt", x: 1342, y: 1616, width: 188, height: 160, signColor: "#8edaff" },
  { name: "Willow Commons", type: "loft", sign: "WILLOW COMMONS", district: "Warehouse Belt", x: 1884, y: 1628, width: 246, height: 170, signColor: "#ffd866" },
  { name: "Brookline House", type: "loft", sign: "BROOKLINE HOUSE", district: "Downtown Core", x: 1362, y: 356, width: 192, height: 154, signColor: "#58f4ff" },
  { name: "Quartz Heights", type: "tower", sign: "QUARTZ HEIGHTS", district: "Downtown Core", x: 1904, y: 330, width: 274, height: 208, signColor: "#c9f7ff" },
  { name: "Aster Court", type: "tower", sign: "ASTER COURT", district: "Tower Mile", x: 2458, y: 350, width: 246, height: 204, signColor: "#7db5ff" },
  { name: "Ivy Towers", type: "tower", sign: "IVY TOWERS", district: "Tower Mile", x: 2988, y: 344, width: 214, height: 210, signColor: "#9de3ff" },
  { name: "Garden Terrace", type: "loft", sign: "GARDEN TERRACE", district: "Old Market", x: 344, y: 1968, width: 216, height: 158, signColor: "#79ffb5" },
  { name: "Canal View", type: "loft", sign: "CANAL VIEW", district: "Night Arcade", x: 878, y: 1972, width: 204, height: 154, signColor: "#58f4ff" },
  { name: "Stonegate House", type: "loft", sign: "STONEGATE HOUSE", district: "Warehouse Belt", x: 1890, y: 1972, width: 252, height: 164, signColor: "#ffd866" },
  { name: "Pierlight Residences", type: "loft", sign: "PIERLIGHT RESID", district: "Harbor Edge", x: 2990, y: 1970, width: 216, height: 160, signColor: "#ff5aab" },
  { name: "Steel Motors", type: "carshop", sign: "STEEL MOTORS", district: "Market Strip", x: 3446, y: 34, width: 286, height: 214, signColor: "#7ab7ff", shopType: "carshop" },
  { name: "Velocity Cycles", type: "bikeshop", sign: "VELOCITY CYCLES", district: "Market Strip", x: 3916, y: 42, width: 246, height: 196, signColor: "#79ffb5", shopType: "bikeshop" },
  { name: "Iron Vault", type: "weaponshop", sign: "IRON VAULT", district: "Market Strip", x: 3432, y: 352, width: 312, height: 206, signColor: "#ff7b72", shopType: "weaponshop" },
  { name: "Pixel Plaza", type: "mart", sign: "PIXEL PLAZA", district: "Market Strip", x: 3912, y: 334, width: 252, height: 214, signColor: "#58f4ff" },
  { name: "Turbo Wash", type: "depot", sign: "TURBO WASH", district: "Market Strip", x: 3458, y: 1166, width: 254, height: 180, signColor: "#ffd866" },
  { name: "Midnight Sneaks", type: "club", sign: "MIDNIGHT SNEAKS", district: "Market Strip", x: 3910, y: 1172, width: 252, height: 178, signColor: "#ff5aab" },
  { name: "Chrome Square", type: "tower", sign: "CHROME SQUARE", district: "Market Strip", x: 3446, y: 1538, width: 286, height: 252, signColor: "#8edaff" },
  { name: "Neon Lofts", type: "loft", sign: "NEON LOFTS", district: "Market Strip", x: 3922, y: 1556, width: 232, height: 194, signColor: "#ffd866" },
  { name: "Tool Harbor", type: "depot", sign: "TOOL HARBOR", district: "Market Strip", x: 3454, y: 1954, width: 268, height: 170, signColor: "#c9f7ff" },
  { name: "Bazaar 24", type: "mart", sign: "BAZAAR 24", district: "Market Strip", x: 3912, y: 1948, width: 252, height: 178, signColor: "#79ffb5" },
];

const FOOD_SHOP_TYPES = new Set(["burger", "pizza", "cafe", "sushi", "chicken"]);
const RESIDENTIAL_TYPES = new Set(["loft", "tower", "house", "house_large"]);

const ZONE_CONFIG = {
  residential: {
    treeCount: 18,
    hedgeCount: 12,
    lampCount: 9,
  },
  industrial: {
    containerRows: 7,
    drumClusters: 10,
    crateStacks: 9,
  },
  forestEdge: {
    treeCount: 56,
    stumpCount: 11,
    debrisCount: 12,
  },
};

function mergePropGroups(target, source) {
  Object.entries(source).forEach(([key, items]) => {
    if (!Array.isArray(items)) {
      return;
    }
    if (!target[key]) {
      target[key] = [];
    }
    target[key].push(...items);
  });
}

function createZoneExpansion() {
  const props = {
    residentialTrees: [],
    hedges: [],
    fences: [],
    mailboxes: [],
    driveways: [],
    yardLights: [],
    containers: [],
    drums: [],
    crates: [],
    tanks: [],
    pipes: [],
    grassPatches: [],
    dirtPatches: [],
    debris: [],
    forestTrees: [],
    stumps: [],
  };
  const solidProps = [];

  const districts = [
    {
      name: "住宅地",
      x: 0,
      y: 2240,
      width: 1680,
      height: 800,
      tint: "rgba(136, 209, 159, 0.05)",
      ground: "#0d1716",
      roadGlow: "rgba(174, 225, 186, 0.04)",
      zoneType: "residential",
    },
    {
      name: "工業地帯",
      x: 1680,
      y: 2240,
      width: 1440,
      height: 800,
      tint: "rgba(126, 145, 97, 0.05)",
      ground: "#161812",
      roadGlow: "rgba(163, 174, 115, 0.04)",
      zoneType: "industrial",
    },
    {
      name: "過疎森",
      x: 3120,
      y: 2240,
      width: 1200,
      height: 800,
      tint: "rgba(89, 126, 84, 0.05)",
      ground: "#0a130d",
      roadGlow: "rgba(126, 150, 110, 0.04)",
      zoneType: "forest_edge",
    },
  ];

  const roads = [];

  const buildings = [
    { name: "Pine Mews 1", type: "house", sign: "PINE 01", district: "住宅地", x: 342, y: 2338, width: 142, height: 108, signColor: "#ffd8a8", baseColor: "#324654" },
    { name: "Pine Mews 2", type: "house_large", sign: "PINE 02", district: "住宅地", x: 536, y: 2326, width: 176, height: 126, signColor: "#ffefc8", baseColor: "#3d5b68" },
    { name: "Maple Drive 3", type: "house", sign: "MAPLE 03", district: "住宅地", x: 1118, y: 2334, width: 152, height: 112, signColor: "#ffd9bf", baseColor: "#6a4f47" },
    { name: "Maple Drive 4", type: "house_large", sign: "MAPLE 04", district: "住宅地", x: 1318, y: 2326, width: 170, height: 124, signColor: "#f7f0ca", baseColor: "#58656b" },
    { name: "Elm Row 5", type: "house", sign: "ELM 05", district: "住宅地", x: 314, y: 2558, width: 144, height: 110, signColor: "#ffddb4", baseColor: "#485d5a" },
    { name: "Elm Row 6", type: "house", sign: "ELM 06", district: "住宅地", x: 522, y: 2574, width: 136, height: 102, signColor: "#ffe9bf", baseColor: "#66514c" },
    { name: "Cedar Lane 7", type: "house_large", sign: "CEDAR 07", district: "住宅地", x: 1122, y: 2552, width: 176, height: 124, signColor: "#fce5bf", baseColor: "#4d596a" },
    { name: "Cedar Lane 8", type: "house", sign: "CEDAR 08", district: "住宅地", x: 1350, y: 2566, width: 146, height: 108, signColor: "#ffe0b2", baseColor: "#576451" },
    { name: "Willow Court 9", type: "house_large", sign: "WILLOW 09", district: "住宅地", x: 344, y: 2804, width: 174, height: 128, signColor: "#ffe7d1", baseColor: "#374d63" },
    { name: "Willow Court 10", type: "house", sign: "WILLOW 10", district: "住宅地", x: 1124, y: 2798, width: 156, height: 114, signColor: "#fff1d0", baseColor: "#64534a" },
    { name: "North Freight Depot", type: "warehouse", sign: "NORTH FREIGHT", district: "工業地帯", x: 1840, y: 2320, width: 310, height: 156, signColor: "#d8e0ea" },
    { name: "Rivet Works", type: "factory", sign: "RIVET WORKS", district: "工業地帯", x: 2198, y: 2316, width: 328, height: 164, signColor: "#ff9a62" },
    { name: "Steel Drum Yard", type: "warehouse", sign: "DRUM YARD", district: "工業地帯", x: 2728, y: 2326, width: 308, height: 152, signColor: "#d2d8e0" },
    { name: "Foundry Annex", type: "factory", sign: "FOUNDRY ANNEX", district: "工業地帯", x: 1828, y: 2588, width: 340, height: 166, signColor: "#ffb08d" },
    { name: "Cargo Lattice", type: "warehouse", sign: "CARGO LATTICE", district: "工業地帯", x: 2190, y: 2806, width: 304, height: 152, signColor: "#cbd4dc" },
    { name: "Boiler Stack", type: "factory", sign: "BOILER STACK", district: "工業地帯", x: 2722, y: 2798, width: 318, height: 166, signColor: "#e0c6b0" },
    { name: "Forest Shack", type: "shed", sign: "OLD SHACK", district: "過疎森", x: 3628, y: 2588, width: 164, height: 124, signColor: "#d7d3c5", baseColor: "#4a4336" },
  ];

  buildings
    .filter((building) => building.district === "住宅地")
    .forEach((building, index) => {
      const lotLeft = building.x - 26;
      const lotTop = building.y - 18;
      const lotWidth = building.width + 52;
      const lotHeight = building.height + 54;
      props.grassPatches.push({ x: lotLeft, y: lotTop, width: lotWidth, height: lotHeight, color: index % 2 === 0 ? "rgba(74, 112, 81, 0.16)" : "rgba(96, 132, 89, 0.14)" });
      props.driveways.push({ x: building.x + building.width - 34, y: building.y + building.height + 4, width: 28, height: 44 });
      props.mailboxes.push({ x: building.x + 12, y: building.y + building.height + 18, color: index % 2 === 0 ? "#8fb6d5" : "#d58f8f" });
      props.yardLights.push({ x: building.x + building.width - 16, y: building.y + building.height + 14, glow: index % 2 === 0 ? "#ffcf68" : "#ffe3a3" });
      props.residentialTrees.push({ x: building.x - 14, y: building.y + 26, size: 18 + (index % 3) * 2 });
      props.residentialTrees.push({ x: building.x + building.width + 20, y: building.y + 36, size: 16 + (index % 2) * 4 });
      props.fences.push({ x: lotLeft, y: building.y + building.height + 40, width: lotWidth, height: 4 });
      if (index < ZONE_CONFIG.residential.hedgeCount) {
        props.hedges.push({ x: lotLeft + 8, y: lotTop + 8, width: 34 + (index % 2) * 12, height: 12 });
      }
    });

  for (let index = 0; index < ZONE_CONFIG.residential.lampCount; index += 1) {
    props.yardLights.push({
      x: 184 + index * 150 + (index % 2) * 20,
      y: index < 5 ? 2264 : 2662,
      glow: index % 2 === 0 ? "#ffd987" : "#b7ffde",
      tall: true,
    });
  }

  const containerPlacements = [
    { x: 1878, y: 2500, width: 56, height: 28, color: "#7b8ea1" },
    { x: 1940, y: 2500, width: 56, height: 28, color: "#c66f57" },
    { x: 2010, y: 2500, width: 56, height: 28, color: "#4a6673" },
    { x: 2612, y: 2524, width: 60, height: 28, color: "#708087" },
    { x: 2678, y: 2524, width: 60, height: 28, color: "#855a47" },
    { x: 2890, y: 2532, width: 60, height: 28, color: "#62756b" },
    { x: 2958, y: 2532, width: 60, height: 28, color: "#8d6d52" },
  ];
  containerPlacements.forEach((container) => {
    props.containers.push(container);
    solidProps.push({ x: container.x, y: container.y, width: container.width, height: container.height, kind: "container" });
  });

  [
    { x: 2458, y: 2578, r: 28 },
    { x: 2518, y: 2624, r: 24 },
    { x: 3014, y: 2632, r: 32 },
  ].forEach((tank) => {
    props.tanks.push(tank);
    solidProps.push({ x: tank.x - tank.r, y: tank.y - tank.r, width: tank.r * 2, height: tank.r * 2, kind: "tank" });
  });

  for (let index = 0; index < ZONE_CONFIG.industrial.drumClusters; index += 1) {
    props.drums.push({
      x: 1760 + (index % 5) * 210 + (index % 2) * 26,
      y: 2558 + Math.floor(index / 5) * 178 + (index % 3) * 14,
      count: 2 + (index % 3),
    });
  }

  for (let index = 0; index < ZONE_CONFIG.industrial.crateStacks; index += 1) {
    const crate = {
      x: 1898 + (index % 4) * 236,
      y: 2740 + Math.floor(index / 4) * 106,
      width: 24 + (index % 2) * 6,
      height: 24 + (index % 3) * 4,
    };
    props.crates.push(crate);
    if (index % 2 === 0) {
      solidProps.push({ x: crate.x, y: crate.y, width: crate.width, height: crate.height, kind: "crate" });
    }
  }

  props.pipes.push(
    { x: 2140, y: 2528, width: 180, height: 12 },
    { x: 2764, y: 2714, width: 210, height: 12 },
    { x: 2380, y: 2934, width: 124, height: 12 }
  );

  for (let index = 0; index < 18; index += 1) {
    props.dirtPatches.push({
      x: 1750 + (index % 6) * 220 + (index % 2) * 12,
      y: 2260 + Math.floor(index / 6) * 240 + (index % 3) * 18,
      width: 72 + (index % 3) * 18,
      height: 42 + (index % 2) * 12,
      color: index % 2 === 0 ? "rgba(72, 57, 41, 0.13)" : "rgba(96, 82, 54, 0.11)",
    });
  }

  for (let index = 0; index < 20; index += 1) {
    props.grassPatches.push({
      x: 1710 + (index % 5) * 270 + (index % 2) * 18,
      y: 2268 + Math.floor(index / 5) * 180 + (index % 3) * 14,
      width: 92 + (index % 3) * 28,
      height: 52 + (index % 2) * 14,
      color: index % 2 === 0 ? "rgba(86, 111, 68, 0.14)" : "rgba(108, 128, 74, 0.11)",
    });
  }

  const forestRandom = createSeededRandom("forest-edge-layout");
  for (let index = 0; index < ZONE_CONFIG.forestEdge.treeCount; index += 1) {
    const x = 3210 + Math.floor(forestRandom() * 1040);
    const y = 2290 + Math.floor(forestRandom() * 700);
    const size = 14 + Math.floor(forestRandom() * 16);
    props.forestTrees.push({ x, y, size, tone: forestRandom() < 0.55 ? "#203c26" : "#2f4c31" });
  }
  for (let index = 0; index < ZONE_CONFIG.forestEdge.stumpCount; index += 1) {
    props.stumps.push({
      x: 3260 + (index % 5) * 178 + (index % 2) * 16,
      y: 2360 + Math.floor(index / 5) * 248 + (index % 3) * 22,
      radius: 9 + (index % 3),
    });
  }
  for (let index = 0; index < ZONE_CONFIG.forestEdge.debrisCount; index += 1) {
    props.debris.push({
      x: 3230 + (index % 4) * 220 + (index % 2) * 30,
      y: 2440 + Math.floor(index / 4) * 170 + (index % 3) * 18,
      kind: index % 3 === 0 ? "barrel" : index % 3 === 1 ? "scrap" : "crate",
    });
  }
  for (let index = 0; index < 18; index += 1) {
    props.grassPatches.push({
      x: 3180 + (index % 6) * 180 + (index % 2) * 18,
      y: 2260 + Math.floor(index / 6) * 228 + (index % 3) * 18,
      width: 86 + (index % 3) * 24,
      height: 58 + (index % 2) * 16,
      color: index % 2 === 0 ? "rgba(55, 86, 53, 0.16)" : "rgba(76, 105, 62, 0.12)",
    });
  }
  [
    { x: 3574, y: 2742, width: 42, height: 42, kind: "forest-crate" },
    { x: 3872, y: 2468, width: 36, height: 36, kind: "forest-crate" },
    { x: 4010, y: 2860, width: 30, height: 48, kind: "barrel-stack" },
  ].forEach((prop) => {
    solidProps.push({ x: prop.x, y: prop.y, width: prop.width, height: prop.height, kind: prop.kind });
  });

  return { districts, roads, buildings, props, solidProps };
}

function createCityMap() {
  const zoneExpansion = createZoneExpansion();
  const roads = [...ROAD_LAYOUT, ...zoneExpansion.roads];
  const buildings = [...BUILDING_BLUEPRINTS, ...zoneExpansion.buildings].map(createBuildingFromBlueprint);

  const props = {
    streetLights: [],
    bins: [],
    poles: [],
    signs: [],
    stains: [],
    residentialTrees: [],
    hedges: [],
    fences: [],
    mailboxes: [],
    driveways: [],
    yardLights: [],
    containers: [],
    drums: [],
    crates: [],
    tanks: [],
    pipes: [],
    grassPatches: [],
    dirtPatches: [],
    debris: [],
    forestTrees: [],
    stumps: [],
  };

  roads.forEach((road) => {
    addRoadProps(road, props);
  });

  addDistrictProps(props);
  mergePropGroups(props, zoneExpansion.props);

  const pickupPoints = buildings
    .filter((building) => FOOD_SHOP_TYPES.has(building.type))
    .map((building, index) => ({
      name: building.name,
      kind: "pickup",
      x: building.entrance.x + building.entrance.width / 2,
      y: building.y + building.height + 30,
      color: ["#ff7b72", "#ffd866", "#58f4ff", "#79ffb5", "#ff9a62"][index % 5],
    }));

  const deliveryPoints = buildings
    .filter((building) => RESIDENTIAL_TYPES.has(building.type))
    .map((building, index) => ({
      name: building.name,
      kind: "delivery",
      x: building.entrance.x + building.entrance.width / 2,
      y: building.y + building.height + 30,
      color: ["#8edaff", "#9d7cff", "#79ffb5", "#ffd866", "#ff5aab"][index % 5],
    }));

  const postingPoints = buildings.map((building, index) => ({
    name: building.name,
    kind: "posting",
    targetType: RESIDENTIAL_TYPES.has(building.type) ? "home" : "store",
    x: building.entrance.x + building.entrance.width / 2,
    y: building.y + building.height + 30,
    color: ["#ffd866", "#ff9a62", "#58f4ff", "#79ffb5", "#ff5aab"][index % 5],
  }));

  const shopLocations = buildings
    .filter((building) => building.shopType && SHOP_CATALOG[building.shopType])
    .map((building) => ({
      name: building.name,
      shopType: building.shopType,
      x: building.entrance.x + building.entrance.width / 2,
      y: building.y + building.height + 26,
      color: building.signColor || building.style.signGlow,
    }));

  const specialEntryPoints = buildings
    .filter((building) => building.type === "tower")
    .map((building, index) => ({
      name: building.name,
      kind: "special-entry",
      x: building.entrance.x + building.entrance.width / 2,
      y: building.y + building.height + 34,
      worldReturnSpawn: {
        x: building.entrance.x + building.entrance.width / 2,
        y: building.y + building.height + 88,
      },
      color: ["#ff7b72", "#ff5aab", "#ffd866", "#8edaff"][index % 4],
    }));

  const specialReturnPoints = buildings
    .filter((building) => building.type === "depot" || building.type === "mart")
    .map((building, index) => ({
      name: building.name,
      kind: "special-return",
      x: building.entrance.x + building.entrance.width / 2,
      y: building.y + building.height + 34,
      color: ["#79ffb5", "#58f4ff", "#ffd866"][index % 3],
    }));

  const bankPoints = buildings
    .filter((building) => building.type === "tower")
    .map((building, index) => ({
      name: `${building.name} Bank`,
      kind: "cashout-bank",
      x: building.entrance.x + building.entrance.width / 2,
      y: building.y + building.height + 34,
      color: ["#8edaff", "#79ffb5", "#ffd866", "#ff9f7a"][index % 4],
    }));

  return {
    districts: [...CITY_DISTRICTS, ...zoneExpansion.districts],
    roads,
    buildings,
    pickupPoints,
    deliveryPoints,
    postingPoints,
    specialEntryPoints,
    specialReturnPoints,
    bankPoints,
    shopLocations,
    props,
    solidProps: zoneExpansion.solidProps,
  };
}

function createBuildingFromBlueprint(blueprint) {
  const building = {
    ...blueprint,
    baseColor: blueprint.baseColor || getBuildingStyle(blueprint.type).body,
    trimColor: blueprint.trimColor || getBuildingStyle(blueprint.type).trim,
    roofUnits: blueprint.roofUnits || createRoofUnits(blueprint),
    rearDoor: blueprint.rearDoor || createRearDoor(blueprint),
  };

  building.style = getBuildingStyle(building.type);
  building.windows = createBuildingWindows(building);
  building.entrance = createBuildingEntranceLayout(building);
  building.signLayout = createBuildingSignLayout(building);
  building.frontProps = createBuildingFrontProps(building);
  return building;
}

function createRoofUnits(blueprint) {
  const random = createSeededRandom(`${blueprint.name}-roof`);
  const count =
    blueprint.type === "tower"
      ? 3
      : blueprint.type === "house" || blueprint.type === "house_large" || blueprint.type === "shed"
        ? 1
        : randomRange(random, 1, 2);
  const units = [];

  for (let index = 0; index < count; index += 1) {
    units.push({
      x: randomRange(random, 18, Math.max(20, blueprint.width - 64)),
      y: randomRange(random, 14, 24),
      width: randomRange(random, 26, 48),
      height: randomRange(random, 16, 28),
    });
  }

  return units;
}

function createRearDoor(blueprint) {
  const random = createSeededRandom(`${blueprint.name}-rear`);
  if (blueprint.type === "shed") {
    return null;
  }
  return {
    x: randomRange(random, 12, Math.max(14, blueprint.width - 28)),
    y: randomRange(random, 52, Math.max(54, blueprint.height - 38)),
    width: randomRange(random, 12, 14),
    height: randomRange(random, 22, 28),
  };
}

function addRoadProps(road, props) {
  const spacing = road.isAlley ? 220 : 180;

  if (road.kind === "horizontal") {
    for (let x = road.x + 90; x < road.x + road.width; x += spacing) {
      props.streetLights.push({ x, y: road.y - (road.sidewalk || 0) + 10, glow: x % 360 < 180 ? "#58f4ff" : "#ffcf68" });
      props.streetLights.push({ x: x + 24, y: road.y + road.height + (road.sidewalk || 0) - 10, glow: x % 300 < 120 ? "#79ffb5" : "#ff5aab" });
      props.stains.push({ x: x + 10, y: road.y + road.height / 2 + ((x / 12) % 22), r: 18 + (x % 3) * 6, a: 0.06 });
    }
  } else {
    for (let y = road.y + 90; y < road.y + road.height; y += spacing) {
      props.poles.push({ x: road.x - (road.sidewalk || 0) + 12, y });
      props.poles.push({ x: road.x + road.width + (road.sidewalk || 0) - 12, y: y + 18 });
      props.stains.push({ x: road.x + road.width / 2 - 14, y: y + 10, r: 16 + (y % 4) * 4, a: 0.05 });
    }
  }

  (road.crosswalks || []).forEach((cross) => {
    if (road.kind === "horizontal") {
      props.signs.push({ x: cross - 18, y: road.y - 28, text: cross % 2 === 0 ? "AVE" : "BLK" });
    } else {
      props.signs.push({ x: road.x + road.width + 14, y: cross - 8, text: cross % 2 === 0 ? "ST" : "WAY" });
    }
  });
}

function addDistrictProps(props) {
  const extras = [
    { x: 1060, y: 868 },
    { x: 2150, y: 868 },
    { x: 2700, y: 1340 },
    { x: 3220, y: 1750 },
    { x: 560, y: 1736 },
  ];

  extras.forEach((bin, index) => {
    props.bins.push(bin);
    props.stains.push({ x: bin.x + 8, y: bin.y + 18, r: 24, a: 0.08 });
    props.signs.push({ x: bin.x + 22, y: bin.y - 10, text: ["FOOD", "NITE", "DOCK", "SHIP", "PLAY"][index] });
  });
}

const mapData = createCityMap();

const collisionRects = [
  ...mapData.buildings.map((building) => ({
    x: building.x,
    y: building.y,
    width: building.width,
    height: building.height,
  })),
  ...(mapData.solidProps || []).map((prop) => ({
    x: prop.x,
    y: prop.y,
    width: prop.width,
    height: prop.height,
  })),
];

function isWorldRoadPoint(x, y, radius = 0) {
  return mapData.roads.some((road) => (
    x >= road.x + radius &&
    x <= road.x + road.width - radius &&
    y >= road.y + radius &&
    y <= road.y + road.height - radius
  ));
}

const player = {
  x: 520,
  y: 246,
  collisionRadius: 10,
  baseSpeed: CONFIG.movement.onFootMaxSpeed,
  direction: "down",
  isMoving: false,
  motion: {
    x: 0,
    y: 0,
  },
  colors: {
    jacket: "#79ffb5",
    pants: "#1d2d4a",
    skin: "#f5c6a4",
    helmet: "#eef4ff",
  },
};

const npcCars = [
  { axis: "horizontal", lane: 246, position: 100, speed: 84, width: 44, height: 22, color: "#d24d47", roofColor: "#f4b387", glassColor: "#9fc2ff", accentColor: "#7a1712" },
  { axis: "horizontal", lane: 634, position: 920, speed: -96, width: 50, height: 24, color: "#4f75d9", roofColor: "#b7cdfd", glassColor: "#d9ecff", accentColor: "#1e326e" },
  { axis: "horizontal", lane: 1060, position: 1500, speed: 72, width: 48, height: 22, color: "#c4932f", roofColor: "#f8dda5", glassColor: "#cfe3ff", accentColor: "#71500d" },
  { axis: "horizontal", lane: 1512, position: 2720, speed: -90, width: 46, height: 24, color: "#2f8d69", roofColor: "#b5f7d1", glassColor: "#d6efff", accentColor: "#15513a" },
  { axis: "horizontal", lane: 1930, position: 460, speed: 64, width: 44, height: 20, color: "#8a57d4", roofColor: "#d9c2ff", glassColor: "#d5e7ff", accentColor: "#47257f" },
  { axis: "vertical", lane: 220, position: 80, speed: 76, width: 22, height: 42, color: "#c59b38", roofColor: "#f2e0a4", glassColor: "#d7e9ff", accentColor: "#76550c" },
  { axis: "vertical", lane: 760, position: 1620, speed: -72, width: 24, height: 46, color: "#3f95d4", roofColor: "#d7f2ff", glassColor: "#d8ebff", accentColor: "#1d4a72" },
  { axis: "vertical", lane: 1260, position: 540, speed: 88, width: 24, height: 48, color: "#4ba36b", roofColor: "#d3ffd9", glassColor: "#dceeff", accentColor: "#1d5d37" },
  { axis: "vertical", lane: 1740, position: 1840, speed: -82, width: 24, height: 48, color: "#d46c4e", roofColor: "#ffd0bf", glassColor: "#dbe9ff", accentColor: "#7a2e1a" },
  { axis: "vertical", lane: 2280, position: 1260, speed: 92, width: 24, height: 46, color: "#6a8de0", roofColor: "#d8e2ff", glassColor: "#ecf6ff", accentColor: "#304b8c" },
  { axis: "vertical", lane: 2820, position: 320, speed: -74, width: 22, height: 42, color: "#8f7a55", roofColor: "#ddd0b9", glassColor: "#d8e9ff", accentColor: "#4b3d24" },
];

function createPedestrians() {
  const palette = [
    { shirt: "#d0584f", pants: "#3a2b36", skin: "#f2c09b", hair: "#2d1c1a" },
    { shirt: "#4f86d9", pants: "#22314f", skin: "#f3c8a4", hair: "#151515" },
    { shirt: "#50a375", pants: "#1c2b28", skin: "#b97a56", hair: "#24150f" },
    { shirt: "#d39b39", pants: "#443625", skin: "#e1b18f", hair: "#37211e" },
    { shirt: "#8a60d6", pants: "#2a2240", skin: "#f1c7b1", hair: "#2b2220" },
    { shirt: "#d96c8e", pants: "#3e2432", skin: "#8f5d41", hair: "#130e0c" },
  ];

  const routes = [
    { axis: "horizontal", start: 340, end: 1110, lane: 354, dir: 1, zone: "sidewalk" },
    { axis: "horizontal", start: 1360, end: 2140, lane: 922, dir: -1, zone: "sidewalk" },
    { axis: "horizontal", start: 2460, end: 3190, lane: 1378, dir: 1, zone: "sidewalk" },
    { axis: "horizontal", start: 3440, end: 4190, lane: 588, dir: -1, zone: "sidewalk" },
    { axis: "horizontal", start: 3440, end: 4180, lane: 894, dir: 1, zone: "sidewalk" },
    { axis: "horizontal", start: 3440, end: 4180, lane: 1392, dir: -1, zone: "sidewalk" },
    { axis: "horizontal", start: 3440, end: 4180, lane: 1812, dir: 1, zone: "sidewalk" },
    { axis: "vertical", start: 360, end: 880, lane: 634, dir: 1, zone: "sidewalk" },
    { axis: "vertical", start: 1120, end: 1760, lane: 1158, dir: -1, zone: "sidewalk" },
    { axis: "vertical", start: 1260, end: 2060, lane: 2376, dir: 1, zone: "sidewalk" },
    { axis: "vertical", start: 1460, end: 2060, lane: 3348, dir: -1, zone: "sidewalk" },
    { axis: "vertical", start: 126, end: 358, lane: 760, dir: 1, zone: "crosswalk" },
    { axis: "vertical", start: 930, end: 1188, lane: 1260, dir: -1, zone: "crosswalk" },
    { axis: "vertical", start: 1390, end: 1640, lane: 1740, dir: 1, zone: "crosswalk" },
    { axis: "horizontal", start: 120, end: 340, lane: 636, dir: -1, zone: "crosswalk" },
    { axis: "horizontal", start: 2140, end: 2410, lane: 1060, dir: 1, zone: "crosswalk" },
    { axis: "horizontal", start: 3240, end: 3488, lane: 1515, dir: -1, zone: "crosswalk" },
    { axis: "horizontal", start: 260, end: 920, lane: 2528, dir: 1, zone: "sidewalk" },
    { axis: "horizontal", start: 1140, end: 1500, lane: 2528, dir: -1, zone: "sidewalk" },
    { axis: "horizontal", start: 1880, end: 3020, lane: 2588, dir: 1, zone: "sidewalk" },
    { axis: "vertical", start: 2320, end: 2960, lane: 1048, dir: 1, zone: "sidewalk" },
    { axis: "vertical", start: 2320, end: 2960, lane: 2624, dir: -1, zone: "sidewalk" },
  ];

  return routes.map((route, index) => {
    const random = createSeededRandom(`ped-${index}`);
    const colors = palette[index % palette.length];
    const position = randomRange(random, route.start, route.end);
    return {
      ...route,
      position,
      speed: randomRange(random, route.zone === "crosswalk" ? 34 : 22, route.zone === "crosswalk" ? 48 : 34),
      radius: route.zone === "crosswalk" ? 8 : 7,
      swayOffset: random() * Math.PI * 2,
      colors,
    };
  });
}

const pedestrians = createPedestrians();

function createBuildingWindows(building) {
  const windows = [];
  const random = createSeededRandom(`${building.name}-windows`);
  const isHouse = building.type === "house" || building.type === "house_large" || building.type === "shed";
  const cols = isHouse
    ? Math.max(2, Math.floor((building.width - 28) / randomRange(random, 34, 48)))
    : Math.max(2, Math.floor((building.width - 30) / randomRange(random, 28, 38)));
  const rows = isHouse
    ? Math.max(1, Math.floor((building.height - 50) / randomRange(random, 28, 38)))
    : Math.max(2, Math.floor((building.height - 54) / randomRange(random, 26, 34)));
  const usableWidth = building.width - 36;
  const gapX = cols > 1 ? usableWidth / (cols - 1) : 0;
  const gapY = isHouse ? randomRange(random, 30, 38) : randomRange(random, 24, 30);
  const startY = (isHouse ? 34 : 28) + randomRange(random, 0, 6);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const litChance = building.type === "tower" ? 0.32 : building.type === "mart" ? 0.45 : isHouse ? 0.62 : 0.26;
      const isLit = random() < litChance;
      const warmTone = random() < 0.55;
      windows.push({
        x: building.x + 18 + gapX * col,
        y: building.y + startY + row * gapY,
        width: randomRange(random, 10, 14),
        height: randomRange(random, 12, 17),
        isLit,
        glow: isLit ? (warmTone ? "rgba(255, 210, 135, 0.22)" : "rgba(126, 227, 255, 0.2)") : "rgba(0, 0, 0, 0)",
        color: isLit ? (warmTone ? "#ffd79a" : "#9ae6ff") : "#182235",
      });
    }
  }

  return windows;
}

function getBuildingStyle(type) {
  const styleMap = {
    house: { body: "#435867", bodyShade: "#2b3943", trim: "#d6c6aa", roof: "#6f4d44", signGlow: "#ffd8a8", signText: "#fff0d2", windowDark: "#182235", doorGlow: "rgba(255, 224, 168, 0.18)", awning: "#70564e", accent: "#8fc6a4" },
    house_large: { body: "#596671", bodyShade: "#35414b", trim: "#d9d0c4", roof: "#7b6551", signGlow: "#ffefc8", signText: "#fff9e8", windowDark: "#1a2533", doorGlow: "rgba(255, 239, 200, 0.18)", awning: "#7d6754", accent: "#aac7d7" },
    warehouse: { body: "#3b3f47", bodyShade: "#23262b", trim: "#7d858f", roof: "#5a5f68", signGlow: "#dbe3ee", signText: "#eef4ff", windowDark: "#222833", doorGlow: "rgba(188, 204, 220, 0.16)", awning: "#525862", accent: "#9ba8b8" },
    factory: { body: "#4a3a36", bodyShade: "#2a201f", trim: "#8d685d", roof: "#674d46", signGlow: "#ff9a62", signText: "#ffe5d2", windowDark: "#261f24", doorGlow: "rgba(255, 154, 98, 0.18)", awning: "#745952", accent: "#d09978" },
    shed: { body: "#4a4336", bodyShade: "#2d2822", trim: "#86725d", roof: "#635141", signGlow: "#cfc9bb", signText: "#efe8d9", windowDark: "#221e1a", doorGlow: "rgba(207, 201, 187, 0.14)", awning: "#6c5b4c", accent: "#b0a28f" },
    loft: { body: "#1b2740", bodyShade: "#121a2a", trim: "#324767", roof: "#24324d", signGlow: "#58f4ff", signText: "#b9f8ff", windowDark: "#182235", doorGlow: "rgba(88, 244, 255, 0.22)", awning: "#243552", accent: "#7da6ff" },
    cafe: { body: "#221c33", bodyShade: "#171224", trim: "#453365", roof: "#312449", signGlow: "#58f4ff", signText: "#c7fdff", windowDark: "#1b2232", doorGlow: "rgba(88, 244, 255, 0.24)", awning: "#2d4264", accent: "#58f4ff" },
    donut: { body: "#2d1d2e", bodyShade: "#1c1120", trim: "#8d5a7e", roof: "#4f2d4c", signGlow: "#ff8bdd", signText: "#ffe6f6", windowDark: "#24182a", doorGlow: "rgba(255, 139, 221, 0.22)", awning: "#6f3a65", accent: "#ffb2e8" },
    chicken: { body: "#2f2418", bodyShade: "#1d160f", trim: "#8f6434", roof: "#4a341d", signGlow: "#ffd866", signText: "#fff1be", windowDark: "#251d15", doorGlow: "rgba(255, 216, 102, 0.22)", awning: "#6b4c28", accent: "#ffb347" },
    mart: { body: "#202634", bodyShade: "#161b25", trim: "#53637d", roof: "#39465b", signGlow: "#dffcff", signText: "#effcff", windowDark: "#202b3c", doorGlow: "rgba(138, 234, 255, 0.22)", awning: "#2a394d", accent: "#8ff4ff" },
    sushi: { body: "#182a2e", bodyShade: "#101b1d", trim: "#3f7b7f", roof: "#23464a", signGlow: "#58f4ff", signText: "#d9feff", windowDark: "#132329", doorGlow: "rgba(88, 244, 255, 0.2)", awning: "#28575d", accent: "#8bfff5" },
    tower: { body: "#1b273f", bodyShade: "#121b2c", trim: "#42618f", roof: "#293a5c", signGlow: "#7db5ff", signText: "#ddebff", windowDark: "#162031", doorGlow: "rgba(125, 181, 255, 0.22)", awning: "#22385b", accent: "#7db5ff" },
    club: { body: "#27182f", bodyShade: "#1b1020", trim: "#634173", roof: "#3a2644", signGlow: "#ff5aab", signText: "#ffd5e8", windowDark: "#241d31", doorGlow: "rgba(255, 90, 171, 0.22)", awning: "#40254a", accent: "#ff7bbd" },
    depot: { body: "#252a33", bodyShade: "#171b22", trim: "#57657a", roof: "#323b49", signGlow: "#58f4ff", signText: "#d8fbff", windowDark: "#202733", doorGlow: "rgba(255, 216, 102, 0.18)", awning: "#394352", accent: "#ffd866" },
    burger: { body: "#2a1f2d", bodyShade: "#1b1320", trim: "#6a4046", roof: "#41272d", signGlow: "#ff8a5b", signText: "#ffe5c4", windowDark: "#251d31", doorGlow: "rgba(255, 138, 91, 0.24)", awning: "#643530", accent: "#ff9a62" },
    pizza: { body: "#2b201b", bodyShade: "#1b1410", trim: "#8a4b35", roof: "#4a271d", signGlow: "#ff7b72", signText: "#ffe2cf", windowDark: "#251d18", doorGlow: "rgba(255, 123, 114, 0.22)", awning: "#6f3526", accent: "#ff9c5f" },
    carshop: { body: "#18253a", bodyShade: "#0e1726", trim: "#4c77b8", roof: "#263954", signGlow: "#7ab7ff", signText: "#e4f1ff", windowDark: "#132033", doorGlow: "rgba(122, 183, 255, 0.26)", awning: "#2b4264", accent: "#8ec3ff" },
    bikeshop: { body: "#152c28", bodyShade: "#0d1917", trim: "#3f8d75", roof: "#234842", signGlow: "#79ffb5", signText: "#e6fff2", windowDark: "#11231f", doorGlow: "rgba(121, 255, 181, 0.24)", awning: "#28564c", accent: "#79ffb5" },
    weaponshop: { body: "#311b1b", bodyShade: "#1f1010", trim: "#8c4444", roof: "#4f2525", signGlow: "#ff7b72", signText: "#ffe4df", windowDark: "#241414", doorGlow: "rgba(255, 123, 114, 0.22)", awning: "#5f2d2d", accent: "#ffb0a8" },
  };

  return styleMap[type] || styleMap.loft;
}

function createBuildingEntranceLayout(building) {
  const random = createSeededRandom(`${building.name}-entrance`);
  const isHouse = building.type === "house" || building.type === "house_large" || building.type === "shed";
  const width = isHouse ? randomRange(random, 18, 26) : randomRange(random, 24, 34);
  const height = isHouse ? randomRange(random, 18, 24) : randomRange(random, 20, 28);
  const margin = 18;
  const x = building.x + randomRange(random, margin, building.width - width - margin);
  const y = building.y + building.height - height;

  return { x, y, width, height, sideLight: random() < 0.5 };
}

function createBuildingSignLayout(building) {
  const random = createSeededRandom(`${building.name}-sign`);
  const isHouse = building.type === "house" || building.type === "house_large" || building.type === "shed";
  const width = isHouse
    ? clamp(randomRange(random, 54, 84), 44, building.width - 30)
    : clamp(randomRange(random, 80, 120), 72, building.width - 28);
  const height = isHouse ? randomRange(random, 14, 18) : randomRange(random, 18, 24);
  const nearEntrance = random() < 0.5;
  const x = nearEntrance
    ? clamp(building.entrance.x + building.entrance.width / 2 - width / 2, building.x + 14, building.x + building.width - width - 14)
    : building.x + randomRange(random, 12, Math.max(13, building.width - width - 12));
  const y = building.y + randomRange(random, 8, 16);

  return { x, y, width, height };
}

function createBuildingFrontProps(building) {
  const random = createSeededRandom(`${building.name}-props`);
  const props = [];
  if (building.type === "house" || building.type === "house_large" || building.type === "shed") {
    return props;
  }
  const available = ["bin", "vending", "ac"];
  const count = random() < 0.65 ? 2 : 1;

  for (let i = 0; i < count; i += 1) {
    const kind = available[(i + Math.floor(random() * available.length)) % available.length];
    const width = kind === "vending" ? 18 : 14;
    const x = building.x + randomRange(random, 10, Math.max(11, building.width - width - 10));
    const y = building.y + building.height + randomRange(random, 6, 18);
    props.push({ kind, x, y });
  }

  return props;
}

function createSeededRandom(seedText) {
  let seed = hashString(seedText);
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomRange(random, min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function getCurrentDayCycleSeconds() {
  return TIME_OF_DAY_CONFIG.dayDurationSeconds;
}

function getCurrentGameMinutes() {
  const cycleSeconds = getCurrentDayCycleSeconds();
  const normalizedSeconds = ((gameState.timeElapsedSeconds % cycleSeconds) + cycleSeconds) % cycleSeconds;
  const elapsedRatio = normalizedSeconds / cycleSeconds;
  return (TIME_OF_DAY_CONFIG.startMinutes + elapsedRatio * 1440) % 1440;
}

function getTimeOfDay() {
  const cycleSeconds = getCurrentDayCycleSeconds();
  let remaining = ((gameState.timeElapsedSeconds % cycleSeconds) + cycleSeconds) % cycleSeconds;
  for (const segment of TIME_OF_DAY_CONFIG.segments) {
    if (remaining < segment.durationSeconds) {
      return segment;
    }
    remaining -= segment.durationSeconds;
  }
  return TIME_OF_DAY_CONFIG.segments[TIME_OF_DAY_CONFIG.segments.length - 1];
}

function formatGameTime(totalMinutes) {
  const safeMinutes = Math.floor(totalMinutes % 1440);
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function updateTimeSystem(deltaTime) {
  gameState.timeElapsedSeconds += deltaTime;
}

function setGameTimeToSegment(segmentKey) {
  let elapsed = 0;
  for (const segment of TIME_OF_DAY_CONFIG.segments) {
    if (segment.key === segmentKey) {
      gameState.timeElapsedSeconds = elapsed + segment.durationSeconds * 0.5;
      updateHUD();
      render();
      showToast(`デバッグ: 時間帯を ${segment.label} に変更`);
      return;
    }
    elapsed += segment.durationSeconds;
  }
}

function getJobTypeMeta(jobType) {
  if (jobType === "taxi") {
    return {
      label: "タクシー業務",
      payLabel: `レンタル ${formatCurrency(ECONOMY.taxi.rentalFee)} / 運賃 ${formatCurrency(ECONOMY.taxi.fareMin)}〜${formatCurrency(ECONOMY.taxi.fareMax)}`,
    };
  }

  if (jobType === "smallMission") {
    return {
      label: ECONOMY.jobs.smallMission.label,
      payLabel: formatJobPayLabel(ECONOMY.jobs.smallMission),
    };
  }

  if (jobType === "food") {
    return {
      label: ECONOMY.jobs.delivery.label,
      payLabel: formatJobPayLabel(ECONOMY.jobs.delivery),
    };
  }

  if (jobType === "special") {
    return {
      label: "危険ジョブ",
      payLabel: formatJobPayLabel(ECONOMY.jobs.riskyBriefcase),
    };
  }

  if (jobType === "rescue") {
    return {
      label: "危険ジョブ",
      payLabel: formatJobPayLabel(ECONOMY.jobs.riskyRescue),
    };
  }

  if (jobType === "cashout") {
    return {
      label: "危険ジョブ",
      payLabel: formatJobPayLabel(ECONOMY.jobs.riskyCashout),
    };
  }

  return {
    label: ECONOMY.jobs.posting.label,
    payLabel: `${formatCurrency(ECONOMY.jobs.posting.min)}〜${formatCurrency(ECONOMY.jobs.posting.max)} / 参加費 ${formatCurrency(ECONOMY.jobs.posting.entryFee)} / ${ECONOMY.jobs.posting.role}`,
  };
}

function getMissionConfig(jobType) {
  if (jobType === "food") {
    return ECONOMY.jobs.delivery;
  }
  if (jobType === "smallMission") {
    return ECONOMY.jobs.smallMission;
  }
  if (jobType === "posting") {
    return ECONOMY.jobs.posting;
  }
  if (jobType === "special") {
    return ECONOMY.jobs.riskyBriefcase;
  }
  if (jobType === "rescue") {
    return ECONOMY.jobs.riskyRescue;
  }
  if (jobType === "cashout") {
    return ECONOMY.jobs.riskyCashout;
  }
  return null;
}

function formatJobPayLabel(rangeConfig) {
  return `${formatCurrency(rangeConfig.min)}〜${formatCurrency(rangeConfig.max)} / 参加費 ${formatCurrency(rangeConfig.entryFee || 0)} / ${rangeConfig.role}`;
}

function formatCurrency(amount) {
  return `${ECONOMY.currencySymbol}${Math.round(amount).toLocaleString("ja-JP")}`;
}

function canAfford(amount) {
  return gameState.money >= amount;
}

function showMoneyChange(amount, reason = "") {
  if (!moneyChangeIndicator || !amount) {
    return;
  }

  moneyChangeIndicator.textContent = `${amount > 0 ? "+" : "-"}${formatCurrency(Math.abs(amount))}${reason ? ` ${reason}` : ""}`;
  moneyChangeIndicator.className = `money-change-indicator visible ${amount > 0 ? "positive" : "negative"}`;

  if (gameState.moneyIndicatorTimeoutId) {
    window.clearTimeout(gameState.moneyIndicatorTimeoutId);
  }

  gameState.moneyIndicatorTimeoutId = window.setTimeout(() => {
    moneyChangeIndicator.classList.remove("visible", "positive", "negative");
  }, 1800);
}

function pushWalletLedger(entry) {
  gameState.wallet.ledger.push({
    ...entry,
    totalAfter: gameState.money,
    at: Date.now(),
  });
  if (gameState.wallet.ledger.length > ECONOMY.wallet.ledgerLimit) {
    gameState.wallet.ledger.shift();
  }
}

function addMoney(amount, reason = "収入", options = {}) {
  const normalizedAmount = Math.max(0, Math.round(amount));
  if (!normalizedAmount) {
    return 0;
  }

  const source = options.source || "job";
  gameState.money += normalizedAmount;
  gameState.wallet.lastChange = normalizedAmount;
  gameState.wallet.lastReason = reason;
  pushWalletLedger({ type: "income", source, amount: normalizedAmount, reason });
  updateHUD();
  renderBikeShopItems();
  renderCarShopItems();
  renderHousingApp();
  showMoneyChange(normalizedAmount, "");
  AudioEngine.moneyPickup(normalizedAmount);
  spawnParticles(player.x, player.y - 16, { count: 6, color: "#ffd866", speed: 55, life: 0.6, size: 3.5 });
  saveGame();
  return normalizedAmount;
}

function spendMoney(amount, reason = "支出", options = {}) {
  const normalizedAmount = Math.max(0, Math.round(amount));
  if (!normalizedAmount) {
    return true;
  }

  if (!canAfford(normalizedAmount)) {
    return false;
  }

  const source = options.source || "purchase";
  gameState.money -= normalizedAmount;
  gameState.wallet.lastChange = -normalizedAmount;
  gameState.wallet.lastReason = reason;
  pushWalletLedger({ type: "expense", source, amount: normalizedAmount, reason });
  updateHUD();
  renderBikeShopItems();
  renderCarShopItems();
  renderHousingApp();
  showMoneyChange(-normalizedAmount, "");
  return true;
}

function randomRewardFromRange(rangeConfig) {
  return randomInt(rangeConfig.min, rangeConfig.max);
}

function getHouseLevelConfig(level = gameState.house.level) {
  return ECONOMY.houses[level] || null;
}

function getOwnedHouse() {
  return getHouseLevelConfig();
}

function getOwnedHouseBuilding() {
  if (!gameState.house.buildingName) {
    return null;
  }
  return mapData.buildings.find((building) => building.name === gameState.house.buildingName) || null;
}

function getOwnedHouseMarkerPoint() {
  const building = getOwnedHouseBuilding();
  if (!building?.entrance) {
    return null;
  }
  return {
    x: building.entrance.x + building.entrance.width / 2,
    y: building.entrance.y + building.entrance.height + 26,
    name: building.name,
    color: "#7dd6ff",
  };
}

function isHouseMode() {
  return gameState.currentMode === "house";
}

function isPlayerNearOwnedHouse() {
  const marker = getOwnedHouseMarkerPoint();
  if (!marker || gameState.ridingVehicleId) {
    return false;
  }
  return Math.hypot(player.x - marker.x, player.y - marker.y) < 58;
}

function getStreamViewerRange(level = gameState.house.level) {
  const house = getHouseLevelConfig(level);
  return house ? `${house.viewersMin}〜${house.viewersMax}人` : "3〜12人";
}

function getStreamIncomeRange(level = gameState.house.level) {
  const house = getHouseLevelConfig(level || 1);
  return house ? `${formatCurrency(house.min)}〜${formatCurrency(house.max)}` : `${formatCurrency(10)}〜${formatCurrency(40)}`;
}

function assignOwnedHouse(level) {
  const house = getHouseLevelConfig(level);
  if (!house) {
    return;
  }

  const preferred = mapData.buildings.find((building) => building.name === house.baseName);
  const fallback = mapData.buildings.find((building) => RESIDENTIAL_TYPES.has(building.type));
  gameState.house.level = level;
  gameState.house.buildingName = (preferred || fallback)?.name || null;
}

function createHouseInteriorLayout() {
  const ownedHouse = getOwnedHouse() || getHouseLevelConfig(1);
  const level = ownedHouse?.label ? gameState.house.level : 1;
  const roomWidth = houseState.width;
  const roomHeight = houseState.height;
  const accentPalette = {
    1: { wall: "#5d5046", wallDark: "#2e2720", floor: "#7a6858", floorDark: "#4a3e34", rug: "#6f4035", glow: "#ffcf7a", accent2: "#c8934b" },
    2: { wall: "#4f5c67", wallDark: "#272f38", floor: "#7e7365", floorDark: "#48443e", rug: "#31566f", glow: "#8cdfff", accent2: "#4fa8d8" },
    3: { wall: "#53635a", wallDark: "#293630", floor: "#847766", floorDark: "#4d4740", rug: "#375a49", glow: "#79ffb5", accent2: "#5ac47a" },
    4: { wall: "#3d465d", wallDark: "#1e2330", floor: "#87745d", floorDark: "#4f4437", rug: "#6b4d7a", glow: "#9fd8ff", accent2: "#7a5dd8" },
    5: { wall: "#2d344a", wallDark: "#161b26", floor: "#8f7d66", floorDark: "#54493c", rug: "#3f577b", glow: "#b8f4ff", accent2: "#5ab8e8" },
  };
  const accent = accentPalette[level] || accentPalette[1];

  // 外壁 + 内部仕切り壁（寝室エリア ↔ リビングエリア）
  houseState.walls = [
    { x: 0, y: 0, width: roomWidth, height: 28 },
    { x: 0, y: roomHeight - 28, width: roomWidth, height: 28 },
    { x: 0, y: 0, width: 28, height: roomHeight },
    { x: roomWidth - 28, y: 0, width: 28, height: roomHeight },
    // 仕切り壁（左側）：寝室とリビングを分ける（中央に通路）
    { x: 28, y: 294, width: 138, height: 20 },
    // 仕切り壁（右側）
    { x: 316, y: 294, width: roomWidth - 316 - 28, height: 20 },
  ];

  houseState.props = [
    { type: "wall-tone", wall: accent.wall, wallDark: accent.wallDark, floor: accent.floor, floorDark: accent.floorDark, rug: accent.rug, glow: accent.glow, accent2: accent.accent2 },
    // ── 寝室エリア (左上) ──
    { type: "bed", x: 50, y: 46, width: 170, height: 108 },
    { type: "nightstand", x: 50, y: 164, width: 54, height: 54, glow: accent.glow },
    { type: "lamp", x: 236, y: 44, width: 26, height: 66, glow: accent.glow },
    // ── 作業エリア (右上) ──
    { type: "shelf", x: 506, y: 40, width: 84, height: 140 },
    { type: "desk", x: 720, y: 50, width: 172, height: 66 },
    { type: "pc", x: 752, y: 26, width: 80, height: 46, glow: accent.glow },
    { type: "chair", x: 784, y: 122, width: 48, height: 48 },
    // ── リビングエリア (中央下) ──
    { type: "tv", x: 312, y: 312, width: 220, height: 30 },
    { type: "coffeeTable", x: 382, y: 356, width: 126, height: 58 },
    { type: "sofa", x: 326, y: 424, width: 222, height: 86 },
    { type: "plant", x: 844, y: 440, width: 30, height: 72 },
    { type: "plant", x: 64, y: 466, width: 26, height: 60 },
    // ── 玄関ドア (左下) ──
    { type: "door", x: 48, y: 562, width: 112, height: 26 },
  ];

  houseState.pcZone = { x: 718, y: 26, width: 156, height: 118 };
  houseState.exitZone = { x: 46, y: 546, width: 120, height: 50 };
  houseState.player.x = 480;
  houseState.player.y = 420;
  houseState.player.direction = "right";
}

function enterOwnedHouse() {
  if (!getOwnedHouse()) {
    showToast("スマホの不動産アプリで家を購入してください");
    return;
  }
  if (mission.active || isTaxiJobActive()) {
    showToast("進行中の仕事がある間は家に入れません");
    return;
  }
  if (!isPlayerNearOwnedHouse()) {
    showToast("所有している家の前まで移動してください");
    return;
  }
  toggleWorldMap(false);
  closeActiveShopScreen();
  gameState.currentMode = "house";
  houseState.active = true;
  createHouseInteriorLayout();
  updateOverlayMode();
  updateHUD();
  showToast("家に入りました。自動で配信を開始します");
  if (gameState.house.cooldown <= 0 && !gameState.house.streaming) {
    startHouseStream();
  }
}

function exitOwnedHouse() {
  const building = getOwnedHouseBuilding();
  const marker = getOwnedHouseMarkerPoint();
  gameState.currentMode = "world";
  houseState.active = false;
  updateOverlayMode();
  if (gameState.house.streaming) {
    gameState.house.streaming = null;
    showToast("家を出たため配信を終了しました");
  }
  if (marker && building) {
    const safeSpawn = findSafeWorldSpawnNear(marker.x, marker.y);
    player.x = safeSpawn.x;
    player.y = safeSpawn.y;
    player.motion.x = 0;
    player.motion.y = 0;
  }
  updateHUD();
}

function canStartStreaming() {
  return !!getOwnedHouse() && isHouseMode() && !mission.active && !isTaxiJobActive() && gameState.house.cooldown <= 0 && !gameState.house.streaming;
}

function resolveStreamPayout(streamState) {
  const house = getHouseLevelConfig(streamState.level);
  if (!house) {
    return;
  }

  let baseIncome = randomInt(house.min, house.max);
  let bonusIncome = 0;
  let viralIncome = 0;

  if (Math.random() < ECONOMY.streaming.bonusChance) {
    const ratio = ECONOMY.streaming.bonusMinRatio + Math.random() * (ECONOMY.streaming.bonusMaxRatio - ECONOMY.streaming.bonusMinRatio);
    bonusIncome = Math.round(baseIncome * ratio);
    showToast(`投げ銭発生! +${formatCurrency(bonusIncome)}`);
  }

  if (Math.random() < ECONOMY.streaming.viralChance) {
    viralIncome = Math.round(baseIncome * (ECONOMY.streaming.viralMultiplier - 1));
    showToast(`拡散イベント発生! 収益ブースト +${formatCurrency(viralIncome)}`);
  }

  const totalIncome = baseIncome + bonusIncome + viralIncome;
  addMoney(totalIncome, `配信収益 Lv${streamState.level}`, { source: "job" });
  gameState.house.totalEarned = (gameState.house.totalEarned || 0) + totalIncome;
  gameState.house.streamCount = (gameState.house.streamCount || 0) + 1;
  gameState.house.cooldown = ECONOMY.streaming.cooldownSeconds;
  gameState.house.streaming = {
    ...streamState,
    complete: true,
    baseIncome,
    bonusIncome,
    viralIncome,
    totalIncome,
    viewers: streamState.viewers,
    liveLabel: `+${formatCurrency(totalIncome)}`,
    displayTimer: 2.4,
  };
  updateHUD();
}

function startHouseStream() {
  if (!canStartStreaming()) {
    if (gameState.house.streaming?.complete) {
      showToast("配信結果の表示中です");
    } else if (gameState.house.streaming) {
      showToast("すでに配信中です");
    } else if (gameState.house.cooldown > 0) {
      showToast(`次の配信まで ${gameState.house.cooldown.toFixed(1)} 秒`);
    }
    return;
  }

  const house = getOwnedHouse();
  if (!house) {
    return;
  }

  gameState.house.streaming = {
    level: gameState.house.level,
    elapsed: 0,
    duration: ECONOMY.streaming.durationMin + Math.random() * (ECONOMY.streaming.durationMax - ECONOMY.streaming.durationMin),
    viewers: randomInt(house.viewersMin, house.viewersMax),
    viewersMin: house.viewersMin,
    viewersMax: house.viewersMax,
    complete: false,
    liveLabel: "配信中...",
    displayTimer: 0,
  };
  updateHUD();
  showToast("PC配信を開始しました");
}

function updateHouseStreaming(deltaTime) {
  gameState.house.cooldown = Math.max(0, gameState.house.cooldown - deltaTime);
  const streamState = gameState.house.streaming;
  if (!streamState) {
    return;
  }

  if (streamState.complete) {
    streamState.displayTimer = Math.max(0, streamState.displayTimer - deltaTime);
    if (streamState.displayTimer <= 0) {
      gameState.house.streaming = null;
    }
    return;
  }

  streamState.elapsed += deltaTime;
  const wave = Math.sin(streamState.elapsed * 2.4);
  streamState.viewers = clamp(
    Math.round((streamState.viewersMin + streamState.viewersMax) / 2 + wave * ((streamState.viewersMax - streamState.viewersMin) / 2)),
    streamState.viewersMin,
    streamState.viewersMax
  );

  if (streamState.elapsed >= streamState.duration) {
    resolveStreamPayout(streamState);
  }
}

function updateHousingUI() {
  const ownedHouse = getOwnedHouse();
  const ownedBuilding = getOwnedHouseBuilding();
  setTextContent(
    housingCurrentHouseLabel,
    ownedHouse ? `Lv${gameState.house.level} ${ownedHouse.label}${ownedBuilding ? ` / ${ownedBuilding.name}` : ""}` : "未所有"
  );
  setTextContent(
    housingIncomeLabel,
    ownedHouse
      ? `視聴者 ${getStreamViewerRange()} / 1配信 ${getStreamIncomeRange()}`
      : `次の候補 Lv1 ボロ屋 / 1配信 ${getStreamIncomeRange(1)}`
  );

  let statusText = "スマホから拠点を購入できます";
  if (gameState.house.streaming && !gameState.house.streaming.complete) {
    statusText = `配信中... 視聴者 ${gameState.house.streaming.viewers}人`;
  } else if (gameState.house.streaming?.complete) {
    statusText = `配信終了 ${gameState.house.streaming.liveLabel}`;
  } else if (gameState.house.cooldown > 0) {
    statusText = `次の配信まで ${gameState.house.cooldown.toFixed(1)} 秒`;
  } else if (ownedHouse) {
    statusText = "所有中の家へ行き、PCから配信を開始できます";
  }
  setTextContent(housingStatusLabel, statusText);
}

function renderHousingApp() {
  if (!housingList) {
    return;
  }

  housingList.innerHTML = "";
  Object.entries(ECONOMY.houses).forEach(([levelKey, house]) => {
    const level = Number(levelKey);
    const card = document.createElement("article");
    const isOwned = gameState.house.level === level;
    const isUnlocked = level <= gameState.house.level + 1;
    card.className = `housing-item${isOwned ? " current" : ""}${!isUnlocked ? " locked" : ""}`;

    const top = document.createElement("div");
    top.className = "housing-item-top";
    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = house.label;
    const desc = document.createElement("p");
    desc.textContent = `${house.baseName} / 視聴者 ${house.viewersMin}〜${house.viewersMax}人`;
    info.append(title, desc);

    const chip = document.createElement("span");
    chip.className = "shop-state-badge housing-level-chip";
    chip.textContent = `LV ${level}`;
    top.append(info, chip);

    const meta = document.createElement("div");
    meta.className = "housing-item-meta";
    const income = document.createElement("strong");
    income.textContent = `配信収益 ${formatCurrency(house.min)}〜${formatCurrency(house.max)}`;
    const price = document.createElement("span");
    price.textContent = `価格 ${formatCurrency(house.price)}`;
    meta.append(income, price);

    const button = document.createElement("button");
    button.type = "button";
    if (isOwned) {
      button.textContent = "所有中";
      button.disabled = true;
    } else if (!isUnlocked) {
      button.textContent = "前の家から購入";
      button.disabled = true;
    } else {
      button.textContent = canAfford(house.price) ? "購入する" : "所持金不足";
      button.disabled = !canAfford(house.price);
      button.addEventListener("click", () => purchaseHouse(level));
    }

    card.append(top, meta, button);
    housingList.append(card);
  });
}

function purchaseHouse(level) {
  const house = getHouseLevelConfig(level);
  if (!house) {
    return;
  }
  if (level <= gameState.house.level) {
    showToast("その家はすでに所有済みです");
    return;
  }
  if (level !== gameState.house.level + 1) {
    showToast("家は順番にアップグレードしてください");
    return;
  }
  if (!spendMoney(house.price, `${house.label} 購入`, { source: "purchase" })) {
    showToast(`所持金不足: ${house.label} は ${formatCurrency(house.price)}`);
    return;
  }

  assignOwnedHouse(level);
  renderHousingApp();
  updateHousingUI();
  updatePhoneMapPlayerPin();
  updateHUD();
  showToast(`${house.label} を購入。現地へ向かって家に入れます`);
  AudioEngine.housePurchase();
  spawnParticles(player.x, player.y, { count: 14, color: "#ffd866", speed: 90, life: 1.0, size: 4 });
  saveGame();
}

function getNextVehicleGoal() {
  return ECONOMY.progression.vehicleGoals.find((goal) => !isVehicleOwned(goal.id)) || null;
}

function getVehiclePrice(vehicleId) {
  return catalogById[vehicleId]?.price || 0;
}

function isTaxiJobActive() {
  return taxiState.status !== "inactive" && taxiState.status !== "ended";
}

function isTaxiVehicle(vehicleId = gameState.ridingVehicleId) {
  return vehicleId === TAXI_VEHICLE.id;
}

function resetTaxiState() {
  taxiState.status = "inactive";
  taxiState.passenger = null;
  taxiState.destination = null;
  taxiState.rentalFee = 0;
  taxiState.currentFare = 0;
  taxiState.totalFares = 0;
  taxiState.tripsCompleted = 0;
  taxiState.statusTimer = 0;
}

function getTaxiNetProfit() {
  return taxiState.totalFares - taxiState.rentalFee;
}

function getTaxiMissionTarget() {
  if ((taxiState.status === "searchingPassenger" || taxiState.status === "rented") && taxiState.passenger) {
    return taxiState.passenger;
  }
  if ((taxiState.status === "passengerOnBoard" || taxiState.status === "delivering") && taxiState.destination) {
    return taxiState.destination;
  }
  return null;
}

function calculateTaxiFare(fromPoint, toPoint) {
  const distance = Math.hypot(fromPoint.x - toPoint.x, fromPoint.y - toPoint.y);
  const normalized = clamp(distance / 2200, 0, 1);
  return Math.round(
    ECONOMY.taxi.fareMin + (ECONOMY.taxi.fareMax - ECONOMY.taxi.fareMin) * normalized
  );
}

function createTaxiPassengerPoint() {
  const candidates = [...mapData.deliveryPoints, ...mapData.pickupPoints];
  const pickup = candidates[randomInt(0, candidates.length - 1)];
  let destination = candidates[randomInt(0, candidates.length - 1)];
  let guard = 0;
  while (destination && pickup && destination.name === pickup.name && guard < 8) {
    destination = candidates[randomInt(0, candidates.length - 1)];
    guard += 1;
  }

  taxiState.passenger = {
    name: pickup.name,
    x: pickup.x,
    y: pickup.y,
    color: "#ffd447",
  };
  taxiState.destination = {
    name: destination.name,
    x: destination.x,
    y: destination.y,
    color: "#79ffb5",
  };
  taxiState.currentFare = calculateTaxiFare(taxiState.passenger, taxiState.destination);
}

function updateTaxiButtons() {
  setDisabled(startTaxiButton, isTaxiJobActive() || mission.active);
  setDisabled(
    endTaxiButton,
    !isTaxiJobActive() || taxiState.status === "passengerOnBoard" || taxiState.status === "delivering"
  );
}

function updateTaxiUI() {
  setTextContent(
    taxiRentalLabel,
    `開始時に ${formatCurrency(ECONOMY.taxi.rentalFee)} を支払ってレンタル`
  );
  setTextContent(
    taxiFareLabel,
    isTaxiJobActive()
      ? `現在の運賃 ${formatCurrency(taxiState.currentFare || ECONOMY.taxi.fareMin)} / 累計 ${formatCurrency(taxiState.totalFares)}`
      : `次の送迎 ${formatCurrency(ECONOMY.taxi.fareMin)}〜${formatCurrency(ECONOMY.taxi.fareMax)} / 累計 ${formatCurrency(0)}`
  );

  let statusText = "スマホから開始可能";
  let progressText = `スマホで開始すると ${formatCurrency(ECONOMY.taxi.rentalFee)} が先に引かれます`;
  if (taxiState.status === "rented") {
    statusText = "レンタル完了";
    progressText = "次の乗客候補を割り当て中";
  } else if (taxiState.status === "searchingPassenger" && taxiState.passenger) {
    statusText = "乗客を探しています";
    progressText = `${taxiState.passenger.name} の近くで乗客を乗せると ${formatCurrency(taxiState.currentFare)} 見込み`;
  } else if (taxiState.status === "passengerOnBoard") {
    statusText = "乗客が乗車しました";
    progressText = `${taxiState.destination?.name || "目的地"} へ向かってください`;
  } else if (taxiState.status === "delivering") {
    statusText = "送迎中";
    progressText = `${taxiState.destination?.name || "目的地"} へ送迎中 / 累計利益 ${formatCurrency(getTaxiNetProfit())}`;
  } else if (taxiState.status === "fareComplete") {
    statusText = "送迎完了";
    progressText = `累計 ${taxiState.tripsCompleted}件 / 純利益 ${formatCurrency(getTaxiNetProfit())}`;
  } else if (taxiState.status === "ended") {
    statusText = "業務終了";
    progressText = `最終利益 ${formatCurrency(getTaxiNetProfit())}`;
  }

  setTextContent(taxiStatusLabel, statusText);
  setTextContent(taxiProgressLabel, progressText);
  updateTaxiButtons();
}

function startTaxiJob() {
  if (mission.active || isTaxiJobActive()) {
    showToast("他の仕事が進行中です");
    return;
  }
  if (!spendMoney(ECONOMY.taxi.rentalFee, "Taxi rental", { source: "purchase" })) {
    showToast(`所持金不足: タクシーレンタルは ${formatCurrency(ECONOMY.taxi.rentalFee)}`);
    return;
  }

  resetTaxiState();
  taxiState.status = "rented";
  taxiState.rentalFee = ECONOMY.taxi.rentalFee;
  gameState.selectedJobType = "taxi";
  gameState.currentPhoneScreen = "taxi";
  gameState.selectedVehicleId = TAXI_VEHICLE.id;
  gameState.ridingVehicleId = TAXI_VEHICLE.id;
  player.motion.x = 0;
  player.motion.y = 0;
  createTaxiPassengerPoint();
  taxiState.status = "searchingPassenger";
  updateVehicleApp();
  updatePhoneScreen();
  updateButtonState();
  updateHUD();
  showToast(`タクシー業務開始: レンタル代 ${formatCurrency(ECONOMY.taxi.rentalFee)} を支払い、最初の客へ向かえ`);
}

function endTaxiJob(force = false) {
  if (!isTaxiJobActive()) {
    showToast("タクシー業務は開始していません");
    return;
  }
  if (!force && (taxiState.status === "passengerOnBoard" || taxiState.status === "delivering")) {
    showToast("乗客送迎中は業務を終了できません");
    return;
  }

  taxiState.status = "ended";
  if (isTaxiVehicle(gameState.ridingVehicleId)) {
    gameState.ridingVehicleId = null;
  }
  if (gameState.selectedVehicleId === TAXI_VEHICLE.id) {
    gameState.selectedVehicleId = null;
  }
  const summaryProfit = getTaxiNetProfit();
  updateVehicleApp();
  updateHUD();
  showToast(`タクシー業務終了: 純利益 ${formatCurrency(summaryProfit)}`);
  resetTaxiState();
  updateButtonState();
  updateHUD();
}

function handleTaxiProgress(deltaTime) {
  if (!isTaxiJobActive()) {
    return;
  }

  if (taxiState.status === "passengerOnBoard") {
    taxiState.statusTimer = Math.max(0, taxiState.statusTimer - deltaTime);
    if (taxiState.statusTimer <= 0) {
      taxiState.status = "delivering";
      updateHUD();
    }
  }

  if ((taxiState.status === "searchingPassenger" || taxiState.status === "rented") && taxiState.passenger) {
    if (!isTaxiVehicle()) {
      return;
    }
    const passengerDistance = Math.hypot(player.x - taxiState.passenger.x, player.y - taxiState.passenger.y);
    if (passengerDistance <= ECONOMY.taxi.pickupRadius) {
      taxiState.status = "passengerOnBoard";
      taxiState.statusTimer = 0.6;
      showToast(`乗客が乗車: ${taxiState.destination.name} まで ${formatCurrency(taxiState.currentFare)}`);
      updateHUD();
      return;
    }
  }

  if ((taxiState.status === "passengerOnBoard" || taxiState.status === "delivering") && taxiState.destination) {
    if (!isTaxiVehicle()) {
      return;
    }
    const destinationDistance = Math.hypot(player.x - taxiState.destination.x, player.y - taxiState.destination.y);
    if (destinationDistance <= ECONOMY.taxi.dropoffRadius) {
      addMoney(taxiState.currentFare, "Taxi fare", { source: "job" });
      taxiState.totalFares += taxiState.currentFare;
      taxiState.tripsCompleted += 1;
      taxiState.status = "fareComplete";
      showToast(`送迎完了! +${formatCurrency(taxiState.currentFare)} / 純利益 ${formatCurrency(getTaxiNetProfit())}`);
      createTaxiPassengerPoint();
      taxiState.status = "searchingPassenger";
      updateHUD();
    }
  }
}

function setTextContent(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function setDisabled(element, disabled) {
  if (element) {
    element.disabled = disabled;
  }
}

function getNextShopOffer(shop) {
  const offers = SHOP_CATALOG[shop.shopType] || [];
  return offers.find((offer) => !purchasedItemIds.has(offer.id)) || null;
}

function getShopName(shopType) {
  if (shopType === "carshop") {
    return "Steel Motors";
  }
  if (shopType === "bikeshop") {
    return "Velocity Cycles";
  }
  if (shopType === "weaponshop") {
    return "Iron Vault";
  }
  return "ショップ";
}

function getVehicleById(vehicleId) {
  if (!vehicleId) {
    return null;
  }

  if (vehicleId === MISSION_VEHICLE.id) {
    return MISSION_VEHICLE;
  }
  if (vehicleId === TAXI_VEHICLE.id) {
    return TAXI_VEHICLE;
  }

  return catalogById[vehicleId] || null;
}

function getVehicleMovementProfile(vehicle) {
  if (!vehicle) {
    return {
      maxSpeed: CONFIG.movement.onFootMaxSpeed,
      acceleration: CONFIG.movement.onFootAcceleration,
      deceleration: CONFIG.movement.onFootDeceleration,
      handling: CONFIG.movement.onFootHandling,
    };
  }

  if (vehicle.inventoryKey === "bike") {
    return {
      maxSpeed: CONFIG.movement.bikeBaseSpeed + (vehicle.speedBonus || 0),
      acceleration: CONFIG.movement.bikeAcceleration,
      deceleration: CONFIG.movement.bikeDeceleration,
      handling: CONFIG.movement.bikeHandling,
    };
  }

  return {
    maxSpeed: vehicle.maxSpeed || player.baseSpeed + (vehicle.speedBonus || 0),
    acceleration: vehicle.acceleration || 5,
    deceleration: Math.max(4.4, (vehicle.acceleration || 5) * 0.9),
    handling: vehicle.handling || 4.5,
  };
}

function getCurrentMovementProfile() {
  const ridingVehicle = getVehicleById(gameState.ridingVehicleId);
  return getVehicleMovementProfile(ridingVehicle);
}

function getVehiclePerformanceLabel(vehicle) {
  if (!vehicle) {
    return "徒歩";
  }

  if (vehicle.inventoryKey === "bike") {
    return `巡航 ${CONFIG.movement.bikeBaseSpeed + (vehicle.speedBonus || 0)}`;
  }

  return `最高速 ${vehicle.maxSpeed} / 加速 ${vehicle.acceleration.toFixed(1)} / 操作 ${vehicle.handling.toFixed(1)}`;
}

function getVehicleTypeLabel(vehicle) {
  if (!vehicle) {
    return "徒歩";
  }

  if (vehicle.inventoryKey === "bike") {
    return "BIKE";
  }

  const typeLabels = {
    used: "USED",
    standard: "STANDARD",
    suv: "SUV",
    super: "SUPER",
  };
  return typeLabels[vehicle.type] || "CAR";
}

function isVehicleOwned(vehicleId) {
  return purchasedItemIds.has(vehicleId);
}

function markItemOwned(itemId, owned) {
  const item = catalogById[itemId];
  if (item) {
    item.owned = owned;
  }
}

function getOwnedVehicles() {
  return Object.values(catalogById).filter(
    (item) =>
      item.owned &&
      (item.inventoryKey === "bike" || item.inventoryKey === "car")
  );
}

function isSpecialMissionActive() {
  return mission.active && mission.type === "special";
}

function isRescueMissionActive() {
  return mission.active && mission.type === "rescue";
}

function isCashoutMissionActive() {
  return mission.active && mission.type === "cashout";
}

function isOpsMissionActive() {
  return mission.active && (mission.type === "smallMission" || mission.type === "special" || mission.type === "rescue" || mission.type === "cashout");
}

function isInteriorMode() {
  return gameState.currentMode === "interior";
}

function isCombatMusicActive() {
  if (isCashoutMissionActive() && mission.stage === "cashoutBank" && mission.cashoutCombat) {
    return true;
  }

  return isSpecialMissionActive() && isInteriorMode();
}

function getCurrentMusicTrack() {
  if (isCombatMusicActive()) {
    return "gun";
  }
  if (gameState.ridingVehicleId) {
    return "car";
  }
  return "bgm";
}

function updateSceneMusic() {
  if (!AudioEngine.isMuted()) {
    AudioEngine.setMusic(getCurrentMusicTrack());
  }
}

function updateOverlayMode() {
  if (!gameOverlay) {
    return;
  }

  gameOverlay.classList.toggle("interior-mode", isInteriorMode() || isHouseMode());
}

function dismountVehicle(showToastMessage = true) {
  const ridingVehicle = getVehicleById(gameState.ridingVehicleId);
  if (!ridingVehicle) {
    return;
  }

  gameState.ridingVehicleId = null;
  player.motion.x = 0;
  player.motion.y = 0;
  updateVehicleApp();
  updateShopInteraction();

  if (showToastMessage) {
    showToast(`${ridingVehicle.name} から降りました`);
  }
}

function selectVehicle(vehicleId) {
  const vehicle = getVehicleById(vehicleId);
  if (!vehicle || !isVehicleOwned(vehicleId)) {
    showToast("その車両はまだ所有していません");
    return;
  }

  gameState.selectedVehicleId = vehicleId;
  gameState.ridingVehicleId = vehicleId;
  player.motion.x = 0;
  player.motion.y = 0;
  updateVehicleApp();
  updateShopInteraction();
  showToast(`${vehicle.name} に乗りました`);
}

function createStatMeter(label, value, maxValue) {
  const row = document.createElement("div");
  row.className = "shop-stat-row";

  const name = document.createElement("span");
  name.textContent = label;

  const meter = document.createElement("div");
  meter.className = "shop-stat-meter";

  const fill = document.createElement("div");
  fill.className = "shop-stat-fill";
  fill.style.width = `${clamp((value / maxValue) * 100, 12, 100)}%`;
  meter.append(fill);

  row.append(name, meter);
  return row;
}

function renderVehiclePreviewCanvas(canvasElement, vehicle) {
  if (!canvasElement || !vehicle) {
    return;
  }

  const previewCtx = canvasElement.getContext("2d");
  previewCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  previewCtx.save();
  previewCtx.translate(canvasElement.width / 2, canvasElement.height / 2 + 8);
  previewCtx.rotate(Math.PI);
  drawOwnedVehicleSprite(previewCtx, vehicle, true);
  previewCtx.restore();
}

function createCarShopCard(item) {
  const isPurchased = isVehicleOwned(item.id);
  const isActive = gameState.ridingVehicleId === item.id;
  const canAffordNow = canAfford(item.price);

  const card = document.createElement("article");
  card.className = `shop-item-card car-item-card${isPurchased ? " soldout" : ""}${isActive ? " selected" : ""}`;

  const previewWrap = document.createElement("div");
  previewWrap.className = `car-preview car-preview-${item.type}`;
  const badge = document.createElement("span");
  badge.className = "car-type-chip";
  badge.textContent = getVehicleTypeLabel(item);
  const previewCanvas = document.createElement("canvas");
  previewCanvas.className = "car-preview-canvas";
  previewCanvas.width = 180;
  previewCanvas.height = 120;
  previewWrap.append(badge, previewCanvas);

  const info = document.createElement("div");
  info.className = "car-item-info";

  const titleRow = document.createElement("div");
  titleRow.className = "car-item-title-row";
  const title = document.createElement("h3");
  title.textContent = item.name;
  const price = document.createElement("strong");
  price.className = "car-item-price";
  price.textContent = formatCurrency(item.price);
  titleRow.append(title, price);

  const description = document.createElement("p");
  description.textContent = item.description;

  const meta = document.createElement("span");
  meta.className = "shop-item-meta";
  meta.textContent = getVehiclePerformanceLabel(item);

  const stats = document.createElement("div");
  stats.className = "shop-stats";
  stats.append(
    createStatMeter("最高速", item.maxSpeed, 500),
    createStatMeter("加速", item.acceleration, 9),
    createStatMeter("操作性", item.handling, 8)
  );

  const actionRow = document.createElement("div");
  actionRow.className = "car-item-actions";
  const state = document.createElement("span");
  state.className = `shop-state-badge${isPurchased ? " owned" : canAffordNow ? "" : " warning"}`;
  state.textContent = isActive
    ? "使用中"
    : isPurchased
      ? "購入済み"
      : canAffordNow
        ? "購入可能"
        : `あと ${formatCurrency(item.price - gameState.money)}`;

  const button = document.createElement("button");
  button.className = "shop-buy-button";
  button.type = "button";
  if (isPurchased) {
    button.disabled = isActive;
    button.textContent = isActive ? "使用中" : "この車に乗る";
    button.addEventListener("click", () => {
      selectVehicle(item.id);
      renderCarShopItems();
    });
  } else {
    button.disabled = !canAffordNow;
    button.textContent = canAffordNow ? "購入して乗る" : "所持金不足";
    button.addEventListener("click", () => {
      purchaseShopItem("carshop", item.id, { autoEquip: true });
    });
  }
  actionRow.append(state, button);

  info.append(titleRow, description, meta, stats, actionRow);
  card.append(previewWrap, info);
  renderVehiclePreviewCanvas(previewCanvas, item);
  return card;
}

function updateVehicleApp() {
  const selectedVehicle = getVehicleById(gameState.selectedVehicleId);
  const ridingVehicle = getVehicleById(gameState.ridingVehicleId);

  if (vehicleStatusLabel) {
    vehicleStatusLabel.textContent = ridingVehicle
      ? `${ridingVehicle.name} に乗車中 ・ Eで降りる`
      : "徒歩で移動中";
  }

  if (vehicleSelectionLabel) {
    vehicleSelectionLabel.textContent = selectedVehicle
      ? `${selectedVehicle.name}${ridingVehicle ? " を使用中" : " を選択中"}`
      : "なし";
  }

  if (!vehicleList) {
    return;
  }

  vehicleList.innerHTML = "";
  const ownedVehicles = getOwnedVehicles();

  if (ownedVehicles.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "phone-card";
    emptyState.innerHTML = "<strong>まだ車両を所有していません</strong>";
    vehicleList.append(emptyState);
    return;
  }

  ownedVehicles.forEach((vehicle) => {
    const row = document.createElement("article");
    row.className = "vehicle-item";

    const tag = document.createElement("span");
    tag.className = "vehicle-item-tag";
    tag.textContent = getVehicleTypeLabel(vehicle);

    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = vehicle.name;
    const description = document.createElement("p");
    description.textContent =
      vehicle.description ||
      (vehicle.inventoryKey === "bike"
        ? "選択すると自転車に乗って移動できます。"
        : "選択すると車両に乗って移動できます。");
    const meta = document.createElement("strong");
    meta.textContent = getVehiclePerformanceLabel(vehicle);
    info.append(tag, title, description, meta);

    const button = document.createElement("button");
    const isRiding = gameState.ridingVehicleId === vehicle.id;
    button.type = "button";
    button.textContent = isRiding ? "乗車中" : "乗る";
    button.disabled = isRiding;
    button.addEventListener("click", () => {
      selectVehicle(vehicle.id);
    });

    row.append(info, button);
    vehicleList.append(row);
  });
}

function updateInventoryStatus() {
  setTextContent(
    inventoryStatusLabel,
    `車 ${gameState.inventory.car} / 自転車 ${gameState.inventory.bike} / 装備 ${gameState.inventory.gear}`
  );
}

function isNearbyShopType(shopType) {
  return gameState.nearbyShop?.shopType === shopType;
}

function updateEnterShopButton() {
  if (!enterShopButton) {
    return;
  }

  const nearbyShopType = gameState.nearbyShop?.shopType;
  const shouldShow =
    (nearbyShopType === "bikeshop" || nearbyShopType === "carshop") &&
    !gameState.isWorldMapOpen &&
    !gameState.isShopOpen &&
    !isHouseMode();
  enterShopButton.classList.toggle("hidden", !shouldShow);
  if (shouldShow) {
    enterShopButton.textContent = nearbyShopType === "carshop" ? "車屋に入る" : "自転車屋に入る";
  }
}

function renderBikeShopItems() {
  if (!bikeShopItems) {
    return;
  }

  bikeShopItems.innerHTML = "";

  SHOP_CATALOG.bikeshop.forEach((item) => {
    const isPurchased = isVehicleOwned(item.id);
    const canAffordNow = canAfford(item.price);

    const card = document.createElement("article");
    card.className = `shop-item-card${isPurchased ? " soldout" : ""}`;

    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.name;
    const description = document.createElement("p");
    description.textContent = item.description || "移動速度を上げられる自転車です。";
    const meta = document.createElement("span");
    meta.className = "shop-item-meta";
    meta.textContent = canAffordNow
      ? `移動速度 +${item.speedBonus || 0} ・ 手が届く初期投資`
      : `移動速度 +${item.speedBonus || 0} ・ あと ${formatCurrency(item.price - gameState.money)}`;
    info.append(title, description, meta);

    const action = document.createElement("div");
    action.className = "shop-item-action";
    const price = document.createElement("strong");
    price.textContent = formatCurrency(item.price);
    const button = document.createElement("button");
    button.className = "shop-buy-button";
    button.type = "button";
    button.disabled = isPurchased || !canAffordNow;
    button.textContent = isPurchased ? "購入済み" : canAffordNow ? "購入する" : "所持金不足";
    button.addEventListener("click", () => {
      purchaseShopItem("bikeshop", item.id);
    });
    action.append(price, button);

    card.append(info, action);
    bikeShopItems.append(card);
  });
}

function renderCarShopItems() {
  if (!carShopItems) {
    return;
  }

  carShopItems.innerHTML = "";
  SHOP_CATALOG.carshop.forEach((item) => {
    carShopItems.append(createCarShopCard(item));
  });
}

function setBikeShopOpen(open) {
  gameState.isShopOpen = open;

  if (bikeShopOverlay) {
    bikeShopOverlay.classList.toggle("hidden", !open);
    bikeShopOverlay.setAttribute("aria-hidden", String(!open));
  }
  if (carShopOverlay && open) {
    carShopOverlay.classList.add("hidden");
    carShopOverlay.setAttribute("aria-hidden", "true");
  }

  if (open) {
    toggleWorldMap(false);
    renderBikeShopItems();
  }

  updateEnterShopButton();
}

function openBikeShopScreen() {
  if (!isNearbyShopType("bikeshop")) {
    showToast("自転車屋の前で 入店 を押してください");
    return;
  }

  setBikeShopOpen(true);
}

function closeBikeShopScreen() {
  setBikeShopOpen(false);
}

function setCarShopOpen(open) {
  gameState.isShopOpen = open;

  if (carShopOverlay) {
    carShopOverlay.classList.toggle("hidden", !open);
    carShopOverlay.setAttribute("aria-hidden", String(!open));
  }
  if (bikeShopOverlay && open) {
    bikeShopOverlay.classList.add("hidden");
    bikeShopOverlay.setAttribute("aria-hidden", "true");
  }

  if (open) {
    toggleWorldMap(false);
    renderCarShopItems();
  }

  updateEnterShopButton();
}

function openCarShopScreen() {
  if (!isNearbyShopType("carshop")) {
    showToast("車屋の前で 車屋に入る を押してください");
    return;
  }

  setCarShopOpen(true);
}

function closeCarShopScreen() {
  setCarShopOpen(false);
}

function closeActiveShopScreen() {
  if (carShopOverlay && !carShopOverlay.classList.contains("hidden")) {
    closeCarShopScreen();
    return;
  }
  closeBikeShopScreen();
}

function updateShopInteraction() {
  if (isInteriorMode()) {
    setTextContent(interactionStatusLabel, "マンション内部で交戦中");
    return;
  }

  if (isHouseMode()) {
    const nearPc = rectContainsPoint(houseState.pcZone, houseState.player.x, houseState.player.y);
    const nearExit = rectContainsPoint(houseState.exitZone, houseState.player.x, houseState.player.y);
    if (nearPc) {
      setTextContent(
        interactionStatusLabel,
        gameState.house.streaming && !gameState.house.streaming.complete
          ? "配信中..."
          : "E PC: 配信開始"
      );
      return;
    }
    if (nearExit) {
      setTextContent(interactionStatusLabel, "玄関 → 外へ出る");
      return;
    }
    setTextContent(interactionStatusLabel, "家の中を移動中");
    return;
  }

  if (isRescueMissionActive()) {
    if ((mission.stage === "hostageFreed" || mission.stage === "rewardReady") && mission.hostage && !mission.hostage.rewardClaimed) {
      const hostageDistance = Math.hypot(player.x - mission.hostage.x, player.y - mission.hostage.y);
      if (hostageDistance < 54) {
        setTextContent(interactionStatusLabel, "E 人質: 話しかけて報酬を受け取る");
        return;
      }
    }

    if ((mission.stage === "vanSpawned" || mission.stage === "playerNearVan" || mission.stage === "hacking") && mission.rescueVan) {
      const vanDistance = Math.hypot(player.x - mission.rescueVan.x, player.y - mission.rescueVan.y);
      if (vanDistance < 92) {
        setTextContent(
          interactionStatusLabel,
          mission.stage === "hacking"
            ? "護送車に侵入中"
            : "護送車の通信圏内です: ハッキングUIを確認"
        );
        return;
      }
    }
  }

  if (isSpecialMissionActive() && mission.stage === "briefcaseVehicle" && mission.vehiclePoint) {
    const distance = Math.hypot(player.x - mission.vehiclePoint.x, player.y - mission.vehiclePoint.y);
    if (distance < 70) {
      gameState.nearbyShop = null;
      updateEnterShopButton();
      setTextContent(interactionStatusLabel, "E 任務用車両: 乗り込んで指定地点へ向かう");
      return;
    }
  }

  let nearestShop = null;
  let nearestDistance = Infinity;
  mapData.shopLocations.forEach((shop) => {
    const distance = Math.hypot(player.x - shop.x, player.y - shop.y);
    if (distance < 64 && distance < nearestDistance) {
      nearestShop = shop;
      nearestDistance = distance;
    }
  });

  gameState.nearbyShop = nearestShop;
  updateEnterShopButton();

  if (isPlayerNearOwnedHouse()) {
    setTextContent(interactionStatusLabel, "E HOME: 家に入る");
    return;
  }

  if (!nearestShop) {
    if (isTaxiJobActive()) {
      if (taxiState.status === "searchingPassenger" && taxiState.passenger) {
        setTextContent(interactionStatusLabel, `タクシー業務中: ${taxiState.passenger.name} の客を拾う`);
        return;
      }
      if ((taxiState.status === "passengerOnBoard" || taxiState.status === "delivering") && taxiState.destination) {
        setTextContent(interactionStatusLabel, `タクシー業務中: ${taxiState.destination.name} へ送迎`);
        return;
      }
    }
    if (isRescueMissionActive()) {
      setTextContent(interactionStatusLabel, "発光する護送車を追跡中");
      return;
    }
    if (isCashoutMissionActive()) {
      setTextContent(
        interactionStatusLabel,
        mission.stage === "cashoutBank"
          ? "現金護送中: Space で応戦しつつ銀行へ"
          : "現金回収ポイントへ移動中"
      );
      return;
    }
    setTextContent(interactionStatusLabel, "街を探索中");
    return;
  }

  if (nearestShop.shopType === "bikeshop") {
    setTextContent(interactionStatusLabel, gameState.isShopOpen ? "自転車屋で商品を選択中" : "自転車屋の前です: 入店ボタンで入る");
    return;
  }

  if (nearestShop.shopType === "carshop") {
    setTextContent(interactionStatusLabel, gameState.isShopOpen ? "車屋で車種を比較中" : "車屋の前です: 入店ボタンで入る");
    return;
  }

  const nextOffer = getNextShopOffer(nearestShop);
  if (!nextOffer) {
    setTextContent(interactionStatusLabel, `E ${nearestShop.name}: すべて購入済み`);
    return;
  }

  setTextContent(
    interactionStatusLabel,
    `E ${nearestShop.name}: ${nextOffer.name} ${formatCurrency(nextOffer.price)}`
  );
}

function tryPurchaseNearbyShop() {
  if (isRescueMissionActive() && (mission.stage === "hostageFreed" || mission.stage === "rewardReady") && mission.hostage && !mission.hostage.rewardClaimed) {
    const hostageDistance = Math.hypot(player.x - mission.hostage.x, player.y - mission.hostage.y);
    if (hostageDistance < 54) {
      mission.hostage.rewardClaimed = true;
      addMoney(mission.reward, "人質救出報酬", { source: "job" });
      completeMission();
      return;
    }
  }

  if (mountMissionVehicle()) {
    return;
  }

  const shop = gameState.nearbyShop;
  if (!shop) {
    showToast("店の前で E を押すと買い物できます");
    return;
  }

  if (shop.shopType === "bikeshop") {
    openBikeShopScreen();
    return;
  }

  if (shop.shopType === "carshop") {
    openCarShopScreen();
    return;
  }

  const offer = getNextShopOffer(shop);
  if (!offer) {
    showToast(`${shop.name} は売り切れです`);
    return;
  }

  if (!spendMoney(offer.price, `${offer.name} 購入`, { source: "purchase" })) {
    showToast(`所持金不足: ${offer.name} は ${formatCurrency(offer.price)}`);
    return;
  }
  purchasedItemIds.add(offer.id);
  markItemOwned(offer.id, true);
  gameState.inventory[offer.inventoryKey] += 1;

  updateInventoryStatus();
  updateVehicleApp();
  updateShopInteraction();
  showToast(`${shop.name} で ${offer.name} を購入! -${formatCurrency(offer.price)}`);
  AudioEngine.purchase();
  spawnParticles(player.x, player.y - 16, { count: 8, color: "#ff5aab", speed: 60, life: 0.65, size: 3 });
  saveGame();
}

function purchaseShopItem(shopType, itemId, options = {}) {
  const { autoEquip = false } = options;
  const offer = (SHOP_CATALOG[shopType] || []).find((item) => item.id === itemId);
  const shopName = getShopName(shopType);

  if (!offer) {
    showToast("商品データが見つかりません");
    return;
  }

  if (purchasedItemIds.has(offer.id)) {
    showToast(`${offer.name} は購入済みです`);
    return;
  }

  if (!spendMoney(offer.price, `${offer.name} 購入`, { source: "purchase" })) {
    showToast(`所持金不足: ${offer.name} は ${formatCurrency(offer.price)}`);
    return;
  }
  purchasedItemIds.add(offer.id);
  markItemOwned(offer.id, true);
  gameState.inventory[offer.inventoryKey] += 1;
  if (autoEquip && (offer.inventoryKey === "bike" || offer.inventoryKey === "car")) {
    gameState.selectedVehicleId = offer.id;
    gameState.ridingVehicleId = offer.id;
    player.motion.x = 0;
    player.motion.y = 0;
  }

  updateInventoryStatus();
  updateVehicleApp();
  updateShopInteraction();
  renderBikeShopItems();
  renderCarShopItems();
  showToast(`${shopName} で ${offer.name} を購入! -${formatCurrency(offer.price)}`);
  AudioEngine.purchase();
  spawnParticles(player.x, player.y - 16, { count: 8, color: "#58f4ff", speed: 65, life: 0.7, size: 3 });
  saveGame();
}

function updatePhoneScreen() {
  if (phoneHomeScreen) {
    phoneHomeScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "home");
  }
  if (mapAppScreen) {
    mapAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "map");
  }
  if (foodAppScreen) {
    foodAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "food");
  }
  if (postingAppScreen) {
    postingAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "posting");
  }
  if (taxiAppScreen) {
    taxiAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "taxi");
  }
  if (vehicleAppScreen) {
    vehicleAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "vehicle");
  }
  if (specialOpsScreen) {
    specialOpsScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "special");
  }
  if (housingAppScreen) {
    housingAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "housing");
  }
  if (premiumAppScreen) {
    premiumAppScreen.classList.toggle("hidden", gameState.currentPhoneScreen !== "premium");
  }

  updatePhoneMapPlayerPin();
  updatePhoneScrollIndicator();
}

function renderPhoneMapShops() {
  if (!phoneMapShopLayer) {
    return;
  }

  phoneMapShopLayer.innerHTML = "";

  mapData.shopLocations.forEach((shop) => {
    const shopPin = document.createElement("div");
    const normalizedX = clamp(shop.x / WORLD.width, 0, 1);
    const normalizedY = clamp(shop.y / WORLD.height, 0, 1);
    const isNearby = gameState.nearbyShop === shop;

    shopPin.className = `map-pin shop${isNearby ? " nearby" : ""}`;
    shopPin.textContent = shop.name;
    shopPin.style.left = `${normalizedX * 100}%`;
    shopPin.style.top = `${normalizedY * 100}%`;
    phoneMapShopLayer.append(shopPin);
  });

  const ownedHousePoint = getOwnedHouseMarkerPoint();
  if (ownedHousePoint) {
    const homePin = document.createElement("div");
    homePin.className = "map-pin shop nearby";
    homePin.textContent = `HOME ${ownedHousePoint.name}`;
    homePin.style.left = `${clamp(ownedHousePoint.x / WORLD.width, 0, 1) * 100}%`;
    homePin.style.top = `${clamp(ownedHousePoint.y / WORLD.height, 0, 1) * 100}%`;
    phoneMapShopLayer.append(homePin);
  }
}

function updatePhoneMapPlayerPin() {
  if (!phoneMapPlayerPin || !phoneMapShell || !phoneMapCanvasUi) {
    return;
  }

  const mapWidth = WORLD.width;
  const mapHeight = WORLD.height;
  const normalizedX = clamp(player.x / mapWidth, 0, 1);
  const normalizedY = clamp(player.y / mapHeight, 0, 1);

  phoneMapPlayerPin.style.left = `${normalizedX * 100}%`;
  phoneMapPlayerPin.style.top = `${normalizedY * 100}%`;
  renderPhoneMapShops();
}

function getPhoneScreenElement(screen) {
  switch (screen) {
    case "home":
      return phoneHomeScreen;
    case "map":
      return mapAppScreen;
    case "food":
      return foodAppScreen;
    case "posting":
      return postingAppScreen;
    case "taxi":
      return taxiAppScreen;
    case "vehicle":
      return vehicleAppScreen;
    case "special":
      return specialOpsScreen;
    case "housing":
      return housingAppScreen;
    case "premium":
      return premiumAppScreen;
    default:
      return null;
  }
}

function getActivePhoneView() {
  return getPhoneScreenElement(gameState.currentPhoneScreen);
}

function updatePhoneScrollIndicator() {
  if (!phoneScrollIndicator) {
    return;
  }

  const activeScreen = getActivePhoneView();
  const shouldShow =
    activeScreen &&
    gameState.currentPhoneScreen !== "home" &&
    activeScreen.scrollHeight - activeScreen.clientHeight > 18 &&
    activeScreen.scrollTop + activeScreen.clientHeight < activeScreen.scrollHeight - 18;

  phoneScrollIndicator.classList.toggle("hidden", !shouldShow);
}

function openPhoneScreen(screen) {
  if (isInteriorMode()) {
    return;
  }

  if (
    ((mission.active &&
      ((mission.type === "food" && screen === "posting") ||
        (mission.type === "posting" && screen === "food") ||
        ((mission.type === "smallMission" || mission.type === "special" || mission.type === "rescue") &&
          (screen === "food" || screen === "posting")))) ||
      (isTaxiJobActive() && (screen === "food" || screen === "posting" || screen === "special")))
  ) {
    return;
  }

  gameState.currentPhoneScreen = screen;
  if (screen === "food" || screen === "posting" || screen === "special" || screen === "taxi") {
    gameState.selectedJobType = screen;
  }
  const activeScreen = getPhoneScreenElement(screen);
  if (activeScreen) {
    activeScreen.scrollTop = 0;
  }
  updatePhoneScreen();
  updatePhoneScrollIndicator();
  updateHUD();
}

function setSelectedJobType(jobType) {
  gameState.selectedJobType = jobType;
  updateHUD();
}

function createMissionVehicleSpawn() {
  const offsetX = player.x < WORLD.width - 140 ? 84 : -84;
  return {
    name: MISSION_VEHICLE.name,
    kind: "special-vehicle",
    x: clamp(player.x + offsetX, 64, WORLD.width - 64),
    y: clamp(player.y + 36, 64, WORLD.height - 64),
    color: "#ff7b72",
  };
}

function createRescueVanMission() {
  const routeRoads = ROAD_LAYOUT.filter((road) => !road.isAlley);
  const spawnRoad = routeRoads[randomInt(0, routeRoads.length - 1)];
  const startPoint =
    spawnRoad.kind === "horizontal"
      ? {
          x: clamp(player.x + randomInt(180, 320), spawnRoad.x + 80, spawnRoad.x + spawnRoad.width - 80),
          y: spawnRoad.y + spawnRoad.height / 2,
        }
      : {
          x: spawnRoad.x + spawnRoad.width / 2,
          y: clamp(player.y + randomInt(180, 320), spawnRoad.y + 80, spawnRoad.y + spawnRoad.height - 80),
        };

  const nextRoad = routeRoads.find((road) => road !== spawnRoad) || spawnRoad;
  const targetPoint =
    nextRoad.kind === "horizontal"
      ? { x: nextRoad.x + nextRoad.width - 120, y: nextRoad.y + nextRoad.height / 2 }
      : { x: nextRoad.x + nextRoad.width / 2, y: nextRoad.y + nextRoad.height - 120 };

  mission.rescueVan = {
    x: clamp(startPoint.x, 80, WORLD.width - 80),
    y: clamp(startPoint.y, 80, WORLD.height - 80),
    width: 62,
    height: 28,
    speed: 112,
    glowColor: "#58f4ff",
    target: targetPoint,
    axis: nextRoad.kind === "horizontal" ? "horizontal" : "vertical",
    direction: "right",
  };

  mission.hack = {
    reels: [
      { symbolIndex: 0, speed: RESCUE_REEL_SPEEDS[0], locked: false, progress: 0 },
      { symbolIndex: 1, speed: RESCUE_REEL_SPEEDS[1], locked: false, progress: 0 },
      { symbolIndex: 2, speed: RESCUE_REEL_SPEEDS[2], locked: false, progress: 0 },
    ],
    active: false,
    result: null,
    stopIndex: 0,
    targetSymbolIndex: 0,
  };

  mission.hostage = null;
}

function setHackOverlayOpen(open) {
  gameState.isHackOverlayOpen = open;
  if (hackOverlay) {
    hackOverlay.classList.toggle("hidden", !open);
    hackOverlay.setAttribute("aria-hidden", String(!open));
  }
  if (open) {
    if (hackIntroView) {
      hackIntroView.classList.toggle("hidden", false);
    }
    if (hackSlotView) {
      hackSlotView.classList.toggle("hidden", true);
    }
  }
}

function updateHackReelsUi() {
  const reels = mission.hack?.reels || [];
  const reelNodes = [hackReelOne, hackReelTwo, hackReelThree];
  if (hackReelOne && reels[0]) {
    hackReelOne.textContent = RESCUE_SYMBOLS[reels[0].symbolIndex];
  }
  if (hackReelTwo && reels[1]) {
    hackReelTwo.textContent = RESCUE_SYMBOLS[reels[1].symbolIndex];
  }
  if (hackReelThree && reels[2]) {
    hackReelThree.textContent = RESCUE_SYMBOLS[reels[2].symbolIndex];
  }
  reelNodes.forEach((node, index) => {
    if (!node || !reels[index]) {
      return;
    }
    node.classList.toggle("locked", reels[index].locked);
    node.classList.toggle(
      "active",
      mission.stage === "hacking" && mission.hack?.active && mission.hack.stopIndex === index
    );
    node.classList.toggle(
      "dimmed",
      mission.stage === "hacking" &&
        mission.hack?.active &&
        mission.hack.stopIndex !== index &&
        !reels[index].locked
    );
  });
  if (hackTargetSymbol && mission.hack) {
    hackTargetSymbol.textContent = RESCUE_SYMBOLS[mission.hack.targetSymbolIndex];
  }
}

function startHackMinigame() {
  if (!isRescueMissionActive() || mission.stage !== "playerNearVan" || !mission.hack) {
    return;
  }

  mission.stage = "hacking";
  mission.hack.active = true;
  mission.hack.result = null;
  mission.hack.stopIndex = 0;
  mission.hack.targetSymbolIndex = randomInt(0, RESCUE_SYMBOLS.length - 1);
  mission.hack.reels.forEach((reel, index) => {
    reel.locked = false;
    reel.progress = 0;
    reel.speed = RESCUE_REEL_SPEEDS[index];
    reel.symbolIndex = randomInt(0, RESCUE_SYMBOLS.length - 1);
  });
  if (hackIntroView) {
    hackIntroView.classList.add("hidden");
  }
  if (hackSlotView) {
    hackSlotView.classList.remove("hidden");
  }
  if (hackStatusLabel) {
    hackStatusLabel.textContent = `リール 1 を ${RESCUE_SYMBOLS[mission.hack.targetSymbolIndex]} で停止してください`;
  }
  updateHackReelsUi();
  updateHUD();
}

function completeRescueHack() {
  const van = mission.rescueVan;
  if (!van) {
    return;
  }

  mission.stage = "hostageFreed";
  mission.hack.active = false;
  mission.hack.result = "success";
  mission.hostage = {
    x: van.x + 36,
    y: van.y + 28,
    radius: 10,
    freed: true,
    rewardClaimed: false,
    name: "解放された人質",
  };
  setHackOverlayOpen(false);
  updateHUD();
  showToast("拘束ロック解除。人質を保護して報酬を受け取れ");
}

function tryAssistHackStop(reel, targetSymbolIndex) {
  if (!reel) {
    return;
  }

  if (reel.symbolIndex === targetSymbolIndex) {
    return;
  }

  const symbolCount = RESCUE_SYMBOLS.length;
  const previousSymbolIndex = (reel.symbolIndex - 1 + symbolCount) % symbolCount;
  const nextSymbolIndex = (reel.symbolIndex + 1) % symbolCount;

  if (
    (reel.progress <= RESCUE_STOP_ASSIST_WINDOW && previousSymbolIndex === targetSymbolIndex) ||
    (reel.progress >= 1 - RESCUE_STOP_ASSIST_WINDOW && nextSymbolIndex === targetSymbolIndex)
  ) {
    reel.symbolIndex = targetSymbolIndex;
    reel.progress = 0;
  }
}

function stopHackReel() {
  if (!isRescueMissionActive() || mission.stage !== "hacking" || !mission.hack?.active) {
    return;
  }

  const reel = mission.hack.reels[mission.hack.stopIndex];
  if (!reel) {
    return;
  }

  tryAssistHackStop(reel, mission.hack.targetSymbolIndex);
  reel.locked = true;
  mission.hack.stopIndex += 1;
  mission.hack.reels.forEach((entry, index) => {
    if (!entry.locked) {
      entry.speed = Math.max(5.6, RESCUE_REEL_SPEEDS[index] - mission.hack.stopIndex * 1.05);
    }
  });
  if (hackStatusLabel) {
    hackStatusLabel.textContent =
      mission.hack.stopIndex < 3
        ? `リール ${mission.hack.stopIndex + 1} を ${RESCUE_SYMBOLS[mission.hack.targetSymbolIndex]} で停止してください`
        : "判定中...";
  }

  if (mission.hack.stopIndex >= mission.hack.reels.length) {
    const allMatched = mission.hack.reels.every(
      (entry) => entry.symbolIndex === mission.hack.targetSymbolIndex
    );
    if (allMatched) {
      completeRescueHack();
      return;
    }

    mission.stage = "playerNearVan";
    mission.hack.active = false;
    mission.hack.result = "fail";
    if (hackIntroView) {
      hackIntroView.classList.remove("hidden");
    }
    if (hackSlotView) {
      hackSlotView.classList.add("hidden");
    }
    if (hackStatusLabel) {
      hackStatusLabel.textContent = `同期失敗: ${RESCUE_SYMBOLS[mission.hack.targetSymbolIndex]} を狙ってください`;
    }
    showToast("ハッキング失敗。もう一度近距離から侵入せよ");
    updateHUD();
    updateHackReelsUi();
  }
}

function updateHackMinigame(deltaTime) {
  if (!isRescueMissionActive() || mission.stage !== "hacking" || !mission.hack?.active) {
    return;
  }

  mission.hack.reels.forEach((reel) => {
    if (reel.locked) {
      return;
    }
    reel.progress += deltaTime * reel.speed;
    if (reel.progress >= 1) {
      reel.progress -= 1;
      reel.symbolIndex = (reel.symbolIndex + 1) % RESCUE_SYMBOLS.length;
    }
  });
  updateHackReelsUi();
}

function updateRescueVan(deltaTime) {
  if (
    !isRescueMissionActive() ||
    !mission.rescueVan ||
    mission.stage === "hostageFreed" ||
    mission.stage === "rewardReady" ||
    mission.stage === "playerNearVan" ||
    mission.stage === "hacking"
  ) {
    return;
  }

  const van = mission.rescueVan;
  const dx = van.target.x - van.x;
  const dy = van.target.y - van.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (distance < 24) {
    const routeRoads = ROAD_LAYOUT.filter((road) => !road.isAlley);
    const nextRoad = routeRoads[randomInt(0, routeRoads.length - 1)];
    van.target =
      nextRoad.kind === "horizontal"
        ? {
            x: randomInt(nextRoad.x + 120, nextRoad.x + nextRoad.width - 120),
            y: nextRoad.y + nextRoad.height / 2,
          }
        : {
            x: nextRoad.x + nextRoad.width / 2,
            y: randomInt(nextRoad.y + 120, nextRoad.y + nextRoad.height - 120),
          };
    van.axis = nextRoad.kind === "horizontal" ? "horizontal" : "vertical";
    return;
  }

  van.x += (dx / distance) * van.speed * deltaTime;
  van.y += (dy / distance) * van.speed * deltaTime;
  if (Math.abs(dx) > Math.abs(dy)) {
    van.direction = dx > 0 ? "right" : "left";
  } else {
    van.direction = dy > 0 ? "down" : "up";
  }
}

function clearMissionState() {
  mission.active = false;
  mission.type = null;
  mission.stage = "idle";
  mission.pickupPoint = null;
  mission.deliveryPoint = null;
  mission.stops = [];
  mission.currentStopIndex = 0;
  mission.perStopReward = 0;
  mission.reward = 0;
  mission.vehiclePoint = null;
  mission.entryPoint = null;
  mission.returnPoint = null;
  mission.bankPoint = null;
  mission.hasBriefcase = false;
  mission.rescueVan = null;
  mission.hostage = null;
  mission.hack = null;
  mission.cashBagCollected = false;
  mission.cashoutCombat = null;
  if (gameState.ridingVehicleId === MISSION_VEHICLE.id) {
    gameState.ridingVehicleId = null;
  }
  if (gameState.selectedVehicleId === MISSION_VEHICLE.id) {
    gameState.selectedVehicleId = null;
  }
  gameState.currentMode = "world";
  interiorState.active = false;
  setHackOverlayOpen(false);
  updateOverlayMode();
}

function startMission(jobType = gameState.selectedJobType) {
  if (mission.active || isTaxiJobActive()) {
    return;
  }

  const missionConfig = getMissionConfig(jobType);
  const entryFee = missionConfig?.entryFee || 0;
  if (entryFee > 0 && !spendMoney(entryFee, `${missionConfig.label} 参加費`, { source: "purchase" })) {
    showToast(`${missionConfig.label} の参加費 ${formatCurrency(entryFee)} が足りません`);
    return;
  }

  gameState.selectedJobType = jobType;
  gameState.currentPhoneScreen = jobType === "food" || jobType === "posting" ? jobType : "special";
  mission.type = jobType;
  mission.stops = [];
  mission.currentStopIndex = 0;
  mission.perStopReward = 0;
  mission.hasBriefcase = false;
  mission.vehiclePoint = null;
  mission.entryPoint = null;
  mission.returnPoint = null;
  mission.bankPoint = null;
  mission.rescueVan = null;
  mission.hostage = null;
  mission.hack = null;
  mission.cashBagCollected = false;
  mission.cashoutCombat = null;
  AudioEngine.missionStart();

  if (jobType === "food") {
    const shuffledPickupPoints = [...mapData.pickupPoints].sort(() => Math.random() - 0.5);
    const shuffledDeliveryPoints = [...mapData.deliveryPoints].sort(() => Math.random() - 0.5);
    mission.pickupPoint = shuffledPickupPoints[0];
    mission.deliveryPoint = shuffledDeliveryPoints[0];
    mission.reward = randomRewardFromRange(ECONOMY.jobs.delivery);
    mission.stage = "pickup";
    showToast(`Foodデリバリー開始: 参加費 ${formatCurrency(entryFee)} / ${mission.pickupPoint.name} で受け取り、${mission.deliveryPoint.name} へ届けよう`);
  } else if (jobType === "smallMission") {
    const pickupCandidates = [...mapData.specialReturnPoints].sort(() => Math.random() - 0.5);
    const deliveryCandidates = [...mapData.specialEntryPoints].sort(() => Math.random() - 0.5);
    mission.pickupPoint = pickupCandidates[0];
    mission.deliveryPoint =
      deliveryCandidates.find((point) => point.name !== mission.pickupPoint?.name) || deliveryCandidates[0];
    mission.reward = randomRewardFromRange(ECONOMY.jobs.smallMission);
    mission.stage = "smallMissionPickup";
    showToast(`小ミッション開始: 参加費 ${formatCurrency(entryFee)} / ${mission.pickupPoint.name} で依頼品を受け取り、${mission.deliveryPoint.name} へ運べ`);
  } else if (jobType === "posting") {
    const stopCount = randomInt(ECONOMY.jobs.posting.stopCountMin, ECONOMY.jobs.posting.stopCountMax);
    const shuffledPostingPoints = [...mapData.postingPoints].sort(() => Math.random() - 0.5);
    mission.stops = shuffledPostingPoints.slice(0, stopCount);
    mission.perStopReward = randomInt(15, 18);
    mission.reward = mission.perStopReward * mission.stops.length;
    mission.pickupPoint = null;
    mission.deliveryPoint = null;
    mission.stage = "posting";
    showToast(`ポスティング開始: 参加費 ${formatCurrency(entryFee)} / ${mission.stops.length}件の投函で合計 ${formatCurrency(mission.reward)} を目指そう`);
  } else if (jobType === "special") {
    const shuffledEntries = [...mapData.specialEntryPoints].sort(() => Math.random() - 0.5);
    const shuffledReturns = [...mapData.specialReturnPoints].sort(() => Math.random() - 0.5);
    mission.pickupPoint = null;
    mission.deliveryPoint = null;
    mission.reward = randomRewardFromRange(ECONOMY.jobs.riskyBriefcase);
    mission.vehiclePoint = createMissionVehicleSpawn();
    mission.entryPoint = shuffledEntries[0];
    mission.returnPoint = shuffledReturns.find((point) => point.name !== mission.entryPoint.name) || shuffledReturns[0];
    mission.stage = "briefcaseVehicle";
    showToast(`危険ジョブ開始: 参加費 ${formatCurrency(entryFee)} / 近くの任務用車両に乗り、${mission.entryPoint.name} へ向かえ`);
  } else if (jobType === "cashout") {
    const pickupCandidates = [...mapData.specialReturnPoints].sort(() => Math.random() - 0.5);
    const bankCandidates = [...mapData.bankPoints].sort(() => Math.random() - 0.5);
    mission.pickupPoint = {
      ...pickupCandidates[0],
      kind: "cashout-pickup",
      color: "#ffd866",
    };
    mission.bankPoint =
      bankCandidates.find((point) => Math.hypot(point.x - mission.pickupPoint.x, point.y - mission.pickupPoint.y) > 900) ||
      bankCandidates[0];
    mission.deliveryPoint = mission.bankPoint;
    mission.reward = randomRewardFromRange(ECONOMY.jobs.riskyCashout);
    mission.stage = "cashoutPickup";
    showToast(`危険ジョブ開始: 参加費 ${formatCurrency(entryFee)} / ${mission.pickupPoint.name} で現金を回収し、${mission.bankPoint.name} まで運べ`);
  } else {
    mission.pickupPoint = null;
    mission.deliveryPoint = null;
    mission.reward = randomRewardFromRange(ECONOMY.jobs.riskyRescue);
    createRescueVanMission();
    mission.stage = "vanSpawned";
    showToast(`危険ジョブ開始: 参加費 ${formatCurrency(entryFee)} / 発光する護送車を追跡してハッキングせよ`);
  }

  mission.active = true;

  updatePhoneScreen();
  updateHUD();
  updateButtonState();
}

function completeMission() {
  mission.stage = "complete";
  updateHUD();
  showToast(
    mission.type === "posting"
      ? `ポスティング完了! 合計 +${formatCurrency(mission.reward)}`
      : mission.type === "smallMission"
        ? `小ミッション完了! +${formatCurrency(mission.reward)}`
      : mission.type === "special"
        ? `危険ジョブ完了! +${formatCurrency(mission.reward)}`
      : mission.type === "rescue"
        ? `人質救出完了! +${formatCurrency(mission.reward)}`
      : mission.type === "cashout"
        ? `現金護送完了! +${formatCurrency(mission.reward)}`
      : `配達完了! +${formatCurrency(mission.reward)}`
  );
  showMissionCompleteBanner();
  AudioEngine.missionComplete();
  triggerScreenShake(5, 0.4);
  spawnParticles(player.x, player.y, { count: 20, color: "#79ffb5", speed: 110, life: 1.1, size: 5 });
  spawnParticles(player.x, player.y, { count: 10, color: "#ffd866", speed: 75, life: 0.9, size: 3.5 });

  window.setTimeout(() => {
    clearMissionState();
    updateHUD();
    updateButtonState();
    updateVehicleApp();
  }, 1400);
}

function mountMissionVehicle() {
  if (!isSpecialMissionActive() || mission.stage !== "briefcaseVehicle" || !mission.vehiclePoint) {
    return false;
  }

  const distance = Math.hypot(player.x - mission.vehiclePoint.x, player.y - mission.vehiclePoint.y);
  if (distance > 40) {
    return false;
  }

  gameState.ridingVehicleId = MISSION_VEHICLE.id;
  gameState.selectedVehicleId = MISSION_VEHICLE.id;
  mission.stage = "briefcaseDrive";
  mission.vehiclePoint = null;
  updateVehicleApp();
  updateHUD();
  updateButtonState();
  showToast(`任務用車両に乗車。${mission.entryPoint.name} へ急行せよ`);
  return true;
}

function rectContainsPoint(rect, x, y) {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

function canStandAtWorldPoint(x, y) {
  return (
    isWorldRoadPoint(x, y, player.collisionRadius) &&
    !collisionRects.some((rect) =>
      circleIntersectsRect(x, y, player.collisionRadius, rect)
    )
  );
}

function getNearestRoadSpawn(x, y) {
  let bestSpawn = null;
  let bestDistance = Infinity;

  ROAD_LAYOUT.forEach((road) => {
    if (road.isAlley) {
      return;
    }

    const margin = Math.max(28, (road.sidewalk || 0) + 10);
    const candidateX = clamp(
      x,
      road.x + margin,
      road.x + road.width - margin
    );
    const candidateY = clamp(
      y,
      road.y + margin,
      road.y + road.height - margin
    );

    if (!canStandAtWorldPoint(candidateX, candidateY)) {
      return;
    }

    const distance = Math.hypot(candidateX - x, candidateY - y);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestSpawn = { x: candidateX, y: candidateY };
    }
  });

  return bestSpawn;
}

function findSafeWorldSpawnNear(x, y) {
  const roadSpawn = getNearestRoadSpawn(x, y);
  if (roadSpawn) {
    return roadSpawn;
  }

  const candidates = [
    { x, y: y + 42 },
    { x, y: y + 64 },
    { x: x + 32, y: y + 52 },
    { x: x - 32, y: y + 52 },
    { x: x + 56, y: y + 78 },
    { x: x - 56, y: y + 78 },
    { x, y: y + 96 },
    { x: x + 84, y: y + 96 },
    { x: x - 84, y: y + 96 },
  ];

  for (const candidate of candidates) {
    const safeX = clamp(candidate.x, player.collisionRadius, WORLD.width - player.collisionRadius);
    const safeY = clamp(candidate.y, player.collisionRadius, WORLD.height - player.collisionRadius);
    if (canStandAtWorldPoint(safeX, safeY)) {
      return { x: safeX, y: safeY };
    }
  }

  return {
    x: clamp(x, player.collisionRadius, WORLD.width - player.collisionRadius),
    y: clamp(y + 96, player.collisionRadius, WORLD.height - player.collisionRadius),
  };
}

function createCashoutCombatState(anchor) {
  const enemies = [];
  for (let i = 0; i < 3; i++) {
    const angle = Math.PI * 2 * (i / 3) + Math.random() * 0.45;
    const distance = 180 + Math.random() * 110;
    const spawn = findSafeWorldSpawnNear(
      anchor.x + Math.cos(angle) * distance,
      anchor.y + Math.sin(angle) * distance
    );
    enemies.push({
      x: spawn.x,
      y: spawn.y,
      radius: WORLD_COMBAT_CONFIG.enemyRadius,
      alive: true,
      direction: "down",
      cooldown: 0.35 + i * 0.14,
    });
  }

  return {
    playerBullets: [],
    enemyBullets: [],
    enemies,
    fireCooldown: 0,
    hitFlash: 0,
  };
}

function failCashoutMission(reason) {
  spawnParticles(player.x, player.y, { count: 16, color: "#ff7b72", speed: 120, life: 0.9, size: 4.5 });
  triggerScreenShake(7, 0.32);
  clearMissionState();
  updateHUD();
  updateButtonState();
  showToast(reason);
}

function tryMoveWorldAgent(agent, targetX, targetY, deltaTime, speed) {
  const dx = targetX - agent.x;
  const dy = targetY - agent.y;
  const distance = Math.hypot(dx, dy) || 1;
  const stepX = (dx / distance) * speed * deltaTime;
  const stepY = (dy / distance) * speed * deltaTime;
  const nextX = clamp(agent.x + stepX, agent.radius, WORLD.width - agent.radius);
  const nextY = clamp(agent.y + stepY, agent.radius, WORLD.height - agent.radius);

  if (!collisionRects.some((rect) => circleIntersectsRect(nextX, agent.y, agent.radius, rect))) {
    agent.x = nextX;
  }
  if (!collisionRects.some((rect) => circleIntersectsRect(agent.x, nextY, agent.radius, rect))) {
    agent.y = nextY;
  }
}

function getWorldDirectionVector(direction) {
  if (direction === "left") return { x: -1, y: 0 };
  if (direction === "right") return { x: 1, y: 0 };
  if (direction === "up") return { x: 0, y: -1 };
  return { x: 0, y: 1 };
}

function updateCashoutCombat(deltaTime) {
  if (!isCashoutMissionActive() || mission.stage !== "cashoutBank" || !mission.cashoutCombat) {
    return;
  }
  if (gameState.isWorldMapOpen || gameState.isShopOpen || gameState.isHackOverlayOpen || gameState.isAccountOverlayOpen) {
    return;
  }

  const combat = mission.cashoutCombat;
  combat.fireCooldown = Math.max(0, combat.fireCooldown - deltaTime);
  combat.hitFlash = Math.max(0, combat.hitFlash - deltaTime);

  if ((keys.Space || inputState.fireHeld) && combat.fireCooldown <= 0) {
    const direction = getWorldDirectionVector(player.direction);
    combat.playerBullets.push({
      x: player.x + direction.x * 16,
      y: player.y + direction.y * 16,
      vx: direction.x * WORLD_COMBAT_CONFIG.playerBulletSpeed,
      vy: direction.y * WORLD_COMBAT_CONFIG.playerBulletSpeed,
      radius: WORLD_COMBAT_CONFIG.bulletRadius,
    });
    combat.fireCooldown = WORLD_COMBAT_CONFIG.playerFireInterval;
    AudioEngine.gunshot();
  }

  combat.playerBullets = combat.playerBullets.filter((bullet) => {
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;

    if (
      bullet.x < 0 ||
      bullet.x > WORLD.width ||
      bullet.y < 0 ||
      bullet.y > WORLD.height ||
      collisionRects.some((rect) => circleIntersectsRect(bullet.x, bullet.y, bullet.radius, rect))
    ) {
      return false;
    }

    const hitEnemy = combat.enemies.find(
      (enemy) => enemy.alive && Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.radius + bullet.radius + 2
    );
    if (hitEnemy) {
      hitEnemy.alive = false;
      spawnParticles(hitEnemy.x, hitEnemy.y, { count: 10, color: "#ff9b79", speed: 80, life: 0.55, size: 3 });
      return false;
    }

    return true;
  });

  combat.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }

    enemy.cooldown = Math.max(0, enemy.cooldown - deltaTime);
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.hypot(dx, dy) || 1;

    if (Math.abs(dx) > Math.abs(dy)) {
      enemy.direction = dx > 0 ? "right" : "left";
    } else {
      enemy.direction = dy > 0 ? "down" : "up";
    }

    if (distance > WORLD_COMBAT_CONFIG.attackRange * 0.7) {
      tryMoveWorldAgent(enemy, player.x, player.y, deltaTime, WORLD_COMBAT_CONFIG.enemyMoveSpeed);
    }

    if (distance <= WORLD_COMBAT_CONFIG.disengageRange && enemy.cooldown <= 0) {
      combat.enemyBullets.push({
        x: enemy.x,
        y: enemy.y,
        vx: (dx / distance) * WORLD_COMBAT_CONFIG.enemyBulletSpeed,
        vy: (dy / distance) * WORLD_COMBAT_CONFIG.enemyBulletSpeed,
        radius: WORLD_COMBAT_CONFIG.bulletRadius,
      });
      enemy.cooldown = randomInt(
        WORLD_COMBAT_CONFIG.enemyFireIntervalMin * 100,
        WORLD_COMBAT_CONFIG.enemyFireIntervalMax * 100
      ) / 100;
    }
  });

  combat.enemyBullets = combat.enemyBullets.filter((bullet) => {
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;

    if (
      bullet.x < 0 ||
      bullet.x > WORLD.width ||
      bullet.y < 0 ||
      bullet.y > WORLD.height ||
      collisionRects.some((rect) => circleIntersectsRect(bullet.x, bullet.y, bullet.radius, rect))
    ) {
      return false;
    }

    if (Math.hypot(player.x - bullet.x, player.y - bullet.y) < player.collisionRadius + bullet.radius + 1) {
      combat.hitFlash = 0.24;
      failCashoutMission("被弾しました。現金護送ミッション失敗");
      return false;
    }

    return true;
  });
}

function createInteriorMissionLayout() {
  // Indoor encounter uses a larger playfield so the smooth camera has room to breathe.
  interiorState.walls = [
    { x: 0, y: 0, width: interiorState.width, height: 26, type: "boundary" },
    { x: 0, y: interiorState.height - 26, width: interiorState.width, height: 26, type: "boundary" },
    { x: 0, y: 0, width: 26, height: interiorState.height, type: "boundary" },
    { x: interiorState.width - 26, y: 0, width: 26, height: interiorState.height, type: "boundary" },
    { x: 94, y: 420, width: 170, height: 32, type: "crate-stack" },
    { x: 196, y: 150, width: 28, height: 262, type: "fence" },
    { x: 196, y: 150, width: 248, height: 28, type: "fence" },
    { x: 338, y: 270, width: 260, height: 28, type: "crate-stack" },
    { x: 478, y: 388, width: 28, height: 172, type: "fence" },
    { x: 620, y: 132, width: 34, height: 162, type: "hvac" },
    { x: 620, y: 132, width: 214, height: 34, type: "hvac" },
    { x: 742, y: 342, width: 30, height: 148, type: "crate-stack" },
    { x: 744, y: 494, width: 148, height: 28, type: "crate-stack" },
    { x: 958, y: 170, width: 34, height: 248, type: "fence" },
    { x: 958, y: 170, width: 260, height: 34, type: "fence" },
    { x: 1112, y: 338, width: 210, height: 30, type: "crate-stack" },
    { x: 1218, y: 510, width: 160, height: 32, type: "crate-stack" },
    { x: 1164, y: 640, width: 32, height: 186, type: "hvac" },
    { x: 880, y: 716, width: 214, height: 34, type: "crate-stack" },
    { x: 584, y: 702, width: 160, height: 28, type: "fence" },
  ];

  interiorState.props = [
    { x: 46, y: 472, width: 28, height: 64, type: "column" },
    { x: 112, y: 472, width: 28, height: 64, type: "column" },
    { x: 726, y: 86, width: 112, height: 74, type: "vent-bank" },
    { x: 796, y: 88, width: 126, height: 78, type: "vent-bank" },
    { x: 866, y: 520, width: 48, height: 62, type: "exit-light" },
    { x: 1118, y: 94, width: 138, height: 82, type: "vent-bank" },
    { x: 1282, y: 582, width: 96, height: 74, type: "vent-bank" },
    { x: 1322, y: 804, width: 58, height: 70, type: "exit-light" },
  ];

  interiorState.enemies = [
    {
      x: 258,
      y: 196,
      radius: 12,
      direction: "down",
      cooldown: 0.3,
      alive: true,
      hp: 100,
      state: "patrol",
      stateTimer: 0.8,
      alertTimer: 0,
      lastKnownPlayerX: 258,
      lastKnownPlayerY: 196,
      patrolPoints: [
        { x: 258, y: 196 },
        { x: 392, y: 214 },
      ],
      patrolIndex: 0,
      coverBias: 0.25,
    },
    {
      x: 520,
      y: 190,
      radius: 12,
      direction: "left",
      cooldown: 0.8,
      alive: true,
      hp: 100,
      state: "guard",
      stateTimer: 1,
      alertTimer: 0,
      lastKnownPlayerX: 520,
      lastKnownPlayerY: 190,
      patrolPoints: [
        { x: 520, y: 190 },
        { x: 654, y: 228 },
      ],
      patrolIndex: 0,
      coverBias: 0.8,
    },
    {
      x: 660,
      y: 400,
      radius: 12,
      direction: "left",
      cooldown: 1,
      alive: true,
      hp: 100,
      state: "patrol",
      stateTimer: 0.3,
      alertTimer: 0,
      lastKnownPlayerX: 660,
      lastKnownPlayerY: 400,
      patrolPoints: [
        { x: 660, y: 400 },
        { x: 816, y: 468 },
      ],
      patrolIndex: 0,
      coverBias: 0.6,
    },
    {
      x: 826,
      y: 180,
      radius: 12,
      direction: "down",
      cooldown: 1.2,
      alive: true,
      hp: 100,
      state: "guard",
      stateTimer: 0.6,
      alertTimer: 0,
      lastKnownPlayerX: 826,
      lastKnownPlayerY: 180,
      patrolPoints: [
        { x: 826, y: 180 },
        { x: 860, y: 320 },
      ],
      patrolIndex: 0,
      coverBias: 0.9,
    },
    {
      x: 1110,
      y: 264,
      radius: 12,
      direction: "left",
      cooldown: 0.7,
      alive: true,
      hp: 100,
      state: "patrol",
      stateTimer: 1,
      alertTimer: 0,
      lastKnownPlayerX: 1110,
      lastKnownPlayerY: 264,
      patrolPoints: [
        { x: 1084, y: 252 },
        { x: 1250, y: 254 },
      ],
      patrolIndex: 0,
      coverBias: 0.7,
    },
    {
      x: 1264,
      y: 708,
      radius: 12,
      direction: "left",
      cooldown: 1.1,
      alive: true,
      hp: 100,
      state: "guard",
      stateTimer: 1.2,
      alertTimer: 0,
      lastKnownPlayerX: 1264,
      lastKnownPlayerY: 708,
      patrolPoints: [
        { x: 1264, y: 708 },
        { x: 1374, y: 790 },
      ],
      patrolIndex: 0,
      coverBias: 0.85,
    },
  ];

  interiorState.bullets = [];
  interiorState.enemyBullets = [];
  interiorState.effects = [];
  interiorState.scorchMarks = [];
  interiorState.bulletTrails = [];
  interiorState.briefcase = { x: 1316, y: 706, radius: 18, collected: false };
  interiorState.exitZone = { x: 1320, y: 816, width: 76, height: 68 };
  interiorState.player.x = 92;
  interiorState.player.y = 650;
  interiorState.player.direction = "right";
  interiorState.fireCooldown = 0;
  interiorState.reloadTime = 0;
  interiorState.resetFlash = 0;
  interiorState.hitFlash = 0;
  interiorState.hitGraceTime = 0;
  interiorState.armor = interiorState.maxArmor;
  interiorState.hp = interiorState.maxHp;
  interiorState.ammoInClip = interiorState.clipSize;
  interiorState.reserveAmmo = 60;
  interiorCamera.x = 0;
  interiorCamera.y = 0;
}

function startInteriorMission() {
  gameState.currentMode = "interior";
  toggleWorldMap(false);
  closeActiveShopScreen();
  if (gameState.ridingVehicleId === MISSION_VEHICLE.id) {
    gameState.ridingVehicleId = null;
  }
  if (gameState.selectedVehicleId === MISSION_VEHICLE.id) {
    gameState.selectedVehicleId = null;
  }
  interiorState.active = true;
  updateOverlayMode();
  createInteriorMissionLayout();
  interiorState.lives = interiorState.maxLives;
  updateVehicleApp();
  updateHUD();
  showToast("マンションへ侵入。Space で射撃し、アタッシュケースを確保せよ");
}

function finishInteriorMissionEscape() {
  interiorState.active = false;
  gameState.currentMode = "world";
  updateOverlayMode();
  mission.stage = "briefcaseReturn";
  const preferredSpawn = mission.entryPoint?.worldReturnSpawn || mission.entryPoint || player;
  const safeSpawn = findSafeWorldSpawnNear(preferredSpawn.x, preferredSpawn.y);
  player.x = safeSpawn.x;
  player.y = safeSpawn.y;
  player.isMoving = false;
  Object.keys(keys).forEach((key) => {
    keys[key] = false;
  });
  inputState.fireHeld = false;
  updateCamera();
  updateHUD();
  showToast(`脱出成功。${mission.returnPoint.name} にアタッシュケースを届けろ`);
}

function updateMissionProgress(deltaTime = 0) {
  if (isTaxiJobActive()) {
    handleTaxiProgress(deltaTime);
  }

  if (!mission.active) {
    return;
  }

  if (isRescueMissionActive()) {
    if (mission.rescueVan && (mission.stage === "vanSpawned" || mission.stage === "playerNearVan")) {
      const vanDistance = Math.hypot(player.x - mission.rescueVan.x, player.y - mission.rescueVan.y);
      if (vanDistance < 92) {
        mission.stage = "playerNearVan";
        setHackOverlayOpen(true);
      } else if (gameState.isHackOverlayOpen) {
        setHackOverlayOpen(false);
        mission.stage = "vanSpawned";
      }
    }

    if (mission.stage === "hostageFreed" && mission.hostage) {
      const hostageDistance = Math.hypot(player.x - mission.hostage.x, player.y - mission.hostage.y);
      if (hostageDistance < 54) {
        mission.stage = "rewardReady";
      }
    }

    return;
  }

  if (isCashoutMissionActive()) {
    if (mission.stage === "cashoutPickup" && mission.pickupPoint) {
      const pickupDistance = Math.hypot(player.x - mission.pickupPoint.x, player.y - mission.pickupPoint.y);
      if (pickupDistance < 36) {
        mission.stage = "cashoutBank";
        mission.cashBagCollected = true;
        mission.cashoutCombat = createCashoutCombatState(player);
        updateHUD();
        showToast(`現金を確保。${mission.bankPoint.name} へ急げ。被弾は一発アウト`);
      }
    } else if (mission.stage === "cashoutBank" && mission.bankPoint) {
      const bankDistance = Math.hypot(player.x - mission.bankPoint.x, player.y - mission.bankPoint.y);
      if (bankDistance < 36) {
        addMoney(mission.reward, "現金護送報酬", { source: "job" });
        completeMission();
      }
    }

    return;
  }

  if (isSpecialMissionActive() && isInteriorMode()) {
    if (
      !interiorState.briefcase.collected &&
      Math.hypot(
        interiorState.player.x - interiorState.briefcase.x,
        interiorState.player.y - interiorState.briefcase.y
      ) < 28
    ) {
      interiorState.briefcase.collected = true;
      mission.hasBriefcase = true;
      mission.stage = "briefcaseEscape";
      updateHUD();
      showToast("アタッシュケースを確保。出口へ急げ");
    }

    if (
      mission.stage === "briefcaseEscape" &&
      rectContainsPoint(
        interiorState.exitZone,
        interiorState.player.x,
        interiorState.player.y
      )
    ) {
      finishInteriorMissionEscape();
    }

    return;
  }

  const currentTarget = getCurrentMissionTarget();
  if (!currentTarget) {
    return;
  }

  const distance = Math.hypot(player.x - currentTarget.x, player.y - currentTarget.y);
  if (distance > 30) {
    return;
  }

  if (mission.stage === "pickup" || mission.stage === "smallMissionPickup") {
    mission.stage = mission.type === "smallMission" ? "smallMissionDelivery" : "delivery";
    updateHUD();
    showToast(
      mission.type === "smallMission"
        ? `依頼品を受け取った! 次は ${mission.deliveryPoint.name} へ届けよう`
        : `商品を受け取った! 次は住宅 ${mission.deliveryPoint.name} へ`
    );
    return;
  }

  if (mission.stage === "delivery" || mission.stage === "smallMissionDelivery") {
    addMoney(
      mission.reward,
      mission.type === "smallMission" ? "小ミッション報酬" : "Foodデリバリー報酬",
      { source: "job" }
    );
    completeMission();
    return;
  }

  if (mission.stage === "posting") {
    addMoney(mission.perStopReward, "ポスティング報酬", { source: "job" });
    mission.currentStopIndex += 1;

    if (mission.currentStopIndex >= mission.stops.length) {
      completeMission();
      return;
    }

    updateHUD();
    showToast(`投函完了! +${formatCurrency(mission.perStopReward)} / 次は ${mission.stops[mission.currentStopIndex].name}`);
    return;
  }

  if (mission.stage === "briefcaseDrive") {
    mission.stage = "briefcaseInfiltration";
    startInteriorMission();
    return;
  }

  if (mission.stage === "briefcaseReturn") {
    addMoney(mission.reward, "危険ジョブ報酬", { source: "job" });
    completeMission();
  }
}

function updateHUD() {
  const selectedMeta = getJobTypeMeta(gameState.selectedJobType);
  const currentTimeOfDay = getTimeOfDay();
  const nextGoal = getNextVehicleGoal();
  updateHousingUI();
  setTextContent(moneyLabel, formatCurrency(gameState.money));
  setTextContent(
    moneyGoalLabel,
    nextGoal
      ? `次の目標: ${nextGoal.label} まで ${formatCurrency(Math.max(0, getVehiclePrice(nextGoal.id) - gameState.money))}`
      : "最上位到達: すべての車を購入済み"
  );
  setTextContent(timeOfDayLabel, currentTimeOfDay.label);
  setTextContent(timeDisplayLabel, formatGameTime(getCurrentGameMinutes()));
  setTextContent(
    missionStatusLabel,
    isTaxiJobActive()
      ? (UI_TEXT[`taxi${taxiState.status.charAt(0).toUpperCase()}${taxiState.status.slice(1)}`] || "タクシー営業中")
      : UI_TEXT[mission.stage]
  );
  setTextContent(foodPayLabel, formatJobPayLabel(ECONOMY.jobs.delivery));
  setTextContent(
    postingPayLabel,
    selectedMeta.label === "ポスティング"
      ? selectedMeta.payLabel
      : formatJobPayLabel(ECONOMY.jobs.posting)
  );
  setTextContent(
    specialProgressLabel,
    isOpsMissionActive() ? "作戦が進行中です" : "ジョブ一覧を確認中"
  );
  setTextContent(
    specialObjectiveLabel,
    isOpsMissionActive() ? "作戦進行中" : "任務を開始してください"
  );
  updateTaxiUI();

  if (isHouseMode()) {
    const streamState = gameState.house.streaming;
    setTextContent(
      objectiveLabel,
      streamState && !streamState.complete
        ? `配信中... 視聴者 ${streamState.viewers}人`
        : "PCの前で E を押して配信を開始する"
    );
    setTextContent(
      currentTargetLabel,
      streamState?.complete
        ? `収益 ${streamState.liveLabel}`
        : streamState
          ? "配信進行中"
          : "PCまたは出口へ"
    );
    return;
  }

  if (isTaxiJobActive()) {
    if (taxiState.status === "searchingPassenger" && taxiState.passenger) {
      setTextContent(objectiveLabel, `${taxiState.passenger.name} で乗客を拾う`);
      setTextContent(currentTargetLabel, `乗客へ向かう: ${taxiState.passenger.name}`);
      return;
    }
    if ((taxiState.status === "passengerOnBoard" || taxiState.status === "delivering") && taxiState.destination) {
      setTextContent(objectiveLabel, `${taxiState.destination.name} まで送迎する`);
      setTextContent(currentTargetLabel, `送迎先: ${taxiState.destination.name}`);
      return;
    }
  }

  if (mission.stage === "pickup" && mission.pickupPoint) {
    setTextContent(objectiveLabel, `${mission.pickupPoint.name} で商品を受け取る`);
    setTextContent(currentTargetLabel, `受取先へ向かう: ${mission.pickupPoint.name}`);
    setTextContent(foodObjectiveLabel, `${mission.pickupPoint.name} で商品を受け取る`);
    setTextContent(foodProgressLabel, `配達報酬 ${formatCurrency(mission.reward)}`);
    setTextContent(postingObjectiveLabel, "Foodデリバリー実行中");
    setTextContent(postingProgressLabel, "ホームに戻ると他アプリを確認できます");
    return;
  }

  if (mission.stage === "delivery" && mission.deliveryPoint) {
    setTextContent(objectiveLabel, `${mission.deliveryPoint.name} に届ける`);
    setTextContent(currentTargetLabel, `届け先へ向かう: ${mission.deliveryPoint.name}`);
    setTextContent(foodObjectiveLabel, `${mission.deliveryPoint.name} に届ける`);
    setTextContent(foodProgressLabel, `配達報酬 ${formatCurrency(mission.reward)}`);
    setTextContent(postingObjectiveLabel, "Foodデリバリー実行中");
    setTextContent(postingProgressLabel, "別アプリへの切り替えは現在停止中");
    return;
  }

  if (mission.stage === "smallMissionPickup" && mission.pickupPoint) {
    setTextContent(objectiveLabel, `${mission.pickupPoint.name} で依頼品を回収する`);
    setTextContent(currentTargetLabel, `回収先: ${mission.pickupPoint.name}`);
    setTextContent(foodObjectiveLabel, "小ミッション実行中");
    setTextContent(foodProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 低リスクの中間案件`);
    setTextContent(postingObjectiveLabel, `${mission.pickupPoint.name} で依頼品を受け取る`);
    setTextContent(postingProgressLabel, "回収後に受け渡し先へ向かう");
    setTextContent(specialObjectiveLabel, `${mission.pickupPoint.name} で回収`);
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ ${ECONOMY.jobs.smallMission.role}`);
    return;
  }

  if (mission.stage === "smallMissionDelivery" && mission.deliveryPoint) {
    setTextContent(objectiveLabel, `${mission.deliveryPoint.name} に依頼品を届ける`);
    setTextContent(currentTargetLabel, `受け渡し先: ${mission.deliveryPoint.name}`);
    setTextContent(foodObjectiveLabel, "小ミッション実行中");
    setTextContent(foodProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 受け渡し中`);
    setTextContent(postingObjectiveLabel, `${mission.deliveryPoint.name} に依頼品を届ける`);
    setTextContent(postingProgressLabel, "納品でまとまった報酬を獲得");
    setTextContent(specialObjectiveLabel, `${mission.deliveryPoint.name} に届ける`);
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 中間ジョブ`);
    return;
  }

  if (mission.stage === "cashoutPickup" && mission.pickupPoint) {
    setTextContent(objectiveLabel, `${mission.pickupPoint.name} で現金を回収する`);
    setTextContent(currentTargetLabel, `現金回収地点: ${mission.pickupPoint.name}`);
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 武装妨害あり`);
    setTextContent(postingObjectiveLabel, `${mission.pickupPoint.name} で現金を確保する`);
    setTextContent(postingProgressLabel, "回収後に銀行まで護送");
    setTextContent(specialObjectiveLabel, `${mission.pickupPoint.name} で現金を回収`);
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 回収後に襲撃発生`);
    return;
  }

  if (mission.stage === "cashoutBank" && mission.bankPoint) {
    setTextContent(objectiveLabel, `${mission.bankPoint.name} まで現金を運ぶ`);
    setTextContent(currentTargetLabel, `銀行へ護送: ${mission.bankPoint.name}`);
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, "被弾一発で失敗 / Space で応戦");
    setTextContent(postingObjectiveLabel, `${mission.bankPoint.name} に現金を届ける`);
    setTextContent(postingProgressLabel, "武装妨害を排除しながら銀行へ");
    setTextContent(specialObjectiveLabel, `${mission.bankPoint.name} に護送する`);
    setTextContent(specialProgressLabel, "被弾一発で失敗 / Space で射撃");
    return;
  }

  if (mission.stage === "posting" && mission.stops[mission.currentStopIndex]) {
    const currentStop = mission.stops[mission.currentStopIndex];
    const stopLabel = currentStop.targetType === "home" ? "住宅" : "店舗";
    setTextContent(objectiveLabel, `${currentStop.name} にチラシを投函する`);
    setTextContent(currentTargetLabel, `${stopLabel}へ向かう: ${currentStop.name}`);
    setTextContent(postingPayLabel, `1軒 +${formatCurrency(mission.perStopReward)} / 合計 ${formatCurrency(mission.reward)}`);
    setTextContent(postingObjectiveLabel, `${currentStop.name} にチラシを投函する`);
    setTextContent(
      postingProgressLabel,
      `${mission.currentStopIndex}/${mission.stops.length}件完了 ・ 次は${stopLabel}`
    );
    setTextContent(foodObjectiveLabel, "ポスティング実行中");
    setTextContent(foodProgressLabel, "別アプリへの切り替えは現在停止中");
    return;
  }

  if (mission.stage === "complete") {
    setTextContent(objectiveLabel, `報酬 ${formatCurrency(mission.reward)} を獲得`);
    setTextContent(currentTargetLabel, "仕事完了");
    setTextContent(foodObjectiveLabel, `報酬 ${formatCurrency(mission.reward)} を獲得`);
    setTextContent(foodProgressLabel, "次の配達を開始できます");
    setTextContent(postingObjectiveLabel, `報酬 ${formatCurrency(mission.reward)} を獲得`);
    setTextContent(postingProgressLabel, "次のポスティングを開始できます");
    setTextContent(specialObjectiveLabel, `報酬 ${formatCurrency(mission.reward)} を獲得`);
    setTextContent(specialProgressLabel, "次の特別業務を開始できます");
    return;
  }

  if ((mission.stage === "vanSpawned" || mission.stage === "playerNearVan" || mission.stage === "hacking") && mission.rescueVan) {
    setTextContent(objectiveLabel, "発光する護送車へ近づきハッキングを仕掛ける");
    setTextContent(currentTargetLabel, "護送車を追跡");
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, "護送車の通信圏内へ接近");
    setTextContent(postingObjectiveLabel, "護送車を追跡する");
    setTextContent(postingProgressLabel, mission.stage === "hacking" ? "スロット侵入を実行中" : "近づくと侵入UIが開く");
    setTextContent(specialObjectiveLabel, "護送車を止めずにロックを解除する");
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 通信圏への接近が必要`);
    return;
  }

  if ((mission.stage === "hostageFreed" || mission.stage === "rewardReady") && mission.hostage) {
    setTextContent(objectiveLabel, "解放した人質に近づいて報酬を受け取る");
    setTextContent(currentTargetLabel, "人質を保護");
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, "人質を確保済み");
    setTextContent(postingObjectiveLabel, "人質に話しかける");
    setTextContent(postingProgressLabel, "Eで会話すると報酬を受領");
    setTextContent(specialObjectiveLabel, "人質から報酬を受け取る");
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 護送車ロック解除済み`);
    return;
  }

  if (mission.stage === "briefcaseVehicle" && mission.vehiclePoint) {
    setTextContent(objectiveLabel, "近くに出現した任務用車両へ向かう");
    setTextContent(currentTargetLabel, "任務用車両に乗り込む");
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, "別アプリへの切り替えは現在停止中");
    setTextContent(postingObjectiveLabel, "特別業務を実行中");
    setTextContent(postingProgressLabel, "任務車両への乗車待ち");
    setTextContent(specialObjectiveLabel, "近くの任務用車両に乗り込む");
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ 高速車両を確保`);
    return;
  }

  if ((mission.stage === "briefcaseDrive" || mission.stage === "briefcaseInfiltration") && mission.entryPoint) {
    setTextContent(objectiveLabel, `${mission.entryPoint.name} の光る侵入地点へ向かう`);
    setTextContent(currentTargetLabel, `潜入地点: ${mission.entryPoint.name}`);
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, "マンション潜入の準備中");
    setTextContent(postingObjectiveLabel, "特別業務を実行中");
    setTextContent(postingProgressLabel, "指定地点に入ると屋内へ切り替え");
    setTextContent(specialObjectiveLabel, `${mission.entryPoint.name} に潜入する`);
    setTextContent(specialProgressLabel, "光る地点で屋内戦闘へ移行");
    return;
  }

  if (mission.stage === "briefcaseEscape" && isInteriorMode()) {
    setTextContent(objectiveLabel, "アタッシュケースを持って出口へ脱出する");
    setTextContent(currentTargetLabel, "屋内出口へ向かう");
    setTextContent(specialObjectiveLabel, "アタッシュケースを持って脱出");
    setTextContent(specialProgressLabel, "Space で射撃しながら出口へ");
    return;
  }

  if (mission.stage === "briefcaseReturn" && mission.returnPoint) {
    setTextContent(objectiveLabel, `${mission.returnPoint.name} にアタッシュケースを届ける`);
    setTextContent(currentTargetLabel, `受渡し地点: ${mission.returnPoint.name}`);
    setTextContent(foodObjectiveLabel, "特別業務を実行中");
    setTextContent(foodProgressLabel, "ケースを持って受渡し地点へ");
    setTextContent(postingObjectiveLabel, "特別業務を実行中");
    setTextContent(postingProgressLabel, "納品でミッション完了");
    setTextContent(specialObjectiveLabel, `${mission.returnPoint.name} に届ける`);
    setTextContent(specialProgressLabel, `報酬 ${formatCurrency(mission.reward)} ・ ケース確保済み`);
    return;
  }

  setTextContent(objectiveLabel, "右下のスマホで依頼を受けてください");
  setTextContent(currentTargetLabel, "依頼を受けてください");
  setTextContent(foodPayLabel, formatJobPayLabel(ECONOMY.jobs.delivery));
  setTextContent(foodObjectiveLabel, "依頼を受けてください");
  setTextContent(foodProgressLabel, "店舗で受取して家へ届けます");
  setTextContent(postingPayLabel, formatJobPayLabel(ECONOMY.jobs.posting));
  setTextContent(postingObjectiveLabel, "依頼を受けてください");
  setTextContent(postingProgressLabel, "ホーム画面から仕事を選択");
  setTextContent(specialObjectiveLabel, "任務を開始してください");
  setTextContent(specialProgressLabel, "ジョブ一覧を確認中");
}

function getCurrentMissionTarget() {
  const taxiTarget = getTaxiMissionTarget();
  if (taxiTarget) {
    return taxiTarget;
  }

  if (mission.stage === "pickup") {
    return mission.pickupPoint;
  }

  if (mission.stage === "delivery") {
    return mission.deliveryPoint;
  }

  if (mission.stage === "smallMissionPickup") {
    return mission.pickupPoint;
  }

  if (mission.stage === "smallMissionDelivery") {
    return mission.deliveryPoint;
  }

  if (mission.stage === "posting") {
    return mission.stops[mission.currentStopIndex] || null;
  }

  if (mission.stage === "briefcaseVehicle") {
    return mission.vehiclePoint;
  }

  if (mission.stage === "briefcaseDrive" || mission.stage === "briefcaseInfiltration") {
    return mission.entryPoint;
  }

  if (mission.stage === "briefcaseReturn") {
    return mission.returnPoint;
  }

  if (mission.stage === "cashoutPickup") {
    return mission.pickupPoint;
  }

  if (mission.stage === "cashoutBank") {
    return mission.bankPoint;
  }

  if (mission.stage === "vanSpawned" || mission.stage === "playerNearVan" || mission.stage === "hacking") {
    return mission.rescueVan;
  }

  if (mission.stage === "hostageFreed" || mission.stage === "rewardReady") {
    return mission.hostage;
  }

  return null;
}

function getDirectionArrow(fromX, fromY, toX, toY) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  const directions = ["→", "↘", "↓", "↙", "←", "↖", "↑", "↗"];
  const index = Math.round(angle / (Math.PI / 4));
  return directions[((index % 8) + 8) % 8];
}

function updateNavigationGuide() {
  if (isInteriorMode()) {
    currentTargetArrowLabel.textContent = mission.stage === "briefcaseEscape" ? "⇢" : "!";
    currentTargetLabel.textContent = mission.stage === "briefcaseEscape"
      ? "出口へ向かう"
      : "アタッシュケースへ向かう";
    return;
  }

  if (isHouseMode()) {
    const nearPc = rectContainsPoint(houseState.pcZone, houseState.player.x, houseState.player.y);
    currentTargetArrowLabel.textContent = nearPc ? "●" : "⇢";
    currentTargetLabel.textContent = nearPc ? "E: 配信開始 / PC収益確認" : "PCか玄関ドアへ向かう";
    return;
  }

  const target = getCurrentMissionTarget();

  if (!target) {
    currentTargetArrowLabel.textContent = mission.stage === "complete" ? "✓" : "•";
    return;
  }

  currentTargetArrowLabel.textContent = getDirectionArrow(player.x, player.y, target.x, target.y);
}

function updateButtonState() {
  const busy = mission.active || isTaxiJobActive();
  setDisabled(acceptMissionButton, busy);
  setDisabled(startPostingButton, busy);
  setDisabled(startSpecialButton, busy);
  setDisabled(startSmallMissionButton, busy);
  setDisabled(startRescueButton, busy);
  setDisabled(startCashoutButton, busy);
  setDisabled(mapButton, false);
  setDisabled(foodDeliveryButton, busy && mission.type !== "food");
  setDisabled(vehicleButton, false);
  setDisabled(postingButton, busy && mission.type !== "posting");
  setDisabled(taxiButton, mission.active);
  setDisabled(specialOpsButton, busy && !(mission.type === "smallMission" || mission.type === "special" || mission.type === "rescue" || mission.type === "cashout"));
  setDisabled(housingButton, false);
  setDisabled(premiumButton, false);
  setDisabled(mapHomeButton, false);
  setDisabled(foodHomeButton, false);
  setDisabled(vehicleHomeButton, false);
  setDisabled(postingHomeButton, false);
  setDisabled(taxiHomeButton, false);
  setDisabled(specialHomeButton, false);
  setDisabled(housingHomeButton, false);
  setDisabled(premiumHomeButton, false);
  updateTaxiButtons();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  AudioEngine.toast();

  if (gameState.toastTimeoutId) {
    window.clearTimeout(gameState.toastTimeoutId);
  }

  gameState.toastTimeoutId = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

function showMissionCompleteBanner() {
  missionCompleteBanner.classList.add("visible");

  if (gameState.missionCompleteTimeoutId) {
    window.clearTimeout(gameState.missionCompleteTimeoutId);
  }

  gameState.missionCompleteTimeoutId = window.setTimeout(() => {
    missionCompleteBanner.classList.remove("visible");
  }, 2000);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function circleIntersectsRect(circleX, circleY, radius, rect) {
  const closestX = clamp(circleX, rect.x, rect.x + rect.width);
  const closestY = clamp(circleY, rect.y, rect.y + rect.height);
  const dx = circleX - closestX;
  const dy = circleY - closestY;
  return dx * dx + dy * dy < radius * radius;
}

function interiorCircleHitsWall(x, y, radius) {
  return interiorState.walls.some((wall) => circleIntersectsRect(x, y, radius, wall));
}

function spawnInteriorImpact(x, y, color = "#ffb347", size = 1, scatter = 1) {
  const particleCount = Math.max(4, Math.floor(8 * size));
  for (let index = 0; index < particleCount; index += 1) {
    const angle = (Math.PI * 2 * index) / particleCount + Math.random() * 0.35;
    const speed = (70 + Math.random() * 150) * scatter;
    interiorState.effects.push({
      kind: "spark",
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1.6 + Math.random() * 2.6 * size,
      life: 0.18 + Math.random() * 0.18,
      maxLife: 0.36,
      color,
    });
  }
}

function addInteriorScorchMark(x, y, radius, color) {
  if (interiorState.scorchMarks.length > 18) {
    interiorState.scorchMarks.shift();
  }

  interiorState.scorchMarks.push({
    x,
    y,
    radius,
    color,
    alpha: 0.28,
  });
}

function lineIntersectsRect(x1, y1, x2, y2, rect) {
  const steps = Math.max(8, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 16));
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;
    if (
      px >= rect.x &&
      px <= rect.x + rect.width &&
      py >= rect.y &&
      py <= rect.y + rect.height
    ) {
      return true;
    }
  }
  return false;
}

function hasInteriorLineOfSight(x1, y1, x2, y2) {
  return !interiorState.walls.some(
    (wall) => wall.type !== "boundary" && lineIntersectsRect(x1, y1, x2, y2, wall)
  );
}

function getInteriorCoverPoint(enemy) {
  let bestPoint = null;
  let bestScore = Infinity;

  interiorState.walls.forEach((wall) => {
    if (wall.type === "boundary") {
      return;
    }

    const candidatePoints = [
      { x: wall.x - 24, y: clamp(enemy.y, wall.y + 16, wall.y + wall.height - 16) },
      { x: wall.x + wall.width + 24, y: clamp(enemy.y, wall.y + 16, wall.y + wall.height - 16) },
      { x: clamp(enemy.x, wall.x + 16, wall.x + wall.width - 16), y: wall.y - 24 },
      { x: clamp(enemy.x, wall.x + 16, wall.x + wall.width - 16), y: wall.y + wall.height + 24 },
    ];

    candidatePoints.forEach((point) => {
      if (interiorCircleHitsWall(point.x, point.y, enemy.radius)) {
        return;
      }

      const distanceToEnemy = Math.hypot(enemy.x - point.x, enemy.y - point.y);
      if (distanceToEnemy > INTERIOR_CONFIG.coverSeekRange) {
        return;
      }

      const playerDistance = Math.hypot(interiorState.player.x - point.x, interiorState.player.y - point.y);
      const score = distanceToEnemy * 0.9 - playerDistance * enemy.coverBias;
      if (score < bestScore) {
        bestScore = score;
        bestPoint = point;
      }
    });
  });

  return bestPoint;
}

function moveInteriorAgent(entity, targetX, targetY, speed, deltaTime) {
  const dx = targetX - entity.x;
  const dy = targetY - entity.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) {
    return;
  }

  const vx = (dx / distance) * speed * deltaTime;
  const vy = (dy / distance) * speed * deltaTime;
  const nextX = clamp(entity.x + vx, entity.radius + 30, interiorState.width - entity.radius - 30);
  const nextY = clamp(entity.y + vy, entity.radius + 30, interiorState.height - entity.radius - 30);

  if (!interiorCircleHitsWall(nextX, entity.y, entity.radius)) {
    entity.x = nextX;
  }
  if (!interiorCircleHitsWall(entity.x, nextY, entity.radius)) {
    entity.y = nextY;
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    entity.direction = dx > 0 ? "right" : "left";
  } else {
    entity.direction = dy > 0 ? "down" : "up";
  }
}

function randomPatrolPause() {
  return randomInt(
    Math.floor(INTERIOR_CONFIG.patrolPauseMin * 10),
    Math.floor(INTERIOR_CONFIG.patrolPauseMax * 10)
  ) / 10;
}

function ensureReload() {
  if (
    interiorState.reloadTime <= 0 &&
    interiorState.ammoInClip <= 0 &&
    interiorState.reserveAmmo > 0
  ) {
    interiorState.reloadTime = INTERIOR_CONFIG.reloadDuration;
  }
}

function tryFireInteriorWeapon(playerRef) {
  if (
    interiorState.fireCooldown > 0 ||
    interiorState.reloadTime > 0 ||
    interiorState.ammoInClip <= 0
  ) {
    return false;
  }

  const directionMap = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
  };
  const direction = directionMap[playerRef.direction];
  interiorState.bullets.push({
    x: playerRef.x + direction.x * 16,
    y: playerRef.y + direction.y * 16,
    prevX: playerRef.x,
    prevY: playerRef.y,
    vx: direction.x * INTERIOR_CONFIG.bulletSpeed,
    vy: direction.y * INTERIOR_CONFIG.bulletSpeed,
    radius: 4,
    owner: "player",
  });
  interiorState.effects.push({
    kind: "muzzle",
    x: playerRef.x + direction.x * 20,
    y: playerRef.y + direction.y * 20,
    vx: direction.x * 10,
    vy: direction.y * 10,
    radius: 12,
    life: 0.08,
    maxLife: 0.08,
    color: "rgba(255, 214, 140, 0.95)",
  });
  interiorState.ammoInClip -= 1;
  interiorState.fireCooldown = INTERIOR_CONFIG.fireInterval;
  AudioEngine.gunshot();
  triggerScreenShake(2.5, 0.12);
  ensureReload();
  return true;
}

function updateInteriorCamera(deltaTime) {
  const directionMap = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
  };
  const look = directionMap[interiorState.player.direction] || directionMap.down;
  const targetX = clamp(
    interiorState.player.x + look.x * INTERIOR_CONFIG.lookAhead - VIEWPORT.width / 2,
    0,
    interiorState.width - VIEWPORT.width
  );
  const targetY = clamp(
    interiorState.player.y + look.y * INTERIOR_CONFIG.lookAhead - VIEWPORT.height / 2,
    0,
    interiorState.height - VIEWPORT.height
  );

  interiorCamera.x += (targetX - interiorCamera.x) * Math.min(1, deltaTime * INTERIOR_CONFIG.cameraLag);
  interiorCamera.y += (targetY - interiorCamera.y) * Math.min(1, deltaTime * INTERIOR_CONFIG.cameraLag);
}

function rectIntersectsViewport(x, y, width, height) {
  return (
    x + width >= camera.x - 120 &&
    x <= camera.x + VIEWPORT.width + 120 &&
    y + height >= camera.y - 120 &&
    y <= camera.y + VIEWPORT.height + 120
  );
}

function updateMovementInput() {
  let horizontal = 0;
  let vertical = 0;

  if (keys.ArrowLeft || keys.KeyA) {
    horizontal -= 1;
  }
  if (keys.ArrowRight || keys.KeyD) {
    horizontal += 1;
  }
  if (keys.ArrowUp || keys.KeyW) {
    vertical -= 1;
  }
  if (keys.ArrowDown || keys.KeyS) {
    vertical += 1;
  }

  return { horizontal, vertical };
}

function updateInteriorPlayer(deltaTime) {
  if (!interiorState.active) {
    return;
  }

  const { horizontal, vertical } = updateMovementInput();
  const playerRef = interiorState.player;
  const length = Math.hypot(horizontal, vertical) || 1;
  const speed = INTERIOR_CONFIG.playerSpeed;
  const nextX = clamp(
    playerRef.x + (horizontal / length) * speed * deltaTime,
    playerRef.radius + 28,
    interiorState.width - playerRef.radius - 28
  );
  const nextY = clamp(
    playerRef.y + (vertical / length) * speed * deltaTime,
    playerRef.radius + 28,
    interiorState.height - playerRef.radius - 28
  );

  if (horizontal > 0) {
    playerRef.direction = "right";
  } else if (horizontal < 0) {
    playerRef.direction = "left";
  } else if (vertical > 0) {
    playerRef.direction = "down";
  } else if (vertical < 0) {
    playerRef.direction = "up";
  }

  if (!interiorCircleHitsWall(nextX, playerRef.y, playerRef.radius)) {
    playerRef.x = nextX;
  }

  if (!interiorCircleHitsWall(playerRef.x, nextY, playerRef.radius)) {
    playerRef.y = nextY;
  }

  interiorState.fireCooldown = Math.max(0, interiorState.fireCooldown - deltaTime);
  const reloadTimeBefore = interiorState.reloadTime;
  interiorState.reloadTime = Math.max(0, interiorState.reloadTime - deltaTime);
  interiorState.resetFlash = Math.max(0, interiorState.resetFlash - deltaTime);
  interiorState.hitFlash = Math.max(0, interiorState.hitFlash - deltaTime);
  interiorState.hitGraceTime = Math.max(0, interiorState.hitGraceTime - deltaTime);

  if (
    reloadTimeBefore > 0 &&
    interiorState.reloadTime === 0 &&
    interiorState.ammoInClip < interiorState.clipSize &&
    interiorState.reserveAmmo > 0
  ) {
    const ammoNeeded = interiorState.clipSize - interiorState.ammoInClip;
    const ammoLoaded = Math.min(ammoNeeded, interiorState.reserveAmmo);
    interiorState.ammoInClip += ammoLoaded;
    interiorState.reserveAmmo -= ammoLoaded;
  }

  if (keys.KeyR && interiorState.reloadTime <= 0 && interiorState.ammoInClip < interiorState.clipSize && interiorState.reserveAmmo > 0) {
    interiorState.reloadTime = INTERIOR_CONFIG.reloadDuration;
  }

  // Fire from either raw key state or held-input fallback so hit reactions do not interrupt shooting.
  if (keys.Space || inputState.fireHeld) {
    tryFireInteriorWeapon(playerRef);
  }

  ensureReload();
}

function movePlayer(deltaTime) {
  if (isInteriorMode()) {
    updateInteriorPlayer(deltaTime);
    player.isMoving = false;
    return;
  }

  if (isHouseMode()) {
    updateHousePlayer(deltaTime);
    player.isMoving = false;
    return;
  }

  if (gameState.isWorldMapOpen || gameState.isShopOpen || gameState.isHackOverlayOpen) {
    player.isMoving = false;
    player.motion.x = 0;
    player.motion.y = 0;
    return;
  }

  const { horizontal, vertical } = updateMovementInput();
  const length = Math.hypot(horizontal, vertical) || 1;
  const hasInput = horizontal !== 0 || vertical !== 0;
  const profile = getCurrentMovementProfile();
  const desiredVelocityX = hasInput ? (horizontal / length) * profile.maxSpeed : 0;
  const desiredVelocityY = hasInput ? (vertical / length) * profile.maxSpeed : 0;
  const response = hasInput ? profile.acceleration : profile.deceleration;
  const blend = Math.min(1, response * deltaTime);
  const handlingBlend = Math.min(1, profile.handling * deltaTime);

  player.motion.x += (desiredVelocityX - player.motion.x) * handlingBlend;
  player.motion.y += (desiredVelocityY - player.motion.y) * handlingBlend;

  if (!hasInput) {
    player.motion.x += (0 - player.motion.x) * blend;
    player.motion.y += (0 - player.motion.y) * blend;
  }

  player.isMoving = Math.hypot(player.motion.x, player.motion.y) > 18;

  if (player.isMoving) {
    if (Math.abs(player.motion.x) > Math.abs(player.motion.y)) {
      player.direction = player.motion.x > 0 ? "right" : "left";
    } else {
      player.direction = player.motion.y > 0 ? "down" : "up";
    }
  }

  const velocityX = player.motion.x * deltaTime;
  const velocityY = player.motion.y * deltaTime;

  const nextX = clamp(player.x + velocityX, player.collisionRadius, WORLD.width - player.collisionRadius);
  const nextY = clamp(player.y + velocityY, player.collisionRadius, WORLD.height - player.collisionRadius);

  const canMoveX =
    isWorldRoadPoint(nextX, player.y, player.collisionRadius) &&
    !collisionRects.some((rect) => circleIntersectsRect(nextX, player.y, player.collisionRadius, rect));
  const canMoveY =
    isWorldRoadPoint(player.x, nextY, player.collisionRadius) &&
    !collisionRects.some((rect) => circleIntersectsRect(player.x, nextY, player.collisionRadius, rect));

  if (canMoveX) {
    player.x = nextX;
  } else {
    player.motion.x = 0;
  }
  if (canMoveY) {
    player.y = nextY;
  } else {
    player.motion.y = 0;
  }
}

function updateCamera() {
  const directionMap = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
  };
  const look = directionMap[player.direction] || directionMap.down;
  const targetX = clamp(
    player.x + look.x * 42 - VIEWPORT.width / 2,
    -OCEAN.viewMargin,
    WORLD.width - VIEWPORT.width + OCEAN.viewMargin
  );
  const targetY = clamp(
    player.y + look.y * 42 - VIEWPORT.height / 2,
    -OCEAN.viewMargin,
    WORLD.height - VIEWPORT.height + OCEAN.viewMargin
  );

  camera.x += (targetX - camera.x) * 0.12;
  camera.y += (targetY - camera.y) * 0.12;
}

function updateNpcCars(deltaTime) {
  npcCars.forEach((car) => {
    car.position += car.speed * deltaTime;

    if (car.axis === "horizontal") {
      const resetPadding = car.width + 80;
      if (car.speed > 0 && car.position > WORLD.width + resetPadding) {
        car.position = -resetPadding;
      }
      if (car.speed < 0 && car.position < -resetPadding) {
        car.position = WORLD.width + resetPadding;
      }
      return;
    }

    const resetPadding = car.height + 80;
    if (car.speed > 0 && car.position > WORLD.height + resetPadding) {
      car.position = -resetPadding;
    }
    if (car.speed < 0 && car.position < -resetPadding) {
      car.position = WORLD.height + resetPadding;
    }
  });
}

function updatePedestrians(deltaTime) {
  pedestrians.forEach((pedestrian) => {
    pedestrian.position += pedestrian.speed * pedestrian.dir * deltaTime;

    if (pedestrian.position > pedestrian.end) {
      pedestrian.position = pedestrian.end;
      pedestrian.dir = -1;
    } else if (pedestrian.position < pedestrian.start) {
      pedestrian.position = pedestrian.start;
      pedestrian.dir = 1;
    }
  });
}

function drawBackground() {
  const seaGradient = ctx.createLinearGradient(camera.x, camera.y, camera.x, camera.y + VIEWPORT.height);
  seaGradient.addColorStop(0, "#0a2842");
  seaGradient.addColorStop(0.5, "#0a1f34");
  seaGradient.addColorStop(1, "#06111e");
  ctx.fillStyle = seaGradient;
  ctx.fillRect(camera.x, camera.y, VIEWPORT.width, VIEWPORT.height);

  const seaStartX = Math.floor((camera.x - OCEAN.viewMargin) / OCEAN.waveGrid) * OCEAN.waveGrid;
  const seaStartY = Math.floor((camera.y - OCEAN.viewMargin) / OCEAN.waveGrid) * OCEAN.waveGrid;
  ctx.strokeStyle = "rgba(126, 201, 255, 0.08)";
  ctx.lineWidth = 2;
  for (let x = seaStartX; x < camera.x + VIEWPORT.width + OCEAN.viewMargin; x += OCEAN.waveGrid) {
    for (let y = seaStartY; y < camera.y + VIEWPORT.height + OCEAN.viewMargin; y += OCEAN.waveGrid) {
      if (x >= 0 && x <= WORLD.width && y >= 0 && y <= WORLD.height) {
        continue;
      }
      ctx.beginPath();
      ctx.arc(x + 18, y + 18, 12, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
    }
  }

  const coastGlow = ctx.createLinearGradient(0, 0, WORLD.width, WORLD.height);
  coastGlow.addColorStop(0, "rgba(150, 220, 255, 0.14)");
  coastGlow.addColorStop(1, "rgba(255, 236, 184, 0.08)");
  ctx.strokeStyle = coastGlow;
  ctx.lineWidth = OCEAN.coastGlowWidth;
  ctx.strokeRect(0, 0, WORLD.width, WORLD.height);

  ctx.strokeStyle = "rgba(219, 244, 255, 0.24)";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, WORLD.width, WORLD.height);

  mapData.districts.forEach((district) => {
    if (!rectIntersectsViewport(district.x, district.y, district.width, district.height)) {
      return;
    }

    ctx.fillStyle = district.ground;
    ctx.fillRect(district.x, district.y, district.width, district.height);

    const glow = ctx.createRadialGradient(
      district.x + district.width / 2,
      district.y + district.height / 2,
      0,
      district.x + district.width / 2,
      district.y + district.height / 2,
      Math.max(district.width, district.height) * 0.6
    );
    glow.addColorStop(0, district.tint);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(district.x, district.y, district.width, district.height);

    if (district.zoneType === "residential") {
      ctx.fillStyle = "rgba(166, 203, 154, 0.06)";
      for (let x = district.x + 36; x < district.x + district.width; x += 96) {
        ctx.fillRect(x, district.y + 26, 28, district.height - 52);
      }
    }

    if (district.zoneType === "industrial") {
      ctx.fillStyle = "rgba(116, 141, 92, 0.05)";
      for (let x = district.x + 52; x < district.x + district.width; x += 154) {
        ctx.fillRect(x, district.y + 36, 42, district.height - 72);
      }
      ctx.fillStyle = "rgba(255, 255, 255, 0.012)";
      for (let x = district.x + 44; x < district.x + district.width; x += 122) {
        ctx.fillRect(x, district.y + 40, 1, district.height - 80);
      }
    }
  });

  mapData.props.grassPatches.forEach((patch) => {
    if (!rectIntersectsViewport(patch.x, patch.y, patch.width, patch.height)) {
      return;
    }
    ctx.fillStyle = patch.color;
    roundRect(ctx, patch.x, patch.y, patch.width, patch.height, 16);
    ctx.fill();
  });

  mapData.props.dirtPatches.forEach((patch) => {
    if (!rectIntersectsViewport(patch.x, patch.y, patch.width, patch.height)) {
      return;
    }
    ctx.fillStyle = patch.color;
    ctx.beginPath();
    ctx.ellipse(
      patch.x + patch.width / 2,
      patch.y + patch.height / 2,
      patch.width / 2,
      patch.height / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  ctx.fillStyle = "rgba(25, 40, 64, 0.36)";
  const startX = Math.floor(camera.x / 64) * 64;
  const startY = Math.floor(camera.y / 64) * 64;
  for (let x = startX; x < camera.x + VIEWPORT.width + 64; x += 64) {
    ctx.fillRect(x, camera.y, 1, VIEWPORT.height);
  }
  for (let y = startY; y < camera.y + VIEWPORT.height + 64; y += 64) {
    ctx.fillRect(camera.x, y, VIEWPORT.width, 1);
  }
}

function drawRoadDetails(road) {
  const sidewalk = road.sidewalk || 0;
  if (!rectIntersectsViewport(road.x - sidewalk, road.y - sidewalk, road.width + sidewalk * 2, road.height + sidewalk * 2)) {
    return;
  }

  ctx.fillStyle = road.isAlley ? "#1a2029" : "#232934";
  ctx.fillRect(road.x - sidewalk, road.y - sidewalk, road.width + sidewalk * 2, road.height + sidewalk * 2);

  ctx.fillStyle = road.isAlley ? "#262c36" : "#2f3640";
  ctx.fillRect(road.x, road.y, road.width, road.height);

  ctx.strokeStyle = "rgba(190, 198, 210, 0.3)";
  ctx.lineWidth = 2;
  if (road.kind === "horizontal") {
    ctx.beginPath();
    ctx.moveTo(road.x, road.y);
    ctx.lineTo(road.x + road.width, road.y);
    ctx.moveTo(road.x, road.y + road.height);
    ctx.lineTo(road.x + road.width, road.y + road.height);
    ctx.stroke();

    const centerY = road.y + road.height / 2;
    ctx.strokeStyle = road.isAlley ? "rgba(130, 140, 155, 0.16)" : "rgba(255, 219, 123, 0.46)";
    ctx.setLineDash(road.isAlley ? [8, 18] : [28, 20]);
    ctx.lineWidth = road.isAlley ? 2 : 4;
    ctx.beginPath();
    ctx.moveTo(road.x + 12, centerY);
    ctx.lineTo(road.x + road.width - 12, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    road.crosswalks.forEach((crossX) => drawCrosswalk(crossX - 24, road.y + 8, 48, road.height - 16, "vertical"));
  } else {
    ctx.beginPath();
    ctx.moveTo(road.x, road.y);
    ctx.lineTo(road.x, road.y + road.height);
    ctx.moveTo(road.x + road.width, road.y);
    ctx.lineTo(road.x + road.width, road.y + road.height);
    ctx.stroke();

    const centerX = road.x + road.width / 2;
    ctx.strokeStyle = road.isAlley ? "rgba(130, 140, 155, 0.16)" : "rgba(255, 219, 123, 0.46)";
    ctx.setLineDash(road.isAlley ? [8, 18] : [28, 20]);
    ctx.lineWidth = road.isAlley ? 2 : 4;
    ctx.beginPath();
    ctx.moveTo(centerX, road.y + 12);
    ctx.lineTo(centerX, road.y + road.height - 12);
    ctx.stroke();
    ctx.setLineDash([]);

    road.crosswalks.forEach((crossY) => drawCrosswalk(road.x + 8, crossY - 24, road.width - 16, 48, "horizontal"));
  }
}

function drawCrosswalk(x, y, width, height, orientation) {
  if (!rectIntersectsViewport(x, y, width, height)) {
    return;
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  const stripes = 5;
  for (let i = 0; i < stripes; i += 1) {
    if (orientation === "vertical") {
      ctx.fillRect(x + i * 10, y, 5, height);
    } else {
      ctx.fillRect(x, y + i * 10, width, 5);
    }
  }
}

function drawRoadStains() {
  mapData.props.stains.forEach((stain) => {
    if (!rectIntersectsViewport(stain.x - stain.r, stain.y - stain.r, stain.r * 2, stain.r * 2)) {
      return;
    }

    ctx.fillStyle = `rgba(10, 12, 15, ${stain.a})`;
    ctx.beginPath();
    ctx.ellipse(stain.x, stain.y, stain.r, stain.r * 0.72, 0.4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBuildings() {
  mapData.buildings.forEach((building) => {
    if (!rectIntersectsViewport(building.x, building.y, building.width, building.height + 36)) {
      return;
    }
    drawBuilding(building);
  });
}

function drawBuilding(building) {
  const { style } = building;
  const entrance = building.entrance;
  const sign = building.signLayout;
  const isHouse = building.type === "house" || building.type === "house_large" || building.type === "shed";
  const isIndustrial = building.type === "warehouse" || building.type === "factory";

  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  ctx.fillRect(building.x + 10, building.y + 10, building.width + 8, building.height + 10);
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(building.x + building.width / 2 + 10, building.y + building.height + 12, building.width * 0.45, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = style.bodyShade;
  ctx.fillRect(building.x + 6, building.y + 6, building.width, building.height);

  const bodyGradient = ctx.createLinearGradient(building.x, building.y, building.x, building.y + building.height);
  bodyGradient.addColorStop(0, building.baseColor || style.body);
  bodyGradient.addColorStop(0.65, style.body);
  bodyGradient.addColorStop(1, style.bodyShade);
  ctx.fillStyle = bodyGradient;
  ctx.fillRect(building.x, building.y, building.width, building.height);

  if (isHouse) {
    ctx.fillStyle = style.roof;
    ctx.beginPath();
    ctx.moveTo(building.x - 6, building.y + 18);
    ctx.lineTo(building.x + building.width / 2, building.y - 18);
    ctx.lineTo(building.x + building.width + 6, building.y + 18);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(building.x + 8, building.y + 22, building.width - 16, 10);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fillRect(building.x + 4, building.y + 4, building.width - 8, 18);
  ctx.fillStyle = style.roof;
  ctx.fillRect(building.x, building.y, building.width, 10);
  ctx.fillStyle = style.trim;
  ctx.fillRect(building.x + building.width - 8, building.y + 8, 8, building.height - 8);
  ctx.strokeStyle = building.trimColor || style.trim;
  ctx.lineWidth = 2;
  ctx.strokeRect(building.x + 1, building.y + 1, building.width - 2, building.height - 2);

  building.roofUnits.forEach((unit) => {
    ctx.fillStyle = "#505a6b";
    ctx.fillRect(building.x + unit.x, building.y + unit.y, unit.width, unit.height);
    ctx.fillStyle = "#2a313d";
    ctx.fillRect(building.x + unit.x + 3, building.y + unit.y + 4, unit.width - 6, 4);
  });

  if (isIndustrial) {
    ctx.fillStyle = "rgba(10, 14, 20, 0.34)";
    for (let index = 0; index < 3; index += 1) {
      const shutterWidth = building.width * 0.22;
      const shutterX = building.x + 24 + index * (shutterWidth + 18);
      const shutterY = building.y + building.height - 52;
      ctx.fillRect(shutterX, shutterY, shutterWidth, 38);
      ctx.strokeStyle = "rgba(166, 179, 192, 0.12)";
      for (let line = 0; line < 4; line += 1) {
        ctx.beginPath();
        ctx.moveTo(shutterX, shutterY + 8 + line * 7);
        ctx.lineTo(shutterX + shutterWidth, shutterY + 8 + line * 7);
        ctx.stroke();
      }
    }
    if (building.type === "factory") {
      ctx.fillStyle = "#69524a";
      ctx.fillRect(building.x + building.width - 34, building.y - 28, 18, 54);
      ctx.fillStyle = "rgba(255, 182, 138, 0.24)";
      ctx.fillRect(building.x + building.width - 30, building.y - 24, 10, 10);
    }
  }

  building.windows.forEach((windowRect) => {
    ctx.fillStyle = style.windowDark;
    ctx.fillRect(windowRect.x, windowRect.y, windowRect.width, windowRect.height);

    if (windowRect.isLit) {
      ctx.save();
      ctx.shadowColor = windowRect.color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = windowRect.glow;
      ctx.fillRect(windowRect.x - 1, windowRect.y - 1, windowRect.width + 2, windowRect.height + 2);
      ctx.restore();
    }

    ctx.fillStyle = windowRect.color;
    ctx.fillRect(windowRect.x + 1, windowRect.y + 1, windowRect.width - 2, windowRect.height - 3);
    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.fillRect(windowRect.x + 2, windowRect.y + 2, windowRect.width - 5, 2);
  });

  drawBuildingEntrance(entrance, style);
  drawBuildingSign(building, sign, style);

  if (building.rearDoor) {
    const rear = building.rearDoor;
    ctx.fillStyle = "#0d1320";
    ctx.fillRect(building.x + rear.x, building.y + rear.y, rear.width, rear.height);
    ctx.fillStyle = "#666f80";
    ctx.fillRect(building.x + rear.x + 3, building.y + rear.y + 4, rear.width - 6, 3);
  }

  drawBuildingFrontProps(building, style);
}

function drawBuildingEntrance(entrance, style) {
  const awningY = entrance.y - 8;
  ctx.fillStyle = style.awning;
  ctx.fillRect(entrance.x - 8, awningY, entrance.width + 16, 8);
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(entrance.x - 6, awningY + 1, entrance.width + 12, 2);

  ctx.save();
  ctx.shadowColor = style.doorGlow;
  ctx.shadowBlur = 18;
  ctx.fillStyle = style.doorGlow;
  ctx.fillRect(entrance.x - 3, entrance.y - 2, entrance.width + 6, entrance.height + 4);
  ctx.restore();

  ctx.fillStyle = "#0b1220";
  ctx.fillRect(entrance.x, entrance.y, entrance.width, entrance.height);
  ctx.fillStyle = "rgba(220, 240, 255, 0.18)";
  ctx.fillRect(entrance.x + 3, entrance.y + 4, entrance.width - 6, entrance.height - 8);
  ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
  ctx.fillRect(entrance.x + entrance.width - 5, entrance.y + 6, 2, entrance.height - 12);

  if (entrance.sideLight) {
    ctx.save();
    ctx.shadowColor = style.accent;
    ctx.shadowBlur = 12;
    ctx.fillStyle = style.accent;
    ctx.fillRect(entrance.x - 7, entrance.y + 3, 3, 10);
    ctx.restore();
  }
}

function drawBuildingSign(building, sign, style) {
  ctx.save();
  ctx.shadowColor = building.signColor || style.signGlow;
  ctx.shadowBlur = 16;
  ctx.fillStyle = "rgba(6, 10, 18, 0.9)";
  roundRect(ctx, sign.x, sign.y, sign.width, sign.height, 6);
  ctx.fill();
  ctx.fillStyle = building.signColor || style.signGlow;
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(building.sign, sign.x + sign.width / 2, sign.y + sign.height / 2 + 4);
  ctx.restore();
}

function drawBuildingFrontProps(building, style) {
  building.frontProps.forEach((prop) => {
    if (!rectIntersectsViewport(prop.x - 8, prop.y - 24, 32, 32)) {
      return;
    }

    if (prop.kind === "bin") {
      ctx.fillStyle = "#2f444a";
      ctx.fillRect(prop.x, prop.y, 12, 16);
      ctx.fillStyle = "#5f8388";
      ctx.fillRect(prop.x - 1, prop.y - 2, 14, 4);
      return;
    }

    if (prop.kind === "vending") {
      ctx.fillStyle = "#d9e4f1";
      ctx.fillRect(prop.x, prop.y - 20, 18, 24);
      ctx.fillStyle = "#7de9ff";
      ctx.fillRect(prop.x + 3, prop.y - 16, 12, 7);
      ctx.fillStyle = "#2c3b4a";
      ctx.fillRect(prop.x + 4, prop.y - 6, 10, 7);
      ctx.save();
      ctx.shadowColor = style.signGlow;
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(125, 233, 255, 0.24)";
      ctx.fillRect(prop.x + 2, prop.y - 17, 14, 9);
      ctx.restore();
      return;
    }

    ctx.fillStyle = "#697789";
    ctx.fillRect(prop.x, prop.y - 12, 16, 12);
    ctx.fillStyle = "#2b313d";
    ctx.fillRect(prop.x + 3, prop.y - 8, 10, 3);
  });
}

function drawProps() {
  mapData.props.driveways.forEach((driveway) => {
    if (!rectIntersectsViewport(driveway.x, driveway.y, driveway.width, driveway.height)) {
      return;
    }
    ctx.fillStyle = "#4c5563";
    ctx.fillRect(driveway.x, driveway.y, driveway.width, driveway.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeRect(driveway.x, driveway.y, driveway.width, driveway.height);
  });

  mapData.props.hedges.forEach((hedge) => {
    if (!rectIntersectsViewport(hedge.x, hedge.y, hedge.width, hedge.height)) {
      return;
    }
    ctx.fillStyle = "#31533a";
    roundRect(ctx, hedge.x, hedge.y, hedge.width, hedge.height, 6);
    ctx.fill();
  });

  mapData.props.fences.forEach((fence) => {
    if (!rectIntersectsViewport(fence.x, fence.y, fence.width, fence.height)) {
      return;
    }
    ctx.fillStyle = "#c6c8ca";
    ctx.fillRect(fence.x, fence.y, fence.width, fence.height);
    for (let x = fence.x + 8; x < fence.x + fence.width; x += 12) {
      ctx.fillRect(x, fence.y - 12, 3, 16);
    }
  });

  mapData.props.residentialTrees.forEach((tree) => {
    if (!rectIntersectsViewport(tree.x - 26, tree.y - 30, 52, 64)) {
      return;
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(tree.x, tree.y + 16, tree.size * 0.72, tree.size * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6d523d";
    ctx.fillRect(tree.x - 3, tree.y - 2, 6, 22);
    ctx.fillStyle = "#416d45";
    ctx.beginPath();
    ctx.arc(tree.x, tree.y - 6, tree.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tree.x - tree.size * 0.44, tree.y + 2, tree.size * 0.66, 0, Math.PI * 2);
    ctx.arc(tree.x + tree.size * 0.42, tree.y + 1, tree.size * 0.58, 0, Math.PI * 2);
    ctx.fill();
  });

  mapData.props.yardLights.forEach((light) => {
    if (!rectIntersectsViewport(light.x - 18, light.y - 38, 36, 60)) {
      return;
    }
    ctx.save();
    ctx.shadowColor = light.glow;
    ctx.shadowBlur = light.tall ? 18 : 12;
    ctx.fillStyle = light.glow;
    ctx.beginPath();
    ctx.arc(light.x, light.y - (light.tall ? 18 : 10), light.tall ? 3.6 : 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#77818f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(light.x, light.y + 10);
    ctx.lineTo(light.x, light.y - (light.tall ? 16 : 8));
    ctx.stroke();
  });

  mapData.props.mailboxes.forEach((mailbox) => {
    if (!rectIntersectsViewport(mailbox.x - 6, mailbox.y - 18, 20, 24)) {
      return;
    }
    ctx.fillStyle = "#d6dde8";
    ctx.fillRect(mailbox.x, mailbox.y - 14, 10, 8);
    ctx.fillStyle = mailbox.color;
    ctx.fillRect(mailbox.x + 1, mailbox.y - 13, 8, 6);
    ctx.fillStyle = "#606a77";
    ctx.fillRect(mailbox.x + 4, mailbox.y - 6, 2, 12);
  });

  mapData.props.streetLights.forEach((light) => {
    if (!rectIntersectsViewport(light.x - 24, light.y - 40, 48, 70)) {
      return;
    }

    ctx.save();
    ctx.shadowColor = light.glow;
    ctx.shadowBlur = 24;
    ctx.fillStyle = light.glow;
    ctx.beginPath();
    ctx.arc(light.x, light.y - 18, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = "#5b6779";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(light.x, light.y + 18);
    ctx.lineTo(light.x, light.y - 16);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.beginPath();
    ctx.ellipse(light.x, light.y - 4, 18, 9, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  mapData.props.bins.forEach((bin) => {
    if (!rectIntersectsViewport(bin.x - 6, bin.y - 6, 28, 28)) {
      return;
    }
    ctx.fillStyle = "#2f444a";
    ctx.fillRect(bin.x, bin.y, 12, 16);
    ctx.fillStyle = "#5f8388";
    ctx.fillRect(bin.x - 1, bin.y - 2, 14, 4);
  });

  mapData.props.poles.forEach((pole) => {
    if (!rectIntersectsViewport(pole.x - 8, pole.y - 24, 20, 40)) {
      return;
    }
    ctx.strokeStyle = "#616b7f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pole.x, pole.y - 20);
    ctx.lineTo(pole.x, pole.y + 10);
    ctx.stroke();
    ctx.fillStyle = "#7a8496";
    ctx.fillRect(pole.x - 6, pole.y - 22, 12, 4);
  });

  mapData.props.signs.forEach((sign) => {
    if (!rectIntersectsViewport(sign.x - 4, sign.y - 4, 42, 26)) {
      return;
    }
    ctx.fillStyle = "#1c2637";
    ctx.fillRect(sign.x, sign.y, 34, 18);
    ctx.strokeStyle = "#7282a4";
    ctx.strokeRect(sign.x, sign.y, 34, 18);
    ctx.fillStyle = "#dce6ff";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(sign.text, sign.x + 17, sign.y + 12);
  });

  mapData.props.containers.forEach((container) => {
    if (!rectIntersectsViewport(container.x, container.y, container.width, container.height)) {
      return;
    }
    ctx.fillStyle = container.color;
    ctx.fillRect(container.x, container.y, container.width, container.height);
    ctx.strokeStyle = "rgba(15, 22, 28, 0.44)";
    ctx.strokeRect(container.x, container.y, container.width, container.height);
    for (let x = container.x + 8; x < container.x + container.width; x += 14) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(x, container.y + 4, 2, container.height - 8);
    }
  });

  mapData.props.drums.forEach((cluster) => {
    for (let index = 0; index < cluster.count; index += 1) {
      const x = cluster.x + index * 10;
      const y = cluster.y + (index % 2) * 6;
      if (!rectIntersectsViewport(x - 4, y - 4, 16, 18)) {
        continue;
      }
      ctx.fillStyle = index % 2 === 0 ? "#6f7b88" : "#a45c46";
      ctx.fillRect(x, y, 8, 12);
      ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
      ctx.fillRect(x, y + 2, 8, 2);
    }
  });

  mapData.props.crates.forEach((crate) => {
    if (!rectIntersectsViewport(crate.x, crate.y, crate.width, crate.height)) {
      return;
    }
    ctx.fillStyle = "#745640";
    ctx.fillRect(crate.x, crate.y, crate.width, crate.height);
    ctx.strokeStyle = "rgba(33, 23, 17, 0.44)";
    ctx.strokeRect(crate.x, crate.y, crate.width, crate.height);
    ctx.beginPath();
    ctx.moveTo(crate.x, crate.y);
    ctx.lineTo(crate.x + crate.width, crate.y + crate.height);
    ctx.moveTo(crate.x + crate.width, crate.y);
    ctx.lineTo(crate.x, crate.y + crate.height);
    ctx.stroke();
  });

  mapData.props.tanks.forEach((tank) => {
    if (!rectIntersectsViewport(tank.x - tank.r, tank.y - tank.r, tank.r * 2, tank.r * 2)) {
      return;
    }
    ctx.fillStyle = "#6f7478";
    ctx.beginPath();
    ctx.arc(tank.x, tank.y, tank.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.beginPath();
    ctx.arc(tank.x, tank.y - 4, tank.r * 0.54, 0, Math.PI * 2);
    ctx.fill();
  });

  mapData.props.pipes.forEach((pipe) => {
    if (!rectIntersectsViewport(pipe.x, pipe.y, pipe.width, pipe.height)) {
      return;
    }
    ctx.fillStyle = "#7e6a58";
    roundRect(ctx, pipe.x, pipe.y, pipe.width, pipe.height, 6);
    ctx.fill();
    for (let x = pipe.x + 12; x < pipe.x + pipe.width; x += 40) {
      ctx.fillStyle = "#57483e";
      ctx.fillRect(x, pipe.y - 4, 6, pipe.height + 8);
    }
  });

  mapData.props.forestTrees.forEach((tree) => {
    if (!rectIntersectsViewport(tree.x - 30, tree.y - 40, 60, 74)) {
      return;
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.beginPath();
    ctx.ellipse(tree.x, tree.y + 18, tree.size * 0.7, tree.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5d4a34";
    ctx.fillRect(tree.x - 4, tree.y - 2, 8, 24);
    ctx.fillStyle = tree.tone;
    ctx.beginPath();
    ctx.arc(tree.x, tree.y - 8, tree.size, 0, Math.PI * 2);
    ctx.arc(tree.x - tree.size * 0.5, tree.y + 4, tree.size * 0.62, 0, Math.PI * 2);
    ctx.arc(tree.x + tree.size * 0.48, tree.y + 4, tree.size * 0.58, 0, Math.PI * 2);
    ctx.fill();
  });

  mapData.props.stumps.forEach((stump) => {
    if (!rectIntersectsViewport(stump.x - stump.radius, stump.y - stump.radius, stump.radius * 2, stump.radius * 2)) {
      return;
    }
    ctx.fillStyle = "#6b513f";
    ctx.beginPath();
    ctx.arc(stump.x, stump.y, stump.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 229, 190, 0.18)";
    ctx.beginPath();
    ctx.arc(stump.x, stump.y, stump.radius * 0.58, 0, Math.PI * 2);
    ctx.fill();
  });

  mapData.props.debris.forEach((debris) => {
    if (!rectIntersectsViewport(debris.x - 8, debris.y - 8, 40, 40)) {
      return;
    }
    if (debris.kind === "barrel") {
      ctx.fillStyle = "#7c5a48";
      ctx.fillRect(debris.x, debris.y, 10, 14);
      ctx.fillRect(debris.x + 12, debris.y + 4, 10, 14);
      return;
    }
    if (debris.kind === "crate") {
      ctx.fillStyle = "#5f4738";
      ctx.fillRect(debris.x, debris.y, 18, 18);
      return;
    }
    ctx.strokeStyle = "#69706f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(debris.x, debris.y);
    ctx.lineTo(debris.x + 18, debris.y + 8);
    ctx.lineTo(debris.x + 10, debris.y + 20);
    ctx.stroke();
  });
}

function drawDeliveryPoints() {
  const postingRoute = mission.type === "posting" ? mission.stops : [];
  const specialRoute = [];
  const smallMissionRoute = [];
  const cashoutRoute = [];
  if (mission.type === "smallMission") {
    if (mission.pickupPoint) {
      smallMissionRoute.push(mission.pickupPoint);
    }
    if (mission.deliveryPoint) {
      smallMissionRoute.push(mission.deliveryPoint);
    }
  }
  if (mission.type === "special") {
    if (mission.entryPoint) {
      specialRoute.push(mission.entryPoint);
    }
    if (mission.returnPoint) {
      specialRoute.push(mission.returnPoint);
    }
  }
  if (mission.type === "cashout") {
    if (mission.pickupPoint) {
      cashoutRoute.push(mission.pickupPoint);
    }
    if (mission.bankPoint) {
      cashoutRoute.push(mission.bankPoint);
    }
  }
  const allMissionPoints = [...mapData.pickupPoints, ...mapData.deliveryPoints, ...postingRoute, ...smallMissionRoute, ...specialRoute, ...cashoutRoute];

  allMissionPoints.forEach((point) => {
    if (!rectIntersectsViewport(point.x - 32, point.y - 40, 64, 64)) {
      return;
    }

    const isPickupTarget =
      (mission.stage === "pickup" && mission.pickupPoint === point) ||
      (mission.stage === "smallMissionPickup" && mission.pickupPoint === point);
    const isDeliveryTarget =
      (mission.stage === "delivery" && mission.deliveryPoint === point) ||
      (mission.stage === "smallMissionDelivery" && mission.deliveryPoint === point);
    const isPostingTarget = mission.stage === "posting" && mission.stops[mission.currentStopIndex] === point;
    const isSpecialTarget =
      ((mission.stage === "briefcaseDrive" || mission.stage === "briefcaseInfiltration") &&
        mission.entryPoint === point) ||
      (mission.stage === "briefcaseReturn" && mission.returnPoint === point);
    const isCashoutTarget =
      (mission.stage === "cashoutPickup" && mission.pickupPoint === point) ||
      (mission.stage === "cashoutBank" && mission.bankPoint === point);
    const isCurrentTarget = isPickupTarget || isDeliveryTarget || isPostingTarget || isSpecialTarget || isCashoutTarget;

    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.shadowColor = point.color;
    ctx.shadowBlur = isCurrentTarget ? 18 : 10;

    ctx.fillStyle = point.color;
    if (point.kind === "pickup") {
      ctx.beginPath();
      ctx.arc(0, 0, isCurrentTarget ? 12 : 8, 0, Math.PI * 2);
      ctx.fill();
    } else if (point.kind === "cashout-pickup") {
      const size = isCurrentTarget ? 12 : 9;
      roundRect(ctx, -size, -size, size * 2, size * 2, 4);
      ctx.fill();
      ctx.fillStyle = "#08111c";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CASH", 0, 3);
    } else if (point.kind === "posting") {
      const size = isCurrentTarget ? 11 : 8;
      ctx.fillRect(-size, -size, size * 2, size * 2);
    } else if (point.kind === "special-entry") {
      const size = isCurrentTarget ? 13 : 9;
      ctx.beginPath();
      ctx.moveTo(0, -size - 4);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size + 4);
      ctx.lineTo(-size, 0);
      ctx.closePath();
      ctx.fill();
    } else if (point.kind === "special-return") {
      const size = isCurrentTarget ? 12 : 9;
      roundRect(ctx, -size, -size, size * 2, size * 2, 4);
      ctx.fill();
    } else if (point.kind === "cashout-bank") {
      const size = isCurrentTarget ? 12 : 9;
      roundRect(ctx, -size, -size + 2, size * 2, size * 2 - 4, 3);
      ctx.fill();
      ctx.fillStyle = "#08111c";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("BANK", 0, 3);
    } else {
      const size = isCurrentTarget ? 12 : 8;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size, 0);
      ctx.closePath();
      ctx.fill();
    }

    ctx.strokeStyle = isCurrentTarget ? "#ffffff" : "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = isCurrentTarget ? 3 : 2;
    ctx.beginPath();
    ctx.arc(0, 0, isCurrentTarget ? 20 : 14, 0, Math.PI * 2);
    ctx.stroke();

    if (isCurrentTarget) {
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();

    ctx.fillStyle = "#eff4ff";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    const pointLabel =
      point.kind === "pickup"
        ? `${point.name} PICKUP`
        : point.kind === "cashout-pickup"
          ? `${point.name} CASH`
        : point.kind === "posting"
          ? `${point.name} POST`
          : point.kind === "special-entry"
            ? `${point.name} RAID`
            : point.kind === "special-return"
              ? `${point.name} DROP`
              : point.kind === "cashout-bank"
                ? `${point.name} BANK`
                : `${point.name} HOME`;
    ctx.fillText(
      pointLabel,
      point.x,
      point.y - 24
    );
  });
}

function drawMissionVehicle() {
  if (!(isSpecialMissionActive() && mission.stage === "briefcaseVehicle" && mission.vehiclePoint)) {
    return;
  }

  const { x, y } = mission.vehiclePoint;
  if (!rectIntersectsViewport(x - 60, y - 46, 120, 92)) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  drawTopDownCarSprite({
    width: 60,
    height: 28,
    color: "#ff7b72",
    roofColor: "#ffd9d2",
    glassColor: "#eaf2ff",
    accentColor: "#7c261d",
    glowColor: "#ff7b72",
  });
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 4, 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "#fff4ef";
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MISSION VAN", x, y - 30);
}

function drawTaxiMissionActors() {
  if (isTaxiJobActive() && taxiState.passenger && (taxiState.status === "searchingPassenger" || taxiState.status === "rented")) {
    const { x, y } = taxiState.passenger;
    if (rectIntersectsViewport(x - 26, y - 34, 52, 68)) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "rgba(0, 0, 0, 0.26)";
      ctx.beginPath();
      ctx.ellipse(0, 10, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2c4058";
      roundRect(ctx, -7, -6, 14, 18, 5);
      ctx.fill();
      ctx.fillStyle = "#efe3d2";
      ctx.beginPath();
      ctx.arc(0, -10, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd447";
      ctx.beginPath();
      ctx.arc(0, -26, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2d2304";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CAB", 0, -23);
      ctx.restore();
    }
  }

  if (isTaxiJobActive() && taxiState.destination && (taxiState.status === "passengerOnBoard" || taxiState.status === "delivering")) {
    const { x, y } = taxiState.destination;
    if (rectIntersectsViewport(x - 34, y - 42, 68, 84)) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#79ffb5";
      roundRect(ctx, -10, -10, 20, 20, 5);
      ctx.fill();
      ctx.strokeStyle = "#efffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawRescueMissionActors() {
  if (isRescueMissionActive() && mission.rescueVan) {
    const { x, y, direction } = mission.rescueVan;
    if (rectIntersectsViewport(x - 72, y - 52, 144, 104)) {
      ctx.save();
      ctx.translate(x, y);
      if (direction === "left") {
        ctx.rotate(-Math.PI / 2);
      } else if (direction === "right") {
        ctx.rotate(Math.PI / 2);
      } else if (direction === "up") {
        ctx.rotate(Math.PI);
      }
      drawTopDownCarSprite({
        width: 64,
        height: 30,
        color: "#2f4957",
        roofColor: "#d9eef8",
        glassColor: "#98bad3",
        accentColor: "#112334",
        glowColor: mission.stage === "playerNearVan" || mission.stage === "hacking" ? "rgba(88, 244, 255, 0.32)" : null,
        trimColor: "rgba(159, 216, 255, 0.32)",
      });
      ctx.restore();

      ctx.fillStyle = "#dff9ff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HOSTAGE VAN", x, y - 34);
    }
  }

  if (isRescueMissionActive() && mission.hostage) {
    const { x, y } = mission.hostage;
    if (!rectIntersectsViewport(x - 26, y - 32, 52, 68)) {
      return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(0, 0, 0, 0.26)";
    ctx.beginPath();
    ctx.ellipse(0, 10, 10, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2c4058";
    roundRect(ctx, -7, -6, 14, 18, 5);
    ctx.fill();
    ctx.fillStyle = "#efe3d2";
    ctx.beginPath();
    ctx.arc(0, -10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#141b25";
    ctx.fillRect(-6, 10, 4, 8);
    ctx.fillRect(2, 10, 4, 8);
    ctx.restore();

    ctx.fillStyle = "#f4fbff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(mission.stage === "rewardReady" ? "E TALK" : "HOSTAGE", x, y - 24);
  }
}

function drawCashoutMissionActors() {
  if (!isCashoutMissionActive() || !mission.cashoutCombat) {
    return;
  }

  const combat = mission.cashoutCombat;

  combat.playerBullets.forEach((bullet) => {
    if (!rectIntersectsViewport(bullet.x - 10, bullet.y - 10, 20, 20)) {
      return;
    }
    ctx.fillStyle = "#ffd866";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  combat.enemyBullets.forEach((bullet) => {
    if (!rectIntersectsViewport(bullet.x - 10, bullet.y - 10, 20, 20)) {
      return;
    }
    ctx.fillStyle = "#ff7b72";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  combat.enemies.forEach((enemy) => {
    if (!enemy.alive || !rectIntersectsViewport(enemy.x - 28, enemy.y - 34, 56, 68)) {
      return;
    }

    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 9, 10, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3d4758";
    roundRect(ctx, -7, -6, 14, 18, 5);
    ctx.fill();
    ctx.fillStyle = "#f0c6a4";
    ctx.beginPath();
    ctx.arc(0, -10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f141c";
    ctx.fillRect(-8, -2, 16, 4);
    ctx.restore();

    ctx.fillStyle = "#ffd7cf";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HOSTILE", enemy.x, enemy.y - 22);
  });

  if (combat.hitFlash > 0) {
    ctx.save();
    ctx.fillStyle = `rgba(185, 62, 43, ${combat.hitFlash * 0.55})`;
    ctx.fillRect(camera.x, camera.y, VIEWPORT.width, VIEWPORT.height);
    ctx.restore();
  }
}

function drawShopMarkers() {
  mapData.shopLocations.forEach((shop) => {
    if (!rectIntersectsViewport(shop.x - 36, shop.y - 46, 72, 72)) {
      return;
    }

    const isNearby = gameState.nearbyShop === shop;

    ctx.save();
    ctx.translate(shop.x, shop.y);
    ctx.shadowColor = shop.color;
    ctx.shadowBlur = isNearby ? 20 : 12;
    ctx.fillStyle = shop.color;
    roundRect(ctx, -10, -10, 20, 20, 5);
    ctx.fill();
    ctx.fillStyle = "#06111b";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("¥", 0, 4);
    if (isNearby) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = "#eef4ff";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(shop.name, shop.x, shop.y - 24);
  });
}

function drawOwnedHouseMarker() {
  const point = getOwnedHouseMarkerPoint();
  if (!point || !rectIntersectsViewport(point.x - 42, point.y - 54, 84, 84) || isHouseMode()) {
    return;
  }

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.shadowColor = "#7dd6ff";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#7dd6ff";
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(14, -2);
  ctx.lineTo(14, 16);
  ctx.lineTo(-14, 16);
  ctx.lineTo(-14, -2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#0b1a2d";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(18, -4);
  ctx.lineTo(-18, -4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f5fbff";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("HOME", 0, 34);
  ctx.restore();
}

function drawTopDownCarSprite({
  width,
  height,
  color,
  roofColor = "#dce7ff",
  glassColor = "#dce7ff",
  accentColor = "#17253a",
  glowColor = null,
  trimColor = "rgba(255, 255, 255, 0.22)",
  hasDriver = false,
}) {
  const bodyLength = Math.max(width, height);
  const bodyWidth = Math.min(width, height);

  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, bodyLength * 0.18, bodyWidth * 0.56, bodyLength * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();

  if (glowColor) {
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 18;
    ctx.fillStyle = glowColor;
    roundRect(
      ctx,
      -bodyWidth / 2 + 2,
      -bodyLength / 2 + 2,
      bodyWidth - 4,
      bodyLength - 4,
      Math.min(8, bodyWidth / 3)
    );
    ctx.fill();
    ctx.restore();
  }

  const bodyGradient = ctx.createLinearGradient(0, -bodyLength / 2, 0, bodyLength / 2);
  bodyGradient.addColorStop(0, roofColor);
  bodyGradient.addColorStop(0.1, trimColor);
  bodyGradient.addColorStop(0.22, color);
  bodyGradient.addColorStop(0.76, color);
  bodyGradient.addColorStop(1, accentColor);
  ctx.fillStyle = bodyGradient;
  roundRect(
    ctx,
    -bodyWidth / 2,
    -bodyLength / 2,
    bodyWidth,
    bodyLength,
    Math.min(8, bodyWidth / 3)
  );
  ctx.fill();

  ctx.strokeStyle = "rgba(6, 11, 18, 0.48)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
  roundRect(
    ctx,
    -bodyWidth / 2 + 3,
    -bodyLength / 2 + 4,
    bodyWidth - 6,
    Math.max(3, bodyLength * 0.14),
    Math.min(6, bodyWidth / 4)
  );
  ctx.fill();

  const glassGradient = ctx.createLinearGradient(0, -bodyLength * 0.24, 0, bodyLength * 0.24);
  glassGradient.addColorStop(0, "#f4fbff");
  glassGradient.addColorStop(0.25, glassColor);
  glassGradient.addColorStop(1, "#7ea2c7");
  ctx.fillStyle = glassGradient;
  roundRect(
    ctx,
    -bodyWidth * 0.34,
    -bodyLength * 0.18,
    bodyWidth * 0.68,
    bodyLength * 0.36,
    Math.min(6, bodyWidth / 4)
  );
  ctx.fill();

  ctx.fillStyle = "rgba(11, 20, 34, 0.82)";
  roundRect(
    ctx,
    -bodyWidth * 0.24,
    -bodyLength * 0.14,
    bodyWidth * 0.48,
    bodyLength * 0.28,
    Math.min(4, bodyWidth / 5)
  );
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-bodyWidth * 0.28, 0);
  ctx.lineTo(bodyWidth * 0.28, 0);
  ctx.stroke();

  if (hasDriver) {
    ctx.fillStyle = "rgba(15, 18, 23, 0.45)";
    ctx.beginPath();
    ctx.arc(0, -bodyLength * 0.03, bodyWidth * 0.12, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = accentColor;
  roundRect(ctx, -bodyWidth * 0.48, -bodyLength * 0.28, bodyWidth * 0.12, bodyLength * 0.56, 3);
  ctx.fill();
  roundRect(ctx, bodyWidth * 0.36, -bodyLength * 0.28, bodyWidth * 0.12, bodyLength * 0.56, 3);
  ctx.fill();

  ctx.fillStyle = "#11161e";
  ctx.fillRect(-bodyWidth * 0.54, -bodyLength * 0.28, bodyWidth * 0.12, bodyLength * 0.16);
  ctx.fillRect(bodyWidth * 0.42, -bodyLength * 0.28, bodyWidth * 0.12, bodyLength * 0.16);
  ctx.fillRect(-bodyWidth * 0.54, bodyLength * 0.12, bodyWidth * 0.12, bodyLength * 0.16);
  ctx.fillRect(bodyWidth * 0.42, bodyLength * 0.12, bodyWidth * 0.12, bodyLength * 0.16);

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(-bodyWidth * 0.44, -bodyLength * 0.06, bodyWidth * 0.88, 2);

  ctx.fillStyle = "#ffe1a1";
  ctx.fillRect(-bodyWidth * 0.18, bodyLength * 0.44, 4, 3);
  ctx.fillRect(bodyWidth * 0.02, bodyLength * 0.44, 4, 3);
  ctx.fillStyle = "#e26052";
  ctx.fillRect(-bodyWidth * 0.18, -bodyLength * 0.48, 4, 3);
  ctx.fillRect(bodyWidth * 0.02, -bodyLength * 0.48, 4, 3);
}

function getOwnedCarVisualSpec(vehicle, previewMode = false) {
  const scale = previewMode ? 1.18 : 1;
  const specs = {
    used: {
      length: 30 * scale,
      width: 18 * scale,
      roofLength: 11 * scale,
      roofWidth: 10 * scale,
      wheelWidth: 4 * scale,
      wheelLength: 5 * scale,
      nose: 0,
      tail: 1.5 * scale,
      radius: 4,
      roofColor: "#b6bcc6",
      glassColor: "#9fb4c9",
      accentColor: "#444b55",
      trimColor: "rgba(255, 255, 255, 0.18)",
    },
    standard: {
      length: 36 * scale,
      width: 20 * scale,
      roofLength: 14 * scale,
      roofWidth: 11 * scale,
      wheelWidth: 4.4 * scale,
      wheelLength: 5.4 * scale,
      nose: 2 * scale,
      tail: 2 * scale,
      radius: 5,
      roofColor: "#d6e5ff",
      glassColor: "#b8d5f6",
      accentColor: "#223b72",
      trimColor: "rgba(232, 242, 255, 0.26)",
    },
    suv: {
      length: 40 * scale,
      width: 24 * scale,
      roofLength: 18 * scale,
      roofWidth: 13 * scale,
      wheelWidth: 5.2 * scale,
      wheelLength: 6.8 * scale,
      nose: 1.5 * scale,
      tail: 2.2 * scale,
      radius: 5.5,
      roofColor: "#d8e0e8",
      glassColor: "#aac0d1",
      accentColor: "#2f3641",
      trimColor: "rgba(255, 255, 255, 0.18)",
    },
    super: {
      length: 42 * scale,
      width: 22 * scale,
      roofLength: 10 * scale,
      roofWidth: 8.6 * scale,
      wheelWidth: 5.6 * scale,
      wheelLength: 7 * scale,
      nose: 5 * scale,
      tail: 1.2 * scale,
      radius: 7,
      roofColor: "#ffe2cb",
      glassColor: "#a7c4df",
      accentColor: "#7a2518",
      trimColor: "rgba(255, 242, 232, 0.3)",
      glowColor: previewMode ? "rgba(255, 122, 79, 0.18)" : null,
    },
  };
  return specs[vehicle.type] || specs.standard;
}

function drawOwnedVehicleSprite(renderCtx, vehicle, previewMode = false) {
  if (!vehicle) {
    return;
  }

  if (vehicle.inventoryKey === "bike") {
    renderCtx.save();
    renderCtx.strokeStyle = "#d8ecff";
    renderCtx.lineWidth = previewMode ? 3 : 2.2;
    renderCtx.beginPath();
    renderCtx.arc(-12, 10, previewMode ? 9 : 7, 0, Math.PI * 2);
    renderCtx.arc(12, 10, previewMode ? 9 : 7, 0, Math.PI * 2);
    renderCtx.moveTo(-12, 10);
    renderCtx.lineTo(-2, -2);
    renderCtx.lineTo(6, 10);
    renderCtx.lineTo(-4, 10);
    renderCtx.lineTo(2, -8);
    renderCtx.lineTo(10, -8);
    renderCtx.stroke();
    renderCtx.strokeStyle = "#86ffd0";
    renderCtx.beginPath();
    renderCtx.moveTo(2, -8);
    renderCtx.lineTo(0, -16);
    renderCtx.moveTo(10, -8);
    renderCtx.lineTo(16, -12);
    renderCtx.stroke();
    renderCtx.restore();
    return;
  }

  const spec = getOwnedCarVisualSpec(vehicle, previewMode);
  const halfLength = spec.length / 2;
  const halfWidth = spec.width / 2;

  renderCtx.save();
  renderCtx.fillStyle = "rgba(0, 0, 0, 0.28)";
  renderCtx.beginPath();
  renderCtx.ellipse(0, spec.length * 0.2, spec.width * 0.56, spec.length * 0.34, 0, 0, Math.PI * 2);
  renderCtx.fill();

  if (spec.glowColor) {
    renderCtx.save();
    renderCtx.shadowColor = spec.glowColor;
    renderCtx.shadowBlur = 18;
    renderCtx.fillStyle = spec.glowColor;
    roundRect(renderCtx, -halfWidth + 1, -halfLength + 2, spec.width - 2, spec.length - 4, spec.radius);
    renderCtx.fill();
    renderCtx.restore();
  }

  const bodyGradient = renderCtx.createLinearGradient(0, -halfLength, 0, halfLength);
  bodyGradient.addColorStop(0, spec.roofColor);
  bodyGradient.addColorStop(0.18, vehicle.color);
  bodyGradient.addColorStop(0.8, vehicle.color);
  bodyGradient.addColorStop(1, spec.accentColor);
  renderCtx.fillStyle = bodyGradient;

  renderCtx.beginPath();
  roundRect(
    renderCtx,
    -halfWidth + (vehicle.type === "super" ? 0.4 : 0),
    -halfLength + spec.nose * 0.2,
    spec.width - (vehicle.type === "super" ? 0.8 : 0),
    spec.length - spec.nose * 0.2 - spec.tail * 0.1,
    spec.radius
  );
  renderCtx.fill();

  if (vehicle.type === "super") {
    renderCtx.beginPath();
    renderCtx.moveTo(-halfWidth * 0.66, -halfLength + spec.nose);
    renderCtx.lineTo(halfWidth * 0.66, -halfLength + spec.nose);
    renderCtx.lineTo(halfWidth * 0.4, -halfLength + 2);
    renderCtx.lineTo(-halfWidth * 0.4, -halfLength + 2);
    renderCtx.closePath();
    renderCtx.fill();
  }

  renderCtx.strokeStyle = "rgba(8, 14, 24, 0.52)";
  renderCtx.lineWidth = previewMode ? 1.4 : 1.1;
  renderCtx.stroke();

  renderCtx.fillStyle = "rgba(255, 255, 255, 0.14)";
  roundRect(
    renderCtx,
    -halfWidth + 3,
    -halfLength + 4 + spec.nose * 0.4,
    spec.width - 6,
    Math.max(3, spec.length * 0.12),
    Math.max(3, spec.radius - 1)
  );
  renderCtx.fill();

  const glassGradient = renderCtx.createLinearGradient(0, -spec.roofLength / 2, 0, spec.roofLength / 2);
  glassGradient.addColorStop(0, "#f4fbff");
  glassGradient.addColorStop(0.3, spec.glassColor);
  glassGradient.addColorStop(1, "#7f9bbb");
  renderCtx.fillStyle = glassGradient;
  roundRect(
    renderCtx,
    -spec.roofWidth / 2,
    -spec.roofLength / 2,
    spec.roofWidth,
    spec.roofLength,
    Math.max(3, spec.radius - 2)
  );
  renderCtx.fill();

  renderCtx.fillStyle = "rgba(15, 23, 36, 0.78)";
  if (vehicle.type === "super") {
    renderCtx.beginPath();
    renderCtx.moveTo(-spec.roofWidth * 0.34, -spec.roofLength * 0.24);
    renderCtx.lineTo(spec.roofWidth * 0.34, -spec.roofLength * 0.24);
    renderCtx.lineTo(spec.roofWidth * 0.24, spec.roofLength * 0.34);
    renderCtx.lineTo(-spec.roofWidth * 0.24, spec.roofLength * 0.34);
    renderCtx.closePath();
    renderCtx.fill();
  } else {
    roundRect(
      renderCtx,
      -spec.roofWidth * 0.34,
      -spec.roofLength * 0.24,
      spec.roofWidth * 0.68,
      spec.roofLength * 0.48,
      Math.max(2, spec.radius - 3)
    );
    renderCtx.fill();
  }

  if (vehicle.type === "suv") {
    renderCtx.fillStyle = "rgba(248, 251, 255, 0.44)";
    renderCtx.fillRect(-spec.roofWidth * 0.48, -spec.roofLength * 0.62, spec.roofWidth * 0.18, 2);
    renderCtx.fillRect(spec.roofWidth * 0.3, -spec.roofLength * 0.62, spec.roofWidth * 0.18, 2);
  }

  renderCtx.fillStyle = spec.accentColor;
  roundRect(renderCtx, -halfWidth * 0.9, -spec.length * 0.22, spec.wheelWidth, spec.length * 0.2, 3);
  renderCtx.fill();
  roundRect(renderCtx, halfWidth * 0.9 - spec.wheelWidth, -spec.length * 0.22, spec.wheelWidth, spec.length * 0.2, 3);
  renderCtx.fill();
  roundRect(renderCtx, -halfWidth * 0.9, spec.length * 0.02, spec.wheelWidth, spec.length * 0.2, 3);
  renderCtx.fill();
  roundRect(renderCtx, halfWidth * 0.9 - spec.wheelWidth, spec.length * 0.02, spec.wheelWidth, spec.length * 0.2, 3);
  renderCtx.fill();

  renderCtx.fillStyle = "#0b1017";
  renderCtx.fillRect(-halfWidth * 0.98, -spec.length * 0.2, spec.wheelWidth, spec.wheelLength);
  renderCtx.fillRect(halfWidth * 0.98 - spec.wheelWidth, -spec.length * 0.2, spec.wheelWidth, spec.wheelLength);
  renderCtx.fillRect(-halfWidth * 0.98, spec.length * 0.12, spec.wheelWidth, spec.wheelLength);
  renderCtx.fillRect(halfWidth * 0.98 - spec.wheelWidth, spec.length * 0.12, spec.wheelWidth, spec.wheelLength);

  renderCtx.fillStyle = vehicle.type === "super" ? "#8fd5ff" : "#ffe1a1";
  renderCtx.fillRect(-spec.width * 0.14, halfLength - 3, previewMode ? 5 : 4, 3);
  renderCtx.fillRect(spec.width * 0.02, halfLength - 3, previewMode ? 5 : 4, 3);
  renderCtx.fillStyle = vehicle.type === "used" ? "#d66b58" : "#f06e5f";
  renderCtx.fillRect(-spec.width * 0.14, -halfLength, previewMode ? 5 : 4, 3);
  renderCtx.fillRect(spec.width * 0.02, -halfLength, previewMode ? 5 : 4, 3);

  if (vehicle.taxi) {
    renderCtx.fillStyle = "#1f1a06";
    roundRect(
      renderCtx,
      -spec.roofWidth * 0.34,
      -spec.roofLength * 0.78,
      spec.roofWidth * 0.68,
      previewMode ? 8 : 6,
      3
    );
    renderCtx.fill();
    renderCtx.fillStyle = "#fff0a2";
    renderCtx.font = `bold ${previewMode ? 7 : 6}px sans-serif`;
    renderCtx.textAlign = "center";
    renderCtx.fillText("TAXI", 0, -spec.roofLength * 0.78 + (previewMode ? 6 : 5));
    renderCtx.fillStyle = "#11161e";
    renderCtx.fillRect(-spec.width * 0.44, -2, 3, 3);
    renderCtx.fillRect(spec.width * 0.41, -2, 3, 3);
  }
  renderCtx.restore();
}

function drawCars() {
  npcCars.forEach((car) => {
    const x = car.axis === "horizontal" ? car.position : car.lane;
    const y = car.axis === "horizontal" ? car.lane : car.position;

    if (!rectIntersectsViewport(x - 40, y - 40, 80, 80)) {
      return;
    }

    const bodyWidth = car.width;
    const bodyHeight = car.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(x, y + 4, bodyWidth * 0.56, bodyHeight * 0.56, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(x, y);
    if (car.axis === "horizontal") {
      ctx.rotate(car.speed >= 0 ? Math.PI / 2 : -Math.PI / 2);
    } else if (car.speed < 0) {
      ctx.rotate(Math.PI);
    }
    drawTopDownCarSprite(car);
    ctx.restore();
  });
}

function drawPedestrians() {
  pedestrians.forEach((pedestrian) => {
    const x = pedestrian.axis === "horizontal" ? pedestrian.position : pedestrian.lane;
    const y = pedestrian.axis === "horizontal" ? pedestrian.lane : pedestrian.position;

    if (!rectIntersectsViewport(x - 18, y - 24, 36, 48)) {
      return;
    }

    const stride = Math.sin(performance.now() * 0.012 + pedestrian.swayOffset) * 1.6;

    ctx.save();
    ctx.translate(x, y);

    if (pedestrian.axis === "horizontal") {
      ctx.rotate(pedestrian.dir > 0 ? Math.PI / 2 : -Math.PI / 2);
    } else if (pedestrian.dir < 0) {
      ctx.rotate(Math.PI);
    }

    ctx.fillStyle = pedestrian.zone === "crosswalk" ? "rgba(0, 0, 0, 0.32)" : "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(0, 8, pedestrian.radius + 1, pedestrian.radius * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = pedestrian.colors.pants;
    ctx.fillRect(-4, 1, 3, 8);
    ctx.fillRect(1, 1, 3, 8);
    ctx.fillRect(-4, 8 + stride, 2, 6);
    ctx.fillRect(2, 8 - stride, 2, 6);

    ctx.fillStyle = pedestrian.colors.shirt;
    roundRect(ctx, -6, -8, 12, 12, 4);
    ctx.fill();

    ctx.fillStyle = pedestrian.colors.skin;
    ctx.beginPath();
    ctx.arc(0, -11, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = pedestrian.colors.hair;
    ctx.beginPath();
    ctx.arc(0, -12.5, 4.5, Math.PI, 0);
    ctx.fill();

    ctx.fillStyle = "#121826";
    ctx.fillRect(-6, -2, 2, 7);
    ctx.fillRect(4, -2, 2, 7);

    if (pedestrian.zone === "crosswalk") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -2, 11, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  });
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);

  const ridingVehicle = getVehicleById(gameState.ridingVehicleId);

  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(0, ridingVehicle ? 12 : 8, ridingVehicle ? 18 : 10, ridingVehicle ? 7 : 5, 0, 0, Math.PI * 2);
  ctx.fill();

  if (ridingVehicle?.inventoryKey === "car") {
    if (player.direction === "left") {
      ctx.rotate(-Math.PI / 2);
    } else if (player.direction === "right") {
      ctx.rotate(Math.PI / 2);
    } else if (player.direction === "up") {
      ctx.rotate(Math.PI);
    }
  } else if (player.direction === "left") {
    ctx.rotate(-Math.PI / 2);
  } else if (player.direction === "right") {
    ctx.rotate(Math.PI / 2);
  } else if (player.direction === "up") {
    ctx.rotate(Math.PI);
  }

  const stride = player.isMoving ? Math.sin(performance.now() * 0.015) * 2 : 0;

  if (ridingVehicle?.inventoryKey === "bike") {
    drawOwnedVehicleSprite(ctx, ridingVehicle, false);
  } else if (ridingVehicle?.inventoryKey === "car") {
    if (ridingVehicle.id === MISSION_VEHICLE.id) {
      drawTopDownCarSprite({
        width: 34,
        height: 20,
        color: "#ff7b72",
        roofColor: "#ffd8ce",
        glassColor: "#a8c0d8",
        accentColor: "#7c261d",
        trimColor: "rgba(255, 232, 226, 0.34)",
        glowColor: "rgba(255, 123, 114, 0.18)",
      });
    } else {
      drawOwnedVehicleSprite(ctx, ridingVehicle, false);
    }
    ctx.restore();
    return;
  }

  ctx.fillStyle = player.colors.pants;
  ctx.fillRect(-5, ridingVehicle ? -1 : 1, 4, 10);
  ctx.fillRect(1, ridingVehicle ? -1 : 1, 4, 10);
  ctx.fillRect(-5, (ridingVehicle ? 6 : 8) + stride, 3, 6);
  ctx.fillRect(2, (ridingVehicle ? 6 : 8) - stride, 3, 6);

  ctx.fillStyle = player.colors.jacket;
  roundRect(ctx, -7, ridingVehicle ? -9 : -7, 14, 14, 5);
  ctx.fill();

  ctx.fillStyle = player.colors.skin;
  ctx.beginPath();
  ctx.arc(0, ridingVehicle ? -12 : -10, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = player.colors.helmet;
  ctx.beginPath();
  ctx.arc(0, ridingVehicle ? -14 : -12, 5, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = "#08111c";
  ctx.fillRect(-6, ridingVehicle ? -4 : -2, 2, 8);
  ctx.fillRect(4, ridingVehicle ? -4 : -2, 2, 8);

  ctx.fillStyle = "#c7ffd8";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("YOU", 0, ridingVehicle ? -24 : -20);
  ctx.restore();
}

function drawNeonOverlay() {
  const overlays = [
    { x: 460, y: 300, color: "rgba(255, 90, 171, 0.06)", radius: 140 },
    { x: 1600, y: 420, color: "rgba(88, 244, 255, 0.07)", radius: 180 },
    { x: 2770, y: 340, color: "rgba(121, 255, 181, 0.06)", radius: 160 },
    { x: 740, y: 1280, color: "rgba(255, 90, 171, 0.05)", radius: 160 },
    { x: 1820, y: 1720, color: "rgba(255, 216, 102, 0.04)", radius: 200 },
    { x: 2980, y: 1660, color: "rgba(88, 244, 255, 0.05)", radius: 220 },
  ];

  overlays.forEach((overlay) => {
    if (!rectIntersectsViewport(overlay.x - overlay.radius, overlay.y - overlay.radius, overlay.radius * 2, overlay.radius * 2)) {
      return;
    }

    const gradient = ctx.createRadialGradient(overlay.x, overlay.y, 0, overlay.x, overlay.y, overlay.radius);
    gradient.addColorStop(0, overlay.color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(overlay.x - overlay.radius, overlay.y - overlay.radius, overlay.radius * 2, overlay.radius * 2);
  });
}

function drawTimeOfDayOverlay() {
  const timeOfDay = getTimeOfDay();
  const overlayColor = timeOfDay.overlayColor;

  if (timeOfDay.skyTint && timeOfDay.skyTint !== "rgba(255, 255, 255, 0.02)") {
    const tintGradient = ctx.createLinearGradient(camera.x, camera.y, camera.x, camera.y + VIEWPORT.height);
    tintGradient.addColorStop(0, timeOfDay.skyTint);
    tintGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = tintGradient;
    ctx.fillRect(camera.x, camera.y, VIEWPORT.width, VIEWPORT.height);
  }

  if (timeOfDay.key === "night") {
    ctx.save();
    const lightGradient = ctx.createRadialGradient(
      player.x,
      player.y,
      0,
      player.x,
      player.y,
      timeOfDay.playerLightRadius
    );
    lightGradient.addColorStop(0, "rgba(255, 244, 214, 0.12)");
    lightGradient.addColorStop(0.4, "rgba(255, 230, 178, 0.05)");
    lightGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = lightGradient;
    ctx.fillRect(
      player.x - timeOfDay.playerLightRadius,
      player.y - timeOfDay.playerLightRadius,
      timeOfDay.playerLightRadius * 2,
      timeOfDay.playerLightRadius * 2
    );
    ctx.restore();
  }

  ctx.fillStyle = overlayColor;
  ctx.fillRect(camera.x, camera.y, VIEWPORT.width, VIEWPORT.height);
}

function toggleDebugPanel(forceOpen) {
  const shouldOpen =
    typeof forceOpen === "boolean" ? forceOpen : !gameState.isDebugPanelOpen;

  if (shouldOpen && gameState.isShopOpen) {
    closeActiveShopScreen();
  }
  if (shouldOpen && gameState.isWorldMapOpen) {
    toggleWorldMap(false);
  }

  gameState.isDebugPanelOpen = shouldOpen;
  if (debugPanelOverlay) {
    debugPanelOverlay.classList.toggle("hidden", !shouldOpen);
    debugPanelOverlay.setAttribute("aria-hidden", String(!shouldOpen));
  }
  updateEnterShopButton();
}

function toggleWorldMap(forceOpen) {
  const shouldOpen =
    typeof forceOpen === "boolean" ? forceOpen : !gameState.isWorldMapOpen;

  if (shouldOpen && gameState.isShopOpen) {
    closeActiveShopScreen();
  }

  gameState.isWorldMapOpen = shouldOpen;
  worldMapOverlay.classList.toggle("hidden", !shouldOpen);
  worldMapOverlay.setAttribute("aria-hidden", String(!shouldOpen));
  updateEnterShopButton();

  if (shouldOpen) {
    drawWorldMap();
  }
}

function drawWorldMap() {
  const mapWidth = worldMapCanvas.width;
  const mapHeight = worldMapCanvas.height;
  const padding = 36;
  const scale = Math.min(
    (mapWidth - padding * 2) / WORLD.width,
    (mapHeight - padding * 2) / WORLD.height
  );
  const drawWidth = WORLD.width * scale;
  const drawHeight = WORLD.height * scale;
  const offsetX = (mapWidth - drawWidth) / 2;
  const offsetY = (mapHeight - drawHeight) / 2;

  worldMapCtx.clearRect(0, 0, mapWidth, mapHeight);

  const bgGradient = worldMapCtx.createLinearGradient(0, 0, 0, mapHeight);
  bgGradient.addColorStop(0, "#0b2742");
  bgGradient.addColorStop(1, "#06111e");
  worldMapCtx.fillStyle = bgGradient;
  worldMapCtx.fillRect(0, 0, mapWidth, mapHeight);

  worldMapCtx.fillStyle = "rgba(122, 204, 255, 0.08)";
  for (let x = 18; x < mapWidth; x += 44) {
    for (let y = 18; y < mapHeight; y += 44) {
      if (x > offsetX && x < offsetX + drawWidth && y > offsetY && y < offsetY + drawHeight) {
        continue;
      }
      worldMapCtx.fillRect(x, y, 10, 2);
    }
  }

  worldMapCtx.fillStyle = "#06101a";
  worldMapCtx.fillRect(offsetX, offsetY, drawWidth, drawHeight);
  worldMapCtx.strokeStyle = "rgba(172, 227, 255, 0.28)";
  worldMapCtx.lineWidth = 8;
  worldMapCtx.strokeRect(offsetX, offsetY, drawWidth, drawHeight);
  worldMapCtx.strokeStyle = "rgba(147, 184, 255, 0.32)";
  worldMapCtx.lineWidth = 2;
  worldMapCtx.strokeRect(offsetX, offsetY, drawWidth, drawHeight);

  mapData.districts.forEach((district) => {
    const x = offsetX + district.x * scale;
    const y = offsetY + district.y * scale;
    const width = district.width * scale;
    const height = district.height * scale;

    worldMapCtx.fillStyle = district.ground;
    worldMapCtx.fillRect(x, y, width, height);
    worldMapCtx.fillStyle = district.tint;
    worldMapCtx.fillRect(x, y, width, height);
    worldMapCtx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    worldMapCtx.strokeRect(x, y, width, height);

    worldMapCtx.fillStyle = "rgba(220, 232, 255, 0.72)";
    worldMapCtx.font = "bold 13px sans-serif";
    worldMapCtx.textAlign = "left";
    worldMapCtx.fillText(district.name, x + 10, y + 22);
  });

  mapData.roads.forEach((road) => {
    worldMapCtx.fillStyle = road.isAlley ? "#1f2732" : "#313947";
    worldMapCtx.fillRect(
      offsetX + road.x * scale,
      offsetY + road.y * scale,
      Math.max(2, road.width * scale),
      Math.max(2, road.height * scale)
    );
  });

  mapData.buildings.forEach((building) => {
    const x = offsetX + building.x * scale;
    const y = offsetY + building.y * scale;
    const width = Math.max(3, building.width * scale);
    const height = Math.max(3, building.height * scale);

    worldMapCtx.fillStyle = building.baseColor || building.style.body;
    worldMapCtx.fillRect(x, y, width, height);
    worldMapCtx.strokeStyle = building.signColor || building.style.signGlow;
    worldMapCtx.lineWidth = 1;
    worldMapCtx.strokeRect(x, y, width, height);
  });

  const worldPoints = [
    ...mapData.pickupPoints,
    ...mapData.deliveryPoints,
    ...(mission.type === "posting" ? mission.stops : []),
    ...(mission.type === "smallMission" && mission.pickupPoint ? [mission.pickupPoint] : []),
    ...(mission.type === "smallMission" && mission.deliveryPoint ? [mission.deliveryPoint] : []),
    ...(mission.type === "special" && mission.entryPoint ? [mission.entryPoint] : []),
    ...(mission.type === "special" && mission.returnPoint ? [mission.returnPoint] : []),
    ...(mission.type === "cashout" && mission.pickupPoint ? [mission.pickupPoint] : []),
    ...(mission.type === "cashout" && mission.bankPoint ? [mission.bankPoint] : []),
    ...(isTaxiJobActive() && taxiState.passenger && (taxiState.status === "searchingPassenger" || taxiState.status === "rented")
      ? [{ ...taxiState.passenger, kind: "taxi-passenger" }]
      : []),
    ...(isTaxiJobActive() && taxiState.destination && (taxiState.status === "passengerOnBoard" || taxiState.status === "delivering")
      ? [{ ...taxiState.destination, kind: "taxi-destination" }]
      : []),
  ];

  worldPoints.forEach((point) => {
    const x = offsetX + point.x * scale;
    const y = offsetY + point.y * scale;
    worldMapCtx.fillStyle = point.color;
    worldMapCtx.beginPath();

    if (point.kind === "pickup") {
      worldMapCtx.arc(x, y, 4, 0, Math.PI * 2);
    } else if (point.kind === "cashout-pickup") {
      worldMapCtx.rect(x - 5, y - 5, 10, 10);
    } else if (point.kind === "posting") {
      worldMapCtx.rect(x - 3.5, y - 3.5, 7, 7);
    } else if (point.kind === "special-entry") {
      worldMapCtx.moveTo(x, y - 5);
      worldMapCtx.lineTo(x + 5, y);
      worldMapCtx.lineTo(x, y + 5);
      worldMapCtx.lineTo(x - 5, y);
      worldMapCtx.closePath();
    } else if (point.kind === "special-return") {
      worldMapCtx.rect(x - 4.5, y - 4.5, 9, 9);
    } else if (point.kind === "cashout-bank") {
      worldMapCtx.rect(x - 5, y - 4, 10, 8);
    } else if (point.kind === "taxi-passenger") {
      worldMapCtx.arc(x, y, 5, 0, Math.PI * 2);
    } else if (point.kind === "taxi-destination") {
      worldMapCtx.rect(x - 5, y - 5, 10, 10);
    } else {
      worldMapCtx.moveTo(x, y - 4);
      worldMapCtx.lineTo(x + 4, y);
      worldMapCtx.lineTo(x, y + 4);
      worldMapCtx.lineTo(x - 4, y);
      worldMapCtx.closePath();
    }

    worldMapCtx.fill();
  });

  mapData.shopLocations.forEach((shop) => {
    const x = offsetX + shop.x * scale;
    const y = offsetY + shop.y * scale;
    worldMapCtx.fillStyle = shop.color;
    worldMapCtx.fillRect(x - 4, y - 4, 8, 8);
  });

  if (mission.type === "special" && mission.stage === "briefcaseVehicle" && mission.vehiclePoint) {
    const x = offsetX + mission.vehiclePoint.x * scale;
    const y = offsetY + mission.vehiclePoint.y * scale;
    worldMapCtx.fillStyle = "#ff7b72";
    worldMapCtx.fillRect(x - 5, y - 3, 10, 6);
    worldMapCtx.strokeStyle = "#ffffff";
    worldMapCtx.strokeRect(x - 8, y - 8, 16, 16);
  }

  if (mission.active || isTaxiJobActive()) {
    const target = getCurrentMissionTarget();
    if (target) {
      const x = offsetX + target.x * scale;
      const y = offsetY + target.y * scale;
      worldMapCtx.strokeStyle = "#ffffff";
      worldMapCtx.lineWidth = 2;
      worldMapCtx.beginPath();
      worldMapCtx.arc(x, y, 10, 0, Math.PI * 2);
      worldMapCtx.stroke();
    }
  }

  const viewportX = offsetX + camera.x * scale;
  const viewportY = offsetY + camera.y * scale;
  const viewportWidth = VIEWPORT.width * scale;
  const viewportHeight = VIEWPORT.height * scale;
  worldMapCtx.strokeStyle = "rgba(88, 244, 255, 0.92)";
  worldMapCtx.lineWidth = 2;
  worldMapCtx.strokeRect(viewportX, viewportY, viewportWidth, viewportHeight);

  worldMapCtx.fillStyle = "#c7ffd8";
  worldMapCtx.beginPath();
  worldMapCtx.arc(offsetX + player.x * scale, offsetY + player.y * scale, 5, 0, Math.PI * 2);
  worldMapCtx.fill();

  worldMapCtx.fillStyle = "rgba(6, 10, 18, 0.82)";
  worldMapCtx.fillRect(24, mapHeight - 82, 280, 46);
  worldMapCtx.strokeStyle = "rgba(88, 244, 255, 0.2)";
  worldMapCtx.strokeRect(24, mapHeight - 82, 280, 46);
  worldMapCtx.fillStyle = "#eef4ff";
  worldMapCtx.font = "12px sans-serif";
  worldMapCtx.textAlign = "left";
  worldMapCtx.fillText("白リング: 目標 / 丸: 受取 / ひし形: 配達 / 四角: ポスティング / 小四角: 店", 36, mapHeight - 54);
  worldMapCtx.fillText("緑点: プレイヤー位置", 36, mapHeight - 38);
}

function updateInteriorCombat(deltaTime) {
  if (!interiorState.active) {
    return;
  }

  // Lightweight VFX are updated first so AI and bullet impacts can append new events this frame.
  interiorState.effects = interiorState.effects.filter((effect) => {
    effect.life -= deltaTime;
    if (effect.life <= 0) {
      return false;
    }
    effect.x += effect.vx * deltaTime;
    effect.y += effect.vy * deltaTime;
    effect.vx *= 0.92;
    effect.vy *= 0.92;
    effect.radius *= 0.985;
    return true;
  });

  interiorState.bulletTrails = [];

  interiorState.bullets = interiorState.bullets.filter((bullet) => {
    bullet.prevX = bullet.x;
    bullet.prevY = bullet.y;
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;
    interiorState.bulletTrails.push({
      x1: bullet.prevX,
      y1: bullet.prevY,
      x2: bullet.x,
      y2: bullet.y,
      owner: bullet.owner,
      life: 0.06,
    });

    if (
      bullet.x < 0 ||
      bullet.x > interiorState.width ||
      bullet.y < 0 ||
      bullet.y > interiorState.height ||
      interiorCircleHitsWall(bullet.x, bullet.y, bullet.radius)
    ) {
      spawnInteriorImpact(bullet.x, bullet.y, "#ffb347", 0.8, 0.8);
      addInteriorScorchMark(bullet.x, bullet.y, 6 + Math.random() * 4, "rgba(70, 42, 20, 0.32)");
      return false;
    }

    const hitEnemy = interiorState.enemies.find(
      (enemy) => enemy.alive && Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.radius + bullet.radius + 2
    );
    if (hitEnemy) {
      hitEnemy.hp -= INTERIOR_CONFIG.playerDamage;
      hitEnemy.state = "attack";
      hitEnemy.alertTimer = 2.6;
      hitEnemy.lastKnownPlayerX = interiorState.player.x;
      hitEnemy.lastKnownPlayerY = interiorState.player.y;
      spawnInteriorImpact(hitEnemy.x, hitEnemy.y, "#ff8a3d", 1.5, 1.2);
      interiorState.effects.push({
        kind: "flash",
        x: hitEnemy.x,
        y: hitEnemy.y,
        vx: 0,
        vy: 0,
        radius: 26,
        life: 0.12,
        maxLife: 0.12,
        color: "rgba(255, 210, 122, 0.9)",
      });
      interiorState.effects.push({
        kind: "hit",
        x: hitEnemy.x,
        y: hitEnemy.y - 10,
        vx: 0,
        vy: -10,
        radius: 16,
        life: 0.16,
        maxLife: 0.16,
        color: "rgba(191, 53, 38, 0.75)",
      });
      if (hitEnemy.hp <= 0) {
        hitEnemy.alive = false;
      }
      return false;
    }

    return true;
  });

  // Enemies run a simple state machine: guard -> patrol -> search -> attack.
  interiorState.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }

    enemy.stateTimer = Math.max(0, enemy.stateTimer - deltaTime);
    enemy.alertTimer = Math.max(0, enemy.alertTimer - deltaTime);
    enemy.cooldown -= deltaTime;
    const dx = interiorState.player.x - enemy.x;
    const dy = interiorState.player.y - enemy.y;
    const distance = Math.hypot(dx, dy) || 1;
    const canSeePlayer =
      distance <= INTERIOR_CONFIG.detectionRange &&
      hasInteriorLineOfSight(enemy.x, enemy.y, interiorState.player.x, interiorState.player.y);

    if (Math.abs(dx) > Math.abs(dy)) {
      enemy.direction = dx > 0 ? "right" : "left";
    } else {
      enemy.direction = dy > 0 ? "down" : "up";
    }

    if (canSeePlayer) {
      enemy.state = "attack";
      enemy.alertTimer = 2.8;
      enemy.lastKnownPlayerX = interiorState.player.x;
      enemy.lastKnownPlayerY = interiorState.player.y;
    } else if (enemy.alertTimer > 0 && enemy.state !== "patrol") {
      enemy.state = "search";
    } else if (enemy.state !== "patrol" && enemy.state !== "guard") {
      enemy.state = "patrol";
      enemy.stateTimer = randomPatrolPause();
    }

    if (enemy.state === "guard") {
      if (enemy.stateTimer <= 0) {
        enemy.state = "patrol";
        enemy.stateTimer = randomPatrolPause();
      }
    } else if (enemy.state === "patrol") {
      const patrolTarget = enemy.patrolPoints[enemy.patrolIndex] || enemy.patrolPoints[0];
      if (patrolTarget) {
        moveInteriorAgent(enemy, patrolTarget.x, patrolTarget.y, 58, deltaTime);
        if (Math.hypot(enemy.x - patrolTarget.x, enemy.y - patrolTarget.y) < 14) {
          enemy.patrolIndex = (enemy.patrolIndex + 1) % enemy.patrolPoints.length;
          enemy.state = "guard";
          enemy.stateTimer = randomPatrolPause();
        }
      }
    } else if (enemy.state === "search") {
      moveInteriorAgent(enemy, enemy.lastKnownPlayerX, enemy.lastKnownPlayerY, 72, deltaTime);
      if (Math.hypot(enemy.x - enemy.lastKnownPlayerX, enemy.y - enemy.lastKnownPlayerY) < 18 && enemy.alertTimer <= 0) {
        enemy.state = "patrol";
        enemy.stateTimer = randomPatrolPause();
      }
    } else if (enemy.state === "attack") {
      const coverPoint = !canSeePlayer && enemy.alertTimer > 0 ? getInteriorCoverPoint(enemy) : null;
      if (coverPoint) {
        moveInteriorAgent(enemy, coverPoint.x, coverPoint.y, 76, deltaTime);
      } else if (distance > INTERIOR_CONFIG.attackRange) {
        moveInteriorAgent(enemy, interiorState.player.x, interiorState.player.y, 84, deltaTime);
      } else if (distance < INTERIOR_CONFIG.attackRange * 0.65) {
        const retreatX = enemy.x - (dx / distance) * 36;
        const retreatY = enemy.y - (dy / distance) * 36;
        moveInteriorAgent(enemy, retreatX, retreatY, 68, deltaTime);
      }
    }

    if (enemy.state === "attack" && canSeePlayer && distance <= INTERIOR_CONFIG.disengageRange && enemy.cooldown <= 0) {
      interiorState.enemyBullets.push({
        x: enemy.x,
        y: enemy.y,
        prevX: enemy.x,
        prevY: enemy.y,
        vx: (dx / distance) * INTERIOR_CONFIG.enemyBulletSpeed,
        vy: (dy / distance) * INTERIOR_CONFIG.enemyBulletSpeed,
        radius: 4.5,
        owner: "enemy",
      });
      interiorState.effects.push({
        kind: "muzzle",
        x: enemy.x + (dx / distance) * 18,
        y: enemy.y + (dy / distance) * 18,
        vx: (dx / distance) * 8,
        vy: (dy / distance) * 8,
        radius: 10,
        life: 0.06,
        maxLife: 0.06,
        color: "rgba(255, 178, 114, 0.82)",
      });
      enemy.cooldown = 0.8 + Math.random() * 0.75;
    }
  });

  let playerHit = false;
  interiorState.enemyBullets = interiorState.enemyBullets.filter((bullet) => {
    bullet.prevX = bullet.x;
    bullet.prevY = bullet.y;
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;
    interiorState.bulletTrails.push({
      x1: bullet.prevX,
      y1: bullet.prevY,
      x2: bullet.x,
      y2: bullet.y,
      owner: bullet.owner,
      life: 0.05,
    });
    if (
      bullet.x < 0 ||
      bullet.x > interiorState.width ||
      bullet.y < 0 ||
      bullet.y > interiorState.height ||
      interiorCircleHitsWall(bullet.x, bullet.y, bullet.radius)
    ) {
      spawnInteriorImpact(bullet.x, bullet.y, "#ff6b4a", 0.7, 0.75);
      return false;
    }

    if (
      interiorState.hitGraceTime <= 0 &&
      Math.hypot(
        interiorState.player.x - bullet.x,
        interiorState.player.y - bullet.y
      ) < interiorState.player.radius + bullet.radius + 1
    ) {
      let remainingDamage = INTERIOR_CONFIG.enemyDamage;
      if (interiorState.armor > 0) {
        const absorbedDamage = Math.min(
          interiorState.armor,
          remainingDamage * INTERIOR_CONFIG.armorAbsorbRatio
        );
        interiorState.armor = Math.max(0, interiorState.armor - absorbedDamage);
        remainingDamage = Math.max(0, remainingDamage - absorbedDamage);
      }

      if (remainingDamage > 0) {
        interiorState.hp = Math.max(0, interiorState.hp - remainingDamage);
      }

      interiorState.fireCooldown = Math.min(interiorState.fireCooldown, 0.04);
      interiorState.hitFlash = 0.22;
      interiorState.hitGraceTime = INTERIOR_CONFIG.hitGraceDuration;
      interiorState.effects.push({
        kind: "hit",
        x: interiorState.player.x,
        y: interiorState.player.y - 8,
        vx: 0,
        vy: -12,
        radius: 18,
        life: 0.18,
        maxLife: 0.18,
        color: "rgba(204, 70, 55, 0.8)",
      });
      playerHit = true;
      return false;
    }

    return true;
  });

  if (playerHit && interiorState.hp <= 0) {
    interiorState.lives = Math.max(0, interiorState.lives - 1);

    if (interiorState.lives <= 0) {
      interiorState.active = false;
      gameState.currentMode = "world";
      updateOverlayMode();
      clearMissionState();
      showToast("ライフが尽きました。ミッション失敗");
      updateHUD();
      return;
    }

    createInteriorMissionLayout();
    mission.stage = mission.hasBriefcase ? "briefcaseEscape" : "briefcaseInfiltration";
    if (mission.hasBriefcase) {
      interiorState.briefcase.collected = true;
    }
    interiorState.resetFlash = 0.4;
    interiorState.effects.push({
      kind: "flash",
      x: interiorState.player.x,
      y: interiorState.player.y,
      vx: 0,
      vy: 0,
      radius: 42,
      life: 0.18,
      maxLife: 0.18,
      color: "rgba(255, 114, 94, 0.9)",
    });
    showToast(`被弾しました。残りライフ ${interiorState.lives}`);
    updateHUD();
  }
}

function getInteriorFacingAngle(direction) {
  if (direction === "right") {
    return 0;
  }
  if (direction === "left") {
    return Math.PI;
  }
  if (direction === "up") {
    return -Math.PI / 2;
  }
  return Math.PI / 2;
}

function drawInteriorHumanoidSprite(options) {
  const {
    direction,
    bodyColor,
    bodyShadow,
    vestColor,
    skinColor,
    helmetColor,
    accentColor,
    weaponColor,
    downed = false,
  } = options;

  ctx.save();

  if (downed) {
    ctx.rotate(-0.52);
    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.beginPath();
    ctx.ellipse(0, 8, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(68, 25, 22, 0.82)";
    roundRect(ctx, -15, -4, 30, 10, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(16, 16, 16, 0.88)";
    ctx.fillRect(-5, -8, 16, 4);
    ctx.restore();
    return;
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(0, 11, 12, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  const facingAngle = getInteriorFacingAngle(direction);
  const armOffset = {
    x: Math.cos(facingAngle) * 6,
    y: Math.sin(facingAngle) * 6,
  };

  ctx.fillStyle = bodyShadow;
  roundRect(ctx, -7, 4, 5, 10, 2);
  ctx.fill();
  roundRect(ctx, 2, 4, 5, 10, 2);
  ctx.fill();

  ctx.fillStyle = "#191919";
  roundRect(ctx, -8, 11, 6, 5, 2);
  ctx.fill();
  roundRect(ctx, 2, 11, 6, 5, 2);
  ctx.fill();

  ctx.strokeStyle = skinColor;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-8, -2);
  ctx.lineTo(-11 + armOffset.x * 0.15, 6 + armOffset.y * 0.15);
  ctx.moveTo(8, -2);
  ctx.lineTo(10 + armOffset.x * 0.55, 5 + armOffset.y * 0.55);
  ctx.stroke();

  const torsoGradient = ctx.createLinearGradient(0, -13, 0, 8);
  torsoGradient.addColorStop(0, bodyColor);
  torsoGradient.addColorStop(1, bodyShadow);
  ctx.fillStyle = torsoGradient;
  roundRect(ctx, -9, -10, 18, 20, 6);
  ctx.fill();

  ctx.fillStyle = vestColor;
  roundRect(ctx, -5, -8, 10, 15, 4);
  ctx.fill();
  ctx.fillStyle = accentColor;
  ctx.fillRect(-1.5, -8, 3, 14);
  ctx.fillRect(-4, -2, 8, 2);

  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.arc(0, -14, 6.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = helmetColor;
  ctx.beginPath();
  ctx.arc(0, -16, 6.2, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
  ctx.beginPath();
  ctx.ellipse(-2, -17, 2.6, 1.4, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(armOffset.x, armOffset.y);
  ctx.rotate(facingAngle);
  ctx.fillStyle = weaponColor;
  roundRect(ctx, 3, -2.5, 15, 5, 2);
  ctx.fill();
  ctx.fillStyle = "#4b4b4b";
  ctx.fillRect(14, -1.5, 6, 3);
  ctx.restore();

  ctx.restore();
}

function drawInteriorWallDepth(wall) {
  const depth = wall.type === "boundary" ? 16 : 10;
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.fillRect(wall.x + 4, wall.y + wall.height, wall.width, depth);
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(wall.x, wall.y, wall.width, 5);
}

function drawInteriorLighting() {
  ctx.save();
  ctx.fillStyle = "rgba(5, 8, 14, 0.46)";
  ctx.fillRect(0, 0, VIEWPORT.width, VIEWPORT.height);

  const lightX = interiorState.player.x - interiorCamera.x;
  const lightY = interiorState.player.y - interiorCamera.y;
  const playerLight = ctx.createRadialGradient(lightX, lightY, 28, lightX, lightY, 220);
  playerLight.addColorStop(0, "rgba(255, 244, 214, 0)");
  playerLight.addColorStop(0.3, "rgba(255, 244, 214, 0.04)");
  playerLight.addColorStop(1, "rgba(255, 244, 214, 0.36)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = playerLight;
  ctx.beginPath();
  ctx.arc(lightX, lightY, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawInteriorMinimap() {
  const mapWidth = 172;
  const mapHeight = 120;
  const x = 22;
  const y = VIEWPORT.height - mapHeight - 22;
  const scale = Math.min(mapWidth / interiorState.width, mapHeight / interiorState.height);

  ctx.save();
  ctx.fillStyle = "rgba(10, 14, 22, 0.78)";
  roundRect(ctx, x, y, mapWidth, mapHeight, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.stroke();

  ctx.beginPath();
  roundRect(ctx, x + 6, y + 6, mapWidth - 12, mapHeight - 12, 10);
  ctx.clip();

  ctx.fillStyle = "rgba(176, 156, 124, 0.18)";
  ctx.fillRect(x + 6, y + 6, mapWidth - 12, mapHeight - 12);

  interiorState.walls.forEach((wall) => {
    ctx.fillStyle = wall.type === "boundary" ? "rgba(152, 140, 123, 0.82)" : "rgba(92, 118, 117, 0.82)";
    ctx.fillRect(x + wall.x * scale, y + wall.y * scale, wall.width * scale, wall.height * scale);
  });

  if (!interiorState.briefcase.collected) {
    ctx.fillStyle = "#ffd866";
    ctx.beginPath();
    ctx.arc(x + interiorState.briefcase.x * scale, y + interiorState.briefcase.y * scale, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  interiorState.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }
    ctx.fillStyle = enemy.state === "attack" ? "#ff8c69" : "#d2d6df";
    ctx.fillRect(x + enemy.x * scale - 2, y + enemy.y * scale - 2, 4, 4);
  });

  ctx.fillStyle = "#7effd8";
  ctx.beginPath();
  ctx.arc(x + interiorState.player.x * scale, y + interiorState.player.y * scale, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(126, 255, 216, 0.28)";
  ctx.strokeRect(x + interiorCamera.x * scale, y + interiorCamera.y * scale, VIEWPORT.width * scale, VIEWPORT.height * scale);
  ctx.restore();

  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "600 11px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("TACTICAL MAP", x + 12, y + 18);
}

function drawInteriorCombatUi() {
  ctx.save();
  ctx.fillStyle = "rgba(9, 12, 19, 0.78)";
  roundRect(ctx, 20, 20, 382, 90, 16);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#e8edf5";
  ctx.font = "600 14px sans-serif";
  ctx.fillText(mission.entryPoint?.name || "Mansion Raid", 36, 44);
  ctx.fillStyle = "rgba(225, 232, 241, 0.68)";
  ctx.font = "12px sans-serif";
  ctx.fillText(
    interiorState.briefcase.collected
      ? "ケース確保済み。出口へ向かって離脱。"
      : "索敵を避けつつ最奥のケースを確保。",
    36,
    66
  );
  ctx.fillText("WASD / 矢印: 移動  Space: 射撃  R: リロード", 36, 88);

  const armorRatio = interiorState.armor / interiorState.maxArmor;
  const hpRatio = interiorState.hp / interiorState.maxHp;
  const statusX = VIEWPORT.width - 264;
  const statusY = 24;

  ctx.fillStyle = "rgba(8, 10, 14, 0.9)";
  roundRect(ctx, statusX, statusY, 232, 108, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "600 11px sans-serif";
  ctx.fillText("ARMOR", statusX + 16, statusY + 22);
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  roundRect(ctx, statusX + 16, statusY + 30, 156, 12, 6);
  ctx.fill();
  const armorGradient = ctx.createLinearGradient(statusX + 16, 0, statusX + 172, 0);
  armorGradient.addColorStop(0, "#97d0e2");
  armorGradient.addColorStop(1, "#5e8cc6");
  ctx.fillStyle = armorGradient;
  roundRect(ctx, statusX + 16, statusY + 30, 156 * armorRatio, 12, 6);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${Math.ceil(interiorState.armor)} / ${interiorState.maxArmor}`, statusX + 172, statusY + 40);

  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.fillText("LIFE", statusX + 16, statusY + 58);
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  roundRect(ctx, statusX + 16, statusY + 66, 156, 12, 6);
  ctx.fill();
  const hpGradient = ctx.createLinearGradient(statusX + 16, 0, statusX + 172, 0);
  hpGradient.addColorStop(0, "#78d7be");
  hpGradient.addColorStop(1, hpRatio < 0.35 ? "#cf5b4f" : "#cfd56c");
  ctx.fillStyle = hpGradient;
  roundRect(ctx, statusX + 16, statusY + 66, 156 * hpRatio, 12, 6);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${Math.ceil(interiorState.hp)} / ${interiorState.maxHp}`, statusX + 172, statusY + 76);

  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.fillText("LIVES", statusX + 16, statusY + 96);
  for (let lifeIndex = 0; lifeIndex < interiorState.maxLives; lifeIndex += 1) {
    const chipX = statusX + 70 + lifeIndex * 24;
    ctx.fillStyle = lifeIndex < interiorState.lives ? "#f4dfb8" : "rgba(255, 255, 255, 0.12)";
    roundRect(ctx, chipX, statusY + 88, 16, 10, 4);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(9, 12, 19, 0.82)";
  roundRect(ctx, VIEWPORT.width - 214, VIEWPORT.height - 96, 194, 60, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.68)";
  ctx.font = "600 11px sans-serif";
  ctx.fillText("AMMO", VIEWPORT.width - 196, VIEWPORT.height - 72);
  ctx.fillStyle = "#f2f5f9";
  ctx.font = "600 28px sans-serif";
  ctx.fillText(String(interiorState.ammoInClip).padStart(2, "0"), VIEWPORT.width - 196, VIEWPORT.height - 46);
  ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
  ctx.font = "12px sans-serif";
  ctx.fillText(`/ ${String(interiorState.reserveAmmo).padStart(2, "0")}`, VIEWPORT.width - 140, VIEWPORT.height - 46);
  if (interiorState.reloadTime > 0) {
    ctx.fillStyle = "#ffcf7a";
    ctx.font = "600 11px sans-serif";
    ctx.fillText("RELOADING", VIEWPORT.width - 196, VIEWPORT.height - 26);
  }

  drawInteriorMinimap();
  ctx.restore();
}

function drawInteriorMission() {
  // Interior view is rendered in world space first, then post-processed with night lighting.
  ctx.save();
  ctx.translate(-interiorCamera.x, -interiorCamera.y);

  const floorGradient = ctx.createLinearGradient(0, 0, 0, interiorState.height);
  floorGradient.addColorStop(0, "#d2c0a0");
  floorGradient.addColorStop(0.58, "#c2ae8d");
  floorGradient.addColorStop(1, "#aa9578");
  ctx.fillStyle = floorGradient;
  ctx.fillRect(0, 0, interiorState.width, interiorState.height);

  ctx.fillStyle = "rgba(86, 68, 43, 0.06)";
  for (let x = 0; x < interiorState.width; x += 52) {
    ctx.fillRect(x, 0, 1, interiorState.height);
  }
  for (let y = 0; y < interiorState.height; y += 52) {
    ctx.fillRect(0, y, interiorState.width, 1);
  }

  for (let index = 0; index < 180; index += 1) {
    const noiseX = (index * 67) % interiorState.width;
    const noiseY = (index * 131) % interiorState.height;
    ctx.fillStyle = index % 3 === 0 ? "rgba(88, 67, 41, 0.05)" : "rgba(255, 255, 255, 0.03)";
    ctx.fillRect(noiseX, noiseY, 2, 2);
  }

  interiorState.scorchMarks.forEach((mark) => {
    ctx.fillStyle = mark.color;
    ctx.beginPath();
    ctx.arc(mark.x, mark.y, mark.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  interiorState.props.forEach((prop) => {
    if (prop.type === "column") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(prop.x + 4, prop.y + prop.height, prop.width, 10);
      ctx.fillStyle = "#51493d";
      ctx.fillRect(prop.x, prop.y, prop.width, prop.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(prop.x + 4, prop.y + 4, prop.width - 8, 8);
      return;
    }

    if (prop.type === "vent-bank") {
      ctx.fillStyle = "#7b827f";
      ctx.fillRect(prop.x, prop.y, prop.width, prop.height);
      ctx.fillStyle = "#4a504d";
      ctx.fillRect(prop.x + 8, prop.y + 8, prop.width - 16, prop.height - 16);
      ctx.strokeStyle = "#adb5af";
      ctx.strokeRect(prop.x, prop.y, prop.width, prop.height);
      for (let fan = 0; fan < 2; fan += 1) {
        const fanX = prop.x + 28 + fan * 56;
        const fanY = prop.y + prop.height / 2;
        ctx.fillStyle = "#2a2726";
        ctx.beginPath();
        ctx.arc(fanX, fanY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#9ba19f";
        ctx.beginPath();
        ctx.arc(fanX, fanY, 24, 0, Math.PI * 2);
        ctx.stroke();
      }
      return;
    }

    if (prop.type === "exit-light") {
      ctx.save();
      ctx.shadowColor = "rgba(124, 255, 210, 0.45)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "rgba(124, 255, 210, 0.18)";
      ctx.fillRect(prop.x, prop.y, prop.width, prop.height);
      ctx.restore();
    }
  });

  interiorState.walls.forEach((wall) => {
    drawInteriorWallDepth(wall);
    if (wall.type === "boundary") {
      ctx.fillStyle = "#706350";
    } else if (wall.type === "fence") {
      ctx.fillStyle = "#45504d";
    } else if (wall.type === "hvac") {
      ctx.fillStyle = "#7e8785";
    } else {
      ctx.fillStyle = "#314844";
    }
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    ctx.strokeStyle = wall.type === "crate-stack" ? "rgba(176, 230, 220, 0.22)" : "rgba(255, 255, 255, 0.12)";
    ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);

    if (wall.type === "crate-stack") {
      ctx.strokeStyle = "rgba(210, 255, 244, 0.18)";
      for (let stripe = 14; stripe < wall.width + wall.height; stripe += 18) {
        ctx.beginPath();
        ctx.moveTo(wall.x + Math.min(stripe, wall.width), wall.y);
        ctx.lineTo(wall.x, wall.y + Math.min(stripe, wall.height));
        ctx.stroke();
      }
    } else if (wall.type === "hvac") {
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fillRect(wall.x + 6, wall.y + 6, wall.width - 12, 8);
    }
  });

  interiorState.enemies.forEach((enemy) => {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    drawInteriorHumanoidSprite({
      direction: enemy.direction,
      bodyColor: "#2d3138",
      bodyShadow: "#171a1f",
      vestColor: "#6c231b",
      skinColor: "#e2b08b",
      helmetColor: "#40352c",
      accentColor: "#a84831",
      weaponColor: "#202327",
      downed: !enemy.alive,
    });
    ctx.restore();
  });

  if (!interiorState.briefcase.collected) {
    ctx.save();
    ctx.translate(interiorState.briefcase.x, interiorState.briefcase.y);
    ctx.shadowColor = "#ffd866";
    ctx.shadowBlur = 22;
    ctx.fillStyle = "#ffd866";
    roundRect(ctx, -18, -12, 36, 24, 5);
    ctx.fill();
    ctx.fillStyle = "#52370a";
    ctx.fillRect(-4, -18, 8, 8);
    ctx.restore();
  }

  if (mission.stage === "briefcaseEscape") {
    ctx.save();
    ctx.shadowColor = "#79ffb5";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(121, 255, 181, 0.18)";
    ctx.fillRect(
      interiorState.exitZone.x,
      interiorState.exitZone.y,
      interiorState.exitZone.width,
      interiorState.exitZone.height
    );
    ctx.restore();
    ctx.fillStyle = "#dfffee";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "EXIT",
      interiorState.exitZone.x + interiorState.exitZone.width / 2,
      interiorState.exitZone.y - 10
    );
  }

  interiorState.bulletTrails.forEach((trail) => {
    ctx.save();
    ctx.strokeStyle = trail.owner === "player" ? "rgba(255, 198, 120, 0.32)" : "rgba(255, 116, 88, 0.26)";
    ctx.lineWidth = trail.owner === "player" ? 2.2 : 1.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail.x1, trail.y1);
    ctx.lineTo(trail.x2, trail.y2);
    ctx.stroke();
    ctx.restore();
  });

  interiorState.bullets.forEach((bullet) => {
    ctx.fillStyle = "#ffb347";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(bullet.x - bullet.radius * 2.5, bullet.y - 1, bullet.radius * 4, 2);
  });

  interiorState.enemyBullets.forEach((bullet) => {
    ctx.fillStyle = "#ff6b4a";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(bullet.x - bullet.radius * 2, bullet.y - 1, bullet.radius * 3.4, 2);
  });

  interiorState.effects.forEach((effect) => {
    const alpha = Math.max(0, effect.life / effect.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = effect.color;
    ctx.beginPath();
    const effectRadius = effect.kind === "flash" || effect.kind === "muzzle"
      ? effect.radius * (1 + (1 - alpha) * 0.6)
      : effect.radius;
    ctx.arc(effect.x, effect.y, effectRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.save();
  ctx.translate(interiorState.player.x, interiorState.player.y);
  if (interiorState.hitGraceTime > 0 && Math.floor(interiorState.hitGraceTime * 20) % 2 === 0) {
    ctx.globalAlpha = 0.66;
  }
  drawInteriorHumanoidSprite({
    direction: interiorState.player.direction,
    bodyColor: "#19b6aa",
    bodyShadow: "#0b635c",
    vestColor: "#0f3c39",
    skinColor: "#efc5a2",
    helmetColor: "#dce9ef",
    accentColor: "#8ef2da",
    weaponColor: "#21282d",
  });
  ctx.restore();
  ctx.restore();

  drawInteriorLighting();
  drawInteriorCombatUi();

  if (interiorState.hitFlash > 0) {
    ctx.fillStyle = `rgba(189, 62, 43, ${interiorState.hitFlash * 0.42})`;
    ctx.fillRect(0, 0, VIEWPORT.width, VIEWPORT.height);
  }

  if (interiorState.resetFlash > 0) {
    ctx.fillStyle = `rgba(255, 90, 171, ${interiorState.resetFlash * 0.45})`;
    ctx.fillRect(0, 0, VIEWPORT.width, VIEWPORT.height);
  }
}

function houseCircleHitsWall(x, y, radius) {
  return houseState.walls.some((wall) => circleIntersectsRect(x, y, radius, wall));
}

function updateHousePlayer(deltaTime) {
  const { horizontal, vertical } = updateMovementInput();
  const length = Math.hypot(horizontal, vertical) || 1;
  const speed = 220;
  const nextX = clamp(
    houseState.player.x + (horizontal / length) * speed * deltaTime,
    houseState.player.radius + 18,
    houseState.width - houseState.player.radius - 18
  );
  const nextY = clamp(
    houseState.player.y + (vertical / length) * speed * deltaTime,
    houseState.player.radius + 18,
    houseState.height - houseState.player.radius - 18
  );

  if (horizontal > 0) {
    houseState.player.direction = "right";
  } else if (horizontal < 0) {
    houseState.player.direction = "left";
  } else if (vertical > 0) {
    houseState.player.direction = "down";
  } else if (vertical < 0) {
    houseState.player.direction = "up";
  }

  if (!houseCircleHitsWall(nextX, houseState.player.y, houseState.player.radius)) {
    houseState.player.x = nextX;
  }
  if (!houseCircleHitsWall(houseState.player.x, nextY, houseState.player.radius)) {
    houseState.player.y = nextY;
  }

  // 出口ゾーンに入ったら自動退出
  if (rectContainsPoint(houseState.exitZone, houseState.player.x, houseState.player.y)) {
    exitOwnedHouse();
  }
}

function drawHouseInterior() {
  const ownedHouse = getOwnedHouse() || getHouseLevelConfig(1);
  const tone = houseState.props.find((prop) => prop.type === "wall-tone");
  const streamState = gameState.house.streaming;
  const nearPc = rectContainsPoint(houseState.pcZone, houseState.player.x, houseState.player.y);
  ctx.textAlign = "left";

  // ── 背景：壁（上半分）+ 床（下半分）──
  ctx.clearRect(0, 0, VIEWPORT.width, VIEWPORT.height);

  // 壁面グラデーション（上半分）
  const wallGradient = ctx.createLinearGradient(0, 0, 0, VIEWPORT.height * 0.48);
  wallGradient.addColorStop(0, tone?.wallDark || "#272f38");
  wallGradient.addColorStop(1, tone?.wall || "#4f5c67");
  ctx.fillStyle = wallGradient;
  ctx.fillRect(0, 0, VIEWPORT.width, VIEWPORT.height * 0.48);

  // 床面グラデーション（下半分）
  const floorGradient = ctx.createLinearGradient(0, VIEWPORT.height * 0.48, 0, VIEWPORT.height);
  floorGradient.addColorStop(0, tone?.floor || "#7e7365");
  floorGradient.addColorStop(1, tone?.floorDark || "#48443e");
  ctx.fillStyle = floorGradient;
  ctx.fillRect(0, VIEWPORT.height * 0.48, VIEWPORT.width, VIEWPORT.height * 0.52);

  // 床の木目ライン
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  for (let fy = VIEWPORT.height * 0.48; fy < VIEWPORT.height - 28; fy += 22) {
    ctx.fillRect(28, fy, VIEWPORT.width - 56, 1.5);
  }

  // 天井の縁取り
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(28, 28, VIEWPORT.width - 56, 4);

  // 壁面の窓（上部中央）
  ctx.save();
  ctx.fillStyle = "rgba(180,220,255,0.18)";
  roundRect(ctx, 380, 32, 200, 58, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(200,230,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();
  // 窓の桟
  ctx.strokeStyle = "rgba(200,230,255,0.22)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(480, 32); ctx.lineTo(480, 90);
  ctx.moveTo(380, 61); ctx.lineTo(580, 61);
  ctx.stroke();
  // 窓の光
  ctx.fillStyle = "rgba(180,230,255,0.08)";
  ctx.fillRect(28, 90, VIEWPORT.width - 56, 60);
  ctx.restore();

  // ラグ（リビングエリア）
  ctx.save();
  ctx.fillStyle = tone?.rug || "#375a49";
  ctx.globalAlpha = 0.85;
  roundRect(ctx, 284, 316, 332, 200, 24);
  ctx.fill();
  ctx.globalAlpha = 1;
  // ラグの模様
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 2;
  roundRect(ctx, 296, 328, 308, 176, 18);
  ctx.stroke();
  ctx.restore();

  // ── 家具プロップ描画 ──
  houseState.props.forEach((prop) => {
    if (prop.type === "bed") {
      // ベッドフレーム
      ctx.fillStyle = "#4a3828";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 14);
      ctx.fill();
      // マットレス
      ctx.fillStyle = "#ddd8d2";
      roundRect(ctx, prop.x + 8, prop.y + 8, prop.width - 16, prop.height - 16, 10);
      ctx.fill();
      // 掛け布団
      ctx.fillStyle = "#5a7a96";
      roundRect(ctx, prop.x + 8, prop.y + 36, prop.width - 16, prop.height - 44, 10);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      roundRect(ctx, prop.x + 8, prop.y + 36, prop.width - 16, prop.height - 44, 10);
      ctx.fill();
      // 枕
      ctx.fillStyle = "#e8e2dc";
      roundRect(ctx, prop.x + 16, prop.y + 10, prop.width - 32, 22, 8);
      ctx.fill();
      // ヘッドボード
      ctx.fillStyle = "#3a2a1a";
      roundRect(ctx, prop.x, prop.y, prop.width, 16, 8);
      ctx.fill();

    } else if (prop.type === "nightstand") {
      ctx.fillStyle = "#4a3828";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 8);
      ctx.fill();
      // 引き出し
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      roundRect(ctx, prop.x + 6, prop.y + 8, prop.width - 12, 18, 4);
      ctx.fill();
      roundRect(ctx, prop.x + 6, prop.y + 30, prop.width - 12, 18, 4);
      ctx.fill();
      // ランプ光
      ctx.save();
      ctx.shadowColor = prop.glow || "#ffcf7a";
      ctx.shadowBlur = 18;
      ctx.fillStyle = prop.glow || "#ffcf7a";
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(prop.x + prop.width / 2, prop.y - 8, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();

    } else if (prop.type === "lamp") {
      // ポール
      ctx.fillStyle = "#888";
      ctx.fillRect(prop.x + 11, prop.y + 20, 4, prop.height - 20);
      // ベース
      ctx.fillStyle = "#555";
      roundRect(ctx, prop.x, prop.y + prop.height - 8, prop.width, 8, 4);
      ctx.fill();
      // シェード
      ctx.save();
      ctx.shadowColor = prop.glow || "#ffcf7a";
      ctx.shadowBlur = 22;
      ctx.fillStyle = prop.glow || "#ffcf7a";
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(prop.x + 13, prop.y + 12, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(prop.x + 13, prop.y + 12, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();

    } else if (prop.type === "shelf") {
      ctx.fillStyle = "#5a3e2e";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 8);
      ctx.fill();
      // 棚板
      ctx.fillStyle = "#7a5642";
      ctx.fillRect(prop.x + 4, prop.y + 26, prop.width - 8, 5);
      ctx.fillRect(prop.x + 4, prop.y + 62, prop.width - 8, 5);
      ctx.fillRect(prop.x + 4, prop.y + 98, prop.width - 8, 5);
      // 装飾品（小物）
      ctx.fillStyle = "#c87a4e";
      roundRect(ctx, prop.x + 10, prop.y + 8, 14, 18, 3);
      ctx.fill();
      ctx.fillStyle = "#7ab87a";
      roundRect(ctx, prop.x + 30, prop.y + 8, 10, 18, 3);
      ctx.fill();
      ctx.fillStyle = "#8ab4d4";
      roundRect(ctx, prop.x + 46, prop.y + 10, 12, 16, 3);
      ctx.fill();
      ctx.fillStyle = "#d4b48a";
      roundRect(ctx, prop.x + 8, prop.y + 44, 16, 18, 3);
      ctx.fill();
      ctx.fillStyle = "#9a7ab4";
      roundRect(ctx, prop.x + 30, prop.y + 44, 12, 18, 3);
      ctx.fill();

    } else if (prop.type === "desk") {
      // 机天板
      ctx.fillStyle = "#6a4d38";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 10);
      ctx.fill();
      // ハイライト
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      roundRect(ctx, prop.x + 6, prop.y + 4, prop.width - 12, 10, 5);
      ctx.fill();
      // 脚
      ctx.fillStyle = "#3a2a1a";
      ctx.fillRect(prop.x + 8, prop.y + prop.height - 4, 16, 8);
      ctx.fillRect(prop.x + prop.width - 24, prop.y + prop.height - 4, 16, 8);

    } else if (prop.type === "pc") {
      const isLive = streamState && !streamState.complete;
      // モニターフレーム
      ctx.save();
      ctx.shadowColor = isLive ? "#ff5aab" : prop.glow;
      ctx.shadowBlur = isLive ? 28 : 18;
      ctx.fillStyle = "#1a1a2e";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 8);
      ctx.fill();
      ctx.restore();
      // 画面
      const screenGrad = ctx.createLinearGradient(prop.x + 6, prop.y + 5, prop.x + 6, prop.y + prop.height - 5);
      if (isLive) {
        screenGrad.addColorStop(0, "#1a2e1a");
        screenGrad.addColorStop(1, "#0a180a");
      } else {
        screenGrad.addColorStop(0, "#0d1825");
        screenGrad.addColorStop(1, "#060e18");
      }
      ctx.fillStyle = screenGrad;
      roundRect(ctx, prop.x + 5, prop.y + 5, prop.width - 10, prop.height - 10, 6);
      ctx.fill();
      if (isLive) {
        // 配信画面
        ctx.fillStyle = "rgba(0,255,80,0.12)";
        roundRect(ctx, prop.x + 5, prop.y + 5, prop.width - 10, prop.height - 10, 6);
        ctx.fill();
        ctx.save();
        ctx.shadowColor = "#ff5aab";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#ff5aab";
        ctx.font = "bold 10px monospace";
        ctx.fillText("● LIVE", prop.x + 10, prop.y + 20);
        ctx.restore();
        ctx.fillStyle = "rgba(150,255,150,0.7)";
        ctx.font = "9px monospace";
        ctx.fillText(`${streamState.viewers}人`, prop.x + 10, prop.y + 34);
      } else {
        ctx.fillStyle = prop.glow || "#8cdfff";
        ctx.globalAlpha = 0.6;
        ctx.font = "9px monospace";
        ctx.fillText("READY", prop.x + 14, prop.y + 26);
        ctx.globalAlpha = 1;
      }
      // スタンド
      ctx.fillStyle = "#222";
      ctx.fillRect(prop.x + prop.width / 2 - 6, prop.y + prop.height, 12, 6);
      ctx.fillRect(prop.x + prop.width / 2 - 14, prop.y + prop.height + 6, 28, 4);

    } else if (prop.type === "chair") {
      // 座面
      ctx.fillStyle = "#2a3545";
      roundRect(ctx, prop.x, prop.y + 14, prop.width, prop.height - 14, 10);
      ctx.fill();
      // 背もたれ
      ctx.fillStyle = "#354260";
      roundRect(ctx, prop.x + 4, prop.y, prop.width - 8, 20, 6);
      ctx.fill();
      // ハイライト
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      roundRect(ctx, prop.x + 8, prop.y + 16, prop.width - 16, 10, 5);
      ctx.fill();

    } else if (prop.type === "tv") {
      // テレビフレーム
      ctx.fillStyle = "#111118";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 6);
      ctx.fill();
      // 画面
      const tvGrad = ctx.createLinearGradient(prop.x + 5, prop.y + 3, prop.x + prop.width - 5, prop.y + prop.height - 3);
      tvGrad.addColorStop(0, "#1a2535");
      tvGrad.addColorStop(1, "#0d1520");
      ctx.fillStyle = tvGrad;
      roundRect(ctx, prop.x + 4, prop.y + 3, prop.width - 8, prop.height - 6, 4);
      ctx.fill();
      // 画面グロー
      ctx.fillStyle = "rgba(60,140,255,0.12)";
      roundRect(ctx, prop.x + 4, prop.y + 3, prop.width - 8, prop.height - 6, 4);
      ctx.fill();
      // 電源ランプ
      ctx.save();
      ctx.shadowColor = "#79ffb5";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#79ffb5";
      ctx.beginPath();
      ctx.arc(prop.x + prop.width - 10, prop.y + prop.height / 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // スタンド
      ctx.fillStyle = "#1a1a22";
      ctx.fillRect(prop.x + prop.width / 2 - 20, prop.y + prop.height, 40, 6);

    } else if (prop.type === "coffeeTable") {
      // テーブル天板
      ctx.fillStyle = "#7a5840";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 10);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      roundRect(ctx, prop.x + 6, prop.y + 5, prop.width - 12, prop.height - 10, 7);
      ctx.fill();
      // コーヒーカップ
      ctx.fillStyle = "#e8d8c4";
      ctx.beginPath();
      ctx.arc(prop.x + 36, prop.y + prop.height / 2, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#6a3820";
      ctx.beginPath();
      ctx.arc(prop.x + 36, prop.y + prop.height / 2, 7, 0, Math.PI * 2);
      ctx.fill();
      // リモコン
      ctx.fillStyle = "#2a2a36";
      roundRect(ctx, prop.x + prop.width - 44, prop.y + 10, 26, 38, 5);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(prop.x + prop.width - 31, prop.y + 20 + i * 10, 3, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (prop.type === "sofa") {
      // ソファフレーム
      ctx.fillStyle = "#1e3248";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 16);
      ctx.fill();
      // 座面クッション
      ctx.fillStyle = "#2a4560";
      roundRect(ctx, prop.x + 8, prop.y + 26, prop.width - 16, prop.height - 34, 12);
      ctx.fill();
      // クッション区切り
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(prop.x + prop.width / 3, prop.y + 26, 2, prop.height - 34);
      ctx.fillRect(prop.x + (prop.width / 3) * 2, prop.y + 26, 2, prop.height - 34);
      // 背もたれ
      ctx.fillStyle = "#243a52";
      roundRect(ctx, prop.x + 6, prop.y, prop.width - 12, 28, 12);
      ctx.fill();
      // アームレスト
      ctx.fillStyle = "#1a2e42";
      roundRect(ctx, prop.x, prop.y + 8, 16, prop.height - 16, 8);
      ctx.fill();
      roundRect(ctx, prop.x + prop.width - 16, prop.y + 8, 16, prop.height - 16, 8);
      ctx.fill();
      // ハイライト
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      roundRect(ctx, prop.x + 8, prop.y + 28, prop.width - 16, 12, 6);
      ctx.fill();

    } else if (prop.type === "plant") {
      // 植木鉢
      ctx.fillStyle = "#7a5040";
      roundRect(ctx, prop.x + 3, prop.y + prop.height - 22, prop.width - 6, 22, 4);
      ctx.fill();
      ctx.fillStyle = "#8a6050";
      ctx.fillRect(prop.x + 1, prop.y + prop.height - 24, prop.width - 2, 4);
      // 幹
      ctx.fillStyle = "#5a3a28";
      ctx.fillRect(prop.x + prop.width / 2 - 3, prop.y + 28, 6, prop.height - 50);
      // 葉
      ctx.save();
      ctx.shadowColor = "#5ea36e";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#5ea36e";
      ctx.beginPath();
      ctx.arc(prop.x + prop.width / 2, prop.y + 16, prop.width / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4a8a5a";
      ctx.beginPath();
      ctx.arc(prop.x + prop.width / 2 + 4, prop.y + 22, prop.width / 2 - 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

    } else if (prop.type === "door") {
      // ドア枠
      ctx.fillStyle = "#2a1e10";
      roundRect(ctx, prop.x - 6, prop.y - 4, prop.width + 12, prop.height + 10, 5);
      ctx.fill();
      // ドア本体
      ctx.fillStyle = "#7a5230";
      roundRect(ctx, prop.x, prop.y, prop.width, prop.height, 5);
      ctx.fill();
      // パネル装飾
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      roundRect(ctx, prop.x + 8, prop.y + 3, prop.width / 2 - 12, prop.height - 6, 3);
      ctx.fill();
      roundRect(ctx, prop.x + prop.width / 2 + 4, prop.y + 3, prop.width / 2 - 12, prop.height - 6, 3);
      ctx.fill();
      // ドアノブ
      ctx.save();
      ctx.shadowColor = "#d4a84e";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#d4a84e";
      ctx.beginPath();
      ctx.arc(prop.x + prop.width - 16, prop.y + prop.height / 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // 光の差し込み
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#ffe080";
      ctx.fillRect(prop.x - 6, prop.y - 18, prop.width + 12, 18);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  });

  // ── 壁（外壁 + 仕切り壁）──
  houseState.walls.forEach((wall) => {
    ctx.fillStyle = "rgba(14, 18, 26, 0.92)";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });

  // 仕切り壁の上端ハイライト（仕切り壁のみ: index 4, 5）
  [houseState.walls[4], houseState.walls[5]].forEach((wall) => {
    if (!wall) return;
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    ctx.fillRect(wall.x, wall.y, wall.width, 2);
  });

  // ── プレイヤー ──
  ctx.save();
  ctx.translate(houseState.player.x, houseState.player.y);
  if (houseState.player.direction === "left") {
    ctx.rotate(-Math.PI / 2);
  } else if (houseState.player.direction === "right") {
    ctx.rotate(Math.PI / 2);
  } else if (houseState.player.direction === "up") {
    ctx.rotate(Math.PI);
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 10, 10, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1fb7aa";
  roundRect(ctx, -7, -8, 14, 16, 5);
  ctx.fill();
  ctx.fillStyle = "#efc5a2";
  ctx.beginPath();
  ctx.arc(0, -11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e8f0f6";
  ctx.beginPath();
  ctx.arc(0, -13, 5, Math.PI, 0);
  ctx.fill();
  ctx.restore();

  // ── 左上：部屋情報パネル ──
  ctx.save();
  ctx.fillStyle = "rgba(8, 12, 19, 0.82)";
  roundRect(ctx, 18, 18, 370, streamState ? 124 : 104, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#eef8ff";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(`${ownedHouse?.label || "ボロ屋"}  /  配信拠点`, 34, 44);
  ctx.fillStyle = "rgba(238, 244, 255, 0.68)";
  ctx.font = "12px sans-serif";
  ctx.fillText(`配信収益 ${getStreamIncomeRange()} / 視聴者 ${getStreamViewerRange()}`, 34, 66);
  ctx.fillText("PC前: E で配信  /  玄関ドアに近づくと外へ出る", 34, 86);
  if (streamState && !streamState.complete) {
    ctx.fillStyle = "#79ffb5";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(`● 配信中... ${streamState.viewers} 視聴者`, 34, 110);
  } else if (streamState?.complete) {
    ctx.fillStyle = "#ffd866";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(`収益確定 ${streamState.liveLabel}`, 34, 110);
  }
  ctx.restore();

  // ── 右上：配信ステータスパネル（配信中のみ）──
  if (streamState) {
    ctx.save();
    ctx.fillStyle = "rgba(9, 12, 22, 0.9)";
    roundRect(ctx, VIEWPORT.width - 248, 18, 220, 124, 14);
    ctx.fill();
    ctx.strokeStyle = streamState.complete ? "rgba(255,216,102,0.3)" : "rgba(255,90,171,0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = streamState.complete ? "#ffd866" : "#ff7fb4";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(streamState.complete ? "▶ STREAM RESULT" : "● LIVE NOW", VIEWPORT.width - 228, 44);
    ctx.fillStyle = "#f5fbff";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(String(streamState.viewers || 0), VIEWPORT.width - 228, 84);
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(220,240,255,0.7)";
    ctx.fillText("視聴者数", VIEWPORT.width - 130, 84);
    ctx.fillStyle = "#f5fbff";
    ctx.font = "13px sans-serif";
    ctx.fillText(streamState.liveLabel, VIEWPORT.width - 228, 112);
    ctx.restore();
  }

  // ── PC近傍：収益ダッシュボード ──
  if (nearPc && !streamState) {
    ctx.save();
    ctx.fillStyle = "rgba(6, 10, 20, 0.92)";
    roundRect(ctx, VIEWPORT.width - 258, VIEWPORT.height - 182, 230, 162, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(100,200,255,0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = tone?.glow || "#8cdfff";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("PC  収益ダッシュボード", VIEWPORT.width - 238, VIEWPORT.height - 154);
    ctx.fillStyle = "rgba(200,240,255,0.55)";
    ctx.fillRect(VIEWPORT.width - 238, VIEWPORT.height - 148, 190, 1);
    ctx.fillStyle = "rgba(220,244,255,0.8)";
    ctx.font = "12px sans-serif";
    ctx.fillText(`配信回数: ${gameState.house.streamCount || 0} 回`, VIEWPORT.width - 238, VIEWPORT.height - 126);
    ctx.fillText(`累計収益: ${formatCurrency(gameState.house.totalEarned || 0)}`, VIEWPORT.width - 238, VIEWPORT.height - 104);
    ctx.fillText(`配信レベル: Lv${gameState.house.level}`, VIEWPORT.width - 238, VIEWPORT.height - 82);
    ctx.fillText(`視聴者数: ${getStreamViewerRange()}`, VIEWPORT.width - 238, VIEWPORT.height - 60);
    if (gameState.house.cooldown > 0) {
      ctx.fillStyle = "#ffd866";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(`クールダウン: ${gameState.house.cooldown.toFixed(1)} 秒`, VIEWPORT.width - 238, VIEWPORT.height - 36);
    } else {
      ctx.fillStyle = "#79ffb5";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("E: 配信開始", VIEWPORT.width - 238, VIEWPORT.height - 36);
    }
    ctx.restore();
  }

  // ── 出口ドア表示 ──
  const nearExit = rectContainsPoint(houseState.exitZone, houseState.player.x, houseState.player.y);
  ctx.save();
  if (nearExit) {
    ctx.shadowColor = "#ffe080";
    ctx.shadowBlur = 18;
  }
  ctx.strokeStyle = nearExit ? "rgba(255,224,128,0.7)" : "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(houseState.exitZone.x, houseState.exitZone.y, houseState.exitZone.width, houseState.exitZone.height);
  ctx.fillStyle = nearExit ? "#ffe080" : "#c8e8ff";
  ctx.font = `bold ${nearExit ? 13 : 11}px sans-serif`;
  ctx.fillText("EXIT", houseState.exitZone.x + 36, houseState.exitZone.y - 6);
  ctx.restore();
}

function render() {
  if (isInteriorMode()) {
    ctx.clearRect(0, 0, VIEWPORT.width, VIEWPORT.height);
    drawInteriorMission();
    return;
  }

  if (isHouseMode()) {
    drawHouseInterior();
    return;
  }

  ctx.clearRect(0, 0, VIEWPORT.width, VIEWPORT.height);
  ctx.save();
  ctx.translate(-camera.x + screenShake.x, -camera.y + screenShake.y);
  drawBackground();
  mapData.roads.forEach(drawRoadDetails);
  drawRoadStains();
  drawBuildings();
  drawProps();
  drawDeliveryPoints();
  drawMissionVehicle();
  drawTaxiMissionActors();
  drawRescueMissionActors();
  drawCashoutMissionActors();
  drawShopMarkers();
  drawOwnedHouseMarker();
  drawCars();
  drawPedestrians();
  drawHeadlights();
  drawPlayer();
  drawParticles();
  drawNeonOverlay();
  drawTimeOfDayOverlay();
  ctx.restore();

  drawSpeedHUD();

  if (gameState.isWorldMapOpen) {
    drawWorldMap();
  }
}

function gameLoop(timestamp) {
  if (!gameState.lastTime) {
    gameState.lastTime = timestamp;
  }

  const deltaTime = Math.min((timestamp - gameState.lastTime) / 1000, 0.033);
  gameState.lastTime = timestamp;

  updateTimeSystem(deltaTime);
  movePlayer(deltaTime);
  if (!isInteriorMode() && !isHouseMode()) {
    updateNpcCars(deltaTime);
    updatePedestrians(deltaTime);
    updateRescueVan(deltaTime);
    updateHackMinigame(deltaTime);
    updateCashoutCombat(deltaTime);
  } else {
    if (isInteriorMode()) {
      updateInteriorCombat(deltaTime);
    }
  }
  updateHouseStreaming(deltaTime);
  updateMissionProgress(deltaTime);
  updateShopInteraction();
  if (isInteriorMode()) {
    updateInteriorCamera(deltaTime);
  } else {
    if (!isHouseMode()) {
      updateCamera();
    }
  }
  updateParticles(deltaTime);
  updateScreenShake(deltaTime);
  trackFootstep(deltaTime);
  updateSceneMusic();
  updateNavigationGuide();
  updatePhoneMapPlayerPin();
  updateHUD();
  render();

  window.requestAnimationFrame(gameLoop);
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

if (acceptMissionButton) {
  acceptMissionButton.addEventListener("click", () => startMission("food"));
}
if (startPostingButton) {
  startPostingButton.addEventListener("click", () => startMission("posting"));
}
if (mapButton) {
  mapButton.addEventListener("click", () => openPhoneScreen("map"));
}
if (foodDeliveryButton) {
  foodDeliveryButton.addEventListener("click", () => openPhoneScreen("food"));
}
if (vehicleButton) {
  vehicleButton.addEventListener("click", () => openPhoneScreen("vehicle"));
}
if (postingButton) {
  postingButton.addEventListener("click", () => openPhoneScreen("posting"));
}
if (taxiButton) {
  taxiButton.addEventListener("click", () => openPhoneScreen("taxi"));
}
if (specialOpsButton) {
  specialOpsButton.addEventListener("click", () => openPhoneScreen("special"));
}
if (housingButton) {
  housingButton.addEventListener("click", () => openPhoneScreen("housing"));
}
if (premiumButton) {
  premiumButton.addEventListener("click", () => openPhoneScreen("premium"));
}
if (mapHomeButton) {
  mapHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (foodHomeButton) {
  foodHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (vehicleHomeButton) {
  vehicleHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (postingHomeButton) {
  postingHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (taxiHomeButton) {
  taxiHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (specialHomeButton) {
  specialHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (housingHomeButton) {
  housingHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}
if (premiumHomeButton) {
  premiumHomeButton.addEventListener("click", () => openPhoneScreen("home"));
}

[
  phoneHomeScreen,
  mapAppScreen,
  foodAppScreen,
  postingAppScreen,
  taxiAppScreen,
  vehicleAppScreen,
  specialOpsScreen,
  housingAppScreen,
  premiumAppScreen,
].forEach((view) => {
  if (!view) {
    return;
  }
  view.addEventListener("scroll", updatePhoneScrollIndicator);
});

if (phoneScrollIndicator) {
  phoneScrollIndicator.addEventListener("click", () => {
    const activeScreen = getActivePhoneView();
    if (!activeScreen) {
      return;
    }
    activeScreen.scrollBy({
      top: Math.max(160, activeScreen.clientHeight * 0.6),
      behavior: "smooth",
    });
  });
}
debugTimeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const segmentKey = button.dataset.timeOfDay;
    if (!segmentKey) {
      return;
    }
    setGameTimeToSegment(segmentKey);
  });
});
if (startSpecialButton) {
  startSpecialButton.addEventListener("click", () => startMission("special"));
}
if (startSmallMissionButton) {
  startSmallMissionButton.addEventListener("click", () => startMission("smallMission"));
}
if (startRescueButton) {
  startRescueButton.addEventListener("click", () => startMission("rescue"));
}
if (startCashoutButton) {
  startCashoutButton.addEventListener("click", () => startMission("cashout"));
}
if (startTaxiButton) {
  startTaxiButton.addEventListener("click", startTaxiJob);
}
if (endTaxiButton) {
  endTaxiButton.addEventListener("click", () => endTaxiJob());
}
if (enterShopButton) {
  enterShopButton.addEventListener("click", () => {
    if (isNearbyShopType("carshop")) {
      openCarShopScreen();
      return;
    }
    openBikeShopScreen();
  });
}
if (closeBikeShopButton) {
  closeBikeShopButton.addEventListener("click", closeBikeShopScreen);
}
if (closeCarShopButton) {
  closeCarShopButton.addEventListener("click", closeCarShopScreen);
}
if (closeHackButton) {
  closeHackButton.addEventListener("click", () => {
    if (mission.stage === "hacking") {
      mission.stage = "playerNearVan";
      if (mission.hack) {
        mission.hack.active = false;
      }
      updateHUD();
    }
    setHackOverlayOpen(false);
  });
}
if (startHackButton) {
  startHackButton.addEventListener("click", startHackMinigame);
}
if (hackStopButton) {
  hackStopButton.addEventListener("click", stopHackReel);
}
if (accountButton) {
  accountButton.addEventListener("click", () => setAccountOverlayOpen(true));
}
if (closeAccountButton) {
  closeAccountButton.addEventListener("click", () => setAccountOverlayOpen(false));
}
if (accountLoginButton) {
  accountLoginButton.addEventListener("click", () => submitAccountForm("login"));
}
if (accountRegisterButton) {
  accountRegisterButton.addEventListener("click", () => submitAccountForm("register"));
}
if (accountLogoutButton) {
  accountLogoutButton.addEventListener("click", async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    } else {
      clearAuthSession();
      updateAccountUi();
    }
    showToast("ログアウトしました");
  });
}

window.addEventListener("keydown", (event) => {
  if (gameState.isAccountOverlayOpen && event.code === "Escape") {
    event.preventDefault();
    setAccountOverlayOpen(false);
    return;
  }
  if (gameState.isAccountOverlayOpen) {
    return;
  }
  if (gameState.isHackOverlayOpen) {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      if (mission.stage === "hacking") {
        stopHackReel();
      }
      return;
    }
    if (event.code === "Escape") {
      event.preventDefault();
      setHackOverlayOpen(false);
      if (mission.stage === "hacking" && mission.hack) {
        mission.stage = "playerNearVan";
        mission.hack.active = false;
        updateHUD();
      }
      return;
    }
  }
  if (event.code === "Space") {
    event.preventDefault();
    inputState.fireHeld = true;
  }
  if (event.code === "KeyR") {
    event.preventDefault();
  }
  if (event.code === "Escape" && gameState.isShopOpen) {
    event.preventDefault();
    closeActiveShopScreen();
    return;
  }
  if (event.code === "Escape" && isHouseMode()) {
    event.preventDefault();
    exitOwnedHouse();
    return;
  }
  if (event.code === "Escape" && gameState.isDebugPanelOpen) {
    event.preventDefault();
    toggleDebugPanel(false);
    return;
  }
  if (event.code === "KeyM" && !event.repeat) {
    event.preventDefault();
    if (isInteriorMode() || isHouseMode()) {
      showToast("屋内ではデバッグパネルとマップを開けません");
      return;
    }
    if (event.shiftKey) {
      toggleWorldMap();
      return;
    }
    toggleDebugPanel();
    return;
  }
  if (event.code === "KeyG" && !event.repeat) {
    event.preventDefault();
    const delta = event.shiftKey ? -DEBUG_MONEY_STEP : DEBUG_MONEY_STEP;
    if (delta > 0) {
      addMoney(delta, "デバッグ加算", { source: "premium" });
      showToast(`デバッグ: 所持金 +${formatCurrency(DEBUG_MONEY_STEP)}`);
    } else if (spendMoney(Math.abs(delta), "デバッグ減算", { source: "purchase" })) {
      showToast(`デバッグ: 所持金 -${formatCurrency(DEBUG_MONEY_STEP)}`);
    } else {
      showToast("デバッグ減算に必要な所持金が足りません");
    }
    return;
  }
  if (event.code === "KeyE" && !event.repeat) {
    event.preventDefault();
    if (isHouseMode()) {
      if (rectContainsPoint(houseState.exitZone, houseState.player.x, houseState.player.y)) {
        exitOwnedHouse();
        return;
      }
      if (rectContainsPoint(houseState.pcZone, houseState.player.x, houseState.player.y)) {
        startHouseStream();
        return;
      }
      return;
    }
    if (gameState.ridingVehicleId) {
      if (isTaxiJobActive() && gameState.ridingVehicleId === TAXI_VEHICLE.id) {
        showToast("タクシー営業中は車両を離れられません");
        return;
      }
      if (gameState.ridingVehicleId === MISSION_VEHICLE.id && isSpecialMissionActive()) {
        showToast("任務用車両は作戦完了まで降りられません");
        return;
      }
      dismountVehicle();
      return;
    }
    if (isPlayerNearOwnedHouse()) {
      enterOwnedHouse();
      return;
    }
    tryPurchaseNearbyShop();
    return;
  }
  keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    inputState.fireHeld = false;
  }
  keys[event.code] = false;
});

window.addEventListener("blur", () => {
  resetTransientInputState();
});

gameState.money = ECONOMY.startingMoney;
const _didLoadSave = loadGame();
setSelectedJobType(gameState.selectedJobType);
updatePhoneScreen();
updateHUD();
updateButtonState();
updateInventoryStatus();
updateVehicleApp();
renderBikeShopItems();
renderCarShopItems();
renderHousingApp();
updateHousingUI();
updateShopInteraction();
updateCamera();
updateNavigationGuide();
updateEnterShopButton();
updatePhoneMapPlayerPin();
updateOverlayMode();
updateAccountUi();
renderPremiumShop();
initializeSupabaseAuth();

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    AudioEngine.primeBgm();
  }, { once: true });
});

// Wire up sound toggle button
const soundToggleBtn = document.getElementById("sound-toggle-button");
if (soundToggleBtn) {
  soundToggleBtn.addEventListener("click", () => {
    const muted = AudioEngine.toggleMute();
    soundToggleBtn.textContent = muted ? "🔇" : "🔊";
    soundToggleBtn.title = muted ? "ミュート中 (クリックで解除)" : "サウンドON (クリックでミュート)";
  });
}

render();
if (_didLoadSave) {
  window.setTimeout(() => showToast("セーブデータを読み込みました"), 400);
}
window.requestAnimationFrame(gameLoop);
