# 進金生能源 6692 ｜ 光伏運維 8D 智慧管理與三層式 AI Agent 閉環工程平台

🌐 **GitHub Pages 線上瀏覽入口**：[https://davidyeh51.github.io/pv-8d-management-platform/](https://davidyeh51.github.io/pv-8d-management-platform/)

> **依據《光伏運維中高嚴重度故障之 8D 問題解決體系、學術理論架構與開源知識庫實踐深度研究報告》之「工程結論」打造**  
> **核心主體架構**：「**SCADA 物理特徵驅動（底層 Layer 1）＋ 雙模態混合知識圖譜 RAG 檢索（中層 Layer 2）＋ 強制驗證閘門 Validation-Gated AI Agent（頂層 Layer 3）**」的三層式自動化閉環工程系統。

---

## 🎯 平台設計核心（以研究報告「結論」為主體）

綜合光伏產業故障實證數據（全美每年 25 億美元非計畫停機損失、60% 失效源於逆變器、平均 1.5~2.2 年首次出險、45% 逆變器原廠在建成 4 年後退出市場）、國際頂尖學術前沿與 GitHub 開源資產，本平台將 8D 從「事後填寫的行政表單」升級為**三層式自動化閉環工程系統**：

### 1. 【底層 Layer 1】邊緣與 SCADA 數據預處理層（賦能 D0、D1 與 D2）
- **數據審計與單位校正**：常駐 `ALZ-11` 與 `UNSW-Solar` Notebook 清洗管線，自動修正氣象站溫標（$^\circ\text{F} / ^\circ\text{C}$）與逆變器計量單位錯置（$\text{W} / \text{kW}$）、過濾負值發電與夜間時鐘偏移。
- **氣象干擾解耦與告警降噪**：
  - 採用 `sprince0031` 之 $I\text{-}V\text{-}G$ 非線性分類模型（Random Forest / SVM）解耦「組件內部線間短路（LL Fault）」與「外部短暫雲層遮擋（Passing Cloud Shading）」，防止假性 8D 立項。
  - 結合 `aws-samples/sample-intelligent-alarms-agent` 之 **ISA-18.2 / IEC 62682 / EEMUA 191 告警降噪機制**，自動剔除 **60%–80%** 的連鎖附屬誤報（告警風暴 Alarm Flooding）。
- **光伏 FMEA 嚴重度閾值 ($S_{\text{PV}} \ge 3$) 自動觸發立項**：
  - 當 $S_{\text{PV}} = 5$（直流電弧 DC Arc Fault、IGBT 熱失控、絕緣崩潰漏電流超標）時強制啟動現場 **LOTO 上鎖掛牌安全隔離**。
  - 自動截取異常時間窗口之 SCADA 波形、同儕比對（P2P）PR 損失量與單線圖（SLD）拓撲位置，並透過**多目標 AI 團隊演算法**匹配 2–10 名跨部門專家（Champion、Leader、現場電氣、SCADA 數據、OEM FAE、資產索賠專員），生成結構化且量化的 **D1 與 D2 初稿（含 5W2H 與 `Is / Is Not` 邊界分析矩陣）**。

### 2. 【中層 Layer 2】雙模態 8D 知識庫與圖譜推論層（賦能 D3、D4 與 D5）
- **破解 45% 逆變器原廠 4 年退場之文檔斷鏈危機**：採用 `searlion/rag-strategies` 的邏輯章節切塊技術（Gemini 2.5 Pro `section_map.json` + FAISS），將原廠維修手冊、IEC 併網規範、場站 PFMEA/控制計畫及過往結案 8D 報告切分為完整語義塊，同步存入**向量資料庫（Milvus/FAISS）與知識圖譜（Neo4j）**（仿照 `NVIDIA-AI-Blueprints` 與 `didilili/deepsearch-agents` 時間窗口感知 CA-RAG 架構）。
- **FCA-B-FSA 故障特徵映射與 CIRCA / RCInvestigator 拓撲推論**：
  - 建立「**電氣故障特徵（FS）$\rightarrow$ 單線圖設備節點（SLD Node）$\rightarrow$ 物理發生根因（Occurrence RC）$\rightarrow$ 監控流出根因（Escape RC）$\rightarrow$ 歷史永久對策（PCA）**」五階實體關聯邊。
  - 支援向上泛化算子（$\Uparrow$ Upward Expansion，自動鎖定 D3 同批次設備 100% IR 熱像普查範圍）、水平同儕類比算子（$\Leftarrow$ Leftward Expansion）與 **TWVNS 啟發式路徑推論**（解決「異常在逆變器端被捕獲，真實根因卻在上游直流配電側 MC4 接頭或感測器」之跨系統故障傳播盲區）。
  - 歷史對策檢索時間由 **300 分鐘壓縮至 1 分鐘內（提速 300 倍）**。
- **零幻覺引文核驗閘門（`uptrain-ai` `RAG_WITH_CITATION`）**：強制 AI 僅能在**專家驗證知識庫（Expert-Validated Knowledge Base）**邊界內生成附帶精確出處的根因假設，徹底杜絕 D4 階段「看似合理卻未經證實」的 AI 幻覺。

### 3. 【頂層 Layer 3】Agent Skill 合規審查與文件閉環層（賦能 D4 審查與 D6–D8）
- 整合 `RBraga01/Quality-Engineering-Skills`（`/8d-coach`、`/rca-facilitator`、`supplier-scar`、`/control-plan-builder`）與 `duding-engicool/skill-8d-report-analyzer`（TRACE 47/50 分，百分制加權評分：D1 10%、D2 15%、D3 15%、**D4 30% 核心權重**、D5 15%、D6 10%、D7/D8 5%）。
- **強制執行三大治理鐵律（Three Governance Iron Laws）**：
  1. **治理鐵律一（兩階段人工確認閘門）**：解析現場報告與數據後，必須經過**工程師人工核對確認**結構化內容無誤，方可進入第二階段 AI 深度分析與評分。
  2. **治理鐵律二（D4 雙根因與 $\ge 5$ 層雙向可逆 5-Why 證據鏈檢核）**：對佔據 **30% 核心評分權重**的 D4 階段執行雙根因（發生因＋流出因）與至少 5 層 5-Why 的雙向可逆證據鏈檢核；**嚴格攔截並退回歸咎於「人員疏忽（Human Error）」或「單純零件自然老化」的敷衍結論**。
  3. **治理鐵律三（D6 P2P+HP 濾波長期驗證與 D7 四大工程文件強制升版閉環）**：在 D6 透過 `UNSW-Solar` 的 HP 濾波與同儕 PR 演算法完成 3–6 個月零復發驗證後，於 D7 強制觸發 `/control-plan-builder` 更新**四大核心工程文件版次**（① PFMEA/DFMEA、② 控制計畫 Control Plan、③ SOP/SIP 與檢驗標準、④ SCADA 預警規則與 AI 故障特徵庫），確保每次電站故障皆實質轉化為全場站可靠度的永久升級。

---

## 📁 檔案結構

```
pv-8d-management-platform/
├── index.html            # 三層式閉環工程平台主介面 (5 大工作台分頁 + 3 個互動模態框)
├── app.js                # Layer 1 預處理模擬器、Layer 2 圖譜算子與零幻覺閘門、Layer 3 三大治理鐵律審查引擎
├── seed-data.js          # 權威實證案例庫、邏輯章節切塊庫與報告四大對照表完整種子資料
├── supabase-client.js    # Supabase BaaS 雲端客戶端與 LocalStorage 離線同步模組 (遵循零私鑰規範)
├── supabase-schema.sql   # PostgreSQL 資料表 (pv_8d_cases, pv_8d_knowledge_chunks, pv_8d_fmea_updates) 與 RLS 腳本
└── README.md             # 平台架構與操作說明文件
```
