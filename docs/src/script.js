const i18n = {
  "en": {
    title: "Battle Simulator",
    creatureName: "Prismarine Colossus",
    creatureDesc: "Enormous prismarine statue over 20 meters tall.",
    playerName: "Hero",
    playerDesc: "You wield your sword and prepare for battle.",
    actions: [
      { id: "sword", label: "Attack with sword", desc: "A melee strike." },
      { id: "potion", label: "Use regen potion", desc: "Restore some health." },
      { id: "throw", label: "Throw a rock", desc: "Ranged low-damage attack." },
      { id: "hide", label: "Hide", desc: "Skip turn and brace." }
    ],
    logs: {
      playerAttack: "{actor} attacked {target} for {dmg} damage.",
      playerMiss: "{actor} tried to attack but missed.",
      potionUse: "{actor} used a potion and recovered {hp} HP.",
      throw: "{actor} threw a rock and dealt {dmg} damage.",
      hide: "{actor} hid and did nothing.",
      bossAttack: "{actor} attacked {target} and dealt {dmg} damage.",
      bossMiss: "{actor} tried to attack but missed.",
      victory: "{actor} prevailed and defeated {target}.",
      defeat: "{actor} was defeated by {target}."
    }
  },
  "pt-BR": {
    title: "Simulador de Batalha",
    creatureName: "Colosso de Prismarine",
    creatureDesc: "Enorme estátua de prismarine com mais de 20 metros de altura.",
    playerName: "Herói",
    playerDesc: "Você empunha sua espada e se prepara para lutar.",
    actions: [
      { id: "sword", label: "Atacar com a espada", desc: "Um golpe corpo a corpo." },
      { id: "potion", label: "Usar poção de regeneração", desc: "Recupera um pouco de vida." },
      { id: "throw", label: "Atirar uma pedra", desc: "Ataque à distância com pouco dano." },
      { id: "hide", label: "Se esconder", desc: "Pular o turno e se preparar." }
    ],
    logs: {
      playerAttack: "{actor} atacou {target} e deu {dmg} pontos de dano.",
      playerMiss: "{actor} tentou atacar, mas errou.",
      potionUse: "{actor} usou uma poção e recuperou {hp} de vida.",
      throw: "{actor} atirou uma pedra e deu {dmg} pontos de dano.",
      hide: "{actor} se escondeu e não fez nada.",
      bossAttack: "{actor} atacou {target} e deu {dmg} pontos de dano.",
      bossMiss: "{actor} tentou atacar, mas errou.",
      victory: "{actor} prevaleceu e venceu {target}.",
      defeat: "{actor} foi derrotado por {target}."
    }
  },
  "es": {
    title: "Simulador de Batalla",
    creatureName: "Coloso de Prismarine",
    creatureDesc: "Enorme estatua de prismarine de más de 20 metros de altura.",
    playerName: "Héroe",
    playerDesc: "Empuñas tu espada y te preparas para luchar.",
    actions: [
      { id: "sword", label: "Atacar con espada", desc: "Un golpe cuerpo a cuerpo." },
      { id: "potion", label: "Usar poción de regeneración", desc: "Recupera algo de vida." },
      { id: "throw", label: "Lanzar una piedra", desc: "Ataque a distancia de bajo daño." },
      { id: "hide", label: "Esconderse", desc: "Saltar turno y prepararse." }
    ],
    logs: {
      playerAttack: "{actor} atacó a {target} e hizo {dmg} de daño.",
      playerMiss: "{actor} intentó atacar pero falló.",
      potionUse: "{actor} usó una poción y recuperó {hp} de vida.",
      throw: "{actor} lanzó una piedra e hizo {dmg} de daño.",
      hide: "{actor} se escondió y no hizo nada.",
      bossAttack: "{actor} atacó a {target} e hizo {dmg} de daño.",
      bossMiss: "{actor} intentó atacar pero falló.",
      victory: "{actor} prevaleció y derrotó a {target}.",
      defeat: "{actor} fue derrotado por {target}."
    }
  }
};

const state = {
  lang: "en",
  theme: "dark",
  player: { name: "Hero", maxHealth: 100, health: 100, attack: 4, defense: 3, speed: 3 },
  boss: { name: "Prismarine Colossus", maxHealth: 100, health: 100, attack: 5, defense: 6, speed: 2 }
};

const elements = {
  langSelect: document.getElementById("lang"),
  themeToggle: document.getElementById("theme-toggle"),
  themeIcon: document.getElementById("theme-icon"),
  themeLabel: document.getElementById("theme-label"),
  creatureName: document.getElementById("creature-name"),
  creatureDesc: document.getElementById("creature-desc"),
  bossHealth: document.getElementById("boss-health"),
  bossHealthText: document.getElementById("boss-health-text"),
  bossAttack: document.getElementById("boss-attack"),
  bossDefense: document.getElementById("boss-defense"),
  bossSpeed: document.getElementById("boss-speed"),
  playerName: document.getElementById("player-name"),
  playerDesc: document.getElementById("player-desc"),
  playerHealth: document.getElementById("player-health"),
  playerHealthText: document.getElementById("player-health-text"),
  playerAttack: document.getElementById("player-attack"),
  playerDefense: document.getElementById("player-defense"),
  playerSpeed: document.getElementById("player-speed"),
  actionList: document.getElementById("action-list"),
  log: document.getElementById("log"),
  appTitle: document.getElementById("app-title"),
  credits: document.getElementById("credits")
};

function t(key, vars = {}) {
  const txt = i18n[state.lang].logs[key] || "";
  return txt.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

function setTexts() {
  const L = i18n[state.lang];
  elements.appTitle.textContent = L.title;
  elements.creatureName.textContent = L.creatureName;
  elements.creatureDesc.textContent = L.creatureDesc;
  elements.playerName.textContent = L.playerName;
  elements.playerDesc.textContent = L.playerDesc;
  elements.bossAttack.textContent = state.boss.attack;
  elements.bossDefense.textContent = state.boss.defense;
  elements.bossSpeed.textContent = state.boss.speed;
  elements.playerAttack.textContent = state.player.attack;
  elements.playerDefense.textContent = state.player.defense;
  elements.playerSpeed.textContent = state.player.speed;
  elements.credits.textContent = `© ${L.title}`;
  renderActions();
  updateHealthUI();
}

function renderActions() {
  const actions = i18n[state.lang].actions;
  elements.actionList.innerHTML = "";
  actions.forEach((a, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "action-btn";
    btn.dataset.action = a.id;
    btn.innerHTML = `<span>${a.label}</span><small style="opacity:.7">${a.desc}</small>`;
    btn.addEventListener("click", () => playerTurn(a.id));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        playerTurn(a.id);
      }
    });
    li.appendChild(btn);
    elements.actionList.appendChild(li);
  });
}

function updateHealthUI() {
  elements.bossHealth.max = state.boss.maxHealth;
  elements.bossHealth.value = Math.max(0, state.boss.health);
  elements.bossHealthText.textContent = `${Math.max(0, state.boss.health)} / ${state.boss.maxHealth}`;

  elements.playerHealth.max = state.player.maxHealth;
  elements.playerHealth.value = Math.max(0, state.player.health);
  elements.playerHealthText.textContent = `${Math.max(0, state.player.health)} / ${state.player.maxHealth}`;
}

function logMessage(msg) {
  const p = document.createElement("div");
  p.textContent = msg;
  elements.log.prepend(p);
}

function rand() { return Math.random(); }

function calcDamage(attacker, defender) {
  const raw = attacker.attack - Math.random() * defender.defense;
  return Math.max(1, Math.ceil(raw));
}

function playerTurn(actionId) {
  if (state.player.health <= 0 || state.boss.health <= 0) return;
  switch(actionId) {
    case "sword": {
      const successChance = state.player.speed === 0 ? 1 : state.player.speed / Math.max(1, state.boss.speed);
      const hit = rand() <= successChance;
      if (hit) {
        const dmg = calcDamage(state.player, state.boss);
        state.boss.health -= dmg;
        logMessage(t("playerAttack", { actor: state.player.name, target: state.boss.name, dmg }));
      } else {
        logMessage(t("playerMiss", { actor: state.player.name }));
      }
      break;
    }
    case "potion": {
      const heal = Math.min(30, state.player.maxHealth - state.player.health);
      state.player.health += heal;
      logMessage(t("potionUse", { actor: state.player.name, hp: heal }));
      break;
    }
    case "throw": {
      const dmg = Math.max(1, Math.ceil(calcDamage(state.player, state.boss) * 0.6));
      state.boss.health -= dmg;
      logMessage(t("throw", { actor: state.player.name, dmg }));
      break;
    }
    case "hide": {
      logMessage(t("hide", { actor: state.player.name }));
      break;
    }
    default: return;
  }

  updateHealthUI();
  checkEnd();
  if (state.boss.health > 0) {
    setTimeout(bossTurn, 700);
  }
}

function bossTurn() {
  if (state.boss.health <= 0 || state.player.health <= 0) return;
  const actions = ["body", "sonar", "wait"];
  const choice = actions[Math.floor(Math.random() * actions.length)];
  if (choice === "body") {
    const successChance = state.boss.speed === 0 ? 1 : state.boss.speed / Math.max(1, state.player.speed);
    const hit = rand() <= successChance;
    if (hit) {
      const dmg = calcDamage(state.boss, state.player);
      state.player.health -= dmg;
      logMessage(t("bossAttack", { actor: state.boss.name, target: state.player.name, dmg }));
    } else {
      logMessage(t("bossMiss", { actor: state.boss.name }));
    }
  } else if (choice === "sonar") {
    const dmg = Math.max(1, Math.ceil(calcDamage(state.boss, state.player) * 0.3));
    state.player.health -= dmg;
    logMessage(t("bossAttack", { actor: state.boss.name, target: state.player.name, dmg }));
  } else {
    logMessage(t("hide", { actor: state.boss.name }));
  }

  updateHealthUI();
  checkEnd();
}

function checkEnd() {
  if (state.player.health <= 0) {
    logMessage(i18n[state.lang].logs.defeat.replace("{actor}", state.player.name).replace("{target}", state.boss.name));
    disableActions();
  } else if (state.boss.health <= 0) {
    logMessage(i18n[state.lang].logs.victory.replace("{actor}", state.player.name).replace("{target}", state.boss.name));
    disableActions();
  }
}

function disableActions() {
  document.querySelectorAll("#action-list button").forEach(b => b.disabled = true);
}

/* Theme handling */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  state.theme = theme;
  const pressed = theme === "dark";
  elements.themeToggle.setAttribute("aria-pressed", pressed ? "true" : "false");
  elements.themeLabel.textContent = pressed ? "Dark mode" : "Light mode";
  // icon swap
  elements.themeIcon.innerHTML = pressed ? 
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>` :
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;
}

/* Language handling */
elements.langSelect.addEventListener("change", (e) => {
  state.lang = e.target.value;
  setTexts();
});

/* Theme toggle */
elements.themeToggle.addEventListener("click", () => {
  const next = state.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

/* Initialize */
function init() {
  // default language and theme
  state.lang = "en";
  elements.langSelect.value = state.lang;

  // default theme: dark (user requested dark as principal)
  applyTheme("dark");

  // set names
  state.player.name = i18n[state.lang].playerName;
  state.boss.name = i18n[state.lang].creatureName;

  setTexts();

  // keyboard accessibility: focus first action
  setTimeout(() => {
    const first = document.querySelector("#action-list button");
    if (first) first.focus();
  }, 200);
}

init();
