
import os
os.makedirs("pcrm_translated", exist_ok=True)
#!/usr/bin/env python3
"""
Create Vietnamese translation for PCRM.org main pages
Dùng dictionary + manual translation cho các trang quan trọng
"""

import json

# Dictionary cơ bản
TRANSLATION_DICT = {
    "Home": "Trang chủ",
    "About Us": "Về chúng tôi",
    "Physicians Committee for Responsible Medicine": "Hội bác sĩ vì y học xứ sở có trách nhiệm",
    "Good Nutrition": "Dinh dưỡng tốt",
    "Ethical Science": "Khoa học đạo đức",
    "Clinical Research": "Nghiên cứu lâm sàng",
    "Health Topics": "Các chủ đề sức khỏe",
    "Contact": "Liên hệ",
    "Donate": "Quyên góp",
    "Blog": "Blog",
    "News": "Tin tức",
    "Research": "Nghiên cứu",
    "Health and Nutrition News": "Tin tức sức khỏe và dinh dưỡng",
    "Innovative Science News": "Tin tức khoa học sáng tạo",
    "Make your 2026 membership gift today!": "Hãy tặng quà thành viên năm 2026 hôm nay!",
    "Donate Now": "Quyên góp ngay",
}

# Dữ liệu trung tâm cho PCRM.org Vietnam
PCRM_VIETNAMESE_DATA = {
    "site": {
        "name_en": "Physicians Committee for Responsible Medicine",
        "name_vi": "Hội bác sĩ vì y học xứ sở có trách nhiệm",
        "description_en": "A nonprofit health organization that promotes preventive medicine, conducts clinical research, and encourages higher standards for ethics and effectiveness in research and medical training.",
        "description_vi": "Một tổ chức y tế phi lợi nhuận thúc đẩy y học dự phòng, tiến hành nghiên cứu lâm sàng, và khuyến khích các tiêu chuẩn cao hơn về đạo đức và hiệu quả trong nghiên cứu và đào tạo y tế.",
        "logo": "/images/pcrm-logo.png",
        "color_primary": "#007fab",
        "color_secondary": "#f0ad4e",
    },
    "navigation": [
        {
            "label_en": "Home",
            "label_vi": "Trang chủ",
            "href": "/"
        },
        {
            "label_en": "About Us",
            "label_vi": "Về chúng tôi",
            "href": "/about"
        },
        {
            "label_en": "Good Nutrition",
            "label_vi": "Dinh dưỡng tốt",
            "href": "/good-nutrition"
        },
        {
            "label_en": "Ethical Science",
            "label_vi": "Khoa học đạo đức",
            "href": "/ethical-science"
        },
        {
            "label_en": "Clinical Research",
            "label_vi": "Nghiên cứu lâm sàng",
            "href": "/clinical-research"
        },
        {
            "label_en": "Health Topics",
            "label_vi": "Các chủ đề sức khỏe",
            "href": "/health-topics"
        },
        {
            "label_en": "Blog",
            "label_vi": "Blog",
            "href": "/blog"
        },
        {
            "label_en": "Contact",
            "label_vi": "Liên hệ",
            "href": "/contact"
        },
        {
            "label_en": "Donate",
            "label_vi": "Quyên góp",
            "href": "/donate"
        }
    ],
    "pages": {
        "home": {
            "title_en": "Welcome to PCRM - Promote Your Health Naturally",
            "title_vi": "Chào mừng đến PCRM - Thúc đẩy Sức khỏe của bạn Tự nhiên",
            "hero_title_en": "Transform the way you eat with evidence-based medical guidance and practical kitchen skills.",
            "hero_title_vi": "Thay đổi cách bạn ăn uống với hướng dẫn y tế dựa trên bằng chứng và những kỹ năng bếp thực tế.",
            "cta_text_en": "Join Our Community",
            "cta_text_vi": "Tham gia cộng đồng của chúng tôi",
            "cta_href": "/join"
        },
        "about": {
            "title_en": "About Physicians Committee for Responsible Medicine",
            "title_vi": "Về Hội bác sĩ vì y học xứ sở có trách nhiệm",
            "content_en": "For 40 years, the Physicians Committee has been leading the way for people, animals, and the planet. We promote preventive medicine, conduct groundbreaking clinical research, and advocate for higher standards in medical training and ethical science.",
            "content_vi": "Trong 40 năm qua, Hội bác sĩ đã dẫn đầu cho người dân, động vật và hành tinh. Chúng tôi thúc đẩy y học dự phòng, tiến hành nghiên cứu lâm sàng độc lập, và ủng hộ các tiêu chuẩn cao hơn trong đào tạo y tế và khoa học đạo đức."
        },
        "donate": {
            "title_en": "Make a Donation Today",
            "title_vi": "Quyên góp hôm nay",
            "subtitle_en": "Support our mission to transform health through science and compassion",
            "subtitle_vi": "Hỗ trợ sứ mệnh của chúng tôi để thay đổi sức khỏe thông qua khoa học và lòng trắc ẩn",
            "payment_methods_en": ["PayPal", "Credit Card", "Bank Transfer"],
            "payment_methods_vi": ["PayPal", "Thẻ tín dụng", "Chuyển khoản ngân hàng"]
        },
        "contact": {
            "title_en": "Contact Us",
            "title_vi": "Liên hệ với chúng tôi",
            "email_label_en": "Email",
            "email_label_vi": "Email",
            "phone_label_en": "Phone",
            "phone_label_vi": "Điện thoại",
            "address_label_en": "Address",
            "address_label_vi": "Địa chỉ",
            "message_label_en": "Message",
            "message_label_vi": "Lời nhắn",
            "submit_button_en": "Send Message",
            "submit_button_vi": "Gửi lời nhắn"
        }
    },
    "footer": {
        "copyright_en": "© 2026 Physicians Committee for Responsible Medicine. All rights reserved.",
        "copyright_vi": "© 2026 Hội bác sĩ vì y học xứ sở có trách nhiệm. Tất cả quyền được bảo lưu.",
        "links": [
            {
                "label_en": "Privacy Policy",
                "label_vi": "Chính sách bảo mật",
                "href": "/privacy"
            },
            {
                "label_en": "Terms of Service",
                "label_vi": "Điều khoản dịch vụ",
                "href": "/terms"
            }
        ]
    }
}

# Lưu vào file
output_file = "pcrm_translated/pcrm_vietnamese_data.json"

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(PCRM_VIETNAMESE_DATA, f, ensure_ascii=False, indent=2)

print(f"✅ Vietnamese data saved to: {output_file}")
print("\nSample data:")
print(json.dumps(PCRM_VIETNAMESE_DATA["site"], ensure_ascii=False, indent=2))
