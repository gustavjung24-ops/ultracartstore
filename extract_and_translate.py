#!/usr/bin/env python3
"""
Extract + Translate PCRM.org Content to Vietnamese
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json
import os
import time
from datetime import datetime
import anthropic

BASE_URL = "https://www.pcrm.org"
OUTPUT_DIR = "pcrm_translated"
MAX_PAGES = 50  # Giới hạn số trang để tránh quá lâu

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Khởi tạo Anthropic client
client = anthropic.Anthropic()

# Danh sách trang quan trọng cần crawl
PRIORITY_PAGES = [
    "/home",
    "/about-us",
    "/good-nutrition",
    "/ethical-science",
    "/clinical-research",
    "/health-topics",
    "/donate",
    "/contact",
    "/news/blog",
]

VISITED_URLS = set()
PAGE_DATA = []

def clean_text(text):
    """Làm sạch text"""
    return ' '.join(text.split())

def extract_page_content(url):
    """Extract nội dung từ một trang"""
    try:
        print(f"📄 Crawling: {url}")
        response = requests.get(url, timeout=10)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Xóa script/style tags
        for tag in soup(['script', 'style', 'nav', 'footer']):
            tag.decompose()
        
        page_info = {
            "url": url,
            "title": "",
            "description": "",
            "h1": [],
            "h2": [],
            "h3": [],
            "paragraphs": [],
            "images": [],
            "links": [],
            "buttons": [],
            "form_fields": [],
            "extracted_at": datetime.now().isoformat()
        }
        
        # Title
        if soup.title:
            page_info["title"] = soup.title.string
        
        # Meta description
        meta_desc = soup.find('meta', {'name': 'description'})
        if meta_desc:
            page_info["description"] = meta_desc.get('content', '')
        
        # Headings
        for h1 in soup.find_all('h1'):
            text = clean_text(h1.get_text())
            if text and len(text) > 3:
                page_info["h1"].append(text)
        
        for h2 in soup.find_all('h2'):
            text = clean_text(h2.get_text())
            if text and len(text) > 3 and 'navigation' not in text.lower():
                page_info["h2"].append(text)
        
        for h3 in soup.find_all('h3'):
            text = clean_text(h3.get_text())
            if text and len(text) > 3:
                page_info["h3"].append(text)
        
        # Paragraphs
        for p in soup.find_all('p'):
            text = clean_text(p.get_text())
            if text and len(text) > 20:
                page_info["paragraphs"].append(text)
        
        # Images
        for img in soup.find_all('img'):
            src = img.get('src', '')
            alt = img.get('alt', '')
            if src and not 'tracking' in src and not 'pixel' in src:
                page_info["images"].append({
                    "src": urljoin(BASE_URL, src),
                    "alt": alt
                })
        
        # Links
        for a in soup.find_all('a', href=True):
            href = a.get('href', '')
            text = clean_text(a.get_text())
            if text and len(text) > 2:
                full_url = urljoin(BASE_URL, href)
                if BASE_URL in full_url:
                    page_info["links"].append({
                        "text": text,
                        "url": full_url
                    })
        
        # Buttons
        for btn in soup.find_all(['button', 'input'], type='submit'):
            text = clean_text(btn.get_text() or btn.get('value', ''))
            if text:
                page_info["buttons"].append(text)
        
        # Form fields
        for form in soup.find_all('form'):
            for field in form.find_all(['input', 'textarea', 'select']):
                name = field.get('name', '')
                label_text = field.get('placeholder', '') or field.get('aria-label', '')
                if name:
                    page_info["form_fields"].append({
                        "name": name,
                        "label": label_text,
                        "type": field.get('type', 'text')
                    })
        
        return page_info
    
    except Exception as e:
        print(f"❌ Error crawling {url}: {e}")
        return None

def extract_all_links(soup, base_url=BASE_URL):
    """Extract tất cả links từ trang"""
    links = set()
    for a in soup.find_all('a', href=True):
        href = a.get('href', '')
        if href.startswith('/'):
            full_url = urljoin(base_url, href)
            # Xóa query parameters
            full_url = full_url.split('?')[0]
            if full_url not in VISITED_URLS:
                links.add(full_url)
    return links

def crawl_website():
    """Crawl toàn bộ website"""
    global VISITED_URLS, PAGE_DATA
    
    print(f"🔍 Bắt đầu crawl pcrm.org (max {MAX_PAGES} pages)...")
    
    # Bắt đầu từ priority pages
    urls_to_visit = [urljoin(BASE_URL, page) for page in PRIORITY_PAGES]
    
    while urls_to_visit and len(VISITED_URLS) < MAX_PAGES:
        url = urls_to_visit.pop(0)
        
        if url in VISITED_URLS:
            continue
        
        VISITED_URLS.add(url)
        
        page_data = extract_page_content(url)
        if page_data:
            PAGE_DATA.append(page_data)
            
            # Extract thêm links từ trang này
            try:
                response = requests.get(url, timeout=10)
                soup = BeautifulSoup(response.content, 'html.parser')
                new_links = extract_all_links(soup)
                urls_to_visit.extend(new_links)
            except:
                pass
        
        # Delay để không spam server
        time.sleep(0.5)
    
    print(f"✅ Crawl xong! Extracted {len(PAGE_DATA)} pages")
    return PAGE_DATA

def translate_text(text, target_language="Vietnamese"):
    """Dịch text bằng Claude"""
    if not text or len(text.strip()) < 3:
        return text
    
    try:
        # Giới hạn text để không quá dài
        if len(text) > 2000:
            text = text[:2000]
        
        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": f"""Vui lòng dịch đoạn text sau sang {target_language}. 
Chỉ dịch nôi dung, không giải thích thêm. Giữ nguyên ý nghĩa và tính chuyên nghiệp.

Text cần dịch:
{text}"""
                }
            ]
        )
        return message.content[0].text
    except Exception as e:
        print(f"⚠️ Translation error: {e}")
        return text

def translate_page_data(page_data):
    """Dịch toàn bộ dữ liệu của một trang"""
    translated = {
        "url": page_data["url"],
        "url_vi": page_data["url"],  # URL giữ nguyên
        "title": translate_text(page_data["title"]),
        "title_en": page_data["title"],
        "description": translate_text(page_data["description"]),
        "description_en": page_data["description"],
        "h1": [translate_text(h) for h in page_data["h1"]],
        "h1_en": page_data["h1"],
        "h2": [translate_text(h) for h in page_data["h2"]],
        "h2_en": page_data["h2"],
        "h3": [translate_text(h) for h in page_data["h3"]],
        "h3_en": page_data["h3"],
        "paragraphs": [translate_text(p) for p in page_data["paragraphs"]],
        "paragraphs_en": page_data["paragraphs"],
        "images": page_data["images"],
        "links": page_data["links"],
        "buttons": [translate_text(b) for b in page_data["buttons"]],
        "buttons_en": page_data["buttons"],
        "form_fields": [
            {
                "name": f.get("name"),
                "label": translate_text(f.get("label", "")),
                "label_en": f.get("label"),
                "type": f.get("type")
            }
            for f in page_data["form_fields"]
        ],
        "extracted_at": page_data["extracted_at"]
    }
    return translated

def main():
    print("=" * 60)
    print("🌐 PCRM.org Content Extraction & Translation to Vietnamese")
    print("=" * 60)
    
    # 1. Crawl
    print("\n📥 STEP 1: Crawling pcrm.org...")
    crawl_website()
    
    # Save raw extracted data
    with open(f"{OUTPUT_DIR}/extracted_raw.json", 'w', encoding='utf-8') as f:
        json.dump(PAGE_DATA, f, ensure_ascii=False, indent=2)
    print(f"💾 Saved raw data: {OUTPUT_DIR}/extracted_raw.json")
    
    # 2. Translate
    print(f"\n🔄 STEP 2: Translating {len(PAGE_DATA)} pages to Vietnamese...")
    translated_data = []
    
    for i, page in enumerate(PAGE_DATA, 1):
        print(f"  [{i}/{len(PAGE_DATA)}] Translating: {page['url']}")
        translated = translate_page_data(page)
        translated_data.append(translated)
        
        # Save individual page (backup)
        safe_filename = page['url'].replace('https://', '').replace('/', '_') + '.json'
        with open(f"{OUTPUT_DIR}/pages/{safe_filename}", 'w', encoding='utf-8') as f:
            json.dump(translated, f, ensure_ascii=False, indent=2)
    
    # 3. Save all translated data
    with open(f"{OUTPUT_DIR}/translated_all.json", 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Translation complete!")
    print(f"💾 Saved to: {OUTPUT_DIR}/translated_all.json")
    
    # 4. Summary
    print("\n📊 Summary:")
    print(f"  - Total pages: {len(translated_data)}")
    print(f"  - Total paragraphs: {sum(len(p['paragraphs']) for p in translated_data)}")
    print(f"  - Total images: {sum(len(p['images']) for p in translated_data)}")
    print(f"  - Total links: {sum(len(p['links']) for p in translated_data)}")
    
    return translated_data

if __name__ == "__main__":
    os.makedirs(f"{OUTPUT_DIR}/pages", exist_ok=True)
    main()
