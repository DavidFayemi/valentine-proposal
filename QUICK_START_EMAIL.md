# Quick Start - Email Setup

## 🚀 Fast Track (5 minutes)

### 1. Install Supabase CLI (one-time)

```bash
npm install -g supabase
```

### 2. Go to https://supabase.com and create a free project

- Create account
- Create new project
- Get credentials from Settings → API

### 3. Fill in `.env.local`

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_from_settings
VITE_RECIPIENT_EMAIL=your_email@gmail.com
```

### 4. Quick Setup with Resend (easiest option)

**A. Sign up at https://resend.com and get API key**

**B. Add to Supabase:**

- Go to your Supabase project
- Settings → Secrets
- Add `RESEND_API_KEY` with your Resend API key

**C. Create Edge Function in Supabase:**

- Go to Edge Functions
- Click "Create new function"
- Name: `send-email`
- Paste code from `EDGE_FUNCTION_TEMPLATE_RESEND.ts`
- Deploy

**D. Test**

```bash
npm run dev
# Click Yes or No
# Check your email
```

---

## 🔧 If Something Doesn't Work

**Check browser console (F12)** for error messages

**Common issues:**

- `.env.local` not filled in → Fill it with your credentials and restart dev server
- Edge Function not deployed → Check Supabase dashboard → Edge Functions
- Email not arriving → Check spam folder, or check Edge Function logs

---

## 📝 To Change Messages or Email

Edit `src/lib/supabase.ts` (lines 21-24):

```typescript
const message =
  response === "yes"
    ? "NEW MESSAGE FOR YES" // ← Change this
    : "NEW MESSAGE FOR NO"; // ← Change this
```

Edit `.env.local`:

```env
VITE_RECIPIENT_EMAIL=newemail@gmail.com
```

Restart: `npm run dev`

---

## 📚 Full Documentation

See `SUPABASE_SETUP.md` for complete step-by-step guide.
