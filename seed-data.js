/**
 * 進能服維運事業單位 — 8D分析管理平台
 * 麥肯錫金字塔原理 (Pyramid Principle) 案例資料庫與 11 大已安裝 AI Agent Skills 清單
 */

window.PV_8D_SKILLS_REGISTRY = [
  {
    id: "pv-performance-diagnosis",
    name: "UNSW-Solar 光伏性能診斷與同儕比對引擎",
    repo: "UNSW-Solar/performance_diagnosis",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-performance-diagnosis",
    layer: "Layer 1 數據感知與時序物理診斷層",
    stages: ["D0", "D2", "D4", "D6"],
    category: "電氣與微氣象時序類",
    conclusion: "透過 P2P 同儕比對與 HP 濾波分解，無需額外硬體即可定位 AC/DC 遮蔽、截割、斷路與長週期衰減。",
    metrics: "定位精度達 MPPT 迴路級；D6 支援 3–6 個月長週期收斂驗證",
    files: "pv_Diagnostic_Functions.py / PV plant performance diagnosis.ipynb"
  },
  {
    id: "pv-ll-cloud-decoupling",
    name: "線間短路故障與動態浮雲遮蔽解耦模型",
    repo: "sprince0031/Solar-Fault-Detection-Classification-Project",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-ll-cloud-decoupling",
    layer: "Layer 1 數據感知與時序物理診斷層",
    stages: ["D0", "D4"],
    category: "電氣與微氣象時序類",
    conclusion: "利用 I-V-G 非線性耦合特徵區分「內部線間短路 (LL Fault)」與「外部浮雲遮蔽」，消除 65% 以上天氣假陽性派工。",
    metrics: "Random Forest / SVM 分類準確率 > 98.2%；支援 D0 自動氣象解耦閘門",
    files: "Solar_Project.ipynb / All_Solar_Data.csv"
  },
  {
    id: "pv-soma-iot-agent",
    name: "SOMA 10秒級 IoT 監測、RUL 預測與對話式維運代理",
    repo: "Azza-chr/SOMA",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-soma-iot-agent",
    layer: "Layer 1 & Layer 2 邊緣感測與對話協同層",
    stages: ["D0", "D3", "D5"],
    category: "電氣與微氣象時序類",
    conclusion: "以 MQTT 10 秒級高頻採樣結合 XGBoost 預測組件剩餘壽命 (RUL)，並由 LLM 轉譯為現場可執行之排修指令。",
    metrics: "10s 邊緣感測頻率；支援積灰、過熱、高接觸阻抗分類與 RUL 天數估算",
    files: "SOMA IoT Telemetry + DeepSeek Conversational Agent"
  },
  {
    id: "pv-scada-audit-reporting",
    name: "SCADA 髒數據審計清洗與 pvlib+XGBoost 動態基線引擎",
    repo: "ALZ-11/campus-energy-optimization",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-scada-audit-reporting",
    layer: "Layer 1 數據感知與時序物理診斷層",
    stages: ["D0", "D2", "D8"],
    category: "SCADA 審計與自動報告類",
    conclusion: "自動攔截 °F/°C 溫度錯置、W/kW 量綱溢位與逆變器離線恆定 96.99% 假效率，確保 D2 損失核算零失真。",
    metrics: "四大髒數據自動清洗規則；pvlib 物理模型 + XGBoost 殘差動態基線",
    files: "notebooks/campus-energy-optimization.ipynb / report.pdf"
  },
  {
    id: "pv-smartgrid-smote-fault",
    name: "SMOTE 極端不平衡罕見故障偵測與效率迴歸模型",
    repo: "milin-rao-deshmukh/Smart-Grid-Fault-Detection-and-Performance-Prediction-Supervised-ML-Project",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-smartgrid-smote-fault",
    layer: "Layer 1 數據感知與時序物理診斷層",
    stages: ["D0", "D2", "D4"],
    category: "電氣與微氣象時序類",
    conclusion: "針對僅佔 3% 的罕見電氣故障進行 SMOTE 特徵合成過採樣，解決傳統模型漏報（高假陰性）並同步預測應有轉換效率。",
    metrics: "50,000 筆電網與環境樣本訓練；雙任務（故障分類 + 效率缺口迴歸）",
    files: "SMOTE + Gradient Boosting Classifier & Regressor"
  },
  {
    id: "pv-isa182-intelligent-alarms",
    name: "ISA-18.2 / IEC 62682 智慧告警合理化多代理協同系統",
    repo: "aws-samples/sample-intelligent-alarms-agent",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-isa182-intelligent-alarms",
    layer: "Layer 2 多代理協同決策與告警合理化層",
    stages: ["D0", "D1", "D3"],
    category: "SCADA 告警降噪與多代理類",
    conclusion: "透過 Supervisor / Historian / Ticket / Document 四大 Agent 協同，折疊連鎖衍生告警並消除 60%–80% 無效告警洪水。",
    metrics: "遵循 ANSI/ISA-18.2 與 EEMUA 191 標準；自動生成帶 LOTO 規範之派工單",
    files: "Supervisor + PI Historian + Maximo + Document Agents"
  },
  {
    id: "pv-microgrid-alarm-mpc",
    name: "光儲微電網劣化感知 MPC 與 SCADA 告警控制台",
    repo: "oihika/Degradation-Aware-MPC-for-a-Freiburg-Renewable-District-Microgrid",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-microgrid-alarm-mpc",
    layer: "Layer 2 多代理協同決策與告警合理化層",
    stages: ["D2", "D3", "D5"],
    category: "SCADA 告警降噪與多代理類",
    conclusion: "整合母線過壓告警 (Voltage Alarms)、饋線熱壅塞 (Congestion) 與電池低 SOC 保護，防止午間併網過壓跳機截割。",
    metrics: "支援 PCC 電壓越限預警與儲能 SOH 劣化成本最佳化調度",
    files: "code with output.ipynb (SCADA Alarm Console)"
  },
  {
    id: "pv-vision-defect-suite",
    name: "太陽能 IR 熱像 / EL 隱裂視覺缺陷定位與電氣雙軌對照套件",
    repo: "hackingmaterials/pv-vision",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\pv-vision-defect-suite",
    layer: "Layer 2 多代理協同決策與視覺驗證層",
    stages: ["D3", "D4", "D6"],
    category: "光學與紅外線視覺對照類",
    conclusion: "採「電氣時序初篩鎖定異常迴路 ＋ CV 電腦視覺像素級定位熱斑/隱裂」雙軌策略，節省 90% 無人機全場盲拍算力。",
    metrics: "整合 pv-vision / PVEL-AD / YOLOv9；精確量化接頭 ΔT > 45°C 熱斑與二極體短路",
    files: "pv-vision module segmentation + IR/EL defect classifier"
  },
  {
    id: "quality-8d-engineering-skills",
    name: "品質工程 8D 專家技能包 (/8d-coach, 5-Why, SCAR, PFMEA)",
    repo: "RBraga01/Quality-Engineering-Skills",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\quality-8d-engineering-skills",
    layer: "Layer 3 數位品質工程與知識沉澱層",
    stages: ["D1", "D2", "D4", "D5", "D7"],
    category: "8D 品質工程與合規稽核類",
    conclusion: "強制執行 Is/Is Not 邊界矩陣、雙向 5-Why（發生鏈 vs 流出鏈）與 D7 PFMEA/管制計畫連動升版，杜絕人為疏失假根因。",
    metrics: "內建 6 大子技能：/8d-coach, is-is-not, 5why, supplier-scar, pfmea, control-plan",
    files: "skills/8d-coach, rca-facilitator, supplier-scar, control-plan-builder"
  },
  {
    id: "skill-8d-report-analyzer",
    name: "8D 報告百分制加權合規評分與兩階段防幻覺審查引擎",
    repo: "duding-engicool/skill-8d-report-analyzer",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\skill-8d-report-analyzer",
    layer: "Layer 3 數位品質工程與知識沉澱層",
    stages: ["D4", "D7", "D8"],
    category: "8D 品質工程與合規稽核類",
    conclusion: "以 D4 佔比 30% 之百分制加權評分表與兩階段人工確認機制，攔截缺乏實證之 AI 幻覺並確保 TRACE ≥ 45/50 方可結案。",
    metrics: "100 分制加權審計（D4 權重 30%）+ TRACE 50 分制認證；未達 85 分自動退件",
    files: "SKILL.md + Weighted 8D Rubric & Two-Stage Confirmation"
  },
  {
    id: "solar-8d-diagnostic",
    name: "進能服光電 8D 決策簡報與 DCF 財務防損估值核心技能",
    repo: "davidyeh51/pv-8d-management-platform",
    localPath: "C:\\Users\\davidyeh\\.gemini\\config\\skills\\solar-8d-diagnostic",
    layer: "Layer 3 數位品質工程與知識沉澱層",
    stages: ["D0", "D2", "D4", "D8"],
    category: "8D 品質工程與合規稽核類",
    conclusion: "將 UNSW 物理診斷直接轉化為麥肯錫金字塔結構之 8D 決策簡報，並量化 20 年生命周期 DCF 淨現值防損效益。",
    metrics: "整合 12 頁顧問級簡報視圖、零幻覺引文閘門與 TWVNS 知識圖譜溯源",
    files: "SKILL.md + McKinsey 8D Slide Deck Generator"
  }
];

window.PV_8D_CASES_DATA = [
  {
    id: "PV-2026-SKP01",
    code: "PV-2026-SKP01",
    siteName: "台南麻豆・世堃塑膠廠房屋頂電站",
    capacityKwp: 582.12,
    inverterSpec: "Huawei SUN2000-60KTL-M0 × 9 台（共 54 路 MPPT / 108 串）",
    targetEquip: "INV #10（63.24 kWp，6 路 MPPT / 12 串，單串 17 片 × 310W）",
    occurDate: "2026-01-23（緩慢劣化）→ 2026-02-11（完全斷路）",
    reportDate: "2026-03-23",
    stage: "D8",
    statusLabel: "D8 已結案認證",
    traceScore: 47,
    weightedScore: 94,
    fitRate: 4.1835,
    lostKwh: 3251.5,
    lostRevenueNtd: 13603,
    annualLossKwh: 26397,
    annualLossNtd: 110432,
    dcf20YrNpvNtd: 1584000,
    repairCostNtd: 6500,
    paybackDays: 21.5,
    prBefore: 61.9,
    prPeer: 81.2,
    prAfter: 81.0,
    irrPct: 9.82,
    // Slide 0 Cover
    cover: {
      tag: "8D PROBLEM SOLVING & UNSW SOLAR DIAGNOSTIC REPORT · PV-2026-SKP01",
      conclusionTitle: "世堃塑膠案場 INV #10 發電短少 22.84% 係由 MPPT1/MPPT3 兩路組串正極 MC4 接頭壓接不良熱熔斷路所致，更換原廠端子後可全額挽回年化 NT$ 11.04 萬損失",
      subtitle: "結合 UNSW-Solar P2P 同儕比對、ISA-18.2 告警降噪與雙向 5-Why 根因實證之三層式 AI 閉環決策報告",
      kpis: [
        { label: "50 天累計短少度數 (D2)", value: "3,251.5 kWh", note: "較同儕基準短少 -22.84%", isAccent: true },
        { label: "年化預期挽回營收 (D8)", value: "NT$ 110,432 /年", note: "年化防損 26,397 kWh (FIT 4.1835)", isAccent: true },
        { label: "20 年 DCF 累積防損淨現值", value: "NT$ 158.4 萬", note: "維修投入僅 NT$ 6,500（21.5 天回本）", isAccent: false },
        { label: "8D 合規審查 / TRACE 評分", value: "94 分 / 47/50", note: "通過零幻覺引文閘門與雙根因驗證", isAccent: false }
      ],
      metaLeft: [
        ["案場名稱與容量", "台南麻豆・世堃塑膠廠房屋頂電站（582.12 kWp）"],
        ["異常標的設備", "INV #10（額定 60kW / 實裝 63.24 kWp，轄 6 路 MPPT、12 串組串）"],
        ["異常演進時間軸", "2026/01/23 接觸電阻劣化 (-14.7%) → 2026/02/11 熱熔開路 (-32.4%)"]
      ],
      metaRight: [
        ["核心調用 AI Skills", "pv-performance-diagnosis · pv-ll-cloud-decoupling · quality-8d-engineering-skills"],
        ["物理根因結論 (D4)", "MPPT1 (PV1/PV2) 與 MPPT3 (PV5/PV6) 屋頂穿線盒前 MC4 接頭退針碳化開路"],
        ["系統流出根因 (D4)", "SCADA 僅設整機離線告警，缺乏 MPPT 級別同儕電流偏差 (P2P < 0.85) 預警"]
      ]
    },
    // Slide 1 Executive Summary
    summary: {
      tag: "EXECUTIVE SUMMARY · 麥肯錫金字塔決策摘要與三層閉環架構",
      conclusionTitle: "透過「時序物理診斷 → 多代理告警協同 → 8D 知識圖譜」三層閉環，本案在 21.5 天回收期內消除 32.4% 功率缺口並完成全場 108 串防再發加固",
      kpis: [
        { label: "Stage 2 穩態功率缺口", value: "-32.4%", sub: "恰等於 2/6 路 MPPT 完全斷路 (33.3%)", isAccent: true },
        { label: "SCADA 無效告警抑制率", value: "74.2%", sub: "ISA-18.2 濾除浮雲與黃昏抖動誤報", isAccent: false },
        { label: "同批次 MC4 橫向普查", value: "108 串 (100%)", sub: "D3 紅外線熱像攔截另外 3 顆高溫接頭", isAccent: false }
      ],
      matrixRows: [
        ["D0~D1 立案與安全", "pv-ll-cloud-decoupling", "排除浮雲動態遮蔽干擾，確認非氣象電氣故障確信度 99.4%，啟動 1000V DC LOTO 隔離與跨職能 RACI 小組。"],
        ["D2 量化問題描述", "pv-scada-audit-reporting", "清洗逆變器夜間靜態雜訊後，精算 50 天累計損失 3,251.5 kWh（NT$ 13,603），並以 Is/Is Not 矩陣鎖定單機直流側。"],
        ["D3 暫時圍堵對策", "pv-vision-defect-suite", "隔離 INV #10 故障迴路防止直流電弧延燒，並對全場同施工批次 108 串 MC4 執行 100% IR 熱像普查（ΔT > 15°C 立即更換）。"],
        ["D4 雙軌根因實證", "pv-performance-diagnosis", "發生根因：副廠公母端子公差不匹配致接觸電阻過高熱熔斷路；流出根因：SCADA 缺乏 MPPT 級 P2P 殘差告警。"],
        ["D5~D6 永久對策驗證", "quality-8d-engineering-skills", "全面換裝 Stäubli 原廠 MC4-Evo2 端子並以壓接鉗扭力認證；修復後連續晴空日 P2P 恢復至 0.996（PR 達 81.0%）。"],
        ["D7~D8 防再發與估值", "skill-8d-report-analyzer", "強制升版 PFMEA (S=8,O=2,D=2) 與管制計畫，部署 MPPT 零電流 15 分鐘自動派工規則，保全 20 年 DCF 淨現值 NT$ 158.4 萬。"]
      ]
    },
    // Slide 2 D0~D1
    d0d1: {
      tag: "D0 SYMPTOM & D1 TEAM · 徵兆捕捉、氣象解耦、LOTO 安全與 RACI 團隊",
      conclusionTitle: "AI 氣象解耦模型證實 INV #10 效率驟降與日射波動無關（內部電氣故障確信度 99.4%），立即啟動 1000V DC LOTO 強制隔離與跨職能 8D 專案小組",
      symptomCards: [
        { title: "1. 氣象解耦與髒數據清洗 (D0 Gate)", metric: "99.4% 電氣故障確信度", desc: "調用 pv-scada-audit-reporting 剔除夜間恆定效率雜訊，並以 pv-ll-cloud-decoupling 比對全場 9 台逆變器：當日射 G = 780 W/m² 時，INV #1~#9 正規化出力皆達 0.81 kW/kWp，唯獨 INV #10 跌至 0.54 kW/kWp，徹底排除浮雲遮蔽。" },
        { title: "2. 1000V DC 高壓直流 LOTO 緊急安全防護", metric: "零電弧事故 (Zero Arc)", desc: "屋頂組串開路電壓 Voc 高達 745V DC。嚴禁於日照負載下直接插拔燒蝕之 MC4 接頭！強制規定：先斷開 INV #10 AC 斷路器 → 旋轉 DC 隔離開關至 OFF → 掛鎖掛牌 (LOTO) → 勾表確認 I_dc = 0.0A 後始得拆檢。" }
      ],
      raciTable: [
        ["D1 專案負責人 (Champion)", "維運事業部 副總 / 處長", "核准 D3 全場批次普查預算、簽署 SCAR 供應商索賠與 D8 結案認證", "Accountable (A)"],
        ["AI 數據診斷工程師", "運維數據中心 (調用 UNSW Skill)", "執行 P2P 同儕比對、MPPT 時序電氣穿透分析與 D6 HP 濾波收斂驗證", "Responsible (R)"],
        ["現場機電主任工程師", "南區駐點維運工班", "執行 1000V LOTO 掛鎖、三用電表 Voc/Isc 量測、IR 熱像儀掃描與 Stäubli 端子壓接", "Responsible (R)"],
        ["品質與安環工程師 (QE/EHS)", "品保室 (/8d-coach 稽核)", "審核 D4 雙向 5-Why 邏輯閉環、強制更新 PFMEA / Control Plan 與 TRACE 評分", "Consulted (C)"]
      ]
    },
    // Slide 3 D2
    d2: {
      tag: "D2 PROBLEM DESCRIPTION · 5W2H 定量損失核算與 Is / Is Not 邊界收斂矩陣",
      conclusionTitle: "INV #10 經歷「高阻抗劣化 (-14.7%) → 雙路完全斷路 (-32.4%)」兩階段階梯式衰減，50 天累計損失 3,251.5 kWh，且異常嚴格侷限於單機直流側",
      stageComparison: [
        ["Baseline 正常基準期", "2026/01/01 – 01/22 (22天)", "1.002 (+0.2%)", "0 kWh", "6 路 MPPT 電壓與電流完全對稱，與同儕 #1~#9 無統計差異"],
        ["Stage 1 接觸劣化期", "2026/01/23 – 02/10 (19天)", "0.853 (-14.7%)", "782.4 kWh", "MPPT1 接頭接觸電阻升高發熱，午間大電流時出現非線性壓降"],
        ["Stage 2 完全斷路期", "2026/02/11 – 03/13 (31天)", "0.676 (-32.4%)", "2,469.1 kWh", "MPPT1 與 MPPT3 接頭熱熔斷路，電流歸零，損失恰佔 6 路中之 2 路 (33.3%)"]
      ],
      isIsNot: [
        ["What (異常現象)", "直流側 MPPT1、MPPT3 輸入電流歸零，整機發電量恆定短少 32.4%", "AC 併網電壓、頻率、IGBT 散熱片溫度或絕緣阻抗 (R_iso) 跳脫故障"],
        ["Where (空間位置)", "僅發生於 C 棟屋頂 INV #10 之第 1、3 路直流穿線盒前 MC4 接頭", "INV #1 ~ #9 其餘 8 台逆變器，以及 INV #10 之 MPPT2、4、5、6 迴路"],
        ["When (發生時機)", "01/23 午間高電流時段開始劣化，02/11 12:15 峰值日照下徹底斷開", "夜間、陰雨弱光期或隨太陽方位角變化的早晚特定時段（排除固定物遮蔽）"],
        ["Extent (影響範圍)", "單機損失約 33.3% 容量（21.08 kWp 失效），50 天累計短少 3,251.5 kWh", "全場系統性衰減或台電饋線限電截割 (Grid Clipping)"]
      ]
    },
    // Slide 4 D3
    d3: {
      tag: "D3 INTERIM CONTAINMENT (ICA) · 現場安全圍堵、批次橫向普查與告警合理化",
      conclusionTitle: "完成 INV #10 燒蝕迴路物理隔離後，針對同施工批次 108 串執行 100% 紅外線熱像普查，成功攔截另外 3 顆溫升超標 (ΔT > 22°C) 之潛伏瑕疵接頭",
      containmentActions: [
        ["ICA-1 故障迴路安全隔離", "立即斷開 INV #10 MPPT1 (PV1/PV2) 與 MPPT3 (PV5/PV6) 直流熔絲與接頭，以防水絕緣封套包覆裸露電纜，其餘正常 4 路 MPPT 維持安全併網發電。", "100% 消除屋頂直流電弧火災風險", "已完成 (24h內)"],
        ["ICA-2 同批次 100% IR 普查", "調用 pv-vision-defect-suite 規範，於晴空午間 (G > 700 W/m²) 對全場 9 台逆變器共 108 串穿線盒前 MC4 接頭進行熱像儀全檢。", "發現 INV #04、#08 共 3 顆接頭溫升達 68°C~79°C，立即預防性更換", "已完成 (100% 普查)"],
        ["ICA-3 ISA-18.2 告警降噪", "透過 pv-isa182-intelligent-alarms 設定「日射 G > 300 W/m² 且持續 15 分鐘 I_dc < 0.5A」複合觸發條件，抑制清晨/黃昏弱光假告警。", "無效告警通知減少 74.2%，派工準確率達 100%", "已上線運行"]
      ],
      batchStats: [
        { label: "全場普查總串數", value: "108 串 (216 對 MC4)", note: "涵蓋 2023 年同批次安裝之所有屋頂組串" },
        { label: "已斷路故障點 (INV #10)", value: "2 處 (MPPT1 / MPPT3)", note: "接頭外殼碳化變形，內部插針退針開路" },
        { label: "熱像儀攔截潛伏熱斑", value: "3 處 (ΔT = 22.4°C~34.1°C)", note: "尚未斷路但接觸電阻已達 48 mΩ（正常 < 0.5 mΩ）" }
      ]
    },
    // Slide 5 D4a (Root Cause Verification)
    d4a: {
      tag: "D4 ROOT CAUSE VERIFICATION · UNSW 高頻時序電氣穿透與雙向 5-Why 實證",
      conclusionTitle: "電氣時序穿透與拆解實證確認：副廠端子公差不匹配且未用專用壓接鉗導致接觸電阻熱熔斷路（發生根因），而 SCADA 缺乏 MPPT 級同儕比對導致延誤 50 天（流出根因）",
      fiveWhyOccurrence: [
        ["Why 1 (表面現象)", "為何 INV #10 發電量恆定短少 32.4%？", "因為轄下 6 路 MPPT 中，MPPT1 與 MPPT3 兩路直流輸入電流在日照充足時完全為 0 A。"],
        ["Why 2 (物理機制)", "為何 MPPT1 與 MPPT3 電流歸零但屋頂模組無破損？", "因為穿線盒前方的正極 MC4 接頭內部金屬插針熱熔碳化、彈片失去夾持力導致物理開路。"],
        ["Why 3 (熱力學成因)", "為何該處 MC4 接頭會產生超過 105°C 之局部焦耳高溫？", "因為接觸電阻高達 85 mΩ（正常應 < 0.5 mΩ），午間 18A 電流通過時產生 I²R = 27.5W 集中熱功率。"],
        ["Why 4 (施工/材料成因)", "為何該處接觸電阻異常偏高？", "現場外包工班混用不同廠牌之副廠 MC4 端子與原廠公頭對插，且以一般尖嘴鉗取代棘輪式專用壓接鉗。"],
        ["Why 5 (制度發生根因)", "為何外包工班得以混用副廠端子且未被驗收攔截？", "【發生根因 Occurrence RC】工程採購規範未強制指定「同廠牌認證互配 (Stäubli MC4-Evo2)」，且竣工驗收缺乏壓接拉力抽檢與滿載 IR 熱像初驗。"]
      ],
      fiveWhyEscape: [
        ["Why 1 (監控漏報)", "為何 01/23 開始劣化、02/11 完全斷路，卻直到 03/13 才立案派工？", "因為期間 INV #10 整機仍維持併網運轉（67.6% 出力），SCADA 並未發出任何「設備離線」告警。"],
        ["Why 2 (規則缺陷)", "為何損失高達 1/3 容量卻未觸發性能低效告警？", "因為舊版 SCADA 僅設定「整機日 PR < 55%」單一靜態閾值，而冬季晴天 INV #10 殘餘 4 路 MPPT 仍可維持整機 PR 約 61.9%。"],
        ["Why 3 (系統流出根因)", "為何監控系統無法識別單一逆變器與鄰近同儕之顯著落差？", "【流出根因 Escape RC】SCADA 告警邏輯未部署「UNSW P2P 同儕發電比值 (< 0.88)」與「單一 MPPT 電流偏差 (> 15%)」之動態比對演算法。"]
      ]
    },
    // Slide 6 D4b (Hypothesis Elimination & Zero-Hallucination Gate)
    d4b: {
      tag: "D4 HYPOTHESIS ELIMINATION & GRAPH TRACE · 六大假說排除矩陣與知識圖譜零幻覺驗證",
      conclusionTitle: "透過時間序列特徵與現場三用電表/熱像儀實測，嚴格排除「模組 PID 衰減、遮蔽、逆變器 IGBT 限載」等 5 項假說，唯獨「MC4 接頭熱熔開路」100% 吻合所有觀測證據",
      hypotheses: [
        ["H1：外部屋頂女兒牆或管線陰影遮蔽", "若為固定物遮蔽，功率缺口必隨太陽高度角與方位角呈早晚大、正午小之 U 型曲線。", "實測 09:00–15:00 全時段缺口恆為 -32.4%，與太陽仰角完全無關。", "❌ 已排除 (Rejected)"],
        ["H2：浮雲短暫掠過或微氣候日射不均", "同棟廠房屋頂長寬僅 85m × 40m，浮雲掠過會使 INV #1~#10 在數分鐘內先後出現波動。", "pv-ll-cloud-decoupling 證實連續 31 天晴空日僅 INV #10 單獨低落。", "❌ 已排除 (Rejected)"],
        ["H3：逆變器過溫降載或台電過壓截割 (Clipping)", "逆變器限載會使功率曲線在正午呈現「平頂截割 (Flat-top)」，且三相交流電壓或機箱溫度偏高。", "INV #10 正午波形仍呈平滑鐘型（僅峰值等比例縮減 1/3），內部溫度僅 44.2°C。", "❌ 已排除 (Rejected)"],
        ["H4：太陽能模組 PID 電位誘發衰減或大面積隱裂", "PID 或隱裂屬漸進式電化學/機械退化，會使開路電壓 Voc 與填充因子緩慢下滑，不會瞬間歸零。", "屋頂量測模組本體串列 Voc = 698V 正常，但穿線盒後端至逆變器側 Voc = 0V。", "❌ 已排除 (Rejected)"],
        ["H5：逆變器內部直流保險絲 (DC Fuse) 熔斷或 MPPT 基板燒毀", "若為逆變器內部基板損壞，在端子台輸入側仍可量得屋頂傳來之 698V 開路電壓。", "於逆變器 DC 端子台量測 MPPT1/MPPT3 輸入電壓為 0V，證明斷路點位於屋頂外部線纜。", "❌ 已排除 (Rejected)"],
        ["H6：屋頂穿線盒前 MC4 接頭壓接不良熱熔斷路", "先因高接觸電阻產生 -14.7% 壓降（Stage 1），後因正午大電流熱熔斷開致 2/6 路歸零（-32.4%，Stage 2）。", "現場拆解發現 MPPT1/MPPT3 正極 MC4 接頭嚴重碳化熔穿，換新後電流立即恢復 17.8A。", "✅ 實證確立 (Verified Root Cause)"]
      ],
      graphPath: [
        { code: "T (Task 任務)", name: "500kWp+ 廠房屋頂型光電季度維運巡檢", detail: "高溫高濕工業區屋頂環境" },
        { code: "W (Work Step 步驟)", name: "直流組串穿線盒轉接段 MC4 壓接與插接作業", detail: "暴露於屋外紫外線與熱循環之轉接點" },
        { code: "V (Failure 失效模式)", name: "異質端子混用與未規範壓接導致接觸電阻激增 (>80 mΩ)", detail: "初期壓降 -14.7%，終期熱熔開路 -32.4%" },
        { code: "N (Norm 法規與標準)", name: "IEC 62852 (連接器標準) / IEC 62446-1 (系統測試與熱像驗收)", detail: "強制同廠牌認證互配與滿載 ΔT < 10°C" },
        { code: "S (Safeguard 防護控制)", name: "Stäubli 原廠端子防呆 + 棘輪壓接鉗編號列管 + MPPT P2P 自動告警", detail: "物理消除發生率 (O) 並將難檢度 (D) 降至最低" }
      ]
    },
    // Slide 7 D5
    d5: {
      tag: "D5 PERMANENT CORRECTIVE ACTIONS (PCA) · 永久矯正對策比選矩陣與二次副作用評估",
      conclusionTitle: "選定「全數換裝 Stäubli 原廠 MC4-Evo2 端子＋棘輪壓接扭力認證＋SCADA 部署 MPPT 級 P2P 演算法」組合方案，根除熱熔風險且零二次副作用",
      pcaTable: [
        ["PCA-1 物理根因消除（硬體面）", "針對 INV #10 故障點及 D3 熱像普查發現之潛伏異常點，全面剪除舊接頭，換裝原廠 Stäubli MC4-Evo2 1500V 認證端子，並強制使用原廠專用棘輪壓接鉗 (PV-CZM) 完成壓接與防水螺帽扭力鎖固 (3.0 N·m)，外加雙壁含膠熱縮套管密封。", "接觸電阻降至 ≤ 0.35 mΩ（降幅 > 99%），承受 30A 連續電流溫升 ΔT < 4°C", "零副作用；停機更換安排於傍晚低日照時段，發電損失 = 0 kWh"],
        ["PCA-2 流出根因消除（軟體監控面）", "於進能服中央監控平台植入 UNSW P2P 同儕比對與 MPPT 電流平衡規則：當日射 G > 300 W/m² 且任一 MPPT 電流低於同機其他 MPPT 均值達 20% 持續 15 分鐘，立即推送 L2 級別工單至駐點工程師。", "異常偵測延遲由原本 50 天縮短至 ≤ 15 分鐘（提升 4,800 倍）", "結合 ISA-18.2 延遲死區設計，不會在多雲天氣產生假陽性轟炸"],
        ["PCA-3 供應商與外包商追償（管理面）", "調用 supplier-scar 技能向原施工外包商發出 SCAR 矯正要求書，扣減保固保留款抵充本次檢修費用，並將「禁止混用非原廠相容連接器」列入承攬商黑名單紅線條款。", "本次維修直接成本 NT$ 6,500 全額由保固條款涵蓋", "強化外包施工紀律，提升全場資產長期可靠度"]
      ]
    },
    // Slide 8 D6
    d6: {
      tag: "D6 VALIDATION OF EFFECTIVENESS · 短期晴空日實測與長週期 UNSW P2P + HP 濾波收斂驗證",
      conclusionTitle: "對策執行後 INV #10 之 6 路 MPPT 電流恢復 100% 對稱，同儕發電比值由 0.676 躍升至 0.996，且經 HP 濾波分解確認無殘餘長週期衰減趨勢",
      validationMetrics: [
        ["同儕發電比 (P2P Ratio)", "0.676 (-32.4%)", "0.996 (-0.4%)", "≥ 0.980", "✅ 通過（完全消除雙路斷路缺口）"],
        ["整機晴空日 PR 值", "61.9%", "81.0%", "≥ 80.0%", "✅ 通過（與同儕均值 81.2% 齊平）"],
        ["MPPT1 / MPPT3 正午電流", "0.0 A / 0.0 A", "17.6 A / 17.7 A", "與 MPPT2/4/5/6 偏差 < 3%", "✅ 通過（全機 6 路電流極差僅 1.1%）"],
        ["MC4 接頭滿載紅外線溫差 (ΔT)", "105.4°C (熱熔碳化)", "38.2°C (ΔT = +2.8°C)", "ΔT < 10.0°C (IEC 62446)", "✅ 通過（接觸電阻實測 0.31 mΩ）"]
      ],
      longTermNote: "依據《光伏運維 8D 報告與知識庫》D6 嚴格規範：光電系統受季節性太陽仰角與環境溫度影響極大，不可僅憑單日晴空數據結案。系統已自動掛載 UNSW-Solar Hodrick-Prescott (HP) 濾波器進行 90 天滾動追蹤，確保長期趨勢項 (Trend Component) 斜率 ≥ 0。"
    },
    // Slide 9 D7
    d7: {
      tag: "D7 PREVENT RECURRENCE · 四大工程文件強制升版與跨案場橫向展開 (Yokoten)",
      conclusionTitle: "為杜絕「僅口頭要求加強巡檢」之無效對策，本案強制完成 PFMEA、管制計畫、SOP 與 SCADA 規則庫四大文件升版，並橫向展開至集團 14 座廠房屋頂案場",
      docRevisions: [
        ["PFMEA 製程失效模式分析", "PFMEA-PV-DC-004", "v2.1 → v3.0", "新增「異質 MC4 混用與壓接不良」失效模式：嚴重度 S=8，透過原廠防呆與專用工具將發生度 O 由 6 降至 2；透過 MPPT P2P 自動告警將難檢度 D 由 7 降至 2（RPN 由 336 降至 32）。"],
        ["Control Plan 施工與驗收管制計畫", "CP-PV-INST-012", "v1.4 → v2.0", "增列「直流連接器 100% 同廠牌型號核對」、「每 50 顆端子抽檢 1 顆拉力測試 (≥ 300N)」及「併網滿載 72 小時內 100% IR 熱像初驗 (ΔT < 10°C)」為竣工放行強制檢核點。"],
        ["維運標準作業程序書 (SOP)", "SOP-OM-safe-008", "v3.0 → v3.2", "強化「1000V DC 燒蝕接頭安全拆檢 LOTO 程序」與「Stäubli MC4-Evo2 專用剝線/壓接/插拔治具標準圖解」，嚴禁攜帶非認證散裝端子進場。"],
        ["SCADA 智慧告警規則庫", "ALM-RULE-MPPT-01", "v1.0 → v2.1", "正式將 UNSW P2P (< 0.88) 與單機 MPPT 電流離散度 (> 15% 持續 15 分鐘) 寫入全集團雲端監控引擎，並綁定自動派工 API。"]
      ],
      yokotenSites: [
        { site: "台南麻豆・世堃塑膠 (本案)", capacity: "582.12 kWp", status: "100% 完成整改與驗證", finding: "修復 2 處斷路 + 預防性更換 3 處高溫接頭" },
        { site: "台南永康・精密機械廠房案場", capacity: "845.00 kWp", status: "100% 完成橫向普查", finding: "攔截 2 處穿線盒前副廠 MC4 溫升異常 (ΔT=18°C)" },
        { site: "高雄路竹・遠東鋼鐵廠房案場", capacity: "1,240.00 kWp", status: "100% 完成橫向普查", finding: "全面完成 MPPT 級別 P2P 告警規則掛載" }
      ]
    },
    // Slide 10 D8
    d8: {
      tag: "D8 CLOSURE & FINANCIAL VALUATION · 20 年 DCF 生命周期防損估值、TRACE 審查與知識歸檔",
      conclusionTitle: "本案以 NT$ 6,500 維修投入挽回年化 NT$ 11.04 萬發電收入（回收期僅 21.5 天），20 年生命周期 DCF 累積防損淨現值達 NT$ 158.4 萬，獲 94 分核准結案",
      financialSummary: [
        ["直接維修與料件投入成本 (CapEx/OpEx)", "NT$ 6,500", "含 Stäubli MC4-Evo2 原廠端子、防水熱縮套管與駐點工班 4 工時（保固內由承攬商吸收）"],
        ["50 天歷史已發生損失 (Historical Loss)", "3,251.5 kWh (NT$ 13,603)", "依台電躉購費率 FIT = NT$ 4.1835 / kWh 精算之實際短少電費"],
        ["年化避免發電損失 (Annual Avoided Loss)", "26,397 kWh / 年 (NT$ 110,432 / 年)", "若未透過 UNSW P2P 發現並修復，INV #10 將持續以 67.6% 殘餘容量運轉"],
        ["20 年殘餘合約期 DCF 防損淨現值 (NPV)", "NT$ 1,584,000 (約 158.4 萬)", "折現率 WACC = 5.2%、模組年衰減率 0.55% 計算之 20 年累積保護現金流"],
        ["投資回收期 (Simple Payback Period)", "21.5 天 (0.06 年)", "極高槓桿之數據驅動精準維運投資"]
      ],
      rubricScores: [
        ["D0/D1 氣象解耦與 LOTO 團隊 (權重 10%)", "10 / 10", "完成 I-V-G 浮雲解耦與 1000V DC LOTO 標準程序"],
        ["D2 5W2H 與 Is/Is Not 矩陣 (權重 15%)", "14 / 15", "精確切分兩階段劣化損失並建立完整四維邊界"],
        ["D3 暫時圍堵與同批次普查 (權重 10%)", "10 / 10", "完成 108 串 100% IR 熱像橫向掃描並攔截 3 處潛伏熱斑"],
        ["D4 雙軌根因實證與假說排除 (權重 30%)", "29 / 30", "具備 MPPT 時序穿透圖、6 大假說排除表與雙向 5-Why 閉環"],
        ["D5/D6 永久對策與長週期驗證 (權重 20%)", "18 / 20", "P2P 恢復至 0.996，並啟動 90 天 HP 濾波長週期監測"],
        ["D7/D8 四大文件升版與 DCF 估值 (權重 15%)", "13 / 15", "PFMEA/CP/SOP/SCADA 版次更新完畢並寫入 TWVNS 知識圖譜"]
      ]
    },
    // Charts Data for this case
    charts: {
      execWaterfall: {
        categories: ["同儕基準應發電", "Stage 1 接觸劣化(-14.7%)", "Stage 2 熱熔斷路(-32.4%)", "異常期實發電量", "D6 修復後恢復發電"],
        values: [14236, -782.4, -2469.1, 10984.5, 14180],
        prLine: [81.2, 71.5, 61.9, 61.9, 81.0]
      },
      d2Timeline: {
        dates: ["01/05", "01/12", "01/19", "01/23(劣化)", "01/28", "02/04", "02/10", "02/11(斷路)", "02/18", "02/25", "03/04", "03/13(檢修)", "03/16(復歸)", "03/22"],
        peerRatio: [1.01, 0.99, 1.00, 0.86, 0.85, 0.84, 0.85, 0.68, 0.67, 0.68, 0.67, 0.68, 0.99, 1.00],
        irradiance: [4.8, 5.1, 4.9, 5.3, 5.0, 4.7, 5.2, 5.6, 5.4, 4.9, 5.5, 5.7, 5.8, 5.6]
      },
      d3AlarmFunnel: {
        labels: ["原始 SCADA 告警總數", "剔除夜間/離線靜態假訊號", "ISA-18.2 延遲死區濾除抖動", "浮雲動態遮蔽解耦排除", "進入 8D 立案之真實電氣故障"],
        counts: [420, 265, 142, 38, 12]
      },
      d4Mppt: {
        hours: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        normalMpptCurrent: [0.4, 2.8, 7.5, 12.4, 15.8, 17.5, 18.1, 17.8, 15.2, 11.0, 5.4, 1.1],
        faultMppt1Current: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        stage1Mppt1Current: [0.3, 2.2, 5.8, 9.1, 11.2, 12.0, 12.1, 11.9, 10.4, 7.8, 4.1, 0.8],
        normalVoltage: [590, 625, 640, 648, 652, 650, 645, 647, 651, 646, 630, 595]
      },
      d6Convergence: {
        days: ["D-30", "D-25", "D-20", "D-15", "D-10", "D-5", "D0(修復)", "D+5", "D+10", "D+15", "D+30", "D+60", "D+90"],
        rawP2P: [0.67, 0.68, 0.66, 0.69, 0.67, 0.68, 0.99, 1.00, 0.99, 1.01, 0.99, 1.00, 1.00],
        hpTrend: [0.675, 0.676, 0.676, 0.676, 0.676, 0.677, 0.985, 0.994, 0.996, 0.997, 0.997, 0.998, 0.998]
      },
      d8Dcf: {
        years: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y12", "Y14", "Y16", "Y18", "Y20"],
        cumNpvWan: [9.8, 19.9, 29.5, 38.6, 47.2, 55.3, 63.0, 70.3, 77.2, 83.7, 95.8, 106.6, 116.3, 125.0, 158.4]
      }
    }
  },
  {
    id: "8D-2026-DA01",
    code: "8D-2026-DA01",
    siteName: "台中大安・龜殼段水上光電案場",
    capacityKwp: 1999.8,
    inverterSpec: "SMA Sunny Highpower PEAK3 150kW × 13 台",
    targetEquip: "INV #03 & INV #07（浮筒陣列 B 區匯流箱與絕緣監測迴路）",
    occurDate: "2026-02-02（間歇跳脫）→ 2026-02-18（晨間絕緣阻抗 R_iso 鎖死）",
    reportDate: "2026-03-20",
    stage: "D8",
    statusLabel: "D8 已結案認證",
    traceScore: 48,
    weightedScore: 96,
    fitRate: 4.3280,
    lostKwh: 8420.0,
    lostRevenueNtd: 36442,
    annualLossKwh: 54800,
    annualLossNtd: 237174,
    dcf20YrNpvNtd: 3120000,
    repairCostNtd: 28000,
    paybackDays: 43.1,
    prBefore: 68.4,
    prPeer: 82.5,
    prAfter: 82.1,
    irrPct: 10.45,
    cover: {
      tag: "8D PROBLEM SOLVING & FLOATING PV DIAGNOSTIC REPORT · 8D-2026-DA01",
      conclusionTitle: "大安水上光電 INV #03/#07 晨間頻繁跳機係因浮筒鉸接處波浪撓曲磨損直流線纜護套致 R_iso < 50kΩ，加裝波紋保護管與絕緣趨勢預警後挽回年化 NT$ 23.7 萬",
      subtitle: "結合 SMOTE 罕見絕緣故障預警、UNSW 時序殘差分析與雙向 5-Why 根因實證之三層式 AI 閉環決策報告",
      kpis: [
        { label: "異常期間累計短少度數 (D2)", value: "8,420.0 kWh", note: "晨間 06:30–09:30 濕氣凝結跳脫損失", isAccent: true },
        { label: "年化預期挽回營收 (D8)", value: "NT$ 237,174 /年", note: "年化防損 54,800 kWh (FIT 4.3280)", isAccent: true },
        { label: "20 年 DCF 累積防損淨現值", value: "NT$ 312.0 萬", note: "浮筒跨接防護改造投入 NT$ 28,000", isAccent: false },
        { label: "8D 合規審查 / TRACE 評分", value: "96 分 / 48/50", note: "SMOTE 罕見故障模型提前捕捉 R_iso 衰減", isAccent: false }
      ],
      metaLeft: [
        ["案場名稱與容量", "台中大安・龜殼段水上光電案場（1,999.8 kWp 水面浮力式）"],
        ["異常標的設備", "INV #03 & INV #07（浮筒陣列 B 區跨接主幹直流線纜）"],
        ["異常演進時間軸", "2026/02/02 東北季風波浪加劇 → 02/18 晨間 R_iso 跌破 50 kΩ 保護閾值"]
      ],
      metaRight: [
        ["核心調用 AI Skills", "pv-smartgrid-smote-fault · pv-performance-diagnosis · quality-8d-engineering-skills"],
        ["物理根因結論 (D4)", "浮筒步道金屬邊緣未設導角護套，季風波浪往復撓曲磨穿 PV 線纜外皮致晨露接地"],
        ["系統流出根因 (D4)", "SCADA 僅於 R_iso < 50kΩ 硬跳機時報警，未對 R_iso 連續 14 天下滑斜率設預警"]
      ]
    },
    summary: {
      tag: "EXECUTIVE SUMMARY · 水上光電絕緣接地故障三層閉環決策摘要",
      conclusionTitle: "透過 SMOTE 罕見故障分類器與 UNSW 晨間時段分解，精準鎖定「東北季風波浪撓曲磨損」物理根因，全面加裝撓性波紋管保護並消弭水上漏電風險",
      kpis: [
        { label: "晨間併網延遲損失", value: "-14.1% PR", sub: "每日 06:30–09:30 待日照烘乾後才併網", isAccent: true },
        { label: "R_iso 絕緣阻抗恢復", value: "> 15.2 MΩ", sub: "由故障期 38 kΩ 提升逾 400 倍", isAccent: false },
        { label: "浮筒跨接段橫向加固", value: "48 處 (100%)", sub: "全場浮筒陣列鉸接處全面加裝雙層防護", isAccent: false }
      ],
      matrixRows: [
        ["D0~D1 立案與安全", "pv-smartgrid-smote-fault", "識別晨間高濕度與風速耦合下之絕緣阻抗突降特徵，啟動水面作業救生衣與 1500V DC LOTO 雙重安全管制。"],
        ["D2 量化問題描述", "pv-scada-audit-reporting", "核算 26 天晨間跳脫累計損失 8,420 kWh（NT$ 36,442），Is/Is Not 矩陣鎖定迎風面 B 區浮筒跨接段。"],
        ["D3 暫時圍堵對策", "pv-isa182-intelligent-alarms", "以 1000V 高阻計 (Megger) 逐串分段搖測，隔離受損之 String B3-04 與 B7-02，並對全場 48 處浮筒鉸接跨接點進行目視與絕緣普查。"],
        ["D4 雙軌根因實證", "quality-8d-engineering-skills", "發生根因：浮筒跨接處線纜束帶綁紮過緊無伸縮裕度，受波浪剪切磨破 XLPE 絕緣層；流出根因：缺乏 R_iso 趨勢斜率預警。"],
        ["D5~D6 永久對策驗證", "pv-performance-diagnosis", "換新受損線纜、預留 Ω 型撓曲裕度並套入抗 UV 尼龍波紋管；修復後連續 60 天晨間 06:05 準時併網，P2P 達 0.995。"],
        ["D7~D8 防再發與估值", "skill-8d-report-analyzer", "升版水上光電佈線 PFMEA 與管制計畫，保全 20 年 DCF 淨現值 NT$ 312.0 萬，TRACE 獲評 48/50。"]
      ]
    },
    d0d1: {
      tag: "D0 SYMPTOM & D1 TEAM · 水上光電絕緣接地捕捉、水面 LOTO 安全與團隊分工",
      conclusionTitle: "SMOTE 罕見故障模型捕捉到晨間相對濕度 > 85% 時 R_iso 呈指數型崩跌，立即啟動「水上救生防護 ＋ 1500V DC 接地隔離」最高等級 LOTO 作業",
      symptomCards: [
        { title: "1. 罕見間歇性絕緣故障捕捉 (SMOTE + Historian)", metric: "R_iso 跌至 38 kΩ", desc: "一般絕緣故障在正午高溫乾燥時會自行恢復至 > 2 MΩ，導致傳統巡檢查無異常。本平台透過 pv-smartgrid-smote-fault 對清晨 05:30–08:30 之 R_iso 與風速/濕度進行耦合分析，精確鎖定迎風面浮筒鉸接處之微滲水接地。" },
        { title: "2. 水面浮筒作業與直流接地雙重 LOTO 規範", metric: "雙人救生衣 + 絕緣靴", desc: "水上光電發生接地異常時，金屬支架與水面可能存在洩漏電位。強制執行：先於岸上箱變切斷 AC 與 DC 總開關 → 驗電確認對地電壓 = 0V → 穿戴 1000V 絕緣手套與救生衣登浮筒。" }
      ],
      raciTable: [
        ["D1 專案負責人 (Champion)", "中區維運處長", "核准全場 48 處浮筒鉸接波紋管改造預算與 D8 結案", "Accountable (A)"],
        ["AI 數據診斷工程師", "運維數據中心", "執行清晨 R_iso 衰減斜率迴歸與 UNSW 晨間時段發電損失拆解", "Responsible (R)"],
        ["水上機電工程班長", "台中駐點維運團隊", "執行 Megger 1000V 絕緣搖測、破損電纜換新與 Ω 型撓性護管安裝", "Responsible (R)"],
        ["安環與品質工程師", "品保室", "稽核水面作業安全與修訂《水面型光電線纜敷設管制計畫》", "Consulted (C)"]
      ]
    },
    d2: {
      tag: "D2 PROBLEM DESCRIPTION · 晨間併網延遲量化與 Is / Is Not 矩陣",
      conclusionTitle: "INV #03 與 #07 於每日 06:30–09:30 因絕緣保護鎖死無法併網，待日照蒸發水氣後才恢復，26 天累計損失 8,420 kWh（佔晨間應發電量 100%）",
      stageComparison: [
        ["Baseline 季風前穩態", "2026/01/01 – 02/01", "0.998 (-0.2%)", "0 kWh", "晨間 R_iso 穩定維持於 12~18 MΩ，06:10 準時併網"],
        ["Stage 1 間歇磨損期", "2026/02/02 – 02/17", "0.912 (-8.8%)", "3,180 kWh", "強陣風日隔天清晨偶發 Insulation Fault，延遲約 1.5 小時併網"],
        ["Stage 2 護套磨穿期", "2026/02/18 – 02/28", "0.829 (-17.1%)", "5,240 kWh", "銅芯微露接觸晨露，每日固定鎖死至 09:30 後才復歸併網"]
      ],
      isIsNot: [
        ["What (異常現象)", "逆變器報出 Code 3501 Insulation Resistance Low，晨間鎖死不併網", "正午高溫跳機、MPPT 熔絲燒斷或交流側電網過壓"],
        ["Where (空間位置)", "僅發生於迎風面 B 區浮筒陣列跨接橋之 INV #03 與 #07 主幹電纜", "背風面 A/C/D 區浮筒陣列及岸上逆變器本體"],
        ["When (發生時機)", "僅發生於清晨 06:00–09:30 高濕結露時段及東北季風 > 6 級隔日", "正午 10:00–15:00 乾燥時段（正午 R_iso 自動回升至 3.5 MΩ）"],
        ["Extent (影響範圍)", "2 台 150kW 逆變器中之 B3-04、B7-02 兩串對地絕緣劣化", "太陽能模組內部封裝進水或水下錨固系統斷裂"]
      ]
    },
    d3: {
      tag: "D3 INTERIM CONTAINMENT · 分段 Megger 絕緣搖測隔離與全場浮筒跨接點普查",
      conclusionTitle: "利用清晨結露窗口期執行 1000V Megger 分段搖測，30 分鐘內鎖定並抽離 B3-04、B7-02 兩條磨損組串，使 INV #03/#07 其餘 22 串立即恢復 06:05 正常併網",
      containmentActions: [
        ["ICA-1 清晨濕態 Megger 搖測", "改變過往「正午乾燥時進場查無異常」之盲點，指定工班於 06:30 結露狀態下以 Fluke 1507 (1000V) 逐串搖測對地電阻，當場抓出 B3-04 (38 kΩ) 與 B7-02 (42 kΩ)。", "精準定位率 100%，其餘 22 串立即復歸併網", "已完成"],
        ["ICA-2 浮筒跨接處臨時緩衝墊", "對全場 48 處浮筒主幹道鉸接跨接處進行 100% 普查，發現另外 9 處線纜外護套已有輕微刮痕，立即剪除緊繃束帶並加墊 EPDM 橡膠護墊。", "攔截 9 處潛在絕緣磨穿點", "已完成 (100% 普查)"],
        ["ICA-3 R_iso 斜率預警上線", "於 SCADA 告警控制台設定「晨間最低 R_iso 連續 3 日低於 1.0 MΩ」提前預警，不再等待跌破 50 kΩ 硬跳機才通知。", "提前 10~14 天捕捉絕緣劣化", "已上線"]
      ],
      batchStats: [
        { label: "全場浮筒跨接點普查", value: "48 處跨接橋", note: "涵蓋 A/B/C/D 四大浮筒陣列區" },
        { label: "已磨穿外皮故障點", value: "2 處 (B3-04 / B7-02)", note: "雙層 XLPE 護套遭金屬槽邊緣磨穿見銅" },
        { label: "攔截外皮輕微刮傷點", value: "9 處 (迎風面 B/C 區)", note: "束帶固定過死，波浪起伏時承受剪切應力" }
      ]
    },
    d4a: {
      tag: "D4 ROOT CAUSE VERIFICATION · 波浪撓曲應力與晨露導電雙軌 5-Why 實證",
      conclusionTitle: "實證確認：浮筒鉸接處未預留 Ω 型線纜伸縮環且金屬走線槽缺導角護邊（發生根因），加上傳統巡檢僅於午後乾燥時段量測 R_iso（流出根因）",
      fiveWhyOccurrence: [
        ["Why 1", "為何 INV #03 與 #07 會在清晨報出絕緣阻抗過低 (R_iso < 50 kΩ) 跳機？", "因為 B3-04 與 B7-02 直流負極線纜在浮筒鉸接處外皮破損，清晨結露與水氣使銅芯對接地金屬走線槽構成漏電迴路。"],
        ["Why 2", "為何使用符合 EN 50618 標準之雙層絕緣 PV 線纜會在運轉 2 年後破損？", "因為線纜在跨接相鄰兩個浮筒的活動關節處，遭鍍鋅鋼走線槽銳利邊緣反覆摩擦切削。"],
        ["Why 3", "為何線纜會與走線槽邊緣產生高強度往復摩擦？", "因為東北季風期間水面波浪使相鄰浮筒產生 ±12° 俯仰角位移，而線纜被尼龍束帶死鎖在走線槽兩端，毫無伸縮餘裕。"],
        ["Why 4", "為何施工時未預留浮筒活動關節之線纜撓曲裕度與護邊？", "因為原施工圖直接套用「陸地屋頂型固定支架」佈線規範，未針對水面浮筒三自由度運動設計 Ω 型膨脹彎 (Expansion Loop)。"],
        ["Why 5 (發生根因)", "為何水面型專案會誤用陸地固定式佈線圖說？", "【發生根因 Occurrence RC】工程設計與外包驗收規範缺乏《水面浮力式光電動態撓曲防護標準》，未強制要求活動關節處加裝 HDPE 導角護套與 Ω 型撓性波紋管。"]
      ],
      fiveWhyEscape: [
        ["Why 1", "為何過去兩週已發生數次晨間短暫跳脫，駐點人員進場卻回報「量測正常」？", "因為工班皆於上午 10:30 後登浮筒檢修，此時強烈日照已將破損處水氣蒸發，高阻計量測值回升至 3.5 MΩ 以上。"],
        ["Why 2", "為何監控中心未能從歷史數據識破「晨間濕態漏電、正午乾態復原」之特徵？", "因為舊版報表僅統計「日平均 R_iso」，正午的高阻抗掩蓋了清晨 06:00 的極低值。"],
        ["Why 3 (流出根因)", "為何系統缺乏針對晨間極小值之趨勢預警？", "【流出根因 Escape RC】SCADA 缺乏「每日清晨最低 R_iso 分位數追蹤」與「濕度耦合殘差預警」，且維運 SOP 未規定絕緣異常必須於清晨高濕窗口期或噴水模擬下執行搖測。"]
      ]
    },
    d4b: {
      tag: "D4 HYPOTHESIS ELIMINATION · 水上光電絕緣故障六大假說排除與 TWVNS 溯源",
      conclusionTitle: "排除「模組玻璃進水、水下接頭浸水、逆變器防雷器擊穿」等假說，確認故障 100% 集中於水面以上之浮筒鉸接機械磨損點",
      hypotheses: [
        ["H1：雙玻模組邊框封裝失效導致水氣滲入電池片 (PID/Delamination)", "若為模組內部進水，高濕度下整串開路電壓與 EL 影像皆會異常，且更換跨接線纜無法消除故障。", "將跨接段前後切開單獨搖測模組陣列本體，清晨濕態下 R_iso 仍高達 25 MΩ。", "❌ 已排除"],
        ["H2：逆變器內部直流防雷器 (SPD) 劣化漏電", "若為逆變器內部 SPD 漏電，拔除外部所有組串後逆變器本體仍會報絕緣故障。", "切離 B3-04 組串後，INV #03 本體與其餘 11 串清晨 R_iso 立即恢復 16 MΩ。", "❌ 已排除"],
        ["H3：MC4 接頭落水浸泡導致漏電", "若為接頭落水，不論清晨或正午皆會持續短路接地，不會在 09:30 出太陽後自動恢復。", "全場 MC4 接頭皆固定於模組背軌上方 35cm 處，無任何浸水現象。", "❌ 已排除"],
        ["H4：浮筒鉸接處波浪往復剪切磨穿線纜外皮 + 晨露導通接地", "夜間與清晨高濕結露時透過破損處對金屬槽導電（<50kΩ），09:30 日照升溫蒸發水膜後絕緣回升。", "現場於跨接槽邊緣發現 4mm 外皮磨穿露銅點，噴霧模擬即刻重現 35 kΩ 接地。", "✅ 實證確立"]
      ],
      graphPath: [
        { code: "T (Task 任務)", name: "2MW 水面浮力式光電案場季風期維運", detail: "高濕度、波浪往復運動環境" },
        { code: "W (Work Step 步驟)", name: "浮筒陣列活動鉸接橋之直流主幹電纜跨接敷設", detail: "承受長期波浪俯仰與橫搖應力" },
        { code: "V (Failure 失效模式)", name: "束帶死鎖無伸縮裕度 + 金屬槽銳邊磨穿 XLPE 絕緣層", detail: "晨露導通致 R_iso < 50 kΩ 鎖死跳機" },
        { code: "N (Norm 法規與標準)", name: "IEC 62548 / 水面型光電系統設計規範 (FPV Guidelines)", detail: "動態關節處必須預留撓曲半徑與耐磨護套" },
        { code: "S (Safeguard 防護控制)", name: "Ω 型撓性波紋管跨接 + 金屬槽 EPDM 護邊 + 晨間 R_iso P10 趨勢告警", detail: "徹底隔絕機械磨損並提前 14 天預警" }
      ]
    },
    d5: {
      tag: "D5 PERMANENT CORRECTIVE ACTIONS · 浮筒動態跨接防護改造與濕態絕緣預警",
      conclusionTitle: "全面導入「Ω 型膨脹彎 ＋ 雙層抗 UV 尼龍波紋管 ＋ 走線槽橡膠護邊」三合一機械防護，並建立「晨間 R_iso 1.0 MΩ 提前派工閾值」",
      pcaTable: [
        ["PCA-1 浮筒鉸接處 Ω 型撓性改造", "將 B3-04、B7-02 受損線段換新為 TUV 認證水上專用耐候電纜 (AD8 防水等級)，並對全場 48 處浮筒鉸接跨接點全面改為「預留 30cm Ω 型鬆弛弧度 + 穿入 PA6 抗 UV 波紋管 + 金屬槽口加裝 EPDM 導角護條」。", "通過 10 萬次 ±15° 往復擺動模擬零磨損；濕態 R_iso > 15 MΩ", "零副作用；徹底消除金屬銳邊接觸"],
        ["PCA-2 晨間最低 R_iso 分位數告警", "於監控平台新增「每日 05:30–07:30 R_iso 第 10 百分位數 (P10)」追蹤指標，當連續 3 日低於 1.0 MΩ 時即觸發預防性巡檢，不等跌至 50 kΩ 跳機。", "跳機停機時數降至 0 小時", "避免正午乾燥假象掩蓋絕緣劣化"],
        ["PCA-3 濕態噴霧絕緣查線 SOP", "修訂水上案場查修 SOP：凡遇間歇性絕緣告警而日間搖測正常者，強制對浮筒跨接段執行「低壓水霧噴灑模擬測試」搭配高阻計搖測。", "間歇性接地故障一次查獲率達 100%", "大幅減少工班重複登浮筒次數"]
      ]
    },
    d6: {
      tag: "D6 VALIDATION OF EFFECTIVENESS · 季風降雨期實測與 60 天晨間併網率驗證",
      conclusionTitle: "改造完成後歷經 3 波鋒面降雨與 7 級東北季風實測，INV #03 與 #07 晨間最低 R_iso 穩定維持於 15.2 MΩ 以上，晨間 06:05 準時併網率達 100%",
      validationMetrics: [
        ["晨間 06:30 最低絕緣阻抗 (R_iso)", "38 kΩ (跳機鎖死)", "15.2 MΩ (雨天實測)", "≥ 1.0 MΩ (IEC 62446)", "✅ 通過（提升 400 倍安全裕度）"],
        ["晨間 06:00–09:30 發電同儕比", "0.000 (完全停機)", "0.998", "≥ 0.980", "✅ 通過（挽回全部晨間電量）"],
        ["全場日均 PR 值", "68.4%", "82.1%", "≥ 81.0%", "✅ 通過（與岸上標準組完全一致）"],
        ["48 處跨接點波浪擺動檢查", "11 處磨損/刮傷", "0 處摩擦接觸", "0 處異常", "✅ 通過（Ω 型波紋管運作正常）"]
      ],
      longTermNote: "透過 UNSW P2P 與清晨 R_iso 時間序列連續追蹤 60 天，確認在相對濕度 95% 之春雨期間無任何阻抗下滑斜率。"
    },
    d7: {
      tag: "D7 PREVENT RECURRENCE · 水面型光電工程標準升版與集團水域案場橫向展開",
      conclusionTitle: "完成《水面型光電浮筒佈線 PFMEA 與管制計畫》v3.0 升版，並將 Ω 型撓性跨接標準橫向展開至嘉義、台南共 5 座滯洪池與魚電共生案場",
      docRevisions: [
        ["PFMEA 水面佈線失效分析", "PFMEA-FPV-CAB-002", "v1.2 → v3.0", "將「浮筒鉸接波浪剪切磨損」列為 S=9 高風險項目，強制規定無 Ω 型膨脹彎與導角護邊不得放行（RPN 由 432 降至 27）。"],
        ["水上光電施工管制計畫", "CP-FPV-INST-005", "v1.0 → v2.0", "增列「浮筒跨接點 ±15° 自由度拉動測試」與「清晨濕態 1000V Megger 基線建檔」為併網驗收必備條件。"],
        ["間歇性絕緣查修 SOP", "SOP-OM-FPV-011", "v1.1 → v2.0", "明定「清晨結露窗口搖測法」與「噴霧模擬查線法」，禁止僅憑正午高阻值結案。"],
        ["SCADA 絕緣趨勢預警規則", "ALM-RULE-RISO-02", "v1.0 → v2.0", "部署晨間 R_iso P10 < 1.0 MΩ 自動預警與濕度解耦模型。"]
      ],
      yokotenSites: [
        { site: "台中大安・龜殼段水上光電 (本案)", capacity: "1,999.8 kWp", status: "100% 完成 48 處改造", finding: "修復 2 處磨穿 + 加固 9 處刮傷點" },
        { site: "嘉義義竹・滯洪池水上光電", capacity: "3,450.0 kWp", status: "100% 完成橫向加固", finding: "預防性改裝 64 處浮筒鉸接波紋管" },
        { site: "台南學甲・室內外魚電共生案場", capacity: "2,120.0 kWp", status: "100% 完成規則部署", finding: "導入晨間 R_iso P10 趨勢告警規則" }
      ]
    },
    d8: {
      tag: "D8 CLOSURE & FINANCIAL VALUATION · 水上光電 20 年 DCF 防損估值與結案認證",
      conclusionTitle: "以 NT$ 28,000 跨接防護改造投入，挽回年化 NT$ 23.72 萬晨間發電營收（43.1 天回本），20 年生命周期 DCF 防損淨現值達 NT$ 312.0 萬",
      financialSummary: [
        ["全場 48 處 Ω 型波紋管與護邊改造費用", "NT$ 28,000", "含 AD8 耐候線材、PA6 波紋管、EPDM 護條與水上施工工時"],
        ["異常期間歷史短少電費 (26 天)", "8,420 kWh (NT$ 36,442)", "依 FIT = NT$ 4.3280 / kWh 核算"],
        ["年化避免發電損失 (Annual Avoided Loss)", "54,800 kWh / 年 (NT$ 237,174 / 年)", "同時避免直流接地演變為逆變器 IGBT 模組炸機（單台更換成本逾 NT$ 25 萬）"],
        ["20 年 DCF 累積防損淨現值 (NPV)", "NT$ 3,120,000 (312.0 萬)", "含發電防損現金流與避免逆變器主機損壞之風險調整現值"],
        ["投資回收期 (Payback Period)", "43.1 天 (0.12 年)", "高投報率之工程防呆改造"]
      ],
      rubricScores: [
        ["D0/D1 濕態特徵捕捉與水上 LOTO (10%)", "10 / 10", "SMOTE 捕捉晨間濕態特徵，落實水面救生與驗電 LOTO"],
        ["D2 晨間損失切分與 Is/Is Not (15%)", "15 / 15", "精準切分晨間 06:30–09:30 損失與迎風面空間邊界"],
        ["D3 清晨搖測隔離與 48 處普查 (10%)", "10 / 10", "改變巡檢時段當場抓出漏電串並完成全場跨接橋普查"],
        ["D4 波浪剪切物理實證與流出分析 (30%)", "29 / 30", "完整揭示陸地規範誤用於水面之設計根因與正午量測盲點"],
        ["D5/D6 Ω 型改造與鋒面降雨驗證 (20%)", "19 / 20", "歷經春雨實測 R_iso > 15.2 MΩ，零跳機紀錄"],
        ["D7/D8 水面規範升版與 DCF 估值 (15%)", "13 / 15", "展開至 5 座水域案場並寫入 TWVNS 知識庫"]
      ]
    },
    charts: {
      execWaterfall: {
        categories: ["同儕基準應發電", "Stage 1 間歇延遲(-8.8%)", "Stage 2 晨間鎖死(-17.1%)", "異常期實發電量", "D6 改造後恢復發電"],
        values: [64200, -3180, -5240, 55780, 64050],
        prLine: [82.5, 75.2, 68.4, 68.4, 82.1]
      },
      d2Timeline: {
        dates: ["01/25", "01/30", "02/02(季風)", "02/06", "02/10", "02/14", "02/18(鎖死)", "02/21", "02/24", "02/28(隔離)", "03/04(改造)", "03/10", "03/15", "03/20"],
        peerRatio: [1.00, 0.99, 0.92, 0.90, 0.91, 0.89, 0.83, 0.82, 0.83, 0.96, 0.99, 1.00, 1.00, 1.00],
        irradiance: [4.5, 4.8, 4.2, 4.9, 5.1, 4.6, 5.3, 5.0, 5.4, 5.2, 5.5, 5.1, 5.6, 5.7]
      },
      d3AlarmFunnel: {
        labels: ["原始絕緣/電網瞬態通知", "剔除夜間通訊重連雜訊", "ISA-18.2 因果折疊聚合", "SMOTE 濕度耦合篩選", "確認之物理線纜磨損接地"],
        counts: [310, 180, 75, 18, 2]
      },
      d4Mppt: {
        hours: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        normalMpptCurrent: [1.2, 5.8, 12.6, 18.5, 23.4, 26.2, 27.0, 26.5, 22.8, 16.4, 8.2, 1.8],
        faultMppt1Current: [0.0, 0.0, 0.0, 0.0, 23.1, 26.0, 26.8, 26.3, 22.6, 16.2, 8.0, 1.7],
        stage1Mppt1Current: [0.0, 0.0, 8.4, 18.2, 23.2, 26.1, 26.9, 26.4, 22.7, 16.3, 8.1, 1.8],
        normalVoltage: [680, 710, 735, 745, 750, 748, 742, 744, 749, 740, 720, 685]
      },
      d6Convergence: {
        days: ["D-30", "D-25", "D-20", "D-15", "D-10", "D-5", "D0(改造)", "D+5", "D+10", "D+15", "D+30", "D+45", "D+60"],
        rawP2P: [0.91, 0.90, 0.83, 0.82, 0.83, 0.82, 0.99, 1.00, 1.00, 0.99, 1.00, 1.00, 1.00],
        hpTrend: [0.905, 0.880, 0.845, 0.830, 0.828, 0.826, 0.988, 0.995, 0.997, 0.998, 0.998, 0.999, 0.999]
      },
      d8Dcf: {
        years: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y12", "Y14", "Y16", "Y18", "Y20"],
        cumNpvWan: [20.9, 41.2, 60.4, 78.6, 95.8, 112.1, 127.5, 142.1, 155.9, 169.0, 193.1, 214.7, 234.1, 251.5, 312.0]
      }
    }
  },
  {
    id: "8D-2026-GS02",
    code: "8D-2026-GS02",
    siteName: "高雄岡山・五甲尾地面型升壓站案場",
    capacityKwp: 4999.2,
    inverterSpec: "Sungrow SG250HX 250kW × 20 台（集中升壓併入 22.8kV 饋線）",
    targetEquip: "全場 20 台逆變器與 22.8kV 併網點 (PCC) 無功功率控制器 (PPC)",
    occurDate: "2026-02-05（正午過壓降載）→ 2026-03-01（午間跳脫截割）",
    reportDate: "2026-03-22",
    stage: "D7",
    statusLabel: "D7 防再發展開中",
    traceScore: 46,
    weightedScore: 91,
    fitRate: 4.0512,
    lostKwh: 19650.0,
    lostRevenueNtd: 79606,
    annualLossKwh: 142000,
    annualLossNtd: 575270,
    dcf20YrNpvNtd: 7450000,
    repairCostNtd: 45000,
    paybackDays: 28.5,
    prBefore: 71.8,
    prPeer: 83.4,
    prAfter: 83.1,
    irrPct: 11.20,
    cover: {
      tag: "8D PROBLEM SOLVING & GRID OVERVOLTAGE CLIPPING REPORT · 8D-2026-GS02",
      conclusionTitle: "五甲尾 5MW 案場正午平頂截割損失 14.2 萬度/年係因饋線末端電壓升至 1.048 p.u. 觸發逆變器高壓降額，啟用 PPC 動態 Q(V) 吸收無功後全數消除截割",
      subtitle: "結合 UNSW Clipping 識別、微電網 MPC 電壓告警控制台與 PPC 無功閉環調校之 8D 決策報告",
      kpis: [
        { label: "35 天累計截割損失 (D2)", value: "19,650 kWh", note: "每日 11:15–13:45 正午黃金時段平頂截割", isAccent: true },
        { label: "年化預期挽回營收 (D8)", value: "NT$ 575,270 /年", note: "年化防損 142,000 kWh (FIT 4.0512)", isAccent: true },
        { label: "20 年 DCF 累積防損淨現值", value: "NT$ 745.0 萬", note: "PPC 韌體與變壓器分接頭調校僅 NT$ 4.5 萬", isAccent: false },
        { label: "8D 合規審查 / TRACE 評分", value: "91 分 / 46/50", note: "D6 驗證完成，正執行 D7 地面型案場橫向展開", isAccent: false }
      ],
      metaLeft: [
        ["案場名稱與容量", "高雄岡山・五甲尾地面型案場（4,999.2 kWp，22.8kV 專線併網）"],
        ["異常標的設備", "22.8kV 升壓變壓器有載分接頭 (OLTC) 與電廠控制器 (PPC)"],
        ["異常演進時間軸", "2026/02/05 饋線新增鄰近光電併網 → 正午 PCC 電壓衝高至 23.9kV"]
      ],
      metaRight: [
        ["核心調用 AI Skills", "pv-microgrid-alarm-mpc · pv-performance-diagnosis · quality-8d-engineering-skills"],
        ["物理根因結論 (D4)", "PPC 固定設為 PF=1.0 純實功輸出，正午饋線逆送電壓超標觸發逆變器 P(V) 降額"],
        ["系統流出根因 (D4)", "SCADA 誤將逆變器主動高壓降額歸類為「正常運轉無故障碼」，未計算平頂截割損失"]
      ]
    },
    summary: {
      tag: "EXECUTIVE SUMMARY · 電網過壓截割 (Grid Overvoltage Clipping) 決策摘要",
      conclusionTitle: "透過 UNSW 晴空曲線斜率比對與微電網電壓控制台，識破「無故障碼之隱性過壓降載」，以 Q(V) 動態無功吸收將正午併網點電壓壓回 1.015 p.u.",
      kpis: [
        { label: "正午峰值截割幅度", value: "-21.5% P_ac", sub: "正午出力被鎖死於 3.65 MW（應達 4.65 MW）", isAccent: true },
        { label: "PCC 正午電壓控制", value: "1.015 p.u.", sub: "由 1.048 p.u. 降至安全帶內 (PF=0.96 滯後)", isAccent: false },
        { label: "平頂截割時數歸零", value: "0.0 hrs/日", sub: "由原本每日截割 2.5 小時降至 0", isAccent: false }
      ],
      matrixRows: [
        ["D0~D1 立案與安全", "pv-microgrid-alarm-mpc", "SCADA 告警控制台捕捉到正午 22.8kV 母線電壓 > 1.045 p.u. 與有功功率平頂截割高度同步，成立高壓電力調度小組。"],
        ["D2 量化問題描述", "pv-performance-diagnosis", "利用 pvlib 晴空模型重建正午鐘型曲線頂部面積，精算 35 天隱性截割損失達 19,650 kWh（NT$ 79,606）。"],
        ["D3 暫時圍堵對策", "pv-microgrid-alarm-mpc", "先由遠端將逆變器功率因數臨時固定調為 PF = 0.97 滯後（吸收無功），當日正午截割損失立即減少 80%。"],
        ["D4 雙軌根因實證", "quality-8d-engineering-skills", "發生根因：台電饋線新增大量光電併網致午間背景電壓墊高，而本場變壓器分接頭置於 +2.5% 檔位且未啟用 Q(V) 曲線；流出根因：無故障碼隱性降載未納入告警。"],
        ["D5~D6 永久對策驗證", "pv-microgrid-alarm-mpc", "停電調降升壓變壓器無載分接頭 (Tap) 一檔 (-2.5%)，並於 PPC 啟用 IEEE 1547 標準 Q(V) 動態電壓無功控制，PR 恢復至 83.1%。"],
        ["D7~D8 防再發與估值", "skill-8d-report-analyzer", "將「正午晴空 Clipping 面積自動積分告警」部署至全集團地面型電廠，保全 20 年 DCF 淨現值 NT$ 745.0 萬。"]
      ]
    },
    d0d1: {
      tag: "D0 SYMPTOM & D1 TEAM · 隱性過壓截割識別、22.8kV 高壓 LOTO 與調度團隊",
      conclusionTitle: "逆變器雖無任何跳機故障碼，但 UNSW 晴空模型偵測到正午 11:15–13:45 功率波形呈「水平削頂」，鎖定為 22.8kV 電網過壓觸發之 P(V) 自動降額",
      symptomCards: [
        { title: "1. 零故障碼之隱性平頂截割偵測 (UNSW Clipping Engine)", metric: "每日削頂 2.5 小時", desc: "多數商用逆變器在電網電壓逼近上限 (1.04~1.05 p.u.) 時，會啟動內建 P(V) 保護自動削減實功輸出而不會報出停機告警。本平台透過 pv-performance-diagnosis 比對正午日射計鐘型峰值與實功平頂差值，揪出每日高達 560 kWh 之隱性蒸發電量。" },
        { title: "2. 22.8kV 特高壓/高壓變壓器分接頭調校 LOTO", metric: "台電調度聯繫 + 接地銅棒", desc: "調整升壓變壓器無載分接頭 (NLTC) 涉及 22.8kV 高壓側作業，必須於夜間停機時段執行 VCB 斷開 → 拉出車體 → 22.8kV 驗電筆驗電 → 掛設三相短路接地線組 (LOTO) → 吸收殘餘電荷後始得切換檔位。" }
      ],
      raciTable: [
        ["D1 專案負責人 (Champion)", "高壓機電總工程師", "核准變壓器分接頭調整計畫與台電饋線電壓協調", "Accountable (A)"],
        ["AI 數據與電力系統工程師", "運維數據中心", "執行 Q(V) 無功潮流模擬與正午 Clipping 面積積分核算", "Responsible (R)"],
        ["甲級電器承裝技術員", "高壓維護班", "執行 22.8kV VCB LOTO 接地、變壓器 Tap 切換與接觸電阻測試", "Responsible (R)"],
        ["SCADA 控制工程師", "自動化組", "燒錄 PPC 動態 Q(V) 雙斜率曲線與部署 Clipping 預警規則", "Responsible (R)"]
      ]
    },
    d2: {
      tag: "D2 PROBLEM DESCRIPTION · 正午黃金時段削頂損失量化與 Is / Is Not 矩陣",
      conclusionTitle: "全場 20 台逆變器於晴空正午同步受限於 73% 容量上限，35 天累計削頂損失 19,650 kWh，且異常與饋線母線電壓 > 23.8 kV 呈 100% 正相關",
      stageComparison: [
        ["Baseline 冬季併網初期", "2026/01/01 – 02/04", "0.996 (-0.4%)", "0 kWh", "正午 PCC 電壓約 23.1 kV (1.013 p.u.)，功率呈完整鐘型曲線"],
        ["Stage 1 鄰場併網墊高期", "2026/02/05 – 02/28", "0.892 (-10.8%)", "10,450 kWh", "鄰近 8MW 光電併入同一台電饋線，正午電壓升至 23.8 kV，觸發輕度 P(V) 降額"],
        ["Stage 2 春季高日照截割期", "2026/03/01 – 03/11", "0.841 (-15.9%)", "9,200 kWh", "春季正午日射突破 920 W/m²，電壓觸及 24.0 kV，全場削頂幅度達 -21.5%"]
      ],
      isIsNot: [
        ["What (異常現象)", "正午 11:15–13:45 交流實功輸出呈水平直線削頂，伴隨交流電壓 V_ac > 1.045 p.u.", "直流側組串開路、模組熱斑或逆變器 IGBT 過溫降載"],
        ["Where (空間位置)", "全場 20 台逆變器同步發生（越靠近升壓站尾端之逆變器削頂越深）", "單一逆變器或單一 MPPT 迴路之局部故障"],
        ["When (發生時機)", "僅發生於晴空日正午高出力時段（饋線總逆送潮流最高時）", "陰天、清晨、傍晚或假日工業區用電負載高時段"],
        ["Extent (影響範圍)", "正午峰值削減約 1,000 kW（每日損失 500~850 kWh）", "全天候固定比例之效率衰減"]
      ]
    },
    d3: {
      tag: "D3 INTERIM CONTAINMENT · 遠端固定功率因數 (PF=0.97) 緊急壓降母線電壓",
      conclusionTitle: "在不需停機的條件下，由中央監控遠端將 PPC 功率因數由 PF=1.0 調整為 PF=0.97 滯後（感性吸收無功），10 分鐘內將正午母線電壓壓低 0.024 p.u. 並挽回 85% 截割電力",
      containmentActions: [
        ["ICA-1 遠端投入感性無功 (PF=0.97 Lagging)", "利用逆變器剩餘視在功率容量 (S = 250kVA) 吸收電網感性無功 Q ≈ -60 kvar/台，抵消饋線電抗器壓升效應 ($\\Delta V \\approx (R P + X Q)/V$)。", "正午 PCC 電壓立即由 23.95 kV 降至 23.40 kV，削頂消失 85%", "已完成 (遠端即時生效)"],
        ["ICA-2 升壓變壓器分接頭檔位盤點", "調閱 2,500kVA 升壓變壓器出廠試驗報告與現場銘牌，確認目前無載分接頭位於 Tap 2 (+2.5%)，具備下調至 Tap 3 (額定 0%) 之物理空間。", "確認硬體調降電壓空間", "已完成"],
        ["ICA-3 全面盤點集團饋線末端案場", "針對全集團併入台電農村型長距離饋線之 8 座地面型案場，啟動 UNSW Clipping 掃描。", "發現台南將軍案場亦有輕微正午過壓現象", "已納入橫向展開"]
      ],
      batchStats: [
        { label: "全場受影響逆變器", value: "20 台 / 20 台 (100%)", note: "全場受公共併網點 (PCC) 電壓連動" },
        { label: "ICA 投入無功容量", value: "-1.15 Mvar (感性)", note: "不影響有功上限之前提下壓低母線電壓" },
        { label: "當日立即挽回發電量", value: "+740 kWh / 日", note: "遠端參數調校後次一個晴空日實測" }
      ]
    },
    d4a: {
      tag: "D4 ROOT CAUSE VERIFICATION · 饋線阻抗壓升物理公式與雙向 5-Why 實證",
      conclusionTitle: "物理公式 $\\Delta V \\approx (RP + XQ)/V$ 實證：饋線高實功逆送加上變壓器 Tap 偏高致電壓超標（發生根因），而監控系統未監測無故障碼之 P(V) 降額（流出根因）",
      fiveWhyOccurrence: [
        ["Why 1", "為何五甲尾 5MW 案場在正午陽光最強時，發電功率被鎖死在 3.65 MW？", "因為逆變器交流側端電壓超過 836V AC (1.045 p.u.)，觸發韌體內建之高壓降載曲線 P(V) 自動削減有功輸出。"],
        ["Why 2", "為何逆變器交流端電壓會高達 1.045 p.u.？", "因為台電 22.8kV 饋線在正午有大量鄰近光電案場同時逆送電力，且本場升壓變壓器低壓側電壓被分接頭額外墊高了 +2.5%。"],
        ["Why 3", "為何在饋線電壓升高時，本場電廠控制器 (PPC) 未自動拉低電壓？", "因為 PPC 出廠時被設定為固定「PF = 1.0（純實功模式，Q = 0）」，未啟用隨電壓動態吸收無功之 Q(V) 下垂控制。"],
        ["Why 4", "為何竣工併網時將變壓器設於 +2.5% 且關閉 Q(V) 控制？", "因為兩年前併網初期該饋線尚無其他光電案場，工程師為補償長距離線路壓降而調高分接頭，此後未隨區域光電密度增加而重評估。"],
        ["Why 5 (發生根因)", "為何饋線背景電壓結構改變卻未觸發系統參數重整？", "【發生根因 Occurrence RC】缺乏「併網點 (PCC) 季節性電壓裕度審查與 PPC 閉環無功控制標準」，仍採用靜態開環設定應對高滲透率光電電網。"]
      ],
      fiveWhyEscape: [
        ["Why 1", "為何每日正午損失逾 560 kWh 持續 35 天，監控室卻以為案場完全正常？", "因為全場 20 台逆變器狀態燈皆顯示綠色「Grid Connected (正常併網)」，無任何 Fault Alarm 跳出。"],
        ["Why 2", "為何損失 21.5% 峰值功率卻未被 PR 報表突顯？", "因為春季整體日照時數拉長，全月累積發電量仍達預算目標之 96%，掩蓋了正午黃金 2.5 小時的削頂損失。"],
        ["Why 3 (流出根因)", "為何監控系統無法抓出「晴空正午削頂」？", "【流出根因 Escape RC】SCADA 缺乏「pvlib 理論晴空鐘型曲線 vs. 實際出力之正午二階導數/平頂截割檢測演算法 (UNSW Clipping Detector)」。"]
      ]
    },
    d4b: {
      tag: "D4 HYPOTHESIS ELIMINATION · 地面型案場正午平頂截割假說排除與知識溯源",
      conclusionTitle: "排除「容配比超配截割 (DC/AC Ratio Clipping)、逆變器風扇故障過溫降額、台電 DNP3 遠端限電指令」三大假說，確立為「PCC 過壓自發 P(V) 降額」",
      hypotheses: [
        ["H1：設計容配比 (DC/AC Ratio) 超配導致逆變器達額定功率上限截割", "若為容配比自然截割，平頂高度必等於逆變器額定滿載功率 (250kW × 20 = 5.0 MW)。", "實測削頂高度僅 3.65 MW（單機僅 182 kW，遠低於額定 250 kW）。", "❌ 已排除"],
        ["H2：台電調度中心透過 DREAMS / DNP3 下達有功限電指令 (Curtailment)", "若為台電遠端限電，PPC 紀錄器中之 Active Power Setpoint 暫存器會由 100% 變為 73%。", "查核 PPC 歷史 Log，台電端 Setpoint 全程維持 100% 未變動。", "❌ 已排除"],
        ["H3：逆變器散熱風扇故障導致正午內部 IGBT 過溫降額 (Thermal Derating)", "過溫降額會因各台逆變器日照與通風位置不同而參差不齊，且機箱溫度 > 75°C。", "全場 20 台同步削頂且機箱溫度僅 51°C，且遠端投入無功 Q 後削頂立即消失。", "❌ 已排除"],
        ["H4：饋線背景電壓墊高 + 變壓器 Tap 偏高致觸發逆變器高壓 P(V) 降額", "當 V_ac > 1.04 p.u. 時實功隨電壓線性下調；投入感性無功壓低電壓後實功即刻恢復滿載。", "ICA-1 調為 PF=0.97 後當日正午出力立即由 3.65 MW 躍升至 4.58 MW。", "✅ 實證確立"]
      ],
      graphPath: [
        { code: "T (Task 任務)", name: "5MW 地面型高壓併網光電案場電力調度維運", detail: "高光電滲透率之 22.8kV 配電饋線" },
        { code: "W (Work Step 步驟)", name: "升壓變壓器分接頭設定與 PPC 電廠無功功率控制", detail: "決定正午大發時段之併網點電壓穩定度" },
        { code: "V (Failure 失效模式)", name: "固定 PF=1.0 無電壓調節能力，致 PCC 電壓 > 1.045 p.u. 觸發 P(V) 削頂", detail: "無故障碼下每日蒸發 560+ kWh" },
        { code: "N (Norm 法規與標準)", name: "IEEE 1547-2018 / 台電再生能源發電系統併聯技術要點", detail: "支援電壓-無功 Q(V) 自動調節模式" },
        { code: "S (Safeguard 防護控制)", name: "變壓器 Tap 調回 0% 額定檔 + PPC 啟用動態 Q(V) 曲線 + UNSW 削頂檢測", detail: "平時 PF=1.0 零線損，僅於 V>1.02 p.u. 時動態吸無功" }
      ]
    },
    d5: {
      tag: "D5 PERMANENT CORRECTIVE ACTIONS · 變壓器分接頭優化與動態 Q(V) 閉環控制",
      conclusionTitle: "為何不長期固定 PF=0.97？因為全天候吸收無功會增加線損！永久對策改採「變壓器 Tap 下調 2.5% ＋ IEEE 1547 動態 Q(V) 死區控制」，兼顧零截割與最低線損",
      pcaTable: [
        ["PCA-1 升壓變壓器分接頭物理調降", "利用夜間停機窗口執行 22.8kV LOTO，將兩具 2,500kVA 升壓變壓器無載分接頭由 Tap 2 (+2.5%) 調回 Tap 3 (0% 額定檔位)，並完成三相繞組直流電阻平衡測試（偏差 < 0.4%）。", "低壓側基準電壓直接下降 2.5%，消除靜態電壓偏置", "夜間施工零發電損失"],
        ["PCA-2 PPC 啟用動態 Q(V) 電壓-無功曲線", "取代臨時固定 PF=0.97 方案，於 PPC 寫入動態 Q(V) 曲線：當 V_pcc ≤ 1.02 p.u. 時維持 PF = 1.0（零無功線損）；當 V_pcc 介於 1.02~1.04 p.u. 時線性增加感性無功吸收（最大至 PF = 0.95）。", "正午峰值電壓穩定控制在 1.015 p.u.，非正午時段維持零無功損耗", "較固定 PF 方案每年額外減少約 8,200 kWh 銅損"],
        ["PCA-3 部署 UNSW 正午削頂自動偵測器", "於進能服雲端平台啟用 `pv-performance-diagnosis` Clipping 演算法：自動比對晴空日 11:00–14:00 輻照度曲線二階導數與有功功率二階導數，一旦出現無限電指令之平頂削波即刻報警。", "100% 捕捉隱性過壓或溫升削頂", "徹底堵住「無故障碼降載」之監控盲區"]
      ]
    },
    d6: {
      tag: "D6 VALIDATION OF EFFECTIVENESS · 晴空正午鐘型曲線復原與無功損耗驗證",
      conclusionTitle: "對策實施後正午峰值出力由 3.65 MW 躍升至 4.68 MW（完整鐘型曲線無削頂），全場晴空 PR 達 83.1%，每日淨增發電量達 685 kWh",
      validationMetrics: [
        ["正午 12:15 峰值有功出力 (G=940 W/m²)", "3.65 MW (削頂受限)", "4.68 MW (完整鐘型)", "≥ 4.60 MW", "✅ 通過（峰值功率提升 +28.2%）"],
        ["正午 PCC 最高併網電壓", "23.95 kV (1.050 p.u.)", "23.14 kV (1.015 p.u.)", "≤ 23.48 kV (1.03 p.u.)", "✅ 通過（遠離過壓降載門檻）"],
        ["每日正午平頂截割時數", "2.5 小時 / 日", "0.0 小時 / 日", "0.0 小時", "✅ 通過（Clipping 完全歸零）"],
        ["全場晴空日 PR 值", "71.8%", "83.1%", "≥ 82.0%", "✅ 通過（較異常期提升 +11.3% pt）"]
      ],
      longTermNote: "持續透過 `pv-microgrid-alarm-mpc` 監控 22.8kV 饋線四季電壓分佈，確認動態 Q(V) 死區控制在陰晴交替日無震盪現象。"
    },
    d7: {
      tag: "D7 PREVENT RECURRENCE · 高壓併網控制標準升版與大型地面站橫向展開",
      conclusionTitle: "修訂《高壓併網電廠 PPC 電壓控制與分接頭設計規範》，並對集團轄下 8 座 2MW 以上地面型案場完成正午削頂普查與 Q(V) 曲線植入",
      docRevisions: [
        ["高壓併網系統設計規範", "STD-HV-PPC-003", "v1.1 → v2.0", "強制規定所有 11.4kV/22.8kV 併網案場必須啟用 PPC 動態 Q(V) 曲線，嚴禁設為死鎖 PF=1.0。"],
        ["變壓器試運轉管制計畫", "CP-HV-TR-009", "v1.3 → v2.0", "併網滿載 30 天後必須依據實測正午 PCC 電壓分佈重新確認最佳 Tap 檔位。"],
        ["SCADA 性能演算法規則庫", "ALM-RULE-CLIP-04", "v1.0 → v2.0", "正式上線 UNSW 平頂截割積分檢測器，將無故障碼之 P(V) 與過溫降載納入日報表核心指標。"]
      ],
      yokotenSites: [
        { site: "高雄岡山・五甲尾地面型 (本案)", capacity: "4,999.2 kWp", status: "100% 完成 Tap 與 Q(V) 優化", finding: "年化挽回 14.2 萬度截割損失" },
        { site: "台南將軍・鹽灘地光電案場", capacity: "6,200.0 kWp", status: "完成 Q(V) 曲線植入", finding: "消除正午 12:00–13:00 輕微過壓削頂 (+4.2% PR)" },
        { site: "屏東枋寮・農電地面型案場", capacity: "3,800.0 kWp", status: "完成普查驗證", finding: "PCC 電壓裕度充足，已完成 Clipping 告警綁定" }
      ]
    },
    d8: {
      tag: "D8 CLOSURE & FINANCIAL VALUATION · 5MW 地面站 20 年 DCF 防損估值與審查",
      conclusionTitle: "僅投入 NT$ 4.5 萬高壓調校費用，每年直接創造 NT$ 57.53 萬額外售電營收（28.5 天回本），20 年生命周期 DCF 防損淨現值高達 NT$ 745.0 萬",
      financialSummary: [
        ["高壓變壓器 Tap 切換與 PPC 曲線調校成本", "NT$ 45,000", "含夜間高壓技術員作業、繞組直阻測試與自動化工程師工時"],
        ["35 天歷史已發生削頂損失", "19,650 kWh (NT$ 79,606)", "依 FIT = NT$ 4.0512 / kWh 核算"],
        ["年化避免截割損失 (Annual Avoided Clipping)", "142,000 kWh / 年 (NT$ 575,270 / 年)", "直接轉化為純營業利益（邊際發電成本為 0）"],
        ["20 年 DCF 累積防損淨現值 (NPV)", "NT$ 7,450,000 (745.0 萬)", "折現率 WACC = 5.2% 計算之 20 年長期現金流貢獻"],
        ["投資回收期 (Payback Period)", "28.5 天 (0.08 年)", "零硬體更換之高槓桿軟體與電氣參數優化"]
      ],
      rubricScores: [
        ["D0/D1 無故障碼削頂捕捉與 22.8kV LOTO (10%)", "10 / 10", "UNSW 削頂檢測結合特高壓接地掛鎖規範"],
        ["D2 正午鐘型積分核算與 Is/Is Not (15%)", "14 / 15", "精確量化每日 2.5 小時削頂面積"],
        ["D3 遠端 PF=0.97 即時止血對策 (10%)", "10 / 10", "10 分鐘內遠端壓低母線電壓挽回 85% 損失"],
        ["D4 饋線壓升公式與雙軌 5-Why 實證 (30%)", "28 / 30", "清楚解構 ΔV=(RP+XQ)/V 物理機制與無故障碼流出盲點"],
        ["D5/D6 Tap 下調 + 動態 Q(V) 驗證 (20%)", "17 / 20", "消除固定 PF 線損副作用，正午峰值提升 28.2%"],
        ["D7/D8 高壓規範升版與 745 萬 DCF 估值 (15%)", "12 / 15", "D7 跨案場展開進行中（完成度 90%）"]
      ]
    },
    charts: {
      execWaterfall: {
        categories: ["晴空理論應發電", "Stage 1 輕度過壓(-10.8%)", "Stage 2 嚴重削頂(-15.9%)", "異常期實發電量", "D6 Q(V)投入後發電"],
        values: [148500, -10450, -9200, 128850, 148100],
        prLine: [83.4, 75.8, 71.8, 71.8, 83.1]
      },
      d2Timeline: {
        dates: ["01/28", "02/02", "02/05(鄰場併網)", "02/10", "02/15", "02/20", "02/25", "03/01(高日照)", "03/05", "03/09", "03/11(D3調PF)", "03/15(D5調Tap)", "03/19", "03/22"],
        peerRatio: [1.00, 0.99, 0.90, 0.89, 0.88, 0.89, 0.88, 0.84, 0.83, 0.84, 0.97, 1.00, 1.00, 1.00],
        irradiance: [4.9, 5.0, 5.3, 5.4, 5.2, 5.5, 5.6, 6.1, 6.2, 6.0, 6.1, 6.3, 6.2, 6.4]
      },
      d3AlarmFunnel: {
        labels: ["每日逆變器瞬態電壓波動紀錄", "剔除台電夜間調壓操作", "UNSW 正午晴空平頂篩選", "PCC 母線電壓 > 1.04 p.u. 交集", "確認之系統級 P(V) 過壓截割事件"],
        counts: [580, 320, 95, 20, 1]
      },
      d4Mppt: {
        hours: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        normalMpptCurrent: [0.15, 0.85, 2.10, 3.45, 4.30, 4.65, 4.72, 4.68, 4.15, 3.10, 1.65, 0.35],
        faultMppt1Current: [0.15, 0.85, 2.10, 3.42, 3.65, 3.65, 3.65, 3.65, 3.65, 3.08, 1.65, 0.35],
        stage1Mppt1Current: [0.15, 0.85, 2.10, 3.44, 4.05, 4.10, 4.10, 4.10, 4.02, 3.10, 1.65, 0.35],
        normalVoltage: [22.9, 23.1, 23.4, 23.7, 23.9, 24.0, 24.0, 23.9, 23.8, 23.5, 23.2, 23.0]
      },
      d6Convergence: {
        days: ["D-30", "D-25", "D-20", "D-15", "D-10", "D-5", "D0(D3/D5)", "D+5", "D+10", "D+15", "D+20", "D+25", "D+30"],
        rawP2P: [0.89, 0.88, 0.89, 0.84, 0.83, 0.84, 0.97, 1.00, 1.00, 0.99, 1.00, 1.00, 1.00],
        hpTrend: [0.888, 0.885, 0.875, 0.850, 0.838, 0.836, 0.965, 0.994, 0.998, 0.998, 0.999, 0.999, 0.999]
      },
      d8Dcf: {
        years: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y12", "Y14", "Y16", "Y18", "Y20"],
        cumNpvWan: [50.2, 98.6, 144.3, 187.5, 228.3, 266.8, 303.2, 337.6, 370.1, 400.8, 457.2, 507.6, 552.6, 592.8, 745.0]
      }
    }
  }
];
