/**
 * Admin Service - Backend API for Admin Portal
 * Handles courses, plans, settings, leads, and audit logging
 */

import supabase from '../lib/supabase';

// ============================================
// TYPES
// ============================================

export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    level: string;
    tags: string[];
    duration: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    threshold_score: number;
    plan_type: 'basic' | 'advanced';
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface SiteSetting {
    id: string;
    key: string;
    value: Record<string, unknown>;
    category: string;
    description: string;
    updated_by: string;
    updated_at: string;
}

export interface AuditLog {
    id: string;
    admin_id: string;
    admin_email: string;
    action: string;
    entity: string;
    entity_id: string;
    old_value: Record<string, unknown>;
    new_value: Record<string, unknown>;
    metadata: Record<string, unknown>;
    created_at: string;
}

export interface Lead {
    id: string;
    email: string;
    source: string;
    assessment_score: number;
    recommended_plan: string;
    status: string;
    created_at: string;
}

export interface AdminStats {
    totalLeads: number;
    newLeadsToday: number;
    totalRevenue: number;
    conversionRate: number;
    activeCourses: number;
}

// ============================================
// AUDIT LOGGING
// ============================================

export async function logAdminAction(
    action: string,
    entity: string,
    entityId: string,
    oldValue?: Record<string, unknown>,
    newValue?: Record<string, unknown>,
    metadata?: Record<string, unknown>
): Promise<void> {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        await supabase.from('admin_audit_logs').insert({
            admin_id: user?.id,
            admin_email: user?.email,
            action,
            entity,
            entity_id: entityId,
            old_value: oldValue || null,
            new_value: newValue || null,
            metadata: metadata || null,
        });
    } catch (error) {
        console.error('Failed to log admin action:', error);
    }
}

// ============================================
// COURSES
// ============================================

export async function getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching courses:', error);
        return [];
    }

    return data || [];
}

export async function updateCourse(
    id: string,
    updates: Partial<Course>
): Promise<Course | null> {
    // Get old value for audit log
    const { data: oldCourse } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

    const { data, error } = await supabase
        .from('courses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating course:', error);
        return null;
    }

    // Log the action
    await logAdminAction('UPDATE_COURSE', 'courses', id, oldCourse, data);

    return data;
}

export async function createCourse(course: Omit<Course, 'created_at' | 'updated_at'>): Promise<Course | null> {
    const { data, error } = await supabase
        .from('courses')
        .insert(course)
        .select()
        .single();

    if (error) {
        console.error('Error creating course:', error);
        return null;
    }

    await logAdminAction('CREATE_COURSE', 'courses', data.id, undefined, data);

    return data;
}

export async function deleteCourse(id: string): Promise<boolean> {
    const { data: oldCourse } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting course:', error);
        return false;
    }

    await logAdminAction('DELETE_COURSE', 'courses', id, oldCourse);

    return true;
}

// ============================================
// PLANS
// ============================================

export async function getPlans(): Promise<Plan[]> {
    const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('threshold_score', { ascending: true });

    if (error) {
        console.error('Error fetching plans:', error);
        return [];
    }

    return data || [];
}

export async function updatePlan(
    id: string,
    updates: Partial<Plan>
): Promise<Plan | null> {
    const { data: oldPlan } = await supabase
        .from('plans')
        .select('*')
        .eq('id', id)
        .single();

    const { data, error } = await supabase
        .from('plans')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating plan:', error);
        return null;
    }

    await logAdminAction('UPDATE_PLAN', 'plans', id, oldPlan, data);

    return data;
}

// ============================================
// SITE SETTINGS
// ============================================

export async function getSettings(category?: string): Promise<SiteSetting[]> {
    let query = supabase.from('site_settings').select('*');

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query.order('key');

    if (error) {
        console.error('Error fetching settings:', error);
        return [];
    }

    return data || [];
}

export async function getSetting(key: string): Promise<unknown> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error || !data) {
        return null;
    }

    return data.value?.value;
}

export async function updateSetting(
    key: string,
    value: unknown,
    category?: string,
    description?: string
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: oldSetting } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', key)
        .single();

    const { error } = await supabase
        .from('site_settings')
        .upsert({
            key,
            value: { value },
            category: category || oldSetting?.category || 'general',
            description: description || oldSetting?.description,
            updated_by: user?.id,
            updated_at: new Date().toISOString(),
        });

    if (error) {
        console.error('Error updating setting:', error);
        return false;
    }

    await logAdminAction('UPDATE_SETTING', 'site_settings', key, oldSetting, { key, value });

    return true;
}

// ============================================
// LEADS MANAGEMENT
// ============================================

export async function getLeads(
    filters?: {
        status?: string;
        source?: string;
        search?: string;
        limit?: number;
        offset?: number;
    }
): Promise<{ leads: Lead[]; total: number }> {
    let query = supabase
        .from('leads')
        .select('*', { count: 'exact' });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }
    if (filters?.source) {
        query = query.eq('source', filters.source);
    }
    if (filters?.search) {
        query = query.ilike('email', `%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });

    if (filters?.limit) {
        query = query.limit(filters.limit);
    }
    if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching leads:', error);
        return { leads: [], total: 0 };
    }

    return { leads: data || [], total: count || 0 };
}

export async function updateLeadStatus(
    id: string,
    status: string
): Promise<boolean> {
    const { data: oldLead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

    const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        console.error('Error updating lead status:', error);
        return false;
    }

    await logAdminAction('UPDATE_LEAD_STATUS', 'leads', id, { status: oldLead?.status }, { status });

    return true;
}

export async function exportLeadsCSV(): Promise<string> {
    const { leads } = await getLeads({ limit: 10000 });

    const headers = ['Email', 'Source', 'Score', 'Plan', 'Status', 'Created'];
    const rows = leads.map(lead => [
        lead.email,
        lead.source,
        lead.assessment_score?.toString() || '',
        lead.recommended_plan || '',
        lead.status,
        new Date(lead.created_at).toLocaleDateString(),
    ]);

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    return csv;
}

// ============================================
// ANALYTICS
// ============================================

export async function getAdminStats(): Promise<AdminStats> {
    // Total leads
    const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

    // New leads today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: newLeadsToday } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

    // Total revenue (from purchases)
    const { data: purchases } = await supabase
        .from('purchases')
        .select('amount')
        .eq('payment_status', 'completed');

    const totalRevenue = purchases?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    // Conversion rate
    const { count: convertedLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'converted');

    const conversionRate = totalLeads ? ((convertedLeads || 0) / totalLeads) * 100 : 0;

    // Active courses
    const { count: activeCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

    return {
        totalLeads: totalLeads || 0,
        newLeadsToday: newLeadsToday || 0,
        totalRevenue,
        conversionRate: Math.round(conversionRate * 10) / 10,
        activeCourses: activeCourses || 0,
    };
}

// ============================================
// AUDIT LOGS
// ============================================

export async function getAuditLogs(
    limit = 50,
    offset = 0
): Promise<AuditLog[]> {
    const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching audit logs:', error);
        return [];
    }

    return data || [];
}
