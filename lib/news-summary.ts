import type { ContentLanguage, LocalizedPcrmPageContent } from "@/lib/pcrm-content";

const SUMMARY_NOISE_BY_LANGUAGE: Record<ContentLanguage, Set<string>> = {
  en: new Set([
    "Make your 2026 membership gift today!",
    "Prevention starts today. Join the 21-Day Vegan Kickstart.",
    "Get Healthy With Good Nutrition",
    "Blog | Impact & Advocacy",
    "Xavier Toledo, MS, RD, LDN",
    "Food for Life classes teach you how to improve your health with a plant-based diet.",
    "Health and Nutrition News",
    "Innovative Science News",
    "Good Science Digest",
    "Subscribe to the Physicians Committee's Breaking Medical News.",
    "Support our work. Become a member.",
    "Support The Exam Room Podcast and Physicians Committee.",
    "Physicians Committee Shop",
    "To order Diet and Diabetes: Recipes for Success as a printed booklet, please visit our Physicians Committee Shop.",
  ]),
  vi: new Set([
    "Hãy tặng quà thành viên năm 2026 ngay hôm nay!",
    "Phòng ngừa bắt đầu từ hôm nay. Tham gia Khởi động thuần chay 21 ngày.",
    "Khỏe mạnh nhờ dinh dưỡng tốt",
    "Blog | Tác động & Vận động",
    "Xavier Toledo, MS, RD, LDN",
    "Các lớp học Food for Life hướng dẫn bạn cách cải thiện sức khỏe của mình bằng chế độ ăn dựa trên thực vật.",
    "Tin tức sức khỏe và dinh dưỡng",
    "Tin tức khoa học sáng tạo",
    "Tin khoa học đổi mới",
    "Khoa học đổi mới",
    "Bản tin khoa học",
    "Đăng ký nhận Tin tức y tế mới nhất của Ủy ban bác sĩ.",
    "Hỗ trợ công việc của chúng tôi. Trở thành thành viên.",
    "Support our work. Become a member.",
    "Hỗ trợ podcast The Exam Room và Physicians Committee.",
    "Support The Exam Room Podcast and Physicians Committee.",
    "Cửa hàng Ủy ban Bác sĩ",
    "Physicians Committee Shop",
    "Để đặt mua Diet and Diabetes: Recipes for Success dưới dạng tập sách in, vui lòng truy cập Cửa hàng Ủy ban Bác sĩ.",
  ]),
};

export function isNewsArticlePath(path: string): boolean {
  const segments = path.split("/").filter(Boolean);
  return segments.length >= 3 && segments[0] === "news";
}

export function isNoisyNewsSummaryLine(value: string | undefined, lang: ContentLanguage): boolean {
  if (typeof value !== "string") {
    return true;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }

  return SUMMARY_NOISE_BY_LANGUAGE[lang].has(trimmed);
}

export function getCleanNewsSummary(
  localized: Pick<LocalizedPcrmPageContent, "paragraphs" | "description">,
  lang: ContentLanguage,
): string {
  const paragraphSummary = localized.paragraphs.find((paragraph) => !isNoisyNewsSummaryLine(paragraph, lang));
  if (paragraphSummary) {
    return paragraphSummary;
  }

  if (!isNoisyNewsSummaryLine(localized.description, lang)) {
    return localized.description;
  }

  return localized.paragraphs[0] || localized.description;
}
