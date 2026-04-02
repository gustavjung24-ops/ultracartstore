# Huong Dan Admin Airtable (Tieng Viet)

Website nay da duoc ket noi Airtable nhu mot CMS don gian.

Neu da cau hinh bien moi truong Airtable, website se doc du lieu tu Airtable.
Neu chua cau hinh, website se tu dong dung du lieu du phong trong code.

## 1. Admin Co The Lam Gi

1. Them san pham moi.
2. Sua ten, gia, mo ta, danh muc va link lien he.
3. Keo tha anh san pham truc tiep trong Airtable.
4. An/hien san pham bang checkbox.
5. Gan san pham lien quan bang danh sach slug.

## 2. Tao Cau Truc Airtable

Tao 1 table ten `Products`.

Them cac cot dung ten nhu sau:

1. `Slug` (Single line text) (bat buoc)
2. `Title` (Single line text) (bat buoc)
3. `Category` (Single line text hoac Single select) (bat buoc)
4. `CategoryLabel` (Single line text) (tuy chon)
5. `Price` (Single line text) (tuy chon)
6. `Unit` (Single line text) (tuy chon)
7. `SKU` (Single line text) (tuy chon)
8. `ShortDescription` (Long text) (tuy chon)
9. `LongDescription` (Long text) (tuy chon)
10. `ContactNote` (Long text) (tuy chon)
11. `WhatsAppUrl` (URL) (tuy chon)
12. `ZaloUrl` (URL) (tuy chon)
13. `PhoneNumber` (Single line text) (tuy chon)
14. `Images` (Attachment, cho phep nhieu anh) (tuy chon)
15. `RelatedSlugs` (Long text) (tuy chon)
16. `Published` (Checkbox) (tuy chon)

Luu y:

1. `Slug` phai duy nhat va than thien URL. Vi du: `plant-powered-shirt`.
2. `RelatedSlugs` co the nhap cach nhau boi dau phay hoac xuong dong.
3. Neu bo check `Published`, san pham se bi an khoi website.

## 3. Cau Hinh Bien Moi Truong

Trong Vercel -> Project Settings -> Environment Variables, them:

1. `AIRTABLE_TOKEN`
2. `AIRTABLE_BASE_ID`
3. `AIRTABLE_PRODUCTS_TABLE` (mac dinh: `Products`)
4. `AIRTABLE_REVALIDATE_SECONDS` (tuy chon, mac dinh: `300`)

Voi local: copy `.env.example` thanh `.env.local` roi dien gia tri.

## 4. Cach Admin Them San Pham

1. Mo Airtable -> table `Products`.
2. Them 1 dong moi.
3. Dien 3 cot bat buoc: `Slug`, `Title`, `Category`.
4. Dien cac cot con lai (gia, mo ta, link).
5. Keo tha anh vao cot `Images`.
6. Bat checkbox `Published`.
7. Luu.

Website se tu cap nhat (thuong trong 1-5 phut, tuy theo revalidate va luong truy cap).

## 5. Cach Sua Hoac An San Pham

1. Sua truc tiep gia tri o dong san pham.
2. Muon an san pham: bo check `Published`.
3. He thong se dong bo tu dong.

## 6. Gia Tri Category Nen Dung

Danh sach danh muc khuyen nghi:

1. `healthy-communities`
2. `books`
3. `literature`
4. `health-topics`
5. `clinicians`
6. `multimedia`
7. `apparel`

## 7. Khac Phuc Su Co Thuong Gap

1. San pham khong hien:
   Kiem tra `Slug`, `Title`, `Category` khong duoc trong va `Published` dang bat.
2. Anh khong hien:
   Upload lai anh o cot `Images`, doi 1 phut roi refresh.
3. Website khong lay du lieu Airtable:
   Kiem tra dung bien moi truong trong Vercel.

## 8. Luu Y Bao Mat

1. Khong dua `AIRTABLE_TOKEN` ra phia client.
2. Chi dat token trong environment variables phia server.
3. Dung token Airtable voi quyen toi thieu can thiet.
