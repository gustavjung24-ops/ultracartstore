# PCRM Mirror Audit

Generated at: 2026-05-05T05:01:17+00:00

## 1. Final category map
- Health and Nutrition News -> Tin sức khỏe và dinh dưỡng
- Innovative Science News -> Tin khoa học đổi mới
- Good Science Digest -> Bản tin khoa học
- Good Medicine -> Y học tốt
- News Releases -> Thông cáo báo chí

## 2. Summary counts
- already_exists: 9
- missing_on_site: 31
- wrong_category_mapping: 0
- wrong_image_mapping: 4
- ready_to_import: 31

## 3. Wrong category mapping
- (none)

## 4. Wrong image mapping
- https://www.pcrm.org/news/innovative-science/progress-expanding-organ-donor-pool | sourceImage=https://www.pcrm.org/sites/default/files/2026-01/kidney-illustration.jpg | observedImage=https://www.pcrm.org/sites/default/files/styles/teaser_400x225/public/2026-03/SOT.jpg
- https://www.pcrm.org/news/good-science-digest/human-health-human-science-how-physicians-committee-improving-public | sourceImage=https://www.pcrm.org/sites/default/files/2025-04/National%20Public%20Health%20Week%20GSD.jpg | observedImage=https://www.pcrm.org/sites/default/files/2026-03/octopus.jpeg
- https://www.pcrm.org/news/good-science-digest/physicians-committee-calls-greater-investment-human-based-research-nimh | sourceImage=https://www.pcrm.org/sites/default/files/2026-03/MRI-scans.jpg | observedImage=https://www.pcrm.org/sites/default/files/2026-03/octopus.jpeg
- https://www.pcrm.org/news/news-releases/swapping-meat-and-dairy-plant-based-foods-cuts-climate-pollution-35-randomized | sourceImage=https://www.pcrm.org/sites/default/files/2026-04/healthy-bowl.jpg | observedImage=https://www.pcrm.org/sites/default/files/2021-04/doctors-climate-change.jpg

## 5. Mode state
- SAFE_MODE: True
- ALLOW_FULL_BODY_MIRROR: False
- ENABLE_IMAGE_DOWNLOAD: False

## 6. Files updated by pipeline
- scripts/pcrm/config.py
- scripts/pcrm/common.py
- scripts/pcrm/fetch-category-pages.py
- scripts/pcrm/fetch-article-details.py
- scripts/pcrm/compare-with-local.py
- scripts/pcrm/build-import-drafts.py
- scripts/pcrm/sync-images.py
- scripts/pcrm/run-pipeline.py
- docs/pcrm-mirror-audit.md
- docs/pcrm-mirror-import-report.md
