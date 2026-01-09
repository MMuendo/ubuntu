/**
 * usePlans Hook - Fetches assessment plans from Supabase with fallback to constants
 */

import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { PLANS as FALLBACK_PLANS } from '../constants';

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    threshold_score: number;
    plan_type: 'basic' | 'advanced';
    is_active: boolean;
}

export function usePlans() {
    const [plans, setPlans] = useState<{ basic: Plan | null; advanced: Plan | null }>({
        basic: null,
        advanced: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error: dbError } = await supabase
                .from('plans')
                .select('*')
                .eq('is_active', true)
                .order('threshold_score', { ascending: true });

            if (dbError) {
                console.warn('Failed to fetch plans from DB, using fallback:', dbError);
                useFallbackPlans();
            } else if (data && data.length > 0) {
                const basic = data.find(p => p.plan_type === 'basic') || data[0];
                const advanced = data.find(p => p.plan_type === 'advanced') || data[data.length - 1];
                setPlans({ basic, advanced });
            } else {
                useFallbackPlans();
            }
        } catch (err) {
            console.error('Error fetching plans:', err);
            setError('Failed to load plans');
            useFallbackPlans();
        }

        setLoading(false);
    };

    const useFallbackPlans = () => {
        setPlans({
            basic: {
                id: FALLBACK_PLANS.BASIC.id,
                name: FALLBACK_PLANS.BASIC.name,
                description: FALLBACK_PLANS.BASIC.description,
                price: FALLBACK_PLANS.BASIC.price,
                currency: 'KES',
                threshold_score: 0,
                plan_type: 'basic',
                is_active: true,
            },
            advanced: {
                id: FALLBACK_PLANS.ADVANCED.id,
                name: FALLBACK_PLANS.ADVANCED.name,
                description: FALLBACK_PLANS.ADVANCED.description,
                price: FALLBACK_PLANS.ADVANCED.price,
                currency: 'KES',
                threshold_score: 70,
                plan_type: 'advanced',
                is_active: true,
            },
        });
    };

    // Get recommendation based on score
    const getRecommendation = (score: number) => {
        if (!plans.basic || !plans.advanced) return null;
        const threshold = plans.advanced.threshold_score || 70;
        return score >= threshold ? plans.advanced : plans.basic;
    };

    return { plans, loading, error, refetch: fetchPlans, getRecommendation };
}

export default usePlans;
