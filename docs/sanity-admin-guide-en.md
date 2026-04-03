# Sanity Admin Guide (English)

This project now uses Sanity as CMS.

If Sanity environment variables are configured, the website reads product data from Sanity.
If not configured, the website falls back to local data in `data/product.ts`.

## 1. What Admin Can Do

1. Create new products.
2. Edit title, price, descriptions, category, and contact links.
3. Upload product images.
4. Hide products by setting `published` to `false`.
5. Control related products with references.

## 2. Create Product Schema (Recommended)

Create a Sanity document type named `product` with fields:

1. `slug` (slug, required)
2. `title` (string, required)
3. `categorySlug` (string, required)
4. `categoryLabel` (string, optional)
5. `price` (string, optional)
6. `unit` (string, optional)
7. `sku` (string, optional)
8. `shortDescription` (text, optional)
9. `longDescription` (text, optional)
10. `contactNote` (text, optional)
11. `whatsappUrl` (url, optional)
12. `zaloUrl` (url, optional)
13. `phoneNumber` (string, optional)
14. `images` (array of images, optional)
15. `relatedProducts` (array of references to `product`, optional)
16. `published` (boolean, optional, default `true`)

Notes:

1. `slug` must be unique and URL-safe.
2. If `published` is `false`, product will not show on site.
3. Product pages are generated from `/product/[slug]`.

## 3. Environment Variables

Set these variables in Vercel Project Settings -> Environment Variables:

1. `SANITY_PROJECT_ID`
2. `SANITY_DATASET` (example: `production`)
3. `SANITY_API_TOKEN` (optional, required only for private datasets)
4. `SANITY_API_VERSION` (optional, default `2024-08-01`)
5. `SANITY_REVALIDATE_SECONDS` (optional, default `300`)

For local development:

```bash
cp .env.example .env.local
```

## 4. Admin Workflow

1. Open Sanity Studio (or Sanity Manage content editor).
2. Create/update `product` documents.
3. Publish changes.
4. Wait for site revalidation (usually 1-5 minutes).

## 5. Recommended Category Values

1. `healthy-communities`
2. `books`
3. `literature`
4. `health-topics`
5. `clinicians`
6. `multimedia`
7. `apparel`

## 6. Troubleshooting

1. Product does not appear:
   Check `slug`, `title`, `categorySlug` and `published`.
2. Images do not appear:
   Re-upload image assets and republish.
3. Site still shows fallback data:
   Verify `SANITY_PROJECT_ID` and `SANITY_DATASET` values in deployment.

## 7. Security Notes

1. Never expose `SANITY_API_TOKEN` to client-side code.
2. Use read-only token scope when possible.
3. Keep token only in server-side environment variables.
