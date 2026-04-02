# Healthy Communities Demo

A responsive storefront/catalog demo built with **Next.js 14 + TypeScript + Tailwind CSS**.

> ⚠️ This is a **UI demo only**. There is no real cart, checkout, login, or database.

## Live Preview

Deploy instantly to Vercel → [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gustavjung24-ops/ultracartstore)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx              ← Root layout (font, metadata)
│   ├── globals.css             ← Global styles (Tailwind base)
│   ├── page.tsx                ← Home page
│   └── product/[slug]/
│       └── page.tsx            ← Product detail page
├── components/
│   ├── Header.tsx              ← Top navigation bar with search
│   ├── Breadcrumbs.tsx         ← Breadcrumb navigation
│   ├── ProductGallery.tsx      ← Product image gallery with thumbnails
│   ├── ProductInfo.tsx         ← Title, price, CTA buttons (WhatsApp/Zalo/Call)
│   ├── SidebarMenu.tsx         ← Main Menu + Help links
│   ├── RelatedResources.tsx    ← 3 related resource cards
│   └── Footer.tsx              ← Footer with address and links
├── data/
│   └── product.ts              ← ✏️ ALL editable content is here
└── public/
    └── images/                 ← Place real product images here
```

---

## ✏️ How to Customize Content

**All content is in one file: `data/product.ts`**

| What to change | Field in `data/product.ts` |
|---|---|
| Product title | `product.title` |
| Product description | `product.shortDescription` |
| Price | `product.price` |
| SKU code | `product.sku` |
| WhatsApp link | `product.whatsappUrl` (format: `https://wa.me/<number>`) |
| Zalo link | `product.zaloUrl` (format: `https://zalo.me/<number>`) |
| Phone number | `product.phoneNumber` (format: `tel:+<number>`) |
| Product images | `product.images` array |
| Related resources | `product.relatedResources` array |
| Main menu items | `mainMenu` array |
| Help menu items | `helpMenu` array |
| Footer address/contact | `footerInfo` object |

### Replace product images

1. Put your images in `/public/images/` (e.g., `brochure-main.jpg`)
2. Update `product.images` in `data/product.ts`:

```ts
images: [
  "/images/brochure-main.jpg",
  "/images/brochure-front.jpg",
  "/images/brochure-back.jpg",
],
```

---

## Push to GitHub

```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"** and import your repository
3. Leave all settings as default (Vercel auto-detects Next.js)
4. Click **Deploy** — your site will be live in ~2 minutes

Every `git push` to `main` will auto-deploy to Vercel.

---

## Routes

| URL | Page |
|---|---|
| `/` | Home / featured product |
| `/product/building-healthy-communities-brochure` | Product detail |

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
