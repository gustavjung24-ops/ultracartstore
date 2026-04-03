# 🚀 PCRM Vietnam - Setup Hướng Dẫn

Đây là hướng dẫn chi tiết để setup và chạy dự án PCRM Vietnam với Sanity CMS, dịch tiếng Việt, và design PCRM.

## 📋 Yêu cầu

- Node.js 18+ 
- npm hoặc yarn
- Tài khoản Sanity (miễn phí trên sanity.io)
- API Key từ DeepL (tùy chọn, để dịch tốt hơn)

## 🏗️ Kiến trúc Dự Án

```
ultracartstore/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Trang chủ với hero section
│   ├── [...slug]/page.tsx    # Dynamic routing cho 50+ trang PCRM
│   ├── contact/page.tsx
│   ├── shop/page.tsx
│   └── news/blog/page.tsx    # Blog/Tin tức index
├── components/
│   ├── Header.tsx           # Navigation + Language Switcher
│   ├── Footer.tsx           # Footer với tất cả thông tin liên hệ
│   ├── LanguageSwitcher.tsx # EN/VI Toggle
│   └── ...
├── sanity/
│   ├── config.ts            # Sanity project config
│   ├── schemas/index.ts      # Document types (page, article, author, category)
│   └── lib/client.ts        # Sanity API client + GROQ queries
├── lib/
│   ├── pcrm-content.ts      # Content engine từ extracted JSON
│   └── store-data.ts        # Product data
├── scripts/
│   ├── import-to-sanity.js  # Import 50 trang vào Sanity CMS
│   ├── translate-deepl.js   # Dịch sang tiếng Việt (DeepL)
│   └── translate-google.js  # Fallback dịch (Google)
├── pcrm_translated/
│   ├── extracted_raw.json   # 50 trang từ crawl pcrm.org
│   ├── deepl_cache_vi.json  # Cache dịch DeepL
│   └── translated_vi.json   # Kết quả dịch hoàn chỉnh
└── .env.local              # Credentials (không commit lên git)
```

## 🔧 Installation & Setup

### 1. Clone/Unzip dự án

```bash
# Nếu chưa cài dependencies
npm install --legacy-peer-deps
```

### 2. Setup Sanity CMS

#### Option A: Tạo Sanity project mới (Khuyến nghị)

1. Vào https://sanity.io và đăng nhập/tạo tài khoản (miễn phí)
2. Tạo project mới:
   - Project name: "pcrm-vietnam" (hoặc tên khác)
   - Dataset name: "production"
   - Select "Structured Content"
3. Copy **Project ID** từ trang project settings
4. Tạo API Token:
   - Vào manage.sanity.io > API > Tokens
   - Click "Add API Token"
   - Tên: "Next.js Import"
   - Permission: "Editor" (để có quyền import dữ liệu)
   - Copy token

#### Option B: Sử dụng Sanity Schema hiện tại

Nếu bạn đã có Sanity project:
1. Copy schema files từ `sanity/schemas/` vào project Sanity Studio của bạn
2. Deploy schema lên Sanity

### 3. Setup Environment Variables

1. Copy `.env.example` sang `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Mở `.env.local` và điền thông tin:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_from_sanity
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_PROJECT_ID=your_project_id_from_sanity
   SANITY_API_TOKEN=your_api_token_from_sanity
   
   # Tùy chọn: DeepL cho dịch tiếng Việt chất lượng cao
   DEEPL_API_KEY=your_deepl_api_key_here
   ```

### 4. Setup Sanity Studio (Tùy chọn)

Để quản lý nội dung online:

```bash
# Tạo Sanity Studio
npx sanity@latest init --bare

# Hoặc upgrade CLI
npm install -g @sanity/cli

# Khởi chạy Studio
npm run sanity:studio
# Hoặc
sanity dev
```

Sanity Studio sẽ chạy ở `http://localhost:3333` hoặc port khác được chỉ định.

## 📥 Import Dữ Liệu vào Sanity

### 1. Dịch sang tiếng Việt (Tùy chọn)

Nếu bạn muốn dịch tất cả nội dung sang tiếng Việt:

**Với DeepL (Chất lượng cao):**
```bash
DEEPL_API_KEY=your_key node scripts/translate-deepl.js
```
Kết quả lưu ở `pcrm_translated/translated_vi.json`

**Với Google Translate fallback (Không cần API key):**
```bash
node scripts/translate-google.js
```

### 2. Import vào Sanity CMS

```bash
SANITY_PROJECT_ID=your_id SANITY_API_TOKEN=your_token node scripts/import-to-sanity.js
```

Script sẽ:
- Đọc 50 trang từ `pcrm_translated/extracted_raw.json`
- Tìm bản dịch tiếng Việt từ `pcrm_translated/translated_vi.json` (nếu có)
- Tạo documents trong Sanity với sẻp `page` hoặc `article` tùy vào URL
- Log tiến độ và lỗi (nếu có) vào console

## 🚀 Chạy Ứng Dụng

### Development Mode

```bash
npm run dev
```

App sẽ chạy ở http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

## 🌐 Sử Dụng Ứng Dụng

### 1. Trang Chủ
- Hero section với hình ảnh từ PCRM
- 6 bài viết tin tức mới nhất
- CTA buttons để quyên góp

### 2. Language Switcher (EN/VI)
- Đặt ở header, trên cùng bên phải
- Click để chuyển ngôn ngữ
- Lưu preference vào localStorage

### 3. Dynamic Pages
- Mọi trang từ pcrm.org được render động tại `/[category]/[slug]`
- Dữ liệu lấy từ Sanity hoặc fallback từ `lib/pcrm-content.ts`

### 4. Blog/News
- `/news/blog` - Index tất cả bài viết
- `/news/[slug]` - Chi tiết một bài viết

### 5. Donate Page
- `/donate` - Form quyên góp (PayPal integration ready)

## 🎨 Tùy Chỉnh Design

### Màu Sắc PCRM
Tất cả màu được định nghĩa ở `app/globals.css` dung CSS variables:
- Primary: `#005e86` (Teal đậm)
- Accent: `#ffb53d` (Yellow vàng)
- Dark: `#00425f`

Để thay đổi, chỉnh sửa:
```css
:root {
  --color-primary: #005e86;
  --color-accent: #ffb53d;
  --color-primary-dark: #00425f;
}
```

### Component Classes
Sẵn có các class CSS:
- `.btn, .btn-primary, .btn-accent, .btn-secondary` - Buttons
- `.card, .card-image, .card-body` - Card components
- `.hero, .hero-content` - Hero sections
- `.article-card` - Article cards

## 📊 Database & CMS

### Sanity Document Types

**page**
- title (EN + VI)
- description (EN + VI)
- content (Portable Text block editor, EN + VI)
- image (with hotspot)
- slug
- publishedAt

**article**
- title (EN + VI)
- description (EN + VI)
- content (EN + VI)
- image
- author (reference to author)
- category (reference to category)
- tags
- publishedAt

**author**
- name
- email
- image
- bio

**category**
- title
- slug
- description

## 🔄 Workflow

1. **Nội dung bản tiếng Anh**: Lấy từ pcrm.org (crawled)
2. **Dịch sang tiếng Việt**: Dùng DeepL hoặc Google Translate
3. **Lưu vào Sanity**: Import script tạo documents
4. **Render ứng dụng**: Next.js lấy data từ Sanity + hoặc fallback từ JSON
5. **Language toggle**: Người dùng chọn EN/VI, component hiển thị field tương ứng

## 🐛 Troubleshooting

### DeepL API keys không hoạt động
- Kiểm tra API key đúng từ deepl.com
- Kiểm tra có đủ quota (free tier: 500K char/tháng)
- Fallback sang Google Translate hoặc bỏ qua dịch

### Sanity import bị lỗi
- Kiểm tra PROJECT_ID và API_TOKEN đúng
- Kiểm tra token có permission "Editor"
- Kiểm tra dataset tồn tại và tên đúng

### Build lỗi
```bash
npm install --legacy-peer-deps
npm run build
```

### TypeScript errors
```bash
npm run type-check
```

## 📚 Tài Liệu

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [DeepL API](https://www.deepl.com/docs/api)

## 📝 File quan trọng

- `sanity.config.ts` - Sanity setup
- `sanity/lib/client.ts` - API client & queries
- `components/Header.tsx` - Navigation
- `app/globals.css` - Global styles & PCRM branding
- `scripts/import-to-sanity.js` - Data import
- `scripts/translate-deepl.js` - Translation

## 🎯 Next Steps

1. ✅ Setup Sanity project
2. ✅ Điền credentials vào .env.local
3. ✅ Dịch nội dung (tùy chọn)
4. ✅ Import vào Sanity
5. ✅ Test app: `npm run dev`
6. ✅ Tùy chỉnh design nếu cần
7. ✅ Deploy lên Vercel/hosting

## 💡 Tips

- Sanity Studio rất mạnh mẽ để quản lý nội dung
- Có thể upload hình ảnh trực tiếp trong Studio
- Responsive design đã được test trên mobile/tablet
- Performance tối ưu với Next.js ISR (incremental static regeneration)

---

**Có gì không rõ?** Hãy check lại các environment variables hoặc console logs để debug!
