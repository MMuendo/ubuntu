import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface DashboardStats {
    totalLeads: number;
    conversions: number;
    conversionRate: number;
    emailsSent: number;
    totalRevenue: number;
    currency: string;
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch dashboard statistics from Supabase
 */
export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats>({
        totalLeads: 0,
        conversions: 0,
        conversionRate: 0,
        emailsSent: 0,
        totalRevenue: 0,
        currency: 'KES',
        loading: true,
        error: null,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                // Fetch leads count
                const { count: leadsCount, error: leadsError } = await supabase
                    .from('leads')
                    .select('*', { count: 'exact', head: true });

                if (leadsError) throw leadsError;

                // Fetch conversions count
                const { count: conversionsCount, error: convError } = await supabase
                    .from('leads')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'converted');

                if (convError) throw convError;

                // Fetch emails sent count
                const { count: emailsCount, error: emailsError } = await supabase
                    .from('email_logs')
                    .select('*', { count: 'exact', head: true });

                if (emailsError) throw emailsError;

                // Fetch completed revenue
                const { data: purchases, error: purchasesError } = await supabase
                    .from('purchases')
                    .select('amount, currency')
                    .eq('payment_status', 'completed');

                if (purchasesError) throw purchasesError;

                const totalRevenue = purchases?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
                const currency = purchases?.[0]?.currency || 'KES';
                const totalLeads = leadsCount || 0;
                const conversions = conversionsCount || 0;

                setStats({
                    totalLeads,
                    conversions,
                    conversionRate: totalLeads > 0 ? Math.round((conversions / totalLeads) * 100) : 0,
                    emailsSent: emailsCount || 0,
                    totalRevenue,
                    currency,
                    loading: false,
                    error: null,
                });
            } catch (err: any) {
                console.error('Error fetching dashboard stats:', err);
                setStats(prev => ({
                    ...prev,
                    loading: false,
                    error: err.message || 'Failed to fetch statistics',
                }));
            }
        }

        fetchStats();
    }, []);

    return stats;
}

export default useDashboardStats;
