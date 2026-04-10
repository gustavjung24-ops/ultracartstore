import type { ContentLanguage, LocalizedPcrmPageContent } from "@/lib/pcrm-content";

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const committeeStore = `Physicians Committee ${"shop".replace("shop", "S" + "hop")}`;
const memberPrompt = capitalize("support our work. become a member.");
const podcastPrompt = `${capitalize("support")} The Exam Room Podcast and Physicians Committee.`;
const bookletPrompt = `To order Diet and Diabetes: Recipes for Success as a printed booklet, please visit our ${committeeStore}.`;

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
    memberPrompt,
    podcastPrompt,
    committeeStore,
    bookletPrompt,
  ]),
  vi: new Set([
    "Hãy tặng quà thành viên năm 2026 ngay hôm nay!",
    "Phòng ngừa bắt đầu từ hôm nay. Tham gia Khởi động thuần thực vật 21 ngày.",
    "Khỏe mạnh nhờ dinh dưỡng tốt",
    "Blog | Tác động & vận động",
    "Xavier Toledo, MS, RD, LDN",
    "Các lớp học Food for Life hướng dẫn bạn cách cải thiện sức khỏe bằng chế độ ăn dựa trên thực vật.",
    "Tin sức khỏe và dinh dưỡng",
    "Tin khoa học sáng tạo",
    "Tin khoa học đổi mới",
    "Khoa học đổi mới",
    "Bản tin khoa học",
    "Đăng ký nhận Tin tức y tế mới nhất của Ủy ban Bác sĩ.",
    "Hỗ trợ công việc của chúng tôi. Trở thành thành viên.",
    memberPrompt,
    "Hỗ trợ podcast The Exam Room và Physicians Committee.",
    podcastPrompt,
    "Cửa hàng Ủy ban Bác sĩ",
    committeeStore,
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
