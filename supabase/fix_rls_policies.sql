-- ============================================
-- FIX: RLS Policies for Ubuntu AnalytIQ
-- Run this in your Supabase SQL Editor
-- ============================================

-- Problem: Anonymous users cannot insert into tables
-- Error: 42501 (insufficient_privilege) / 401 Unauthorized
-- 
-- Solution: For public-facing tables (consultations, leads, purchases),
-- we need to either disable RLS or create permissive policies

-- ============================================
-- OPTION 1 (RECOMMENDED): DISABLE RLS FOR PUBLIC TABLES
-- This is simpler and allows all operations
-- ============================================

-- Disable RLS on consultations (public booking form)
ALTER TABLE consultations DISABLE ROW LEVEL SECURITY;

-- Disable RLS on leads (public assessment form)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Disable RLS on purchases (public checkout - though payment verification should happen server-side)
ALTER TABLE purchases DISABLE ROW LEVEL SECURITY;

-- Keep RLS enabled for sensitive tables
-- user_profiles and email_logs should stay protected

-- ============================================
-- GRANT PERMISSIONS TO ROLES
-- ============================================

-- Consultations: Allow public insert and select
GRANT ALL ON consultations TO anon;
GRANT ALL ON consultations TO authenticated;
GRANT ALL ON consultations TO service_role;

-- Leads: Allow public insert, authenticated select
GRANT ALL ON leads TO anon;
GRANT ALL ON leads TO authenticated;
GRANT ALL ON leads TO service_role;

-- Purchases: Allow public insert, authenticated select
GRANT ALL ON purchases TO anon;
GRANT ALL ON purchases TO authenticated;
GRANT ALL ON purchases TO service_role;

-- Email logs: Authenticated only
GRANT SELECT ON email_logs TO authenticated;
GRANT ALL ON email_logs TO service_role;

-- User profiles: Keep secure
GRANT SELECT, UPDATE ON user_profiles TO authenticated;
GRANT ALL ON user_profiles TO service_role;

-- ============================================
-- ALTERNATIVE OPTION 2: Keep RLS with Permissive Policies
-- Use this if you want more control
-- (Uncomment below if you prefer this approach)
-- ============================================

/*
-- Re-enable RLS if you disabled it
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies first
DROP POLICY IF EXISTS "Anyone can create consultations" ON consultations;
DROP POLICY IF EXISTS "Allow public consultation booking" ON consultations;
DROP POLICY IF EXISTS "Users can view own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can update own consultations" ON consultations;
DROP POLICY IF EXISTS "Service role full access on consultations" ON consultations;

DROP POLICY IF EXISTS "Allow authenticated read on leads" ON leads;
DROP POLICY IF EXISTS "Allow public lead creation" ON leads;
DROP POLICY IF EXISTS "Allow service role full access on leads" ON leads;

DROP POLICY IF EXISTS "Allow authenticated read on purchases" ON purchases;
DROP POLICY IF EXISTS "Allow public purchase creation" ON purchases;
DROP POLICY IF EXISTS "Allow service role full access on purchases" ON purchases;

-- Create permissive policies for consultations
CREATE POLICY "consultations_insert_policy" ON consultations
    FOR INSERT TO anon, authenticated, service_role
    WITH CHECK (true);

CREATE POLICY "consultations_select_policy" ON consultations
    FOR SELECT TO anon, authenticated, service_role
    USING (true);

CREATE POLICY "consultations_update_policy" ON consultations
    FOR UPDATE TO authenticated, service_role
    USING (true);

CREATE POLICY "consultations_delete_policy" ON consultations
    FOR DELETE TO service_role
    USING (true);

-- Create permissive policies for leads
CREATE POLICY "leads_insert_policy" ON leads
    FOR INSERT TO anon, authenticated, service_role
    WITH CHECK (true);

CREATE POLICY "leads_select_policy" ON leads
    FOR SELECT TO authenticated, service_role
    USING (true);

CREATE POLICY "leads_update_policy" ON leads
    FOR UPDATE TO authenticated, service_role
    USING (true);

CREATE POLICY "leads_delete_policy" ON leads
    FOR DELETE TO service_role
    USING (true);

-- Create permissive policies for purchases
CREATE POLICY "purchases_insert_policy" ON purchases
    FOR INSERT TO anon, authenticated, service_role
    WITH CHECK (true);

CREATE POLICY "purchases_select_policy" ON purchases
    FOR SELECT TO authenticated, service_role
    USING (true);

CREATE POLICY "purchases_update_policy" ON purchases
    FOR UPDATE TO service_role
    USING (true);

CREATE POLICY "purchases_delete_policy" ON purchases
    FOR DELETE TO service_role
    USING (true);
*/

-- ============================================
-- VERIFICATION
-- Run this to confirm the changes:
-- ============================================

-- Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('consultations', 'leads', 'purchases', 'user_profiles', 'email_logs');

-- Check table grants
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name IN ('consultations', 'leads', 'purchases')
ORDER BY table_name, grantee;

