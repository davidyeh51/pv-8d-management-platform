// =============================================================================
// 進金生能源 6692 ｜ 光伏運維 8D 智慧管理與三層式 AI Agent 閉環平台
// 核心互動邏輯引擎 (app.js)
// =============================================================================

(function () {
  let allCases = [];
  let selectedCaseNo = "8D-2026-DA01";
  let currentTab = "cockpit";
  let activeGraphCaseNo = "8D-2026-DA01";
  let activeGraphOperator = "twvns"; // 'twvns' | 'upward' | 'leftward'

  // Layer 1 模擬器預設情境庫
  const LAYER1_SCENARIOS = {
    cloud_false_alarm: {
      title: "情境 A：外部短暫雲層遮擋 ＋ 氣象站 °F/°C 溫標跳變（假性告警攔截示範）",
      rawInput: "SCADA 告警洪流：13:15 INV-01~INV-08 功率瞬降 42%，組串電壓 V_mp 微幅下滑 2.1%，環境溫度讀數突跳至 89.6 度，連續觸發 28 條低效告警。",
      cleanedResult: "【ALZ-11 數據審計】修正氣象站 89.6°F → 32.0°C 溫標錯置；【sprince0031 I-V-G Random Forest 分類】偵測到太陽輻照度 G 由 940 W/m² 同步驟降至 510 W/m²，V_mp 維持在溫度修正後正常區間（無內部線間短路 LL Fault 特徵）。",
      alarmBefore: 28,
      alarmAfter: 0,
      suppressionPct: 100.0,
      spv: 1,
      ap: "L",
      lotoRequired: false,
      trigger8D: false,
      verdictBadge: "🟢 攔截假性告警（免派工 / 免立項）",
      verdictColor: "emerald",
      verdictReason: "符合 D0 品質審核閘門規範：成功透過 pvlib 晴空模型與 I-V-G 非線性分類器解耦『短暫雲層遮擋（Passing Cloud Shading）』與『溫標跳變』，避免傳統運維盲目派工退件缺失！",
      d1Team: null,
      d2Draft: null
    },
    dc_arc_mc4: {
      title: "情境 B：水上浮體 MC4 跨接頭接觸電阻過高熱熔與 680V DC 間歇接地拉弧（S_PV = 5 危害級）",
      rawInput: "SCADA 與巡檢通報：台中大安龜殼段 INV-13 MPPT-02 於晴空 G=965 W/m² 下，電壓 685V 正常，但電流僅 19.0A（同儕 INV-10 為 28.5A，少 1/3），伴隨絕緣阻抗 R_iso=0.42MΩ 警報及每 10 分鐘 14 條附屬連帶告警；無人機 IR 發現第 5 串跨橋 MC4 接頭達 86.4°C (ΔT=+38.2°C)。",
      cleanedResult: "【UNSW-Solar P2P & DC50 診斷】排除氣象與感測器干擾，確認 MPPT-02 呈現 3 併變 2 併單串斷路特徵，且高壓直流拉弧風險極高；【ISA-18.2 告警降噪】過濾 76.4% 附屬連帶誤報，鎖定單一物理根因事件。",
      alarmBefore: 59,
      alarmAfter: 1,
      suppressionPct: 76.4,
      spv: 5,
      ap: "H",
      lotoRequired: true,
      trigger8D: true,
      verdictBadge: "🔴 強制鎖定工單升級 8D 立項（S_PV = 5 嚴重危害級 ＋ 立即啟動 LOTO 隔離）",
      verdictColor: "rose",
      verdictReason: "觸及光伏 FMEA 最高嚴重度 S_PV=5（直流電弧起火與絕緣崩潰風險）：系統已強制發出現場 LOTO 上鎖掛牌隔離指令，並透過多目標 AI 演算法匹配 6 人跨職能團隊與生成 D2 5W2H / Is-Is Not 初稿。",
      d1Team: {
        champion: "葉大衛 (維運管理部協理 / 資源調度 Sponsor)",
        leader: "姜興中 (資深電氣可靠度工程師 / 8D Leader)",
        members: ["洪稜凱 (SCADA 數據分析師)", "黃昱超 (高壓與 FLIR 熱像工程師)", "陳志豪 (連接器/逆變器 OEM FAE)", "林雅婷 (資產管理與索賠專員)"]
      },
      d2Draft: {
        what_is: "INV-13 MPPT-02 第 5 串 MC4 正極接頭高接觸電阻 (42mΩ) 熱熔斷路與對地漏電",
        what_is_not: "非逆變器內部 IGBT 損壞、非雲層遮擋、非電網過壓",
        where_is: "水上浮台 B 區 INV-13 直流箱第 5 迴路跨橋轉接處",
        where_is_not: "非陸域變電站 AC 側",
        quantified_loss: "影響 1 串 (22 片模組)，同儕比值降至 0.76 (<0.80 P1 門檻)，累積損失 42.8 MWh，年化營收風險 NT$ 21.8 萬"
      }
    },
    orphan_inv_igbt: {
      title: "情境 C：鋼鐵廠屋頂孤兒逆變器油霧堵塞致 IGBT 過溫降額與 THD 6.8% 諧波跳機（S_PV = 4 高度風險）",
      rawInput: "SCADA 告警：高雄遠東鋼鐵 INV-08 (110kW，原 OEM 已退出市場) 連續 14 天於 11:00–14:30 發生功率降額，IGBT 溫升斜率達 1.9°C/min（最高 94°C），隨即伴隨 PLL 鎖相失步、共模漏電流 >300mA 與 AC THD=6.8% 跳脫，10 分鐘內湧入 35 條連鎖告警。",
      cleanedResult: "【FCA-B-FSA 特徵映射 & ALZ-11 審計】確認正午輻照穩定，非氣象干擾；識別出『IGBT 熱阻激增 + LCL 濾波電容熱衰減』複合故障特徵 (FS-INV-04)；【ISA-18.2 降噪】將 35 條連鎖告警聚合為 1 筆高風險 8D 工單。",
      alarmBefore: 35,
      alarmAfter: 1,
      suppressionPct: 74.0,
      spv: 4,
      ap: "H",
      lotoRequired: true,
      trigger8D: true,
      verdictBadge: "🟠 自動鎖定工單升級 8D 立項（S_PV = 4 高度風險 ＋ 啟動孤兒機種 RAG 手冊檢索）",
      verdictColor: "amber",
      verdictReason: "觸及光伏 FMEA S_PV=4（關鍵逆變器加速老化、散熱降額與諧波超標）：系統自動標記該機型為『OEM 退場孤兒機種』，同步喚醒 Layer 2 雙模態知識庫檢索替代風扇/電容規格。",
      d1Team: {
        champion: "葉大衛 (維運管理部協理)",
        leader: "姜興中 (資深電氣可靠度工程師)",
        members: ["洪稜凱 (FCA-B-FSA 特徵分析師)", "黃昱超 (電力品質與熱像檢測師)", "林志強 (第三方逆變器板級維修 SME)"]
      },
      d2Draft: {
        what_is: "INV-08 散熱鰭片受軋鋼廠油霧鐵粉堵塞致 IGBT 過溫降額，加速 LCL 濾波電容容值衰減引發 THD 6.8% 跳脫",
        what_is_not: "非直流組串斷路，非台電電網外部故障",
        where_is: "B 棟軋鋼廠房排氣百葉窗下風處 4 公尺之 INV-08 (含同排 INV-07/09)",
        where_is_not: "非 A 棟行政大樓屋頂逆變器",
        quantified_loss: "影響 220kW 容量，同儕比值降至 0.812，累計損失 28.4 MWh，年化損失 NT$ 14.5 萬"
      }
    },
    pyranometer_soiling: {
      title: "情境 D：滯洪池汛期泥霧遮蔽 ＋ 日照計結露破產失真（表觀 PR 109% 虛高解耦，S_PV = 4）",
      rawInput: "月報異常稽核：高雄岡山五甲尾滯洪池 (4,999.2kWp) 颱風汛期後 SCADA 報表顯示全場 PR 高達 109.4%，但財務電錶結算度數較鄰近同儕案場短少 14.8% (118.5 MWh)。",
      cleanedResult: "【ALZ-11 & UNSW-Solar 22-ClearSky / 40-HP 濾波解耦】比對 pvlib Ineichen 晴空輻照包絡線，發現現場 POA 日照計因球罩泥膜與內部結露導致讀數偏低 27%（分母失真造就假高 PR）；還原真實日照後，HP 濾波趨勢項證實全場受滯洪池鈣化泥膜覆蓋致真實 PR 跌至 71.4%！",
      alarmBefore: 312,
      alarmAfter: 1,
      suppressionPct: 81.2,
      spv: 4,
      ap: "H",
      lotoRequired: false,
      trigger8D: true,
      verdictBadge: "🟠 自動鎖定工單升級 8D 立項（S_PV = 4 感測器破產掩蓋大規模光學衰減）",
      verdictColor: "amber",
      verdictReason: "成功攔截『日照計分母失真掩蓋真實發電損失』之重大監控逃逸（Escape）事件！自動切換虛擬晴空基準並立項 8D。",
      d1Team: {
        champion: "葉大衛 (維運管理部協理)",
        leader: "洪稜凱 (首席運維數據科學家)",
        members: ["姜興中 (感測器校準工程師)", "黃昱超 (無人機光學與機械清洗評估師)", "張家銘 (SCADA 通訊工程師)"]
      },
      d2Draft: {
        what_is: "POA 日照計結露衰減 27% 掩蓋汛期後全場 10° 低傾角模組鈣化泥膜遮蔽衰退 (-14.8%)",
        what_is_not: "非逆變器故障，非電網限電",
        where_is: "五甲尾滯洪池南側迎風面浮台陣列與 #1 氣象蒐集箱",
        where_is_not: "非北側岸上變電站",
        quantified_loss: "全場 4,999.2kWp 短少 118.5 MWh，財務損失 NT$ 56.88 萬"
      }
    }
  };

  // 初始化入口
  async function initApp() {
    await window.PV8DSupabase.initClient();
    allCases = await window.PV8DSupabase.loadCases();
    if (allCases.length > 0 && !allCases.find(c => c.case_no === selectedCaseNo)) {
      selectedCaseNo = allCases[0].case_no;
    }
    renderAll();
    if (window.lucide) window.lucide.createIcons();
  }

  function renderAll() {
    renderExecutiveCockpit();
    renderLayer1Simulator("dc_arc_mc4");
    renderLayer2KnowledgeGraph();
    renderLayer3GovernanceAudit();
    renderReferenceTables();
    if (window.lucide) window.lucide.createIcons();
  }

  // 切換主分頁
  window.switchMainTab = function (tabId) {
    currentTab = tabId;
    const tabs = ["cockpit", "layer1", "layer2", "layer3", "reference"];
    tabs.forEach(t => {
      const view = document.getElementById(`view-${t}`);
      const btn = document.getElementById(`nav-tab-${t}`);
      if (view) view.classList.toggle("hidden", t !== tabId);
      if (btn) {
        if (t === tabId) {
          btn.className = "nav-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-900 text-white shadow-md transition";
        } else {
          btn.className = "nav-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-600 hover:bg-slate-200/80 transition";
        }
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide) window.lucide.createIcons();
  };

  // ===========================================================================
  // TAB 1: 結論主體 — 三層式自動化閉環工程系統戰情中樞
  // ===========================================================================
  function renderExecutiveCockpit() {
    const layersContainer = document.getElementById("cockpit-layers-grid");
    if (layersContainer && window.PV_8D_SEED_DATA) {
      const layers = window.PV_8D_SEED_DATA.architectureLayers;
      const layerStyles = [
        { border: "border-sky-500", bg: "from-sky-950 to-slate-900", badge: "bg-sky-500/20 text-sky-300 border-sky-400/40", btn: "bg-sky-600 hover:bg-sky-500", tab: "layer1", icon: "cpu" },
        { border: "border-indigo-500", bg: "from-indigo-950 to-slate-900", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40", btn: "bg-indigo-600 hover:bg-indigo-500", tab: "layer2", icon: "git-Fork" },
        { border: "border-emerald-500", bg: "from-emerald-950 to-slate-900", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", btn: "bg-emerald-600 hover:bg-emerald-500", tab: "layer3", icon: "shield-check" }
      ];

      layersContainer.innerHTML = layers.map((l, idx) => {
        const st = layerStyles[idx];
        return `
          <div class="rounded-2xl border-t-4 ${st.border} bg-gradient-to-b ${st.bg} text-white p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="px-2.5 py-1 rounded-full text-xs font-extrabold border ${st.badge}">${l.code}</span>
                <div class="flex flex-wrap gap-1 justify-end">
                  ${l.empoweredDisciplines.map(d => `<span class="px-2 py-0.5 rounded bg-white/10 text-[11px] font-semibold text-slate-200">${d}</span>`).join("")}
                </div>
              </div>
              <h3 class="text-lg font-extrabold tracking-tight text-white mb-1">${l.name}</h3>
              <p class="text-xs font-semibold text-amber-300 mb-3">${l.tagline}</p>
              <ul class="space-y-2 text-xs text-slate-300 leading-relaxed mb-4">
                ${l.corePipelines.map(p => `
                  <li class="flex items-start gap-2">
                    <span class="text-amber-400 font-bold mt-0.5">▸</span>
                    <span>${p}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
            <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-emerald-300">${l.kpiHighlight}</span>
              <button onclick="switchMainTab('${st.tab}')" class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-white ${st.btn} transition shadow flex items-center gap-1">
                <span>進入工作台</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `;
      }).join("");
    }

    renderCasesList();
  }

  window.renderCasesList = function () {
    const container = document.getElementById("cockpit-cases-container");
    if (!container) return;

    const searchVal = (document.getElementById("case-search-input")?.value || "").trim().toLowerCase();
    const layerFilter = document.getElementById("case-layer-filter")?.value || "all";
    const spvFilter = document.getElementById("case-spv-filter")?.value || "all";

    const filtered = allCases.filter(c => {
      if (layerFilter !== "all" && String(c.active_layer) !== layerFilter) return false;
      if (spvFilter !== "all" && String(c.severity_spv) !== spvFilter) return false;
      if (searchVal) {
        const hay = `${c.case_no} ${c.site_name} ${c.sld_node} ${c.fault_signature} ${c.d4_occurrence_rc} ${c.d4_escape_rc}`.toLowerCase();
        if (!hay.includes(searchVal)) return false;
      }
      return true;
    });

    // 更新統計 KPI
    const totalMwh = allCases.reduce((acc, c) => acc + Number(c.energy_loss_mwh || 0), 0);
    const totalNtd = allCases.reduce((acc, c) => acc + Number(c.financial_claim_ntd || 0), 0);
    const avgScore = allCases.length ? Math.round(allCases.reduce((acc, c) => acc + Number(c.audit_score || 0), 0) / allCases.length) : 0;

    const elTotalCases = document.getElementById("kpi-total-cases");
    const elTotalMwh = document.getElementById("kpi-total-mwh");
    const elTotalNtd = document.getElementById("kpi-total-ntd");
    const elAvgScore = document.getElementById("kpi-avg-score");
    if (elTotalCases) elTotalCases.textContent = `${allCases.length} 案`;
    if (elTotalMwh) elTotalMwh.textContent = `${totalMwh.toFixed(1)} MWh`;
    if (elTotalNtd) elTotalNtd.textContent = `NT$ ${(totalNtd / 10000).toFixed(1)} 萬`;
    if (elAvgScore) elAvgScore.textContent = `${avgScore} / 100 分`;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">查無符合篩選條件之 8D 診斷案件。</div>`;
      return;
    }

    container.innerHTML = filtered.map(c => {
      const spvBadge = c.severity_spv === 5
        ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">S_PV = 5 (嚴重危害 / LOTO)</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">S_PV = ${c.severity_spv} (中高風險 / AP:${c.ap_level})</span>`;

      const stageBadge = c.d8_closed
        ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">D8 已閉環歸檔 (復發率 0%)</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-300">目前階段：${c.current_discipline} (Layer ${c.active_layer})</span>`;

      const docsCount = c.d7_docs_updated
        ? Object.values(c.d7_docs_updated).filter(x => x && x.updated).length
        : 0;

      return `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs font-black px-2.5 py-1 rounded bg-slate-900 text-amber-400">${c.case_no}</span>
                ${spvBadge}
              </div>
              ${stageBadge}
            </div>

            <h4 class="text-base font-extrabold text-slate-900 mb-1 flex items-center justify-between">
              <span>${c.site_name}</span>
              <span class="text-xs font-semibold text-slate-500">${c.capacity_kwp} kWp</span>
            </h4>

            <div class="text-xs font-mono text-indigo-700 bg-indigo-50/80 border border-indigo-100 rounded-lg px-3 py-1.5 mb-3">
              <strong>SLD 拓撲節點：</strong>${c.sld_node}
            </div>

            <div class="text-xs text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-3 space-y-1.5">
              <div><span class="font-bold text-slate-900">⚡ 可觀測故障特徵 (FS)：</span>${c.fault_signature}</div>
              <div><span class="font-bold text-rose-700">🔍 D4 物理發生根因 (Occurrence RC)：</span>${c.d4_occurrence_rc}</div>
              <div><span class="font-bold text-amber-700">🛡️ D4 監控流出根因 (Escape RC)：</span>${c.d4_escape_rc}</div>
            </div>
          </div>

          <div>
            <div class="grid grid-cols-4 gap-2 text-center bg-slate-100/80 rounded-xl p-2.5 mb-3 text-xs">
              <div>
                <div class="text-[11px] text-slate-500">量化損失</div>
                <div class="font-extrabold text-slate-900">${c.energy_loss_mwh} MWh</div>
              </div>
              <div>
                <div class="text-[11px] text-slate-500">告警降噪率</div>
                <div class="font-extrabold text-sky-700">-${c.alarm_suppressed_pct}%</div>
              </div>
              <div>
                <div class="text-[11px] text-slate-500">D7 四大文件</div>
                <div class="font-extrabold ${docsCount === 4 ? 'text-emerald-700' : 'text-amber-700'}">${docsCount} / 4 升版</div>
              </div>
              <div>
                <div class="text-[11px] text-slate-500">TRACE 評分</div>
                <div class="font-extrabold text-indigo-700">${c.audit_score} 分</div>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div class="flex flex-wrap gap-1.5">
                <button onclick="openCaseDetailModal('${c.case_no}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 transition flex items-center gap-1">
                  <i data-lucide="file-check-2" class="w-3.5 h-3.5"></i>
                  <span>開啟 D0–D8 完整報告</span>
                </button>
                <button onclick="inspectCaseInLayer2('${c.case_no}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition">
                  圖譜溯源 (Layer 2)
                </button>
                <button onclick="inspectCaseInLayer3('${c.case_no}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition">
                  合規審查 (Layer 3)
                </button>
              </div>
              ${c.external_report_url ? `
                <a href="${c.external_report_url}" target="_blank" rel="noopener" class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <span>獨立戰情頁</span>
                  <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                </a>
              ` : ""}
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  };

  window.inspectCaseInLayer2 = function (caseNo) {
    activeGraphCaseNo = caseNo;
    renderLayer2KnowledgeGraph();
    switchMainTab("layer2");
  };

  window.inspectCaseInLayer3 = function (caseNo) {
    selectedCaseNo = caseNo;
    renderLayer3GovernanceAudit();
    switchMainTab("layer3");
  };

  // ===========================================================================
  // TAB 2: 【底層 Layer 1】邊緣與 SCADA 數據預處理 ＆ D0-D2 自動立項引擎
  // ===========================================================================
  window.renderLayer1Simulator = function (scenarioKey) {
    const sc = LAYER1_SCENARIOS[scenarioKey] || LAYER1_SCENARIOS.dc_arc_mc4;
    const container = document.getElementById("layer1-sim-output");
    if (!container) return;

    // 更新按鈕高亮
    document.querySelectorAll(".sim-scenario-btn").forEach(btn => {
      const active = btn.getAttribute("data-scenario") === scenarioKey;
      btn.className = active
        ? "sim-scenario-btn text-left p-3 rounded-xl border-2 border-sky-600 bg-sky-50/90 text-slate-900 font-bold text-xs shadow-sm transition"
        : "sim-scenario-btn text-left p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition";
    });

    const colorMap = {
      emerald: "bg-emerald-50 border-emerald-300 text-emerald-900",
      rose: "bg-rose-50 border-rose-300 text-rose-900",
      amber: "bg-amber-50 border-amber-300 text-amber-900"
    };

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Step 1 & 2: 原始訊號 vs 清洗解耦後 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-700">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">1. 原始 SCADA 告警串流與氣象輸入</span>
              <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-mono">Raw Alarms: ${sc.alarmBefore} 條/10min</span>
            </div>
            <p class="text-xs leading-relaxed text-slate-300 font-mono">${sc.rawInput}</p>
          </div>

          <div class="bg-sky-950 text-slate-100 rounded-xl p-4 border border-sky-700">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-sky-300 uppercase tracking-wider">2. ALZ-11 審計 + sprince0031 I-V-G + ISA-18.2 降噪輸出</span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-mono">降噪剔除率: -${sc.suppressionPct}% (剩 ${sc.alarmAfter} 條)</span>
            </div>
            <p class="text-xs leading-relaxed text-sky-100">${sc.cleanedResult}</p>
          </div>
        </div>

        <!-- Step 3: D0 觸發判定閘門 -->
        <div class="rounded-xl p-4 border-2 ${colorMap[sc.verdictColor]}">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="text-sm font-extrabold">${sc.verdictBadge}</div>
            <div class="flex items-center gap-2 text-xs font-bold">
              <span class="px-2.5 py-1 rounded bg-white/80 border border-current">光伏 FMEA 嚴重度 S_PV = ${sc.spv} / 5</span>
              <span class="px-2.5 py-1 rounded bg-white/80 border border-current">AIAG-VDA AP = ${sc.ap}</span>
              <span class="px-2.5 py-1 rounded ${sc.lotoRequired ? 'bg-rose-600 text-white' : 'bg-white/80'}">
                ${sc.lotoRequired ? '⚡ 強制執行 LOTO 上鎖掛牌隔離' : '免 LOTO 急停'}
              </span>
            </div>
          </div>
          <p class="text-xs leading-relaxed">${sc.verdictReason}</p>
        </div>

        ${sc.trigger8D ? `
          <!-- Step 4: 自動生成之 D1 跨職能團隊 & D2 5W2H / Is-Is Not 初稿 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded bg-blue-900 text-white">D1 初稿</span>
                  <span>多目標 AI 演算法匹配之跨職能團隊 (Kamble 2026)</span>
                </h4>
                <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">✓ 通過 FQI 標準序列與禁單人掛名檢核</span>
              </div>
              <div class="text-xs space-y-1.5 text-slate-700">
                <div><strong class="text-slate-900">👑 專案贊助人 (Champion)：</strong>${sc.d1Team.champion}</div>
                <div><strong class="text-slate-900">🧭 8D 小組長 (Team Leader)：</strong>${sc.d1Team.leader}</div>
                <div><strong class="text-slate-900">🛠️ 跨領域專家成員 (SMEs)：</strong>
                  <ul class="list-disc list-inside pl-1 mt-1 space-y-0.5 text-slate-600">
                    ${sc.d1Team.members.map(m => `<li>${m}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded bg-blue-900 text-white">D2 初稿</span>
                  <span>量化 5W2H 與 Is / Is Not 邊界分析矩陣</span>
                </h4>
                <span class="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">✓ 具客觀證據與量化損失</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs mb-2">
                <div class="p-2 rounded bg-emerald-50/70 border border-emerald-200">
                  <div class="font-bold text-emerald-900">【是什麼 Is (What/Where)】</div>
                  <div class="text-slate-700 mt-0.5">${sc.d2Draft.what_is} ＠ ${sc.d2Draft.where_is}</div>
                </div>
                <div class="p-2 rounded bg-rose-50/70 border border-rose-200">
                  <div class="font-bold text-rose-900">【不是什麼 Is Not (排除邊界)】</div>
                  <div class="text-slate-700 mt-0.5">${sc.d2Draft.what_is_not} ； ${sc.d2Draft.where_is_not}</div>
                </div>
              </div>
              <div class="text-xs p-2 rounded bg-amber-50 border border-amber-200 text-amber-900">
                <strong>📊 量化規模 (How Many)：</strong>${sc.d2Draft.quantified_loss}
              </div>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  };

  // ===========================================================================
  // TAB 3: 【中層 Layer 2】雙模態 8D 知識庫 ＆ 圖譜拓撲根因推論台
  // ===========================================================================
  window.selectGraphCase = function (caseNo) {
    activeGraphCaseNo = caseNo;
    renderLayer2KnowledgeGraph();
  };

  window.setGraphOperator = function (op) {
    activeGraphOperator = op;
    renderLayer2KnowledgeGraph();
  };

  function renderLayer2KnowledgeGraph() {
    const c = allCases.find(x => x.case_no === activeGraphCaseNo) || allCases[0];
    if (!c) return;

    // 案件選擇器
    const caseSelectEl = document.getElementById("layer2-case-select");
    if (caseSelectEl) {
      caseSelectEl.innerHTML = allCases.map(item =>
        `<option value="${item.case_no}" ${item.case_no === c.case_no ? "selected" : ""}>${item.case_no} ｜ ${item.site_name}</option>`
      ).join("");
    }

    // 算子說明
    const opExplainMap = {
      twvns: {
        title: "TWVNS 基於拓撲之加權變鄰域搜尋啟發式演算法 (CIRCA / KGroot 2026)",
        desc: "數學證明『根因傳播路徑推論屬於 NP-hard 問題』。系統結合時序指標矩陣與 SLD 單線圖能量流（Flow of Energy），逆向標定出從『逆變器端被捕獲之表面警報』追溯至『上游直流配電側/感測器物理發生根因』與『監控流出根因』的完整傳播鏈路。"
      },
      upward: {
        title: "⇑ 向上擴展算子 (Upward Expansion — RCInvestigator)",
        desc: "沿電站知識本體階層向上收集父節點線索（組串 String → 直流箱 Combiner → 逆變器 Inverter → 子方陣 Sub-Array），實現根因泛化並自動鎖定 D3 同批次設備（Batch Localization）100% 紅外線普查隔離範圍。"
      },
      leftward: {
        title: "⇐ 向左水平擴展算子 (Leftward Expansion — 同儕類比推理 Analogical Reasoning)",
        desc: "在同級兄弟實體（Sibling Entities，即同一批次、同一微氣象區之相鄰逆變器與 MPPT 通道）間執行 UNSW P2P 同儕比對，精確剝離環境共模干擾與單機硬體退化。"
      }
    };
    const opInfo = opExplainMap[activeGraphOperator] || opExplainMap.twvns;

    const canvas = document.getElementById("layer2-graph-canvas");
    if (canvas) {
      canvas.innerHTML = `
        <div class="bg-slate-900 rounded-2xl p-5 text-white border border-indigo-500/40 shadow-inner">
          <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-700">
            <div>
              <span class="text-xs font-mono text-indigo-300">${c.case_no} 知識圖譜五階實體關聯邊 (Neo4j + Milvus CA-RAG)</span>
              <h4 class="text-base font-extrabold text-white mt-0.5">${opInfo.title}</h4>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              ⚡ 檢索耗時：0.42 秒 (較傳統人工 300 分鐘提速 300 倍+)
            </span>
          </div>

          <p class="text-xs text-slate-300 mb-5 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
            ${opInfo.desc}
          </p>

          <!-- 五階拓撲節點流程圖 -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            <!-- Node 1: FS -->
            <div class="bg-gradient-to-b from-sky-900/80 to-slate-800 p-3.5 rounded-xl border border-sky-400/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[11px] font-bold text-sky-300 mb-1">
                  <span>STEP 1 ｜ 故障特徵 (FS)</span>
                  <span class="font-mono">FCA-B-FSA</span>
                </div>
                <div class="text-xs font-bold text-white mb-1">可觀測電氣/熱學特徵</div>
                <p class="text-[11px] text-slate-200 leading-relaxed">${c.fault_signature}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[10px] text-sky-300 font-mono">
                Caught at Inverter / SCADA
              </div>
            </div>

            <!-- Node 2: SLD Node -->
            <div class="bg-gradient-to-b from-indigo-900/80 to-slate-800 p-3.5 rounded-xl border border-indigo-400/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[11px] font-bold text-indigo-300 mb-1">
                  <span>STEP 2 ｜ 單線圖節點</span>
                  <span class="font-mono">SLD Node</span>
                </div>
                <div class="text-xs font-bold text-white mb-1">跨設備拓撲逆向定位</div>
                <p class="text-[11px] text-slate-200 leading-relaxed font-mono">${c.sld_node}</p>
                ${activeGraphOperator === "upward" ? `
                  <div class="mt-2 p-1.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] text-amber-200">
                    ⇑ 向上泛化：已鎖定同批次組件執行 D3 100% IR 普查
                  </div>
                ` : ""}
                ${activeGraphOperator === "leftward" ? `
                  <div class="mt-2 p-1.5 rounded bg-sky-500/20 border border-sky-400/40 text-[10px] text-sky-200">
                    ⇐ 水平類比：已比對同區健康標竿機台 Ey 比值 (${c.d6_validation?.before_ratio || 0.78})
                  </div>
                ` : ""}
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[10px] text-indigo-300 font-mono">
                TWVNS Path Verified
              </div>
            </div>

            <!-- Node 3: Occurrence RC -->
            <div class="bg-gradient-to-b from-rose-950/90 to-slate-800 p-3.5 rounded-xl border border-rose-400/60 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[11px] font-bold text-rose-300 mb-1">
                  <span>STEP 3A ｜ 物理發生根因</span>
                  <span class="font-mono">Occurrence RC</span>
                </div>
                <div class="text-xs font-bold text-white mb-1">為何物理/技術失效？</div>
                <p class="text-[11px] text-slate-200 leading-relaxed">${c.d4_occurrence_rc}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[10px] text-rose-300 font-mono">
                強制雙根因維度 #1
              </div>
            </div>

            <!-- Node 4: Escape RC -->
            <div class="bg-gradient-to-b from-amber-950/90 to-slate-800 p-3.5 rounded-xl border border-amber-400/60 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                  <span>STEP 3B ｜ 監控流出根因</span>
                  <span class="font-mono">Escape RC</span>
                </div>
                <div class="text-xs font-bold text-white mb-1">為何巡檢/SCADA 未攔截？</div>
                <p class="text-[11px] text-slate-200 leading-relaxed">${c.d4_escape_rc}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[10px] text-amber-300 font-mono">
                強制雙根因維度 #2
              </div>
            </div>

            <!-- Node 5: PCA & Citations -->
            <div class="bg-gradient-to-b from-emerald-950/90 to-slate-800 p-3.5 rounded-xl border border-emerald-400/60 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[11px] font-bold text-emerald-300 mb-1">
                  <span>STEP 4 ｜ 永久對策 (PCA)</span>
                  <span class="font-mono">Cited RAG</span>
                </div>
                <div class="text-xs font-bold text-white mb-1">專家驗證庫綁定對策</div>
                <ul class="text-[11px] text-slate-200 space-y-1 leading-relaxed">
                  ${(c.d5_pca || []).map(p => `<li>• ${p.action}</li>`).join("")}
                </ul>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[10px] text-emerald-300 font-mono">
                uptrain RAG_WITH_CITATION ✓
              </div>
            </div>
          </div>

          <!-- 引文核驗區塊 -->
          <div class="mt-4 pt-4 border-t border-slate-700/80">
            <div class="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
              <span>📚 uptrain-ai / rag_with_citation.ipynb 強制專家知識庫引文核驗 (Expert-Validated KB Boundary)</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              ${(c.d4_citations || []).map(cit => `
                <div class="bg-slate-800/90 border border-slate-600 rounded-xl p-3 text-xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-mono font-bold text-emerald-400">[${cit.refId}] ${cit.source}</span>
                    <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px]">Cosine Sim: ${cit.similarity}</span>
                  </div>
                  <p class="text-slate-300 italic">「${cit.quote}」</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;
    }

    // 渲染邏輯章節切塊庫清單
    renderKnowledgeChunksList();
  }

  window.renderKnowledgeChunksList = function () {
    const listEl = document.getElementById("layer2-chunks-list");
    if (!listEl || !window.PV_8D_SEED_DATA) return;
    const q = (document.getElementById("kb-search-input")?.value || "").trim().toLowerCase();
    const chunks = window.PV_8D_SEED_DATA.knowledgeChunks.filter(ck => {
      if (!q) return true;
      return `${ck.chunk_code} ${ck.source_doc} ${ck.section_hierarchy} ${ck.fault_signature} ${ck.occurrence_rc} ${ck.recommended_pca}`.toLowerCase().includes(q);
    });

    listEl.innerHTML = chunks.map(ck => `
      <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-300 transition">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-indigo-900 text-white font-mono text-xs font-bold">${ck.chunk_code}</span>
            <span class="text-xs font-bold text-slate-800">${ck.source_doc}</span>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ✓ 專家驗證知識庫邊界 ｜ ${ck.citation_ref}
          </span>
        </div>
        <div class="text-[11px] font-mono text-indigo-700 bg-indigo-50/70 px-2.5 py-1 rounded mb-2">
          📂 Gemini 2.5 Pro section_map.json 邏輯章節路徑：${ck.section_hierarchy}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-700">
          <div class="p-2 rounded bg-slate-50 border border-slate-100">
            <strong class="text-slate-900 block mb-0.5">⚡ 故障特徵 (FS)：</strong>${ck.fault_signature}
          </div>
          <div class="p-2 rounded bg-rose-50/50 border border-rose-100">
            <strong class="text-rose-900 block mb-0.5">🔍 雙根因映射 (Occurrence & Escape)：</strong>
            發生：${ck.occurrence_rc}<br>流出：${ck.escape_rc}
          </div>
          <div class="p-2 rounded bg-emerald-50/50 border border-emerald-100">
            <strong class="text-emerald-900 block mb-0.5">🛠️ 綁定永久對策 (PCA)：</strong>${ck.recommended_pca}
          </div>
        </div>
      </div>
    `).join("");
  };

  // 測試零幻覺邊界攔截器
  window.testHallucinationGuard = function (mode) {
    const box = document.getElementById("hallucination-guard-result");
    if (!box) return;
    if (mode === "valid") {
      box.className = "mt-3 p-4 rounded-xl border-2 border-emerald-400 bg-emerald-50 text-emerald-950 text-xs space-y-1.5";
      box.innerHTML = `
        <div class="font-extrabold text-sm flex items-center justify-between">
          <span>✅ 通過 uptrain RAG_WITH_CITATION 零幻覺引文閘門 (Accepted Within Expert-Validated KB)</span>
          <span class="font-mono px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">MCC: 0.94 ｜ Cosine: 0.96</span>
        </div>
        <p><strong>檢索查詢：</strong>「晴空下 MPPT 電壓正常但電流少 1/3，且伴隨絕緣阻抗間歇告警」</p>
        <p><strong>生成結論（附強制引文）：</strong>依據 <code>[SEC-DC-019 / CIT-UNSW-DC50 / CIT-NREL-2024-P14]</code>，確診為上游組串開路或跨接 MC4 接頭微動腐蝕高阻熱熔；流出根因為 SCADA 未配置同儕支路電流偏移 (>12%) 預警規則。</p>
      `;
    } else {
      box.className = "mt-3 p-4 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-950 text-xs space-y-1.5";
      box.innerHTML = `
        <div class="font-extrabold text-sm flex items-center justify-between">
          <span>🚫 觸發 Belu et al. (2026) & Foxley FQI 零幻覺邊界攔截！（Rejected Outside Expert KB）</span>
          <span class="font-mono px-2 py-0.5 rounded bg-rose-200 text-rose-900">Error Mode: UNGROUNDED_SPECULATION</span>
        </div>
        <p><strong>測試輸入（自由生成無根據推論）：</strong>「INV-08 跳機可能是因為太陽黑子磁暴引起逆變器量子隧穿效應，建議維運人員加強心靈教育訓練並每週重啟一次。」</p>
        <p><strong>攔截原因：</strong>1. 超出經領域專家驗證之封閉知識庫（Expert-Validated Knowledge Base）邊界，無任何 <code>section_map.json</code> 物理引文支撐；2. 違反 <code>RBraga01 /8d-coach</code> 驗證優先邏輯（將對策歸咎於加強人員意識與單純 Reset 治標）。系統已強制拒絕寫入 D4/D5！</p>
      `;
    }
  };

  // ===========================================================================
  // TAB 4: 【頂層 Layer 3】Agent Skill 合規審查 ＆ 三大治理鐵律閉環工作台
  // ===========================================================================
  window.selectAuditCase = function (caseNo) {
    selectedCaseNo = caseNo;
    renderLayer3GovernanceAudit();
  };

  window.toggleStage1Confirmation = async function (checked) {
    const c = allCases.find(x => x.case_no === selectedCaseNo);
    if (!c) return;
    c.stage1_human_confirmed = checked;
    await window.PV8DSupabase.saveCase(c);
    renderLayer3GovernanceAudit();
  };

  window.toggleD7DocItem = async function (docKey, checked) {
    const c = allCases.find(x => x.case_no === selectedCaseNo);
    if (!c || !c.d7_docs_updated || !c.d7_docs_updated[docKey]) return;
    c.d7_docs_updated[docKey].updated = checked;
    if (checked && c.d7_docs_updated[docKey].newVer.includes("待")) {
      c.d7_docs_updated[docKey].newVer = "v2026.10 (已簽核升版)";
    }
    // 重新計算分數與閉環狀態
    const allDocsUpdated = Object.values(c.d7_docs_updated).every(d => d.updated);
    c.d8_closed = allDocsUpdated && c.stage1_human_confirmed;
    c.current_discipline = c.d8_closed ? "D8" : "D7";
    c.audit_score = calculate8DScore(c);
    await window.PV8DSupabase.saveCase(c);
    renderLayer3GovernanceAudit();
    renderCasesList();
  };

  function calculate8DScore(c) {
    // duding-engicool/skill-8d-report-analyzer 100分制權重：
    // D1(10%) + D2(15%) + D3(15%) + D4(30%) + D5(15%) + D6(10%) + D7/D8(5%)
    let score = 0;
    if (c.d1_team && c.d1_team.champion && (c.d1_team.members || []).length >= 2) score += 10;
    if (c.d2_5w2h_is_not && c.d2_5w2h_is_not.what_is && c.d2_5w2h_is_not.what_is_not) score += 15;
    if (c.d3_containment && c.d3_containment.loto_action) score += 15;
    if (c.d4_occurrence_rc && c.d4_escape_rc && (c.d4_five_why || []).length >= 5) score += 30;
    if ((c.d5_pca || []).length >= 2) score += 15;
    if (c.d6_validation && c.d6_validation.after_ratio >= 0.90) score += 10;
    else if (c.d6_validation) score += 7;
    const docsUpdatedCount = c.d7_docs_updated ? Object.values(c.d7_docs_updated).filter(d => d.updated).length : 0;
    score += Math.round((docsUpdatedCount / 4) * 5);
    return score;
  }

  // 敷衍根因攔截壓力測試 (/8d-coach & /rca-facilitator)
  window.runRcaGateTest = function (testType) {
    const resEl = document.getElementById("layer3-rca-test-result");
    if (!resEl) return;
    if (testType === "human_error") {
      resEl.className = "mt-3 p-4 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-950 text-xs space-y-1.5";
      resEl.innerHTML = `
        <div class="font-extrabold text-sm text-rose-800">🚨 治理鐵律二攔截退件！（/8d-coach & skill-8d-report-analyzer 判定：D4 不合格 0/30 分）</div>
        <p><strong>受測根因表述：</strong>「本次 MC4 接頭燒毀是因為外包維運技術員施工粗心疏忽未壓緊，對策為扣款並要求員工下次注意、加強人員教育訓練。」</p>
        <p><strong>退件缺失診斷：</strong>
          <br>1. <strong>違反「禁止歸咎人為疏失（No Human Error as Root Cause）」鐵律</strong>：未追問為何治具與檢驗制度允許未壓緊之接頭通過（止步於第 2 層表面症狀 Symptomatic Cause）。
          <br>2. <strong>缺乏雙根因（Missing Escape Root Cause）</strong>：完全未解釋為何長達 3 個月的單串斷路未觸發 SCADA 支路電流失衡告警。
          <br>3. <strong>D5 對策空泛</strong>：「加強教育訓練/提升意識」屬於無效軟性口號，必須改為「鎖定 Stäubli 認證料號 + 2.5 N·m 定扭力治具防呆 + SCADA P2P >12% 偏移自動派工」。
        </p>
      `;
    } else if (testType === "copy_paste_d7") {
      resEl.className = "mt-3 p-4 rounded-xl border-2 border-amber-500 bg-amber-50 text-amber-950 text-xs space-y-1.5";
      resEl.innerHTML = `
        <div class="font-extrabold text-sm text-amber-900">⚠️ 治理鐵律三攔截退件！（/control-plan-builder 判定：D7 預防再發未閉環）</div>
        <p><strong>受測 D7 表述：</strong>「已將故障的 INV-13 第 5 串 MC4 接頭換新並復電，發電恢復正常，故予以結案。」</p>
        <p><strong>退件缺失診斷：</strong>
          <br>1. <strong>犯下「將 D5/D6 單點修復直接複製貼上至 D7」之典型弊病</strong>！
          <br>2. <strong>未執行橫向展開（Yokoten）與四大工程文件升版</strong>：未更新場站 PFMEA（重算 S/O/D 與 AP）、未將熱像溫差上限 ΔT≤10°C 寫入控制計畫（CP）、未修訂水面型光電 SOP、亦未更新 SCADA 故障特徵規則庫。系統已鎖定禁止進入 D8！
        </p>
      `;
    } else {
      resEl.className = "mt-3 p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-950 text-xs space-y-1.5";
      resEl.innerHTML = `
        <div class="font-extrabold text-sm text-emerald-900">✅ 通過三大治理鐵律全面檢核！（評級：優秀 Excellent 96 / 100 分）</div>
        <p>1. <strong>鐵律一</strong>：已完成 Stage 1 結構化解析人工簽核確認；
        <br>2. <strong>鐵律二</strong>：具備獨立之物理發生根因与監控流出根因，且 5-Why 達 5 層以上、符合 MECE 並通過「因此（Therefore）」雙向可逆實測證據鏈檢驗；
        <br>3. <strong>鐵律三</strong>：完成 UNSW P2P + HP 濾波 90 天零復發收斂驗證（Ey Ratio 0.968 ≥ 0.92），且 D7 四大工程文件（PFMEA v3.3、CP v2026.2、SOP v3.0、SCADA RULE-2026-09）100% 完成版次升級與橫向展開！</p>
      `;
    }
  };

  function renderLayer3GovernanceAudit() {
    const c = allCases.find(x => x.case_no === selectedCaseNo) || allCases[0];
    if (!c) return;

    const selectEl = document.getElementById("layer3-case-select");
    if (selectEl) {
      selectEl.innerHTML = allCases.map(item =>
        `<option value="${item.case_no}" ${item.case_no === c.case_no ? "selected" : ""}>${item.case_no} ｜ ${item.site_name} (${item.audit_score}分)</option>`
      ).join("");
    }

    const container = document.getElementById("layer3-audit-workspace");
    if (!container) return;

    const docs = c.d7_docs_updated || {};
    const docItems = [
      { key: "pfmea_dfmea", label: "① 程序/設計 FMEA (PFMEA / DFMEA)", desc: "新增本次發現之失效模式，重新評估嚴重度(S)、發生度(O)、難檢度(D)並重算 RPN 與 AIAG-VDA AP 行動優先級", data: docs.pfmea_dfmea },
      { key: "control_plan", label: "② 控制計畫 (Control Plan, CP)", desc: "將關鍵運維監控參數（如 MC4 扭力值 2.5N·m、絕緣電阻閾值、IR 熱像溫差上限 ΔT≤10°C）納入常規管控與異常反應計畫 (Reaction Plan)", data: docs.control_plan },
      { key: "sop_sip", label: "③ 標準作業指導書 (SOP / SIP) 與檢驗標準 (OBA/IQC/IPQC)", desc: "更新巡檢步驟、備品防呆規範與抽樣比例，並完成現場維運工程師培訓考核簽核", data: docs.sop_sip },
      { key: "scada_rule", label: "④ SCADA 告警規則與 AI 診斷模型庫 (Yokoten 水平展開)", desc: "將新增之故障特徵碼 (Fault Signatures) 寫入邊緣網關與雲端監控平台，跨案場水平展開", data: docs.scada_rule }
    ];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- 治理鐵律一：兩階段人工確認閘門 -->
        <div class="bg-white rounded-2xl p-5 border-2 ${c.stage1_human_confirmed ? 'border-emerald-500' : 'border-amber-500'} shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5">
              <span class="px-3 py-1 rounded-lg bg-slate-900 text-amber-400 font-extrabold text-xs">治理鐵律一</span>
              <h3 class="text-base font-extrabold text-slate-900">兩階段強制人工確認工作流 (duding-engicool/skill-8d-report-analyzer Stage 1 Gate)</h3>
            </div>
            <label class="inline-flex items-center gap-2 cursor-pointer select-none px-3.5 py-1.5 rounded-xl font-bold text-xs ${c.stage1_human_confirmed ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}">
              <input type="checkbox" class="w-4 h-4 accent-emerald-600" ${c.stage1_human_confirmed ? "checked" : ""} onchange="toggleStage1Confirmation(this.checked)">
              <span>${c.stage1_human_confirmed ? "✅ 工程師已核對確認 Stage 1 結構化解析無誤（已解鎖 Stage 2 深度評鑑）" : "⏳ 待工程師勾選確認 Stage 1 解析內容（防止跨頁表格或 OCR 失真誤導 AI）"}</span>
            </label>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            依據文獻結論與 <code>skill-8d-report-analyzer (TRACE 47/50)</code> 工程約束：系統調用 <code>parse_document.py</code> 將報告與 SCADA 切片解析為結構化 JSON 後，<strong>在未獲得工程師明確確認內容完整準確前，嚴格禁止啟動第二階段 AI 深度評分</strong>。
          </p>
        </div>

        ${!c.stage1_human_confirmed ? `
          <div class="bg-amber-50 border-2 border-dashed border-amber-400 rounded-2xl p-8 text-center">
            <div class="text-base font-extrabold text-amber-900 mb-2">🔒 Stage 2 AI 深度合規審查已鎖定（Validation Gate Active）</div>
            <p class="text-xs text-amber-800 mb-4">請先於上方「治理鐵律一」勾選工程師人工確認核對框，以解鎖 D4 雙根因審查、D6 P2P 長期驗證與 D7 四大文件閉環工作台。</p>
            <button onclick="toggleStage1Confirmation(true)" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow">
              一鍵完成工程師人工核對並解鎖 Stage 2
            </button>
          </div>
        ` : `
          <!-- Stage 2 解鎖後：百分制加權評分條 (FBWM-FSREM & skill-8d-report-analyzer) -->
          <div class="bg-slate-900 text-white rounded-2xl p-5 shadow-lg">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span class="text-xs font-mono text-sky-300">Stage 2 Unlocked ｜ 100 分制加權合規評鑑模型 (Komatina FBWM-FSREM 權重對齊)</span>
                <h4 class="text-lg font-extrabold mt-0.5">${c.case_no} — ${c.site_name}</h4>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <div class="text-[11px] text-slate-400">綜合品質評級</div>
                  <div class="text-xl font-black ${c.audit_score >= 90 ? 'text-emerald-400' : 'text-amber-400'}">
                    ${c.audit_score} / 100 分 (${c.audit_score >= 90 ? '優秀 Excellent' : '良好 Good'})
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
              <div class="bg-white/10 rounded-xl p-2.5">
                <div class="text-slate-300 text-[11px]">D1 跨職能團隊</div>
                <div class="font-extrabold text-emerald-300 text-sm mt-0.5">10 / 10%</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5">
                <div class="text-slate-300 text-[11px]">D2 5W2H/邊界</div>
                <div class="font-extrabold text-emerald-300 text-sm mt-0.5">15 / 15%</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5">
                <div class="text-slate-300 text-[11px]">D3 圍堵/降噪</div>
                <div class="font-extrabold text-emerald-300 text-sm mt-0.5">15 / 15%</div>
              </div>
              <div class="bg-rose-500/20 border border-rose-400/50 rounded-xl p-2.5">
                <div class="text-rose-200 text-[11px] font-bold">D4 雙根因 (核心)</div>
                <div class="font-black text-rose-300 text-sm mt-0.5">30 / 30%</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5">
                <div class="text-slate-300 text-[11px]">D5 永久對策</div>
                <div class="font-extrabold text-emerald-300 text-sm mt-0.5">15 / 15%</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5">
                <div class="text-slate-300 text-[11px]">D6 P2P長效驗證</div>
                <div class="font-extrabold text-emerald-300 text-sm mt-0.5">${c.d6_validation?.after_ratio >= 0.90 ? '10' : '7'} / 10%</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5">
                <div class="text-slate-300 text-[11px]">D7/D8 文件閉環</div>
                <div class="font-extrabold text-amber-300 text-sm mt-0.5">${Math.round((Object.values(docs).filter(d => d.updated).length / 4) * 5)} / 5%</div>
              </div>
            </div>
          </div>

          <!-- 治理鐵律二：D4 雙根因 (30%權重) 與 >=5 層雙向可逆 5-Why 證據鏈檢核 -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2.5">
                <span class="px-3 py-1 rounded-lg bg-rose-700 text-white font-extrabold text-xs">治理鐵律二 (佔 30% 核心權重)</span>
                <h3 class="text-base font-extrabold text-slate-900">D4 雙根因（發生因＋流出因）與 ≥5 層雙向可逆 5-Why 證據鏈檢核 (/8d-coach & /rca-facilitator)</h3>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ✓ 符合 MECE 原則 ｜ ✓ 零「人為疏失」敷衍歸因
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <div class="text-xs font-extrabold text-rose-900 mb-1">🔍 維度一：物理與技術發生根因 (Occurrence Root Cause)</div>
                <p class="text-xs text-slate-800 leading-relaxed">${c.d4_occurrence_rc}</p>
              </div>
              <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <div class="text-xs font-extrabold text-amber-900 mb-1">🛡️ 維度二：SCADA 預警與巡檢流出/逃逸根因 (Escape Root Cause)</div>
                <p class="text-xs text-slate-800 leading-relaxed">${c.d4_escape_rc}</p>
              </div>
            </div>

            <!-- 5-Why 雙向可逆證據鏈 -->
            <div class="space-y-2 mb-4">
              <div class="text-xs font-extrabold text-slate-800 mb-1">🔗 5-Why 雙向可逆因果證據鏈（Because ⇄ Therefore 雙向邏輯驗證 + 客觀實測證據）：</div>
              ${(c.d4_five_why || []).map(w => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div class="space-y-0.5">
                    <div class="font-bold text-slate-900">
                      <span class="inline-block px-2 py-0.5 rounded bg-blue-900 text-white font-mono text-[11px] mr-1.5">Why ${w.level}</span>
                      ${w.why}
                    </div>
                    <div class="text-slate-700 pl-1">↳ <strong>因為 (Because / 雙向可逆 Therefore)：</strong>${w.answer}</div>
                  </div>
                  <div class="shrink-0 px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono text-[11px]">
                    📸 客觀證據：${w.evidence}
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- 互動式攔截壓力測試按鈕 -->
            <div class="pt-3 border-t border-slate-200">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xs font-bold text-slate-700">🧪 互動測試 <code>RBraga01 /8d-coach</code> 驗證閘門（模擬常見退件缺失）：</span>
                <div class="flex flex-wrap gap-2">
                  <button onclick="runRcaGateTest('human_error')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300 transition">
                    測試填寫「人員操作疏忽 / 零件自然老化」
                  </button>
                  <button onclick="runRcaGateTest('copy_paste_d7')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 transition">
                    測試將「D5/D6 直接複製貼上至 D7」
                  </button>
                  <button onclick="runRcaGateTest('pass')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 transition">
                    檢視標準合規通過狀態
                  </button>
                </div>
              </div>
              <div id="layer3-rca-test-result"></div>
            </div>
          </div>

          <!-- 治理鐵律三：D6 P2P+HP 濾波長期驗證 & D7 四大工程文件強制版次更新閉環 -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2.5">
                <span class="px-3 py-1 rounded-lg bg-emerald-700 text-white font-extrabold text-xs">治理鐵律三</span>
                <h3 class="text-base font-extrabold text-slate-900">D6 跨氣候週期 P2P+HP 濾波驗證 ＆ D7 四大核心工程文件強制升版閉環 (/control-plan-builder)</h3>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold ${c.d8_closed ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}">
                ${c.d8_closed ? '🟢 D8 全數閉環簽核完成' : '⏳ 待完成全部 4 項工程文件升版以解鎖 D8'}
              </span>
            </div>

            <!-- D6 短期與長期驗證卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div class="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs">
                <div class="font-extrabold text-sky-900 mb-1">☀️ D6 短期即時確認 (晴空日 I-V & AC)</div>
                <p class="text-slate-700 leading-relaxed">${c.d6_validation?.short_term || "-"}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs">
                <div class="font-extrabold text-indigo-900 mb-1">📈 D6 長期追蹤 (3–6個月 UNSW P2P + HP 濾波)</div>
                <p class="text-slate-700 leading-relaxed">${c.d6_validation?.long_term_p2p || "-"}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex flex-col justify-center">
                <div class="font-extrabold text-emerald-900 mb-2">📊 同儕比值 (Ey Ratio) 收斂與復發率</div>
                <div class="flex items-center justify-around text-center">
                  <div>
                    <div class="text-[11px] text-slate-500">修復前 P2P</div>
                    <div class="text-base font-black text-rose-600">${c.d6_validation?.before_ratio || "-"}</div>
                  </div>
                  <div class="text-slate-400 font-bold">➔</div>
                  <div>
                    <div class="text-[11px] text-slate-500">修復後收斂</div>
                    <div class="text-base font-black text-emerald-700">${c.d6_validation?.after_ratio || "-"}</div>
                  </div>
                  <div class="h-8 w-px bg-emerald-200"></div>
                  <div>
                    <div class="text-[11px] text-slate-500">故障復發率</div>
                    <div class="text-base font-black text-emerald-700">${c.d6_validation?.recurrence_rate ?? 0}%</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- D7 四大工程文件版次修訂強制檢核表 -->
            <div class="space-y-2.5">
              <div class="text-xs font-extrabold text-slate-900">📋 D7 預防再發與系統文件標準化修訂強制檢核表（點擊勾選可即時模擬升版與閉環）：</div>
              ${docItems.map(item => {
                const isUpd = item.data && item.data.updated;
                return `
                  <div class="p-3.5 rounded-xl border ${isUpd ? 'bg-emerald-50/40 border-emerald-300' : 'bg-amber-50/40 border-amber-300'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <label class="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" class="w-4 h-4 mt-0.5 accent-emerald-600" ${isUpd ? "checked" : ""} onchange="toggleD7DocItem('${item.key}', this.checked)">
                      <div>
                        <div class="font-extrabold text-slate-900">${item.label}</div>
                        <div class="text-slate-600 text-[11px] mt-0.5">${item.desc}</div>
                        <div class="text-slate-800 font-medium mt-1">↳ <strong>本次修訂內容：</strong>${item.data?.summary || "-"}</div>
                      </div>
                    </label>
                    <div class="shrink-0 text-right font-mono">
                      <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px]">${item.data?.oldVer || "v1.0"}</span>
                      <span class="mx-1 text-slate-400">➔</span>
                      <span class="px-2.5 py-0.5 rounded font-bold text-[11px] ${isUpd ? 'bg-emerald-600 text-white' : 'bg-amber-200 text-amber-900'}">${item.data?.newVer || "待升版"}</span>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `}
      </div>
    `;
  }

  // ===========================================================================
  // TAB 5: 文獻理論、GitHub 開源生態與八大 Notebook 對照基準庫
  // ===========================================================================
  function renderReferenceTables() {
    if (!window.PV_8D_SEED_DATA) return;

    const dTable = document.getElementById("ref-table-disciplines");
    if (dTable) {
      dTable.innerHTML = window.PV_8D_SEED_DATA.disciplineSpecs.map(row => `
        <tr class="border-b border-slate-200 hover:bg-slate-50">
          <td class="p-3 font-mono font-extrabold text-blue-900 whitespace-nowrap">${row.d} ${row.name}<div class="text-[11px] font-normal text-slate-500">${row.layer} ｜ 權重: ${row.weight}</div></td>
          <td class="p-3 text-slate-800">${row.task}</td>
          <td class="p-3 text-indigo-800 font-medium">${row.tools}</td>
          <td class="p-3 text-rose-800 bg-rose-50/40">${row.gate}</td>
        </tr>
      `).join("");
    }

    const pTable = document.getElementById("ref-table-papers");
    if (pTable) {
      pTable.innerHTML = window.PV_8D_SEED_DATA.academicPapers.map(row => `
        <tr class="border-b border-slate-200 hover:bg-slate-50">
          <td class="p-3 font-bold text-slate-900">${row.authors}<div class="text-[11px] font-normal text-slate-500">${row.journal}</div></td>
          <td class="p-3 text-slate-800">${row.theory}</td>
          <td class="p-3 font-mono text-xs font-bold text-indigo-700 whitespace-nowrap">${row.stages}</td>
          <td class="p-3 text-emerald-900 bg-emerald-50/40">${row.metrics}</td>
        </tr>
      `).join("");
    }

    const sTable = document.getElementById("ref-table-skills");
    if (sTable) {
      sTable.innerHTML = window.PV_8D_SEED_DATA.githubSkills.map(row => `
        <tr class="border-b border-slate-200 hover:bg-slate-50">
          <td class="p-3 font-mono font-bold text-blue-900">${row.repo}</td>
          <td class="p-3 font-mono text-xs text-slate-700">${row.modules}</td>
          <td class="p-3 text-xs text-indigo-800">${row.standards}</td>
          <td class="p-3 text-slate-800">${row.role}</td>
        </tr>
      `).join("");
    }

    const nTable = document.getElementById("ref-table-notebooks");
    if (nTable) {
      nTable.innerHTML = window.PV_8D_SEED_DATA.jupyterNotebooks.map(row => `
        <tr class="border-b border-slate-200 hover:bg-slate-50">
          <td class="p-3 font-mono font-black text-center text-slate-700">#${row.id}</td>
          <td class="p-3 font-mono font-bold text-blue-900">${row.repo}<div class="text-[11px] font-normal text-slate-500">${row.path}</div></td>
          <td class="p-3 text-xs text-indigo-800 font-medium">${row.stack}</td>
          <td class="p-3 text-slate-800">${row.role}</td>
        </tr>
      `).join("");
    }
  }

  // ===========================================================================
  // 8D 完整報告檢視模態框 (D0 ~ D8 全景檢視與列印)
  // ===========================================================================
  window.openCaseDetailModal = function (caseNo) {
    const c = allCases.find(x => x.case_no === caseNo);
    if (!c) return;
    const modal = document.getElementById("case-detail-modal");
    const content = document.getElementById("case-detail-modal-body");
    if (!modal || !content) return;

    const docs = c.d7_docs_updated || {};
    content.innerHTML = `
      <div class="space-y-5">
        <div class="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-1 rounded bg-slate-900 text-amber-400 font-mono text-xs font-black">${c.case_no}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">光伏 FMEA S_PV = ${c.severity_spv} (AP:${c.ap_level})</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">TRACE 合規評分：${c.audit_score} / 100 分</span>
            </div>
            <h2 class="text-xl font-black text-slate-900">${c.site_name}（${c.capacity_kwp} kWp）— 光伏運維 G8D 根因鑑識報告</h2>
          </div>
          <div class="flex items-center gap-2 no-print">
            ${c.external_report_url ? `
              <a href="${c.external_report_url}" target="_blank" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
                開啟獨立圖表網頁 ↗
              </a>
            ` : ""}
            <button onclick="window.print()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold">
              🖨️ 列印 / 匯出 PDF
            </button>
            <button onclick="closeCaseDetailModal()" class="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold">
              ✕ 關閉
            </button>
          </div>
        </div>

        <!-- D0 & D1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div class="font-extrabold text-slate-900 text-sm">【D0】緊急響應、LOTO 安全隔離與氣象干擾解耦</div>
            <div><strong>LOTO 狀態：</strong>${c.loto_isolated ? "⚡ 已執行現場 LOTO 上鎖掛牌安全隔離（防範 1000V DC 電弧）" : "免急停隔離（軟體與感測器解耦）"}</div>
            <div><strong>氣象干擾解耦：</strong>已通過 <code>pvlib</code> 晴空輻照度模型與 <code>sprince0031 I-V-G</code> 分類器排除短暫雲遮與溫標跳變</div>
            <div><strong>告警風暴治理：</strong>依據 ISA-18.2 / IEC 62682 剔除 <strong>${c.alarm_suppressed_pct}%</strong> 連鎖附屬誤報</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div class="font-extrabold text-slate-900 text-sm">【D1】跨職能問題解決小組 (2–10 人多目標匹配)</div>
            <div><strong>專案贊助人 (Champion)：</strong>${c.d1_team?.champion || "-"}</div>
            <div><strong>小組長 (Team Leader)：</strong>${c.d1_team?.leader || "-"}</div>
            <div><strong>跨領域專家 (SMEs)：</strong>${(c.d1_team?.members || []).join("、")}</div>
          </div>
        </div>

        <!-- D2 & D3 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
            <div class="font-extrabold text-slate-900 text-sm">【D2】問題精確描述 (5W2H & Is / Is Not 邊界矩陣)</div>
            <div><strong>SLD 單線圖拓撲位置：</strong><span class="font-mono text-indigo-700">${c.sld_node}</span></div>
            <div><strong>可觀測故障特徵 (FS)：</strong>${c.fault_signature}</div>
            <div><strong>是什麼 (Is)：</strong>${c.d2_5w2h_is_not?.what_is} ＠ ${c.d2_5w2h_is_not?.where_is}</div>
            <div><strong>不是什麼 (Is Not)：</strong>${c.d2_5w2h_is_not?.what_is_not}</div>
            <div><strong>量化損失規模：</strong>${c.d2_5w2h_is_not?.how_many}</div>
            <div><strong>客觀實測證據：</strong>${c.d2_5w2h_is_not?.evidence}</div>
          </div>
          <div class="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
            <div class="font-extrabold text-slate-900 text-sm">【D3】臨時遏制措施與同批次 100% 普查</div>
            <div><strong>實體電氣隔離：</strong>${c.d3_containment?.loto_action}</div>
            <div><strong>倉儲同批次普查 (Batch Localization)：</strong>${c.d3_containment?.batch_scan}</div>
            <div><strong>SCADA 告警合理化遏制：</strong>${c.d3_containment?.alarm_governance}</div>
          </div>
        </div>

        <!-- D4 雙根因與 5-Why -->
        <div class="p-4 rounded-xl bg-rose-50/40 border border-rose-200 text-xs space-y-3">
          <div class="font-extrabold text-rose-950 text-sm">【D4】雙軌根本原因分析 (RCA — 佔整體品質評鑑權重 30%)</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 rounded-lg bg-white border border-rose-200">
              <strong class="text-rose-800 block mb-1">1. 物理與技術發生根因 (Occurrence Root Cause)：</strong>
              ${c.d4_occurrence_rc}
            </div>
            <div class="p-3 rounded-lg bg-white border border-amber-200">
              <strong class="text-amber-800 block mb-1">2. SCADA 與巡檢流出/逃逸根因 (Escape Root Cause)：</strong>
              ${c.d4_escape_rc}
            </div>
          </div>
          <div class="space-y-1.5">
            <strong class="text-slate-900 block">≥5 層雙向可逆 5-Why 證據鏈：</strong>
            ${(c.d4_five_why || []).map(w => `
              <div class="p-2 rounded bg-white border border-slate-200">
                <strong>Why ${w.level}：</strong>${w.why}<br>
                <span class="text-slate-700">↳ <strong>因此可逆驗證：</strong>${w.answer}</span>
                <span class="text-indigo-700 font-mono ml-2">[證據: ${w.evidence}]</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- D5 & D6 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <div class="font-extrabold text-slate-900 text-sm">【D5】永久糾正措施 (PCA) 與二次風險評估</div>
            ${(c.d5_pca || []).map(p => `
              <div class="p-2.5 rounded bg-slate-50 border border-slate-200">
                <div class="font-bold text-slate-900">• ${p.action}</div>
                <div class="text-slate-500 mt-0.5">負責人：${p.owner} ｜ 期限：${p.due} ｜ 副作用評估：${p.risk_check}</div>
              </div>
            `).join("")}
          </div>
          <div class="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <div class="font-extrabold text-slate-900 text-sm">【D6】實施與 3–6 個月 P2P + HP 濾波長期驗證</div>
            <div><strong>短期即時確認：</strong>${c.d6_validation?.short_term}</div>
            <div><strong>長期同儕收斂驗證：</strong>${c.d6_validation?.long_term_p2p}</div>
            <div class="p-2 rounded bg-emerald-50 border border-emerald-200 font-bold text-emerald-900">
              修復前同儕比值：${c.d6_validation?.before_ratio} ➔ 修復後收斂：${c.d6_validation?.after_ratio} ｜ 故障復發率：${c.d6_validation?.recurrence_rate}%
            </div>
          </div>
        </div>

        <!-- D7 & D8 -->
        <div class="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 text-xs space-y-2">
          <div class="font-extrabold text-emerald-950 text-sm">【D7 & D8】預防再發四大工程文件升版、橫向展開 (Yokoten) 與 RAG 知識庫歸檔閉環</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="p-2.5 rounded bg-white border border-slate-200"><strong>① PFMEA/DFMEA (${docs.pfmea_dfmea?.newVer})：</strong>${docs.pfmea_dfmea?.summary}</div>
            <div class="p-2.5 rounded bg-white border border-slate-200"><strong>② 控制計畫 CP (${docs.control_plan?.newVer})：</strong>${docs.control_plan?.summary}</div>
            <div class="p-2.5 rounded bg-white border border-slate-200"><strong>③ 標準作業書 SOP (${docs.sop_sip?.newVer})：</strong>${docs.sop_sip?.summary}</div>
            <div class="p-2.5 rounded bg-white border border-slate-200"><strong>④ SCADA 預警規則庫 (${docs.scada_rule?.newVer})：</strong>${docs.scada_rule?.summary}</div>
          </div>
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
  };

  window.closeCaseDetailModal = function () {
    document.getElementById("case-detail-modal")?.classList.add("hidden");
  };

  // ===========================================================================
  // 新增 8D 立案模態框 & Supabase 設定模態框 & 匯出 CSV/JSON
  // ===========================================================================
  window.openNewCaseModal = function () {
    document.getElementById("new-case-modal")?.classList.remove("hidden");
  };
  window.closeNewCaseModal = function () {
    document.getElementById("new-case-modal")?.classList.add("hidden");
  };

  window.submitNew8DCase = async function (e) {
    e.preventDefault();
    const caseNo = document.getElementById("nc-case-no").value.trim() || `8D-2026-PV0${allCases.length + 1}`;
    const siteName = document.getElementById("nc-site-name").value.trim();
    const cap = parseFloat(document.getElementById("nc-capacity").value) || 500;
    const spv = parseInt(document.getElementById("nc-spv").value, 10) || 4;
    const sld = document.getElementById("nc-sld").value.trim();
    const fs = document.getElementById("nc-fs").value.trim();
    const occRc = document.getElementById("nc-occ-rc").value.trim();
    const escRc = document.getElementById("nc-esc-rc").value.trim();

    // 治理鐵律二即時防呆：檢查是否將根因歸咎於人員疏忽
    if (/人員疏忽|人為疏失|員工粗心|自然老化|加強教育訓練/.test(occRc + escRc)) {
      alert("🚨 【治理鐵律二攔截 (/8d-coach)】：嚴禁將 D4 根本原因歸咎於「人員疏忽」或「零件自然老化」等表面症狀！請填寫具物理實測與制度支撐的系統性根因。");
      return;
    }

    const newCase = {
      id: "case-" + Date.now(),
      case_no: caseNo,
      site_name: siteName,
      capacity_kwp: cap,
      current_discipline: "D4",
      active_layer: 2,
      severity_spv: spv,
      ap_level: spv >= 4 ? "H" : "M",
      loto_isolated: spv === 5,
      weather_decoupled: true,
      alarm_suppressed_pct: 73.5,
      sld_node: sld,
      fault_signature: fs,
      energy_loss_mwh: 18.5,
      pr_drop_pct: 12.4,
      financial_claim_ntd: 92500,
      stage1_human_confirmed: false,
      audit_score: 85,
      d8_closed: false,
      d1_team: {
        champion: "葉大衛 (維運管理部協理 / Sponsor)",
        leader: "姜興中 (資深電氣可靠度工程師)",
        members: ["洪稜凱 (SCADA 數據分析師)", "黃昱超 (現場熱像工程師)", "陳志豪 (OEM 駐場 FAE)"]
      },
      d2_5w2h_is_not: {
        what_is: fs,
        what_is_not: "非短暫雲層遮擋、非感測器單位錯置",
        where_is: sld,
        where_is_not: "非其餘健康對照分區",
        how_many: `影響容量 ${cap} kWp，預估損失 18.5 MWh`,
        evidence: "SCADA 波形切片、UNSW P2P 同儕比對圖與現場 IR 熱像"
      },
      d3_containment: {
        loto_action: spv === 5 ? "已啟動現場 LOTO 斷電隔離" : "已執行異常迴路切離與功率保護降額",
        batch_scan: "已啟動同批次組件 100% IR 紅外線普查 (Batch Localization)",
        alarm_governance: "已透過 ISA-18.2 規則抑制 73.5% 附屬告警"
      },
      d4_occurrence_rc: occRc,
      d4_escape_rc: escRc,
      d4_five_why: [
        { level: 1, why: `為何發生 ${fs}？`, answer: "因為前端電氣阻抗或散熱條件劣化引發保護動作。", evidence: "SCADA 1分鐘遙測序列" },
        { level: 2, why: "為何電氣或熱學參數劣化？", answer: "因為關鍵連接器/濾波組件承受環境應力退化。", evidence: "FLIR 熱像圖與阻抗實測" },
        { level: 3, why: "為何環境應力導致退化加速？", answer: "因為現場安裝防護等級或應力釋放餘裕不足。", evidence: "現場施工查核紀錄" },
        { level: 4, why: "為何安裝階段未落實防護規範？", answer: "因為過往工程驗收表未將該環境因子列為強制必檢點。", evidence: "舊版檢驗標準書" },
        { level: 5, why: "為何系統未能提前預警並攔截（雙根因總結）？", answer: `【發生根因】${occRc}；【流出根因】${escRc}`, evidence: "PFMEA 與 SCADA 規則庫核對" }
      ],
      d4_citations: [
        { refId: "CIT-EXPERT-KB", source: "進金生雙模態 8D 專家驗證知識庫 (Milvus + Neo4j)", quote: "已通過 uptrain RAG_WITH_CITATION 邊界檢核。", similarity: 0.94 }
      ],
      d5_pca: [
        { action: "針對發生根因執行硬體規格升級與定扭力/熱應力驗證。", owner: "姜興中", due: "30天內閉環", risk_check: "無二次副作用" },
        { action: "針對流出根因於 SCADA 部署 UNSW P2P 與退化斜率早期預警規則。", owner: "洪稜凱", due: "30天內閉環", risk_check: "誤報率 < 2%" }
      ],
      d6_validation: {
        short_term: "待 D5 實施後進行晴空日 I-V 與 AC 出力確認。",
        long_term_p2p: "排入 90 天 UNSW P2P + HP 濾波長期追蹤。",
        before_ratio: 0.81,
        after_ratio: 0.94,
        recurrence_rate: 0
      },
      d7_docs_updated: {
        pfmea_dfmea: { updated: false, oldVer: "v1.0", newVer: "待升版", summary: "待重算 S/O/D 與 AP" },
        control_plan: { updated: false, oldVer: "v1.0", newVer: "待升版", summary: "待納入控制計畫 Reaction Plan" },
        sop_sip: { updated: false, oldVer: "v1.0", newVer: "待升版", summary: "待更新巡檢 SOP 與培訓簽核" },
        scada_rule: { updated: false, oldVer: "v1.0", newVer: "待升版", summary: "待寫入邊緣網關故障特徵庫" }
      }
    };

    allCases = await window.PV8DSupabase.saveCase(newCase);
    selectedCaseNo = newCase.case_no;
    closeNewCaseModal();
    renderAll();
  };

  window.openSupabaseModal = function () {
    const cfg = window.PV8DSupabase.getStoredConfig();
    const urlInput = document.getElementById("sb-cfg-url");
    const keyInput = document.getElementById("sb-cfg-key");
    if (urlInput) urlInput.value = cfg.url;
    if (keyInput) keyInput.value = cfg.anonKey;
    document.getElementById("supabase-config-modal")?.classList.remove("hidden");
  };

  window.closeSupabaseModal = function () {
    document.getElementById("supabase-config-modal")?.classList.add("hidden");
  };

  window.saveSupabaseConfigForm = async function (e) {
    e.preventDefault();
    const url = document.getElementById("sb-cfg-url")?.value || "";
    const key = document.getElementById("sb-cfg-key")?.value || "";
    const ok = await window.PV8DSupabase.saveConfig(url, key);
    allCases = await window.PV8DSupabase.loadCases();
    renderAll();
    alert(ok ? "🟢 Supabase 雲端連線成功！已同步雙模態 8D 案件庫。" : "⚠️ 已儲存設定，目前使用本地展示快取模式。");
    closeSupabaseModal();
  };

  window.exportAllCasesCSV = function () {
    const headers = ["案號", "電站名稱", "容量(kWp)", "目前階段", "架構層級", "FMEA嚴重度(S_PV)", "AP優先級", "LOTO隔離", "告警降噪率(%)", "SLD節點", "損失度數(MWh)", "索賠/損失金額(NT$)", "發生根因(Occurrence RC)", "流出根因(Escape RC)", "TRACE評分"];
    const rows = allCases.map(c => [
      c.case_no, c.site_name, c.capacity_kwp, c.current_discipline, `Layer ${c.active_layer}`,
      c.severity_spv, c.ap_level, c.loto_isolated ? "Y" : "N", c.alarm_suppressed_pct,
      `"${(c.sld_node || "").replace(/"/g, '""')}"`, c.energy_loss_mwh, c.financial_claim_ntd,
      `"${(c.d4_occurrence_rc || "").replace(/"/g, '""')}"`, `"${(c.d4_escape_rc || "").replace(/"/g, '""')}"`, c.audit_score
    ]);
    const csv = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `進金生能源_光伏運維8D閉環管理清冊_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  document.addEventListener("DOMContentLoaded", initApp);
})();
