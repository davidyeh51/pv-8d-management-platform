/* 知識庫首頁渲染：KPI、MECE 分類樹、案例卡、Lesson Learned、URL 狀態同步 */
(function () {
  const KB = window.PV8D_KB;
  const S = window.KBSearch;
  const $ = sel => document.querySelector(sel);
  const docs = S.buildIndex(KB);
  const state = { q: "", cat: "", type: "", sev: "" };
  let lastView = { cases: [], lessons: [] };

  // ── theme ──
  const root = document.documentElement;
  try { const t = localStorage.getItem("kb-theme"); if (t) root.setAttribute("data-theme", t); } catch (e) {}
  $("#theme-toggle").addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("kb-theme", next); } catch (e) {}
  });

  // ── static parts ──
  $("#hero-title").textContent = KB.meta.governingThought;
  $("#foot-meta").textContent = `${KB.meta.owner}｜${KB.meta.name} v${KB.meta.version}｜更新 ${KB.meta.updated}`;

  const lessonCount = KB.cases.reduce((n, c) => n + (c.lessons || []).length, 0);
  const fieldCount = KB.cases.filter(c => c.type === "field").length;
  $("#kpi-row").innerHTML = [
    { v: KB.cases.length, l: `8D 案例（實際案場 ${fieldCount}・知識卡 ${KB.cases.length - fieldCount}）` },
    { v: lessonCount, l: "可執行 Lesson Learned", accent: true },
    { v: KB.taxonomy.length, l: "MECE 故障分類" },
    { v: KB.principles.length, l: "跨案場通用原則" }
  ].map(k => `<div class="kpi${k.accent ? " accent" : ""}"><div class="v">${k.v}</div><div class="l">${k.l}</div></div>`).join("");

  const QUICK = ["週末發電歸零", "Voc 升高", "清晨跳脫", "熱斑", "PID", "連接器燒熔", "降額", "斷訊", "清洗", "颱風"];
  $("#quick-chips").innerHTML = QUICK.map(q => `<button type="button" class="chip" data-q="${q}">${q}</button>`).join("");
  $("#quick-chips").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    state.q = b.dataset.q; $("#q").value = state.q; update(true);
  });

  $("#principles").innerHTML = KB.principles.map(p =>
    `<div class="principle"><span class="k">${p.id}</span><b>${S.escapeHtml(p.title)}</b><p>${S.escapeHtml(p.desc)}</p></div>`).join("");

  // ── events ──
  $("#search-form").addEventListener("submit", e => { e.preventDefault(); state.q = $("#q").value.trim(); update(true); });
  let timer;
  $("#q").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { state.q = $("#q").value.trim(); update(false); }, 160); });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== $("#q")) { e.preventDefault(); $("#q").focus(); }
  });
  $("#tax-grid").addEventListener("click", e => {
    const b = e.target.closest(".tax"); if (!b) return;
    state.cat = state.cat === b.dataset.k ? "" : b.dataset.k; update(false);
  });
  [["#type-seg", "type"], ["#sev-seg", "sev"]].forEach(([sel, key]) => {
    $(sel).addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      state[key] = b.dataset.v; update(false);
    });
  });
  $("#clear-all").addEventListener("click", () => { Object.assign(state, { q: "", cat: "", type: "", sev: "" }); $("#q").value = ""; update(false); });
  $("#case-cards").addEventListener("click", e => {
    const b = e.target.closest("[data-toggle]"); if (!b) return;
    const card = b.closest(".card"); card.classList.toggle("open");
    b.textContent = card.classList.contains("open") ? "收合詳情" : "展開 SCQA / 檢查清單";
  });
  $("#dl-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ query: state, cases: lastView.cases, lessons: lastView.lessons }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "pv8d-kb-search.json"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // ── URL state ──
  function readUrl() {
    const p = new URLSearchParams(location.search);
    state.q = p.get("q") || ""; state.cat = p.get("cat") || ""; state.type = p.get("type") || ""; state.sev = p.get("sev") || "";
    $("#q").value = state.q;
  }
  function writeUrl() {
    const p = new URLSearchParams();
    Object.entries(state).forEach(([k, v]) => { if (v) p.set(k, v); });
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  }

  // ── render ──
  function passFilter(c) {
    return (!state.cat || c.category === state.cat) && (!state.type || c.type === state.type) && (!state.sev || c.severity === state.sev);
  }

  function update(scroll) {
    const { toks, results, mode } = S.search(docs, state.q);
    const caseHits = new Map(), lessonHits = [];
    results.forEach(r => {
      if (r.doc.kind === "case") { if (passFilter(r.doc.ref)) caseHits.set(r.doc.ref.id, r.score); }
      else if (passFilter(r.doc.parent)) lessonHits.push(r.doc);
    });
    // 課題命中也讓所屬案例出現
    lessonHits.forEach(d => { if (!caseHits.has(d.parent.id)) caseHits.set(d.parent.id, 0.5); });

    const cases = [...caseHits.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => KB.cases.find(c => c.id === id));
    const matchedLessonIds = new Set(state.q ? lessonHits.map(d => d.ref.id) : []);

    renderTaxonomy(toks);
    renderCases(cases, toks, matchedLessonIds);
    renderLessons(state.q ? lessonHits.map(d => ({ l: d.ref, c: d.parent })) :
      KB.cases.filter(passFilter).flatMap(c => (c.lessons || []).map(l => ({ l, c }))), toks);

    document.querySelectorAll("#type-seg button").forEach(b => b.classList.toggle("on", b.dataset.v === state.type));
    document.querySelectorAll("#sev-seg button").forEach(b => b.classList.toggle("on", b.dataset.v === state.sev));

    const cat = KB.taxonomy.find(t => t.key === state.cat);
    const bits = [];
    if (state.q) bits.push(`「${state.q}」`);
    if (cat) bits.push(`分類 ${cat.key} ${cat.name}`);
    $("#result-meta").textContent = (bits.length ? bits.join("・") + "：" : "") +
      `${cases.length} 個案例・${$("#lesson-grid").querySelectorAll("[data-lid]").length} 條教訓` + (mode === "or" && state.q && cases.length ? "（無完全符合，顯示部分符合）" : "");

    lastView = { cases: cases.map(c => c.id), lessons: [...$("#lesson-grid").querySelectorAll("[data-lid]")].map(n => n.dataset.lid) };
    writeUrl();
    if (scroll && state.q) document.getElementById("cases").scrollIntoView({ behavior: "smooth" });
  }

  function renderTaxonomy() {
    $("#tax-grid").innerHTML = KB.taxonomy.map(t => {
      const n = KB.cases.filter(c => c.category === t.key).length;
      return `<button type="button" class="tax${state.cat === t.key ? " on" : ""}" data-k="${t.key}" title="${S.escapeHtml(t.desc)}">
        <span class="k">${t.key}</span><span class="c">${n}</span>
        <span class="n">${t.name}</span><span class="d">${t.examples}</span></button>`;
    }).join("");
  }

  function renderCases(cases, toks, matchedLessonIds) {
    const H = s => S.highlight(s, toks);
    if (!cases.length) {
      $("#case-cards").innerHTML = `<div class="empty">找不到符合的案例。建議改用「現象」描述（如：電壓升高、發電歸零、告警名稱），或清除分類條件。</div>`;
      return;
    }
    $("#case-cards").innerHTML = cases.map(c => {
      const cat = KB.taxonomy.find(t => t.key === c.category);
      const ml = (c.lessons || []).filter(l => matchedLessonIds.has(l.id));
      return `<article class="card" id="card-${c.id}">
        <div class="card-top">
          <span class="badge ${c.type === "field" ? "field" : "tpl"}">${c.type === "field" ? "實際案場" : "典型知識卡"}</span>
          <span class="badge">${H(c.id)}</span>
          <span class="badge">${cat.key} ${cat.name}</span>
          <span class="badge sev-${c.severity}">風險 ${c.severity}</span>
        </div>
        <h3>${H(c.title)}</h3>
        <p class="gt">${H(c.governingThought)}</p>
        <p class="kv"><b>根因：</b>${H(c.rootCause)}</p>
        <p class="kv"><b>案場：</b>${H(c.site)}｜${H(c.capacity)}｜${H(c.status)}</p>
        <div class="sym">${(c.symptoms || []).map(s => `<span>${H(s)}</span>`).join("")}</div>
        ${ml.length ? `<div class="matched-lessons"><b>命中教訓：</b>${ml.map(l => H(l.title)).join("；")}</div>` : ""}
        <div class="detail">
          <dl class="scqa">
            <dt>S</dt><dd>${H(c.scqa.s)}</dd><dt>C</dt><dd>${H(c.scqa.c)}</dd>
            <dt>Q</dt><dd>${H(c.scqa.q)}</dd><dt>A</dt><dd><b>${H(c.scqa.a)}</b></dd>
          </dl>
          <h4>現場檢查清單</h4>
          <ul>${(c.checklist || []).map(x => `<li>${H(x)}</li>`).join("")}</ul>
          <h4>永久對策（依優先序）</h4>
          <ul>${(c.solutions || []).map(s => `<li><b>[${S.escapeHtml(s.priority)}]</b> ${H(s.name)}｜成本 ${H(s.cost)}｜${H(s.effect)}</li>`).join("")}</ul>
        </div>
        <div class="card-actions">
          <a class="btn" href="deck.html?id=${encodeURIComponent(c.id)}">8D 知識卡簡報 →</a>
          ${c.deck ? `<a class="btn accent" href="${c.deck.url}" title="${S.escapeHtml(c.deck.label)}">完整互動簡報 →</a>` : ""}
          <button type="button" class="btn ghost" data-toggle>展開 SCQA / 檢查清單</button>
        </div>
      </article>`;
    }).join("");
  }

  function renderLessons(items, toks) {
    const H = s => S.highlight(s, toks);
    $("#lesson-grid").innerHTML = items.length ? items.map(({ l, c }) => `<div class="lesson" data-lid="${l.id}">
        <span class="badge">${l.id}</span>
        <div class="lt">${H(l.title)}</div>
        <p>${H(l.insight)}</p>
        <p class="act">${H(l.action)}</p>
        <div class="src">來源：<a href="deck.html?id=${encodeURIComponent(c.id)}#lessons">${S.escapeHtml(c.id)}</a> ${S.escapeHtml(c.title)}</div>
      </div>`).join("") : `<div class="empty" style="grid-column:1/-1">沒有符合條件的教訓。</div>`;
  }

  readUrl();
  update(false);
})();
