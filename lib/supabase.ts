import { createClient } from '@supabase/supabase-js';
import config from '../config';

// Create Supabase client for client-side operations
// If credentials are missing, create a mock client that won't crash the app
const supabaseUrl = config.supabaseUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey = config.supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Warn if using placeholder credentials
if (!config.supabaseUrl || !config.supabaseAnonKey) {
    console.warn('⚠️  Supabase credentials not configured. Authentication features will not work.');
    console.warn('📝 Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local');
}

// Database Types
export interface Lead {
    id: string;
    email: string;
    source: 'assessment' | 'checkout' | 'contact' | 'chat';
    assessment_score?: number;
    assessment_answers?: any;
    recommended_plan?: string;
    selected_product?: string;
    status: 'new' | 'contacted' | 'converted' | 'lost';
    tags?: string[];
    metadata?: any;
    created_at: string;
    updated_at: string;
}

export interface Purchase {
    id: string;
    lead_id: string;
    product_id: string;
    product_name: string;
    amount: number;
    currency: 'KES' | 'USD';
    payment_method: 'mpesa' | 'card';
    payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
    transaction_id?: string;
    metadata?: any;
    created_at: string;
    updated_at: string;
}

export interface EmailLog {
    id: string;
    lead_id: string;
    email_type: 'assessment_result' | 'purchase_confirmation' | 'nurture' | 'abandoned_cart';
    subject: string;
    sent_at: string;
    opened_at?: string;
    clicked_at?: string;
    metadata?: any;
}

// Helper functions
export async function createLead(data: Partial<Lead>) {
    const { data: lead, error } = await supabase
        .from('leads')
        .insert({
            email: data.email,
            source: data.source,
            assessment_score: data.assessment_score,
            assessment_answers: data.assessment_answers,
            recommended_plan: data.recommended_plan,
            selected_product: data.selected_product,
            status: 'new',
            tags: data.tags || [],
            metadata: data.metadata || {},
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating lead:', error);
        throw error;
    }

    return lead;
}

export async function getLeadByEmail(email: string) {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('email', email)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching lead:', error);
        throw error;
    }

    return data;
}

export async function updateLead(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
        .from('leads')
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating lead:', error);
        throw error;
    }

    return data;
}

export async function logEmail(data: Omit<EmailLog, 'id' | 'sent_at'>) {
    const { data: log, error } = await supabase
        .from('email_logs')
        .insert({
            ...data,
            sent_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        console.error('Error logging email:', error);
        throw error;
    }

    return log;
}

// ============================================
// PURCHASE HELPERS
// ============================================

/**
 * Create a new purchase record
 */
export async function createPurchase(data: {
    email: string;
    productId: string;
    productName: string;
    amount: number;
    currency: 'KES' | 'USD';
    paymentMethod: 'mpesa' | 'card';
    transactionId: string;
}) {
    // First, get or create the lead
    let lead = await getLeadByEmail(data.email);

    if (!lead) {
        lead = await createLead({
            email: data.email,
            source: 'checkout',
            selected_product: data.productName,
        });
    }

    const { data: purchase, error } = await supabase
        .from('purchases')
        .insert({
            lead_id: lead.id,
            product_id: data.productId,
            product_name: data.productName,
            amount: data.amount,
            currency: data.currency,
            payment_method: data.paymentMethod,
            payment_status: 'completed',
            transaction_id: data.transactionId,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating purchase:', error);
        throw error;
    }

    // Update lead status to converted
    await updateLead(lead.id, { status: 'converted' });

    return purchase;
}

/**
 * Get purchases by email
 */
export async function getPurchasesByEmail(email: string) {
    // First get the lead
    const lead = await getLeadByEmail(email);
    if (!lead) return [];

    const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('lead_id', lead.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching purchases:', error);
        throw error;
    }

    return data || [];
}

// ============================================
// AUTHENTICATION HELPERS
// ============================================

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    role: 'user' | 'admin';
    metadata?: any;
    created_at: string;
    updated_at: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName || '',
            },
        },
    });

    if (error) {
        console.error('Error signing up:', error);
        throw error;
    }

    return data;
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Error signing in:', error);
        throw error;
    }

    return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}

/**
 * Request password reset email
 */
export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
}

/**
 * Update user password (after reset)
 */
export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}

/**
 * Get current session
 */
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error('Error getting session:', error);
        throw error;
    }

    return data.session;
}

/**
 * Get current user profile
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        throw error;
    }

    return data;
}

// ============================================
// CONSULTATION HELPERS
// ============================================

export interface Consultation {
    id: string;
    email: string;
    name: string;
    phone?: string;
    course_id?: string;
    course_name?: string;
    consultation_type: 'course_specific' | 'general' | 'custom';
    preferred_date?: string;
    preferred_time?: string;
    timezone?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    calendly_event_id?: string;
    calendly_event_url?: string;
    metadata?: any;
    created_at: string;
    updated_at: string;
}

/**
 * Create a new consultation booking
 */
export async function createConsultation(data: Partial<Consultation>) {
    const { data: consultation, error } = await supabase
        .from('consultations')
        .insert({
            email: data.email,
            name: data.name,
            phone: data.phone,
            course_id: data.course_id,
            course_name: data.course_name,
            consultation_type: data.consultation_type || 'course_specific',
            preferred_date: data.preferred_date,
            preferred_time: data.preferred_time,
            timezone: data.timezone || 'Africa/Nairobi',
            status: 'pending',
            notes: data.notes,
            calendly_event_id: data.calendly_event_id,
            calendly_event_url: data.calendly_event_url,
            metadata: data.metadata || {},
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating consultation:', error);
        throw error;
    }

    return consultation;
}

/**
 * Get consultations by email
 */
export async function getConsultationsByEmail(email: string) {
    const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching consultations:', error);
        throw error;
    }

    return data;
}

export default supabase;
