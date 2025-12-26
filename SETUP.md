# Backend Setup Guide - Ubuntu AnalytIQ

This guide will walk you through setting up the backend infrastructure for Option B.

## 📋 Prerequisites

- Node.js and npm installed
- A Supabase account (free tier is fine)
- A Resend account (free tier includes 100 emails/day)

---

## 1️⃣ Supabase Database Setup

###Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `ubuntu-analytiq`
   - **Database Password**: (create a strong password - save this!)
   - **Region**: Choose closest to Kenya (e.g., Singapore or Frankfurt)
5. Click **"Create new project"** (this takes ~2 minutes)

### Step 2: Run the Database Schema

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy the entire contents of `/supabase/schema.sql`
4. Paste it into the SQL editor
5. Click **"Run"** (bottom right)
6. You should see: ✅ Success. No rows returned

### Step 3: Get Your API Keys

1. Click **"Project Settings"** (gear icon) in the left sidebar
2. Click **"API"** in the settings menu
3. Copy these values:

```bash
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGci...
service_role key: eyJhbGci... (click "Reveal" to see it)
```

### Step 4: Add to .env.local

Create a file `.env.local` in your project root:

```bash
# Copy from .env.example and fill in:
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your_service_role_key
```

---

## 2️⃣ Resend Email Service Setup

### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### Step 2: Add Your Domain (Optional but Recommended)

**For Production:**
1. Click **"Domains"** in the left sidebar
2. Click **"Add Domain"**
3. Enter your domain (e.g., `ubuntuanalytiq.com`)
4. Add the DNS records shown (in your domain registrar)
5. Wait for verification (usually 5-15 minutes)

**For Testing:**
- You can send emails from `onboarding@resend.dev` (no domain setup needed)
- Limited to 100 emails/day on free tier

### Step 3: Get Your API Key

1. Click **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Name it: `ubuntu-analytiq-production`
4. Select **"Full access"**
5. Click **"Add"**
6. **IMPORTANT**: Copy the API key now (you won't see it again!)

### Step 4: Add to .env.local

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 3️⃣ Verify Your Setup

### Test Database Connection

Run this in your terminal:

```bash
npm run dev
```

Open the browser console (F12) and look for:
```
🔧 Config loaded: {
  hasGeminiKey: true,
  hasSupabaseUrl: true,
  hasSupabaseKey: true,
  appUrl: 'http://localhost:3000'
}
```

### Test Email Service (Coming in next step)

We'll create API endpoints to test email sending.

---

## 4️⃣ Environment Variables Checklist

Your `.env.local` should have:

```bash
# ✅ Gemini API (already configured)
GEMINI_API_KEY=your_key

# ✅ Supabase (new)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# ✅ Resend (new)
RESEND_API_KEY=re_xxxxx

# URLs (auto-configured)
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api
```

---

## 5️⃣ Next Steps

Once you've completed the above:

1. ✅ Database schema is created in Supabase
2. ✅ Email service is configured with Resend
3. ✅ Environment variables are set in `.env.local`

**Ready to proceed with:**
- ✅ Creating API endpoints for lead capture
- ✅ Integrating email automation
- ✅ Testing the full flow

---

## 🆘 Troubleshooting

### "Missing required environment variable"
- Make sure `.env.local` exists in project root
- Check that variable names match exactly
- Restart dev server after adding variables

### "Supabase client error"
- Verify URL format: `https://xxxxx.supabase.co`
- Check that keys don't have extra spaces
- Ensure project is fully created (not still initializing)

### "Email sending failed"
- Verify Resend API key is correct
- Check you haven't exceeded rate limit (100/day on free tier)
- For production, domain must be verified

---

## 📊 Monitoring

### Supabase Dashboard
- **Database**: View tables, run queries
- **Table Editor**: Browse and edit data
- **Logs**: See query logs and errors

### Resend Dashboard
- **Emails**: See all sent emails
- **Analytics**: Open rates, click rates
- **Logs**: Delivery status and errors

---

**Questions?** Create an issue or contact support.
