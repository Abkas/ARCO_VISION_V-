# Vercel Environment Setup for ARCO Cinema

## Quick Setup

Add these environment variables to your Vercel project dashboard:

### 1. Go to Vercel Dashboard
- Navigate to your project: **ARCO_VISION_V-**
- Click **Settings** → **Environment Variables**

### 2. Add These Variables

| Variable Name | Value |
|---|---|
| `VITE_SITE_URL` | `https://www.arcocinema.com` |
| `VITE_GA_MEASUREMENT_ID` | `G-KEY3VCF8MP` |
| `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION` | `pVj28FvDs0BC_4kOqklBwl-RU9VrG8Ycue7JKtBM2f0` |

### 3. Deploy

After adding environment variables, redeploy:
```bash
git push
# or manually redeploy in Vercel dashboard
```

## What These Do

- **VITE_SITE_URL**: Updates all canonical URLs, social metadata, and sitemap to your domain
- **VITE_GA_MEASUREMENT_ID**: Loads Google Analytics 4 tracking automatically
- **VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION**: Adds meta tag for Search Console verification

## Local Development

Create a `.env.local` file in `Frontend/` with the same variables to test locally:

```env
VITE_SITE_URL=https://www.arcocinema.com
VITE_GA_MEASUREMENT_ID=G-KEY3VCF8MP
VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION=pVj28FvDs0BC_4kOqklBwl-RU9VrG8Ycue7JKtBM2f0
```

Then run:
```bash
cd Frontend
npm run dev
```

## Verification

1. **GA4**: Check `https://analytics.google.com` → Your property should see real-time traffic
2. **Search Console**: Go to `https://search.google.com/search-console` → Add property and check verification status
3. **Sitemap**: Visit `https://www.arcocinema.com/sitemap.xml` to confirm it loads

---

Done! Your site is now configured for production.
