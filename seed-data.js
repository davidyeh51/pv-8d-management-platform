// =============================================================================
// 進金生能源 6692 ｜ 光伏運維 8D 智慧管理與三層式 AI Agent 閉環平台
// 權威知識庫種子資料 (完全對齊《光伏運維 8D 報告與知識庫》研究報告與結論架構)
// =============================================================================

window.PV_8D_SEED_DATA = {
  // 1. 結論主體：三層式自動化閉環工程系統架構定義
  architectureLayers: [
    {
      layerId: 1,
      code: "Layer 1 (底層)",
      name: "邊緣與 SCADA 數據預處理層",
      empoweredDisciplines: ["D0 緊急響應與初篩", "D1 成立跨職能團隊", "D2 問題精確描述"],
      tagline: "SCADA 物理特徵驅動 ✕ 氣象干擾解耦 ✕ ISA-18.2 告警降噪 ✕ 多目標團隊匹配",
      corePipelines: [
        "ALZ-11 & UNSW-Solar Notebook 常駐管線：自動修正氣象站溫標 (°F/°C) 與逆變器計量單位錯置 (W/kW)、過濾負值發電與夜間時鐘偏移",
        "sprince0031 I-V-G 非線性分類模型 (Random Forest / SVM)：解耦「組件內部線間短路 (LL Fault)」與「外部短暫雲層遮擋 (Passing Cloud Shading)」",
        "aws-samples/sample-intelligent-alarms-agent (ISA-18.2 / IEC 62682 / EEMUA 191)：自動剔除 60%–80% 連鎖附屬誤報（告警風暴 Alarm Flooding）",
        "光伏 FMEA 嚴重度閾值 (S_PV >= 3) 觸發器：S_PV=5 強制啟動 LOTO 上鎖掛牌隔離；自動截取異常窗口波形、P2P PR 損失與 SLD 單線圖位置，匹配 2–10 人跨職能團隊生成 D1/D2 初稿"
      ],
      kpiHighlight: "剔除 60%–80% 附屬誤報 ｜ 攔截假性雲遮派工 ｜ D1/D2 初稿 < 1 分鐘生成"
    },
    {
      layerId: 2,
      code: "Layer 2 (中層)",
      name: "雙模態 8D 知識庫與圖譜推論層",
      empoweredDisciplines: ["D3 臨時遏制措施", "D4 根本原因分析 (RCA)", "D5 永久糾正措施 (PCA)"],
      tagline: "邏輯章節切塊 ✕ Milvus 向量 + Neo4j 圖譜 ✕ FCA-B-FSA & TWVNS 拓撲溯源 ✕ 零幻覺引文閘門",
      corePipelines: [
        "破解 45% 逆變器 OEM 4 年後退場之文檔斷鏈危機：採用 searlion/rag-strategies (Gemini 2.5 Pro section_map.json) 將原廠手冊、IEC 規範、PFMEA 與歷史 8D 切分為 171 個完整邏輯語義塊",
        "雙模態儲存架構 (NVIDIA-AI-Blueprints & didilili/deepsearch-agents)：同步寫入 Milvus/FAISS 向量庫與 Neo4j 知識圖譜，支援時間窗口感知檢索 (CA-RAG)",
        "FCA-B-FSA 故障特徵映射 & CIRCA / RCInvestigator 拓撲推論：建立「電氣故障特徵 (FS) → 單線圖節點 (SLD Node) → 物理發生根因 (Occurrence RC) → 監控流出根因 (Escape RC) → 歷史永久對策 (PCA)」五階實體邊，支援向上泛化 (⇑)、水平同儕類比 (⇐) 與 TWVNS 路徑推論",
        "uptrain-ai rag_with_citation.ipynb 零幻覺引文閘門：強制 AI 僅能在專家驗證知識庫 (Expert-Validated KB) 邊界內生成附精確出處之根因假設"
      ],
      kpiHighlight: "歷史對策檢索提速 300 倍 (300m → <1m) ｜ 100% 批次識別 ｜ 零幻覺強制引文"
    },
    {
      layerId: 3,
      code: "Layer 3 (頂層)",
      name: "Agent Skill 合規審查與文件閉環層",
      empoweredDisciplines: ["D4 根因邏輯審查 (權重 30%)", "D6 實施與長期效果驗證", "D7 預防再發與四大文件更新", "D8 團隊認可與知識庫歸檔"],
      tagline: "RBraga01 /8d-coach ✕ duding-engicool 兩階段百分制審查 ✕ 三大治理鐵律強制閉環",
      corePipelines: [
        "治理鐵律一（兩階段人工確認閘門）：解析現場報告與 SCADA 數據後，必須經工程師人工核對確認結構化內容無誤，方可啟動第二階段 AI 深度分析（防跨頁表格/OCR 失真）",
        "治理鐵律二（D4 雙根因與 >=5 層雙向可逆 5-Why 證據鏈檢核）：佔 30% 核心權重，強制要求「發生根因 + 流出根因」雙軌分析與 >=5 層符合 MECE 之可逆 5-Why；嚴格攔截歸咎於「人員疏忽」或「單純零件老化」之敷衍結論",
        "治理鐵律三（D6 P2P+HP 濾波長期驗證與 D7 四大工程文件強制更新閉環）：D6 透過 UNSW-Solar HP 濾波與同儕 PR 完成 3–6 個月零復發驗證後，於 D7 強制觸發 /control-plan-builder 更新 PFMEA/DFMEA、控制計畫 (CP)、SOP/SIP 與 SCADA 預警規則庫"
      ],
      kpiHighlight: "TRACE 47/50 高分規範 ｜ 故障復發率降至 0% ｜ D7 四大工程文件 100% 實質升版"
    }
  ],

  // 2. 光伏 8D 實證案例庫 (涵蓋 D0-D8 完整結構、雙根因、5-Why、引文與驗證數據)
  cases: [
    {
      id: "case-001",
      case_no: "8D-2026-DA01",
      site_name: "台中大安龜殼段 POCS 水上型光電廠",
      capacity_kwp: 1999.8,
      current_discipline: "D8",
      active_layer: 3,
      severity_spv: 5,
      ap_level: "H",
      loto_isolated: true,
      weather_decoupled: true,
      alarm_suppressed_pct: 76.4,
      sld_node: "Sub-Array B → INV-13 → MPPT-02 → String-05 MC4 匯流端",
      fault_signature: "FS-DC-01: 晴空高輻照下 V_mp 正常 (685V)，但 I_mp 驟降 33.4% (3併變2併)，伴隨絕緣阻抗 R_iso 低於 1MΩ 間歇告警與 680V DC 局部拉弧熱斑 (ΔT = +38.2°C)",
      energy_loss_mwh: 42.8,
      pr_drop_pct: 18.6,
      financial_claim_ntd: 218000,
      stage1_human_confirmed: true,
      audit_score: 96,
      d8_closed: true,
      external_report_url: "https://davidyeh51.github.io/solar-8d-portal/大安龜殼段POCS_診斷報告.html",
      d1_team: {
        champion: "葉大衛 (維運管理部協理 / Sponsor)",
        leader: "姜興中 (資深電氣可靠度工程師)",
        members: [
          "洪稜凱 (SCADA 數據分析師 — UNSW P2P & pvlib)",
          "黃昱超 (現場高壓與紅外線熱像工程師)",
          "陳志豪 (逆變器/連接器 OEM 駐場 FAE)",
          "林雅婷 (資產管理與保固索賠專員)"
        ]
      },
      d2_5w2h_is_not: {
        what_is: "INV-13 MPPT-02 第 5 串 MC4 正極接頭接觸電阻過高引發熱熔斷路與間歇接地漏電",
        what_is_not: "非逆變器內部 IGBT 功率模組損壞、非電網過壓跳脫、非雲層遮蔽",
        where_is: "水上浮台 B 區 INV-13 直流箱第 5 迴路跨橋轉接處（受波浪微振與鹽霧耦合區）",
        where_is_not: "非陸域變電站 AC 側，亦非固定支架區組串",
        when_is: "2026-08-14 11:20 晴空高輻照尖峰 (G = 965 W/m²) 連續觸發",
        when_is_not: "非清晨低日照啟動階段或夜間時段",
        how_many: "影響 1 台逆變器 (INV-13) 共 22 片模組組串，累計短少 42.8 MWh，同儕比值降至 0.76 (低於 0.80 P1 紅線)，年化損失風險 NT$ 21.8 萬",
        evidence: "FLIR 熱像圖 (EV-01: MC4 接頭達 86.4°C，溫差 ΔT=+38.2°C)、UNSW MPPT 電流相位對比圖 (EV-02)"
      },
      d3_containment: {
        loto_action: "48 小時內完成 INV-13 DC Switch LOTO 斷電掛牌，切離故障第 5 組串防止 1000V DC 電弧起火",
        batch_scan: "透過倉儲批次追溯系統定位同批號 (Batch #MC4-2024Q3-TW) 共 180 組水上跨接頭，執行 100% 無人機 + 手持 FLIR 紅外線普查，額外攔截 4 處早期溫升點 (ΔT > 15°C)",
        alarm_governance: "依據 ISA-18.2 規範抑制 INV-13 因 R_iso 波動引發之每 10 分鐘 14 條附屬連帶告警（降噪率 76.4%）"
      },
      d4_occurrence_rc: "水上浮體受風浪週期性微幅撓曲，跨浮筒連接處未預留足夠應力釋放弧度（配線張力超標），且現場混用非原廠相容型公母端 MC4 接頭並以手工鉗壓接，導致金屬插針微動磨損（Fretting Corrosion）與鹽霧侵入，接觸電阻由 <0.5mΩ 飆升至 42mΩ，高電流下焦耳熱熔毀絕緣外殼並造成開路（異常在逆變器端捕獲，根因位於上游直流配電側）。",
      d4_escape_rc: "既有 SCADA 告警僅設定整機 AC 功率為零（Zero Generation）才觸發 P1 推播，未針對多路 MPPT 支路電流失衡（3 併少 1 串僅損失 ~11% 整機出力）設定同儕比值（P2P Ratio < 0.85）自動派工規則；且季度巡檢 SOP 僅規定抽檢 10% 陸域接頭，未將水上高撓曲跨接區列為 100% 必檢控制點。",
      d4_five_why: [
        { level: 1, why: "為何 INV-13 發電量較同儕標竿機台 (INV-10) 持續落後 18.6% 且觸發絕緣告警？", answer: "因為 MPPT-02 迴路中第 5 串組串呈現開路狀態（電流由 28.5A 降至 19.0A），且正極 MC4 接頭絕緣護套炭化破裂引發對浮台支架間歇漏電。", evidence: "SCADA MPPT 5分鐘電流序列 & 現場絕緣阻值實測 0.42 MΩ (<1 MΩ 標準)" },
        { level: 2, why: "為何該 MC4 接頭會發生絕緣護套炭化破裂與熔斷開路？", answer: "因為正極金屬插針接觸面積嚴重不足，在正午 9.5A 電流下接觸電阻高達 42mΩ，產生持續局部高溫（FLIR 實測 86.4°C）引發熱退化。", evidence: "FLIR 熱像儀實拍圖 EV-01 & 拆解後毫米歐姆計四線式量測報告" },
        { level: 3, why: "為何正極金屬插針會出現接觸面積不足與接觸電阻激增？", answer: "因為公母端分別採用不同廠牌之「號稱相容（Cross-mated）」連接器，公差不匹配，加上浮台隨水位波浪晃動產生持續軸向拉扯，引起插針微動腐蝕（Fretting Corrosion）。", evidence: "組件BOM批次比對紀錄 & 金相顯微鏡插針表面氧化電弧坑洞照片" },
        { level: 4, why: "為何施工與維修階段會出現跨廠牌混插且線纜無應力釋放餘裕？", answer: "因為原逆變器/組件附帶接頭在 2 年前局部搶修時無原廠備料，外包商自行購買市售通用接頭替換，且維運 SOP 未強制規範水上浮體跨橋處之最小彎曲半徑與防拉脫固定夾。", evidence: "2024年維修工單領料紀錄 #WO-2024-089 & 現場線槽走線查核表" },
        { level: 5, why: "為何外包商混用接頭與高達 3 個月的單串斷路未能被品質檢驗與監控系統及時攔截（系統與流程根因）？", answer: "【發生制度根因】IQC/OBA 備品領用制度未強制鎖定 Staubli 原廠同型號認證與專用壓接扭力治具檢定；【流出系統根因】SCADA 缺乏 UNSW P2P 同儕支路電流差異演算法，僅靠人工月結對帳才發現度數短少。", evidence: "現行採購規範 v2.1 與 SCADA 告警規則庫快照核對" }
      ],
      d4_citations: [
        { refId: "CIT-NREL-2024-P14", source: "NREL/SETO 2024 PV Inverter Reliability Report & kWh Analytics (11 GW Study)", quote: "絕大多數異常雖在逆變器端被捕捉，但真實物理故障常源於前端直流組串接地或 MC4 接頭接觸電阻過高（跨系統故障傳播）。", similarity: 0.96 },
        { refId: "CIT-UNSW-DC50", source: "UNSW-Solar/performance_diagnosis (50-FIMER_Shading_Clipping_0Gen.ipynb)", quote: "當 MPPT 電壓 V_mp 維持正常而電流 I_mp 呈現整數比例階梯下降（如 2/3）時，確診為單串熔絲熔斷或 MC4 開路故障。", similarity: 0.94 },
        { refId: "CIT-IEC-62852", source: "IEC 62852 / 光伏連接器安全與 PFMEA 知識庫 SEC-DC-019", quote: "嚴禁混用不同製造商之直流連接器（Cross-mating）；水上浮體跨接處須配置應力釋放環並控制在溫差 ΔT < 10°C。", similarity: 0.95 }
      ],
      d5_pca: [
        { action: "全數更換 Batch #MC4-2024Q3-TW 共 180 組跨接頭為原廠 Stäubli MC4-Evo 2（IP68 防鹽霧認證），並使用經校正之專用棘輪壓接鉗與扭力扳手（扭力值 2.5 N·m）施工。", owner: "黃昱超 (現場電氣)", due: "2026-09-05", risk_check: "通過熱應力與鹽霧循環測試，無二次壓降副作用" },
        { action: "於浮台跨橋處加裝 Ω 型不鏽鋼應力釋放緩衝彎（預留 15cm 撓曲裕度）與雙重抗 UV 束帶固定。", owner: "陳志豪 (OEM FAE)", due: "2026-09-10", risk_check: "通過 17 級陣風波浪模擬位移拉拔測試" },
        { action: "於 SCADA 邊緣網關部署 UNSW-Solar P2P 同儕支路比對與 MPPT 電流失衡預警模型（當單路 MPPT I_mp 偏離同儕中位數 >12% 連續 3 個晴空時段即自動觸發 P2 檢修工單）。", owner: "洪稜凱 (數據工程)", due: "2026-09-12", risk_check: "結合 pvlib 晴空過濾，誤報率 < 1.5%" }
      ],
      d6_validation: {
        short_term: "修復後首個晴空日 (G = 950 W/m²) 實測 INV-13 MPPT-02 電流恢復至 28.4A，熱像儀複測接頭最高溫 39.2°C (ΔT = +1.8°C < 10°C 標準)。",
        long_term_p2p: "持續追蹤 90 天 (3 個月)，透過 UNSW P2P 演算法與 Hodrick-Prescott (HP) 時序濾波驗證，INV-13 相對標竿機台 INV-10 之等價時數比值 (Ey Ratio) 由 0.76 穩定收斂至 0.968 (高於 0.92 結案門檻)，故障復發率 0%。",
        before_ratio: 0.76,
        after_ratio: 0.968,
        recurrence_rate: 0
      },
      d7_docs_updated: {
        pfmea_dfmea: { updated: true, oldVer: "v3.2", newVer: "v3.3", summary: "新增「水上浮體跨接段 MC4 微動磨損與混插熱失控」失效模式；嚴重度 S=5，發生度 O 由 6 降至 2，難檢度 D 由 7 降至 2，AIAG-VDA AP 由 H 降至 L。" },
        control_plan: { updated: true, oldVer: "CP-PV-2025.1", newVer: "CP-PV-2026.2", summary: "納入 MC4 壓接拉拔力 (>300N)、鎖緊扭力 (2.5 N·m ±0.2) 及水上跨接區季度 100% IR 熱像溫差上限 (ΔT <= 10°C) 強制管控與 Reaction Plan。" },
        sop_sip: { updated: true, oldVer: "SOP-OM-014 v2.0", newVer: "SOP-OM-014 v3.0", summary: "修訂《水面型光電直流配電檢修與備品防呆作業標準書》，明訂嚴禁跨牌混插，完成全體 18 名駐場工程師實作考核簽核。" },
        scada_rule: { updated: true, oldVer: "RULE-2025-08", newVer: "RULE-2026-09", summary: "將 FS-DC-01 (MPPT 分支電流相對於同儕中位數偏移 >12% 且 V_mp 正常) 寫入全場站 SCADA 與邊緣網關 AI 診斷庫，橫向展開 (Yokoten) 至全台 6 座水面型光電案場。" }
      }
    },
    {
      id: "case-002",
      case_no: "8D-2026-GS02",
      site_name: "高雄岡山五甲尾滯洪池 4,999.2kWp 水面型光電",
      capacity_kwp: 4999.2,
      current_discipline: "D8",
      active_layer: 3,
      severity_spv: 4,
      ap_level: "H",
      loto_isolated: false,
      weather_decoupled: true,
      alarm_suppressed_pct: 81.2,
      sld_node: "Weather Station POA-01 & Sub-Array C (INV-21 ~ INV-28)",
      fault_signature: "FS-MET-02: 日照計數值凍結/倍率失真導致表觀 PR 虛高 112%，解耦晴空模型後揭露汛期泥漿水霧沉積致真實 Ey 下挫 14.8%",
      energy_loss_mwh: 118.5,
      pr_drop_pct: 14.8,
      financial_claim_ntd: 568800,
      stage1_human_confirmed: true,
      audit_score: 94,
      d8_closed: true,
      external_report_url: "https://davidyeh51.github.io/gangshan-wujiawei-diagnostic/",
      d1_team: {
        champion: "葉大衛 (維運管理部協理 / Sponsor)",
        leader: "洪稜凱 (首席運維數據科學家)",
        members: [
          "姜興中 (電氣與感測器校準工程師)",
          "黃昱超 (無人機光學熱像與清洗評估師)",
          "張家銘 (SCADA 通訊與 Modbus 韌體工程師)"
        ]
      },
      d2_5w2h_is_not: {
        what_is: "POA 日照計感測器破產失真掩蓋汛期後滯洪池泥霧光學遮蔽衰退（雙重複合失效）",
        what_is_not: "非逆變器硬體故障、非電網限電截割 (Clipping)",
        where_is: "五甲尾滯洪池南側迎風面浮台陣列與氣象箱 #1 RS485 通道",
        where_is_not: "非北側岸上變電站",
        when_is: "2026年颱風汛期過後連續 45 天",
        when_is_not: "非汛期前乾燥季節",
        how_many: "全場 4,999.2 kWp 受影響，真實短少 118.5 MWh，年化營收流失約 NT$ 56.88 萬",
        evidence: "pvlib 晴空包絡線對比圖、HP 濾波長期趨勢分解圖、現場泥膜沉積顯微照片"
      },
      d3_containment: {
        loto_action: "切換 SCADA PR 計算基準至鄰近健康基準站與衛星晴空輻照模型 (pvlib Ineichen)",
        batch_scan: "全場 38 台逆變器執行 UNSW P2P 同儕矩陣掃描，鎖定南側迎風重度泥膜區優先派工高壓水霧清洗",
        alarm_governance: "隔離因氣象站負值/溢位引發之 312 條假性 PR 異常告警（降噪率 81.2%）"
      },
      d4_occurrence_rc: "滯洪池於颱風高水位期間富含高黏度黏土微粒，隨強風水霧噴濺於低傾角（10°）水上模組表面形成疏水性膠結泥膜，自然降雨無法沖刷；同時日照計透鏡受泥膜覆蓋與內部乾燥劑飽和結露，導致輸出 mV 訊號衰減 24%。",
      d4_escape_rc: "SCADA 系統直接使用未經審計的單一故障日照計分母計算 PR（分母變小導致 PR 虛高至 108%~112%），缺乏 ALZ-11 數據審計管線與 pvlib 晴空理論輻照度交叉校核機制，致使嚴重積垢損失在月報中被完全掩蓋。",
      d4_five_why: [
        { level: 1, why: "為何五甲尾案場汛期後實際發電度數較去年同期銳減 14.8%，但系統日報表 PR 卻顯示 109%「超標正常」？", answer: "因為計算 PR 分母所用的現場 POA 日照計讀數嚴重偏低（正午僅顯示 680 W/m²，而實際晴空達 940 W/m²），分母失真掩蓋了分子（發電量）的實質衰退。", evidence: "SCADA 原始日照序列 vs 中央氣象署岡山站 & pvlib 晴空模型對比" },
        { level: 2, why: "為何現場 POA 日照計讀數會持續偏低 27% 且未被發現？", answer: "因為日照計玻璃罩受滯洪池泥霧覆蓋且內部防潮矽膠失效結露，同時 SCADA 無日照計與晴空模型偏差超限（>15%）之感測器健康度自檢告警。", evidence: "現場日照計球罩結露照片 & Modbus 暫存器原始電流紀錄" },
        { level: 3, why: "為何還原真實日照後，全場等價時數 Ey 仍呈現平滑且高達 14.8% 的系統性低效？", answer: "因為颱風期間滯洪池混濁泥水受強風拍擊形成氣溶膠泥霧，乾涸後在模組玻璃表面形成鈣化黏土薄膜，造成寬光譜透光率下降 15.2%。", evidence: "UNSW HP 時序濾波趨勢項分解 & 清洗前後同日對照組 I-V 實測" },
        { level: 4, why: "為何例行降雨與既有年度清洗計畫未能消除該泥膜？", answer: "因為水上浮體模組傾角僅 10° 自潔能力差，且黏土微粒經高溫烘烤後具強附著力，一般清水沖洗無效，需搭配旋轉軟毛刷與中性環保界面活性劑於汛期後 14 天黃金期內清洗。", evidence: "振達光伏刷清洗測試報告 & 表面接觸角量測數據" },
        { level: 5, why: "為何感測器失真與汛期泥膜兩大問題會同時逃逸既有運維體系（系統與管理根因）？", answer: "【發生制度根因】水面型電廠運維 SOP 未建立「颱風/極端高水位事件後 72 小時光學與氣象感測器專案點檢」觸發機制；【流出系統根因】數據中台未部署 ALZ-11 氣象數據審計與 UNSW HP 濾波趨勢分解演算法。", evidence: "現行水面型案場年度維護計畫表 v1.4 審查紀錄" }
      ],
      d4_citations: [
        { refId: "CIT-ALZ11-AUDIT", source: "ALZ-11/campus-energy-optimization (campus-energy-optimization.ipynb)", quote: "必須針對氣象站與逆變器數據建立自動化數據審計管線，利用 pvlib 幾何模型攔截感測器漂移與單位錯置噪聲。", similarity: 0.95 },
        { refId: "CIT-UNSW-HP40", source: "UNSW-Solar/performance_diagnosis (40-AC_Recurring_Underperformance.ipynb)", quote: "引入 Hodrick-Prescott (HP) 濾波器分解時序趨勢項與高頻雜訊，可精確量化週期性積灰泥膜造成的漸進式性能衰減。", similarity: 0.97 }
      ],
      d5_pca: [
        { action: "更換 IP67 二級標準日照計（含自動加熱除霜除露模組），並於每季巡檢強制執行日照計清潔與乾燥劑更換。", owner: "姜興中", due: "2026-09-20", risk_check: "已完成與標準傳遞錶比對校正，誤差 < ±1.8%" },
        { action: "於數據中台常駐部署 pvlib 晴空輻照交叉校核管線：當現場日照計於晴空時段偏離理論值 >12% 連續 2 天，自動切換為虛擬氣象站基準並派發感測器檢修單。", owner: "洪稜凱", due: "2026-09-25", risk_check: "零侵入式軟體防護，徹底消除 PR 虛高盲區" },
        { action: "導入旋轉軟毛刷機械清洗工藝，建立「汛期/颱風警報解除後 10 日內啟動 ROI 動態清洗評估」制度。", owner: "黃昱超", due: "2026-10-01", risk_check: "EL 檢測確認清洗過程無新增隱裂" }
      ],
      d6_validation: {
        short_term: "完成全場機械刷洗與日照計更換後，晴空日實測 PR 由清洗前真實值 71.4% 立即躍升至 85.9%（淨增 +14.5%）。",
        long_term_p2p: "經 HP 濾波趨勢追蹤 120 天，長期趨勢項斜率恢復水平穩定，同儕比值維持 0.954，挽回年化發電收益逾 NT$ 56.8 萬。",
        before_ratio: 0.782,
        after_ratio: 0.954,
        recurrence_rate: 0
      },
      d7_docs_updated: {
        pfmea_dfmea: { updated: true, oldVer: "v2.0", newVer: "v2.1", summary: "新增「POA 日照計結露失真致 PR 監控失效 (Escape Mode)」與「滯洪池汛期泥霧鈣化遮蔽」，RPN 由 280 降至 48。" },
        control_plan: { updated: true, oldVer: "CP-WJW-01", newVer: "CP-WJW-02", summary: "將「現場 POA vs pvlib 晴空偏差率 <= 10%」與「HP 濾波週衰減率 <= 0.3%/週」列入中央控制計畫每日自動監控指標。" },
        sop_sip: { updated: true, oldVer: "SOP-CLEAN-02", newVer: "SOP-CLEAN-03", summary: "增訂《滯洪池與水面光電汛期後光學恢復暨氣象箱三點校準標準作業程序》。" },
        scada_rule: { updated: true, oldVer: "RULE-MET-01", newVer: "RULE-MET-02", summary: "部署 FS-MET-02 感測器破產自動切換備援模型，水平展開至全台所有配置氣象站之地面與水面案場。" }
      }
    },
    {
      id: "case-003",
      case_no: "8D-2026-MD03",
      site_name: "台南麻豆世堃塑膠 582kWp 屋頂型光電 (防逆流系統)",
      capacity_kwp: 582.0,
      current_discipline: "D6",
      active_layer: 3,
      severity_spv: 4,
      ap_level: "H",
      loto_isolated: false,
      weather_decoupled: true,
      alarm_suppressed_pct: 68.5,
      sld_node: "Smart Logger 3000 → Zero-Export Meter (CT 比流器) → INV-01~INV-06",
      fault_signature: "FS-AC-03: 晴空正午全場逆變器同步呈現鋸齒狀功率飽和截割 (Active Power Derating / Clipping)，cosφ 與頻率正常但輸出被壓制於 35% 額定容量",
      energy_loss_mwh: 64.2,
      pr_drop_pct: 26.4,
      financial_claim_ntd: 308000,
      stage1_human_confirmed: true,
      audit_score: 91,
      d8_closed: false,
      external_report_url: "https://davidyeh51.github.io/madou-shinkun-diagnostic/",
      d1_team: {
        champion: "葉大衛 (維運管理部協理)",
        leader: "洪稜凱 (運維數據與儲能微電網工程師)",
        members: [
          "姜興中 (電力保護與防逆流控制工程師)",
          "王建民 (業主廠務機電課長)",
          "林雅婷 (光儲商務開發與資產專員)"
        ]
      },
      d2_5w2h_is_not: {
        what_is: "廠區假日與午休負載驟降引發防逆流控制器 (Zero-Export) 頻繁動態壓載，加上 CT 相序倍率設定保守裕度過大造成過度棄光",
        what_is_not: "非逆變器內部 IGBT 過溫降額，亦非台電饋線過電壓 (Grid Overvoltage)",
        where_is: "世堃塑膠廠區主變電站 Smart Logger 防逆流閉環控制迴路與全場 6 台逆變器",
        where_is_not: "非單一組串或單一 MPPT 直流側問題",
        when_is: "每逢週六日、國定假日及每日 12:00–13:00 廠內射出機停機時段",
        when_is_not: "非平日全載生產且低日照時段",
        how_many: "全場 582kWp 年化棄光損失達 64.2 MWh (佔總潛在發電量 26.4%)，年化收益減損 NT$ 30.8 萬",
        evidence: "UNSW 50-FIMER Clipping 偵測圖、廠內負載與光電出力 1 分鐘疊合曲線"
      },
      d3_containment: {
        loto_action: "現場核對高壓盤 CT 比流器變比與相序，修正 Smart Logger 最低逆功率保護死區設定（由 15% 調優至 3% 安全動態追蹤）",
        batch_scan: "盤點全公司轄下 14 座「自發自用零輸出（Zero-Export）」工廠屋頂案場之正午截割率",
        alarm_governance: "將防逆流主動降載狀態碼與設備故障碼解耦，消除每日正午 40+ 條假性『逆變器出力異常』告警"
      },
      d4_occurrence_rc: "工廠射出成型產線由原本三班制改為週休二日與午休停機，廠內基本負載（Base Load）於正午降至 160kW，遠低於光電正午出力（480kW）；且防逆流控制器採階梯式慢速 PID 調節，當負載突降時為防逆送電網遭台電罰款，直接將逆變器出力壓制於安全底線。",
      d4_escape_rc: "SCADA 監控平台未將「防逆流指令降額量（Curtailment kWh）」獨立計量，導致運維週報將棄光損失誤認為氣候不佳或模組老化，錯失早期調整契約與導入表後儲能（BESS）削峰填谷之時機。",
      d4_five_why: [
        { level: 1, why: "為何麻豆世堃 6 台逆變器在晴空正午同時出現出力腰斬至 35% 的平頭/鋸齒截割？", answer: "因為全場逆變器同時收到上游 Smart Logger 3000 下達之有功功率上限指令（Active Power Limit = 35%）。", evidence: "Modbus 指令日誌 Reg #40420 歷史曲線" },
        { level: 2, why: "為何 Smart Logger 3000 會在正午主動下達 35% 壓載指令？", answer: "因為併網點數位電錶偵測到工廠總負載降至 165kW，觸發「零逆流（Zero-Export）」保護邏輯。", evidence: "併網點雙向電錶 P_grid 1分鐘時序數據" },
        { level: 3, why: "為何在工廠負載尚有 165kW 時，光電出力卻被過度壓制到僅剩 110kW（多損失了 55kW 緩衝空間）？", answer: "因為初期併網試車時，工程師將防逆流安全裕度（Safety Margin）設為過於保守的 55kW，且閉環控制響應週期設為 10 秒。", evidence: "Smart Logger 參數配置備份檔截圖" },
        { level: 4, why: "為何即便調優 PID 與安全裕度後，假日仍有高達 320kW 的光電出力無法消納？", answer: "因為自發自用案場受限於廠區假日無生產負載，且缺乏表後電池儲能系統（BESS）儲存正午多餘綠電供夜間尖峰放電。", evidence: "8760 小時光儲負載差額模擬報告" },
        { level: 5, why: "為何該案場長達半年的 26.4% 棄光損失未能在設計審查與日常監控中被主動識別（系統與管理根因）？", answer: "【發生制度根因】初期設計 DFMEA 未納入「客戶產線班表變動之負載敏感度分析」；【流出系統根因】SCADA 缺乏 UNSW Clipping 自動面積積分量化模組，未能區分「硬體故障損失」與「防逆流棄光損失」。", evidence: "專案可行性評估報告與 SCADA 月報模板審查" }
      ],
      d4_citations: [
        { refId: "CIT-UNSW-CLIP50", source: "UNSW-Solar/performance_diagnosis (50-FIMER_Shading_Clipping_0Gen.ipynb)", quote: "針對晴空包絡線下的功率平頭截割 (Clipping) 進行面積積分，可精確分離逆變器限載/防逆流棄光與組串硬體故障。", similarity: 0.96 },
        { refId: "CIT-OIHIKA-MPC", source: "oihika/Degradation-Aware-MPC-for-a-Freiburg-Renewable-District-Microgrid", quote: "透過微電網告警主控台與儲能 SOC 動態調度（MPC），可吸收正午防逆流棄光並消除母線壅塞。", similarity: 0.91 }
      ],
      d5_pca: [
        { action: "重構 Smart Logger 防逆流閉環控制參數：將控制週期由 10s 縮短至 1s，安全緩衝裕度由 55kW 精準下調至 8kW，立即挽回平日午休 38% 過度壓載損失。", owner: "姜興中", due: "2026-09-18", risk_check: "連續 14 天零逆送電網紀錄，符合台電防逆流規範" },
        { action: "完成「500kW / 1,000kWh 表後儲能 (BESS) 削峰填谷增設方案」財務與工程規畫，將假日棄光全數轉為高電價尖峰放電收益。", owner: "洪稜凱 / 林雅婷", due: "2026-10-30", risk_check: "IRR 提升 4.2%，預計回本期 4.6 年" }
      ],
      d6_validation: {
        short_term: "控制參數調優後，平日正午有效發電利用率立即提升 11.4%，無任何逆送電網違規告警。",
        long_term_p2p: "目前處於 D6 長期驗證第 45 天（目標 90 天），UNSW Clipping 損失面積已由 26.4% 降至 14.9%（待 BESS 併網後可降至 <1%）。",
        before_ratio: 0.736,
        after_ratio: 0.851,
        recurrence_rate: 0
      },
      d7_docs_updated: {
        pfmea_dfmea: { updated: true, oldVer: "v1.8", newVer: "v1.9", summary: "於自發自用案場 DFMEA 新增「負載結構變動與防逆流 PID 過阻尼棄光」失效模式。" },
        control_plan: { updated: true, oldVer: "CP-ZE-01", newVer: "CP-ZE-02", summary: "規定防逆流安全死區設定不得超過額定容量 2%，且須開啟 1 秒級快速動態追蹤。" },
        sop_sip: { updated: true, oldVer: "SOP-ZE-01", newVer: "SOP-ZE-02", summary: "更新《零輸出防逆流案場試車與參數調校標準作業書》。" },
        scada_rule: { updated: false, oldVer: "RULE-CLIP-01", newVer: "待 D6 滿 90 天驗證後正式升版", summary: "正在測試全場站「防逆流棄光度數獨立計量標籤」規則。" }
      }
    },
    {
      id: "case-004",
      case_no: "8D-2026-YD04",
      site_name: "高雄遠東鋼鐵 1,240kWp 鋼構廠房光電廠",
      capacity_kwp: 1240.0,
      current_discipline: "D4",
      active_layer: 2,
      severity_spv: 4,
      ap_level: "H",
      loto_isolated: true,
      weather_decoupled: true,
      alarm_suppressed_pct: 74.0,
      sld_node: "380V AC 併網盤 → INV-08 (110kW 無變壓器五電平拓撲) → IGBT 散熱模組與 LCL 濾波器",
      fault_signature: "FS-INV-04: 正午高負載下 IGBT 模組溫升斜率異常 (dT/dt > 1.8°C/min) 觸發 Over-Temp Derating，伴隨共模漏電流 >300mA 與 THD 諧波超標 (6.8%) 跳脫",
      energy_loss_mwh: 28.4,
      pr_drop_pct: 15.2,
      financial_claim_ntd: 145000,
      stage1_human_confirmed: true,
      audit_score: 88,
      d8_closed: false,
      external_report_url: "https://davidyeh51.github.io/solar-8d-portal/高雄遠東鋼鐵_診斷報告.html",
      d1_team: {
        champion: "葉大衛 (維運管理部協理)",
        leader: "姜興中 (資深電氣可靠度工程師)",
        members: [
          "洪稜凱 (SCADA 與 FCA-B-FSA 特徵分析師)",
          "黃昱超 (現場電力品質與熱像檢測師)",
          "林志強 (第三方逆變器板級維修專家 — 原 OEM 已退場)"
        ]
      },
      d2_5w2h_is_not: {
        what_is: "INV-08 散熱風道受煉鋼廠金屬粉塵油泥堵塞，導致 IGBT 結溫超標降額與 LCL 濾波電容容值熱衰減引發諧波共振跳機",
        what_is_not: "非直流組串開路故障，非台電外部停電",
        where_is: "高雄遠東鋼鐵 B 棟軋鋼廠房屋頂排氣口下風處 INV-08",
        where_is_not: "非 A 棟行政大樓屋頂逆變器群",
        when_is: "2026-09-28 至 2026-10-18 每日 10:45–14:30 高環境溫度與鋼廠排氣尖峰",
        when_is_not: "非清晨或低載時段",
        how_many: "INV-08 及同排 INV-07 共 220kW 受影響，累計損失 28.4 MWh，原逆變器 OEM 已退出台灣市場，散熱風扇原廠交期逾 40 週",
        evidence: "電能品質分析儀 THD 6.8% 波形圖、IGBT 散熱鰭片金屬油泥堵塞微距照片、SCADA 內部溫度與風扇電流曲線"
      },
      d3_containment: {
        loto_action: "執行 AC/DC 雙側 LOTO 斷電隔離，拆解 INV-08 散熱風道進行乾冰與高壓絕緣溶劑深度除油泥作業，並設定功率上限 85% 降額保溫運轉",
        batch_scan: "透過 Neo4j 知識圖譜向左擴展 (⇐ Leftward Expansion) 比對同處軋鋼廠排氣下風處之 INV-06~INV-10，發現 INV-07 與 INV-09 亦呈現早期溫升斜率偏移",
        alarm_governance: "聚合「IGBT 過溫」、「PLL 鎖相失步」、「漏電流超標」三類連鎖告警為單一 FCA-B-FSA 複合根因事件"
      },
      d4_occurrence_rc: "軋鋼廠屋頂天窗排出含細微氧化鐵粉塵與冷卻油霧之熱氣流，被逆變器強制風冷風扇吸入後，在鋁合金散熱鰭片與風扇軸承形成高熱阻油泥層，使散熱熱阻上升 65%；長期高溫（內部環境 >72°C）加速 LCL 交流濾波薄膜電容容值衰減 18%，在廠內大型電弧爐諧波背景耦合下引發鎖相環（PLL）失步與漏電流保護跳機。",
      d4_escape_rc: "原逆變器 OEM 於電站建成第 4 年退出市場（符合 NREL 45% OEM 退場統計），現場缺乏原廠高階診斷手冊；且既有 SCADA 僅監測「過溫跳機布林警報」，未監控「散熱器溫升斜率 (dT/dt) 與太陽輻照度之比值漂移」，導致油泥累積 8 個月後才因頻繁跳機被發現。",
      d4_five_why: [
        { level: 1, why: "為何 INV-08 在晴空正午頻繁發生 AC 側諧波超標 (THD > 5%) 與過溫跳脫？", answer: "因為逆變器內部 IGBT 模組溫度飆升至 94°C 觸發降額與保護，同時 LCL 濾波器電容在長期高溫下容值衰減至額定值 82%，喪失高頻諧波抑制能力。", evidence: "SCADA IGBT 溫度曲線 & LCR 錶實測濾波電容值紀錄" },
        { level: 2, why: "為何 INV-08 的 IGBT 模組與內部腔體溫度會比同容量標竿機台 (INV-01) 高出 26°C？", answer: "因為背面鋁擠散熱鰭片間隙 70% 被黑色油性鐵粉泥塊堵塞，且 3 顆散熱風扇中有 2 顆轉速下降 45%。", evidence: "拆機內視鏡照片 & 風速計實測出風口風量僅剩 32 CFM" },
        { level: 3, why: "為何散熱鰭片與風扇會在半年內快速累積油性鐵粉泥塊？", answer: "因為 INV-08 安裝位置正對軋鋼廠房熱軋排氣百葉窗下風處 4 公尺，排出的油霧與氧化鐵微粒直接進入逆變器進風口，而進風口未加裝金屬防塵濾網。", evidence: "廠房氣流煙霧測試影片 & 粉塵成分磁性吸附檢測" },
        { level: 4, why: "為何風扇轉速下降與原廠備品更換會延宕長達數週？", answer: "因為該逆變器 OEM 已退出市場，原規格 IP55 風扇停產且海外交期長達 52 週，維運倉庫未建立跨廠牌高防護等級（IP68 雙滾珠耐油霧風扇）替代料件認證表。", evidence: "供應商詢價回覆單 & NREL 逆變器備品斷鏈研究對照" },
        { level: 5, why: "為何重工業污染環境下的散熱退化與備品斷鏈未能提前預防與攔截（系統與管理根因）？", answer: "【發生制度根因】重工業屋頂案場設計規範未將「排氣口下風處隔離距離與進風防油霧過濾箱」列入強制條款，且未針對孤兒機種（Orphaned OEM）建立關鍵耗材（風扇/電容）安全庫存；【流出系統根因】SCADA 未部署『單位功率溫升斜率（°C/kW）異常退化』之預測性維護模型。", evidence: "場站 PFMEA 與備品庫存清冊稽核報告" }
      ],
      d4_citations: [
        { refId: "CIT-SOLAR-2023-FCA", source: "Solar Energy (2023) Vol. 262: FCA-B-FSA Grid-Tie PV Inverters", quote: "無變壓器逆變器在散熱退化與 LCL 濾波元件老化時，會呈現共模漏電流激增、PLL 失步與 THD 超標之複合故障特徵 (Fault Signatures)。", similarity: 0.97 },
        { refId: "CIT-NREL-2024-OEM", source: "NREL 2024 PV Inverter Reliability Workshop Report", quote: "高達 45% 已安裝逆變器容量在建成 4 年後面臨 OEM 退出市場，且散熱風扇交期可長達 52 週，必須建立第三方替代工程規格與預測性溫升監控。", similarity: 0.98 }
      ],
      d5_pca: [
        { action: "導入工業級 IP68 耐油霧雙滾珠散熱風扇（Sanyo Denki 同尺寸替代件）與耐 105°C 薄膜濾波電容完成 INV-06~INV-10 預防性升級。", owner: "林志強 / 姜興中", due: "2026-10-25", risk_check: "已完成 48 小時滿載熱室測試，溫升降低 19.4°C" },
        { action: "於逆變器進風側加裝快拆式 304 不鏽鋼迷宮防油霧濾網箱，並設計導風罩隔絕軋鋼廠排氣直吹。", owner: "黃昱超", due: "2026-10-28", risk_check: "風阻壓降 < 8%，不影響額定風量" },
        { action: "透過 searlion 邏輯章節切塊將該退場 OEM 全系列維修手冊與替代料件表寫入雙模態 RAG 知識庫，並於 SCADA 部署『IGBT 溫升/出力比值』早期預警規則。", owner: "洪稜凱", due: "2026-11-02", risk_check: "歷史檢索速度 < 10 秒" }
      ],
      d6_validation: {
        short_term: "INV-08 完成風道重構與替代風扇/電容更換後，正午滿載 IGBT 溫度由 94°C 降至 66.5°C，THD 降至 2.1% (<5% 法規上限)。",
        long_term_p2p: "待 D5 全數部署後啟動 90 天 UNSW P2P 與 HP 濾波長期收斂追蹤。",
        before_ratio: 0.812,
        after_ratio: 0.945,
        recurrence_rate: 0
      },
      d7_docs_updated: {
        pfmea_dfmea: { updated: false, oldVer: "v2.4", newVer: "待 D6 驗證後升版", summary: "擬新增鋼鐵/化工廠屋頂排氣熱油霧腐蝕失效模式。" },
        control_plan: { updated: false, oldVer: "CP-IND-01", newVer: "待 D6 驗證後升版", summary: "擬新增每季逆變器單位功率溫升比值 (ΔT/P_ac) 監控。" },
        sop_sip: { updated: false, oldVer: "SOP-INV-05", newVer: "待 D6 驗證後升版", summary: "編撰孤兒逆變器 (Orphaned OEM) 風扇與電容板級替代檢修作業書。" },
        scada_rule: { updated: false, oldVer: "RULE-TEMP-02", newVer: "待 D6 驗證後升版", summary: "測試 IGBT 溫升斜率與風扇電流異常預警規則中。" }
      }
    }
  ],

  // 3. 中層 Layer 2：雙模態知識庫邏輯語義塊與 FCA-B-FSA 圖譜節點庫
  knowledgeChunks: [
    {
      chunk_code: "SEC-DC-019",
      source_doc: "IEC 62852 & 進金生水面型光電 PFMEA 專家驗證庫 v3.3",
      section_hierarchy: "CH4 直流配電系統 > 4.2 MC4 連接器 > 4.2.3 跨廠牌混插與微動腐蝕失效",
      fault_signature: "FS-DC-01: 晴空下 MPPT V_mp 正常 (98%~102% Peer)，I_mp 階梯式下跌 (1/N 比例)，伴隨間歇 R_iso < 1MΩ 告警與接頭局部熱斑 ΔT > 15°C",
      sld_topology_node: "PV String → MC4 Cross-Connector → DC Combiner / MPPT Input",
      occurrence_rc: "跨廠牌公母連接器混插（Cross-mating）公差不匹配 + 浮體/支架微振無應力釋放弧度，引發插針微動腐蝕（Fretting Corrosion）與接觸電阻激增 (>30mΩ)。",
      escape_rc: "SCADA 僅設整機零發電告警，未部署 UNSW P2P 支路電流均衡度監測；巡檢抽樣未涵蓋高撓曲跨接區。",
      recommended_pca: "100% 汰換為同型號原廠認證接頭（如 Stäubli MC4-Evo 2）+ 專用壓接鉗與 2.5 N·m 扭力簽核 + 增設 Ω 型應力緩衝彎 + 部署 MPPT 同儕電流偏移 >12% 自動派工規則。",
      expert_validated: true,
      citation_ref: "[CIT-IEC-62852 / NREL-2024-P14 / UNSW-DC50]"
    },
    {
      chunk_code: "SEC-INV-042",
      source_doc: "Solar Energy (2023) FCA-B-FSA & 退場 OEM 逆變器板級維修知識庫 v2.1",
      section_hierarchy: "CH7 無變壓器逆變器拓撲 > 7.4 IGBT 熱管理與 LCL 濾波退化 > 7.4.2 工業油霧環境複合失效",
      fault_signature: "FS-INV-04: 正午高出力時段 IGBT 溫升斜率 dT/dt > 1.5°C/min、功率主動降額 (Thermal Derating)，伴隨共模漏電流 >300mA 與 AC THD > 5% 鎖相失步跳機",
      sld_topology_node: "Inverter Power Stack (IGBT) → Heatsink & Cooling Fan → LCL Output Filter → PCC",
      occurrence_rc: "工業排氣油霧與金屬粉塵堵塞散熱鰭片及風扇軸承，熱阻上升致腔體長期高溫 (>70°C)，加速 LCL 薄膜電容容值熱衰減，引發電網諧波耦合共振。",
      escape_rc: "OEM 退出市場致原廠備品與診斷中斷；SCADA 僅監控過溫跳機點，缺乏「單位功率溫升比值 (ΔT/kW)」退化趨勢監控。",
      recommended_pca: "認證工業級 IP68 耐油霧雙滾珠替代風扇與 105°C 薄膜電容 + 進風口加裝 304 不鏽鋼迷宮濾網箱 + 部署 IGBT 溫升斜率預測性維護模型。",
      expert_validated: true,
      citation_ref: "[CIT-SOLAR-2023-FCA / CIT-NREL-2024-OEM]"
    },
    {
      chunk_code: "SEC-MET-008",
      source_doc: "ALZ-11 數據審計管線 & UNSW-Solar HP 時序濾波診斷規範 v1.5",
      section_hierarchy: "CH2 SCADA 數據預處理 > 2.3 氣象感測器漂移解耦 > 2.3.1 日照計結露失真與泥膜積垢分離",
      fault_signature: "FS-MET-02: 表觀 PR 異常大於 100% (105%~115%)，但全場等價時數 Ey 相對 pvlib 晴空模型與鄰近基準站持續下滑 >10%",
      sld_topology_node: "POA Pyranometer → Modbus RTU Logger → SCADA PR Engine & PV Array Surface",
      occurrence_rc: "日照計球罩受泥霧污染或內部結露導致輻照度分母讀數偏低 20%+，同時低傾角模組表面受汛期鈣化泥膜覆蓋致真實透光率下降。",
      escape_rc: "SCADA 直接信任單點日照計分母，未部署 pvlib 晴空輻照度包絡線自檢與 HP 濾波趨勢分解。",
      recommended_pca: "部署 pvlib 晴空模型自動交叉審計（偏差 >12% 自動切換備援基準並派修日照計）+ 導入汛期後 10 日內旋轉軟毛刷機械清洗 SOP。",
      expert_validated: true,
      citation_ref: "[CIT-ALZ11-AUDIT / CIT-UNSW-HP40]"
    },
    {
      chunk_code: "SEC-AC-031",
      source_doc: "UNSW-Solar Clipping 診斷庫 & 自發自用防逆流微電網控制規範 v2.0",
      section_hierarchy: "CH6 併網與功率控制 > 6.1 零輸出防逆流 (Zero-Export) > 6.1.4 假日負載驟降與過阻尼壓載",
      fault_signature: "FS-AC-03: 晴空高輻照時段全場逆變器同步呈現水平或鋸齒狀功率截割 (Clipping)，V_dc 偏高 (接近 V_oc)、I_dc 隨指令下調，無硬體故障碼",
      sld_topology_node: "Point of Common Coupling (PCC) CT Meter → Smart Logger Zero-Export PID → All Inverters",
      occurrence_rc: "廠區假日或午休生產負載低於光電出力，加上防逆流控制器安全死區設定過大与慢速 PID 響應，導致過度棄光。",
      escape_rc: "SCADA 未分離「防逆流指令棄光量」與「設備故障損失」，致使長期棄光被誤判為日照不足。",
      recommended_pca: "調優防逆流控制週期至 1 秒級並縮小安全死區至 2% + 部署 UNSW Clipping 面積積分獨立計量 + 規劃表後儲能 (BESS) 能量時移。",
      expert_validated: true,
      citation_ref: "[CIT-UNSW-CLIP50 / CIT-OIHIKA-MPC]"
    },
    {
      chunk_code: "SEC-PV-005",
      source_doc: "sprince0031 I-V-G 非線性分類器 & ISA-18.2 告警合理化手冊 v1.2",
      section_hierarchy: "CH1 D0 前置初篩 > 1.1 氣象干擾解耦 > 1.1.2 內部線間短路 (LL Fault) vs 短暫雲層遮擋",
      fault_signature: "FS-DC-05: 太陽輻照度 G 維持 >800 W/m² 高水準，但單一組串電壓 V_mp 瞬間跌落 ΔV > 10% (約 2~3 個模組電壓) 且電流逆流或驟降",
      sld_topology_node: "PV Module Sub-string Bypass Diode / Cable Insulation → String Fuse",
      occurrence_rc: "模組背板或跨接線纜受支架銳邊磨損對地/線間短路（Line-to-Line Fault），或旁路二極體擊穿短路。",
      escape_rc: "傳統定值告警易將短暫烏雲飄過（G 與 I 同步下降，V 微降）誤報為故障，或為防誤報而調寬閾值導致真實 LL 短路被忽略。",
      recommended_pca: "部署 sprince0031 Random Forest / SVM 之 I-V-G 三維非線性分類器於 D0 閘門：自動忽略 G 同步下挫之雲遮事件，僅在 G 高而 V 異常塌陷時鎖定 LL 短路派工。",
      expert_validated: true,
      citation_ref: "[CIT-SPRINCE-IVG / CIT-ISA-18.2]"
    }
  ],

  // 4. 文件四大權威表格完整結構化資料 (供 Tab 5 與各層審查引擎調用)
  disciplineSpecs: [
    { d: "D0", name: "緊急響應與初篩", layer: "Layer 1", task: "電氣安全隔離（LOTO）、火災/電弧風險評估、SCADA 氣象干擾解耦", tools: "pvlib 晴空輻照模型、I-V-G 非線性分類器、光伏 FMEA 嚴重度 (S_PV in [1,5])", gate: "退件缺失：將雲層遮擋或溫標 (°F/°C) / 單位 (W/kW) 跳變誤判為設備故障而盲目派工；S_PV=5 未立即執行 LOTO 隔離。", weight: "前置門檻" },
    { d: "D1", name: "成立跨職能團隊", layer: "Layer 1", task: "組建涵蓋現場電氣、SCADA 數據、OEM 供應商 FAE 與資產管理之 2–10 人團隊", tools: "角色權責矩陣（Leader、Champion、SME）、Kamble (2026) 多目標 AI 團隊組建演算法", gate: "退件缺失：僅由單一維運人員掛名、未指定具決策權之 Champion、缺乏跨部門協同、或將 D1 與 D2 順序混淆（FQI 警示）。", weight: "10%" },
    { d: "D2", name: "問題精確描述", layer: "Layer 1", task: "量化 5W2H 與損失（MWh、PR 跌幅、金額），繪製 SLD 單線圖故障位置與附上客觀證據", tools: "Is / Is Not 邊界分析法、無人機 IR 熱像 / EL 影像、SCADA 故障波形切片、UNSW P2P", gate: "退件缺失：僅寫「3號逆變器異常」等定性模糊詞彙，無量化損失數據、無 Is/Is Not 矩陣或無客觀影像佐證。", weight: "15%" },
    { d: "D3", name: "臨時遏制措施", layer: "Layer 2", task: "切離故障組串/MPPT、熱插拔備件替換、同批次設備 100% 紅外線普查、SCADA 告警降噪", tools: "ISA-18.2 / IEC 62682 / EEMUA 191 告警合理化規範、倉儲批次追溯系統（Batch Localization）", gate: "退件缺失：僅寫「加強巡檢」而無具體隔離範圍、未排查同批次設備、無完成時間點、未驗證遏制措施是否引入諧波副作用。", weight: "15%" },
    { d: "D4", name: "根本原因分析 (RCA)", layer: "Layer 2 & 3", task: "雙軌分析：追查物理/管理「發生根因 (Occurrence RC)」與 SCADA/巡檢「流出根因 (Escape RC)」", tools: "5-Why（>=5 層且符 MECE 與雙向可逆）、6M 魚骨圖、FTA 故障樹、FCA-B-FSA、CIRCA / TWVNS 圖譜推論、uptrain 引文核驗", gate: "退件缺失：止步於 1–3 層 Why、歸咎於「人員操作疏忽 (Human Error)」或「零件自然老化」、未區分發生因與流出因、無實測數據或超出專家知識庫產生 AI 幻覺。", weight: "30% (核心雙倍權重)" },
    { d: "D5", name: "永久糾正措施 (PCA)", layer: "Layer 2", task: "針對 D4 每一條發生因與流出因一對一制定軟硬體改造（韌體更新、散熱改良、換料、預測模型）", tools: "糾正措施對照矩陣、副作用與二次風險評估（Risk Assessment）、熱應力驗證、ArnabbLank Copilot", gate: "退件缺失：D5 對策與 D4 根因邏輯脫節、使用「提升人員意識/加強培訓」等空泛描述、無明確負責人與期限。", weight: "15%" },
    { d: "D6", name: "實施與效果驗證", layer: "Layer 3", task: "全面部署永久對策、移除 D3 臨時措施、執行短期晴空日確認與 3–6 個月長期 PR 追蹤驗證", tools: "UNSW-Solar 同儕比對演算法（P2P PR）、Hodrick-Prescott (HP) 時序濾波分解", gate: "退件缺失：剛換完零件即立即結案，缺乏跨氣候週期（3–6 個月）的長期發電恢復收斂與零復發統計驗證。", weight: "10%" },
    { d: "D7", name: "預防再發與水平展開", layer: "Layer 3", task: "全場站/跨案場水平展開（Yokoten），強制修訂四大核心技術與管理文件版次", tools: "/control-plan-builder、PFMEA/DFMEA（重算 S/O/D 與 RPN/AP）、控制計畫（CP）、SOP/SIP、SCADA 預警庫", gate: "退件缺失：將 D5/D6 對策直接複製貼上至 D7、僅總結教訓卻未實質更新 PFMEA/CP/SOP/SCADA 四大文件版次與培訓簽核紀錄。", weight: "3% (與D8合佔5%)" },
    { d: "D8", name: "團隊認可與閉環歸檔", layer: "Layer 3", task: "確認行動項 100% 完成、業主/品保主管書面簽核結案、結構化寫入雙模態 RAG 企業知識庫", tools: "結案檢核表（Closure Checklist）、searlion 邏輯章節切塊、Milvus 向量 + Neo4j 圖譜雙模態知識庫", gate: "退件缺失：未取得客戶或品保最終簽核確認、歷史報告散落於本地資料夾而未結構化切塊寫入 RAG 知識庫。", weight: "2% (與D7合佔5%)" }
  ],

  academicPapers: [
    { authors: "Oancea, Ionescu & Pirvu (2025)", journal: "MDPI Applied Sciences, Vol. 15(20), 11262", theory: "工業 4.0 整合 8D 軟硬體閉環架構：LLM 客訴解析與批次定位 + 非侵入式 IoT 監控 + 雲端數位編目庫 + 自動化報告引擎", stages: "D1–D8 全流程", metrics: "歷史對策檢索提速 300 倍（300 分鐘降至 <1 分鐘）、報告生成 <1 分鐘、故障復發率降 100%、客訴降 75%、Cpk 達 1.85（最高 Ppk 2.57）、非品質成本由 €12,916 降至 0。" },
    { authors: "Kamble et al. (2026) & Fischer / Foxley Quality Intelligence (2026)", journal: "SSRG IJME Vol. 13(5) & J. Tech Vol. 16(4) / FQI Fact Check", theory: "LLM 問題分診分類器 + 多目標跨職能團隊優化演算法；輔以 FQI 三大認識論陷阱查核規範", stages: "D1 團隊組建 / D2 問題分診 / D4 邏輯查核", metrics: "67 筆案例分類準確率 89.7%、F1 0.895；FQI 嚴厲警示：(1) 嚴禁混淆 D1 團隊與 D2 描述順序、(2) 分診速度不等於根因品質、(3) D4 看似合理的 AI 推論不等於已驗證物理根因。" },
    { authors: "Belu et al. & MDPI Applied Sciences (2026)", journal: "Applied Sciences, Vol. 16(5), 2591", theory: "風險分級 AI-FMEA 預處理與 8D 動態互賴：確定性規則過濾低風險 + 封閉專家驗證知識庫約束之 AI 生成（專責中高風險）", stages: "D0 風險分診 / D4 根因分析 / D7 FMEA 更新", metrics: "強制限制 AI 僅能引用專家驗證知識庫（Expert-Validated KB），徹底消除生產環境 AI 幻覺；消除 S-O-D 主觀評分偏差並於 D7 自動回寫 FMEA 與 AP 行動優先級。" },
    { authors: "Komatina, Marinković & Simić (2025/2026)", journal: "MDPI Algorithms, Vol. 19(7), 510", theory: "混合模糊多準則決策演算法：模糊最佳最差法 (FBWM) + 模糊簡單排序評估法 (FSREM) + 加權 γ-融合矩陣", stages: "D1–D8 資源與審查權重分配", metrics: "透過平方與根號正規化模糊矩陣運算，建立跨企業（Company A, B, C）高度一致的 8D 各步驟折衷排序指標（Compromise Ranking Index）。" },
    { authors: "FCA-B-FSA (2023) & PV Reliability FMEA (2024)", journal: "Solar Energy Vol. 262(2), 111831 & Sustainability 16(10), 4183", theory: "基於故障特徵分析之併網逆變器失效原因映射 (FCA-B-FSA) + 光伏三階層 FMEA (S_PV in [1,5]) + NREL NLP 字典與 SLD 能量流", stages: "D0 分級 / D2 特徵提取 / D4 物理根因 / D7 風險重算", metrics: "建立交直流故障特徵（共模漏電流、THD、MPPT 電流塌陷）至根因（RCs）統計映射；證明分散式組串逆變器可用度因子高於集中式；破解『異常在逆變器捕獲但根因在 DC 側』盲區。" },
    { authors: "RCInvestigator & CIRCA / KGroot (2026)", journal: "IEEE / HVDC & Power System Ontology RCA", theory: "知識圖譜可控式交互推理（向上泛化算子 ⇑、水平類比算子 ⇐）+ 兩階段 RCI 與基於拓撲之加權變鄰域搜尋 (TWVNS)", stages: "D2 範圍擴展 / D4 拓撲溯源 / D7 橫向展開", metrics: "透過將 3SAT 約化證明『根因傳播路徑推論屬於 NP-hard 問題』，利用 TWVNS 啟發式演算法即時標定從上游起點至告警終點的完整跨節點故障傳播路徑。" }
  ],

  githubSkills: [
    { repo: "RBraga01/Quality-Engineering-Skills", modules: "/8d-coach, 8d-problem-solving, 8d-report-writing, /rca-facilitator, 5why-root-cause, supplier-scar, /control-plan-builder, is-is-not-scoping", standards: "agentskills.io, ISO 9001 §10.2, IATF 16949 §10.2.3, AIAG-VDA FMEA 2019, VDA 6.3, GB/T 29076—2021", role: "包含 22 個品質 Skill 與 8 個互動 Agent：執行驗證優先邏輯（Validation-First Logic），直接退回『人為疏失』根因、強制雙根因（發生因+流出因）、檢查雙向可逆 5-Why 鏈與 D7 控制計畫更新。" },
    { repo: "duding-engicool/skill-8d-report-analyzer", modules: "SKILL.md, scripts/parse_document.py, references/8d-criteria.md", standards: "Python (docx/PyPDF2/openpyxl), MECE 原則, TRACE 品質測評 47/50 高分認證", role: "強制兩階段工作流（Stage 1 解析經人工確認後方可啟動 Stage 2 評分）；執行百分制加權評鑑（D1:10%, D2:15%, D3:15%, D4:30%, D5:15%, D6:10%, D7/D8:5%）與 D7 四大工程文件版次修訂稽核。" },
    { repo: "manojsurapaneni/manufacturing-ops-skills", modules: "8D Report Builder, PFMEA Generator", standards: "Manufacturing & O&M AI Agent Skills, FMEA RPN = S x O x D 計分模型", role: "將現場異常事件快速轉換為結構化 8D 報告，並同步生成或重算程序 FMEA (PFMEA) 風險矩陣。" },
    { repo: "LeoYeAI/openclaw-master-skills & allinherog-star/ai-skills", modules: "complaint-8d-report, quality-complaint-8d-report, zanozbot CLI", standards: "OpenClaw / 通用型 LLM Agent Skill 結構規範與 TypeScript CLI", role: "從非結構化客訴或現場維運報修工單中自動提取 5W2H 特徵，提供 D1–D8 填空式引導與標準模板生成。" },
    { repo: "aws-samples/sample-intelligent-alarms-agent", modules: "Supervisor Agent, PI Historian Agent, Maximo Ticket Agent, Document Knowledge Agent", standards: "AWS Bedrock AgentCore, Python MCP Tools, ISA-18.2 / IEC 62682 / EEMUA 191", role: "解決 SCADA 告警風暴（自動過濾 60%–80% 附屬誤報），跨時序資料庫、CMMS 工單庫與 SOP 知識庫生成 D2/D3/D4 初稿。" },
    { repo: "didilili/deepsearch-agents & shopkeeper-agent", modules: "main_agent.py, subagents/ (MySQL, RAGFlow, Web), prompts.yml", standards: "LangGraph, RAGFlow, Qdrant / Elasticsearch, MySQL, FastAPI", role: "提供企業級多智能體 RAG 知識庫底座，聯合查詢結構化 SCADA MySQL 數據與私有非結構化歷史 8D PDF，匯總輸出正式報告。" }
  ],

  jupyterNotebooks: [
    { id: 1, repo: "thomasathul/Root-Cause-Analysis-Using-RAG", path: "Generate_LLM_Response.ipynb", stack: "RAG 檢索生成架構、合成數據增強 (Synthetic Data Augmentation)、MCC / F1 / 餘弦相似度評估", role: "【D4 根因推論核心】結合外部領域知識庫克服複雜組件互賴瓶頸，提升罕見故障模式泛化力並量化評估根因準確度。" },
    { id: 2, repo: "ArnabbLank/Predictive-Maintenance-RCA", path: "week08-knowledge-base-rag/08_knowledge_base_rag.ipynb", stack: "預測性維護感測器異常檢測 + 向量知識庫 RAG + week09 Agentic Copilot", role: "【D4/D5 知識庫連動】將前端遙測設備退化訊號與向量化歷史維修報告、設備 FMEA 及 SOP 直接打通，自動擬定根因與 PCA 對策。" },
    { id: 3, repo: "uptrain-ai/uptrain", path: "examples/root_cause_analysis/rag_with_citation.ipynb", stack: "RAG_WITH_CITATION 專用 RCA 模板、EvalLLM 本地端錯誤模式診斷", role: "【D4/D7 防幻覺閘門】強制 RAG 系統生成根因與對策時附上精確文檔引文（Cited Responses），支援 Local 私密運行保障保固索賠機密。" },
    { id: 4, repo: "NVIDIA-AI-Blueprints/streaming-data-to-rag", path: "launchable.ipynb (NVIDIA/context-aware-rag)", stack: "Milvus Standalone (向量庫) + Neo4j (知識圖譜)、時間窗口感知檢索 (CA-RAG)", role: "【D2/D4 時序與圖譜溯源】將即時 SCADA 事件流與現場語音轉錄動態注入 Neo4j 圖譜，支援特定異常前後 5–10 分鐘時間窗口檢索。" },
    { id: 5, repo: "searlion/rag-strategies", path: "contextual_chunking.ipynb", stack: "Gemini 2.5 Pro (temp=0.0, JSON section_map.json)、all-mpnet-base-v2、FAISS 向量庫", role: "【D7/D8 知識庫文檔治理】解決逆變器手冊與歷史 8D PDF 固定字數切塊語義斷裂問題，依章節邏輯邊界切分為 171 個完整語義塊。" },
    { id: 6, repo: "UNSW-Solar/performance_diagnosis", path: "20-Preprocess / 22-ClearSky / 32-P2P_LongTerm / 40-AC_Recurring / 50-FIMER_Shading_Clipping_0Gen.ipynb", stack: "pvlib 晴空模型、同儕比對 (P2P PR)、Hodrick-Prescott (HP) 濾波、MPPT 閾值分類", role: "【D0/D2/D4/D6 全週期電氣核心】清洗夜間偏移、建立晴空基準、HP 濾波分離積灰與硬體老化、診斷 DC 零發電/截割，提供 D6 3–6 個月長期 PR 收斂驗證。" },
    { id: 7, repo: "sprince0031/Solar-Fault-Detection-Classification-Project", path: "Solar_Project.ipynb", stack: "I-V-G 非線性特徵工程、Random Forest (隨機森林)、SVM 多元分類器", role: "【D0/D2 誤報攔截器】精確解耦『組件內部線間短路 (LL Fault)』與『外部短暫雲層遮擋 (Passing Cloud Shading)』，防止假性 8D 立項。" },
    { id: 8, repo: "ALZ-11/campus-energy-optimization & oihika/Degradation-Aware-MPC", path: "notebooks/campus-energy-optimization.ipynb & code with output.ipynb", stack: "SCADA 溫標(°F/°C)/功率單位(W/kW)審計、pvlib + XGBoost 動態基準、SCADA Alarm Console", role: "【D0/D2/D3 數據清洗與告警主控台】消除單位跳變與靜態常數效率噪聲 (96.99%)，聚合母線電壓/壅塞/低 SOC 告警並自動渲染 PDF 技術報表。" }
  ]
};
