import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Calendar, Award, Clock, CheckCircle, ArrowRight, Loader2,
  GraduationCap, Video, AlertCircle, FolderOpen, FileText, Eye,
  CheckCircle2, BarChart3, Star, Upload, MessageSquare, Trophy,
  TrendingUp, Target, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Purchase {
  id: string; product_id: string; product_name: string;
  amount: number; currency: string; payment_status: string; created_at: string;
}
interface Consultation {
  id: string; course_name: string; preferred_date: string;
  preferred_time: string; status: string; created_at: string;
}
interface ProjectSubmission {
  id: string; project_id: string; project_title: string; track: string;
  file_url: string; file_name: string; status: string;
  admin_comments: string | null; submitted_at: string; reviewed_at: string | null;
}
interface TestScore {
  id: string; test_name: string; score: number; max_score: number;
  passed: boolean; taken_at: string; course: string;
}

// ─── Status helpers ───────────────────────────────────────────────────────────
const submissionStatusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  submitted:    { label: 'Submitted',    color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20',    icon: CheckCircle },
  under_review: { label: 'Under Review', color: 'text-yellow-400',  bg: 'bg-yellow-500/10 border-yellow-500/20', icon: Eye },
  reviewed:     { label: 'Reviewed ✓',  color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
};

const trackColors: Record<string, string> = {
  excel:      'text-blue-400 bg-blue-500/10',
  powerbi:    'text-purple-400 bg-purple-500/10',
  'ai-mastery': 'text-emerald-400 bg-emerald-500/10',
  'ai-agents':  'text-orange-400 bg-orange-500/10',
};

// ─── Component ────────────────────────────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'tests'>('overview');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [testScores, setTestScores] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetchAll();
  }, [user?.email]);

  const fetchAll = async () => {
    try {
      const [purchaseRes, consultRes, subRes, testRes] = await Promise.all([
        supabase.from('purchases').select('*, leads!inner(email)').eq('leads.email', user!.email).eq('payment_status', 'completed').order('created_at', { ascending: false }),
        supabase.from('consultations').select('*').eq('email', user!.email).order('created_at', { ascending: false }),
        supabase.from('project_submissions').select('*').eq('user_id', user!.id).order('submitted_at', { ascending: false }),
        supabase.from('test_scores').select('*').eq('user_id', user!.id).order('taken_at', { ascending: false }),
      ]);
      if (purchaseRes.error) throw purchaseRes.error;
      if (consultRes.error) throw consultRes.error;
      setPurchases(purchaseRes.data || []);
      setConsultations(consultRes.data || []);
      setSubmissions(subRes.data || []);
      setTestScores(testRes.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student';
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' });
  const avgScore = testScores.length ? Math.round(testScores.reduce((a, t) => a + (t.score / t.max_score) * 100, 0) / testScores.length) : 0;
  const reviewedCount = submissions.filter((s) => s.status === 'reviewed').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'My Projects', icon: FolderOpen, badge: submissions.length },
    { id: 'tests',    label: 'My Tests',    icon: Trophy,    badge: testScores.length },
  ] as const;

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Welcome back, <span className="text-brand-cyan">{displayName}</span> 👋
            </h1>
            <p className="text-gray-400 text-sm">Track your learning, projects, and test results</p>
          </div>
          <Link to="/academy#projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan rounded-xl text-sm font-semibold hover:bg-brand-cyan hover:text-brand-dark transition-all">
            <FolderOpen className="w-4 h-4" />Browse Projects
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
          </div>
        ) : (
          <>
            {/* ── Stats strip ── */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {[
                { label: 'Enrolled',    value: purchases.length,                               icon: GraduationCap, color: 'text-brand-cyan' },
                { label: 'Submitted',   value: submissions.length,                             icon: Upload,        color: 'text-orange-400' },
                { label: 'Reviewed',    value: reviewedCount,                                  icon: CheckCircle2,  color: 'text-emerald-400' },
                { label: 'Tests Taken', value: testScores.length,                              icon: Trophy,        color: 'text-purple-400' },
                { label: 'Avg Score',   value: testScores.length ? `${avgScore}%` : '—',       icon: TrendingUp,    color: 'text-yellow-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-brand-surface border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-1 mb-8 bg-white/5 p-1 rounded-xl w-fit">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-brand-surface text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {'badge' in tab && tab.badge > 0 && (
                    <span className="bg-brand-cyan/20 text-brand-cyan text-xs px-1.5 py-0.5 rounded-full font-bold">{tab.badge}</span>
                  )}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Courses */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-brand-cyan" />My Courses
                    </h2>
                    <Link to="/academy#courses" className="text-xs text-brand-cyan hover:underline">Browse more →</Link>
                  </div>
                  {purchases.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm mb-4">No courses enrolled yet</p>
                      <Link to="/academy#courses" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark text-sm font-semibold rounded-lg hover:bg-brand-cyan/90">
                        Explore Courses <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {purchases.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-cyan/10 rounded-lg flex items-center justify-center">
                              <Video className="w-5 h-5 text-brand-cyan" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">{p.product_name}</h3>
                              <p className="text-gray-500 text-xs">Enrolled {formatDate(p.created_at)}</p>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 bg-brand-cyan/10 text-brand-cyan text-xs font-medium rounded-lg hover:bg-brand-cyan/20 transition-colors">Access</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent project activity */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-orange-400" />Recent Projects
                    </h2>
                    <button onClick={() => setActiveTab('projects')} className="text-xs text-orange-400 hover:underline">View all →</button>
                  </div>
                  {submissions.length === 0 ? (
                    <div className="text-center py-8">
                      <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm mb-4">No projects submitted yet</p>
                      <Link to="/academy#projects" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold rounded-lg hover:bg-orange-500/20">
                        Start a Project <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.slice(0, 4).map((s) => {
                        const cfg = submissionStatusConfig[s.status] || submissionStatusConfig['submitted'];
                        const Icon = cfg.icon;
                        return (
                          <div key={s.id} className="flex items-center justify-between p-3 bg-brand-dark/50 rounded-lg border border-white/5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${trackColors[s.track] || 'text-gray-400 bg-gray-500/10'}`}>
                                <FileText className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-white text-xs font-medium leading-snug">{s.project_title}</p>
                                <p className="text-gray-500 text-xs">{formatDate(s.submitted_at)}</p>
                              </div>
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg border ${cfg.bg} ${cfg.color}`}>
                              <Icon className="w-3 h-3" />{cfg.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Consultations */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-400" />Consultations
                    </h2>
                    <Link to="/consultation" className="text-xs text-purple-400 hover:underline">Book new →</Link>
                  </div>
                  {consultations.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm mb-4">No consultations scheduled</p>
                      <Link to="/consultation" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600">
                        Book Free Consultation <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {consultations.slice(0, 4).map((c) => (
                        <div key={c.id} className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-400/10 rounded-lg flex items-center justify-center">
                              <Video className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">{c.course_name || 'General Consultation'}</h3>
                              <p className="text-gray-500 text-xs">{c.preferred_date ? formatDate(c.preferred_date) : formatDate(c.created_at)}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${c.status === 'confirmed' ? 'text-green-400 bg-green-400/10' : c.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                            {c.status || 'pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="bg-gradient-to-br from-brand-cyan/10 to-purple-500/10 border border-white/10 rounded-xl p-6">
                  <h2 className="text-lg font-bold text-white mb-1">Level Up Your Skills</h2>
                  <p className="text-gray-400 text-sm mb-5">Take assessments, explore courses, or start a new project.</p>
                  <div className="flex flex-col gap-3">
                    <Link to="/assessment" className="flex items-center justify-between px-4 py-3 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl hover:bg-brand-cyan/20 transition-all group">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-brand-cyan" />
                        <div><p className="text-white text-sm font-semibold">AI Fluency Assessment</p><p className="text-gray-500 text-xs">Test your current level</p></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </Link>
                    <Link to="/academy#projects" className="flex items-center justify-between px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl hover:bg-orange-500/20 transition-all group">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-orange-400" />
                        <div><p className="text-white text-sm font-semibold">Start a Project</p><p className="text-gray-500 text-xs">Build your portfolio</p></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ── PROJECTS TAB ── */}
            {activeTab === 'projects' && (
              <div>
                {submissions.length === 0 ? (
                  <div className="text-center py-20 bg-brand-surface border border-white/10 rounded-2xl">
                    <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Projects Yet</h3>
                    <p className="text-gray-400 mb-6">Download a project, complete it, and submit your work here.</p>
                    <Link to="/academy#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold rounded-xl hover:bg-orange-500/20">
                      Browse Projects <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((s) => {
                      const cfg = submissionStatusConfig[s.status] || submissionStatusConfig['submitted'];
                      const Icon = cfg.icon;
                      const trackColor = trackColors[s.track] || 'text-gray-400 bg-gray-500/10';
                      return (
                        <div key={s.id} className="bg-brand-surface border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                          <div className="flex flex-col md:flex-row md:items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${trackColor}`}>
                              <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-white font-bold">{s.project_title}</h3>
                                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border ${cfg.bg} ${cfg.color}`}>
                                  <Icon className="w-3 h-3" />{cfg.label}
                                </span>
                              </div>
                              <p className="text-gray-500 text-xs mb-3">
                                Track: <span className="text-gray-300 capitalize">{s.track}</span> · Submitted {formatDate(s.submitted_at)}
                                {s.reviewed_at && ` · Reviewed ${formatDate(s.reviewed_at)}`}
                              </p>

                              {/* Instructor feedback */}
                              {s.admin_comments && (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                                    <p className="text-xs font-semibold text-emerald-400">Instructor Feedback</p>
                                  </div>
                                  <p className="text-sm text-gray-300">{s.admin_comments}</p>
                                </div>
                              )}

                              <div className="flex items-center gap-3">
                                <a href={s.file_url} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-brand-cyan hover:underline">
                                  <FileText className="w-3.5 h-3.5" />View Submission
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── TESTS TAB ── */}
            {activeTab === 'tests' && (
              <div>
                {testScores.length === 0 ? (
                  <div className="text-center py-20 bg-brand-surface border border-white/10 rounded-2xl">
                    <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Tests Taken Yet</h3>
                    <p className="text-gray-400 mb-6">Complete course assessments to track your progress and scores here.</p>
                    <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold rounded-xl hover:bg-purple-500/20">
                      Take AI Fluency Assessment <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div>
                    {/* Score summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-brand-surface border border-white/10 rounded-xl p-5 text-center">
                        <p className="text-4xl font-bold text-brand-cyan mb-1">{avgScore}%</p>
                        <p className="text-gray-400 text-sm">Average Score</p>
                      </div>
                      <div className="bg-brand-surface border border-white/10 rounded-xl p-5 text-center">
                        <p className="text-4xl font-bold text-emerald-400 mb-1">{testScores.filter((t) => t.passed).length}</p>
                        <p className="text-gray-400 text-sm">Tests Passed</p>
                      </div>
                      <div className="bg-brand-surface border border-white/10 rounded-xl p-5 text-center">
                        <p className="text-4xl font-bold text-purple-400 mb-1">{testScores.length}</p>
                        <p className="text-gray-400 text-sm">Total Tests Taken</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {testScores.map((t) => {
                        const pct = Math.round((t.score / t.max_score) * 100);
                        return (
                          <div key={t.id} className="bg-brand-surface border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <h3 className="text-white font-bold text-sm">{t.test_name}</h3>
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.passed ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                                    {t.passed ? 'Passed' : 'Failed'}
                                  </span>
                                </div>
                                <p className="text-gray-500 text-xs">
                                  {t.course} · Taken {formatDate(t.taken_at)}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-white">{pct}%</p>
                                  <p className="text-xs text-gray-500">{t.score}/{t.max_score}</p>
                                </div>
                                <div className="w-16 h-16 relative">
                                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                    <circle cx="18" cy="18" r="15.9" fill="none"
                                      stroke={t.passed ? '#34d399' : '#f87171'}
                                      strokeWidth="2"
                                      strokeDasharray={`${pct} 100`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">{pct}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
