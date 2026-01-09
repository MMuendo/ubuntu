import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    DollarSign,
    Users,
    Settings,
    TrendingUp,
    Activity,
    BookOpen,
    Clock
} from 'lucide-react';
import { getAdminStats, getAuditLogs, AdminStats, AuditLog } from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [statsData, logsData] = await Promise.all([
                getAdminStats(),
                getAuditLogs(10)
            ]);
            setStats(statsData);
            setRecentLogs(logsData);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
        setLoading(false);
    };

    const adminLinks = [
        { path: '/admin/pricing', label: 'Pricing Manager', icon: DollarSign, description: 'Manage course and plan pricing' },
        { path: '/admin/leads', label: 'Leads Manager', icon: Users, description: 'View and manage leads' },
        { path: '/admin/settings', label: 'Settings', icon: Settings, description: 'System configuration' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-dark">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <LayoutDashboard className="w-8 h-8 text-brand-cyan" />
                        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <p className="text-gray-400">Manage your platform settings, pricing, and leads</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-8 h-8 text-brand-cyan" />
                            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                +{stats?.newLeadsToday || 0} today
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats?.totalLeads || 0}</div>
                        <div className="text-sm text-gray-400">Total Leads</div>
                    </div>

                    <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            KES {(stats?.totalRevenue || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Total Revenue</div>
                    </div>

                    <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <TrendingUp className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats?.conversionRate || 0}%</div>
                        <div className="text-sm text-gray-400">Conversion Rate</div>
                    </div>

                    <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <BookOpen className="w-8 h-8 text-orange-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats?.activeCourses || 0}</div>
                        <div className="text-sm text-gray-400">Active Courses</div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="bg-brand-surface border border-white/10 rounded-xl p-6 hover:border-brand-cyan/50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-cyan/10 rounded-lg group-hover:bg-brand-cyan/20 transition-colors">
                                    <link.icon className="w-6 h-6 text-brand-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-brand-cyan transition-colors">
                                        {link.label}
                                    </h3>
                                    <p className="text-sm text-gray-400">{link.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="w-5 h-5 text-brand-cyan" />
                        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                    </div>

                    {recentLogs.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No recent activity</p>
                    ) : (
                        <div className="space-y-4">
                            {recentLogs.map((log) => (
                                <div key={log.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                                    <div className="p-2 bg-brand-cyan/10 rounded">
                                        <Clock className="w-4 h-4 text-brand-cyan" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-medium">{log.action.replace('_', ' ')}</span>
                                            <span className="text-xs text-gray-500">•</span>
                                            <span className="text-xs text-gray-400">{log.entity}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {log.admin_email} • {new Date(log.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
