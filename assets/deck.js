/* 通用 8D 簡報產生器：deck.html?id=案號 → 由 data/kb-data.js 自動組出 7 頁麥肯錫風格簡報 */
(function () {
  const KB = window.PV8D_KB;
  const E = window.KBSearch.escapeHtml;
  const $ = s => document.querySelector(s);
  const id = new URLSearchParams(location.search).get("id");
  const c = KB.cases.find(x => x.id === id);

  if (!c) {
    $("#deck").innerHTML = `<section class="slide active"><div class="tag">NOT FOUND</div>
      <h2 class="action-title">找不到案號「${E(id || "")}」，請回知識庫首頁重新選擇</h2>
      <p>${KB.cases.map(x => `<a href="deck.html?id=${encodeURIComponent(x.id)}">${E(x.id)}</a>`).join("・")}</p></section>`;
    $("#deck-nav").style.display = "none";
    return;
  }

  document.title = `${c.id}｜8D 知識卡簡報`;
  $("#deck-id").textContent = `｜${c.id}`;
  if (c.deck) { const a = $("#full-deck"); a.href = c.deck.url; a.style.display = ""; }
  const cat = KB.taxonomy.find(t => t.key === c.category);
  const stageName = code => (KB.stages.find(s => s.code === code) || {}).name || "";
  const tplNote = c.type === "template"
    ? `<div class="notice">本頁為「產業典型知識卡」教學範本：內容為通用工程經驗與判讀方法，非特定案場實測數據；實際引用前請以案場數據驗證。</div>` : "";
  const dRow = code => `<div class="dc">${code}</div><div class="dd"><b>${stageName(code)}</b><span>${E(c.d[code])}</span></div>`;

  const slides = [
    {
      key: "cover", tab: "封面",
      html: `<div class="tag">8D REPORT · ${E(c.id)} · ${E(cat.key)} ${E(cat.name)}</div>
        <h2 class="action-title">${E(c.governingThought)}</h2>
        <p class="sub">${E(c.title)}</p>
        <div class="grid-3" style="margin:22px 0">${c.keyFacts.map(k => `<div class="fact${k.accent ? " accent" : ""}">
          <div class="l">${E(k.label)}</div><div class="v">${E(k.value)}</div><div class="n">${E(k.note)}</div></div>`).join("")}</div>
        <table class="tbl"><tbody>
          <tr><td class="code">案場</td><td>${E(c.site)}｜${E(c.capacity)}｜${E(c.siteType)}</td></tr>
          <tr><td class="code">設備 / 失效模式</td><td>${E(c.equipment)}｜${E(c.faultMode)}</td></tr>
          <tr><td class="code">風險 / 損失型態</td><td>${E(c.severity)}｜${E(c.lossType)}</td></tr>
          <tr><td class="code">狀態 / 報告日</td><td>${E(c.status)}｜${E(c.reportDate)}</td></tr>
        </tbody></table>`
    },
    {
      key: "scqa", tab: "SCQA",
      html: `<div class="tag">EXECUTIVE SUMMARY · SCQA 問題界定</div>
        <h2 class="action-title">${E(c.scqa.a)}</h2>
        <div class="scqa-big">
          <div class="q"><b>S 情境</b>${E(c.scqa.s)}</div>
          <div class="q"><b>C 衝突</b>${E(c.scqa.c)}</div>
          <div class="q"><b>Q 關鍵問題</b>${E(c.scqa.q)}</div>
          <div class="q a"><b>A 答案</b>${E(c.scqa.a)}</div>
        </div>
        <h3 style="margin-top:22px;font-size:15px">現象指紋（搜尋關鍵字）</h3>
        <div class="sym">${c.symptoms.map(s => `<span>${E(s)}</span>`).join("")}</div>${tplNote}`
    },
    {
      key: "d0d3", tab: "D0~D3",
      html: `<div class="tag">D0 – D3 · 安全、團隊、量化與止血</div>
        <h2 class="action-title">${E(c.d.D0)}</h2>
        <div class="dlist">${["D0", "D1", "D2", "D3"].map(dRow).join("")}</div>`
    },
    {
      key: "d4", tab: "D4 根因",
      html: `<div class="tag">D4 · HYPOTHESIS-DRIVEN · MECE 假說檢定</div>
        <h2 class="action-title">${E(c.rootCause)}</h2>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>假說</th><th>檢定方法</th><th>證據</th><th>判定</th></tr></thead>
          <tbody>${c.hypotheses.map(h => `<tr><td>${E(h.h)}</td><td>${E(h.test)}</td><td>${E(h.evidence)}</td>
            <td><span class="verdict ${E(h.verdict)}">${E(h.verdict)}</span></td></tr>`).join("")}</tbody>
        </table></div>
        <p style="font-size:13.5px;color:var(--muted)">${E(c.d.D4)}</p>${tplNote}`
    },
    {
      key: "d5", tab: "D5 對策",
      html: `<div class="tag">D5 · PERMANENT SOLUTIONS · 方案比選（80/20 先止血）</div>
        <h2 class="action-title">${E(c.d.D5)}</h2>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>優先序</th><th>方案</th><th>成本</th><th>效益</th></tr></thead>
          <tbody>${c.solutions.map(s => `<tr><td class="code">${E(s.priority)}</td><td>${E(s.name)}</td><td>${E(s.cost)}</td><td>${E(s.effect)}</td></tr>`).join("")}</tbody>
        </table></div>`
    },
    {
      key: "d6d8", tab: "D6~D8",
      html: `<div class="tag">D6 – D8 · 驗證、制度化與結案</div>
        <h2 class="action-title">${E(c.d.D7)}</h2>
        <div class="dlist">${["D6", "D7", "D8"].map(dRow).join("")}</div>`
    },
    {
      key: "lessons", tab: "Lesson Learned",
      html: `<div class="tag">SO WHAT · LESSON LEARNED & FIELD CHECKLIST</div>
        <h2 class="action-title">下次遇到「${E(c.symptoms[0])}」：先照右側清單檢查，再套用左側 ${c.lessons.length} 條教訓</h2>
        <div class="grid-2">
          <div>${c.lessons.map(l => `<div class="lesson" style="margin-bottom:10px"><span class="badge">${E(l.id)}</span>
            <div class="lt">${E(l.title)}</div><p>${E(l.insight)}</p><p class="act">${E(l.action)}</p></div>`).join("")}</div>
          <div class="rc"><b>現場檢查清單</b><ol>${c.checklist.map(x => `<li>${E(x)}</li>`).join("")}</ol></div>
        </div>`
    }
  ];

  const deck = $("#deck");
  deck.innerHTML = slides.map((s, i) => `<section class="slide${i === 0 ? " cover" : ""}" id="${s.key}" data-i="${i}">${s.html}</section>`).join("");
  $("#deck-tabs").innerHTML = slides.map((s, i) => `<button type="button" data-i="${i}">${s.tab}</button>`).join("");

  let cur = 0;
  function go(i) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    deck.querySelectorAll(".slide").forEach((el, k) => el.classList.toggle("active", k === cur));
    $("#deck-tabs").querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === cur));
    $("#count").textContent = `${cur + 1} / ${slides.length}`;
    if (deck.classList.contains("all")) document.getElementById(slides[cur].key).scrollIntoView({ behavior: "smooth" });
  }
  $("#deck-tabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) go(+b.dataset.i); });
  $("#prev").addEventListener("click", () => go(cur - 1));
  $("#next").addEventListener("click", () => go(cur + 1));
  $("#mode").addEventListener("click", () => {
    const all = deck.classList.toggle("all");
    $("#mode").textContent = all ? "🖥 簡報翻頁模式" : "📄 完整報告模式";
  });
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "PageDown") go(cur + 1);
    if (e.key === "ArrowLeft" || e.key === "PageUp") go(cur - 1);
  });
  const start = slides.findIndex(s => "#" + s.key === location.hash);
  go(start >= 0 ? start : 0);
})();
