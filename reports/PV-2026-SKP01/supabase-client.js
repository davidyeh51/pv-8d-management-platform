// =============================================================================
// 進金生能源 6692 ｜ 光伏運維 8D 智慧管理平台
// Supabase BaaS 雲端客戶端與本地無縫離線同步模組 (遵循 github-supabase-web 零私鑰規範)
// =============================================================================

window.PV8DSupabase = (function () {
  const LS_URL_KEY = "ACME_PV8D_SB_URL";
  const LS_ANON_KEY = "ACME_PV8D_SB_ANON_KEY";
  const LS_CASES_KEY = "ACME_PV8D_LOCAL_CASES_V1";
  const LS_KB_KEY = "ACME_PV8D_LOCAL_KB_V1";

  let sbClient = null;
  let isConnected = false;

  function getStoredConfig() {
    return {
      url: window.ENV_SUPABASE_URL || localStorage.getItem(LS_URL_KEY) || "",
      anonKey: window.ENV_SUPABASE_ANON_KEY || localStorage.getItem(LS_ANON_KEY) || ""
    };
  }

  async function initClient() {
    const { url, anonKey } = getStoredConfig();
    if (!url || !anonKey || !url.startsWith("http") || !window.supabase) {
      isConnected = false;
      updateStatusBadge(false, "本地展示模式 (雙模態快取)");
      return false;
    }
    try {
      sbClient = window.supabase.createClient(url, anonKey);
      const { error } = await sbClient.from("pv_8d_cases").select("case_no").limit(1);
      if (error) throw error;
      isConnected = true;
      updateStatusBadge(true, "Supabase 雲端已連線");
      return true;
    } catch (err) {
      console.warn("[PV8DSupabase] Cloud fallback to LocalStorage:", err.message);
      isConnected = false;
      updateStatusBadge(false, "本地展示模式 (離線保護)");
      return false;
    }
  }

  function updateStatusBadge(online, text) {
    const dot = document.getElementById("sb-status-dot");
    const label = document.getElementById("sb-status-text");
    const pill = document.getElementById("sb-status-pill");
    if (!dot || !label || !pill) return;
    if (online) {
      dot.className = "w-2 h-2 rounded-full bg-emerald-500";
      pill.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition cursor-pointer";
      label.textContent = text;
    } else {
      dot.className = "w-2 h-2 rounded-full bg-amber-500 animate-pulse";
      pill.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition cursor-pointer";
      label.textContent = text;
    }
  }

  async function loadCases() {
    if (isConnected && sbClient) {
      const { data, error } = await sbClient.from("pv_8d_cases").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        localStorage.setItem(LS_CASES_KEY, JSON.stringify(data));
        return data;
      }
    }
    const cached = localStorage.getItem(LS_CASES_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    const seed = (window.PV_8D_SEED_DATA && window.PV_8D_SEED_DATA.cases) || [];
    localStorage.setItem(LS_CASES_KEY, JSON.stringify(seed));
    return seed;
  }

  async function saveCase(caseObj) {
    const list = await loadCases();
    const idx = list.findIndex(c => c.case_no === caseObj.case_no);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...caseObj, updated_at: new Date().toISOString() };
    } else {
      list.unshift({ ...caseObj, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    }
    localStorage.setItem(LS_CASES_KEY, JSON.stringify(list));

    if (isConnected && sbClient) {
      await sbClient.from("pv_8d_cases").upsert([caseObj], { onConflict: "case_no" });
    }
    return list;
  }

  async function saveConfig(url, anonKey) {
    localStorage.setItem(LS_URL_KEY, url.trim());
    localStorage.setItem(LS_ANON_KEY, anonKey.trim());
    return await initClient();
  }

  function resetToSeed() {
    localStorage.removeItem(LS_CASES_KEY);
    localStorage.removeItem(LS_KB_KEY);
    return (window.PV_8D_SEED_DATA && window.PV_8D_SEED_DATA.cases) || [];
  }

  return {
    initClient,
    loadCases,
    saveCase,
    saveConfig,
    getStoredConfig,
    resetToSeed,
    isOnline: () => isConnected
  };
})();
