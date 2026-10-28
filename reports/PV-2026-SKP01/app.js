/**
 * 進能服維運事業單位｜8D分析管理平台
 * 100% 綁定世堃塑膠麻豆廠 (PV-2026-SKP01) 26,496 筆 5 分鐘級遙測數據、92 天對帳表與 13 個月月報
 * 麥肯錫顧問風格簡報引擎 (McKinsey Pyramid Principle + Interactive ECharts + Leaflet Map)
 */

(function () {
  "use strict";

  const MCK_COLORS = {
    navyDark: "#082644",
    navy: "#0C3A63",
    navyMid: "#164E80",
    slate: "#334155",
    muted: "#64748B",
    lightGray: "#94A3B8",
    line: "#CBD5E1",
    accent: "#D97706",
    accentDark: "#B45309"
  };

  let currentCase = null;
  let currentSlideIdx = 0;
  let isDeckMode = true;
  let isOwnerMode = false;
  const chartInstances = {};
  let leafletMapInstance = null;

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "";
  }

  function renderSkillsTables() {
    const skills = window.PV_8D_SKILLS_REGISTRY || [];
    const slideBody = document.getElementById("skills-slide-body");
    if (slideBody) {
      slideBody.innerHTML = skills
        .map(
          (s) => `
        <tr>
          <td class="cell-mono">${s.id}</td>
          <td class="cell-key">${s.repo}</td>
          <td class="cell-accent">${s.stages.join(" · ")}</td>
          <td><strong>${s.name}：</strong>${s.conclusion}</td>
        </tr>`
        )
        .join("");
    }

    const modalBody = document.getElementById("modal-skills-tbody");
    if (modalBody) {
      modalBody.innerHTML = skills
        .map(
          (s) => `
        <tr>
          <td>
            <div class="cell-key">${s.name}</div>
            <div class="cell-mono" style="font-size:11.5px; color:var(--accent-dark);">${s.id}</div>
          </td>
          <td>${s.layer}</td>
          <td>
            <div class="cell-mono" style="font-size:11.5px;">${s.localPath}</div>
            <div style="font-size:12px; color:var(--muted); margin-top:2px;">核心檔案：${s.files}</div>
          </td>
          <td>${s.metrics}</td>
        </tr>`
        )
        .join("");
    }
  }

  function renderCaseSlides(c) {
    if (!c) return;

    // --- Slide 0: Cover ---
    setText("cover-tag", c.cover.tag);
    setText("cover-conclusion-title", c.cover.conclusionTitle);
    setText("cover-subtitle", c.cover.subtitle);

    const coverKpiEl = document.getElementById("cover-kpi-grid");
    if (coverKpiEl) {
      coverKpiEl.innerHTML = c.cover.kpis
        .map(
          (k) => `
        <div class="kpi-box ${k.isAccent ? "is-accent" : ""}">
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-val">${k.value}</div>
          <div class="kpi-note">${k.note}</div>
        </div>`
        )
        .join("");
    }

    const metaLeftEl = document.getElementById("cover-meta-left");
    if (metaLeftEl) {
      metaLeftEl.innerHTML = c.cover.metaLeft
        .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`)
        .join("");
    }
    const metaRightEl = document.getElementById("cover-meta-right");
    if (metaRightEl) {
      metaRightEl.innerHTML = c.cover.metaRight
        .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`)
        .join("");
    }

    // --- Slide 1: Executive Summary ---
    setText("sum-tag", c.summary.tag);
    setText("sum-conclusion-title", c.summary.conclusionTitle);

    const sumKpiEl = document.getElementById("sum-kpi-grid");
    if (sumKpiEl) {
      sumKpiEl.innerHTML = c.summary.kpis
        .map(
          (k) => `
        <div class="kpi-box ${k.isAccent ? "is-accent" : ""}">
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-val">${k.value}</div>
          <div class="kpi-note">${k.sub}</div>
        </div>`
        )
        .join("");
    }

    const sumMatrixEl = document.getElementById("sum-matrix-body");
    if (sumMatrixEl) {
      sumMatrixEl.innerHTML = c.summary.matrixRows
        .map(
          (r, idx) => `
        <tr>
          <td class="${idx < 2 ? "cell-accent" : "cell-mono"}">${r[0]}</td>
          <td class="cell-key">${r[1]}</td>
          <td>${r[2]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 2: D0~D1 ---
    setText("d0d1-tag", c.d0d1.tag);
    setText("d0d1-conclusion-title", c.d0d1.conclusionTitle);

    const symCardsEl = document.getElementById("d0d1-symptom-cards");
    if (symCardsEl) {
      symCardsEl.innerHTML = c.d0d1.symptomCards
        .map(
          (sc, idx) => `
        <div class="panel-soft" style="border-left: 4px solid ${idx === 0 ? MCK_COLORS.navy : MCK_COLORS.accent};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; gap:8px;">
            <strong style="font-size:14.5px; color:var(--ink);">${sc.title}</strong>
            <span class="accent-badge">${sc.metric}</span>
          </div>
          <p style="margin:0; font-size:13px; color:var(--slate); line-height:1.6;">${sc.desc}</p>
        </div>`
        )
        .join("");
    }

    const raciEl = document.getElementById("d0d1-raci-body");
    if (raciEl) {
      raciEl.innerHTML = c.d0d1.raciTable
        .map(
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td>${r[1]}</td>
          <td>${r[2]}</td>
          <td class="cell-mono">${r[3]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 3: D2 ---
    setText("d2-tag", c.d2.tag);
    setText("d2-conclusion-title", c.d2.conclusionTitle);

    const d2StageEl = document.getElementById("d2-stage-body");
    if (d2StageEl) {
      d2StageEl.innerHTML = c.d2.stageComparison
        .map(
          (r, idx) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="cell-mono">${r[1]}</td>
          <td class="${idx > 0 ? "cell-accent" : "cell-mono"}">${r[2]}</td>
          <td class="${idx > 0 ? "cell-accent" : "cell-mono"}">${r[3]}</td>
          <td>${r[4]}</td>
        </tr>`
        )
        .join("");
    }

    const d2IsEl = document.getElementById("d2-isisnot-body");
    if (d2IsEl) {
      d2IsEl.innerHTML = c.d2.isIsNot
        .map(
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td><strong>${r[1]}</strong></td>
          <td style="color:var(--muted);">${r[2]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 4: D3 ---
    setText("d3-tag", c.d3.tag);
    setText("d3-conclusion-title", c.d3.conclusionTitle);

    const d3BatchEl = document.getElementById("d3-batch-kpis");
    if (d3BatchEl) {
      d3BatchEl.innerHTML = c.d3.batchStats
        .map(
          (b, idx) => `
        <div class="kpi-box ${idx === 1 ? "is-accent" : ""}">
          <div class="kpi-label">${b.label}</div>
          <div class="kpi-val">${b.value}</div>
          <div class="kpi-note">${b.note}</div>
        </div>`
        )
        .join("");
    }

    const d3IcaEl = document.getElementById("d3-ica-body");
    if (d3IcaEl) {
      d3IcaEl.innerHTML = c.d3.containmentActions
        .map(
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td>${r[1]}</td>
          <td class="cell-accent">${r[2]}</td>
          <td class="cell-mono">${r[3]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 5: D4a ---
    setText("d4a-tag", c.d4a.tag);
    setText("d4a-conclusion-title", c.d4a.conclusionTitle);

    const whyOccEl = document.getElementById("d4a-why-occ-body");
    if (whyOccEl) {
      whyOccEl.innerHTML = c.d4a.fiveWhyOccurrence
        .map(
          (r, idx) => `
        <tr>
          <td class="${idx === 1 || idx === 3 ? "cell-accent" : "cell-key"}">${r[0]}</td>
          <td class="cell-mono">${r[1]}</td>
          <td>${r[2]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 6: D4b ---
    setText("d4b-tag", c.d4b.tag);
    setText("d4b-conclusion-title", c.d4b.conclusionTitle);

    const hypoEl = document.getElementById("d4b-hypo-body");
    if (hypoEl) {
      hypoEl.innerHTML = c.d4b.hypotheses
        .map((r) => {
          const isConfirmed = r[3].includes("確診") || r[3].includes("✅");
          return `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td>${r[1]}</td>
          <td>${ isConfirmed ? `<strong>${r[2]}</strong>` : r[2] }</td>
          <td class="${isConfirmed ? "cell-accent" : "cell-mono"}">${r[3]}</td>
        </tr>`;
        })
        .join("");
    }

    const twvnsEl = document.getElementById("d4b-twvns-chain");
    if (twvnsEl) {
      twvnsEl.innerHTML = c.d4b.graphPath
        .map(
          (g, idx) => `
        <div class="twvns-node ${idx === 2 || idx === 4 ? "is-accent" : ""}">
          <div class="twvns-code">${g.code}</div>
          <div class="twvns-name">${g.name}</div>
          <div class="twvns-detail">${g.detail}</div>
        </div>`
        )
        .join("");
    }

    // --- Slide 7: D5 ---
    setText("d5-tag", c.d5.tag);
    setText("d5-conclusion-title", c.d5.conclusionTitle);

    const pcaEl = document.getElementById("d5-pca-body");
    if (pcaEl) {
      pcaEl.innerHTML = c.d5.pcaTable
        .map(
          (r, idx) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td>${r[1]}</td>
          <td class="${idx < 2 ? "cell-accent" : "cell-mono"}">${r[2]}</td>
          <td class="cell-key">${r[3]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 8: D6 ---
    setText("d6-tag", c.d6.tag);
    setText("d6-conclusion-title", c.d6.conclusionTitle);
    setText("d6-longterm-note", c.d6.longTermNote);

    const d6MetricsEl = document.getElementById("d6-metrics-body");
    if (d6MetricsEl) {
      d6MetricsEl.innerHTML = c.d6.validationMetrics
        .map(
          (r, idx) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="cell-mono" style="color:var(--muted);">${r[1]}</td>
          <td>${r[2]}</td>
          <td class="cell-accent">${r[3]}</td>
          <td class="${idx === 3 ? "cell-accent" : "cell-mono"}">${r[4]}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 9: D7 ---
    setText("d7-tag", c.d7.tag);
    setText("d7-conclusion-title", c.d7.conclusionTitle);

    const d7DocsEl = document.getElementById("d7-docs-body");
    if (d7DocsEl) {
      d7DocsEl.innerHTML = c.d7.docRevisions
        .map(
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="cell-mono">${r[1]}</td>
          <td class="cell-accent">${r[2]}</td>
          <td>${r[3]}</td>
        </tr>`
        )
        .join("");
    }

    const d7YokotenEl = document.getElementById("d7-yokoten-body");
    if (d7YokotenEl) {
      d7YokotenEl.innerHTML = c.d7.yokotenSites
        .map(
          (y) => `
        <tr>
          <td class="cell-key">${y.site}</td>
          <td class="cell-mono">${y.capacity}</td>
          <td class="cell-accent">${y.status}</td>
          <td>${y.finding}</td>
        </tr>`
        )
        .join("");
    }

    // --- Slide 10: D8 ---
    setText("d8-tag", c.d8.tag);
    setText("d8-conclusion-title", c.d8.conclusionTitle);

    const d8FinEl = document.getElementById("d8-fin-body");
    if (d8FinEl) {
      d8FinEl.innerHTML = c.d8.financialSummary
        .map(
          (r, idx) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="${idx >= 1 ? "cell-accent" : "cell-mono"}">${r[1]}</td>
          <td>${r[2]}</td>
        </tr>`
        )
        .join("");
    }

    const d8RubricEl = document.getElementById("d8-rubric-body");
    if (d8RubricEl) {
      d8RubricEl.innerHTML = c.d8.rubricScores
        .map(
          (r, idx) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="${idx === 3 ? "cell-accent" : "cell-mono"}">${r[1]}</td>
          <td>${r[2]}</td>
        </tr>`
        )
        .join("");
    }

    initAllVisualizations();
  }

  // ==================== ECHARTS & LEAFLET INITIALIZATION ====================
  function getOrCreateChart(domId) {
    const dom = document.getElementById(domId);
    if (!dom || typeof echarts === "undefined") return null;
    if (chartInstances[domId]) {
      chartInstances[domId].dispose();
    }
    const chart = echarts.init(dom);
    chartInstances[domId] = chart;
    return chart;
  }

  function initAllVisualizations() {
    const monthlyData = window.SKP01_MONTHLY_DATA || [];

    // 1. Slide 3: 13-Month History Chart (Actual vs 80%PR Expected vs Lost kWh vs PR%)
    const chMonthly = getOrCreateChart("chart-d2-monthly");
    if (chMonthly && monthlyData.length > 0) {
      const months = monthlyData.map((m) => m.month);
      const actual = monthlyData.map((m) => m.actual_kwh);
      const expected = monthlyData.map((m) => m.expected_kwh);
      const lost = monthlyData.map((m) => m.lost_kwh);
      const prs = monthlyData.map((m) => m.pr);

      chMonthly.setOption({
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        legend: {
          data: ["實際發電 (kWh)", "80%PR應發 (kWh)", "防逆流棄光損失 (kWh)", "實測 PR值 (%)"],
          top: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11.5 }
        },
        grid: { top: 34, left: 56, right: 52, bottom: 32 },
        xAxis: {
          type: "category",
          data: months,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: [
          {
            type: "value",
            name: "度數 (kWh)",
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
            splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
          },
          {
            type: "value",
            name: "PR (%)",
            min: 0,
            max: 100,
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11, formatter: "{value}%" },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "實際發電 (kWh)",
            type: "bar",
            data: actual,
            itemStyle: { color: MCK_COLORS.navy }
          },
          {
            name: "防逆流棄光損失 (kWh)",
            type: "bar",
            data: lost,
            itemStyle: { color: MCK_COLORS.accent }
          },
          {
            name: "80%PR應發 (kWh)",
            type: "line",
            data: expected,
            itemStyle: { color: MCK_COLORS.muted },
            lineStyle: { type: "dashed", width: 2 }
          },
          {
            name: "實測 PR值 (%)",
            type: "line",
            yAxisIndex: 1,
            data: prs,
            symbol: "circle",
            symbolSize: 6,
            itemStyle: { color: MCK_COLORS.accentDark },
            lineStyle: { width: 2.5, color: MCK_COLORS.accentDark }
          }
        ]
      });
    }

    // 2. Slide 3: 92-Day Daily Status Distribution Doughnut Chart
    const chPie = getOrCreateChart("chart-d2-daily-pie");
    if (chPie) {
      chPie.setOption({
        tooltip: { trigger: "item", formatter: "{b}: {c} 天 ({d}%)" },
        legend: {
          orient: "vertical",
          left: 0,
          top: "middle",
          textStyle: { color: MCK_COLORS.slate, fontSize: 11.5 }
        },
        series: [
          {
            name: "92天運轉狀態",
            type: "pie",
            radius: ["45%", "76%"],
            center: ["66%", "50%"],
            itemStyle: { borderColor: "#FFFFFF", borderWidth: 2 },
            label: {
              show: true,
              position: "inside",
              formatter: "{c}天",
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              fontWeight: 700,
              color: "#FFFFFF"
            },
            data: [
              { value: 29, name: "正常全載 (≥90%)", itemStyle: { color: MCK_COLORS.navy } },
              { value: 24, name: "部分降載 (50-90%)", itemStyle: { color: "#64748B" } },
              { value: 30, name: "嚴重限電 (15-50%)", itemStyle: { color: MCK_COLORS.accent } },
              { value: 9, name: "週末/停工歸零 (<15%)", itemStyle: { color: MCK_COLORS.accentDark } }
            ]
          }
        ]
      });
    }

    // 3. Slide 5: 5-Minute High-Frequency Intraday Profile Viewer
    window.updateProfileChart();

    // 4. Slide 8: D6 Phased Roadmap Chart
    const chRoadmap = getOrCreateChart("chart-d6-roadmap");
    if (chRoadmap) {
      chRoadmap.setOption({
        tooltip: { trigger: "axis" },
        legend: {
          data: ["全場有效 PR (%)", "防逆流棄光損失率 (%)"],
          bottom: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11 }
        },
        grid: { top: 28, left: 48, right: 48, bottom: 42 },
        xAxis: {
          type: "category",
          data: ["現況基線", "Phase 1 (M1 死區微調)", "Phase 2 (M2-3 製程移峰)", "Phase 3 (M4-6 儲能併網)", "Phase 4 (M7+ 動態驗收)"],
          axisLabel: { color: MCK_COLORS.slate, fontSize: 10.5, interval: 0, rotate: 10 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11, formatter: "{value}%" },
          splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
        },
        series: [
          {
            name: "全場有效 PR (%)",
            type: "bar",
            barWidth: "38%",
            data: [48.6, 53.5, 64.0, 78.5, 81.5],
            itemStyle: { color: MCK_COLORS.navy },
            label: {
              show: true,
              position: "top",
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              color: MCK_COLORS.navy,
              formatter: "{c}%"
            }
          },
          {
            name: "防逆流棄光損失率 (%)",
            type: "line",
            data: [55.7, 50.2, 36.5, 8.0, 4.2],
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: MCK_COLORS.accent, width: 3 },
            itemStyle: { color: MCK_COLORS.accent }
          }
        ]
      });
    }

    // 5. Slide 10: D8 20-Year DCF Cumulative Net Cash Flow Chart (200kW/500kWh BESS)
    const chDcf = getOrCreateChart("chart-d8-dcf");
    if (chDcf) {
      const years = Array.from({ length: 20 }, (_, i) => `Y${i + 1}`);
      const baseline = Array(20).fill(0);
      let cumBess = -6.5;
      const bessCum = [];
      for (let y = 1; y <= 20; y++) {
        const net = 1.35 * Math.pow(0.992, y - 1) - 0.15;
        cumBess += net;
        bessCum.push(Math.round(cumBess * 100) / 100);
      }

      chDcf.setOption({
        tooltip: { trigger: "axis", valueFormatter: (v) => `NT$ ${v} 百萬元` },
        legend: {
          data: ["現況維持棄光 (NT$ 0)", "導入 200kW/500kWh 儲能累計淨收益 (百萬NT$)"],
          top: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11 }
        },
        grid: { top: 34, left: 52, right: 28, bottom: 32 },
        xAxis: {
          type: "category",
          data: years,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: {
          type: "value",
          name: "百萬 NT$",
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
        },
        series: [
          {
            name: "現況維持棄光 (NT$ 0)",
            type: "line",
            data: baseline,
            lineStyle: { type: "dashed", color: MCK_COLORS.lightGray, width: 2 },
            itemStyle: { color: MCK_COLORS.lightGray }
          },
          {
            name: "導入 200kW/500kWh 儲能累計淨收益 (百萬NT$)",
            type: "line",
            data: bessCum,
            lineStyle: { color: MCK_COLORS.navy, width: 3 },
            itemStyle: { color: MCK_COLORS.navy },
            areaStyle: { color: "rgba(12, 58, 99, 0.10)" },
            markPoint: {
              data: [
                {
                  name: "回本點 (4.8年)",
                  coord: ["Y5", bessCum[4]],
                  value: "4.8年回本",
                  itemStyle: { color: MCK_COLORS.accent }
                },
                {
                  name: "20年累計淨收益",
                  coord: ["Y20", bessCum[19]],
                  value: "+1,580萬",
                  itemStyle: { color: MCK_COLORS.navy }
                }
              ]
            }
          }
        ]
      });
    }

    // 6. Slide 4: Leaflet Map
    const mapEl = document.getElementById("plantMap");
    if (mapEl && typeof L !== "undefined" && !leafletMapInstance) {
      leafletMapInstance = L.map("plantMap").setView([23.1812, 120.252], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
      }).addTo(leafletMapInstance);
      const marker = L.marker([23.1812, 120.252]).addTo(leafletMapInstance);
      marker
        .bindPopup(
          "<b>世堃塑膠麻豆廠 582.06 kWp</b><br>自發自用屋頂型光伏電站<br>坐標：23.1812°N, 120.2520°E"
        )
        .openPopup();
    }
  }

  window.updateProfileChart = function () {
    const profilesData = window.SKP01_PROFILES_DATA || {};
    const select = document.getElementById("profileDateSelect");
    const dateKey = select ? select.value : "2026-07-29";
    const prof = profilesData[dateKey];
    if (!prof) return;

    const chProf = getOrCreateChart("chart-d4-profile");
    if (!chProf) return;

    chProf.setOption(
      {
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        legend: {
          data: ["日射量 (W/m²)", "AC 發電功率 (kW)", "DC 工作電壓 (V)", "電力控制比率 (%)"],
          top: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11.5 }
        },
        grid: { top: 34, left: 56, right: 64, bottom: 32 },
        xAxis: {
          type: "category",
          data: prof.times,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11, interval: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: [
          {
            type: "value",
            name: "功率 (kW) / 日射 (W/m²)",
            position: "left",
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
            splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
          },
          {
            type: "value",
            name: "DC電壓 (V) / 控制比率 (%)",
            min: 0,
            max: 1000,
            position: "right",
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "AC 發電功率 (kW)",
            type: "line",
            data: prof.ac_power,
            itemStyle: { color: MCK_COLORS.navy },
            lineStyle: { width: 2.8, color: MCK_COLORS.navy },
            areaStyle: { color: "rgba(12, 58, 99, 0.14)" }
          },
          {
            name: "DC 工作電壓 (V)",
            yAxisIndex: 1,
            type: "line",
            data: prof.dc_voltage,
            itemStyle: { color: MCK_COLORS.accent },
            lineStyle: { width: 2.4, color: MCK_COLORS.accent }
          },
          {
            name: "日射量 (W/m²)",
            type: "line",
            data: prof.irradiance,
            itemStyle: { color: MCK_COLORS.lightGray },
            lineStyle: { width: 1.8, type: "dashed", color: MCK_COLORS.lightGray }
          },
          {
            name: "電力控制比率 (%)",
            yAxisIndex: 1,
            type: "line",
            data: prof.ctrl_ratio,
            itemStyle: { color: "#334155" },
            lineStyle: { width: 2, type: "dotted", color: "#334155" }
          }
        ]
      },
      true
    );
  };

  function resizeVisibleCharts() {
    setTimeout(() => {
      Object.values(chartInstances).forEach((ch) => {
        if (ch && typeof ch.resize === "function") {
          ch.resize();
        }
      });
      if (leafletMapInstance) {
        leafletMapInstance.invalidateSize();
      }
    }, 80);
  }

  // ==================== 92-DAY RAW DATA MODAL FUNCTIONS ====================
  function renderRawTable() {
    const dailyData = window.SKP01_DAILY_DATA || [];
    const tbody = document.getElementById("rawDataTableBody");
    if (!tbody || !dailyData.length) return;

    tbody.innerHTML = dailyData
      .map((r) => {
        const isSevere = r.status.includes("嚴重") || r.status.includes("歸零");
        return `
      <tr>
        <td class="cell-mono">${r.date}</td>
        <td>${r.weekday}</td>
        <td class="cell-mono">${r.actual_kwh.toLocaleString()}</td>
        <td class="cell-mono">${r.expected_kwh.toLocaleString()}</td>
        <td class="${isSevere ? "cell-accent" : "cell-mono"}">${r.lost_kwh.toLocaleString()}</td>
        <td class="cell-mono">${r.irr_sum}</td>
        <td class="cell-mono">${r.ey}</td>
        <td class="cell-mono">${r.pr}%</td>
        <td class="cell-mono">${r.ctrl_mean}%</td>
        <td class="cell-mono">${r.ac_max}</td>
        <td class="cell-mono">${r.v_max}</td>
        <td class="${isSevere ? "cell-accent" : "cell-key"}">${r.status}</td>
      </tr>`;
      })
      .join("");
  }

  window.filterRawTable = function () {
    const q = (document.getElementById("rawSearchInput").value || "").toLowerCase();
    const statusFilter = document.getElementById("rawStatusFilter").value;
    const rows = document.querySelectorAll("#rawDataTableBody tr");
    rows.forEach((tr) => {
      const text = tr.innerText.toLowerCase();
      const matchesQ = text.includes(q);
      const matchesStatus = statusFilter === "ALL" || text.includes(statusFilter.toLowerCase());
      tr.style.display = matchesQ && matchesStatus ? "" : "none";
    });
  };

  window.exportRawCsv = function () {
    const dailyData = window.SKP01_DAILY_DATA || [];
    let csv =
      "\uFEFF日期,星期,實際發電(kWh),80%PR應發(kWh),棄光損失度數(kWh),日射量(kWh/m2),等價時數Ey,實測PR(%),平均控制比率(%),AC峰值(kW),DC峰值電壓(V),運轉判定\n";
    dailyData.forEach((r) => {
      csv += `${r.date},${r.weekday},${r.actual_kwh},${r.expected_kwh},${r.lost_kwh},${r.irr_sum},${r.ey},${r.pr},${r.ctrl_mean},${r.ac_max},${r.v_max},${r.status}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "世堃塑膠麻豆廠_SKP01_92天發電對帳數據.csv";
    link.click();
  };

  window.copyRawTable = function () {
    const dailyData = window.SKP01_DAILY_DATA || [];
    let txt =
      "日期\t星期\t實際發電(kWh)\t80%PR應發(kWh)\t棄光損失(kWh)\t日射量\tEy\tPR%\t控制比率\tAC峰值\tDC峰值V\t判定\n";
    dailyData.forEach((r) => {
      txt += `${r.date}\t${r.weekday}\t${r.actual_kwh}\t${r.expected_kwh}\t${r.lost_kwh}\t${r.irr_sum}\t${r.ey}\t${r.pr}%\t${r.ctrl_mean}%\t${r.ac_max}\t${r.v_max}\t${r.status}\n`;
    });
    navigator.clipboard.writeText(txt).then(() => alert("✅ 92 天對帳表格數據已複製至剪貼簿！"));
  };

  window.copyDataRequirementsText = function () {
    const el = document.getElementById("reqTextContent");
    if (!el) return;
    navigator.clipboard
      .writeText(el.innerText)
      .then(() => alert("✅ 下一步深層分析 5 大資料索取清單已複製至剪貼簿，可直接發送給業主與廠務！"));
  };

  // ==================== SLIDE DECK NAVIGATION ====================
  window.goToSlide = function (idx) {
    const slides = document.querySelectorAll(".slide-page");
    const tabs = document.querySelectorAll("#slide-tabs .navtab:not(.navtab-action):not(.navtab-accent)");
    if (!slides.length) return;

    currentSlideIdx = Math.max(0, Math.min(idx, slides.length - 1));

    slides.forEach((sec, i) => {
      sec.classList.toggle("active-slide", i === currentSlideIdx);
    });
    tabs.forEach((btn, i) => {
      btn.classList.toggle("active", i === currentSlideIdx);
    });

    const counter = document.getElementById("deck-counter");
    if (counter) {
      counter.textContent = `Slide ${currentSlideIdx + 1} / ${slides.length}`;
    }

    const prevBtn = document.getElementById("btn-prev-slide");
    const nextBtn = document.getElementById("btn-next-slide");
    if (prevBtn) prevBtn.disabled = currentSlideIdx === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIdx === slides.length - 1;

    const bar = document.getElementById("deck-progress-bar");
    if (bar) {
      bar.style.width = `${((currentSlideIdx + 1) / slides.length) * 100}%`;
    }

    if (!isDeckMode) {
      slides[currentSlideIdx].scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    resizeVisibleCharts();
  };

  window.changeSlide = function (delta) {
    window.goToSlide(currentSlideIdx + delta);
  };

  window.toggleViewMode = function () {
    isDeckMode = !isDeckMode;
    document.body.classList.toggle("deck-mode", isDeckMode);
    document.body.classList.toggle("full-doc-mode", !isDeckMode);
    const btn = document.getElementById("btn-view-mode");
    if (btn) {
      btn.textContent = isDeckMode ? "📄 完整報告模式" : "🎞️ 簡報翻頁模式";
    }
    resizeVisibleCharts();
  };

  window.toggleReportMode = function () {
    isOwnerMode = !isOwnerMode;
    const btn = document.getElementById("btn-report-mode");
    const heroLabel = document.getElementById("heroModeLabel");
    if (isOwnerMode) {
      if (btn) btn.textContent = "💼 模式：投資決策版";
      if (heroLabel) heroLabel.textContent = "PV-2026-SKP01・世堃塑膠麻豆廠 582.06kWp（投資決策版・儲能資產賦能）";
    } else {
      if (btn) btn.textContent = "🔄 切換投資決策版";
      if (heroLabel) heroLabel.textContent = "PV-2026-SKP01・世堃塑膠麻豆廠 582.06kWp（內部維運版・對策分析中）";
    }
  };

  window.openModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("open");
    if (id === "modal-raw-data") {
      renderRawTable();
    }
  };

  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("open");
  };

  document.addEventListener("keydown", (e) => {
    if (!isDeckMode) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (document.querySelector(".modal-backdrop.open")) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach((m) => m.classList.remove("open"));
      }
      return;
    }
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      window.changeSlide(1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      window.changeSlide(-1);
    }
  });

  window.addEventListener("resize", resizeVisibleCharts);

  document.addEventListener("DOMContentLoaded", () => {
    const cases = window.PV_8D_CASES_DATA || [];
    currentCase = cases[0];
    renderSkillsTables();
    renderCaseSlides(currentCase);
    renderRawTable();
    window.goToSlide(0);
  });
})();
