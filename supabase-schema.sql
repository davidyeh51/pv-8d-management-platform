-- =============================================================================
-- 進金生能源 6692 ｜ 光伏運維 8D 智慧管理與三層式 AI Agent 閉環平台
-- Supabase PostgreSQL Schema & Row Level Security (RLS) Policies
-- 依據《光伏運維 8D 報告與知識庫》結論之三層式自動化閉環工程系統設計
-- =============================================================================

-- 啟用 UUID 擴充套件
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 光伏 8D 異常案件主表 (賦能 Layer 1 D0-D2、Layer 2 D3-D5、Layer 3 D6-D8)
CREATE TABLE IF NOT EXISTS public.pv_8d_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_no TEXT UNIQUE NOT NULL,                     -- 8D 案號 (如 8D-2026-PV01)
    site_name TEXT NOT NULL,                          -- 電站名稱
    capacity_kwp NUMERIC(10, 2) NOT NULL DEFAULT 0,   -- 裝置容量 (kWp)
    current_discipline TEXT NOT NULL DEFAULT 'D0',    -- 目前階段 (D0 ~ D8)
    active_layer INTEGER NOT NULL DEFAULT 1,          -- 所處架構層級 (1: 底層預處理, 2: 中層圖譜RAG, 3: 頂層審查閉環)
    severity_spv INTEGER NOT NULL DEFAULT 3 CHECK (severity_spv BETWEEN 1 AND 5), -- 光伏 FMEA 嚴重度 S_PV (1~5)
    ap_level TEXT NOT NULL DEFAULT 'H',               -- AIAG-VDA 行動優先級 (H/M/L)
    loto_isolated BOOLEAN NOT NULL DEFAULT false,     -- D0 是否啟動 LOTO 上鎖掛牌安全隔離
    weather_decoupled BOOLEAN NOT NULL DEFAULT true,  -- D0 是否完成氣象干擾解耦 (I-V-G & pvlib)
    alarm_suppressed_pct NUMERIC(5, 2) DEFAULT 72.5,  -- D3 ISA-18.2 告警降噪剔除比例 (%)
    sld_node TEXT,                                    -- 單線圖 (SLD) 拓撲節點位置
    fault_signature TEXT,                             -- FCA-B-FSA 可觀測電氣故障特徵 (FS)
    energy_loss_mwh NUMERIC(10, 2) DEFAULT 0,         -- 累積損失發電量 (MWh)
    pr_drop_pct NUMERIC(5, 2) DEFAULT 0,              -- PR 效能比下挫百分比 (%)
    financial_claim_ntd NUMERIC(12, 0) DEFAULT 0,     -- 財務損失/保固索賠金額 (NT$)
    d1_team JSONB DEFAULT '{}'::jsonb,                -- D1 跨職能團隊 (Champion, Leader, SME 2-10人)
    d2_5w2h_is_not JSONB DEFAULT '{}'::jsonb,         -- D2 5W2H 與 Is/Is Not 邊界矩陣
    d3_containment JSONB DEFAULT '{}'::jsonb,         -- D3 臨時遏制措施與同批次 IR 普查
    d4_occurrence_rc TEXT,                            -- D4 物理/技術發生根因 (Occurrence Root Cause)
    d4_escape_rc TEXT,                                -- D4 監控/巡檢流出根因 (Escape Root Cause)
    d4_five_why JSONB DEFAULT '[]'::jsonb,            -- D4 >=5層雙向可逆 5-Why 證據鏈
    d4_citations JSONB DEFAULT '[]'::jsonb,           -- uptrain RAG_WITH_CITATION 專家知識庫引文
    d5_pca JSONB DEFAULT '[]'::jsonb,                 -- D5 永久糾正措施與二次風險評估
    d6_validation JSONB DEFAULT '{}'::jsonb,          -- D6 短期晴空日與 3-6 個月 P2P PR + HP 濾波驗證
    d7_docs_updated JSONB DEFAULT '{}'::jsonb,        -- D7 四大核心工程文件版次修訂狀態 (PFMEA, CP, SOP, SCADA)
    d8_closed BOOLEAN NOT NULL DEFAULT false,         -- D8 100% 閉環與簽核狀態
    stage1_human_confirmed BOOLEAN NOT NULL DEFAULT false, -- 治理鐵律一：兩階段人工確認狀態
    audit_score INTEGER DEFAULT 0,                    -- skill-8d-report-analyzer 百分制加權總分 (D4佔30%)
    external_report_url TEXT,                         -- 已發佈之 GitHub Pages 獨立報告連結
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. 雙模態 8D 知識庫與圖譜拓撲節點表 (賦能 Layer 2 邏輯章節切塊與 FCA-B-FSA 映射)
CREATE TABLE IF NOT EXISTS public.pv_8d_knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chunk_code TEXT UNIQUE NOT NULL,                  -- 邏輯語義塊編號 (如 SEC-INV-042)
    source_doc TEXT NOT NULL,                         -- 來源文件 (原廠手冊 / IEC 規範 / 歷史 8D / PFMEA)
    section_hierarchy TEXT NOT NULL,                  -- Gemini 2.5 Pro 解析之章節階層路徑
    fault_signature TEXT NOT NULL,                    -- 對應故障特徵 (FS)
    sld_topology_node TEXT NOT NULL,                  -- 對應單線圖設備節點 (SLD Node)
    occurrence_rc TEXT NOT NULL,                      -- 映射物理發生根因 (Occurrence RC)
    escape_rc TEXT NOT NULL,                          -- 映射監控流出根因 (Escape RC)
    recommended_pca TEXT NOT NULL,                    -- 歷史驗證永久對策 (PCA)
    expert_validated BOOLEAN NOT NULL DEFAULT true,   -- 是否經領域專家驗證 (防止 AI 幻覺邊界)
    citation_ref TEXT NOT NULL,                       -- 強制引文標記 (RAG_WITH_CITATION)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. D7 工程文件與 FMEA 動態更新紀錄表 (賦能 Layer 3 治理鐵律三)
CREATE TABLE IF NOT EXISTS public.pv_8d_fmea_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_no TEXT NOT NULL REFERENCES public.pv_8d_cases(case_no) ON DELETE CASCADE,
    doc_type TEXT NOT NULL,                           -- PFMEA_DFMEA / CONTROL_PLAN / SOP_SIP / SCADA_RULE
    old_version TEXT NOT NULL,
    new_version TEXT NOT NULL,
    s_before INTEGER, o_before INTEGER, d_before INTEGER, ap_before TEXT,
    s_after INTEGER, o_after INTEGER, d_after INTEGER, ap_after TEXT,
    change_summary TEXT NOT NULL,
    yokoten_sites TEXT,                               -- 水平展開 (Yokoten) 適用案場範圍
    approved_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 強制啟用 RLS (Row Level Security) 行級安全防護
-- =============================================================================
ALTER TABLE public.pv_8d_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pv_8d_knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pv_8d_fmea_updates ENABLE ROW LEVEL SECURITY;

-- 允許已驗證使用者與展示環境讀取/寫入 (實務生產環境可鎖定為 TO authenticated)
CREATE POLICY "Allow read access to pv_8d_cases"
    ON public.pv_8d_cases FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated insert/update to pv_8d_cases"
    ON public.pv_8d_cases FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow read access to pv_8d_knowledge_chunks"
    ON public.pv_8d_knowledge_chunks FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated write to pv_8d_knowledge_chunks"
    ON public.pv_8d_knowledge_chunks FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow read access to pv_8d_fmea_updates"
    ON public.pv_8d_fmea_updates FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated write to pv_8d_fmea_updates"
    ON public.pv_8d_fmea_updates FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 建立 Storage Bucket 供 8D 客觀證據 (IR 熱像、EL 微裂紋、I-V 曲線、SLD 單線圖) 上傳
INSERT INTO storage.buckets (id, name, public)
VALUES ('pv-8d-evidences', 'pv-8d-evidences', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read on pv-8d-evidences"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'pv-8d-evidences');

CREATE POLICY "Allow authenticated upload on pv-8d-evidences"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'pv-8d-evidences');
