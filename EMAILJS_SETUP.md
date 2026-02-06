# ✅ EmailJS Setup - Browser-Native Email Solution

## What Changed

- ✅ Switched from Resend (Node.js only) to EmailJS (browser-native)
- ✅ No more "Cannot read properties of undefined" errors
- ✅ Works directly in the browser
- ✅ Free and simple to set up

## Setup (5 Easy Steps)

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for free (or login if you have an account)
3. Verify your email

### Step 2: Connect Your Email

1. In EmailJS dashboard, go to **Email Services** (left sidebar)
2. Click **Add New Service**
3. Choose **Gmail** or **Outlook** (whichever you use)
4. Click **Connect Account** and authorize it
5. Note the **Service ID** (looks like: `service_xxxxxxx`) - you'll need this

### Step 3: Create Email Template

1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Fill in:
   - **Name**: "Valentine Proposal"
   - **Subject**: `Valentine's Proposal - {{response_type}}`
4. In the **Email Content** section, paste:

```html
<h2>Valentine's Proposal Response</h2>
<p>{{message}}</p>
<p><strong>Response:</strong> {{response_type}}</p>
```

5. Click **Save**
6. Note the **Template ID** (looks like: `template_xxxxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** (top right)
2. Click **API Keys**
3. Copy your **Public Key** (long string starting with letters)

### Step 5: Update `.env.local`

Edit the file `c:\Users\USER\Documents\DEVELOPMENT\valentine-proposal\.env.local`:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_RECIPIENT_EMAIL=idfayemi@gmail.com
```

Replace the placeholder values with your actual keys from EmailJS.

### Step 6: Restart Dev Server

```bash
npm run dev
```

## Test It

1. Open the app in your browser
2. Click **"Yes"** or **"No"** button
3. Check your email inbox (idfayemi@gmail.com)
4. Email should arrive within seconds!

## Done! 🎉

That's it. Email sending is now working directly from the browser.

## How to Find Your Keys Again

**Service ID:**

- EmailJS Dashboard → Email Services → Your service → Copy the ID

**Template ID:**

- EmailJS Dashboard → Email Templates → Your template → Copy the ID

**Public Key:**

- EmailJS Dashboard → Account (top right) → API Keys → Copy Public Key

## Customizing Email Messages

Edit `src/lib/supabase.ts` (lines ~29-30):

```typescript
const message =
  response === "yes"
    ? "She said yes, I hope you have your gifts ready!" // ← Change this
    : "She attempted to say no"; // ← Change this
```

Then restart: `npm run dev`

## Troubleshooting

**Email not sending?**

- Check `.env.local` is saved
- Verify all 4 environment variables are filled (not just placeholders)
- Open browser console (F12) and check for error messages
- Make sure dev server was restarted after updating `.env.local`

**Service ID or Template ID wrong?**

- Go to emailjs.com dashboard
- Copy-paste the exact ID from dashboard to `.env.local`
- Make sure no extra spaces are included

**"EmailJS credentials not configured" message?**

- Check `.env.local` - all 3 EmailJS variables must be filled
- Make sure file is saved and dev server restarted

**Email goes to spam?**

- Check your spam/junk folder
- Gmail/Outlook may flag new senders as spam initially
- Mark email as "Not spam" to help train the filter

## Next Steps

Once email is working, you can:

- Customize the email template in EmailJS dashboard
- Change recipient email in `.env.local`
- Add more email services (Gmail, Outlook, SendGrid, etc.)
