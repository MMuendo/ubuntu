# Ubuntu Academy

Ubuntu Academy is a mentor-first learning and talent platform for African learners, mentors, employers, and internal operators.

The current product shape is: learners find a mentor, choose a pathway, complete practical projects, generate or use datasets, receive review, and build proof that can later support employer discovery.

## What We Have Now

This repository is a Next.js App Router application with:

- A polished Ubuntu Analytiq frontend for learners, mentors, employers, admins, dataset buyers, and blog readers.
- PostgreSQL/Railway-ready auth with email/password signup, hashed passwords, HTTP-only session cookies, and role memberships.
- Fallback demo data so the app still renders when PostgreSQL is not configured.
- PostgreSQL-backed reads for mentors, pathways, projects, plans, payment events, learner progress, mentor profiles, AI usage, and admin table status when `DATABASE_URL` is present.
- A unified course catalog from the Ubuntu reference product: Excel, Power BI, AI Fluency, Agentic AI, Python, SQL, and Data Fluency.
- A richer `/academy` learning hub, `/assessment` recommendation flow, `/datasets` preview tool, `/blogs` content hub, `/checkout` secure checkout page, and `/success` verification page.
- API routes and server actions for auth, onboarding, assessments, lead capture, payment initialization/verification/webhooks, project submissions, mentor project proposals, synthetic dataset generation, and AI walkthrough jobs.
- Route protection through `proxy.js` for learner, mentor, employer, onboarding, and admin workspaces.
- Downloadable project datasets and walkthrough files in `public/downloads`.
- A generated mentor-led data workshop image at `public/images/ubuntu-data-workshop.png`, used as the homepage visual anchor.
- A generated project workbench image at `public/images/ubuntu-project-workspace.png`, used to make the projects area more concrete.
- A current billing model with server-created transactions, server-side verification, purchase records, enrollments, and webhook reconciliation, kept out of the primary navigation until the backend phase resumes.

The app is no longer just a static prototype. It is a PostgreSQL-ready product shell with custom auth, session cookies, persistence flows, and the main marketplace surfaces mapped.

## Product Model

Ubuntu Academy is organized around four audiences:

- Learners: mentorship, pathways, projects, onboarding, progress, proof, and AI dataset tooling.
- Mentors: learner rosters, review queues, reputation, payouts, mentor onboarding, and project proposals.
- Employers: verified learner discovery, shortlists, proof signals, intro requests, and paid access.
- Admins: role access, content operations, mentor verification, billing events, table health, and AI usage oversight.

The homepage also presents goal-based learning lanes inspired by strong analytics education platforms, but adapted for Ubuntu:

- Work better with data.
- Become an analyst.
- Build AI data workflows.
- Upskill a team.

The intended launch sequence is still:

1. Launch learners, mentors, projects, and admin operations first.
2. Use reviewed projects to build trustworthy learner proof.
3. Open employer discovery as a beta once proof supply is strong enough.
4. Grow employer subscriptions after verified project evidence becomes the core asset.

## Main Routes

| Route | Current purpose |
| --- | --- |
| `/` | Mentor-first home console with search panels, featured mentors, pathways, projects, and AI data plans. |
| `/academy` | Rich learning hub that brings the key courses, project tracks, assessment, and checkout entry points together. |
| `/mentorships` | Mentor discovery and mentor-led pathway context. |
| `/pathways` | Course/pathway catalog. |
| `/pathways/[slug]` | Individual pathway detail page. |
| `/course/[id]` | Compatibility redirect from old course URLs to `/pathways/[slug]`. |
| `/projects` | Project brief catalog with downloadable datasets and walkthroughs. |
| `/projects/[slug]` | Individual project brief, deliverables, rubric, and related showcase work. |
| `/projects/showcase` | Public-style proof showcase for strong learner projects. |
| `/projects/propose` | Public mentor project proposal form; submission redirects to mentor login when signed out and writes to PostgreSQL when signed in. |
| `/assessment` | AI and Data Fluency assessments that save attempts and recommend the right course. |
| `/datasets` | Dataset preview surface with editable details; generation, CSV download, and walkthrough actions show Coming Soon. |
| `/synthetic-data` | Compatibility redirect to `/datasets`. |
| `/blogs` | Migrated Ubuntu Analytiq blogs. |
| `/blogs/[id]` | Individual migrated blog post page. |
| `/blog` and `/blog/[id]` | Compatibility redirects to the new blog routes. |
| `/checkout` | Secure checkout initialization for courses and plans. |
| `/success` | Transaction verification and post-payment confirmation. |
| `/billing` | Subscription plans and payment event ledger; route exists, but the main Billing button is removed until the backend phase. |
| `/signup` | Learner and mentor account creation UI backed by server-side PostgreSQL auth routes. |
| `/login` | Learner and mentor login UI backed by server-side email/password auth. |
| `/admin/login` | Dedicated admin login. |
| `/auth/callback` | Post-auth routing helper for existing sessions. |
| `/onboarding/learner` | Protected multi-step learner onboarding form. |
| `/onboarding/mentor` | Protected mentor onboarding and approval application. |
| `/learners` | Protected learner workspace with progress, submissions, project links, and subscription state. |
| `/mentors` | Protected mentor workspace with roster, review queue, payout, and reputation state. |
| `/employers` | Protected employer beta workspace with shortlist and proof signals. |
| `/admin` | Protected admin control room with table status, queues, plans, roles, and payment events. |
| `/dashboard` | General learning/review dashboard. |
| `/operations` | Operations queue for mentor verification and platform tasks. |
| `/proof` | Learner proof profile and employer-readable signals. |
| `/companies` | Example company/context wall for market positioning. |

## Current Feature Surface

### Learner

- PostgreSQL signup/login screens and learner profile onboarding.
- Active course/progress display from PostgreSQL when available, with demo fallback.
- AI and Data Fluency assessment flows with course recommendations.
- Paystack checkout and success verification pages for course or plan enrollment.
- Project brief downloads and submission-oriented project pages, including artifact-link submission for signed-in learners.
- Proof profile surface and showcase examples.
- Dataset generator with 1,000 visible credits, 20+ industry options, server-generated preview rows, CSV download, and optional saved job when signed in.
- AI walkthrough request flow that creates uploaded dataset and walkthrough records when signed in.

### Mentor

- Mentor signup/login screens and approval-oriented onboarding.
- Public mentor discovery with 20 mentor profiles in the fallback system.
- Every mentorship is documented as 6 months, KES 12,500, with free project access and alignment tracking.
- Mentor workspace with roster, review queue, payout, and reputation data.
- Mentor project proposal submission into `mentor_project_proposals`.
- Mentor application storage through `mentor_applications`.

### Employer

- Beta employer workspace.
- Candidate shortlist examples with match scores and project proof.
- Employer subscription plan represented in the billing model.
- PostgreSQL schema support for `organizations` and `employer_shortlists`.

### Admin

- Admin login route and `/admin` role check through PostgreSQL role memberships.
- PostgreSQL table connection/status checks across the current schema.
- Role counts, operations queues, plan count, Paystack event display, and table checks for the new commerce and assessment tables.
- Admin operational model for accounts, roles, plans, queues, and table health.

## Content And Data

The current fallback content comes from `lib/academy/catalog.js` plus the legacy support data in `src/data.js`, so the public app still renders when PostgreSQL is not configured.

The unified catalog includes:

- 20 mentor profiles in the current fallback mentor catalog.
- 7 canonical courses.
- 20 project briefs across Excel, Power BI, AI Fluency, Agentic AI, and Practice Labs.
- 4 migrated Ubuntu Analytiq blog posts.
- 3 showcased learner projects.
- 6 subscription plans.
- 3 synthetic data plan tiers.

The PostgreSQL seed script currently inserts:

- 6 billing plans.
- 7 canonical courses.
- 20 project briefs.

Current courses:

- Data Thinking with Excel
- Business Analytics with Power BI
- AI Fluency for Business Leaders & Analysts
- Agentic Systems for Decision Automation
- Python for Data Analytics
- SQL for Analysts
- Data Fluency for Operators and Managers

Instructor mapping:

- Business Analytics with Power BI, Python for Data Analytics, and SQL for Analysts: Jacktone Etemesi, Senior Data Scientist.
- Excel, AI Fluency, Agentic AI, and Data Fluency: Ezra Muinde, Senior Data Scientist and AI Engineer.

Project assets live in:

```text
public/downloads/datasets/
public/downloads/walkthroughs/
```

Current project tracks:

- Excel: Safaricom, M-Pesa, KCB, Naivas, Equity Bank, and Kenya Airways-style analysis projects.
- Power BI: retail, banking, logistics, healthcare, school, and P&L reporting projects.
- AI Fluency: tool audit, prompt workbook, and AI strategy memo projects.
- Agentic AI: support triage, KPI monitor, agent workflow, and lead qualifier projects.
- Practice Labs: Nairobi FMCG Sales Recovery, SME Cashflow and Collections, Customer Support Quality, and Product Growth Funnel.

## Course Expansion

Ubuntu Academy now includes a non-technical data course for people who work with data but are not trying to become analysts, engineers, or programmers.

Course:

- Data Fluency for Operators and Managers

Target learners:

- Founders, managers, operations teams, sales teams, finance assistants, customer support leads, program officers, and other business users who handle reports, spreadsheets, dashboards, or AI-generated answers.

This course should focus on:

- Asking better business questions before touching tools.
- Reading spreadsheets, dashboards, and reports with confidence.
- Understanding metrics, definitions, data quality, and common analysis traps.
- Communicating insights clearly to teams and decision-makers.
- Using AI safely for summaries, explanations, and first-pass analysis without pretending to be technical.
- Turning everyday workplace data into simple actions, not complex technical artifacts.

This is now present in the catalog and seed as `data-fluency-for-operators-and-managers`.

## PostgreSQL State

Supabase has been removed from the active runtime. Ubuntu Academy now uses PostgreSQL through `pg`, with a Railway-friendly `DATABASE_URL`.

Current PostgreSQL pieces:

- `lib/db/config.js` for environment normalization.
- `lib/db/client.js` for the shared PostgreSQL connection pool.
- `lib/db/loaders.js` for PostgreSQL-first reads with demo fallbacks.
- `lib/db/tables.js` for admin table status checks.
- `lib/auth/password.js` for scrypt password hashing.
- `lib/auth/session.js` for HTTP-only cookie sessions backed by `auth_sessions`.
- `proxy.js` for signed-in route protection before protected workspaces render.
- `database/schema.sql` for the main database model.
- `database/seed.sql` for starter plans, courses, and project briefs.
- `scripts/apply-database-schema.mjs`, `scripts/check-database-schema.mjs`, and `scripts/create-admin-user.mjs` for Railway/PostgreSQL setup.

The schema currently covers:

- Identity and access: `profiles`, `auth_sessions`, `learner_profiles`, `organizations`, `role_memberships`.
- Lead capture: `leads`.
- Billing and commerce: `plans`, `subscriptions`, `purchases`, `paystack_events`.
- Mentorship: `mentor_profiles`, `mentor_applications`, `mentor_match_requests`, `mentor_sessions`.
- Learning: `courses`, `enrollments`, `assessment_attempts`.
- Projects: `project_briefs`, `mentor_project_proposals`, `mentor_credits`, `project_submissions`, `project_reviews`.
- Employers: `employer_shortlists`.
- AI data: `ai_token_wallets`, `ai_usage_events`, `synthetic_dataset_jobs`, `uploaded_datasets`, `ai_walkthroughs`.
- Operations: `consultations`, `email_logs`, `site_settings`, `admin_audit_logs`.

## API And Server Actions

Implemented server-side flows:

- `app/api/auth/login/route.js`: JSON password login endpoint that verifies the PostgreSQL password hash and writes an HTTP-only session cookie.
- `app/api/auth/signup/route.js`: JSON signup endpoint that creates `profiles`, `role_memberships`, `ai_token_wallets`, and an HTTP-only session cookie.
- `app/api/auth/email-link/route.js`: removed-flow endpoint that explains email-link login is no longer active.
- `app/api/auth/resend/route.js`: removed-flow endpoint that explains confirmation emails are no longer active.
- `app/api/auth/session/route.js`: current-session endpoint for the PostgreSQL cookie session.
- `app/api/auth/_utils.js`: shared role, validation, and post-auth redirect helpers for auth API routes.
- `app/auth/auth-client.jsx`: client UI for login/signup forms. It calls same-origin API routes.
- `app/auth/actions.js`: server actions for admin password login and sign out.
- `app/auth/callback/route.js`: post-auth routing helper for existing cookie sessions.
- `app/onboarding/actions.js`: learner and mentor onboarding persistence.
- `app/api/onboarding/learner/route.js`: learner onboarding JSON endpoint for the client-side multi-step form.
- `app/projects/actions.js`: mentor project proposal submission.
- `app/api/assessment/attempts/route.js`: saves AI/Data Fluency assessment score, answers, recommendation, selected course, and lead data.
- `app/api/leads/route.js`: captures or updates lead records from public product flows.
- `app/api/paystack/initialize/route.js`: creates a pending purchase, initializes a Paystack transaction on the server, and returns the authorization URL.
- `app/api/paystack/verify/route.js`: verifies a payment reference with Paystack before granting enrollment or subscription access.
- `app/api/paystack/webhook/route.js`: verifies the Paystack webhook signature, records events, and reconciles successful charges idempotently.
- `app/api/consultations/route.js`: captures consultation requests and links them to leads.
- `app/api/project-submissions/route.js`: saves signed-in learner project artifact links into PostgreSQL.
- `app/api/synthetic-datasets/route.js`: signed-in synthetic dataset job creation plus AI usage logging.
- `app/api/ai-walkthroughs/route.js`: signed-in uploaded dataset and walkthrough job creation plus AI usage logging.

The Paystack flow is server-first: Ubuntu creates the transaction from the backend, the browser opens the returned Paystack authorization URL, and Ubuntu grants course or plan access only after `/api/paystack/verify` or a valid webhook confirms `success` with the expected amount and currency.

Paystack references used for the implementation: [Accept Payments](https://paystack.com/docs/payments/accept-payments/), [Verify Payments](https://paystack.com/docs/payments/verify-payments/), and [Transaction API](https://paystack.com/docs/api/transaction/).

## Auth Handoff Notes

The login/signup flow is now custom PostgreSQL auth.

What changed:

- Removed active Supabase package dependencies and active Supabase imports.
- Added `pg` and a Railway-compatible database layer.
- Added scrypt password hashing in `lib/auth/password.js`.
- Added HTTP-only cookie sessions in `lib/auth/session.js`.
- Added `auth_sessions` to the PostgreSQL schema.
- Updated `/login` and `/signup` to use same-origin API routes.
- Signup creates an active account immediately; no confirmation email is required.
- Learner onboarding posts to `/api/onboarding/learner` using same-origin cookies only.
- Learner and mentor onboarding now also upsert the matching role membership, so users do not fall back to login after completing a profile.
- Admin bootstrap reactivates an existing admin role membership when rerun.

Current auth files:

- `app/login/page.jsx`
- `app/signup/page.jsx`
- `app/auth/auth-client.jsx`
- `app/api/auth/_utils.js`
- `app/api/auth/login/route.js`
- `app/api/auth/signup/route.js`
- `app/api/auth/email-link/route.js`
- `app/api/auth/resend/route.js`
- `app/api/auth/session/route.js`
- `app/auth/callback/route.js`
- `app/api/onboarding/learner/route.js`
- `app/onboarding/actions.js`
- `app/onboarding/learner/learner-onboarding-form.jsx`
- `lib/auth/password.js`
- `lib/auth/session.js`
- `lib/db/client.js`
- `lib/db/config.js`
- `proxy.js`

What was verified:

- `npm run build` passes after the rebuild.
- `/signup` loads in the in-app browser with no `localStorage`, `sessionStorage`, or `SecurityError` console errors.
- Signup validation works in the browser for password mismatch and returns `The two passwords do not match.`
- `/api/auth/signup` returns validation errors for missing fields and password mismatch before touching the database.
- `/api/auth/login` returns validation errors for missing credentials.
- Signed-out `/onboarding/learner` redirects to `/login?role=student&message=session-required&next=%2Fonboarding%2Flearner`.

What is not proven:

- A real valid signup cannot be completed until `DATABASE_URL` points at Railway/PostgreSQL and `npm run db:apply` has been run.
- Admin login requires an admin account created with `npm run db:create-admin`.

Recommended next setup path:

1. Add Railway `DATABASE_URL` to `.env.local`.
2. Run `npm run db:apply`.
3. Run `npm run db:check`.
4. Submit one real learner signup.
5. Complete `/onboarding/learner` and verify the user lands on `/learners`.
6. Optionally set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME`, then run `npm run db:create-admin`.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn-style local UI primitives
- lucide-react icons
- PostgreSQL via `pg`, custom auth, and HTTP-only session cookies
- Paystack transaction initialization, verification, webhooks, and reconciliation through server API routes

## Visual System

The current visual hierarchy is:

- Master surface: `#f1f5f9`
- Primary accent and action color: `#00b4d8`
- Deep ink and high-contrast panels: `#1e1616`

The landing page uses a light grid surface so the product feels calm, structured, and analytical. Cyan is reserved for primary actions, data accents, progress, active emphasis, and learning-lane highlights. Deep ink is used for brand marks, contrast panels, and selected states.

## Project Structure

```text
app/
  academy/
  admin/
  api/
  assessment/
  auth/
  billing/
  blog/
  blogs/
  checkout/
  companies/
  course/
  dashboard/
  datasets/
  employers/
  learners/
  login/
  mentors/
  mentorships/
  onboarding/
  operations/
  pathways/
  projects/
  proof/
  signup/
  success/
  synthetic-data/
components/
  site-kit.jsx
  site-shell.jsx
  ui/
lib/
  academy/
  auth/
  db/
  paystack.js
  utils.js
public/
  downloads/
  images/
src/
  data.js
database/
  schema.sql
  seed.sql
```

## Environment

Create `.env.local` from `.env.example`:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:4173
DATABASE_URL=postgresql://postgres:password@host.railway.internal:5432/railway
POSTGRES_SSL=true
PAYSTACK_SECRET_KEY=your-paystack-secret-key
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
PAYSTACK_WEBHOOK_SECRET=your-paystack-webhook-secret
```

Only `NEXT_PUBLIC_SITE_URL` should be exposed to the browser. Keep `DATABASE_URL`, admin bootstrap values, and Paystack secrets server-side.

## PostgreSQL Setup

For a fresh Railway/PostgreSQL database:

1. Add the Railway Postgres connection string to `.env.local` as `DATABASE_URL`.
2. Run `npm run db:apply` to create tables and seed starter content.
3. Run `npm run db:check` to verify the main auth/content tables exist.
4. Optional admin bootstrap: set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME`, then run `npm run db:create-admin`.

The auth model uses:

- `profiles` for accounts and password hashes.
- `role_memberships` for learner, mentor, admin, and employer access.
- `auth_sessions` for HTTP-only cookie sessions.
- `learner_profiles` and `mentor_profiles` for onboarding completion.

## Local Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:4173
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Current Verification

Verified on May 3, 2026:

- [x] `npm run build` completes successfully.
- [x] Supabase packages are removed from active dependencies.
- [x] `pg` is installed for PostgreSQL/Railway.
- [x] `npm run db:apply`, `npm run db:check`, and `npm run db:create-admin` are available.
- [x] `/academy`, `/assessment`, `/checkout`, `/success`, and old `/course/[id]` compatibility routes are implemented.
- [x] `/datasets`, `/blogs`, `/blogs/[id]`, and old `/synthetic-data` plus `/blog/[id]` compatibility redirects are implemented.
- [x] Main navigation now removes Home and Billing; the UA logo remains the home action and the menu order starts Academy, Mentorship, Projects.
- [x] Home includes the new Ubuntu Analytiq slogan, sticky sales banner, Cohort 2 offer, Ubuntu work slider, Academy, Mentorship, Projects, Datasets, running testimonials, and contact.
- [x] Home no longer contains search forms; search/action controls stay on the relevant destination pages.
- [x] Dataset inputs remain interactive while Generate dataset, Download CSV, and Generate walkthrough show Coming Soon.
- [x] The fallback mentor catalog now has one Ezra Muinde profile and richer mentor details.
- [x] The catalog now includes the 7 key courses and the instructor mapping requested for Jacktone and Ezra.
- [x] The project catalog now includes Excel, Power BI, AI Fluency, Agentic AI, and Practice Labs tracks.
- [x] Assessment attempt, lead, purchase, consultation, email log, site setting, and admin audit tables are in `database/schema.sql`.
- [x] Paystack initialization, transaction verification, webhook signature verification, and duplicate-safe reconciliation routes are implemented.
- [x] Signed-in learner project artifact submissions post to `/api/project-submissions`.
- [x] Protected learner, mentor, employer, onboarding, and admin routes redirect when no `ua_session` cookie is present.
- [x] `/auth/callback` redirects to login when visited without an auth code.
- [x] Login API validation returns the correct JSON error for missing credentials.
- [x] Signup API validation returns the correct JSON error for missing fields.
- [x] Signup API validation catches password mismatch before creating an account.
- [x] `/signup` and `/login` load in the in-app browser with no `localStorage`, `sessionStorage`, or runtime console errors.
- [x] Signup and login form messages clear when the user edits the form after a validation error.
- [x] Learner and mentor onboarding now upsert role memberships during profile completion.
- [x] Valid signup/login attempts return the setup-required PostgreSQL message instead of crashing when `DATABASE_URL` is missing.
- [x] `npm run db:check` fails clearly when `DATABASE_URL` is not present.
- [ ] End-to-end account creation needs `DATABASE_URL` and a live Railway/PostgreSQL database.
- [ ] End-to-end Paystack success/failure/webhook tests need `DATABASE_URL` plus valid Paystack keys.
- [ ] Project file uploads are not implemented yet; v1 stores external artifact links in PostgreSQL.

Useful smoke-test routes:

- `/`
- `/academy`
- `/mentorships`
- `/pathways`
- `/pathways/ai-mastery`
- `/projects`
- `/projects/safaricom-subscriber-tracker`
- `/datasets`
- `/blogs`
- `/blogs/how-agentic-ai-actually-works-using-n8n`
- `/assessment`
- `/checkout?courseId=ai-mastery&courseName=AI%20Fluency&coursePrice=2500`
- `/success`
- `/synthetic-data`
- `/signup`
- `/login`
- `/admin/login`
- `/onboarding/learner`
- `/onboarding/mentor`
- `/projects/propose`
- `/learners`
- `/mentors`
- `/admin`

## Next Implementation Milestones

1. Add a real Railway/PostgreSQL `DATABASE_URL`, run `npm run db:apply`, and then run `npm run db:check`.
2. Add valid Paystack keys, set the Paystack webhook URL to `/api/paystack/webhook`, and run live or test-mode payment verification.
3. Complete one learner signup, onboarding, checkout, verified enrollment, refresh, logout, and login cycle against the live database.
4. Add object storage for learner project uploads; v1 currently stores artifact links only.
5. Add mentor scoring forms and review persistence.
6. Add admin approval actions for mentor applications, project proposals, mentor credits, purchases, and consultations.
7. Replace the remaining static workspace examples with PostgreSQL-backed queries.
8. Add employer candidate search, shortlist persistence, and intro request flow.
9. Connect synthetic dataset and walkthrough jobs to real background generation.
