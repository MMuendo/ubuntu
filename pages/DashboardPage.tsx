import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Calendar,
    Award,
    Clock,
    CheckCircle,
    ArrowRight,
    Loader2,
    GraduationCap,
    Video,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

interface Purchase {
    id: string;
    product_id: string;
    product_name: string;
    amount: number;
    currency: string;
    payment_status: string;
    created_at: string;
}

interface Consultation {
    id: string;
    course_name: string;
    preferred_date: string;
    preferred_time: string;
    status: string;
    created_at: string;
}

/**
 * Student Dashboard - Shows enrolled courses, consultations, and progress
 */
const DashboardPage: React.FC = () => {
    const { user, profile } = useAuth();
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user's purchases and consultations
    useEffect(() => {
        async function fetchUserData() {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                // Fetch purchases
                const { data: purchaseData, error: purchaseError } = await supabase
                    .from('purchases')
                    .select('*, leads!inner(email)')
                    .eq('leads.email', user.email)
                    .eq('payment_status', 'completed')
                    .order('created_at', { ascending: false });

                if (purchaseError) throw purchaseError;
                setPurchases(purchaseData || []);

                // Fetch consultations
                const { data: consultationData, error: consultationError } = await supabase
                    .from('consultations')
                    .select('*')
                    .eq('email', user.email)
                    .order('created_at', { ascending: false });

                if (consultationError) throw consultationError;
                setConsultations(consultationData || []);

            } catch (err: any) {
                console.error('Error fetching user data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [user?.email]);

    // Get display name
    const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student';

    // Format date
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'confirmed':
                return 'text-green-400 bg-green-400/10';
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/10';
            case 'cancelled':
                return 'text-red-400 bg-red-400/10';
            default:
                return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        Welcome back, <span className="text-brand-cyan">{displayName}</span>! 👋
                    </h1>
                    <p className="text-gray-400">
                        Track your learning journey and upcoming sessions
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 text-brand-cyan" />
                                    <span className="text-xs text-gray-400">Enrolled Courses</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{purchases.length}</p>
                            </div>
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-purple-400" />
                                    <span className="text-xs text-gray-400">Consultations</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{consultations.length}</p>
                            </div>
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-xs text-gray-400">Completed</span>
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    {consultations.filter(c => c.status === 'completed').length}
                                </p>
                            </div>
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-yellow-400" />
                                    <span className="text-xs text-gray-400">Pending</span>
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    {consultations.filter(c => c.status === 'pending').length}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* My Courses */}
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5 text-brand-cyan" />
                                        My Courses
                                    </h2>
                                    <Link to="/" className="text-xs text-brand-cyan hover:underline">
                                        Browse more →
                                    </Link>
                                </div>

                                {purchases.length === 0 ? (
                                    <div className="text-center py-8">
                                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm mb-4">
                                            You haven't enrolled in any courses yet
                                        </p>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark text-sm font-semibold rounded-lg hover:bg-brand-cyan/90"
                                        >
                                            Explore Courses
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {purchases.map((purchase) => (
                                            <div
                                                key={purchase.id}
                                                className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-brand-cyan/10 rounded-lg flex items-center justify-center">
                                                        <Video className="w-5 h-5 text-brand-cyan" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium text-sm">
                                                            {purchase.product_name}
                                                        </h3>
                                                        <p className="text-gray-500 text-xs">
                                                            Enrolled {formatDate(purchase.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1.5 bg-brand-cyan/10 text-brand-cyan text-xs font-medium rounded-lg hover:bg-brand-cyan/20 transition-colors">
                                                    Access
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* My Consultations */}
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-purple-400" />
                                        My Consultations
                                    </h2>
                                    <Link to="/consultation" className="text-xs text-purple-400 hover:underline">
                                        Book new →
                                    </Link>
                                </div>

                                {consultations.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm mb-4">
                                            No consultations scheduled
                                        </p>
                                        <Link
                                            to="/consultation"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600"
                                        >
                                            Book Free Consultation
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {consultations.slice(0, 5).map((consultation) => (
                                            <div
                                                key={consultation.id}
                                                className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-400/10 rounded-lg flex items-center justify-center">
                                                        <Video className="w-5 h-5 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium text-sm">
                                                            {consultation.course_name || 'General Consultation'}
                                                        </h3>
                                                        <p className="text-gray-500 text-xs">
                                                            {consultation.preferred_date
                                                                ? formatDate(consultation.preferred_date)
                                                                : formatDate(consultation.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(consultation.status)}`}>
                                                    {consultation.status || 'pending'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 bg-gradient-to-r from-brand-cyan/10 to-purple-500/10 border border-white/10 rounded-xl p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-white mb-1">
                                        Ready to level up your skills?
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        Take our AI fluency assessment or explore new courses
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        to="/assessment"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark text-sm font-semibold rounded-lg hover:bg-brand-cyan/90"
                                    >
                                        <Award className="w-4 h-4" />
                                        Take Assessment
                                    </Link>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/5"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Browse Courses
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
