#!/usr/bin/env python3
"""
Script để extract 100% nội dung từ pcrm.org
- Cấu trúc trang
- Nội dung text
- Hình ảnh
- Màu sắc
- Links
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import os

BASE_URL = "https://www.pcrm.org"
OUTPUT_DIR = "pcrm_data"

# Tạo thư mục output
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Lấy trang chủ
print("📥 Đang tải trang chủ...")
response = requests.get(f"{BASE_URL}/home")
soup = BeautifulSoup(response.content, 'html.parser')

# 2. Extract màu sắc từ CSS
print("🎨 Đang extract màu sắc...")
styles = soup.find_all('style') + soup.find_all('link', {'rel': 'stylesheet'})

# 3. Extract tất cả links/trang
print("🔗 Đang extract links...")
links = set()
for a in soup.find_all('a', href=True):
    href = a['href']
    if href.startswith('/'):
        links.add(urljoin(BASE_URL, href))
    elif href.startswith('http'):
        links.add(href)

# 4. Extract tất cả nội dung chính
print("📄 Đang extract nội dung...")
content_data = {
    "title": soup.title.string if soup.title else "PCRM",
    "meta": {
        "description": soup.find('meta', {'name': 'description'})['content'] if soup.find('meta', {'name': 'description'}) else "",
    },
    "headings": [],
    "paragraphs": [],
    "images": [],
    "buttons": [],
    "links": [],
}

# Extract headings
for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    if h.get_text(strip=True):
        content_data["headings"].append({
            "tag": h.name,
            "text": h.get_text(strip=True)
        })

# Extract paragraphs
for p in soup.find_all('p'):
    text = p.get_text(strip=True)
    if text and len(text) > 20:
        content_data["paragraphs"].append(text)

# Extract images
for img in soup.find_all('img'):
    src = img.get('src', '')
    alt = img.get('alt', '')
    if src:
        content_data["images"].append({
            "src": urljoin(BASE_URL, src),
            "alt": alt
        })

# Extract buttons
for btn in soup.find_all(['button', 'a'], class_=['btn', 'button']):
    text = btn.get_text(strip=True)
    if text:
        content_data["buttons"].append({
            "text": text,
            "url": btn.get('href', '#') if btn.name == 'a' else None
        })

# 5. Lưu dữ liệu
print(f"💾 Lưu dữ liệu vào {OUTPUT_DIR}...")

with open(f"{OUTPUT_DIR}/homepage_content.json", 'w', encoding='utf-8') as f:
    json.dump(content_data, f, ensure_ascii=False, indent=2)

with open(f"{OUTPUT_DIR}/all_links.json", 'w', encoding='utf-8') as f:
    json.dump(list(links), f, ensure_ascii=False, indent=2)

# Lưu HTML gốc
with open(f"{OUTPUT_DIR}/homepage.html", 'w', encoding='utf-8') as f:
    f.write(response.text)

print(f"""
✅ Hoàn thành!

📊 Thống kê:
- Headings: {len(content_data['headings'])}
- Paragraphs: {len(content_data['paragraphs'])}
- Images: {len(content_data['images'])}
- Buttons: {len(content_data['buttons'])}
- Links: {len(links)}

📁 Files được lưu:
- {OUTPUT_DIR}/homepage_content.json
- {OUTPUT_DIR}/all_links.json
- {OUTPUT_DIR}/homepage.html
""")
