-- Ubuntu AnalytIQ Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(50) NOT NULL CHECK (source IN ('assessment', 'checkout', 'contact', 'chat')),
  assessment_score INTEGER CHECK (assessment_score >= 0 AND assessment_score <= 100),
  assessment_answers JSONB,
  recommended_plan VARCHAR(100),
  selected_product VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  tags TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL CHECK (currency IN ('KES', 'USD')),
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('mpesa', 'card')),
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id VARCHAR(255),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  email_type VARCHAR(100) NOT NULL CHECK (email_type IN ('assessment_result', 'purchase_confirmation', 'nurture', 'abandoned_cart')),
  subject VARCHAR(255) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_lead_id ON purchases(lead_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(payment_status);
CREATE INDEX IF NOT EXISTS idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at
    BEFORE UPDATE ON purchases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all data
CREATE POLICY "Allow authenticated read access" ON leads
    FOR SELECT
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated read access" ON purchases
    FOR SELECT
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated read access" ON email_logs
    FOR SELECT
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Policy: Allow service role to insert/update/delete
CREATE POLICY "Allow service role full access" ON leads
    FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON purchases
    FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON email_logs
    FOR ALL
    USING (auth.role() = 'service_role');

-- Views for analytics
CREATE OR REPLACE VIEW lead_funnel_stats AS
SELECT
    DATE_TRUNC('day', created_at) as date,
    source,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
    COUNT(*) FILTER (WHERE assessment_score >= 75) as high_score_leads,
    AVG(assessment_score) as avg_score
FROM leads
WHERE assessment_score IS NOT NULL
GROUP BY DATE_TRUNC('day', created_at), source
ORDER BY date DESC;

CREATE OR REPLACE VIEW revenue_stats AS
SELECT
    DATE_TRUNC('day', p.created_at) as date,
    p.currency,
    COUNT(*) as total_purchases,
    SUM(p.amount) as total_revenue,
    AVG(p.amount) as avg_order_value,
    COUNT(*) FILTER (WHERE p.payment_status = 'completed') as completed_purchases,
    SUM(p.amount) FILTER (WHERE p.payment_status = 'completed') as completed_revenue
FROM purchases p
GROUP BY DATE_TRUNC('day', p.created_at), p.currency
ORDER BY date DESC;

-- Grant access to views
GRANT SELECT ON lead_funnel_stats TO authenticated, service_role;
GRANT SELECT ON revenue_stats TO authenticated, service_role;

-- ============================================
-- USER PROFILES & AUTHENTICATION
-- ============================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS policies for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Service role can do everything
CREATE POLICY "Service role full access on profiles" ON user_profiles
  FOR ALL
  USING (auth.role() = 'service_role');

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- ============================================
-- CONSULTATIONS & BOOKINGS
-- ============================================

-- Consultations table for course enrollment consultations
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  course_id VARCHAR(100),
  course_name VARCHAR(255),
  consultation_type VARCHAR(50) NOT NULL DEFAULT 'course_specific' CHECK (consultation_type IN ('course_specific', 'general', 'custom')),
  preferred_date TIMESTAMP WITH TIME ZONE,
  preferred_time TIME,
  timezone VARCHAR(50) DEFAULT 'Africa/Nairobi',
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  calendly_event_id VARCHAR(255),
  calendly_event_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for consultations
CREATE INDEX IF NOT EXISTS idx_consultations_email ON consultations(email);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(preferred_date);
CREATE INDEX IF NOT EXISTS idx_consultations_course ON consultations(course_id);

-- Auto-update trigger
CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS policies for consultations
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Users can view their own consultations
CREATE POLICY "Users can view own consultations" ON consultations
  FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.role() = 'authenticated');

-- Anyone can create consultations (public booking)
CREATE POLICY "Anyone can create consultations" ON consultations
  FOR INSERT
  WITH CHECK (true);

-- Users can update their own consultations
CREATE POLICY "Users can update own consultations" ON consultations
  FOR UPDATE
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Service role full access
CREATE POLICY "Service role full access on consultations" ON consultations
  FOR ALL
  USING (auth.role() = 'service_role');

