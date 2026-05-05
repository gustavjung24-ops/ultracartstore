# PCRM Mirror - Chỉnh Sửa Hoàn Tất

Ngày: 2026-05-05T05:05:00Z

## 1. Trạng Thái Hoàn Tất

### Nội dung Tiếng Anh
✅ **Đầy đủ**: Tất cả 31 bài ready-to-import đều có sourceTitleEn và excerptEn.

### Nội dung Tiếng Việt
✅ **Dịch xong**: 31/31 bài có titleVi và excerptVi
- Phương pháp: Google Translate API (free endpoint)
- Cache: pcrm_translated/mirror/translate_vi_cache.json
- Chất lượng: Bản dịch tự động, cần biên tập context khi import thật

### Ảnh từ Web PCRM
✅ **Giữ nguyên**: Tất cả 31 bài đều dùng sourceImageUrl từ PCRM (source gốc)
- **3 bài lọc bỏ tracking pixel**: Detected là `p.alocdn.com/...p.gif` (nhiễu từ live site, không phải ảnh)
  - American Heart Association Recommends Plant-Based Protein Over Meat
  - Plant-Based Diets Reduce the Risk of Cancer
  - Doctors Group Files Legal Petition Urging USDA to Require Colorectal Cancer Warning Labels
- **4 bài ảnh thực sự khác**: Live site dùng ảnh khác so với PCRM source, nhưng vẫn sẽ dùng PCRM source khi import
  - Progress in Expanding the Organ Donor Pool
  - Human Health, Human Science: How the Physicians Committee Is Improving Public Health
  - Physicians Committee Calls for Greater Investment in Human-Based Research at NIMH
  - Swapping Meat and Dairy for Plant-Based Foods Cuts Climate Pollution

## 2. Cấu Trúc Map

✅ **Đúng**: Category map EN→VI 100% chính xác
- Health and Nutrition News → Tin sức khỏe và dinh dưỡng
- Innovative Science News → Tin khoa học đổi mới
- Good Science Digest → Bản tin khoa học
- Good Medicine → Y học tốt
- News Releases → Thông cáo báo chí

✅ **Schema**: 100% field bắt buộc có đầy đủ
- sourceTitleEn, sourceUrl, sourceCategory, publishedAt, sourceImageUrl, excerptEn
- localCategoryVi, canonicalUrl, status, attributionVi

## 3. Danh Sách 31 Bài Ready-to-Import

| # | Title (EN) | Category | VI Title |
|-|-|-|-|
| 1 | More Evidence that Red Meat Increases Diabetes Risk | Health and Nutrition News | Thêm bằng chứng cho thấy thịt đỏ làm tăng nguy cơ mắc bệnh tiểu đường |
| 2 | Vegan Diet Supports Healthy Growth in Infants | Health and Nutrition News | Chế độ ăn Thuần chay Hỗ trợ Sự phát triển khỏe mạnh ở Trẻ sơ sinh |
| 3 | Vegetarian Diet Advantageous Over Animal-Based Diet for Kidney Disease | Health and Nutrition News | Chế độ ăn Chay có lợi hơn so với Chế độ ăn dựa trên Động vật đối với Bệnh thận |
| 4 | Butter Associated With Increased Risk of Death From All Causes | Health and Nutrition News | Bơ Có liên quan đến Nguy cơ Tử vong tăng lên từ Tất cả các nguyên nhân |
| 5 | First Death Documented From Tick-Induced Meat Allergy | Health and Nutrition News | Cái chết đầu tiên được ghi chép từ Dị ứng thịt do Ve gây ra |
| 6 | Menopausal Hormone Therapy Linked to Autoimmune Diseases | Health and Nutrition News | Liệu pháp Nội tiết tố Mãn kinh Có liên kết với Các bệnh Tự miễn |
| 7 | Poultry Is Major Source of Urinary Tract Infection | Health and Nutrition News | Gia cầm là Nguồn chính của Nhiễm trùng Đường tiết niệu |
| 8 | Heart Disease Is Predictable and May Be Preventable | Health and Nutrition News | Bệnh Tim là Có thể dự đoán được và Có thể được Phòng ngừa |
| 9 | New 3D-Printed "Organ Building Blocks" Could Reduce Dependence on Donor Organs | Innovative Science News | "Khối Xây dựng Cơ quan" in 3D Mới có thể Giảm Sự phụ thuộc vào Các cơ quan Hiến tặng |
| 10 | Virtual Twin Modeling Enables Individualized Drug Dosing for Pediatric Cancer | Innovative Science News | Mô hình Độc lập Ảo cho phép Liều lượng Thuốc được cá nhân hóa cho Ung thư Nhi khoa |
| ... | (20 bài khác) | ... | ... |

*Xem đầy đủ: [pcrm_translated/mirror/import_drafts.json](../pcrm_translated/mirror/import_drafts.json)*

## 4. File Output Chính

| File | Mục đích |
|--|--|
| `pcrm_translated/mirror/import_drafts.json` | 31 bài sẵn sàng import (EN + VI) |
| `pcrm_translated/mirror/import_drafts_with_images.json` | Copy của trên (ENABLE_IMAGE_DOWNLOAD=false) |
| `pcrm_translated/mirror/compare_report.json` | Báo cáo so sánh local/live (đã reclassify) |
| `pcrm_translated/mirror/translate_vi_cache.json` | Cache dịch VI (62 chuỗi) |
| `docs/pcrm-mirror-audit.md` | Kiểm tra cấu trúc & mode |
| `docs/pcrm-mirror-import-report.md` | Tóm tắt import plan |

## 5. Script Mới (Automation)

| Script | Mục đích |
|--|--|
| `scripts/pcrm/translate-drafts-to-vi.py` | Dịch title/excerpt EN→VI bằng Google API |
| `scripts/pcrm/reclassify-image-mismatches.py` | Lọc tracking pixel từ wrong_image_mapping |
| `scripts/pcrm/merge-translations.py` | Merge VI từ cache vào drafts sau rebuild |

## 6. Bước Tiếp Theo (Manual)

1. **Kiểm tra chất lượng VI**: Review 5-10 bài mẫu (chất lượng dịch có context không)
2. **Xác nhận ảnh**: Spot-check 3-5 bài để confirm ảnh PCRM có phù hợp
3. **Import batch**: Chọn subset để import thử (ví dụ: 5 bài Health & Nutrition)
4. **QA trên site**: Check render, link, metadata có chính xác
5. **Scaled import**: Import toàn bộ 31 bài sau khi QA pass

## 7. Lưu Ý

- ✅ **Ảnh**: Giữ nguyên source PCRM (sourceImageUrl), bỏ qua tracking pixel noise
- ✅ **Map**: 100% chính xác EN→VI, không sai category
- ⚠️ **VI dịch**: Là dịch tự động, nên cần biên tập context trước khi publish (nếu muốn chất lượng cao)
- ✅ **SAFE_MODE**: Vẫn ON (không mirror full body text)
