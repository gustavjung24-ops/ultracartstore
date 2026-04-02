# Healthy Communities Demo

A responsive storefront/catalog demo built with **Next.js 14 + TypeScript + Tailwind CSS**.

> This is a UI demo only. No cart, no backend, no payments.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Home page with featured resources |
| `/shop/healthy-communities/product` | Product detail page |

---

## How to Customize

All editable content lives in **`src/data/product.ts`**:

| Field | What to change |
|-------|---------------|
| `title` | Product title |
| `price` | Product price (e.g. `"$0.15"`) |
| `sku` | Product SKU |
| `shortDescription` | Short product description |
| `whatsappUrl` | WhatsApp link — add your number after `https://wa.me/` |
| `zaloUrl` | Zalo link — add your number after `https://zalo.me/` |
| `phoneNumber` | Phone number for "Call Now" button (format: `tel:+1234567890`) |
| `images` | Array of image URLs (replace placeholders with real images) |
| `relatedResources` | Array of related resource cards |

Other things to customize:

| File | What to change |
|------|---------------|
| `src/components/Header.tsx` | Brand name, phone number in header |
| `src/components/Footer.tsx` | Address, email, copyright |
| `src/components/SidebarMenu.tsx` | Navigation links |
| `src/app/page.tsx` | Home page content and featured items |

---

## Deploy to Vercel

### Option 1 — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard

1. Push this repo to GitHub:

```bash
git add .
git commit -m "initial demo"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo.
3. Vercel auto-detects Next.js. Click **Deploy**.

Your demo will be live at `https://YOUR_PROJECT.vercel.app`.

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
