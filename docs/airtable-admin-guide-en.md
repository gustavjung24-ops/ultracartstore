# Airtable Admin Guide (English)

This project is now connected to Airtable as a lightweight CMS source.

If Airtable variables are set, the website reads product data from Airtable.
If Airtable variables are missing, the website uses local fallback data.

## 1. What Admin Can Do

1. Add new products.
2. Edit title, price, description, category, and contact links.
3. Drag and drop product images.
4. Hide products using a checkbox.
5. Control related products by listing slugs.

## 2. Create Airtable Structure

Create one table named `Products`.

Add these fields exactly:

1. `Slug` (Single line text) (required)
2. `Title` (Single line text) (required)
3. `Category` (Single line text or Single select) (required)
4. `CategoryLabel` (Single line text) (optional)
5. `Price` (Single line text) (optional)
6. `Unit` (Single line text) (optional)
7. `SKU` (Single line text) (optional)
8. `ShortDescription` (Long text) (optional)
9. `LongDescription` (Long text) (optional)
10. `ContactNote` (Long text) (optional)
11. `WhatsAppUrl` (URL) (optional)
12. `ZaloUrl` (URL) (optional)
13. `PhoneNumber` (Single line text) (optional)
14. `Images` (Attachment, allow multiple) (optional)
15. `RelatedSlugs` (Long text) (optional)
16. `Published` (Checkbox) (optional)

Notes:

1. `Slug` must be unique and URL-safe. Example: `plant-powered-shirt`.
2. `RelatedSlugs` supports comma-separated or new-line values.
3. If `Published` is unchecked, the product will be hidden.

## 3. Set Environment Variables

Set these variables in Vercel Project Settings -> Environment Variables:

1. `AIRTABLE_TOKEN`
2. `AIRTABLE_BASE_ID`
3. `AIRTABLE_PRODUCTS_TABLE` (default: `Products`)
4. `AIRTABLE_REVALIDATE_SECONDS` (optional, default: `300`)

For local development, copy `.env.example` to `.env.local` and fill values.

## 4. How Admin Adds a Product

1. Open Airtable -> `Products` table.
2. Add a new row.
3. Fill required fields: `Slug`, `Title`, `Category`.
4. Fill optional fields (price, descriptions, links).
5. Drag and drop images into `Images`.
6. Set `Published` checked.
7. Save.

The site updates automatically (typically within 1-5 minutes, based on revalidate setting and traffic).

## 5. How Admin Edits or Hides Product

1. Edit any field in the row.
2. To hide product: uncheck `Published`.
3. Changes sync automatically.

## 6. Category Values You Can Use

Recommended values for `Category`:

1. `healthy-communities`
2. `books`
3. `literature`
4. `health-topics`
5. `clinicians`
6. `multimedia`
7. `apparel`

## 7. Troubleshooting

1. Product not showing:
   Check `Slug`, `Title`, `Category` are not empty and `Published` is checked.
2. Images not showing:
   Re-upload image in `Images`; wait a minute and refresh.
3. No Airtable data on site:
   Verify `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_PRODUCTS_TABLE` in Vercel.

## 8. Security Notes

1. Never expose `AIRTABLE_TOKEN` to client-side code.
2. Keep token only in server environment variables.
3. Use an Airtable token with minimum required scopes.
