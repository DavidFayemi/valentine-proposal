# Supabase Email Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details and create the project
5. Wait for the project to be provisioned

## Step 2: Get Your Supabase Credentials

1. Go to your project's **Settings** (⚙️ icon)
2. Click on **API** in the left sidebar
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## Step 3: Configure Environment Variables

Edit `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_RECIPIENT_EMAIL=your_email@gmail.com
```

Replace:

- `your-project` with your actual Supabase project name
- `your_anon_key_here` with the anon key from Step 2
- `your_email@gmail.com` with the email address where you want to receive notifications

## Step 4: Set Up Email Service (Choose One)

### Option A: Use Supabase Email (Built-in) - RECOMMENDED

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable Email provider (it's enabled by default)
3. Go to **Email Templates** to customize if needed

### Option B: Use SendGrid Integration

1. Get a SendGrid API key from [sendgrid.com](https://sendgrid.com)
2. In Supabase Dashboard, go to **Extensions** or **Integrations**
3. Search for and configure SendGrid

### Option C: Use Resend (Simple Alternative)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Use the simpler setup below

## Step 5: Create Supabase Edge Function (for Email Sending)

1. In Supabase Dashboard, go to **Edge Functions**
2. Click **Create a new function**
3. Name it: `send-email`
4. Replace the default code with:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, message } = await req.json();

    // Using Supabase built-in email (via Auth)
    // For production, consider using SendGrid, Resend, or similar
    console.log(`Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // For actual email sending, you can use:
    // - SendGrid API
    // - Resend API
    // - Other email services

    // Example with console logging for now:
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email logged (configure actual service)",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
```

## Step 6: Deploy Edge Function

1. In your terminal, install Supabase CLI (if not already installed):

   ```bash
   npm install -g supabase
   ```

2. Log in to Supabase:

   ```bash
   supabase login
   ```

3. Link your project:

   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Deploy the function:
   ```bash
   supabase functions deploy send-email
   ```

## Step 7: Test the Setup

1. Run your app: `npm run dev`
2. Click "Yes" or "No" on the Valentine's proposal
3. Check the browser console (F12) for logs
4. Check your configured email inbox for the email (may take a few minutes)

## Troubleshooting

### Emails not being sent?

- Check `.env.local` is correct (reload dev server if you modified it)
- Check browser console for errors
- Verify Supabase credentials are correct
- Check Edge Function logs in Supabase Dashboard → Functions

### Email provider not working?

- Use the console.log approach first to verify the function is being called
- Then integrate with a proper email service (SendGrid, Resend, etc.)

## Using a Better Email Service (Production Ready)

For production, replace the Edge Function with one of these services:

### Using Resend (Recommended for simplicity):

```bash
npm install resend
```

Update `.env.local`:

```env
VITE_RESEND_API_KEY=your_resend_api_key
```

Update `src/lib/supabase.ts` to use Resend directly instead of Edge Functions.

### Using SendGrid:

Get API key from SendGrid and use it in the Edge Function similar to the Resend approach.

## Quick Email Change

To change the email address or messages, edit `src/lib/supabase.ts`:

```typescript
const message =
  response === "yes"
    ? "Change this message for YES" // ← Change YES message
    : "Change this message for NO"; // ← Change NO message
```

And update `.env.local`:

```env
VITE_RECIPIENT_EMAIL=newemail@gmail.com  // ← Change recipient
```

Then restart your dev server: `npm run dev`
