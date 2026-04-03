# Huong Dan Admin Sanity (Tieng Viet)

Du an nay da chuyen sang Sanity CMS.

Neu da cau hinh bien moi truong Sanity, website se doc du lieu tu Sanity.
Neu chua cau hinh, website se tu dong dung du lieu du phong trong `data/product.ts`.

## 1. Admin Co The Lam Gi

1. Tao san pham moi.
2. Sua ten, gia, mo ta, danh muc va link lien he.
3. Tai len hinh anh san pham.
4. An san pham bang cach dat `published = false`.
5. Gan san pham lien quan bang reference.

## 2. Tao Schema Product (Khuyen Nghi)

Tao document type `product` trong Sanity voi cac field:

1. `slug` (slug, bat buoc)
2. `title` (string, bat buoc)
3. `categorySlug` (string, bat buoc)
4. `categoryLabel` (string, tuy chon)
5. `price` (string, tuy chon)
6. `unit` (string, tuy chon)
7. `sku` (string, tuy chon)
8. `shortDescription` (text, tuy chon)
9. `longDescription` (text, tuy chon)
10. `contactNote` (text, tuy chon)
11. `whatsappUrl` (url, tuy chon)
12. `zaloUrl` (url, tuy chon)
13. `phoneNumber` (string, tuy chon)
14. `images` (array image, tuy chon)
15. `relatedProducts` (array reference den `product`, tuy chon)
16. `published` (boolean, tuy chon, mac dinh `true`)

Luu y:

1. `slug` phai duy nhat va than thien URL.
2. Neu `published = false` thi san pham se khong hien tren web.
3. Trang chi tiet san pham dung route `/product/[slug]`.

## 3. Cau Hinh Bien Moi Truong

Trong Vercel -> Project Settings -> Environment Variables, them:

1. `SANITY_PROJECT_ID`
2. `SANITY_DATASET` (vi du: `production`)
3. `SANITY_API_TOKEN` (tuy chon, can neu dataset private)
4. `SANITY_API_VERSION` (tuy chon, mac dinh `2024-08-01`)
5. `SANITY_REVALIDATE_SECONDS` (tuy chon, mac dinh `300`)

Local:

```bash
cp .env.example .env.local
```

## 4. Quy Trinh Cap Nhat Noi Dung

1. Mo Sanity Studio (hoac Sanity Manage content editor).
2. Tao/sua document `product`.
3. Publish thay doi.
4. Cho he thong revalidate (thuong 1-5 phut).

## 5. Gia Tri Category Nen Dung

1. `healthy-communities`
2. `books`
3. `literature`
4. `health-topics`
5. `clinicians`
6. `multimedia`
7. `apparel`

## 6. Khac Phuc Su Co

1. San pham khong hien:
   Kiem tra `slug`, `title`, `categorySlug`, `published`.
2. Anh khong hien:
   Upload lai anh, publish lai.
3. Web van dung du lieu fallback:
   Kiem tra dung `SANITY_PROJECT_ID` va `SANITY_DATASET` tren moi truong deploy.

## 7. Luu Y Bao Mat

1. Khong dua `SANITY_API_TOKEN` ra phia client.
2. Nen dung token read-only.
3. Chi dat token o environment variables phia server.
