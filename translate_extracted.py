#!/usr/bin/env python3
"""
Translate extracted PCRM.org data to Vietnamese using Google Translate
"""

import json
import os
import time

# Alternative: sử dụng library google-trans-new (không cần auth)
try:
    from google_trans_new import google_translator
    USE_GOOGLE_TRANS = True
except:
    USE_GOOGLE_TRANS = False
    print("⚠️ google_trans_new not installed, trying google.cloud...")

OUTPUT_DIR = "pcrm_translated"
INPUT_FILE = f"{OUTPUT_DIR}/extracted_raw.json"

def translate_with_google_trans_new(text, target_lang='vi'):
    """Dùng google-trans-new (free, không cần API key)"""
    if not text or len(text.strip()) < 3:
        return text
    
    try:
        translator = google_translator()
        # Giới hạn text để tránh lỗi
        if len(text) > 3000:
            text = text[:3000]
        
        translated = translator.translate(text, lang_src='en', lang_tgt=target_lang)
        return translated
    except Exception as e:
        print(f"⚠️ Translation error: {e}")
        return text

def load_extracted_data():
    """Load extracted data"""
    if not os.path.exists(INPUT_FILE):
        print(f"❌ File not found: {INPUT_FILE}")
        return []
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def translate_page_data(page_data):
    """Translate một page"""
    translated = {
        "url": page_data["url"],
        "title": translate_with_google_trans_new(page_data["title"]),
        "title_en": page_data["title"],
        "description": translate_with_google_trans_new(page_data["description"]),
        "description_en": page_data["description"],
        "h1": [translate_with_google_trans_new(h) for h in page_data["h1"]],
        "h1_en": page_data["h1"],
        "h2": [translate_with_google_trans_new(h) for h in page_data["h2"]],
        "h2_en": page_data["h2"],
        "h3": [translate_with_google_trans_new(h) for h in page_data["h3"]],
        "h3_en": page_data["h3"],
        "paragraphs": [translate_with_google_trans_new(p) for p in page_data["paragraphs"][:10]],  # Only first 10
        "paragraphs_en": page_data["paragraphs"][:10],
        "images": page_data["images"],
        "links": page_data["links"],
        "buttons": [translate_with_google_trans_new(b) for b in page_data["buttons"]],
        "buttons_en": page_data["buttons"],
        "form_fields": [
            {
                "name": f.get("name"),
                "label": translate_with_google_trans_new(f.get("label", "")),
                "label_en": f.get("label"),
                "type": f.get("type")
            }
            for f in page_data["form_fields"]
        ],
        "extracted_at": page_data["extracted_at"]
    }
    return translated

def main():
    if not USE_GOOGLE_TRANS:
        print("❌ google-trans-new not installed. Installing...")
        os.system("pip install -q google-trans-new")
        return
    
    print("=" * 60)
    print("🌐 Translating PCRM.org content to Vietnamese")
    print("=" * 60)
    
    # Load extracted data
    print(f"\n📥 Loading extracted data from {INPUT_FILE}...")
    pages_data = load_extracted_data()
    
    if not pages_data:
        print("❌ No data to translate!")
        return
    
    print(f"✅ Loaded {len(pages_data)} pages")
    
    # Translate
    print(f"\n🔄 Translating {len(pages_data)} pages to Vietnamese...\n")
    translated_data = []
    
    for i, page in enumerate(pages_data, 1):
        print(f"  [{i}/{len(pages_data)}] {page['url']}")
        
        try:
            translated = translate_page_data(page)
            translated_data.append(translated)
        except Exception as e:
            print(f"  ❌ Error: {e}")
            continue
        
        # Delay
        time.sleep(0.2)
    
    # Save
    print(f"\n💾 Saving translated data...")
    with open(f"{OUTPUT_DIR}/translated_all.json", 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Translation complete!")
    print(f"📊 Translated {len(translated_data)}/{len(pages_data)} pages")
    print(f"💾 Saved to: {OUTPUT_DIR}/translated_all.json")

if __name__ == "__main__":
    main()
