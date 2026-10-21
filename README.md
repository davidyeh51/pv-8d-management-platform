# 進能服維運事業單位｜8D分析管理平台

**線上發佈網址 (GitHub Pages)**：[https://davidyeh51.github.io/pv-8d-management-platform/](https://davidyeh51.github.io/pv-8d-management-platform/)

---

## 1. 平台定位與麥肯錫顧問視覺規範

本平台以《光伏運維 8D 報告與知識庫》與《光伏維運 AI Agent 應用與研究》之**核心結論**為主體，採用與 [`madou-shinkun-diagnostic`](https://davidyeh51.github.io/madou-shinkun-diagnostic/) 一致的 **12 頁互動式簡報翻頁引擎 (Slide Deck Mode / 完整報告雙模式)**，並嚴格遵循 **麥肯錫顧問風格 (McKinsey Consulting Visual Standard)**：

- **三色極簡權威配色**：主色深藍（Deep Navy `#0C3A63` / `#082644`）＋中性灰階（Neutral Grayscale），搭配單一強調色（琥珀金 Amber Gold `#D97706`）僅標示最關鍵的損失金額、核心缺口或根因結論。
- **金字塔原理排版 (Pyramid Principle)**：每一頁簡報標題 (`<h2>`) 直接撰寫「**本頁結論**」（一句完整的行動結論句，而非單純章節名稱），下方以結構化矩陣、流程圖或 ECharts 互動圖表支撐該結論。
- **圖表優先與留白節制**：內建 6 座 ECharts 工程與財務圖表（發電損失瀑布圖、P2P 階梯劣化與日射解耦圖、ISA-18.2 告警降噪漏斗、UNSW 高頻時序穿透圖、D6 HP 濾波收斂圖、20 年 DCF 淨現值防損曲線），每頁嚴格限制 $\le 3$ 個視覺群組。

---

## 2. 已安裝之 11 大光伏維運與 8D 品質工程 AI Skills

所有技能已完整安裝於 `C:\Users\davidyeh\.gemini\config\skills\`：

| 層級 | Skill 代號 | 對應開源專案 (GitHub) | 8D 階段映射 |
| :--- | :--- | :--- | :---: |
| **Layer 1 數據感知與時序物理診斷層** | `pv-performance-diagnosis` | `UNSW-Solar/performance_diagnosis` | D0, D2, D4, D6 |
| **Layer 1 數據感知與時序物理診斷層** | `pv-ll-cloud-decoupling` | `sprince0031/Solar-Fault-Detection-Classification-Project` | D0, D4 |
| **Layer 1 & 2 邊緣感測與對話代理** | `pv-soma-iot-agent` | `Azza-chr/SOMA` | D0, D3, D5 |
| **Layer 1 數據感知與髒數據清洗層** | `pv-scada-audit-reporting` | `ALZ-11/campus-energy-optimization` | D0, D2, D8 |
| **Layer 1 罕見故障過採樣預警層** | `pv-smartgrid-smote-fault` | `milin-rao-deshmukh/Smart-Grid-Fault-Detection-and-Performance-Prediction-Supervised-ML-Project` | D0, D2, D4 |
| **Layer 2 多代理告警合理化層** | `pv-isa182-intelligent-alarms` | `aws-samples/sample-intelligent-alarms-agent` | D0, D1, D3 |
| **Layer 2 微電網告警與電壓控制層** | `pv-microgrid-alarm-mpc` | `oihika/Degradation-Aware-MPC-for-a-Freiburg-Renewable-District-Microgrid` | D2, D3, D5 |
| **Layer 2 光學與紅外線視覺對照層** | `pv-vision-defect-suite` | `hackingmaterials/pv-vision` (+ PVEL-AD / YOLOv9) | D3, D4, D6 |
| **Layer 3 數位品質工程與防呆層** | `quality-8d-engineering-skills` | `RBraga01/Quality-Engineering-Skills` | D1, D2, D4, D5, D7 |
| **Layer 3 合規評分與防幻覺審查層** | `skill-8d-report-analyzer` | `duding-engicool/skill-8d-report-analyzer` | D4, D7, D8 |
| **Layer 3 決策簡報與 DCF 估值層** | `solar-8d-diagnostic` | `davidyeh51/pv-8d-management-platform` | D0 ~ D8 全程 |
