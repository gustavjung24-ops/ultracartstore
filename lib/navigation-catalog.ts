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
    fallback: { en: "For Clinicians", vi: "DÃ nh cho chuyÃªn gia lÃ¢m sÃ ng" },
    items: [
      {
        href: "/good-nutrition/nutrition-for-clinicians",
        key: "topNavMenus.forClinicians.nutritionForClinicians",
        fallback: { en: "Nutrition for Clinicians", vi: "Dinh dÆ°á»¡ng cho chuyÃªn gia lÃ¢m sÃ ng" },
      },
      {
        href: "/good-nutrition/nutrition-for-clinicians/medical-students",
        key: "topNavMenus.forClinicians.medicalStudents",
        localePath: "topNav.forMedicalStudents",
        fallback: { en: "Medical Students", vi: "Sinh viÃªn y khoa" },
      },
      {
        href: "/good-nutrition/nutrition-information",
        key: "topNavMenus.forClinicians.nutritionInformation",
        localePath: "goodNutrition.nutritionInformation",
        fallback: { en: "Nutrition Information", vi: "Kiáº¿n thá»©c dinh dÆ°á»¡ng" },
      },
      {
        href: "/good-nutrition/nutrition-information/protein",
        key: "topNavMenus.forClinicians.protein",
        fallback: { en: "Protein", vi: "Protein" },
      },
      {
        href: "/good-nutrition/nutrition-information/fiber",
        key: "topNavMenus.forClinicians.fiber",
        fallback: { en: "Fiber", vi: "Cháº¥t xÆ¡" },
      },
    ],
  },
  {
    id: "forMedicalStudents",
    href: "/good-nutrition/nutrition-for-clinicians/medical-students",
    key: "topNav.forMedicalStudents",
    localePath: "topNav.forMedicalStudents",
    fallback: { en: "For Medical Students", vi: "DÃ nh cho sinh viÃªn y khoa" },
    items: [
      {
        href: "/good-nutrition/nutrition-for-clinicians/medical-students",
        key: "topNavMenus.forMedicalStudents.overview",
        fallback: { en: "Overview", vi: "Tá»•ng quan" },
      },
      {
        href: "/clinical-research/recruitment",
        key: "topNavMenus.forMedicalStudents.researchRecruitment",
        fallback: { en: "Research Recruitment", vi: "Tuyá»ƒn ngÆ°á»i tham gia nghiÃªn cá»©u" },
      },
      {
        href: "/events",
        key: "topNavMenus.forMedicalStudents.events",
        localePath: "utilityNav.events",
        fallback: { en: "Events", vi: "Sá»± kiá»‡n" },
      },
      {
        href: "/news/good-science-digest",
        key: "topNavMenus.forMedicalStudents.goodScienceDigest",
        fallback: { en: "Good Science Digest", vi: "Báº£n tin khoa há»c" },
      },
    ],
  },
  {
    id: "forScientists",
    href: "/term/scientists",
    key: "topNav.forScientists",
    localePath: "topNav.forScientists",
    fallback: { en: "For Scientists", vi: "DÃ nh cho nhÃ  khoa há»c" },
    items: [
      {
        href: "/term/scientists",
        key: "topNavMenus.forScientists.overview",
        fallback: { en: "Overview", vi: "Tá»•ng quan" },
      },
      {
        href: "/ethical-science",
        key: "topNavMenus.forScientists.ethicalScience",
        localePath: "mainNav.ethicalScience",
        fallback: { en: "Ethical Science", vi: "Khoa há»c cÃ³ Ä‘áº¡o Ä‘á»©c" },
      },
      {
        href: "/clinical-research",
        key: "topNavMenus.forScientists.clinicalResearch",
        localePath: "research.clinicalResearch",
        fallback: { en: "Clinical Research", vi: "NghiÃªn cá»©u lÃ¢m sÃ ng" },
      },
      {
        href: "/news/innovative-science-news",
        key: "topNavMenus.forScientists.innovativeScienceNews",
        fallback: { en: "Innovative Science News", vi: "Tin khoa há»c Ä‘á»•i má»›i" },
      },
    ],
  },
  {
    id: "aboutUs",
    href: "/about-us",
    key: "topNav.aboutUs",
    localePath: "topNav.aboutUs",
    fallback: { en: "About Us", vi: "Giá»›i thiá»‡u" },
    items: [
      {
        href: "/about-us#leadership",
        key: "topNavMenus.aboutUs.leadership",
        fallback: { en: "Leadership", vi: "Ban lÃ£nh Ä‘áº¡o" },
      },
      {
        href: "/about-us/our-victories",
        key: "topNavMenus.aboutUs.ourVictories",
        fallback: { en: "Our Victories", vi: "ThÃ nh tá»±u cá»§a chÃºng tÃ´i" },
      },
      {
        href: "/about-us/careers",
        key: "topNavMenus.aboutUs.careers",
        localePath: "utilityNav.careers",
        fallback: { en: "Careers", vi: "Tuyá»ƒn dá»¥ng" },
      },
      {
        href: "/about-us/careers/internships",
        key: "topNavMenus.aboutUs.internships",
        fallback: { en: "Internships", vi: "Thá»±c táº­p" },
      },
      {
        href: "/events",
        key: "topNavMenus.aboutUs.events",
        localePath: "utilityNav.events",
        fallback: { en: "Events", vi: "Sá»± kiá»‡n" },
      },
      {
        href: "/about-us/financial-report",
        key: "topNavMenus.aboutUs.annualFinancialReports",
        fallback: { en: "Annual & Financial Reports", vi: "BÃ¡o cÃ¡o thÆ°á»ng niÃªn vÃ  tÃ i chÃ­nh" },
      },
      {
        href: "/barnard-medical-center",
        key: "topNavMenus.aboutUs.barnardMedicalCenter",
        localePath: "utilityNav.barnardMedicalCenter",
        fallback: { en: "Barnard Medical Center", vi: "Trung tÃ¢m Y khoa Barnard" },
      },
      {
        href: "/contact",
        key: "topNavMenus.aboutUs.contactUs",
        localePath: "utilityNav.contact",
        fallback: { en: "Contact Us", vi: "LiÃªn há»‡" },
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
    fallback: { en: "Good Nutrition", vi: "Dinh dÆ°á»¡ng lÃ nh máº¡nh" },
    items: [
      { href: "/good-nutrition", key: "goodNutritionMenu.overview", fallback: { en: "Overview", vi: "Tá»•ng quan" } },
      { href: "/good-nutrition/plant-based-diets", key: "goodNutrition.plantBasedDiets", localePath: "goodNutrition.plantBasedDiets", fallback: { en: "Plant-Based Diets", vi: "Cháº¿ Ä‘á»™ Äƒn dá»±a trÃªn thá»±c váº­t" } },
      { href: "/good-nutrition/three-reasons-go-vegan", key: "goodNutrition.threeReasonsToGoVegan", localePath: "goodNutrition.threeReasonsToGoVegan", fallback: { en: "Three Reasons to go VEGAN!", vi: "Ba lÃ½ do Ä‘á»ƒ Äƒn thuáº§n chay" } },
      { href: "/good-nutrition/plant-based-diets/ffl", key: "goodNutrition.foodForLifeClasses", localePath: "goodNutrition.foodForLifeClasses", fallback: { en: "Food for Life Classes", vi: "Lá»›p há»c Food for Life" } },
      { href: "/good-nutrition/plant-based-diets/nutrition-faq", key: "goodNutrition.plantBasedNutritionFAQ", localePath: "goodNutrition.plantBasedNutritionFAQ", fallback: { en: "Plant-Based Nutrition FAQ", vi: "CÃ¢u há»i thÆ°á»ng gáº·p vá» dinh dÆ°á»¡ng dá»±a trÃªn thá»±c váº­t" } },
      { href: "/veganstarterkit", key: "goodNutrition.veganStarterKit", localePath: "goodNutrition.veganStarterKit", fallback: { en: "Vegan Starter Kit", vi: "Bá»™ khá»Ÿi Ä‘áº§u thuáº§n chay" } },
      { href: "/good-nutrition/plant-based-diets/recipes", key: "goodNutrition.recipes", localePath: "goodNutrition.recipes", fallback: { en: "Recipes", vi: "CÃ´ng thá»©c mÃ³n Äƒn" } },
      { href: "/good-nutrition/nutrition-for-athletes", key: "goodNutrition.nutritionForAthletes", localePath: "goodNutrition.nutritionForAthletes", fallback: { en: "Nutrition for Athletes", vi: "Dinh dÆ°á»¡ng cho váº­n Ä‘á»™ng viÃªn" } },
      { href: "/good-nutrition/plant-based-diets/pregnancy", key: "goodNutrition.pregnancy", localePath: "goodNutrition.pregnancy", fallback: { en: "Pregnancy", vi: "Thai ká»³" } },
      { href: "/good-nutrition/nutrition-for-kids", key: "goodNutrition.nutritionForKids", localePath: "goodNutrition.nutritionForKids", fallback: { en: "Nutrition for Kids", vi: "Dinh dÆ°á»¡ng cho tráº» em" } },
      { href: "/universalmeals", key: "goodNutritionMenu.universalMeals", fallback: { en: "Universal Meals", vi: "Bá»¯a Äƒn toÃ n dÃ¢n" } },
      { href: "/good-nutrition/nutrition-information", key: "goodNutrition.nutritionInformation", localePath: "goodNutrition.nutritionInformation", fallback: { en: "Nutrition Information", vi: "Kiáº¿n thá»©c dinh dÆ°á»¡ng" } },
      { href: "/good-nutrition/nutrition-information/the-carbohydrate-advantage", key: "goodNutritionMenu.carbohydrateAdvantage", fallback: { en: "The Carbohydrate Advantage", vi: "Lá»£i tháº¿ carbohydrate" } },
      { href: "/good-nutrition/nutrition-information/fiber", key: "goodNutritionMenu.fiber", fallback: { en: "Fiber", vi: "Cháº¥t xÆ¡" } },
      { href: "/good-nutrition/nutrition-information/protein", key: "goodNutritionMenu.protein", fallback: { en: "Protein", vi: "Protein" } },
      { href: "/good-nutrition/nutrition-information/soy-and-health", key: "goodNutritionMenu.soyAndHealth", fallback: { en: "Soy and Health", vi: "Äáº­u nÃ nh vÃ  sá»©c khá»e" } },
      { href: "/good-nutrition/nutrition-information/lowering-cholesterol-with-a-plant-based-diet", key: "goodNutritionMenu.loweringCholesterol", fallback: { en: "Lowering Cholesterol", vi: "Giáº£m cholesterol" } },
      { href: "/good-nutrition/nutrition-information/health-concerns-about-dairy", key: "goodNutritionMenu.concernsAboutDairy", fallback: { en: "Concerns About Dairy", vi: "Lo ngáº¡i vá» sáº£n pháº©m sá»¯a" } },
      { href: "/good-nutrition/nutrition-information/chicken", key: "goodNutritionMenu.chicken", fallback: { en: "Chicken", vi: "Thá»‹t gÃ " } },
      { href: "/good-nutrition/nutrition-information/health-concerns-with-eggs", key: "goodNutritionMenu.concernsWithEggs", fallback: { en: "Concerns With Eggs", vi: "Lo ngáº¡i vá» trá»©ng" } },
      { href: "/good-nutrition/nutrition-information/processed-meat", key: "goodNutritionMenu.processedMeat", fallback: { en: "Processed Meat", vi: "Thá»‹t cháº¿ biáº¿n sáºµn" } },
      { href: "/good-nutrition/vegan-diet-environment", key: "goodNutritionMenu.veganDietEnvironment", fallback: { en: "Vegan Diet and Environment", vi: "Ä‚n thuáº§n chay vÃ  mÃ´i trÆ°á»ng" } },
      { href: "/good-nutrition/nutrition-for-clinicians", key: "goodNutritionMenu.nutritionForClinicians", fallback: { en: "Nutrition for Clinicians", vi: "Dinh dÆ°á»¡ng cho chuyÃªn gia lÃ¢m sÃ ng" } },
      { href: "/good-nutrition/healthy-communities", key: "goodNutrition.healthyCommunities", localePath: "goodNutrition.healthyCommunities", fallback: { en: "Healthy Communities", vi: "Cá»™ng Ä‘á»“ng khá»e máº¡nh" } },
      { href: "/good-nutrition/nutrition-programs-policies", key: "goodNutritionMenu.programsPolicies", fallback: { en: "Programs & Policies", vi: "ChÆ°Æ¡ng trÃ¬nh vÃ  chÃ­nh sÃ¡ch" } },
      { href: "/take-action", key: "mainNav.takeAction", localePath: "mainNav.takeAction", fallback: { en: "Take Action", vi: "CÃ¹ng hÃ nh Ä‘á»™ng" } },
      { href: "/findadoctor", key: "goodNutrition.findADoctor", localePath: "goodNutrition.findADoctor", fallback: { en: "Find a Doctor", vi: "TÃ¬m bÃ¡c sÄ©" } },
      { href: "/findadietitian", key: "goodNutrition.findADietitian", localePath: "goodNutrition.findADietitian", fallback: { en: "Find a Dietitian", vi: "TÃ¬m chuyÃªn gia dinh dÆ°á»¡ng" } }
    ],
  },
  {
    id: "healthTopics",
    href: "/health-topics",
    columns: 3,
    key: "mainNav.healthTopics",
    localePath: "mainNav.healthTopics",
    fallback: { en: "Health Topics", vi: "Chá»§ Ä‘á» sá»©c khá»e" },
    items: [
      { href: "/health-topics", key: "healthTopicsMenu.overview", fallback: { en: "Overview", vi: "Tá»•ng quan" } },
      { href: "/health-topics/alzheimers", key: "healthTopicsMenu.alzheimers", fallback: { en: "Alzheimer's", vi: "Alzheimer" } },
      { href: "/health-topics/arthritis", key: "healthTopicsMenu.arthritis", fallback: { en: "Arthritis", vi: "ViÃªm khá»›p" } },
      { href: "/health-topics/asthma", key: "healthTopicsMenu.asthma", fallback: { en: "Asthma", vi: "Hen suyá»…n" } },
      { href: "/health-topics/breast-cancer", key: "healthTopicsMenu.breastCancer", fallback: { en: "Breast Cancer", vi: "Ung thÆ° vÃº" } },
      { href: "/health-topics/cancer", key: "healthTopicsMenu.cancer", fallback: { en: "Cancer", vi: "Ung thÆ°" } },
      { href: "/health-topics/colorectal-cancer", key: "healthTopicsMenu.colorectalCancer", fallback: { en: "Colorectal Cancer", vi: "Ung thÆ° Ä‘áº¡i trá»±c trÃ ng" } },
      { href: "/health-topics/coronavirus", key: "healthTopicsMenu.coronavirus", fallback: { en: "Coronavirus", vi: "Coronavirus" } },
      { href: "/health-topics/diabetes", key: "healthTopicsMenu.diabetes", fallback: { en: "Diabetes", vi: "Tiá»ƒu Ä‘Æ°á»ng" } },
      { href: "/health-topics/gut-bacteria", key: "healthTopicsMenu.gutBacteria", fallback: { en: "Gut Bacteria", vi: "Vi khuáº©n Ä‘Æ°á»ng ruá»™t" } },
      { href: "/health-topics/healthy-aging", key: "healthTopicsMenu.healthyAging", fallback: { en: "Healthy Aging", vi: "LÃ£o hÃ³a khá»e máº¡nh" } },
      { href: "/health-topics/healthy-bones", key: "healthTopicsMenu.healthyBones", fallback: { en: "Healthy Bones", vi: "XÆ°Æ¡ng khá»e máº¡nh" } },
      { href: "/health-topics/heart-disease", key: "healthTopicsMenu.heartDisease", fallback: { en: "Heart Disease", vi: "Bá»‡nh tim" } },
      { href: "/health-topics/high-blood-pressure", key: "healthTopicsMenu.highBloodPressure", fallback: { en: "High Blood Pressure", vi: "Cao huyáº¿t Ã¡p" } },
      { href: "/health-topics/migraines", key: "healthTopicsMenu.migraines", fallback: { en: "Migraines", vi: "Äau ná»­a Ä‘áº§u" } },
      { href: "/health-topics/ovarian-cancer", key: "healthTopicsMenu.ovarianCancer", fallback: { en: "Ovarian Cancer", vi: "Ung thÆ° buá»“ng trá»©ng" } },
      { href: "/health-topics/polycystic-ovarian-syndrome", key: "healthTopicsMenu.pcos", fallback: { en: "Polycystic Ovarian Syndrome", vi: "Há»™i chá»©ng buá»“ng trá»©ng Ä‘a nang" } },
      { href: "/health-topics/prostate-cancer", key: "healthTopicsMenu.prostateCancer", fallback: { en: "Prostate Cancer", vi: "Ung thÆ° tuyáº¿n tiá»n liá»‡t" } },
      { href: "/health-topics/weight-loss", key: "healthTopicsMenu.weightLoss", fallback: { en: "Weight Loss", vi: "Giáº£m cÃ¢n" } }
    ],
  },
  {
    id: "ethicalScience",
    href: "/ethical-science",
    columns: 2,
    key: "mainNav.ethicalScience",
    localePath: "mainNav.ethicalScience",
    fallback: { en: "Ethical Science", vi: "Khoa há»c cÃ³ Ä‘áº¡o Ä‘á»©c" },
    items: [
      { href: "/ethical-science", key: "ethicalScienceMenu.overview", fallback: { en: "Overview", vi: "Tá»•ng quan" } },
      { href: "/ethical-science/ethical-education-and-training/surgery-training", key: "ethicalScienceMenu.surgeryTraining", fallback: { en: "Surgery Training", vi: "ÄÃ o táº¡o pháº«u thuáº­t" } },
      { href: "/ethical-science/ethical-education-and-training/paramedic-training", key: "ethicalScienceMenu.paramedicTraining", fallback: { en: "Paramedic Training", vi: "ÄÃ o táº¡o cáº¥p cá»©u" } },
      { href: "/ethical-science/animals-in-medical-research", key: "ethicalScienceMenu.animalsInMedicalResearch", fallback: { en: "Animals in Medical Research", vi: "Äá»™ng váº­t trong nghiÃªn cá»©u y khoa" } },
      { href: "/dogs", key: "ethicalScienceMenu.dogs", fallback: { en: "Dogs", vi: "ChÃ³" } },
      { href: "/ethical-science/animals-in-medical-research/alzheimers-disease-research-without-animals", key: "ethicalScienceMenu.alzheimersWithoutAnimals", fallback: { en: "Alzheimer's Research Without Animals", vi: "NghiÃªn cá»©u Alzheimer khÃ´ng dÃ¹ng Ä‘á»™ng váº­t" } },
      { href: "/ethical-science/ethical-education-and-training/ERA21", key: "ethicalScienceMenu.era21", fallback: { en: "ERA21", vi: "ERA21" } },
      { href: "/ethical-science/animal-testing-and-alternatives", key: "ethicalScienceMenu.animalTestingAlternatives", fallback: { en: "Animal Testing & Alternatives", vi: "Thá»­ nghiá»‡m trÃªn Ä‘á»™ng váº­t vÃ  giáº£i phÃ¡p thay tháº¿" } },
      { href: "/ethical-science/animal-testing-and-alternatives/animal-free-antibodies", key: "ethicalScienceMenu.animalFreeAntibodies", fallback: { en: "Animal-Free Antibodies", vi: "KhÃ¡ng thá»ƒ khÃ´ng dÃ¹ng Ä‘á»™ng váº­t" } },
      { href: "/ethical-science/animal-testing-and-alternatives/chemical-testing-reform", key: "ethicalScienceMenu.chemicalTestingReform", fallback: { en: "Chemical Testing Reform", vi: "Cáº£i cÃ¡ch thá»­ nghiá»‡m hÃ³a cháº¥t" } },
      { href: "/ethical-science/animal-testing-and-alternatives/cruelty-free-cosmetics", key: "ethicalScienceMenu.crueltyFreeCosmetics", fallback: { en: "Cruelty-Free Cosmetics", vi: "Má»¹ pháº©m khÃ´ng thá»­ nghiá»‡m trÃªn Ä‘á»™ng váº­t" } },
      { href: "/ethical-science/animal-testing-and-alternatives/nura", key: "ethicalScienceMenu.nura", fallback: { en: "Alternatives to Animal Use", vi: "Giáº£i phÃ¡p thay tháº¿ sá»­ dá»¥ng Ä‘á»™ng váº­t" } },
      { href: "/ethical-science/animal-testing-and-alternatives/human-tissue-research", key: "ethicalScienceMenu.humanTissueResearch", fallback: { en: "Human Tissue Research", vi: "NghiÃªn cá»©u mÃ´ ngÆ°á»i" } }
    ],
  },
  {
    id: "ourResearch",
    href: "/clinical-research",
    columns: 2,
    key: "mainNav.ourResearch",
    localePath: "mainNav.ourResearch",
    fallback: { en: "Our Research", vi: "NghiÃªn cá»©u cá»§a chÃºng tÃ´i" },
    items: [
      { href: "/clinical-research", key: "researchMenu.overview", fallback: { en: "Overview", vi: "Tá»•ng quan" } },
      { href: "/clinical-research/recruitment", key: "researchMenu.recruitment", fallback: { en: "Recruitment", vi: "Tuyá»ƒn ngÆ°á»i tham gia" } },
      { href: "/t2dstudy", key: "researchMenu.t2dStudy", fallback: { en: "T2D Study", vi: "NghiÃªn cá»©u T2D" } },
      { href: "/clinical-research/endometriosis", key: "researchMenu.endometriosis", fallback: { en: "Endometriosis", vi: "Láº¡c ná»™i máº¡c tá»­ cung" } },
      { href: "/clinical-research/fighting-hot-flashes-with-diet", key: "researchMenu.fightingHotFlashesWithDiet", fallback: { en: "Fighting Hot Flashes with Diet", vi: "Kiá»ƒm soÃ¡t bá»‘c há»a báº±ng cháº¿ Ä‘á»™ Äƒn" } }
    ],
  },
  {
    id: "news",
    href: "/news",
    columns: 2,
    key: "mainNav.news",
    localePath: "mainNav.news",
    fallback: { en: "News", vi: "Tin tá»©c" },
    items: [
      { href: "/news", key: "newsMenu.overview", fallback: { en: "Overview", vi: "Tá»•ng quan" } },
      { href: "/podcast", key: "newsMenu.podcast", fallback: { en: "Podcast", vi: "Podcast" } },
      { href: "/news/blog", key: "newsMenu.allNews", fallback: { en: "All News", vi: "Táº¥t cáº£ tin tá»©c" } },
      { href: "/news/health-nutrition", key: "news.healthNutrition", localePath: "news.healthNutrition", fallback: { en: "Health and Nutrition News", vi: "Tin tá»©c sá»©c khá»e vÃ  dinh dÆ°á»¡ng" } },
      { href: "/news/innovative-science-news", key: "newsMenu.innovativeScienceNews", fallback: { en: "Innovative Science News", vi: "Tin khoa há»c Ä‘á»•i má»›i" } },
      { href: "/news/good-science-digest", key: "newsMenu.goodScienceDigest", fallback: { en: "Good Science Digest", vi: "Báº£n tin khoa há»c" } },
      { href: "/news/good-medicine", key: "newsMenu.goodMedicine", fallback: { en: "Good Medicine", vi: "Y há»c tá»‘t" } },
      { href: "/news/media-center", key: "news.mediaCenter", localePath: "news.mediaCenter", fallback: { en: "Media Center", vi: "Trung tÃ¢m truyá»n thÃ´ng" } },
      { href: "/news/news-releases", key: "newsMenu.newsReleases", fallback: { en: "News Releases", vi: "ThÃ´ng cÃ¡o bÃ¡o chÃ­" } },
      { href: "/yourbodyinbalance", key: "newsMenu.yourBodyInBalance", fallback: { en: "Your Body in Balance", vi: "Your Body in Balance" } }
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
    id: "takeAction",
    href: "/take-action",
    columns: 2,
    key: "mainNav.takeAction",
    localePath: "mainNav.takeAction",
    fallback: { en: "Take Action", vi: "CÃ¹ng hÃ nh Ä‘á»™ng" },
    items: [],
  }
];

export const FOOTER_UTILITY_LINKS: CatalogItem[] = [
  { href: "/events", key: "utilityNav.events", localePath: "utilityNav.events", fallback: { en: "Events", vi: "Sá»± kiá»‡n" } },
  { href: "/shop", key: "utilityNav.shop", localePath: "utilityNav.shop", fallback: { en: "Resources", vi: "TÃ i nguyÃªn" } },
  { href: "/contact", key: "utilityNav.contact", localePath: "utilityNav.contact", fallback: { en: "Contact", vi: "LiÃªn há»‡" } },
  { href: "/news/media-center", key: "utilityNav.mediaCenter", localePath: "utilityNav.mediaCenter", fallback: { en: "Media Center", vi: "Trung tÃ¢m truyá»n thÃ´ng" } },
  { href: "/barnard-medical-center", key: "utilityNav.barnardMedicalCenter", localePath: "utilityNav.barnardMedicalCenter", fallback: { en: "Barnard Medical Center", vi: "Trung tÃ¢m Y khoa Barnard" } },
  { href: "/about-us/careers", key: "utilityNav.careers", localePath: "utilityNav.careers", fallback: { en: "Careers", vi: "Tuyá»ƒn dá»¥ng" } },
  { href: "https://www.pcrm.org/es", external: true, key: "utilityNav.spanishResources", localePath: "utilityNav.spanishResources", fallback: { en: "Recursos en EspaÃ±ol", vi: "TÃ i nguyÃªn tiáº¿ng TÃ¢y Ban Nha" } },
  { href: "https://www.pcrm.org/fr", external: true, key: "utilityNav.frenchResources", localePath: "utilityNav.frenchResources", fallback: { en: "Ressources en FranÃ§ais", vi: "TÃ i nguyÃªn tiáº¿ng PhÃ¡p" } }
];

export const FOOTER_LEGAL_LINKS: CatalogItem[] = [
  { href: "/privacy-policy", key: "footerLegal.privacyPolicy", localePath: "footerLegal.privacyPolicy", fallback: { en: "Privacy Policy", vi: "ChÃ­nh sÃ¡ch báº£o máº­t" } },
  { href: "/terms-of-use", key: "footerLegal.termsOfUse", localePath: "footerLegal.termsOfUse", fallback: { en: "Terms of Use", vi: "Äiá»u khoáº£n sá»­ dá»¥ng" } }
];

