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
  vi: viCommon as CommonLocaleDictionary,
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
  label: CatalogLabel
): string {
  return resolveLocaleText(locale, label.localePath) || label.fallback[language];
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
        key: "topNavMenus.forClinicians.nutritionForClinicians",
        fallback: { en: "Nutrition for Clinicians", vi: "Dinh dưỡng cho chuyên gia lâm sàng" },
      },
      {
        href: "/good-nutrition/nutrition-for-clinicians/medical-students",
        key: "topNavMenus.forClinicians.medicalStudents",
        localePath: "topNav.forMedicalStudents",
        fallback: { en: "Medical Students", vi: "Sinh viên y khoa" },
      },
      {
        href: "/good-nutrition/nutrition-information",
        key: "topNavMenus.forClinicians.nutritionInformation",
        localePath: "goodNutrition.nutritionInformation",
        fallback: { en: "Nutrition Information", vi: "Kiến thức dinh dưỡng" },
      },
      {
        href: "/good-nutrition/nutrition-information/protein",
        key: "topNavMenus.forClinicians.protein",
        fallback: { en: "Protein", vi: "Protein" },
      },
      {
        href: "/good-nutrition/nutrition-information/fiber",
        key: "topNavMenus.forClinicians.fiber",
        fallback: { en: "Fiber", vi: "Chất xơ" },
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
        key: "topNavMenus.forMedicalStudents.overview",
        fallback: { en: "Overview", vi: "Tổng quan" },
      },
      {
        href: "/clinical-research/recruitment",
        key: "topNavMenus.forMedicalStudents.researchRecruitment",
        fallback: { en: "Research Recruitment", vi: "Tuyển người tham gia nghiên cứu" },
      },
      {
        href: "/events",
        key: "topNavMenus.forMedicalStudents.events",
        localePath: "utilityNav.events",
        fallback: { en: "Events", vi: "Sự kiện" },
      },
      {
        href: "/news/good-science-digest",
        key: "topNavMenus.forMedicalStudents.goodScienceDigest",
        fallback: { en: "Good Science Digest", vi: "Bản tin khoa học" },
      },
    ],
  },
  {
    id: "forScientists",
    href: "/term/scientists",
    key: "topNav.forScientists",
    localePath: "topNav.forScientists",
    fallback: { en: "For Scientists", vi: "Dành cho nhà khoa học" },
    items: [
      {
        href: "/term/scientists",
        key: "topNavMenus.forScientists.overview",
        fallback: { en: "Overview", vi: "Tổng quan" },
      },
      {
        href: "/ethical-science",
        key: "topNavMenus.forScientists.ethicalScience",
        localePath: "mainNav.ethicalScience",
        fallback: { en: "Ethical Science", vi: "Khoa học có đạo đức" },
      },
      {
        href: "/clinical-research",
        key: "topNavMenus.forScientists.clinicalResearch",
        localePath: "research.clinicalResearch",
        fallback: { en: "Clinical Research", vi: "Nghiên cứu lâm sàng" },
      },
      {
        href: "/news/innovative-science-news",
        key: "topNavMenus.forScientists.innovativeScienceNews",
        fallback: { en: "Innovative Science News", vi: "Tin khoa học đổi mới" },
      },
    ],
  },
  {
    id: "aboutUs",
    href: "/about-us",
    key: "topNav.aboutUs",
    localePath: "topNav.aboutUs",
    fallback: { en: "About Us", vi: "Giới thiệu" },
    items: [
      {
        href: "/about-us#leadership",
        key: "topNavMenus.aboutUs.leadership",
        fallback: { en: "Leadership", vi: "Ban lãnh đạo" },
      },
      {
        href: "/about-us/our-victories",
        key: "topNavMenus.aboutUs.ourVictories",
        fallback: { en: "Our Victories", vi: "Thành tựu của chúng tôi" },
      },
      {
        href: "/about-us/careers",
        key: "topNavMenus.aboutUs.careers",
        localePath: "utilityNav.careers",
        fallback: { en: "Careers", vi: "Tuyển dụng" },
      },
      {
        href: "/about-us/careers/internships",
        key: "topNavMenus.aboutUs.internships",
        fallback: { en: "Internships", vi: "Thực tập" },
      },
      {
        href: "/events",
        key: "topNavMenus.aboutUs.events",
        localePath: "utilityNav.events",
        fallback: { en: "Events", vi: "Sự kiện" },
      },
      {
        href: "/about-us/financial-report",
        key: "topNavMenus.aboutUs.annualFinancialReports",
        fallback: { en: "Annual & Financial Reports", vi: "Báo cáo thường niên và tài chính" },
      },
      {
        href: "/barnard-medical-center",
        key: "topNavMenus.aboutUs.barnardMedicalCenter",
        localePath: "utilityNav.barnardMedicalCenter",
        fallback: { en: "Barnard Medical Center", vi: "Trung tâm Y khoa Barnard" },
      },
      {
        href: "/contact",
        key: "topNavMenus.aboutUs.contactUs",
        localePath: "utilityNav.contact",
        fallback: { en: "Contact Us", vi: "Liên hệ" },
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
      { href: "/good-nutrition", key: "goodNutritionMenu.overview", fallback: { en: "Overview", vi: "Tổng quan" } },
      { href: "/good-nutrition/plant-based-diets", key: "goodNutrition.plantBasedDiets", localePath: "goodNutrition.plantBasedDiets", fallback: { en: "Plant-Based Diets", vi: "Chế độ ăn dựa trên thực vật" } },
      { href: "/good-nutrition/three-reasons-go-vegan", key: "goodNutrition.threeReasonsToGoVegan", localePath: "goodNutrition.threeReasonsToGoVegan", fallback: { en: "Three Reasons to go VEGAN!", vi: "Ba lý do để ăn thuần chay" } },
      { href: "/good-nutrition/plant-based-diets/ffl", key: "goodNutrition.foodForLifeClasses", localePath: "goodNutrition.foodForLifeClasses", fallback: { en: "Food for Life Classes", vi: "Lớp học Food for Life" } },
      { href: "/good-nutrition/plant-based-diets/nutrition-faq", key: "goodNutrition.plantBasedNutritionFAQ", localePath: "goodNutrition.plantBasedNutritionFAQ", fallback: { en: "Plant-Based Nutrition FAQ", vi: "Câu hỏi thường gặp về dinh dưỡng dựa trên thực vật" } },
      { href: "/veganstarterkit", key: "goodNutrition.veganStarterKit", localePath: "goodNutrition.veganStarterKit", fallback: { en: "Vegan Starter Kit", vi: "Bộ khởi đầu thuần chay" } },
      { href: "/good-nutrition/plant-based-diets/recipes", key: "goodNutrition.recipes", localePath: "goodNutrition.recipes", fallback: { en: "Recipes", vi: "Công thức món ăn" } },
      { href: "/good-nutrition/nutrition-for-athletes", key: "goodNutrition.nutritionForAthletes", localePath: "goodNutrition.nutritionForAthletes", fallback: { en: "Nutrition for Athletes", vi: "Dinh dưỡng cho vận động viên" } },
      { href: "/good-nutrition/plant-based-diets/pregnancy", key: "goodNutrition.pregnancy", localePath: "goodNutrition.pregnancy", fallback: { en: "Pregnancy", vi: "Thai kỳ" } },
      { href: "/good-nutrition/nutrition-for-kids", key: "goodNutrition.nutritionForKids", localePath: "goodNutrition.nutritionForKids", fallback: { en: "Nutrition for Kids", vi: "Dinh dưỡng cho trẻ em" } },
      { href: "/universalmeals", key: "goodNutritionMenu.universalMeals", fallback: { en: "Universal Meals", vi: "Bữa ăn toàn dân" } },
      { href: "/good-nutrition/nutrition-information", key: "goodNutrition.nutritionInformation", localePath: "goodNutrition.nutritionInformation", fallback: { en: "Nutrition Information", vi: "Kiến thức dinh dưỡng" } },
      { href: "/good-nutrition/nutrition-information/the-carbohydrate-advantage", key: "goodNutritionMenu.carbohydrateAdvantage", fallback: { en: "The Carbohydrate Advantage", vi: "Lợi thế carbohydrate" } },
      { href: "/good-nutrition/nutrition-information/fiber", key: "goodNutritionMenu.fiber", fallback: { en: "Fiber", vi: "Chất xơ" } },
      { href: "/good-nutrition/nutrition-information/protein", key: "goodNutritionMenu.protein", fallback: { en: "Protein", vi: "Protein" } },
      { href: "/good-nutrition/nutrition-information/soy-and-health", key: "goodNutritionMenu.soyAndHealth", fallback: { en: "Soy and Health", vi: "Đậu nành và sức khỏe" } },
      { href: "/good-nutrition/nutrition-information/lowering-cholesterol-with-a-plant-based-diet", key: "goodNutritionMenu.loweringCholesterol", fallback: { en: "Lowering Cholesterol", vi: "Giảm cholesterol" } },
      { href: "/good-nutrition/nutrition-information/health-concerns-about-dairy", key: "goodNutritionMenu.concernsAboutDairy", fallback: { en: "Concerns About Dairy", vi: "Lo ngại về sản phẩm sữa" } },
      { href: "/good-nutrition/nutrition-information/chicken", key: "goodNutritionMenu.chicken", fallback: { en: "Chicken", vi: "Thịt gà" } },
      { href: "/good-nutrition/nutrition-information/health-concerns-with-eggs", key: "goodNutritionMenu.concernsWithEggs", fallback: { en: "Concerns With Eggs", vi: "Lo ngại về trứng" } },
      { href: "/good-nutrition/nutrition-information/processed-meat", key: "goodNutritionMenu.processedMeat", fallback: { en: "Processed Meat", vi: "Thịt chế biến sẵn" } },
      { href: "/good-nutrition/vegan-diet-environment", key: "goodNutritionMenu.veganDietEnvironment", fallback: { en: "Vegan Diet and Environment", vi: "Ăn thuần chay và môi trường" } },
      { href: "/good-nutrition/nutrition-for-clinicians", key: "goodNutritionMenu.nutritionForClinicians", fallback: { en: "Nutrition for Clinicians", vi: "Dinh dưỡng cho chuyên gia lâm sàng" } },
      { href: "/good-nutrition/healthy-communities", key: "goodNutrition.healthyCommunities", localePath: "goodNutrition.healthyCommunities", fallback: { en: "Healthy Communities", vi: "Cộng đồng khỏe mạnh" } },
      { href: "/good-nutrition/nutrition-programs-policies", key: "goodNutritionMenu.programsPolicies", fallback: { en: "Programs & Policies", vi: "Chương trình và chính sách" } },
      { href: "/take-action", key: "mainNav.takeAction", localePath: "mainNav.takeAction", fallback: { en: "Take Action", vi: "Cùng hành động" } },
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
      { href: "/health-topics", key: "healthTopicsMenu.overview", fallback: { en: "Overview", vi: "Tổng quan" } },
      { href: "/health-topics/alzheimers", key: "healthTopicsMenu.alzheimers", fallback: { en: "Alzheimer's", vi: "Alzheimer" } },
      { href: "/health-topics/arthritis", key: "healthTopicsMenu.arthritis", fallback: { en: "Arthritis", vi: "Viêm khớp" } },
      { href: "/health-topics/asthma", key: "healthTopicsMenu.asthma", fallback: { en: "Asthma", vi: "Hen suyễn" } },
      { href: "/health-topics/breast-cancer", key: "healthTopicsMenu.breastCancer", fallback: { en: "Breast Cancer", vi: "Ung thư vú" } },
      { href: "/health-topics/cancer", key: "healthTopicsMenu.cancer", fallback: { en: "Cancer", vi: "Ung thư" } },
      { href: "/health-topics/colorectal-cancer", key: "healthTopicsMenu.colorectalCancer", fallback: { en: "Colorectal Cancer", vi: "Ung thư đại trực tràng" } },
      { href: "/health-topics/coronavirus", key: "healthTopicsMenu.coronavirus", fallback: { en: "Coronavirus", vi: "Coronavirus" } },
      { href: "/health-topics/diabetes", key: "healthTopicsMenu.diabetes", fallback: { en: "Diabetes", vi: "Tiểu đường" } },
      { href: "/health-topics/gut-bacteria", key: "healthTopicsMenu.gutBacteria", fallback: { en: "Gut Bacteria", vi: "Vi khuẩn đường ruột" } },
      { href: "/health-topics/healthy-aging", key: "healthTopicsMenu.healthyAging", fallback: { en: "Healthy Aging", vi: "Lão hóa khỏe mạnh" } },
      { href: "/health-topics/healthy-bones", key: "healthTopicsMenu.healthyBones", fallback: { en: "Healthy Bones", vi: "Xương khỏe mạnh" } },
      { href: "/health-topics/heart-disease", key: "healthTopicsMenu.heartDisease", fallback: { en: "Heart Disease", vi: "Bệnh tim" } },
      { href: "/health-topics/high-blood-pressure", key: "healthTopicsMenu.highBloodPressure", fallback: { en: "High Blood Pressure", vi: "Cao huyết áp" } },
      { href: "/health-topics/migraines", key: "healthTopicsMenu.migraines", fallback: { en: "Migraines", vi: "Đau nửa đầu" } },
      { href: "/health-topics/ovarian-cancer", key: "healthTopicsMenu.ovarianCancer", fallback: { en: "Ovarian Cancer", vi: "Ung thư buồng trứng" } },
      { href: "/health-topics/polycystic-ovarian-syndrome", key: "healthTopicsMenu.pcos", fallback: { en: "Polycystic Ovarian Syndrome", vi: "Hội chứng buồng trứng đa nang" } },
      { href: "/health-topics/prostate-cancer", key: "healthTopicsMenu.prostateCancer", fallback: { en: "Prostate Cancer", vi: "Ung thư tuyến tiền liệt" } },
      { href: "/health-topics/weight-loss", key: "healthTopicsMenu.weightLoss", fallback: { en: "Weight Loss", vi: "Giảm cân" } }
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
      { href: "/ethical-science", key: "ethicalScienceMenu.overview", fallback: { en: "Overview", vi: "Tổng quan" } },
      { href: "/ethical-science/ethical-education-and-training/surgery-training", key: "ethicalScienceMenu.surgeryTraining", fallback: { en: "Surgery Training", vi: "Đào tạo phẫu thuật" } },
      { href: "/ethical-science/ethical-education-and-training/paramedic-training", key: "ethicalScienceMenu.paramedicTraining", fallback: { en: "Paramedic Training", vi: "Đào tạo cấp cứu" } },
      { href: "/ethical-science/animals-in-medical-research", key: "ethicalScienceMenu.animalsInMedicalResearch", fallback: { en: "Animals in Medical Research", vi: "Động vật trong nghiên cứu y khoa" } },
      { href: "/dogs", key: "ethicalScienceMenu.dogs", fallback: { en: "Dogs", vi: "Chó" } },
      { href: "/ethical-science/animals-in-medical-research/alzheimers-disease-research-without-animals", key: "ethicalScienceMenu.alzheimersWithoutAnimals", fallback: { en: "Alzheimer's Research Without Animals", vi: "Nghiên cứu Alzheimer không dùng động vật" } },
      { href: "/ethical-science/ethical-education-and-training/ERA21", key: "ethicalScienceMenu.era21", fallback: { en: "ERA21", vi: "ERA21" } },
      { href: "/ethical-science/animal-testing-and-alternatives", key: "ethicalScienceMenu.animalTestingAlternatives", fallback: { en: "Animal Testing & Alternatives", vi: "Thử nghiệm trên động vật và giải pháp thay thế" } },
      { href: "/ethical-science/animal-testing-and-alternatives/animal-free-antibodies", key: "ethicalScienceMenu.animalFreeAntibodies", fallback: { en: "Animal-Free Antibodies", vi: "Kháng thể không dùng động vật" } },
      { href: "/ethical-science/animal-testing-and-alternatives/chemical-testing-reform", key: "ethicalScienceMenu.chemicalTestingReform", fallback: { en: "Chemical Testing Reform", vi: "Cải cách thử nghiệm hóa chất" } },
      { href: "/ethical-science/animal-testing-and-alternatives/cruelty-free-cosmetics", key: "ethicalScienceMenu.crueltyFreeCosmetics", fallback: { en: "Cruelty-Free Cosmetics", vi: "Mỹ phẩm không thử nghiệm trên động vật" } },
      { href: "/ethical-science/animal-testing-and-alternatives/nura", key: "ethicalScienceMenu.nura", fallback: { en: "Alternatives to Animal Use", vi: "Giải pháp thay thế sử dụng động vật" } },
      { href: "/ethical-science/animal-testing-and-alternatives/human-tissue-research", key: "ethicalScienceMenu.humanTissueResearch", fallback: { en: "Human Tissue Research", vi: "Nghiên cứu mô người" } }
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
      { href: "/clinical-research", key: "researchMenu.overview", fallback: { en: "Overview", vi: "Tổng quan" } },
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
    fallback: { en: "News", vi: "Tin tức" },
    items: [
      { href: "/news", key: "newsMenu.overview", fallback: { en: "Overview", vi: "Tổng quan" } },
      { href: "/podcast", key: "newsMenu.podcast", fallback: { en: "Podcast", vi: "Podcast" } },
      { href: "/news/blog", key: "newsMenu.allNews", fallback: { en: "All News", vi: "Tất cả tin tức" } },
      { href: "/news/health-nutrition", key: "news.healthNutrition", localePath: "news.healthNutrition", fallback: { en: "Health and Nutrition News", vi: "Tin tức sức khỏe và dinh dưỡng" } },
      { href: "/news/innovative-science-news", key: "newsMenu.innovativeScienceNews", fallback: { en: "Innovative Science News", vi: "Tin khoa học đổi mới" } },
      { href: "/news/good-science-digest", key: "newsMenu.goodScienceDigest", fallback: { en: "Good Science Digest", vi: "Bản tin khoa học" } },
      { href: "/news/good-medicine", key: "newsMenu.goodMedicine", fallback: { en: "Good Medicine", vi: "Y học tốt" } },
      { href: "/news/media-center", key: "news.mediaCenter", localePath: "news.mediaCenter", fallback: { en: "Media Center", vi: "Trung tâm truyền thông" } },
      { href: "/news/news-releases", key: "newsMenu.newsReleases", fallback: { en: "News Releases", vi: "Thông cáo báo chí" } },
      { href: "/yourbodyinbalance", key: "newsMenu.yourBodyInBalance", fallback: { en: "Your Body in Balance", vi: "Your Body in Balance" } }
    ],
  },
  {
    id: "waysToGive",
    href: "/donate",
    columns: 2,
    key: "mainNav.waysToGive",
    localePath: "mainNav.waysToGive",
    fallback: { en: "Ways to Give", vi: "Các cách ủng hộ" },
    items: [
      { href: "/donate", key: "waysToGive.donate", localePath: "waysToGive.donate", fallback: { en: "Donate", vi: "Quyên góp" } },
      { href: "/donate", key: "waysToGive.donateNow", localePath: "waysToGive.donateNow", fallback: { en: "Donate Now", vi: "Quyên góp ngay" } },
      { href: "/take-action", key: "mainNav.takeAction", localePath: "mainNav.takeAction", fallback: { en: "Take Action", vi: "Cùng hành động" } },
      { href: "/about-us/our-victories", key: "waysToGiveMenu.ourVictories", fallback: { en: "Our Victories", vi: "Thành tựu của chúng tôi" } },
      { href: "/about-us/financial-report", key: "waysToGiveMenu.annualFinancialReports", fallback: { en: "Annual & Financial Reports", vi: "Báo cáo thường niên và tài chính" } },
      { href: "/about-us/careers", key: "waysToGiveMenu.careers", localePath: "utilityNav.careers", fallback: { en: "Careers", vi: "Tuyển dụng" } }
    ],
  },
  {
    id: "takeAction",
    href: "/take-action",
    columns: 2,
    key: "mainNav.takeAction",
    localePath: "mainNav.takeAction",
    fallback: { en: "Take Action", vi: "Cùng hành động" },
    items: [],
  }
];

export const FOOTER_UTILITY_LINKS: CatalogItem[] = [
  { href: "/events", key: "utilityNav.events", localePath: "utilityNav.events", fallback: { en: "Events", vi: "Sự kiện" } },
  { href: "/shop", key: "utilityNav.shop", localePath: "utilityNav.shop", fallback: { en: "Shop", vi: "Cửa hàng" } },
  { href: "/contact", key: "utilityNav.contact", localePath: "utilityNav.contact", fallback: { en: "Contact", vi: "Liên hệ" } },
  { href: "/news/media-center", key: "utilityNav.mediaCenter", localePath: "utilityNav.mediaCenter", fallback: { en: "Media Center", vi: "Trung tâm truyền thông" } },
  { href: "/barnard-medical-center", key: "utilityNav.barnardMedicalCenter", localePath: "utilityNav.barnardMedicalCenter", fallback: { en: "Barnard Medical Center", vi: "Trung tâm Y khoa Barnard" } },
  { href: "/about-us/careers", key: "utilityNav.careers", localePath: "utilityNav.careers", fallback: { en: "Careers", vi: "Tuyển dụng" } },
  { href: "https://www.pcrm.org/es", external: true, key: "utilityNav.spanishResources", localePath: "utilityNav.spanishResources", fallback: { en: "Recursos en Español", vi: "Tài nguyên tiếng Tây Ban Nha" } },
  { href: "https://www.pcrm.org/fr", external: true, key: "utilityNav.frenchResources", localePath: "utilityNav.frenchResources", fallback: { en: "Ressources en Français", vi: "Tài nguyên tiếng Pháp" } }
];

export const FOOTER_LEGAL_LINKS: CatalogItem[] = [
  { href: "/privacy-policy", key: "footerLegal.privacyPolicy", localePath: "footerLegal.privacyPolicy", fallback: { en: "Privacy Policy", vi: "Chính sách bảo mật" } },
  { href: "/terms-of-use", key: "footerLegal.termsOfUse", localePath: "footerLegal.termsOfUse", fallback: { en: "Terms of Use", vi: "Điều khoản sử dụng" } }
];
