#!/usr/bin/env node
/**
 * 由 data/kb-data.js 產生 RAG 用檔案：
 *   kb.json        完整結構化資料
 *   rag/<id>.md    每案一份 Markdown（金字塔結構，適合切塊嵌入）
 *   rag/index.md   目錄
 *   llms.txt       AI 讀取索引
 * 用法：node tools/build-rag.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data/kb-data.js"), "utf8"), sandbox);
const KB = sandbox.window.PV8D_KB;
const SITE = "https://davidyeh51.github.io/pv-8d-management-platform/";

fs.writeFileSync(path.join(ROOT, "kb.json"), JSON.stringify(KB, null, 2) + "\n");

const ragDir = path.join(ROOT, "rag");
fs.mkdirSync(ragDir, { recursive: true });
fs.readdirSync(ragDir).filter(f => f.endsWith(".md")).forEach(f => fs.unlinkSync(path.join(ragDir, f)));

const stageName = code => (KB.stages.find(s => s.code === code) || {}).name || "";

function caseMd(c) {
  const cat = KB.taxonomy.find(t => t.key === c.category);
  const L = [];
  L.push(`# ${c.id}｜${c.title}`, "");
  L.push(`- 類型：${c.type === "field" ? "實際案場報告" : "產業典型知識卡（教學範本，非實際案場數據）"}`);
  L.push(`- 故障分類：${cat.key} ${cat.name}`);
  L.push(`- 案場：${c.site}｜${c.capacity}｜${c.siteType}`);
  L.push(`- 設備 / 失效模式：${c.equipment}｜${c.faultMode}`);
  L.push(`- 風險：${c.severity}｜損失型態：${c.lossType}`);
  L.push(`- 現象關鍵字：${c.symptoms.join("、")}`);
  L.push(`- 標籤：${c.tags.join("、")}`);
  L.push(`- 簡報：${SITE}deck.html?id=${encodeURIComponent(c.id)}${c.deck ? `；完整互動簡報：${SITE}${c.deck.url}` : ""}`, "");
  L.push("## 一句話結論", "", c.governingThought, "");
  L.push("## SCQA", "", `- **S 情境**：${c.scqa.s}`, `- **C 衝突**：${c.scqa.c}`, `- **Q 問題**：${c.scqa.q}`, `- **A 答案**：${c.scqa.a}`, "");
  L.push("## 關鍵數據", "", ...c.keyFacts.map(k => `- ${k.label}：${k.value}（${k.note}）`), "");
  L.push("## 根因", "", c.rootCause, "");
  L.push("## 假說檢定（MECE）", "", "| 假說 | 檢定方法 | 證據 | 判定 |", "|---|---|---|---|",
    ...c.hypotheses.map(h => `| ${h.h} | ${h.test} | ${h.evidence} | ${h.verdict} |`), "");
  L.push("## 8D 摘要", "", ...Object.keys(c.d).map(k => `- **${k} ${stageName(k)}**：${c.d[k]}`), "");
  L.push("## 對策", "", ...c.solutions.map(s => `- [${s.priority}] ${s.name}｜成本 ${s.cost}｜${s.effect}`), "");
  L.push("## 現場檢查清單", "", ...c.checklist.map((x, i) => `${i + 1}. ${x}`), "");
  L.push("## Lesson Learned", "", ...c.lessons.map(l => `- **${l.id} ${l.title}**：${l.insight} → 行動：${l.action}`), "");
  return L.join("\n");
}

KB.cases.forEach(c => fs.writeFileSync(path.join(ragDir, `${c.id}.md`), caseMd(c)));

const index = [
  `# ${KB.meta.name}`, "", KB.meta.governingThought, "",
  "## 通用原則", "", ...KB.principles.map(p => `- **${p.id} ${p.title}**：${p.desc}（參考：${p.refs.join("、")}）`), "",
  "## 案例", "", ...KB.cases.map(c => `- [${c.id}｜${c.title}](${c.id}.md) — ${KB.taxonomy.find(t => t.key === c.category).name}`), ""
].join("\n");
fs.writeFileSync(path.join(ragDir, "index.md"), index);

const llms = [
  `# ${KB.meta.name}`, "", `> ${KB.meta.governingThought}`, "",
  "結構化資料：", `- [kb.json](${SITE}kb.json)`, "", "案例 Markdown：",
  ...KB.cases.map(c => `- [${c.id} ${c.title}](${SITE}rag/${c.id}.md)`), ""
].join("\n");
fs.writeFileSync(path.join(ROOT, "llms.txt"), llms);

console.log(`OK: ${KB.cases.length} cases → kb.json, rag/*.md, llms.txt`);
