import enCommon from "@/public/locales/en/common.json";
import viCommon from "@/public/locales/vi/common.json";
import type { Language } from "@/lib/translations";

export type CommonLocaleDictionary = typeof enCommon;

export interface CatalogLabel {
  key: string;
  localePath?: string;
  fallback: Record<Language, string>;
}

export interface CatalogItem extends CatalogLabel {
  href: string;
  external?: boolean;
}

export interface HeaderTopGroup extends CatalogLabel {
  id: string;
  href: string;
  items: CatalogItem[];
}

export interface HeaderMainGroup extends CatalogLabel {
  id: string;
  href: string;
  columns: 2 | 3;
  items: CatalogItem[];
}

export const COMMON_LOCALES: Record<Language, CommonLocaleDictionary> = {
  en: enCommon,
  vi: viCommon,
};

function lookupPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (!acc || typeof acc !== "object") {
      return undefined;
    }

    return (acc as Record<string, unknown>)[segment];
  }, obj);
}

export function resolveLocaleText(locale: CommonLocaleDictionary, path?: string): string | undefined {
  if (!path) {
    return undefined;
  }

  const value = lookupPath(locale, path);
  return typeof value === "string" ? value : undefined;
}

export function resolveCatalogLabel(
  locale: CommonLocaleDictionary,
  language: Language,
  label: CatalogLabel,
): string {
  return resolveLocaleText(locale, label.localePath) ?? label.fallback[language];
}

export const HEADER_TOP_NAV_GROUPS: HeaderTopGroup[] = [
  {
    id: "forClinicians",
    href: "/good-nutrition/nutrition-for-clinicians",
    key: "topNav.forClinicians",
    localePath: "topNav.forClinicians",
    fallback: { en: "For Clinicians", vi: "Dành cho chuyên gia lâm sàng" },
    items: [
      {
        href: "/good-nutrition/nutrition-for-clinicians",
        key: "goodNutrition.nutritionForClinicians",
        localePath: "goodNutrition.nutritionForClinicians",
        fallback: { en: "Nutrition for Clinicians", vi: "Dinh dưỡng cho chuyên gia lâm sàng" },
      },
      {
        href: "/good-nutrition/nutrition-information",
        key: "goodNutrition.nutritionInformation",
        localePath: "goodNutrition.nutritionInformation",
        fallback: { en: "Nutrition Information", vi: "Kiến thức dinh dưỡng" },
      },
      {
        href: "/good-nutrition/plant-based-diets",
        key: "goodNutrition.plantBasedDiets",
        localePath: "goodNutrition.plantBasedDiets",
        fallback: { en: "Plant-Based Diets", vi: "Chế độ ăn dựa trên thực vật" },
      },
      {
        href: "/health-topics/heart-disease",
        key: "healthTopicsMenu.heartDisease",
        fallback: { en: "Heart Disease", vi: "Bệnh tim mạch" },
      },
    ],
  },
  {
    id: "forMedicalStudents",
    href: "/good-nutrition/nutrition-for-clinicians/medical-students",
    key: "topNav.forMedicalStudents",
    localePath: "topNav.forMedicalStudents",
    fallback: { en: "For Medical Students", vi: "Dành cho sinh viên y khoa" },
    items: [
      {
        href: "/good-nutrition/nutrition-for-clinicians/medical-students",
        key: "topNav.forMedicalStudents",
        localePath: "topNav.forMedicalStudents",
        fallback: { en: "For Medical Students", vi: "Dành cho sinh viên y khoa" },
      },
      {
        href: "/clinical-research/recruitment",
        key: "researchMenu.recruitment",
        fallback: { en: "Research Recruitment", vi: "Tuyển người tham gia nghiên cứu" },
      },
      {
        href: "/news/good-science-digest",
        key: "news.goodScienceDigest",
        localePath: "news.goodScienceDigest",
        fallback: { en: "Good Science Digest", vi: "Bản tin khoa học" },
      },
      {
        href: "/events",
        key: "utilityNav.events",
        localePath: "utilityNav.events",
        fallback: { en: "Events", vi: "Sự kiện" },
      },
    ],
  },
  {
    id: "forScientists",
    href: "/ethical-science",
    key: "topNav.forScientists",
    localePath: "topNav.forScientists",
    fallback: { en: "For Scientists", vi: "Dành cho nhà khoa học" },
    items: [
      {
        href: "/ethical-science",
        key: "mainNav.ethicalScience",
        localePath: "mainNav.ethicalScience",
        fallback: { en: "Ethical Science", vi: "Khoa học có đạo đức" },
      },
      {
        href: "/clinical-research",
        key: "research.clinicalResearch",
        localePath: "research.clinicalResearch",
        fallback: { en: "Clinical Research", vi: "Nghiên cứu lâm sàng" },
      },
      {
        href: "/news/innovative-science-news",
        key: "news.innovativeScienceNews",
        localePath: "news.innovativeScienceNews",
        fallback: { en: "Innovative Science News", vi: "Tin khoa học đổi mới" },
      },
      {
        href: "/term/scientists",
        key: "topNav.forScientists",
        localePath: "topNav.forScientists",
        fallback: { en: "For Scientists", vi: "Dành cho nhà khoa học" },
      },
    ],
  },
  {
    id: "aboutUs",
    href: "/about-us",
    key: "topNav.aboutUs",
    localePath: "topNav.aboutUs",
    fallback: { en: "About Us", vi: "Về chúng tôi" },
    items: [
      {
        href: "/about-us",
        key: "topNav.aboutUs",
        localePath: "topNav.aboutUs",
        fallback: { en: "About Us", vi: "Về chúng tôi" },
      },
      {
        href: "/about-us/our-victories",
        key: "aboutUs.impact",
        fallback: { en: "Impact Overview", vi: "Tổng quan tác động" },
      },
      {
        href: "/about-us/financial-report",
        key: "aboutUs.financialReport",
        fallback: { en: "Annual and Financial Reports", vi: "Báo cáo thường niên và tài chính" },
      },
      {
        href: "/about-us/careers",
        key: "utilityNav.careers",
        localePath: "utilityNav.careers",
        fallback: { en: "Careers", vi: "Tuyển dụng" },
      },
      {
        href: "/contact",
        key: "utilityNav.contact",
        localePath: "utilityNav.contact",
        fallback: { en: "Contact", vi: "Liên hệ" },
      },
      {
        href: "/authors",
        key: "mainNav.authors",
        localePath: "mainNav.authors",
        fallback: { en: "Authors", vi: "Tác giả" },
      },
    ],
  },
];

export const HEADER_MAIN_NAV_GROUPS: HeaderMainGroup[] = [
  {
    id: "goodNutrition",
    href: "/good-nutrition",
    columns: 3,
    key: "mainNav.goodNutrition",
    localePath: "mainNav.goodNutrition",
    fallback: { en: "Good Nutrition", vi: "Dinh dưỡng lành mạnh" },
    items: [
      { href: "/good-nutrition", key: "goodNutrition.title", localePath: "goodNutrition.title", fallback: { en: "Good Nutrition", vi: "Dinh dưỡng lành mạnh" } },
      { href: "/good-nutrition/plant-based-diets", key: "goodNutrition.plantBasedDiets", localePath: "goodNutrition.plantBasedDiets", fallback: { en: "Plant-Based Diets", vi: "Chế độ ăn dựa trên thực vật" } },
      { href: "/good-nutrition/nutrition-information", key: "goodNutrition.nutritionInformation", localePath: "goodNutrition.nutritionInformation", fallback: { en: "Nutrition Information", vi: "Kiến thức dinh dưỡng" } },
      { href: "/good-nutrition/plant-based-diets/nutrition-faq", key: "goodNutrition.plantBasedNutritionFAQ", localePath: "goodNutrition.plantBasedNutritionFAQ", fallback: { en: "Plant-Based Nutrition FAQ", vi: "Câu hỏi thường gặp về dinh dưỡng thực vật" } },
      { href: "/good-nutrition/plant-based-diets/recipes", key: "goodNutrition.recipes", localePath: "goodNutrition.recipes", fallback: { en: "Recipes", vi: "Công thức món ăn" } },
      { href: "/good-nutrition/nutrition-for-athletes", key: "goodNutrition.nutritionForAthletes", localePath: "goodNutrition.nutritionForAthletes", fallback: { en: "Nutrition for Athletes", vi: "Dinh dưỡng cho vận động viên" } },
      { href: "/good-nutrition/plant-based-diets/pregnancy", key: "goodNutrition.pregnancy", localePath: "goodNutrition.pregnancy", fallback: { en: "Pregnancy", vi: "Thai kỳ" } },
      { href: "/good-nutrition/nutrition-for-kids", key: "goodNutrition.nutritionForKids", localePath: "goodNutrition.nutritionForKids", fallback: { en: "Nutrition for Kids", vi: "Dinh dưỡng cho trẻ em" } },
      { href: "/good-nutrition/nutrition-for-clinicians", key: "goodNutrition.nutritionForClinicians", localePath: "goodNutrition.nutritionForClinicians", fallback: { en: "Nutrition for Clinicians", vi: "Dinh dưỡng cho chuyên gia lâm sàng" } },
      { href: "/good-nutrition/healthy-communities", key: "goodNutrition.healthyCommunities", localePath: "goodNutrition.healthyCommunities", fallback: { en: "Healthy Communities", vi: "Cộng đồng khỏe mạnh" } },
      { href: "/findadoctor", key: "goodNutrition.findADoctor", localePath: "goodNutrition.findADoctor", fallback: { en: "Find a Doctor", vi: "Tìm bác sĩ" } },
      { href: "/findadietitian", key: "goodNutrition.findADietitian", localePath: "goodNutrition.findADietitian", fallback: { en: "Find a Dietitian", vi: "Tìm chuyên gia dinh dưỡng" } }
    ],
  },
  {
    id: "healthTopics",
    href: "/health-topics",
    columns: 3,
    key: "mainNav.healthTopics",
    localePath: "mainNav.healthTopics",
    fallback: { en: "Health Topics", vi: "Chủ đề sức khỏe" },
    items: [
      { href: "/health-topics", key: "healthTopics.title", localePath: "healthTopics.title", fallback: { en: "Health Topics", vi: "Chủ đề sức khỏe" } },
      { href: "/health-topics/diabetes", key: "healthTopicsMenu.diabetes", fallback: { en: "Diabetes", vi: "Đái tháo đường" } },
      { href: "/health-topics/heart-disease", key: "healthTopicsMenu.heartDisease", fallback: { en: "Heart Disease", vi: "Bệnh tim mạch" } },
      { href: "/health-topics/high-blood-pressure", key: "healthTopicsMenu.highBloodPressure", fallback: { en: "High Blood Pressure", vi: "Tăng huyết áp" } },
      { href: "/health-topics/healthy-bones", key: "healthTopicsMenu.healthyBones", fallback: { en: "Healthy Bones", vi: "Sức khỏe xương" } },
      { href: "/health-topics/cancer", key: "healthTopicsMenu.cancer", fallback: { en: "Cancer", vi: "Ung thư" } },
      { href: "/health-topics/breast-cancer", key: "healthTopicsMenu.breastCancer", fallback: { en: "Breast Cancer", vi: "Ung thư vú" } },
      { href: "/health-topics/colorectal-cancer", key: "healthTopicsMenu.colorectalCancer", fallback: { en: "Colorectal Cancer", vi: "Ung thư đại trực tràng" } },
      { href: "/health-topics/weight-loss", key: "healthTopicsMenu.weightLoss", fallback: { en: "Weight Loss", vi: "Kiểm soát cân nặng" } }
    ],
  },
  {
    id: "ethicalScience",
    href: "/ethical-science",
    columns: 2,
    key: "mainNav.ethicalScience",
    localePath: "mainNav.ethicalScience",
    fallback: { en: "Ethical Science", vi: "Khoa học có đạo đức" },
    items: [
      { href: "/ethical-science", key: "ethicalScience.title", localePath: "ethicalScience.title", fallback: { en: "Ethical Science", vi: "Khoa học có đạo đức" } },
      { href: "/ethical-science/animals-in-medical-research", key: "ethicalScienceMenu.animalsInMedicalResearch", fallback: { en: "Animals in Medical Research", vi: "Động vật trong nghiên cứu y khoa" } },
      { href: "/ethical-science/animal-testing-and-alternatives", key: "ethicalScienceMenu.animalTestingAlternatives", fallback: { en: "Animal Testing and Alternatives", vi: "Thử nghiệm trên động vật và giải pháp thay thế" } },
      { href: "/ethical-science/animal-testing-and-alternatives/human-tissue-research", key: "ethicalScienceMenu.humanTissueResearch", fallback: { en: "Human Tissue Research", vi: "Nghiên cứu mô người" } },
      { href: "/ethical-science/ethical-education-and-training/surgery-training", key: "ethicalScienceMenu.surgeryTraining", fallback: { en: "Surgery Training", vi: "Đào tạo phẫu thuật" } },
      { href: "/ethical-science/ethical-education-and-training/paramedic-training", key: "ethicalScienceMenu.paramedicTraining", fallback: { en: "Paramedic Training", vi: "Đào tạo cấp cứu ngoại viện" } },
      { href: "/ethical-science/ethical-education-and-training/ERA21", key: "ethicalScienceMenu.era21", fallback: { en: "ERA21", vi: "ERA21" } },
      { href: "/ethical-science/animal-testing-and-alternatives/animal-free-antibodies", key: "ethicalScienceMenu.animalFreeAntibodies", fallback: { en: "Animal-Free Antibodies", vi: "Kháng thể không dùng động vật" } }
    ],
  },
  {
    id: "ourResearch",
    href: "/clinical-research",
    columns: 2,
    key: "mainNav.ourResearch",
    localePath: "mainNav.ourResearch",
    fallback: { en: "Our Research", vi: "Nghiên cứu của chúng tôi" },
    items: [
      { href: "/clinical-research", key: "research.title", localePath: "research.title", fallback: { en: "Our Research", vi: "Nghiên cứu của chúng tôi" } },
      { href: "/clinical-research/recruitment", key: "researchMenu.recruitment", fallback: { en: "Recruitment", vi: "Tuyển người tham gia" } },
      { href: "/t2dstudy", key: "researchMenu.t2dStudy", fallback: { en: "T2D Study", vi: "Nghiên cứu T2D" } },
      { href: "/clinical-research/endometriosis", key: "researchMenu.endometriosis", fallback: { en: "Endometriosis", vi: "Lạc nội mạc tử cung" } },
      { href: "/clinical-research/fighting-hot-flashes-with-diet", key: "researchMenu.fightingHotFlashesWithDiet", fallback: { en: "Fighting Hot Flashes with Diet", vi: "Kiểm soát bốc hỏa bằng chế độ ăn" } }
    ],
  },
  {
    id: "news",
    href: "/news",
    columns: 2,
    key: "mainNav.news",
    localePath: "mainNav.news",
    fallback: { en: "News & Events", vi: "Thông tin & sự kiện" },
    items: [
      { href: "/news", key: "news.title", localePath: "news.title", fallback: { en: "News & Events", vi: "Thông tin & sự kiện" } },
      { href: "/news/blog", key: "newsMenu.allNews", fallback: { en: "All News", vi: "Tất cả tin bài" } },
      { href: "/news/health-nutrition", key: "news.healthNutrition", localePath: "news.healthNutrition", fallback: { en: "Health and Nutrition News", vi: "Tin sức khỏe và dinh dưỡng" } },
      { href: "/news/innovative-science-news", key: "news.innovativeScienceNews", localePath: "news.innovativeScienceNews", fallback: { en: "Innovative Science News", vi: "Tin khoa học đổi mới" } },
      { href: "/news/good-science-digest", key: "news.goodScienceDigest", localePath: "news.goodScienceDigest", fallback: { en: "Good Science Digest", vi: "Bản tin khoa học" } },
      { href: "/news/good-medicine", key: "newsMenu.goodMedicine", fallback: { en: "Good Medicine", vi: "Y học tốt" } },
      { href: "/news/media-center", key: "news.mediaCenter", localePath: "news.mediaCenter", fallback: { en: "Media Center", vi: "Trung tâm truyền thông" } },
      { href: "/news/news-releases", key: "newsMenu.newsReleases", fallback: { en: "News Releases", vi: "Thông cáo báo chí" } },
      { href: "/events", key: "utilityNav.events", localePath: "utilityNav.events", fallback: { en: "Events", vi: "Sự kiện" } }
    ],
  },
  {
    id: "authors",
    href: "/authors",
    columns: 2,
    key: "mainNav.authors",
    localePath: "mainNav.authors",
    fallback: { en: "Authors", vi: "Tác giả" },
    items: [],
  },
  {
    id: "resources",
    href: "/free-downloads",
    columns: 2,
    key: "mainNav.resources",
    localePath: "mainNav.resources",
    fallback: { en: "Resources", vi: "Tài nguyên" },
    items: [
      { href: "/free-downloads", key: "utilityNav.resources", localePath: "utilityNav.resources", fallback: { en: "Resources", vi: "Tài nguyên" } },
      { href: "/contact", key: "utilityNav.contact", localePath: "utilityNav.contact", fallback: { en: "Contact", vi: "Liên hệ" } },
      { href: "/authors", key: "mainNav.authors", localePath: "mainNav.authors", fallback: { en: "Authors", vi: "Tác giả" } },
      { href: "/about-us/financial-report", key: "resources.financialReports", fallback: { en: "Reports", vi: "Báo cáo" } },
      { href: "/news/media-center", key: "utilityNav.mediaCenter", localePath: "utilityNav.mediaCenter", fallback: { en: "Media Center", vi: "Trung tâm truyền thông" } }
    ],
  },
];

export const FOOTER_UTILITY_LINKS: CatalogItem[] = [
  { href: "/events", key: "utilityNav.events", localePath: "utilityNav.events", fallback: { en: "Events", vi: "Sự kiện" } },
  { href: "/free-downloads", key: "utilityNav.resources", localePath: "utilityNav.resources", fallback: { en: "Resources", vi: "Tài nguyên" } },
  { href: "/contact", key: "utilityNav.contact", localePath: "utilityNav.contact", fallback: { en: "Contact", vi: "Liên hệ" } },
  { href: "/news/media-center", key: "utilityNav.mediaCenter", localePath: "utilityNav.mediaCenter", fallback: { en: "Media Center", vi: "Trung tâm truyền thông" } },
  { href: "/about-us/careers", key: "utilityNav.careers", localePath: "utilityNav.careers", fallback: { en: "Careers", vi: "Tuyển dụng" } },
  { href: "/authors", key: "mainNav.authors", localePath: "mainNav.authors", fallback: { en: "Authors", vi: "Tác giả" } },
];

export const FOOTER_LEGAL_LINKS: CatalogItem[] = [
  { href: "/privacy-policy", key: "footerLegal.privacyPolicy", localePath: "footerLegal.privacyPolicy", fallback: { en: "Privacy Policy", vi: "Chính sách bảo mật" } },
  { href: "/terms-of-use", key: "footerLegal.termsOfUse", localePath: "footerLegal.termsOfUse", fallback: { en: "Terms of Use", vi: "Điều khoản sử dụng" } },
];
