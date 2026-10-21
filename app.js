/**
 * 進能服維運事業單位｜8D分析管理平台
 * 麥肯錫顧問風格簡報引擎 (Slide Deck Engine + ECharts Interactive Visualizations)
 */

(function () {
  "use strict";

  const STORAGE_KEY = "JNF_PV_8D_CASES_V2";
  const MCK_COLORS = {
    navyDark: "#082644",
    navy: "#0C3A63",
    navyMid: "#164E80",
    slate: "#475569",
    muted: "#94A3B8",
    line: "#CBD5E1",
    accent: "#D97706",
    accentDark: "#B45309"
  };

  let allCases = [];
  let currentCase = null;
  let currentSlideIdx = 0;
  let isDeckMode = true;
  const chartInstances = {};

  function loadCases() {
    const baseCases = Array.isArray(window.PV_8D_CASES_DATA) ? window.PV_8D_CASES_DATA : [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const customCases = JSON.parse(saved);
        if (Array.isArray(customCases) && customCases.length > 0) {
          allCases = [...baseCases, ...customCases];
          return;
        }
      }
    } catch (e) {
      console.warn("LocalStorage read skipped:", e);
    }
    allCases = [...baseCases];
  }

  function initCaseSelector() {
    const sel = document.getElementById("case-selector");
    if (!sel) return;
    sel.innerHTML = allCases
      .map(
        (c) =>
          `<option value="${c.id}">${c.code}｜${c.siteName} (${c.capacityKwp} kWp) — ${c.statusLabel}</option>`
      )
      .join("");
    if (currentCase) {
      sel.value = currentCase.id;
    }
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
    setText(
      "sum-payback-badge",
      `維修回收期：${c.paybackDays} 天 ｜ 20年 DCF 淨現值：NT$ ${(c.dcf20YrNpvNtd / 10000).toFixed(1)} 萬`
    );

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
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="cell-mono">${r[1]}</td>
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
        <div class="panel-soft" style="border-left: 4px solid ${idx === 0 ? MCK_COLORS.accent : MCK_COLORS.navy};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="font-size:15px; color:var(--ink);">${sc.title}</strong>
            <span class="accent-badge">${sc.metric}</span>
          </div>
          <p style="margin:0; font-size:13.5px; color:var(--slate);">${sc.desc}</p>
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
        <div class="kpi-box ${idx >= 1 ? "is-accent" : ""}">
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
          (r, idx, arr) => `
        <tr>
          <td class="${idx === arr.length - 1 ? "cell-accent" : "cell-key"}">${r[0]}</td>
          <td>${r[1]}</td>
          <td>${idx === arr.length - 1 ? `<strong>${r[2]}</strong>` : r[2]}</td>
        </tr>`
        )
        .join("");
    }

    const whyEscEl = document.getElementById("d4a-why-esc-body");
    if (whyEscEl) {
      whyEscEl.innerHTML = c.d4a.fiveWhyEscape
        .map(
          (r, idx, arr) => `
        <tr>
          <td class="${idx === arr.length - 1 ? "cell-accent" : "cell-key"}">${r[0]}</td>
          <td>${r[1]}</td>
          <td>${idx === arr.length - 1 ? `<strong>${r[2]}</strong>` : r[2]}</td>
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
          const isConfirmed = r[3].includes("確立") || r[3].includes("✅");
          return `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td>${r[1]}</td>
          <td>${r[2]}</td>
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
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td>${r[1]}</td>
          <td class="cell-accent">${r[2]}</td>
          <td>${r[3]}</td>
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
          (r) => `
        <tr>
          <td class="cell-key">${r[0]}</td>
          <td class="cell-mono" style="color:var(--muted);">${r[1]}</td>
          <td class="cell-accent">${r[2]}</td>
          <td class="cell-mono">${r[3]}</td>
          <td class="cell-key">${r[4]}</td>
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
          <td class="${idx >= 2 ? "cell-accent" : "cell-mono"}">${r[1]}</td>
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

    renderAllCharts(c);
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "";
  }

  // ==================== ECHARTS RENDERING (McKinsey 3-Color Palette) ====================
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

  function renderAllCharts(c) {
    if (!c || !c.charts) return;

    // 1. Slide 1: Executive Waterfall / Bar + PR Line
    const ch1 = getOrCreateChart("chart-exec-waterfall");
    if (ch1) {
      const wf = c.charts.execWaterfall;
      ch1.setOption({
        tooltip: { trigger: "axis" },
        legend: {
          data: ["電量分析 (kWh)", "PR 性能比 (%)"],
          bottom: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11 }
        },
        grid: { top: 28, left: 54, right: 48, bottom: 42 },
        xAxis: {
          type: "category",
          data: wf.categories,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11, interval: 0, rotate: 10 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: [
          {
            type: "value",
            name: "kWh",
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
            splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
          },
          {
            type: "value",
            name: "PR (%)",
            min: 50,
            max: 90,
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11, formatter: "{value}%" },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "電量分析 (kWh)",
            type: "bar",
            barWidth: "42%",
            data: wf.values.map((v) => ({
              value: Math.abs(v),
              itemStyle: {
                color: v < 0 ? MCK_COLORS.accent : MCK_COLORS.navy
              }
            })),
            label: {
              show: true,
              position: "top",
              fontSize: 11,
              fontFamily: "JetBrains Mono",
              color: MCK_COLORS.ink,
              formatter: (p) => {
                const orig = wf.values[p.dataIndex];
                return (orig < 0 ? "" : "") + orig.toLocaleString();
              }
            }
          },
          {
            name: "PR 性能比 (%)",
            type: "line",
            yAxisIndex: 1,
            data: wf.prLine,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: MCK_COLORS.accentDark, width: 2.5 },
            itemStyle: { color: MCK_COLORS.accentDark }
          }
        ]
      });
    }

    // 2. Slide 3: D2 P2P Step Degradation & Irradiance Decoupling
    const ch2 = getOrCreateChart("chart-d2-loss");
    if (ch2) {
      const d2 = c.charts.d2Timeline;
      ch2.setOption({
        tooltip: { trigger: "axis" },
        legend: {
          data: ["同儕發電比 (P2P Ratio)", "晴空日射量 (kWh/m²)"],
          bottom: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11 }
        },
        grid: { top: 28, left: 48, right: 48, bottom: 42 },
        xAxis: {
          type: "category",
          data: d2.dates,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: [
          {
            type: "value",
            name: "P2P Ratio",
            min: 0.5,
            max: 1.1,
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
            splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
          },
          {
            type: "value",
            name: "kWh/m²",
            min: 0,
            max: 8,
            axisLabel: { color: MCK_COLORS.muted, fontSize: 11 },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "同儕發電比 (P2P Ratio)",
            type: "line",
            step: "middle",
            data: d2.peerRatio,
            symbol: "circle",
            symbolSize: 7,
            lineStyle: { color: MCK_COLORS.accent, width: 3 },
            itemStyle: { color: MCK_COLORS.accent },
            markLine: {
              silent: true,
              data: [{ yAxis: 1.0, name: "同儕基準 1.00" }],
              lineStyle: { color: MCK_COLORS.navy, type: "dashed", width: 1.5 }
            }
          },
          {
            name: "晴空日射量 (kWh/m²)",
            type: "bar",
            yAxisIndex: 1,
            barWidth: "35%",
            data: d2.irradiance,
            itemStyle: { color: "rgba(12, 58, 99, 0.18)" }
          }
        ]
      });
    }

    // 3. Slide 4: D3 ISA-18.2 Alarm Rationalization Horizontal Bar
    const ch3 = getOrCreateChart("chart-d3-alarm");
    if (ch3) {
      const af = c.charts.d3AlarmFunnel;
      ch3.setOption({
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { top: 18, left: 165, right: 48, bottom: 24 },
        xAxis: {
          type: "value",
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: af.labels,
          axisLabel: { color: MCK_COLORS.ink, fontSize: 11.5, fontWeight: 600 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        series: [
          {
            type: "bar",
            barWidth: "48%",
            data: af.counts.map((v, idx) => ({
              value: v,
              itemStyle: {
                color:
                  idx === af.counts.length - 1
                    ? MCK_COLORS.accent
                    : idx === 0
                    ? MCK_COLORS.muted
                    : MCK_COLORS.navy
              }
            })),
            label: {
              show: true,
              position: "right",
              fontFamily: "JetBrains Mono",
              fontWeight: 700,
              color: MCK_COLORS.ink,
              formatter: "{c} 件"
            }
          }
        ]
      });
    }

    // 4. Slide 5: D4a UNSW High-Frequency Intraday Electrical Penetration
    const ch4 = getOrCreateChart("chart-d4-mppt");
    if (ch4) {
      const m = c.charts.d4Mppt;
      ch4.setOption({
        tooltip: { trigger: "axis" },
        legend: {
          data: ["正常同儕迴路出力", "Stage 1 接觸劣化期", "Stage 2 故障鎖死/斷路期", "系統端電壓 (V/kV)"],
          bottom: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11 }
        },
        grid: { top: 28, left: 48, right: 52, bottom: 42 },
        xAxis: {
          type: "category",
          data: m.hours,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: [
          {
            type: "value",
            name: "電流(A) / 功率(MW)",
            axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
            splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
          },
          {
            type: "value",
            name: "電壓",
            axisLabel: { color: MCK_COLORS.muted, fontSize: 11 },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "正常同儕迴路出力",
            type: "line",
            smooth: true,
            data: m.normalMpptCurrent,
            lineStyle: { color: MCK_COLORS.navy, width: 2.5 },
            itemStyle: { color: MCK_COLORS.navy }
          },
          {
            name: "Stage 1 接觸劣化期",
            type: "line",
            smooth: true,
            data: m.stage1Mppt1Current,
            lineStyle: { color: MCK_COLORS.muted, width: 2, type: "dashed" },
            itemStyle: { color: MCK_COLORS.muted }
          },
          {
            name: "Stage 2 故障鎖死/斷路期",
            type: "line",
            smooth: false,
            data: m.faultMppt1Current,
            lineStyle: { color: MCK_COLORS.accent, width: 3 },
            itemStyle: { color: MCK_COLORS.accent },
            areaStyle: { color: "rgba(217, 119, 6, 0.10)" }
          },
          {
            name: "系統端電壓 (V/kV)",
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            data: m.normalVoltage,
            lineStyle: { color: "#94A3B8", width: 1.5, type: "dotted" },
            itemStyle: { color: "#94A3B8" }
          }
        ]
      });
    }

    // 5. Slide 8: D6 P2P + HP Filter Long-Term Convergence
    const ch5 = getOrCreateChart("chart-d6-p2p");
    if (ch5) {
      const d6 = c.charts.d6Convergence;
      ch5.setOption({
        tooltip: { trigger: "axis" },
        legend: {
          data: ["日同儕發電比 (Raw P2P)", "HP 濾波長週期趨勢項 (HP Trend)"],
          bottom: 0,
          textStyle: { color: MCK_COLORS.slate, fontSize: 11 }
        },
        grid: { top: 28, left: 48, right: 24, bottom: 42 },
        xAxis: {
          type: "category",
          data: d6.days,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: {
          type: "value",
          min: 0.6,
          max: 1.06,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
        },
        series: [
          {
            name: "日同儕發電比 (Raw P2P)",
            type: "scatter",
            symbolSize: 8,
            data: d6.rawP2P,
            itemStyle: { color: MCK_COLORS.muted }
          },
          {
            name: "HP 濾波長週期趨勢項 (HP Trend)",
            type: "line",
            smooth: true,
            data: d6.hpTrend,
            lineStyle: { color: MCK_COLORS.navy, width: 3 },
            itemStyle: { color: MCK_COLORS.accent }
          }
        ]
      });
    }

    // 6. Slide 10: D8 20-Year DCF Cumulative Avoided Loss NPV
    const ch6 = getOrCreateChart("chart-d8-dcf");
    if (ch6) {
      const dcf = c.charts.d8Dcf;
      ch6.setOption({
        tooltip: { trigger: "axis", valueFormatter: (v) => `NT$ ${v} 萬` },
        grid: { top: 28, left: 52, right: 24, bottom: 32 },
        xAxis: {
          type: "category",
          data: dcf.years,
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          axisLine: { lineStyle: { color: MCK_COLORS.line } }
        },
        yAxis: {
          type: "value",
          name: "NT$ 萬元",
          axisLabel: { color: MCK_COLORS.slate, fontSize: 11 },
          splitLine: { lineStyle: { color: "#E2E8F0", type: "dashed" } }
        },
        series: [
          {
            name: "20年累積防損淨現值 (NPV)",
            type: "bar",
            barWidth: "52%",
            data: dcf.cumNpvWan.map((v, idx) => ({
              value: v,
              itemStyle: {
                color: idx === dcf.cumNpvWan.length - 1 ? MCK_COLORS.accent : MCK_COLORS.navy
              }
            })),
            label: {
              show: true,
              position: "top",
              fontSize: 10,
              fontFamily: "JetBrains Mono",
              color: MCK_COLORS.ink,
              formatter: (p) => (p.dataIndex % 3 === 0 || p.dataIndex === dcf.cumNpvWan.length - 1 ? p.value : "")
            }
          }
        ]
      });
    }
  }

  function resizeVisibleCharts() {
    setTimeout(() => {
      Object.values(chartInstances).forEach((ch) => {
        if (ch && typeof ch.resize === "function") {
          ch.resize();
        }
      });
    }, 60);
  }

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

  window.switchCase = function (caseId) {
    const found = allCases.find((c) => c.id === caseId);
    if (!found) return;
    currentCase = found;
    renderCaseSlides(currentCase);
    resizeVisibleCharts();
  };

  // ==================== MODALS & NEW CASE CREATION ====================
  window.openModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("open");
  };

  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("open");
  };

  window.createNewCase = function (ev) {
    ev.preventDefault();
    const code = document.getElementById("nc-code").value.trim();
    const siteName = document.getElementById("nc-site").value.trim();
    const kwp = parseFloat(document.getElementById("nc-kwp").value) || 1000;
    const equip = document.getElementById("nc-equip").value.trim();
    const lostKwh = parseFloat(document.getElementById("nc-lost-kwh").value) || 3000;
    const fit = parseFloat(document.getElementById("nc-fit").value) || 4.1835;
    const conclusion = document.getElementById("nc-conclusion").value.trim();
    const occRc = document.getElementById("nc-occ-rc").value.trim();
    const escRc = document.getElementById("nc-esc-rc").value.trim();

    const lostRev = Math.round(lostKwh * fit);
    const annualKwh = Math.round(lostKwh * 7.3);
    const annualNtd = Math.round(annualKwh * fit);
    const dcf20Yr = Math.round(annualNtd * 13.8);

    const template = JSON.parse(JSON.stringify(allCases[0]));
    template.id = code;
    template.code = code;
    template.siteName = siteName;
    template.capacityKwp = kwp;
    template.targetEquip = equip;
    template.statusLabel = "D4 根因驗證中";
    template.lostKwh = lostKwh;
    template.lostRevenueNtd = lostRev;
    template.annualLossKwh = annualKwh;
    template.annualLossNtd = annualNtd;
    template.dcf20YrNpvNtd = dcf20Yr;

    template.cover.tag = `8D PROBLEM SOLVING & UNSW SOLAR DIAGNOSTIC REPORT · ${code}`;
    template.cover.conclusionTitle = conclusion;
    template.cover.kpis[0].value = `${lostKwh.toLocaleString()} kWh`;
    template.cover.kpis[1].value = `NT$ ${annualNtd.toLocaleString()} /年`;
    template.cover.kpis[2].value = `NT$ ${(dcf20Yr / 10000).toFixed(1)} 萬`;
    template.cover.metaLeft[0][1] = `${siteName}（${kwp} kWp）`;
    template.cover.metaLeft[1][1] = equip;
    template.cover.metaRight[1][1] = occRc;
    template.cover.metaRight[2][1] = escRc;

    template.summary.conclusionTitle = conclusion;
    template.d4a.conclusionTitle = `雙軌根因實證：【發生根因】${occRc}；【流出根因】${escRc}`;
    template.d4a.fiveWhyOccurrence[4][2] = `【發生根因 Occurrence RC】${occRc}`;
    template.d4a.fiveWhyEscape[2][2] = `【流出根因 Escape RC】${escRc}`;

    allCases.push(template);
    try {
      const customOnly = allCases.slice(window.PV_8D_CASES_DATA.length);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch (e) {
      console.warn(e);
    }

    initCaseSelector();
    window.closeModal("modal-new-case");
    window.switchCase(template.id);
    window.goToSlide(0);
  };

  // ==================== KEYBOARD NAVIGATION & INIT ====================
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
    loadCases();
    currentCase = allCases[0];
    initCaseSelector();
    renderSkillsTables();
    renderCaseSlides(currentCase);
    window.goToSlide(0);
  });
})();
