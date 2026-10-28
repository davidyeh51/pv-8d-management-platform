/**
 * 知識庫全文搜尋引擎（純前端、零相依）
 * - 多關鍵字 AND；每個關鍵字可透過同義詞群組 OR 展開
 * - 欄位加權：標題 / 症狀 / 標籤 > 結論 / 根因 > 其他內文
 * - 中文無空白斷詞：採子字串比對，對長查詢自動退回二字詞 (bigram) 模糊比對
 */
(function () {
  const SYNONYMS = [
    ["pid", "電位誘發衰減", "電位誘導衰減"],
    ["熱斑", "hot spot", "hotspot", "熱點"],
    ["riso", "絕緣阻抗", "絕緣", "接地故障", "ground fault", "漏電"],
    ["防逆流", "zero-export", "zero export", "逆送", "零注入"],
    ["棄光", "curtailment", "限電", "降載", "功率限制"],
    ["跳脫", "trip", "跳機"],
    ["逆變器", "inverter", "變流器", "pcs"],
    ["連接器", "mc4", "接頭"],
    ["積塵", "soiling", "髒污", "污染", "灰塵", "清洗"],
    ["過溫", "降額", "derating", "高溫"],
    ["通訊", "斷訊", "離線", "scada", "資料缺漏", "datalogger"],
    ["颱風", "強風", "typhoon"],
    ["儲能", "bess", "電池"],
    ["ir", "紅外線", "熱影像"],
    ["el", "電致發光"],
    ["voc", "開路電壓"],
    ["pr", "性能比", "performance ratio"],
    ["電弧", "afci", "arc"],
    ["清晨", "早上", "晨間"]
  ];
  const synMap = new Map();
  SYNONYMS.forEach(group => group.forEach(w => synMap.set(w.toLowerCase(), group.map(x => x.toLowerCase()))));

  const norm = s => String(s == null ? "" : s).toLowerCase();

  function flattenCase(c, kb) {
    const cat = kb.taxonomy.find(t => t.key === c.category);
    const fields = {
      head: [c.id, c.title, (c.symptoms || []).join(" "), (c.tags || []).join(" "), c.equipment, c.faultMode].join(" "),
      core: [c.governingThought, c.rootCause, cat ? cat.name : "", Object.values(c.scqa || {}).join(" ")].join(" "),
      body: [
        c.site, c.siteType, c.lossType,
        Object.values(c.d || {}).join(" "),
        (c.hypotheses || []).map(h => [h.h, h.test, h.evidence, h.verdict].join(" ")).join(" "),
        (c.solutions || []).map(s => [s.name, s.cost, s.effect].join(" ")).join(" "),
        (c.checklist || []).join(" "),
        (c.lessons || []).map(l => [l.title, l.insight, l.action].join(" ")).join(" ")
      ].join(" ")
    };
    return { kind: "case", ref: c, f: { head: norm(fields.head), core: norm(fields.core), body: norm(fields.body) }, raw: fields };
  }

  function flattenLesson(l, c) {
    const text = [l.title, l.insight, l.action, c.title, (c.tags || []).join(" ")].join(" ");
    return { kind: "lesson", ref: l, parent: c, f: { head: norm(l.title), core: norm(l.insight + " " + l.action), body: norm(c.title + " " + (c.tags || []).join(" ")) }, raw: { body: text } };
  }

  function buildIndex(kb) {
    const docs = [];
    kb.cases.forEach(c => {
      docs.push(flattenCase(c, kb));
      (c.lessons || []).forEach(l => docs.push(flattenLesson(l, c)));
    });
    return docs;
  }

  function parseQuery(q) {
    return norm(q).split(/[\s,，、;；]+/).filter(Boolean).map(t => {
      const alts = new Set([t]);
      (synMap.get(t) || []).forEach(g => alts.add(g));
      // 複合詞拆解：如「清晨跳脫」= 清晨群組 AND 跳脫群組
      const parts = [];
      synMap.forEach((group, key) => {
        if (key !== t && key.length >= 2 && t.includes(key) && !parts.some(p => p.includes(key))) parts.push(group);
      });
      return { term: t, alts: [...alts], parts };
    });
  }

  const W = { head: 6, core: 3, body: 1 };
  const CJK = /[\u3400-\u9fff]/;

  function fieldScore(doc, words, exact) {
    let best = 0;
    for (const w of words) {
      for (const k of ["head", "core", "body"]) {
        if (doc.f[k].includes(w)) best = Math.max(best, W[k] * (w === exact ? 1 : 0.8));
      }
    }
    return best;
  }

  function scoreToken(doc, tok) {
    let best = fieldScore(doc, tok.alts, tok.term);
    if (best === 0 && tok.parts.length) {
      const ps = tok.parts.map(g => fieldScore(doc, g, null));
      if (ps.every(x => x > 0)) best = Math.min(...ps) * 0.7;
    }
    if (best === 0 && tok.term.length >= 3 && CJK.test(tok.term)) {
      // 中文長詞模糊比對：二字詞命中比例
      const grams = [];
      for (let i = 0; i < tok.term.length - 1; i++) grams.push(tok.term.slice(i, i + 2));
      const all = doc.f.head + " " + doc.f.core + " " + doc.f.body;
      const hit = grams.filter(g => all.includes(g)).length / grams.length;
      if (hit >= 0.6) best = hit;
    }
    return best;
  }

  function search(docs, q) {
    const toks = parseQuery(q);
    if (!toks.length) return { toks, results: docs.map(d => ({ doc: d, score: 0 })), mode: "all" };
    const scored = docs.map(d => {
      const parts = toks.map(t => scoreToken(d, t));
      return { doc: d, parts, score: parts.reduce((a, b) => a + b, 0) };
    });
    let results = scored.filter(r => r.parts.every(p => p > 0));
    let mode = "and";
    if (!results.length) { results = scored.filter(r => r.score > 0); mode = "or"; }
    results.sort((a, b) => b.score - a.score);
    return { toks, results, mode };
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }

  function highlight(text, toks) {
    let html = escapeHtml(text);
    if (!toks || !toks.length) return html;
    const words = [...new Set(toks.flatMap(t => t.alts.concat(...t.parts)))].filter(w => w.length > 0).sort((a, b) => b.length - a.length);
    if (!words.length) return html;
    const re = new RegExp("(" + words.map(w => escapeHtml(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
    return html.replace(re, "<mark>$1</mark>");
  }

  window.KBSearch = { buildIndex, search, highlight, escapeHtml, parseQuery };
})();
