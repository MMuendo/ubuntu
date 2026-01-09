-- ============================================
-- ADMIN PORTAL DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Courses Table (Dynamic Pricing)
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KES',
  level VARCHAR(50),
  tags TEXT[],
  duration VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Plans Table (Assessment Recommendation Plans)
CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KES',
  threshold_score INTEGER DEFAULT 70,
  plan_type VARCHAR(50) DEFAULT 'basic', -- 'basic' or 'advanced'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Site Settings Table (System Configuration)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category VARCHAR(100),
  description TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster category lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

-- 4. Admin Audit Logs Table (Action Tracking)
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id),
  admin_email VARCHAR(255),
  action VARCHAR(100) NOT NULL,
  entity VARCHAR(100),
  entity_id VARCHAR(255),
  old_value JSONB,
  new_value JSONB,
  metadata JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster audit queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON admin_audit_logs(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON admin_audit_logs(created_at DESC);

-- 5. Blog Posts Table (Content Management Placeholder)
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  author VARCHAR(255),
  image_url TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Assessment Questions Table (Content Management Placeholder)
CREATE TABLE IF NOT EXISTS assessment_questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of option strings
  correct_index INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'Intermediate' or 'Advanced'
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all admin tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Courses: Public read, Admin write
CREATE POLICY "Anyone can view active courses" ON courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage all courses" ON courses
  FOR ALL USING (is_admin());

-- Plans: Public read, Admin write
CREATE POLICY "Anyone can view active plans" ON plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage all plans" ON plans
  FOR ALL USING (is_admin());

-- Site Settings: Admin only
CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (is_admin());

-- Audit Logs: Admin read only (no delete/update for integrity)
CREATE POLICY "Admins can view audit logs" ON admin_audit_logs
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can insert audit logs" ON admin_audit_logs
  FOR INSERT WITH CHECK (is_admin());

-- Blog Posts: Public read published, Admin write
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all posts" ON blog_posts
  FOR ALL USING (is_admin());

-- Assessment Questions: Public read active, Admin write
CREATE POLICY "Anyone can view active questions" ON assessment_questions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage questions" ON assessment_questions
  FOR ALL USING (is_admin());

-- ============================================
-- SEED DATA (Initial Courses & Plans)
-- ============================================

-- Insert initial courses from constants
INSERT INTO courses (id, title, description, price, level, tags, duration) VALUES
  ('excel-workshop', 'Excel Workshop', 'Master advanced Excel functions, pivot tables, and data visualization techniques. Includes 3 months access, personalized playbook mastery, weekly mentorship check-ins, private WhatsApp community, and practical weekly tasks.', 20000, 'Beginner', ARRAY['Data Analysis', 'Productivity', '3 Months'], '3 months'),
  ('powerbi-workshop', 'Excel & Power BI Hybrid', 'Bridge the gap between spreadsheets and modern business intelligence dashboards. Includes 3 months access, personalized playbook mastery, weekly mentorship check-ins, private WhatsApp community, and practical weekly tasks.', 25000, 'Intermediate', ARRAY['BI', 'Visualization', '3 Months'], '3 months'),
  ('ai-agents-masterclass', 'AI Agents Masterclass', 'Learn to design and deploy autonomous AI agents for business automation. Includes n8n Automation, APIs, Agentic Workflows, weekly mentorship check-ins, private WhatsApp community, and practical weekly tasks.', 12500, 'Advanced', ARRAY['Agentic AI', 'Automation', '1 Month'], '1 month'),
  ('ai-mastery', 'AI Mastery', 'Master AI fundamentals, prompting techniques, and ethics for modern business. Includes personalized playbook mastery, weekly mentorship check-ins, private WhatsApp community, and practical weekly tasks.', 7500, 'Intermediate', ARRAY['AI Fluency', 'Prompting', '1 Month'], '1 month')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  level = EXCLUDED.level,
  tags = EXCLUDED.tags,
  duration = EXCLUDED.duration,
  updated_at = NOW();

-- Insert initial plans
INSERT INTO plans (id, name, description, price, threshold_score, plan_type) VALUES
  ('ai-mastery-plan', 'AI Mastery Plan', 'Master AI fundamentals, prompting techniques, and ethics. Includes weekly mentorship check-ins and WhatsApp community access.', 7500, 0, 'basic'),
  ('ai-agents-plan', 'AI Agents Mastery Plan', 'Design and deploy autonomous AI agents with n8n automation, APIs, and agentic workflows. Includes weekly mentorship and WhatsApp community.', 12500, 70, 'advanced')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  threshold_score = EXCLUDED.threshold_score,
  plan_type = EXCLUDED.plan_type,
  updated_at = NOW();

-- Insert default site settings
INSERT INTO site_settings (key, value, category, description) VALUES
  ('assessment_threshold', '{"value": 70}', 'assessment', 'Score threshold for advanced plan recommendation'),
  ('contact_phone', '{"value": "+254706719457"}', 'contact', 'Primary contact phone number'),
  ('contact_email', '{"value": "hello@ubuntuanalytiq.com"}', 'contact', 'Primary contact email'),
  ('whatsapp_number', '{"value": "+254706719457"}', 'contact', 'WhatsApp contact number'),
  ('paystack_enabled', '{"value": true}', 'payment', 'Enable/disable Paystack payments'),
  ('mpesa_enabled', '{"value": false}', 'payment', 'Enable/disable M-Pesa payments')
ON CONFLICT (key) DO NOTHING;
