create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role' and typnamespace = 'public'::regnamespace) then
    create type public.app_role as enum ('learner', 'mentor', 'employer', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_owner_type' and typnamespace = 'public'::regnamespace) then
    create type public.subscription_owner_type as enum ('user', 'organization');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_status' and typnamespace = 'public'::regnamespace) then
    create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'review_status' and typnamespace = 'public'::regnamespace) then
    create type public.review_status as enum ('submitted', 'in_review', 'revision_requested', 'verified');
  end if;

  if not exists (select 1 from pg_type where typname = 'mentor_session_status' and typnamespace = 'public'::regnamespace) then
    create type public.mentor_session_status as enum ('requested', 'confirmed', 'completed', 'cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'ai_job_status' and typnamespace = 'public'::regnamespace) then
    create type public.ai_job_status as enum ('queued', 'running', 'completed', 'failed');
  end if;

  if not exists (select 1 from pg_type where typname = 'mentor_application_status' and typnamespace = 'public'::regnamespace) then
    create type public.mentor_application_status as enum ('pending', 'approved', 'rejected', 'suspended');
  end if;

  if not exists (select 1 from pg_type where typname = 'project_proposal_status' and typnamespace = 'public'::regnamespace) then
    create type public.project_proposal_status as enum ('draft', 'submitted', 'approved', 'needs_changes', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'mentor_credit_status' and typnamespace = 'public'::regnamespace) then
    create type public.mentor_credit_status as enum ('pending', 'approved', 'rejected', 'paid');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  password_hash text not null,
  default_role public.app_role not null default 'learner',
  avatar_url text,
  email_confirmed_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.auth_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists auth_sessions_user_id_idx on public.auth_sessions (user_id);
create index if not exists auth_sessions_token_hash_idx on public.auth_sessions (token_hash);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'employer',
  created_at timestamptz not null default now()
);

create table if not exists public.role_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  role public.app_role not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (user_id, organization_id, role)
);

create unique index if not exists role_memberships_user_role_no_org_idx
  on public.role_memberships (user_id, role)
  where organization_id is null;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  source text not null default 'site',
  assessment_score integer check (assessment_score between 0 and 100),
  assessment_answers jsonb not null default '[]'::jsonb,
  recommended_course_slug text,
  selected_product text,
  status text not null default 'new',
  tags text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads add column if not exists full_name text;
alter table public.leads add column if not exists source text not null default 'site';
alter table public.leads add column if not exists assessment_score integer check (assessment_score between 0 and 100);
alter table public.leads add column if not exists assessment_answers jsonb not null default '[]'::jsonb;
alter table public.leads add column if not exists recommended_course_slug text;
alter table public.leads add column if not exists selected_product text;
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists tags text[] not null default '{}';
alter table public.leads add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.leads add column if not exists updated_at timestamptz not null default now();

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_status_idx on public.leads (status);

create table if not exists public.learner_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  phone text not null,
  country text not null,
  time_zone text not null,
  institution text,
  skill_level text,
  interests text[] not null default '{}',
  learning_goal text not null,
  availability text[] not null default '{}',
  age_bracket text,
  guardian_contact text,
  onboarding_complete boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.mentor_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  title text not null,
  company text,
  location text,
  bio text,
  specialties text[] not null default '{}',
  verification_status text not null default 'pending',
  rating numeric(3, 2) not null default 0
);

create table if not exists public.mentor_applications (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null unique references public.mentor_profiles(id) on delete cascade,
  professional_title text not null,
  years_experience integer not null default 0 check (years_experience >= 0),
  links jsonb not null default '{}'::jsonb,
  motivation text,
  availability text[] not null default '{}',
  status public.mentor_application_status not null default 'pending',
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  role text not null,
  name text not null,
  price_kes integer not null,
  interval text not null,
  paystack_plan_code text not null,
  is_active boolean not null default true,
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  course_type text not null default 'course',
  level text not null,
  duration text not null,
  price_kes integer not null,
  mentor_id uuid references public.mentor_profiles(id),
  summary text not null,
  start_date date,
  display_order integer not null default 100,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.courses add column if not exists course_type text not null default 'course';
alter table public.courses add column if not exists start_date date;
alter table public.courses add column if not exists display_order integer not null default 100;
alter table public.courses add column if not exists is_active boolean not null default true;
create index if not exists courses_active_display_idx on public.courses (is_active, display_order);

create table if not exists public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  track text not null default 'practice-labs',
  source_project_id text,
  company_context text not null,
  company_tag text,
  level text not null default 'Beginner',
  estimated_time text,
  skills text[] not null default '{}',
  learning_outcome text,
  data_source text,
  summary text not null default '',
  dataset_path text,
  walkthrough_path text,
  task_path text,
  rubric jsonb not null default '[]'::jsonb,
  deliverables jsonb not null default '[]'::jsonb,
  score_bands jsonb not null default '[]'::jsonb,
  feedback text not null default '',
  display_order integer not null default 100,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.project_briefs add column if not exists track text not null default 'practice-labs';
alter table public.project_briefs add column if not exists source_project_id text;
alter table public.project_briefs add column if not exists company_tag text;
alter table public.project_briefs add column if not exists level text not null default 'Beginner';
alter table public.project_briefs add column if not exists estimated_time text;
alter table public.project_briefs add column if not exists skills text[] not null default '{}';
alter table public.project_briefs add column if not exists learning_outcome text;
alter table public.project_briefs add column if not exists data_source text;
alter table public.project_briefs alter column dataset_path drop not null;
alter table public.project_briefs alter column walkthrough_path drop not null;
alter table public.project_briefs add column if not exists task_path text;
alter table public.project_briefs add column if not exists display_order integer not null default 100;
alter table public.project_briefs add column if not exists is_active boolean not null default true;
create index if not exists project_briefs_track_order_idx on public.project_briefs (track, display_order);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress integer not null default 0 check (progress between 0 and 100),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (learner_id, course_id)
);

create table if not exists public.mentor_match_requests (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  preferred_focus text not null,
  goals text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.mentor_sessions (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  mentor_id uuid not null references public.mentor_profiles(id) on delete cascade,
  match_request_id uuid references public.mentor_match_requests(id) on delete set null,
  starts_at timestamptz not null,
  status public.mentor_session_status not null default 'requested',
  meeting_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.mentor_project_proposals (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references public.mentor_profiles(id) on delete cascade,
  title text not null,
  problem_statement text not null,
  skills text[] not null default '{}',
  difficulty text not null,
  estimated_duration text,
  prerequisites text,
  tools text[] not null default '{}',
  final_deliverable text not null,
  rubric text,
  mentor_notes text,
  credit_value_requested integer not null default 0 check (credit_value_requested >= 0),
  status public.project_proposal_status not null default 'submitted',
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  admin_feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mentor_credits (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references public.mentor_profiles(id) on delete cascade,
  project_proposal_id uuid references public.mentor_project_proposals(id) on delete set null,
  amount integer not null check (amount >= 0),
  status public.mentor_credit_status not null default 'pending',
  reason text,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  owner_type public.subscription_owner_type not null,
  owner_user_id uuid references public.profiles(id) on delete cascade,
  owner_organization_id uuid references public.organizations(id) on delete cascade,
  plan_id uuid not null references public.plans(id),
  status public.subscription_status not null default 'active',
  paystack_customer_code text,
  paystack_subscription_code text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  check (
    (owner_type = 'user' and owner_user_id is not null and owner_organization_id is null)
    or
    (owner_type = 'organization' and owner_organization_id is not null and owner_user_id is null)
  )
);

create table if not exists public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  path text not null check (path in ('ai', 'data')),
  score integer not null check (score between 0 and 100),
  answers jsonb not null default '[]'::jsonb,
  recommendation jsonb not null default '{}'::jsonb,
  recommended_course_slug text,
  created_at timestamptz not null default now()
);

create index if not exists assessment_attempts_email_idx on public.assessment_attempts (email);
create index if not exists assessment_attempts_user_idx on public.assessment_attempts (user_id);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  plan_id uuid references public.plans(id) on delete set null,
  product_type text not null default 'course',
  product_slug text not null,
  product_name text not null,
  amount_kes integer not null check (amount_kes >= 0),
  currency text not null default 'KES',
  payment_method text,
  payment_status text not null default 'pending',
  reference text not null unique,
  paystack_access_code text,
  paystack_authorization_url text,
  transaction_id text,
  verified_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists purchases_lead_idx on public.purchases (lead_id);
create index if not exists purchases_user_idx on public.purchases (user_id);
create index if not exists purchases_status_idx on public.purchases (payment_status);
create index if not exists purchases_reference_idx on public.purchases (reference);

create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.project_briefs(id) on delete cascade,
  status public.review_status not null default 'submitted',
  artifact_url text,
  score integer check (score between 0 and 100),
  submitted_at timestamptz not null default now()
);

create unique index if not exists project_submissions_learner_project_idx
  on public.project_submissions (learner_id, project_id);

create table if not exists public.project_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.project_submissions(id) on delete cascade,
  mentor_id uuid references public.mentor_profiles(id),
  rubric_scores jsonb not null default '{}'::jsonb,
  feedback text not null,
  hiring_manager_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.employer_shortlists (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.organizations(id) on delete cascade,
  learner_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'saved',
  notes text,
  created_at timestamptz not null default now(),
  unique (employer_id, learner_id)
);

create table if not exists public.paystack_events (
  id uuid primary key default gen_random_uuid(),
  reference text not null,
  event text not null,
  amount_kes integer,
  customer_code text,
  subscription_code text,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

alter table public.paystack_events drop constraint if exists paystack_events_reference_key;
create index if not exists paystack_events_reference_idx on public.paystack_events (reference);
create index if not exists paystack_events_received_idx on public.paystack_events (received_at desc);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  phone text,
  course_slug text references public.courses(slug) on delete set null,
  course_name text,
  consultation_type text not null default 'course_specific',
  preferred_date timestamptz,
  preferred_time text,
  time_zone text not null default 'Africa/Nairobi',
  status text not null default 'pending',
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists consultations_email_idx on public.consultations (email);
create index if not exists consultations_status_idx on public.consultations (status);

create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  email text,
  email_type text not null,
  subject text not null,
  status text not null default 'queued',
  provider_message_id text,
  metadata jsonb not null default '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists email_logs_lead_idx on public.email_logs (lead_id);
create index if not exists email_logs_type_idx on public.email_logs (email_type);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_logs_admin_idx on public.admin_audit_logs (admin_id);

create table if not exists public.ai_token_wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  monthly_limit integer not null default 50000,
  used_this_period integer not null default 0,
  period_started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (monthly_limit >= 0),
  check (used_this_period >= 0)
);

create table if not exists public.ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  feature text not null,
  tokens_used integer not null check (tokens_used >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.synthetic_dataset_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  industry text not null,
  purpose text,
  columns jsonb not null,
  row_count integer not null check (row_count > 0),
  status public.ai_job_status not null default 'queued',
  token_cost integer not null default 0,
  output_path text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.uploaded_datasets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  storage_path text not null,
  row_count integer,
  column_names text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.ai_walkthroughs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  dataset_id uuid references public.uploaded_datasets(id) on delete set null,
  subject text not null,
  level text not null default 'beginner',
  status public.ai_job_status not null default 'queued',
  token_cost integer not null default 0,
  output_path text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
