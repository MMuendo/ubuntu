import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '../constants';
import {
    Lock, Sparkles, Brain, Zap, CheckCircle, ArrowRight, Loader2,
    BarChart3, FileSpreadsheet, Database, RefreshCw, Trophy,
    Flame, Target, Clock, ChevronRight,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────
interface Plan { id: string; name: string; description: string; price: number; }
type PathType = null | 'ai' | 'data';
type DataCategory = 'excel' | 'powerbi' | 'sql';
interface DataQuestion { text: string; options: string[]; correctIndex: number; category: DataCategory; topic: string; }

// ─── Plans ────────────────────────────────────────────────────────
const AI_PLANS: Record<'starter' | 'advanced', Plan> = {
    starter: { id: 'ai-mastery',            name: 'AI Fluency for Business Leaders', description: 'Master AI tools, prompting, and business automation. Built for East African professionals stepping into AI.',          price: 2500  },
    advanced:{ id: 'ai-agents-masterclass', name: 'Agentic AI for Business',          description: 'Build real AI agents using n8n, OpenAI, and automation platforms. Hands-on with real Kenyan business datasets.', price: 5000 },
};
const DATA_PLANS: Record<'excel' | 'powerbi', Plan> = {
    excel:   { id: 'excel-workshop',   name: 'Data Analytics with Excel',        description: 'Master formulas, pivot tables, and dashboards using real data from Safaricom, KCB, and Equity Bank.',                          price: 12500 },
    powerbi: { id: 'powerbi-workshop', name: 'Business Analytics with Power BI',  description: 'Build executive-grade dashboards with DAX, Power Query, and interactive visuals — East Africa context throughout.', price: 15000 },
};

// ─── Data Questions ───────────────────────────────────────────────
const DATA_QUESTIONS: DataQuestion[] = [
    // EXCEL (7)
    { category:'excel',   topic:'SUMIF Formula',      text:"Amina tracks weekly M-Pesa agent commissions in column B (rows 2–51). Which formula gives total commissions only for agents who earned more than KES 5,000?", options:['=SUMIF(B2:B51,">5000")','=SUM(B2:B51>5000)','=COUNTIF(B2:B51,">5000")','=SUMIFS(B2:B51,"KES",5000)'], correctIndex:0 },
    { category:'excel',   topic:'Pivot Tables',       text:"You have a flat table of Equity Bank branch transactions — Region, Branch, Product, Amount. A manager wants monthly totals by region. What's the fastest Excel approach?", options:['Write a SUMIF formula for each region manually','Insert a PivotTable and drag Region to Rows, Amount to Values','Use VLOOKUP to match each region to a total','Copy and paste into a new sheet for each region'], correctIndex:1 },
    { category:'excel',   topic:'Logical Functions',  text:"A KCB loan officer needs to flag accounts where NPL ratio exceeds 15% AND loan balance is above KES 500,000. Which formula returns 'High Risk' correctly?", options:['=IF(OR(A2>0.15,B2>500000),"High Risk","OK")','=IF(AND(A2>0.15,B2>500000),"High Risk","OK")','=SWITCH(A2>0.15,"High Risk","OK")','=IFERROR(A2/B2,"High Risk")'], correctIndex:1 },
    { category:'excel',   topic:'VLOOKUP',            text:"A Nairobi FMCG company tracks 500 SKUs. Given product code in F2, which formula pulls the unit price from columns A:C where column A has codes and C has prices?", options:['=VLOOKUP(F2,A:B,2,FALSE)','=HLOOKUP(F2,A:C,3,FALSE)','=VLOOKUP(F2,A:C,3,FALSE)','=INDEX(A:A,MATCH(F2,C:C,0))'], correctIndex:2 },
    { category:'excel',   topic:'Combo Charts',       text:"You're presenting Safaricom's quarterly revenue (Q1 2021–Q4 2023) alongside M-Pesa contribution percentage. Which chart best shows BOTH the absolute revenue bars AND the percentage trend?", options:['Two separate bar charts side by side','A 100% stacked bar chart','A combo chart — clustered columns + line on secondary axis','A scatter plot with trend line'], correctIndex:2 },
    { category:'excel',   topic:'Text Functions',     text:"You receive a staff list formatted 'KARIUKI, JAMES MWANGI' (all caps, surname first). Which Excel function extracts just 'James' — assuming a comma separates surname from given names?", options:['=LEFT(A2,FIND(",",A2)-1)','=PROPER(MID(A2,FIND(",",A2)+2,100))','=TRIM(RIGHT(A2,LEN(A2)-FIND(",",A2)))','=LOWER(A2)'], correctIndex:1 },
    { category:'excel',   topic:'Scenario Analysis', text:"A Kenya Airways analyst wants to test three fuel-cost scenarios (Base, High, Stress) and compare EBIT impact — without building three separate models. Which Excel tool does this?", options:['Data Validation dropdown','Conditional Formatting rules','Scenario Manager under Data → What-If Analysis','The CHOOSE() function'], correctIndex:2 },
    // POWER BI (7)
    { category:'powerbi', topic:'DAX Time Intelligence', text:"You're building a Power BI report for an Absa Kenya manager who wants 'Total Loans This Month vs Same Month Last Year'. Which DAX function family handles this?", options:['CALCULATE with a FILTER table','Time intelligence functions like SAMEPERIODLASTYEAR','SUMX with a date condition','RELATED and RELATEDTABLE'], correctIndex:1 },
    { category:'powerbi', topic:'Data Modelling',        text:"You have a 'Transactions' fact table and a 'Branches' dimension table joined on BranchID in Power BI. What is this structure called and why does it matter?", options:["Flat table — all data accessible in one place","Star schema — separates facts from dimensions for efficient DAX calculations","Snowflake schema — normalises data into many small tables","Bridge table — connects two fact tables directly"], correctIndex:1 },
    { category:'powerbi', topic:'Power Query',            text:"You receive monthly sales files from 12 stores as separate Excel workbooks — same structure, different data. How do you load all 12 into one Power BI table automatically?", options:["Paste each file's data manually into one master sheet","Use Power Query → Get Data → Folder, then combine files","Write a DAX UNION formula across 12 tables","Import each file separately and merge in Excel first"], correctIndex:1 },
    { category:'powerbi', topic:'Map Visuals',            text:"A Kenyan logistics company wants Power BI to show delivery performance by county — greener for better on-time rates, redder for worse. Which visual achieves this?", options:['A standard bar chart sorted by county name','A filled map visual with a colour saturation measure','A scatter chart with county on the X axis','A matrix table with conditional formatting'], correctIndex:1 },
    { category:'powerbi', topic:'Row-Level Security',     text:"Your Power BI report covers all 8 Kenyan regions. Regional managers should only see their own region when they log in — WITHOUT building 8 separate reports. Which feature enforces this?", options:['Page-level filters set by the report author','Slicers that each manager configures themselves','Row-Level Security (RLS) roles mapped to user emails','A separate published app per region'], correctIndex:2 },
    { category:'powerbi', topic:'Measures vs Columns',   text:"You need 'Profit Margin %' in Power BI. A colleague suggests a calculated column. You think it should be a measure. Who is right and why?", options:["Column — it's faster to display in a table visual","Measure — it recalculates dynamically based on filter context, correct at every aggregation level","Both are identical in Power BI, no difference","Column — measures cannot be formatted as percentages"], correctIndex:1 },
    { category:'powerbi', topic:'Scheduled Refresh',     text:"You've built a Power BI dashboard for a Nairobi manufacturing CFO. She needs it to auto-refresh every morning with last night's data from an on-premises SQL server. What do you need?", options:['Export to Excel and email her every morning','Install an On-premises Data Gateway and schedule a refresh in Power BI Service','Re-publish the report manually each day','Use DirectQuery — it always shows live data with no setup'], correctIndex:1 },
    // SQL / PYTHON (6)
    { category:'sql', topic:'SQL Aggregation',     text:"A Safaricom table 'mpesa_transactions' has: transaction_id, agent_id, amount, transaction_date. Which query returns total amount transacted per agent in December 2023?", options:["SELECT agent_id, SUM(amount) FROM mpesa_transactions WHERE transaction_date LIKE '2023-12%' GROUP BY agent_id","SELECT SUM(amount) FROM mpesa_transactions GROUP BY transaction_date","SELECT agent_id, COUNT(amount) FROM mpesa_transactions WHERE MONTH = 12","SELECT * FROM mpesa_transactions WHERE amount > 0 AND agent_id IS NOT NULL"], correctIndex:0 },
    { category:'sql', topic:'SQL Joins',           text:"Tables: 'loans' (loan_id, customer_id, amount) and 'customers' (customer_id, name, county). You want ALL customers WITH or WITHOUT a loan. Which JOIN do you use?", options:['INNER JOIN — only customers who have a loan','RIGHT JOIN on loans — all loans including those without customers','LEFT JOIN customers on loans — all customers including those without a loan','CROSS JOIN — combines every customer with every loan'], correctIndex:2 },
    { category:'sql', topic:'Pandas Missing Data', text:"You're cleaning a Python DataFrame of NSE stock prices. Column 'close_price' has 120 missing values out of 1,000 rows. What's most appropriate for a monthly average calculation?", options:["df.drop('close_price', axis=1)","df['close_price'].fillna(0) — replace missing with zero","df['close_price'].fillna(df['close_price'].mean()) — fill with column mean","df.dropna() — delete all rows with any missing value"], correctIndex:2 },
    { category:'sql', topic:'Python Visualisation', text:"A KPLC data scientist visualises electricity demand by region over 12 months. Which library and chart is most appropriate for publication-quality multi-line time series?", options:['NumPy — it includes built-in charting for arrays','Matplotlib or Seaborn with a lineplot, one line per region','Pandas pivot_table() which auto-generates charts','Excel — export from Python and chart there'], correctIndex:1 },
    { category:'sql', topic:'SQL LIMIT / ORDER BY', text:"A Co-op Bank analyst needs the top 5 branches by total Q1 2024 loan disbursements. Which SQL clause limits results to 5 rows after sorting?", options:['WHERE disbursements <= 5','GROUP BY branch_id HAVING COUNT(*) = 5','ORDER BY total_disbursements DESC LIMIT 5','SELECT TOP(5) without any ORDER BY'], correctIndex:2 },
    { category:'sql', topic:'Python Automation',   text:"A Nairobi e-commerce startup wants to auto-pull daily MySQL sales data, compute KPIs, and email a summary report every morning. What Python stack enables this end-to-end?", options:['Excel VBA macros connected to MySQL via ODBC','SQLAlchemy (DB connection) + Pandas (KPI calc) + smtplib (email) + scheduled cron job','Power BI with a scheduled refresh','Google Sheets with IMPORTDATA formula'], correctIndex:1 },
];

// ─── Scoring helpers ──────────────────────────────────────────────
const SCORE_THRESHOLD = 70;
const getAIPlan       = (score: number): Plan => score >= SCORE_THRESHOLD ? AI_PLANS.advanced : AI_PLANS.starter;
const getAILabel      = (score: number): string => score >= SCORE_THRESHOLD ? 'AI Agent Builder' : 'AI Fluency Learner';
const getScoreGrad    = (score: number): string => {
    if (score >= 80) return 'from-green-400 to-cyan-400';
    if (score >= 60) return 'from-cyan-400 to-blue-400';
    if (score >= 40) return 'from-blue-400 to-purple-400';
    return 'from-purple-400 to-pink-400';
};
const getDataRec = (answers: number[]): { category: DataCategory; plan: Plan | null } => {
    const s: Record<DataCategory,{c:number;t:number}> = { excel:{c:0,t:0}, powerbi:{c:0,t:0}, sql:{c:0,t:0} };
    DATA_QUESTIONS.forEach((q,i) => { s[q.category].t++; if (answers[i]===q.correctIndex) s[q.category].c++; });
    const pct = (cat:DataCategory) => s[cat].t>0 ? s[cat].c/s[cat].t : 0;
    const ep=pct('excel'), pp=pct('powerbi'), sp=pct('sql');
    if (sp>ep && sp>pp) return { category:'sql', plan:null };
    if (pp>=ep)         return { category:'powerbi', plan:DATA_PLANS.powerbi };
    return              { category:'excel', plan:DATA_PLANS.excel };
};

// ─── Teasers ──────────────────────────────────────────────────────
const AI_TEASERS   = [
    { after:5,  emoji:'🔥', headline:"You're on fire!",           sub:"5 questions done. Next up: real-world AI business applications.",  stat:'Top performers here go on to build agents that save 10+ hours/week.' },
    { after:10, emoji:'⚡', headline:'Halfway — keep it up!',    sub:"Past the midpoint. The next questions reveal your agentic AI readiness.", stat:'Students who complete assessments are 3× more likely to finish their course.' },
    { after:15, emoji:'🎯', headline:'Final stretch!',            sub:'Only 5 questions left. Your personalised roadmap is nearly ready.',  stat:'Your AI Fluency Score is being calculated right now.' },
];
const DATA_TEASERS = [
    { after:5,  emoji:'📊', headline:'5 down — solid start!',    sub:'Excel done. Next: Power BI and dashboard thinking.',              stat:'Analysts who master these tools earn 35% more on average in East Africa.' },
    { after:10, emoji:'🚀', headline:'Halfway — you got this!',  sub:'Next: SQL & Python — where the real data power lives.',            stat:'Power BI is the #1 requested analytics skill in Kenyan job listings right now.' },
    { after:15, emoji:'🏁', headline:'Final 5 — finish strong!', sub:'Your Data Fluency profile is nearly complete.',                    stat:'Your personalised course recommendation is moments away.' },
];

// ─── Sub-components ───────────────────────────────────────────────
const TeaserScreen: React.FC<{
    teaser: typeof AI_TEASERS[number]; onContinue: ()=>void; isAI: boolean;
}> = ({ teaser, onContinue, isAI }) => {
    const [cd, setCd] = useState(4);
    const go = useCallback(onContinue, [onContinue]);
    useEffect(() => {
        if (cd===0) { go(); return; }
        const t = setTimeout(()=>setCd(c=>c-1), 1000);
        return ()=>clearTimeout(t);
    }, [cd, go]);
    return (
        <div className="fixed inset-0 bg-[#18100F]/96 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="max-w-sm w-full text-center">
                <div className="text-6xl mb-6">{teaser.emoji}</div>
                <h2 className="text-3xl font-bold text-white mb-3">{teaser.headline}</h2>
                <p className="text-gray-400 leading-relaxed mb-5">{teaser.sub}</p>
                <div className="inline-block px-5 py-3 rounded-2xl bg-white/4 border border-white/8 mb-8">
                    <p className={`text-sm font-semibold ${isAI?'text-cyan-400':'text-blue-400'}`}>{teaser.stat}</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <button onClick={onContinue}
                        className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r ${isAI?'from-cyan-500 to-blue-500':'from-blue-500 to-purple-500'} hover:opacity-90 transition-opacity`}>
                        Continue <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-gray-700 text-xs">Auto-continues in {cd}s</span>
                </div>
            </div>
        </div>
    );
};

const EmailGate: React.FC<{ onSubmit:(e:string)=>Promise<void> }> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setError('');
        if (!email||!email.includes('@')||!email.includes('.')) { setError('Please enter a valid email address.'); return; }
        setLoading(true); await onSubmit(email); setLoading(false);
    };
    return (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#0D0D0D] border border-white/12 rounded-3xl p-8 sm:p-10 max-w-sm w-full relative overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.08)]">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center mb-5">
                        <Trophy className="w-7 h-7 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Your score is ready!</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Enter your email to unlock your Fluency Score and personalised course recommendation.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setError('');}} placeholder="name@example.com"
                            disabled={loading}
                            className={`w-full bg-white/5 border ${error?'border-red-500/60':'border-white/10'} rounded-xl p-4 text-white text-sm placeholder:text-gray-700 focus:border-cyan-400 focus:outline-none transition-colors`} />
                        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                        <button type="submit" disabled={loading}
                            className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Processing...</>:<>Reveal My Score <ArrowRight className="w-4 h-4"/></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// ─── Main ─────────────────────────────────────────────────────────
const AssessmentPage: React.FC = () => {
    const navigate = useNavigate();

    const [path,          setPath]          = useState<PathType>(null);
    const [started,       setStarted]       = useState(false);
    const [qIndex,        setQIndex]        = useState(0);
    const [answers,       setAnswers]       = useState<number[]>([]);
    const [selected,      setSelected]      = useState<number|null>(null);
    const [showTeaser,    setShowTeaser]    = useState(false);
    const [pendingIndex,  setPendingIndex]  = useState<number|null>(null);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [showResult,    setShowResult]    = useState(false);
    const [aiScore,       setAiScore]       = useState(0);
    const [aiPlan,        setAiPlan]        = useState<Plan|null>(null);
    const [dataCat,       setDataCat]       = useState<DataCategory|null>(null);
    const [dataPlan,      setDataPlan]      = useState<Plan|null>(null);

    const questions  = path==='ai' ? ASSESSMENT_QUESTIONS : DATA_QUESTIONS;
    const teasers    = path==='ai' ? AI_TEASERS : DATA_TEASERS;
    const isAI       = path==='ai';
    const accentCls  = isAI ? 'text-cyan-400' : 'text-blue-400';
    const gradCls    = isAI ? 'from-cyan-500 to-blue-500' : 'from-blue-500 to-purple-500';
    const currentTeaser = teasers.find(t=>t.after===pendingIndex);
    const progress   = questions.length>0 ? (qIndex/questions.length)*100 : 0;
    const q          = questions[qIndex];

    const handleAnswer = (idx:number) => {
        if (selected!==null) return;
        setSelected(idx);
        setTimeout(()=>{
            const newAns = [...answers, idx];
            setAnswers(newAns);
            setSelected(null);
            const next = qIndex+1;
            const teaser = teasers.find(t=>t.after===next);
            if (next<questions.length) {
                if (teaser) { setPendingIndex(next); setShowTeaser(true); }
                else setQIndex(next);
            } else {
                if (path==='ai') {
                    let c=0; newAns.forEach((a,i)=>{ if(a===ASSESSMENT_QUESTIONS[i].correctIndex)c++; });
                    const sc=Math.round((c/ASSESSMENT_QUESTIONS.length)*100);
                    setAiScore(sc); setAiPlan(getAIPlan(sc));
                } else {
                    const {category,plan}=getDataRec(newAns);
                    setDataCat(category); setDataPlan(plan);
                }
                setShowEmailGate(true);
            }
        },320);
    };

    const handleTeaserContinue = useCallback(()=>{
        setShowTeaser(false);
        if (pendingIndex!==null) { setQIndex(pendingIndex); setPendingIndex(null); }
    },[pendingIndex]);

    const handleEmailSubmit = async (email:string) => {
        try {
            await supabase.from('leads').insert([{
                email, source:'assessment',
                metadata:{ path,
                    ...(path==='ai'
                        ? { assessment_score:aiScore, recommended_plan:aiPlan?.name??'Unknown' }
                        : { data_category:dataCat,    recommended_plan:dataPlan?.name??'SQL/Python Coming Soon' }),
                },
            }]);
        } catch(err){ console.error('Lead save (non-blocking):',err); }
        setShowEmailGate(false); setShowResult(true);
    };

    const resetAll = () => {
        setPath(null);setStarted(false);setQIndex(0);setAnswers([]);setSelected(null);
        setShowTeaser(false);setPendingIndex(null);setShowEmailGate(false);setShowResult(false);
        setAiScore(0);setAiPlan(null);setDataCat(null);setDataPlan(null);
    };

    // ── PATH CHOOSER ──────────────────────────────────────────
    if (!path) return (
        <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"/>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1.5s'}}/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/3 rounded-full blur-3xl"/>
            </div>
            <div className="absolute top-32 left-16 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"/>
            <div className="absolute top-48 right-24 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay:'0.7s'}}/>
            <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay:'1.4s'}}/>

            <div className="max-w-5xl w-full relative z-10">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400"/>
                        <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Ubuntu AnalytIQ</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                        What's Your<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Learning Path?</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Take a 5-minute skills assessment and we'll match you to the exact course for your goals and level. No guesswork.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Data Fluency */}
                    <button onClick={()=>setPath('data')}
                        className="group relative w-full text-left bg-gradient-to-br from-blue-500/8 to-purple-500/8 border border-white/8 hover:border-blue-500/40 rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{background:'radial-gradient(ellipse at top left,rgba(59,130,246,0.06),transparent 70%)'}}/>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mb-6">
                                <FileSpreadsheet className="w-7 h-7 text-blue-400"/>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Data Fluency</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed text-sm">For analysts, finance professionals, and ops leaders who work with spreadsheets, reports, and dashboards.</p>
                            <div className="space-y-2.5 mb-8">
                                {['Excel formulas, pivot tables & dashboards','Power BI data modelling & DAX','SQL & Python for data (coming soon)','Real data from Safaricom, KCB, Equity Bank'].map(b=>(
                                    <div key={b} className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"/>
                                        <span className="text-sm text-gray-300">{b}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-blue-400 border border-blue-400/30 group-hover:bg-white/5 transition-colors">
                                Start Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                            </div>
                        </div>
                    </button>

                    {/* AI Fluency */}
                    <button onClick={()=>setPath('ai')}
                        className="group relative w-full text-left bg-gradient-to-br from-cyan-500/8 to-purple-500/8 border border-white/8 hover:border-cyan-500/40 rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{background:'radial-gradient(ellipse at top left,rgba(34,211,238,0.06),transparent 70%)'}}/>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mb-6">
                                <Brain className="w-7 h-7 text-cyan-400"/>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Fluency</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed text-sm">For business leaders, managers, and entrepreneurs who want to harness AI to work smarter and lead better.</p>
                            <div className="space-y-2.5 mb-8">
                                {['How modern AI systems think and work','Prompt engineering for real business tasks','Building AI agents with n8n & OpenAI','Responsible AI in the East African context'].map(b=>(
                                    <div key={b} className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0"/>
                                        <span className="text-sm text-gray-300">{b}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-cyan-400 border border-cyan-400/30 group-hover:bg-white/5 transition-colors">
                                Start Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                            </div>
                        </div>
                    </button>
                </div>

                <p className="text-center text-gray-700 text-xs flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"/>
                    20 questions · about 5 minutes · results are personalised to your answers
                </p>
            </div>
        </div>
    );

    // ── LANDING (path intro) ──────────────────────────────────
    if (!started) return (
        <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/4 -left-48 w-96 h-96 ${isAI?'bg-cyan-500/5':'bg-blue-500/5'} rounded-full blur-3xl animate-pulse`}/>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1.5s'}}/>
            </div>
            <div className="max-w-3xl w-full relative z-10">
                <div className="text-center mb-10">
                    <button onClick={resetAll} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-400 text-sm mb-8 transition-colors group">
                        <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform"/> Change path
                    </button>
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                        <div className={`absolute inset-0 rounded-full border ${isAI?'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/30':'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30'}`}/>
                        <div className={`absolute inset-0 rounded-full ${isAI?'bg-cyan-500/10':'bg-blue-500/10'} animate-ping`}/>
                        {isAI?<Brain className="w-9 h-9 text-cyan-400 relative z-10"/>:<FileSpreadsheet className="w-9 h-9 text-blue-400 relative z-10"/>}
                    </div>
                    <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border ${isAI?'bg-cyan-500/10 border-cyan-500/20 text-cyan-400':'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                        {isAI?'AI Fluency Assessment':'Data Fluency Assessment'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {isAI?'Discover Your AI Path':'Find Your Data Track'}
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                        {isAI
                            ?'20 questions revealing whether you\'re ready for AI Fluency or Agentic AI — with real East African business scenarios.'
                            :'20 questions across Excel, Power BI, and SQL/Python. We\'ll match you to the exact data track for your skill level.'}
                    </p>
                </div>

                <div className="bg-white/3 border border-white/8 rounded-3xl p-8 mb-8">
                    <h2 className="text-base font-bold text-white mb-5 text-center">What This Covers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(isAI?[
                            {icon:<Brain className="w-5 h-5 text-cyan-400"/>,    label:'AI Concepts',     desc:'LLMs, agents, and automation'},
                            {icon:<Zap className="w-5 h-5 text-purple-400"/>,    label:'Business Application', desc:'Real use cases in Kenyan industries'},
                            {icon:<Target className="w-5 h-5 text-blue-400"/>,   label:'Readiness Level', desc:'Fluency vs agentic capability'},
                        ]:[
                            {icon:<FileSpreadsheet className="w-5 h-5 text-blue-400"/>,   label:'Excel',     desc:'7 practical formula & analysis Qs'},
                            {icon:<BarChart3 className="w-5 h-5 text-purple-400"/>,       label:'Power BI',  desc:'7 Qs on DAX, modelling & visuals'},
                            {icon:<Database className="w-5 h-5 text-emerald-400"/>,       label:'SQL & Python', desc:'6 coding and automation Qs'},
                        ]).map(({icon,label,desc})=>(
                            <div key={label} className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-white/3 border border-white/6">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">{icon}</div>
                                <p className="text-white text-sm font-semibold">{label}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <button onClick={()=>setStarted(true)}
                        className={`group inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r ${gradCls} text-white font-bold text-base rounded-full hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300`}>
                        Begin Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <p className="text-gray-700 text-xs mt-4 flex items-center justify-center gap-2">
                        <Clock className="w-3 h-3"/> {questions.length} questions · about 5 minutes · no time limit
                    </p>
                </div>
            </div>
        </div>
    );

    // ── RESULT ────────────────────────────────────────────────
    if (showResult) {
        // SQL coming soon
        if (!isAI && dataCat==='sql') return (
            <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"/>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"/>
                </div>
                <div className="max-w-xl w-full relative z-10 text-center">
                    <div className="bg-white/3 border border-white/8 rounded-3xl p-10 md:p-14">
                        <div className="text-5xl mb-5">🚀</div>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-5">SQL & Python Track</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
                        <p className="text-gray-400 leading-relaxed mb-3 max-w-sm mx-auto">Your results show strong affinity for SQL and Python — the most powerful tools in any data professional's kit.</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-7 max-w-sm mx-auto">We're building a world-class SQL & Python for Data Analytics course right now. We'll notify you the moment it launches — including a launch discount.</p>
                        <div className="bg-emerald-500/8 border border-emerald-500/15 rounded-2xl p-5 mb-8">
                            <p className="text-emerald-400 text-sm font-bold mb-1">You're on the early access list ✓</p>
                            <p className="text-gray-500 text-xs">We'll email you first when SQL & Python launches.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={()=>navigate('/academy')}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                                Explore Other Courses <ArrowRight className="w-4 h-4"/>
                            </button>
                            <button onClick={resetAll}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 text-gray-300 font-semibold rounded-full hover:bg-white/10 transition-colors">
                                <RefreshCw className="w-4 h-4"/> Try Other Path
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

        // AI result
        if (isAI && aiPlan) {
            const cg=getScoreGrad(aiScore);
            return (
                <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"/>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1s'}}/>
                    </div>
                    <div className="max-w-2xl w-full relative z-10">
                        <div className="bg-white/3 border border-white/8 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
                            <div className="mb-8">
                                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-5">
                                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400/25 animate-ping"/>
                                    <div className="w-full h-full rounded-full border-4 border-cyan-400 bg-gradient-to-br from-cyan-500/15 to-purple-500/15 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.18)]">
                                        <span className="text-4xl font-bold text-white">{aiScore}%</span>
                                    </div>
                                </div>
                                <h2 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cg} mb-2`}>{getAILabel(aiScore)}</h2>
                                <p className="text-gray-500">Your personalised roadmap is ready.</p>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-500/8 to-purple-500/8 rounded-2xl p-7 border border-cyan-500/15 mb-4">
                                <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-3">Recommended Course</p>
                                <h3 className="text-2xl font-bold text-white mb-3">{aiPlan.name}</h3>
                                <p className="text-gray-400 leading-relaxed mb-5 max-w-lg mx-auto">{aiPlan.description}</p>
                                <p className="text-3xl font-bold text-white mb-7">KES {aiPlan.price.toLocaleString()}</p>
                                <div className="relative rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center z-10 gap-3 flex-col sm:flex-row">
                                        <button onClick={()=>{const p=new URLSearchParams({courseId:aiPlan.id,courseName:aiPlan.name,coursePrice:aiPlan.price.toString(),courseDescription:aiPlan.description});navigate(`/checkout?${p.toString()}`);}}
                                            className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all text-sm">
                                            <Lock className="w-4 h-4"/> Take the Course <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                                        </button>
                                        <button onClick={() => navigate('/academy#projects')}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all text-sm">
                                            Take a Project
                                        </button>
                                    </div>
                                    <div className="p-5 border border-white/6 rounded-xl space-y-3 opacity-20">
                                        <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"/><div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"/><div className="h-4 bg-gray-600 rounded w-full"/>
                                    </div>
                                </div>
                            </div>
                            <button onClick={resetAll} className="text-gray-700 hover:text-gray-400 text-xs transition-colors flex items-center gap-1.5 mx-auto mt-4">
                                <RefreshCw className="w-3 h-3"/> Try the Data Fluency path
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Data result (Excel or Power BI)
        const plan=dataPlan!;
        const isExcel=dataCat==='excel';
        const pa=isExcel?'text-blue-400':'text-purple-400';
        const pb=isExcel?'from-blue-500/8 to-cyan-500/8':'from-purple-500/8 to-pink-500/8';
        const pbo=isExcel?'border-blue-500/15':'border-purple-500/15';
        const pg=isExcel?'from-blue-500 to-cyan-500':'from-purple-500 to-pink-500';
        return (
            <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isExcel?'bg-blue-500/5':'bg-purple-500/5'} rounded-full blur-3xl animate-pulse`}/>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1s'}}/>
                </div>
                <div className="max-w-2xl w-full relative z-10">
                    <div className="bg-white/3 border border-white/8 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
                        <div className="mb-7">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${isExcel?'bg-blue-500/15 border-blue-500/25':'bg-purple-500/15 border-purple-500/25'} border mb-5`}>
                                {isExcel?<FileSpreadsheet className="w-8 h-8 text-blue-400"/>:<BarChart3 className="w-8 h-8 text-purple-400"/>}
                            </div>
                            <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border ${isExcel?'bg-blue-500/10 border-blue-500/20 text-blue-400':'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
                                Your Data Track
                            </div>
                            <h2 className={`text-2xl font-bold ${pa} mb-2`}>{isExcel?'Excel is your starting point':'Power BI is your track'}</h2>
                            <p className="text-gray-500 text-sm">Your answers align with {isExcel?'spreadsheet analytics and business modelling':'data visualisation and reporting systems'}.</p>
                        </div>
                        <div className={`bg-gradient-to-br ${pb} rounded-2xl p-7 border ${pbo} mb-4`}>
                            <p className={`${pa} text-[10px] font-bold tracking-widest uppercase mb-3`}>Recommended Course</p>
                            <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                            <p className="text-gray-400 leading-relaxed mb-5 max-w-lg mx-auto">{plan.description}</p>
                            <p className="text-3xl font-bold text-white mb-7">KES {plan.price.toLocaleString()}</p>
                            <div className="relative rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center z-10 gap-3 flex-col sm:flex-row">
                                    <button onClick={()=>{const p=new URLSearchParams({courseId:plan.id,courseName:plan.name,coursePrice:plan.price.toString(),courseDescription:plan.description});navigate(`/checkout?${p.toString()}`);}}
                                        className={`group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${pg} text-white font-bold rounded-full hover:opacity-90 transition-all text-sm`}>
                                        <Lock className="w-4 h-4"/> Take the Course <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                                    </button>
                                    <button onClick={() => navigate('/academy#projects')}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all text-sm">
                                        Take a Project
                                    </button>
                                </div>
                                <div className="p-5 border border-white/6 rounded-xl space-y-3 opacity-20">
                                    <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"/><div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"/><div className="h-4 bg-gray-600 rounded w-full"/>
                                </div>
                            </div>
                        </div>
                        <button onClick={resetAll} className="text-gray-700 hover:text-gray-400 text-xs transition-colors flex items-center gap-1.5 mx-auto mt-4">
                            <RefreshCw className="w-3 h-3"/> Try the AI Fluency path
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── QUESTION SCREEN ───────────────────────────────────────
    return (
        <div className="min-h-screen pt-10 px-4 pb-20 flex flex-col items-center justify-center bg-[#18100F] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/3 left-1/4 w-96 h-96 ${isAI?'bg-cyan-500/3':'bg-blue-500/3'} rounded-full blur-3xl`}/>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"/>
            </div>

            {showTeaser && currentTeaser && (
                <TeaserScreen teaser={currentTeaser} onContinue={handleTeaserContinue} isAI={isAI}/>
            )}
            {showEmailGate && <EmailGate onSubmit={handleEmailSubmit}/>}

            <div className="max-w-2xl w-full relative z-10">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={resetAll} className="text-gray-700 hover:text-gray-400 text-xs transition-colors flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 rotate-180"/> Back
                    </button>
                    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${isAI?'bg-cyan-500/10 border-cyan-500/20 text-cyan-400':'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                        {isAI?'AI Fluency':'Data Fluency'}
                    </div>
                </div>

                {/* Progress */}
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 text-sm flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isAI?'bg-cyan-400':'bg-blue-400'}`}/>
                        Question {qIndex+1} of {questions.length}
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/8 font-medium ${accentCls}`}>
                        {isAI?(q as typeof ASSESSMENT_QUESTIONS[number]).category:(q as DataQuestion).topic}
                    </span>
                </div>

                <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${gradCls} rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.35)]`} style={{width:`${progress}%`}}/>
                </div>

                {/* Milestone markers */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    {[5,10,15].map((m,i)=>(
                        <React.Fragment key={m}>
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${qIndex>=m?(isAI?'bg-cyan-400':'bg-blue-400'):'bg-white/10'} ${qIndex===m?'scale-125':''}`}/>
                            {i<2&&<div className={`w-6 h-px transition-colors ${qIndex>m?(isAI?'bg-cyan-400/40':'bg-blue-400/40'):'bg-white/8'}`}/>}
                        </React.Fragment>
                    ))}
                    <Flame className={`w-3.5 h-3.5 ml-1 ${qIndex>=15?'text-orange-400':'text-gray-700'} transition-colors`}/>
                </div>

                {/* Card */}
                <div className="bg-white/3 border border-white/8 rounded-3xl p-7 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                    <div className={`absolute -right-16 -top-16 w-48 h-48 ${isAI?'bg-cyan-500/4':'bg-blue-500/4'} rounded-full blur-3xl pointer-events-none`}/>
                    <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/4 rounded-full blur-3xl pointer-events-none"/>
                    <div className="relative z-10">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold mb-5 border ${isAI?'bg-cyan-500/15 border-cyan-500/25 text-cyan-400':'bg-blue-500/15 border-blue-500/25 text-blue-400'}`}>
                            {qIndex+1}
                        </div>
                        <h2 className="text-base md:text-lg font-medium text-white mb-7 leading-relaxed">{q.text}</h2>
                        <div className="space-y-3">
                            {q.options.map((opt,idx)=>(
                                <button key={idx} onClick={()=>handleAnswer(idx)} disabled={selected!==null}
                                    className={`group w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 relative overflow-hidden ${
                                        selected===idx
                                            ?`${isAI?'border-cyan-400/70 bg-cyan-500/15':'border-blue-400/70 bg-blue-500/15'} text-white scale-[0.99]`
                                            :'border-white/8 bg-white/3 text-gray-300 hover:border-white/15 hover:bg-white/6 hover:text-white'
                                    }`}>
                                    <div className="flex items-start gap-3">
                                        <span className={`flex-shrink-0 w-6 h-6 rounded-md border text-xs flex items-center justify-center font-bold transition-colors ${
                                            selected===idx
                                                ?`${isAI?'border-cyan-400 bg-cyan-500/30 text-cyan-400':'border-blue-400 bg-blue-500/30 text-blue-400'}`
                                                :'border-white/12 text-gray-600 group-hover:border-white/25 group-hover:text-gray-400'
                                        }`}>{String.fromCharCode(65+idx)}</span>
                                        <span className="leading-relaxed pt-0.5">{opt}</span>
                                    </div>
                                    {selected!==idx&&(
                                        <div className={`absolute inset-0 bg-gradient-to-r ${isAI?'from-cyan-500/0 via-cyan-500/3 to-purple-500/0':'from-blue-500/0 via-blue-500/3 to-purple-500/0'} opacity-0 group-hover:opacity-100 transition-opacity`}/>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="text-center text-gray-700 text-xs mt-5">Select an answer to continue · No time limit</p>
            </div>
        </div>
    );
};

export default AssessmentPage;
