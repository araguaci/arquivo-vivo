const STORE_READ = "arquivo_vivo_completed";
const STORE_PROTO = "arquivo_vivo_protocol_by_id";
const TRILHAS = { 1: "Resolução Prática", 2: "Transmissão", 3: "Contribuição Coletiva" };
const PROTO_STEPS = [
  { id: "leitura", label: "Li o detalhamento desta ficha." },
  { id: "fontes", label: "Conferi as fontes listadas." },
  { id: "especifico", label: "O caso é específico — não é conteúdo motivacional genérico." },
  { id: "vinte", label: "Passa no teste dos 20 anos." },
  { id: "evidencia", label: "A classificação evidencial desta ficha está clara." },
  { id: "rastro", label: "Separei fato, lacuna e análise." }
];

let entries = [];
let filterTrilha = "all";
let filterEv = "all";
let openId = null;

const $ = (id) => document.getElementById(id);
const readList = () => JSON.parse(localStorage.getItem(STORE_READ) || "[]");
const protoMap = () => JSON.parse(localStorage.getItem(STORE_PROTO) || "{}");
const protoFor = (id) => protoMap()[id] || [];
const protoDone = (id) => protoFor(id).length >= PROTO_STEPS.length;

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1600);
}

function syncReadFromProtocol() {
  const done = entries.filter((e) => protoDone(e.id)).map((e) => e.id);
  localStorage.setItem(STORE_READ, JSON.stringify(done));
}

function updateScoreUI() {
  syncReadFromProtocol();
  const done = readList();
  const total = entries.length;
  const pct = total ? Math.round((done.length / total) * 100) : 0;
  $("score-pill").innerHTML = `Lidos <strong>${done.length}/${total}</strong>`;
  $("stat-score").textContent = pct + "%";
  $("progress-bar").style.width = pct + "%";
}

function setProto(id, step, on) {
  const map = protoMap();
  const cur = new Set(map[id] || []);
  if (on) cur.add(step);
  else cur.delete(step);
  map[id] = [...cur];
  localStorage.setItem(STORE_PROTO, JSON.stringify(map));
  updateScoreUI();
  render();
  if (openId === id) paintFicha(id);
}

async function copyText(text, ok) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      toast(ok);
      return;
    }
    throw new Error("fallback");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const copied = document.execCommand("copy");
    ta.remove();
    toast(copied ? ok : "Não foi possível copiar");
  }
}

function cite(e) {
  const fontes = (e.fontes || []).map((f) => f.url).join("\n");
  return `${e.id} — ${e.titulo}\n${e.resumo}\nRegião: ${e.regiao || "—"} · Evento: ${e.data_evento} · ${e.evidencia}\nhttps://arquivo-vivo-omega.vercel.app/#${e.id}\n${fontes}`;
}

function matches(e, q) {
  if (!q) return true;
  const blob = [e.id, e.titulo, e.resumo, e.regiao, e.evidencia, ...(e.tags || [])].join(" ").toLowerCase();
  return blob.includes(q);
}

function render() {
  const q = $("q").value.trim().toLowerCase();
  const list = entries.filter((e) => {
    if (filterTrilha !== "all" && String(e.trilha) !== filterTrilha) return false;
    if (filterEv !== "all" && e.evidencia !== filterEv) return false;
    return matches(e, q);
  });
  const box = $("entries");
  if (!list.length) {
    box.innerHTML = `<div class="empty"><p class="mono">Nenhum caso neste recorte.</p></div>`;
    return;
  }
  box.innerHTML = list.map((e) => {
    const n = protoFor(e.id).length;
    const img = e.imagem || "assets/arquivo-vivo-hero.png";
    return `<article class="entry${protoDone(e.id) ? " is-done" : ""}" id="${e.id}" data-trilha="${e.trilha}" data-open="${e.id}">
      <div class="entry-visual" style="background-image:url('./${img}')" role="img" aria-hidden="true"></div>
      <div class="entry-body">
        <div class="entry-top">
          <span class="badge ${e.evidencia}">${e.evidencia}</span>
          <span class="badge mono">${e.id}</span>
          <span class="badge">${TRILHAS[e.trilha] || "Trilha " + e.trilha}</span>
        </div>
        <h3>${e.titulo}</h3>
        <p class="resumo">${e.resumo}</p>
        <p class="proto-mini">Protocolo <strong>${n}/${PROTO_STEPS.length}</strong> · ${e.regiao || "região n/d"}</p>
        <div class="actions">
          <button class="btn primary" data-act="open" data-id="${e.id}">Ler ficha</button>
          <button class="btn" data-act="cite" data-id="${e.id}">Copiar ficha</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

function paintFicha(id) {
  const e = entries.find((x) => x.id === id);
  const layer = $("ficha");
  if (!e) {
    closeFicha();
    return;
  }
  openId = id;
  const idx = entries.findIndex((x) => x.id === id);
  const prev = entries[idx - 1];
  const next = entries[idx + 1];
  const saved = protoFor(id);
  const img = e.imagem || "assets/arquivo-vivo-hero.png";
  const secoes = (e.secoes || [])
    .map((s) => `<div class="ficha-sec"><h3>${s.titulo}</h3><p>${s.texto}</p></div>`)
    .join("");
  const fontes = (e.fontes || [])
    .map((f) => `<a href="${f.url}" target="_blank" rel="noopener">${f.tipo} · ${f.data}</a>`)
    .join("<br>");
  const tags = (e.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
  const lacuna = e.lacuna_investigativa
    ? `<div class="note"><span class="mono">LACUNA</span> — ${e.lacuna_investigativa}</div>`
    : "";
  const analise = e.analise
    ? `<div class="note"><span class="mono">ANÁLISE</span> — ${e.analise}</div>`
    : "";
  const checks = PROTO_STEPS.map((s) => {
    const on = saved.includes(s.id);
    return `<label class="check${on ? " is-on" : ""}"><input type="checkbox" data-step="${s.id}" ${on ? "checked" : ""}> ${s.label}</label>`;
  }).join("");
  layer.innerHTML = `
    <div class="ficha-bar">
      <div class="ficha-nav">
        <button class="btn" data-act="close">← Catálogo</button>
        ${prev ? `<button class="btn" data-act="nav" data-id="${prev.id}">Anterior</button>` : ""}
        ${next ? `<button class="btn" data-act="nav" data-id="${next.id}">Próxima</button>` : ""}
      </div>
      <span class="score-pill">Protocolo <strong>${saved.length}/${PROTO_STEPS.length}</strong></span>
    </div>
    <div class="ficha-hero" style="background-image:url('./${img}')" role="img" aria-label="Leitura visual de ${e.id}"></div>
    <div class="ficha-wrap">
      <div class="entry-top">
        <span class="badge ${e.evidencia}">${e.evidencia}</span>
        <span class="badge mono">${e.id}</span>
        <span class="badge">${TRILHAS[e.trilha]}</span>
      </div>
      <h2 id="ficha-title">${e.titulo}</h2>
      <div class="meta"><span>${e.regiao || "região n/d"}</span><span>${e.data_evento}</span></div>
      <div class="ficha-sec"><h3>Resumo factual</h3><p>${e.resumo}</p></div>
      ${secoes}
      ${lacuna}${analise}
      <div class="ficha-sec"><h3>Fontes</h3><p>${fontes}</p></div>
      <div class="tags">${tags}</div>
      <div class="ficha-sec">
        <h3>Protocolo desta ficha</h3>
        <p style="color:var(--muted);margin-bottom:12px">A execução vale só para ${e.id}. O progresso fica neste aparelho.</p>
        ${checks}
      </div>
      <div class="actions">
        <button class="btn" data-act="cite" data-id="${e.id}">Copiar ficha</button>
        <button class="btn" data-act="id" data-id="${e.id}">Copiar ID</button>
        <button class="btn" data-act="json" data-id="${e.id}">Copiar JSON</button>
      </div>
    </div>`;
  layer.classList.add("is-open");
  document.body.classList.add("ficha-open");
  layer.scrollTop = 0;
}

function openFicha(id) {
  if (location.hash.slice(1) !== id) location.hash = id;
  else paintFicha(id);
}

function closeFicha() {
  openId = null;
  $("ficha").classList.remove("is-open");
  $("ficha").innerHTML = "";
  document.body.classList.remove("ficha-open");
  if (/^AV-\d{4}$/.test(location.hash.slice(1))) {
    history.replaceState(null, "", location.pathname + location.search + "#entries");
  }
}

function setChipGroup(root, attr, value) {
  root.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-on", c.dataset[attr] === value));
}

function bindFilters() {
  $("trilha-chips").addEventListener("click", (ev) => {
    const btn = ev.target.closest(".chip");
    if (!btn) return;
    filterTrilha = btn.dataset.trilha;
    setChipGroup($("trilha-chips"), "trilha", filterTrilha);
    document.querySelectorAll(".trilha-card").forEach((c) =>
      c.classList.toggle("is-on", c.dataset.trilha === filterTrilha)
    );
    render();
  });
  $("ev-chips").addEventListener("click", (ev) => {
    const btn = ev.target.closest(".chip");
    if (!btn) return;
    filterEv = btn.dataset.ev;
    setChipGroup($("ev-chips"), "ev", filterEv);
    render();
  });
  document.querySelectorAll(".trilha-card").forEach((card) => {
    card.addEventListener("click", () => {
      filterTrilha = card.dataset.trilha;
      setChipGroup($("trilha-chips"), "trilha", filterTrilha);
      document.querySelectorAll(".trilha-card").forEach((c) => c.classList.toggle("is-on", c === card));
      $("entries").scrollIntoView({ behavior: "smooth" });
      render();
    });
  });
  $("q").addEventListener("input", render);
  $("entries").addEventListener("click", (ev) => {
    const act = ev.target.closest("[data-act]");
    const card = ev.target.closest("[data-open]");
    if (act) {
      ev.stopPropagation();
      const item = entries.find((e) => e.id === act.dataset.id);
      if (!item) return;
      if (act.dataset.act === "open") openFicha(item.id);
      if (act.dataset.act === "cite") copyText(cite(item), "Ficha copiada");
      return;
    }
    if (card) openFicha(card.dataset.open);
  });
  $("ficha").addEventListener("click", (ev) => {
    const act = ev.target.closest("[data-act]");
    const step = ev.target.closest("[data-step]");
    if (step && openId) {
      setProto(openId, step.dataset.step, step.checked);
      return;
    }
    if (!act) return;
    if (act.dataset.act === "close") closeFicha();
    if (act.dataset.act === "nav") openFicha(act.dataset.id);
    const item = entries.find((e) => e.id === act.dataset.id);
    if (!item) return;
    if (act.dataset.act === "cite") copyText(cite(item), "Ficha copiada");
    if (act.dataset.act === "id") copyText(item.id, "ID copiado");
    if (act.dataset.act === "json") copyText(JSON.stringify(item, null, 2), "JSON copiado");
  });
  window.addEventListener("hashchange", () => {
    const hash = location.hash.slice(1);
    if (/^AV-\d{4}$/.test(hash)) paintFicha(hash);
    else if (openId) closeFicha();
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && openId) closeFicha();
  });
}

async function loadEntries() {
  const box = $("entries");
  try {
    const [catRes, detRes] = await Promise.all([
      fetch("./data/catalog.json"),
      fetch("./data/details.json")
    ]);
    if (!catRes.ok) throw new Error("catalog");
    const data = await catRes.json();
    const details = detRes.ok ? await detRes.json() : {};
    entries = (data.entradas || []).map((e) => Object.assign({}, e, details[e.id] || {}));
    $("stat-total").textContent = entries.length;
    $("stat-confirmed").textContent = entries.filter((e) => e.evidencia === "ev-confirmed").length;
    $("stat-open").textContent = entries.filter((e) => e.lacuna_investigativa).length;
    document.querySelector(".badge-float").innerHTML =
      `<i></i> Validado no Eixo SELVA · ${entries.length} casos sourceados · CC0 1.0`;
    updateScoreUI();
    render();
    const hash = location.hash.slice(1);
    if (/^AV-\d{4}$/.test(hash)) paintFicha(hash);
  } catch {
    box.innerHTML = `<div class="error"><p class="mono">Erro ao carregar o catálogo</p></div>`;
  }
}

const topBtn = $("top-btn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

bindFilters();
loadEntries();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
