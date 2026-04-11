import type { PcrmLink, PcrmMedia, PcrmPage } from "./pcrm-content";

const BASE = "https://www.pcrm.org";

type ManualPageSpec = readonly [
  path: string,
  titleEn: string,
  titleVi: string,
  summaryEn: string,
  summaryVi: string,
];

function createPage([path, titleEn, titleVi, summaryEn, summaryVi]: ManualPageSpec): PcrmPage & { path: string } {
  return {
    url: `${BASE}${path}`,
    path,
    title: titleEn,
    title_en: titleEn,
    title_vi: titleVi,
    description: summaryEn,
    description_en: summaryEn,
    description_vi: summaryVi,
    h1: [titleEn]
      ,
    h1_en: [titleEn],
    h1_vi: [titleVi],
    h2: [],
    h2_en: [],
    h2_vi: [],
    h3: [],
    h3_en: [],
    h3_vi: [],
    paragraphs: [summaryEn],
    paragraphs_en: [summaryEn],
    paragraphs_vi: [summaryVi],
    images: [],
    links: [],
  };
}

const manualPageSpecs: ManualPageSpec[] = [
  [
    "/good-nutrition/plant-based-diets",
    "Plant-Based Diets",
    "Cháº¿ Ä‘á»™ Äƒn thá»±c váº­t",
    "Foundational guides and resources about plant-based eating.",
    "TÃ i liá»‡u ná»n táº£ng vÃ  tÃ i nguyÃªn vá» cháº¿ Ä‘á»™ Äƒn thá»±c váº­t.",
  ],
  [
    "/good-nutrition/plant-based-diets/nutrition-faq",
    "Nutrition FAQ",
    "CÃ¢u há»i thÆ°á»ng gáº·p vá» dinh dÆ°á»¡ng",
    "Answers to common questions about plant-based nutrition.",
    "Giáº£i Ä‘Ã¡p cÃ¡c cÃ¢u há»i thÆ°á»ng gáº·p vá» dinh dÆ°á»¡ng thá»±c váº­t.",
  ],
  [
    "/good-nutrition/nutrition-for-clinicians",
    "Nutrition for Clinicians",
    "Dinh dÆ°á»¡ng cho bÃ¡c sÄ©",
    "Practical nutrition resources for healthcare professionals.",
    "TÃ i liá»‡u dinh dÆ°á»¡ng thá»±c hÃ nh dÃ nh cho nhÃ¢n viÃªn y táº¿.",
  ],
  [
    "/good-nutrition/nutrition-for-clinicians/medical-students",
    "Nutrition for Medical Students",
    "Dinh dÆ°á»¡ng cho sinh viÃªn y khoa",
    "Introductory resources for medical students learning plant-based nutrition.",
    "TÃ i liá»‡u nháº­p mÃ´n cho sinh viÃªn y khoa tÃ¬m hiá»ƒu dinh dÆ°á»¡ng thá»±c váº­t.",
  ],
  [
    "/good-nutrition/nutrition-information/the-carbohydrate-advantage",
    "The Carbohydrate Advantage",
    "Lá»£i tháº¿ cá»§a carbohydrate",
    "Why smart carbohydrate choices matter in a plant-based diet.",
    "VÃ¬ sao lá»±a chá»n carbohydrate phÃ¹ há»£p ráº¥t quan trá»ng trong cháº¿ Ä‘á»™ Äƒn thá»±c váº­t.",
  ],
  [
    "/good-nutrition/nutrition-information/soy-and-health",
    "Soy and Health",
    "Äáº­u nÃ nh vÃ  sá»©c khá»e",
    "Evidence-based guidance on soy foods and health outcomes.",
    "HÆ°á»›ng dáº«n dá»±a trÃªn báº±ng chá»©ng vá» Ä‘áº­u nÃ nh vÃ  sá»©c khá»e.",
  ],
  [
    "/good-nutrition/nutrition-information/lowering-cholesterol-with-a-plant-based-diet",
    "Lowering Cholesterol with a Plant-Based Diet",
    "Giáº£m cholesterol báº±ng cháº¿ Ä‘á»™ Äƒn thá»±c váº­t",
    "Ways to support healthy cholesterol levels through food choices.",
    "CÃ¡ch há»— trá»£ má»©c cholesterol lÃ nh máº¡nh thÃ´ng qua lá»±a chá»n thá»±c pháº©m.",
  ],
  [
    "/good-nutrition/nutrition-information/chicken",
    "Chicken",
    "Thá»‹t gÃ ",
    "Nutrition guidance and concerns related to chicken consumption.",
    "HÆ°á»›ng dáº«n dinh dÆ°á»¡ng vÃ  cÃ¡c lÆ°u Ã½ liÃªn quan Ä‘áº¿n viá»‡c Äƒn thá»‹t gÃ .",
  ],
  [
    "/good-nutrition/nutrition-information/processed-meat",
    "Processed Meat",
    "Thá»‹t cháº¿ biáº¿n sáºµn",
    "Health concerns and evidence about processed meat.",
    "CÃ¡c lo ngáº¡i sá»©c khá»e vÃ  báº±ng chá»©ng vá» thá»‹t cháº¿ biáº¿n sáºµn.",
  ],
  [
    "/good-nutrition/healthy-communities",
    "Healthy Communities",
    "Cá»™ng Ä‘á»“ng khá»e máº¡nh",
    "Community-based programs and outreach resources.",
    "ChÆ°Æ¡ng trÃ¬nh cá»™ng Ä‘á»“ng vÃ  tÃ i nguyÃªn truyá»n thÃ´ng.",
  ],
  [
    "/good-nutrition/nutrition-programs-policies",
    "Nutrition Programs & Policies",
    "ChÆ°Æ¡ng trÃ¬nh vÃ  chÃ­nh sÃ¡ch dinh dÆ°á»¡ng",
    "Program and policy resources supporting healthier food environments.",
    "TÃ i nguyÃªn vá» chÆ°Æ¡ng trÃ¬nh vÃ  chÃ­nh sÃ¡ch há»— trá»£ mÃ´i trÆ°á»ng Äƒn uá»‘ng lÃ nh máº¡nh.",
  ],
  [
    "/ethical-science/ethical-education-and-training/paramedic-training",
    "Paramedic Training",
    "ÄÃ o táº¡o nhÃ¢n viÃªn cáº¥p cá»©u",
    "Training resources focused on humane and effective medical education.",
    "TÃ i liá»‡u Ä‘Ã o táº¡o hÆ°á»›ng tá»›i giÃ¡o dá»¥c y khoa hiá»‡u quáº£ vÃ  nhÃ¢n Ä‘áº¡o.",
  ],
  [
    "/ethical-science/animals-in-medical-research",
    "Animals in Medical Research",
    "Äá»™ng váº­t trong nghiÃªn cá»©u y khoa",
    "Alternatives, analysis, and discussion of animal use in research.",
    "CÃ¡c giáº£i phÃ¡p thay tháº¿, phÃ¢n tÃ­ch vÃ  tháº£o luáº­n vá» viá»‡c dÃ¹ng Ä‘á»™ng váº­t trong nghiÃªn cá»©u.",
  ],
  [
    "/ethical-science/animals-in-medical-research/alzheimers-disease-research-without-animals",
    "Alzheimer's Disease Research Without Animals",
    "NghiÃªn cá»©u Alzheimer khÃ´ng dÃ¹ng Ä‘á»™ng váº­t",
    "Human-relevant research and alternatives for Alzheimerâ€™s studies.",
    "NghiÃªn cá»©u phÃ¹ há»£p vá»›i con ngÆ°á»i vÃ  cÃ¡c giáº£i phÃ¡p thay tháº¿ cho nghiÃªn cá»©u Alzheimer.",
  ],
  [
    "/ethical-science/ethical-education-and-training/ERA21",
    "ERA21",
    "ERA21",
    "Alternative surgical training resources and education initiatives.",
    "TÃ i nguyÃªn Ä‘Ã o táº¡o pháº«u thuáº­t thay tháº¿ vÃ  cÃ¡c sÃ¡ng kiáº¿n giÃ¡o dá»¥c.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives",
    "Animal Testing and Alternatives",
    "Thá»­ nghiá»‡m trÃªn Ä‘á»™ng váº­t vÃ  giáº£i phÃ¡p thay tháº¿",
    "Overview of modern research methods and alternatives to animal testing.",
    "Tá»•ng quan vá» cÃ¡c phÆ°Æ¡ng phÃ¡p nghiÃªn cá»©u hiá»‡n Ä‘áº¡i vÃ  giáº£i phÃ¡p thay tháº¿ thá»­ nghiá»‡m Ä‘á»™ng váº­t.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives/animal-free-antibodies",
    "Animal-Free Antibodies",
    "KhÃ¡ng thá»ƒ khÃ´ng dÃ¹ng Ä‘á»™ng váº­t",
    "Methods and resources for producing antibodies without animals.",
    "PhÆ°Æ¡ng phÃ¡p vÃ  tÃ i nguyÃªn sáº£n xuáº¥t khÃ¡ng thá»ƒ mÃ  khÃ´ng cáº§n Ä‘á»™ng váº­t.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives/cruelty-free-cosmetics",
    "Cruelty-Free Cosmetics",
    "Má»¹ pháº©m khÃ´ng thá»­ nghiá»‡m trÃªn Ä‘á»™ng váº­t",
    "How cosmetic testing can move away from animal use.",
    "CÃ¡ch ngÃ nh má»¹ pháº©m cÃ³ thá»ƒ chuyá»ƒn sang khÃ´ng dÃ¹ng Ä‘á»™ng váº­t.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives/human-tissue-research",
    "Human Tissue Research",
    "NghiÃªn cá»©u mÃ´ ngÆ°á»i",
    "Human tissue-based approaches to biomedical research.",
    "CÃ¡c phÆ°Æ¡ng phÃ¡p nghiÃªn cá»©u y sinh dá»±a trÃªn mÃ´ ngÆ°á»i.",
  ],
  [
    "/clinical-research/endometriosis",
    "Endometriosis",
    "Láº¡c ná»™i máº¡c tá»­ cung",
    "Clinical research and nutrition-related resources on endometriosis.",
    "NghiÃªn cá»©u lÃ¢m sÃ ng vÃ  tÃ i nguyÃªn dinh dÆ°á»¡ng liÃªn quan Ä‘áº¿n láº¡c ná»™i máº¡c tá»­ cung.",
  ],
  [
    "/clinical-research/fighting-hot-flashes-with-diet",
    "Fighting Hot Flashes with Diet",
    "Kiá»ƒm soÃ¡t bá»‘c há»a báº±ng cháº¿ Ä‘á»™ Äƒn",
    "Diet strategies and clinical guidance for managing hot flashes.",
    "Chiáº¿n lÆ°á»£c dinh dÆ°á»¡ng vÃ  hÆ°á»›ng dáº«n lÃ¢m sÃ ng Ä‘á»ƒ kiá»ƒm soÃ¡t bá»‘c há»a.",
  ],
  [
    "/health-topics/alzheimers",
    "Alzheimer's",
    "Alzheimer",
    "Research-backed guidance and articles related to Alzheimerâ€™s disease.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» bá»‡nh Alzheimer.",
  ],
  [
    "/health-topics/arthritis",
    "Arthritis",
    "ViÃªm khá»›p",
    "Research-backed guidance and articles related to arthritis.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» viÃªm khá»›p.",
  ],
  [
    "/health-topics/asthma",
    "Asthma",
    "Hen suyá»…n",
    "Research-backed guidance and articles related to asthma.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» hen suyá»…n.",
  ],
  [
    "/health-topics/breast-cancer",
    "Breast Cancer",
    "Ung thÆ° vÃº",
    "Research-backed guidance and articles related to breast cancer.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» ung thÆ° vÃº.",
  ],
  [
    "/health-topics/coronavirus",
    "Coronavirus",
    "Coronavirus",
    "Research-backed guidance and articles related to coronavirus.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» coronavirus.",
  ],
  [
    "/health-topics/healthy-bones",
    "Healthy Bones",
    "XÆ°Æ¡ng khá»e máº¡nh",
    "Research-backed guidance and articles related to bone health.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» sá»©c khá»e xÆ°Æ¡ng.",
  ],
  [
    "/health-topics/heart-disease",
    "Heart Disease",
    "Bá»‡nh tim",
    "Research-backed guidance and articles related to heart disease.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» bá»‡nh tim.",
  ],
  [
    "/health-topics/migraines",
    "Migraines",
    "Äau ná»­a Ä‘áº§u",
    "Research-backed guidance and articles related to migraines.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» Ä‘au ná»­a Ä‘áº§u.",
  ],
  [
    "/health-topics/ovarian-cancer",
    "Ovarian Cancer",
    "Ung thÆ° buá»“ng trá»©ng",
    "Research-backed guidance and articles related to ovarian cancer.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» ung thÆ° buá»“ng trá»©ng.",
  ],
  [
    "/health-topics/polycystic-ovarian-syndrome",
    "Polycystic Ovarian Syndrome",
    "Há»™i chá»©ng buá»“ng trá»©ng Ä‘a nang",
    "Research-backed guidance and articles related to PCOS.",
    "TÃ i liá»‡u vÃ  bÃ i viáº¿t dá»±a trÃªn báº±ng chá»©ng vá» há»™i chá»©ng buá»“ng trá»©ng Ä‘a nang.",
  ],
  [
    "/about-us/careers",
    "Careers",
    "Tuyá»ƒn dá»¥ng",
    "Open roles and opportunities with PCRM.",
    "CÃ¡c vá»‹ trÃ­ tuyá»ƒn dá»¥ng vÃ  cÆ¡ há»™i nghá» nghiá»‡p táº¡i PCRM.",
  ],
  [
    "/about-us/careers/internships",
    "Internships",
    "Thá»±c táº­p",
    "Student and early-career internship opportunities.",
    "CÆ¡ há»™i thá»±c táº­p cho sinh viÃªn vÃ  ngÆ°á»i má»›i báº¯t Ä‘áº§u sá»± nghiá»‡p.",
  ],
  [
    "/about-us/financial-report",
    "Annual & Financial Reports",
    "BÃ¡o cÃ¡o thÆ°á»ng niÃªn vÃ  tÃ i chÃ­nh",
    "Annual reports and financial information.",
    "BÃ¡o cÃ¡o thÆ°á»ng niÃªn vÃ  thÃ´ng tin tÃ i chÃ­nh.",
  ],
  [
    "/events",
    "Events",
    "Sá»± kiá»‡n",
    "Upcoming events, programs, and featured activities.",
    "CÃ¡c sá»± kiá»‡n, chÆ°Æ¡ng trÃ¬nh vÃ  hoáº¡t Ä‘á»™ng ná»•i báº­t sáº¯p tá»›i.",
  ],
  [
    "/news",
    "News",
    "Tin tá»©c",
    "Latest news, science updates, and event coverage from PCRM.",
    "Tin tá»©c má»›i nháº¥t, cáº­p nháº­t khoa há»c vÃ  tÆ°á»ng thuáº­t sá»± kiá»‡n tá»« PCRM.",
  ],
  [
    "/news/health-nutrition",
    "Health & Nutrition News",
    "Tin tá»©c sá»©c khá»e vÃ  dinh dÆ°á»¡ng",
    "Research-backed nutrition news and articles.",
    "Tin tá»©c vÃ  bÃ i viáº¿t dinh dÆ°á»¡ng dá»±a trÃªn báº±ng chá»©ng.",
  ],
  [
    "/news/innovative-science-news",
    "Innovative Science News",
    "Tin khoa há»c Ä‘á»•i má»›i",
    "News about humane, human-relevant science.",
    "Tin tá»©c vá» khoa há»c nhÃ¢n vÄƒn vÃ  phÃ¹ há»£p vá»›i con ngÆ°á»i.",
  ],
  [
    "/news/media-center",
    "Media Center",
    "Trung tÃ¢m truyá»n thÃ´ng",
    "Press materials and media resources.",
    "TÃ i liá»‡u bÃ¡o chÃ­ vÃ  nguá»“n lá»±c dÃ nh cho truyá»n thÃ´ng.",
  ],
  [
    "/ways-to-give",
    "Support Information",
    "ThÃ´ng tin há»— trá»£",
    "This supporting reference site does not accept donations.",
    "Website tham chiáº¿u nÃ y khÃ´ng tiáº¿p nháº­n quyÃªn gÃ³p.",
  ],
];

type DetailedManualPageSpec = {
  path: string;
  titleEn: string;
  titleVi: string;
  descriptionEn: string;
  descriptionVi: string;
  paragraphsEn: string[];
  paragraphsVi: string[];
  images?: PcrmMedia[];
  links: PcrmLink[];
  linksVi?: (PcrmLink & { text_vi?: string })[];
};

function createDetailedPage(spec: DetailedManualPageSpec): PcrmPage & { path: string } {
  const {
    path,
    titleEn,
    titleVi,
    descriptionEn,
    descriptionVi,
    paragraphsEn,
    paragraphsVi,
    images,
    links,
    linksVi,
  } = spec;

  return {
    url: `${BASE}${path}`,
    path,
    title: titleEn,
    title_en: titleEn,
    title_vi: titleVi,
    description: descriptionEn,
    description_en: descriptionEn,
    description_vi: descriptionVi,
    h1: [titleEn],
    h1_en: [titleEn],
    h1_vi: [titleVi],
    h2: [],
    h2_en: [],
    h2_vi: [],
    h3: [],
    h3_en: [],
    h3_vi: [],
    paragraphs: paragraphsEn,
    paragraphs_en: paragraphsEn,
    paragraphs_vi: paragraphsVi,
    images: images ?? [],
    links,
    links_vi: linksVi,
  };
}

const priorityArticleManualPages: DetailedManualPageSpec[] = [
  {
    path: "/news/news-releases/physicians-committee-offering-grants-farmers-who-are-growing-health-promoting",
    titleEn:
      "Physicians Committee Is Offering Grants to Farmers Who Are Growing Health-Promoting Fruits and Veggies While Phasing Out Animal Agriculture",
    titleVi:
      "Ủy ban Bác sĩ cấp tài trợ cho nông dân trồng cây có lợi cho sức khỏe khi chuyển đổi khỏi chăn nuôi công nghiệp",
    descriptionEn:
      "The Physicians Committee announced a grant program supporting farmers who are transitioning toward health-promoting crop production.",
    descriptionVi:
      "Ủy ban Bác sĩ công bố chương trình tài trợ dành cho nông dân đang chuyển hướng sang canh tác cây trồng có lợi cho sức khỏe cộng đồng.",
    paragraphsEn: [
      "The announcement introduces funding opportunities for farmers expanding production of fruits and vegetables that support healthier diets.",
      "The program is positioned as practical support for agricultural transition while aligning food systems with public-health goals.",
      "Read the full release for eligibility criteria, timeline, and implementation details.",
    ],
    paragraphsVi: [
      "Thông cáo giới thiệu các gói hỗ trợ tài chính cho nông dân mở rộng sản xuất rau, củ, quả phục vụ mô hình dinh dưỡng lành mạnh hơn.",
      "Chương trình được định vị như một hỗ trợ thực tiễn cho quá trình chuyển đổi nông nghiệp, đồng thời gắn với mục tiêu cải thiện sức khỏe cộng đồng.",
      "Xem toàn văn thông cáo để theo dõi tiêu chí tham gia, mốc thời gian và chi tiết triển khai.",
    ],
    links: [
      {
        text: "News Releases",
        url: `${BASE}/news/news-releases`,
      },
      {
        text: "Health & Nutrition News",
        url: `${BASE}/news/health-nutrition`,
      },
    ],
    linksVi: [
      {
        text: "News Releases",
        text_vi: "Thông cáo báo chí",
        url: `${BASE}/news/news-releases`,
      },
      {
        text: "Health & Nutrition News",
        text_vi: "Tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
    ],
  },
  {
    path: "/news/news-releases/doctors-group-files-legal-petition-urging-usda-require-colorectal-cancer-warning",
    titleEn:
      "Doctors Group Files Legal Petition Urging USDA to Require Colorectal Cancer Warning Labels on Processed Meat",
    titleVi:
      "Nhóm bác sĩ nộp kiến nghị pháp lý, đề nghị USDA yêu cầu cảnh báo nguy cơ ung thư đại trực tràng trên thịt chế biến sẵn",
    descriptionEn:
      "A Physicians Committee legal petition asks USDA to require clearer colorectal-cancer warning labels tied to processed meat products.",
    descriptionVi:
      "Kiến nghị pháp lý của Ủy ban Bác sĩ đề nghị USDA yêu cầu nhãn cảnh báo rõ ràng hơn về nguy cơ ung thư đại trực tràng liên quan đến thịt chế biến sẵn.",
    paragraphsEn: [
      "The Physicians Committee announced a legal filing that urges USDA to strengthen consumer warning language for processed meat.",
      "The petition focuses on transparency in risk communication and more consistent public-health messaging at point of purchase.",
      "See the full release for legal context, petition scope, and requested regulatory action.",
    ],
    paragraphsVi: [
      "Ủy ban Bác sĩ công bố hồ sơ kiến nghị pháp lý, kêu gọi USDA tăng cường nội dung cảnh báo dành cho người tiêu dùng đối với thịt chế biến sẵn.",
      "Kiến nghị nhấn mạnh tính minh bạch trong truyền thông nguy cơ và sự nhất quán của thông điệp y tế công cộng tại điểm bán.",
      "Xem toàn văn thông cáo để theo dõi bối cảnh pháp lý, phạm vi kiến nghị và các đề xuất quản lý cụ thể.",
    ],
    links: [
      {
        text: "News Releases",
        url: `${BASE}/news/news-releases`,
      },
      {
        text: "Health & Nutrition News",
        url: `${BASE}/news/health-nutrition`,
      },
    ],
    linksVi: [
      {
        text: "News Releases",
        text_vi: "Thông cáo báo chí",
        url: `${BASE}/news/news-releases`,
      },
      {
        text: "Health & Nutrition News",
        text_vi: "Tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
    ],
  },
  {
    path: "/news/health-nutrition/american-heart-association-recommends-plant-based-protein-over-meat",
    titleEn: "American Heart Association Recommends Plant-Based Protein Over Meat",
    titleVi: "Hiệp hội Tim mạch Hoa Kỳ khuyến nghị ưu tiên protein thực vật thay cho thịt",
    descriptionEn:
      "The American Heart Association recommends choosing plant-based protein sources in place of meat for better cardiovascular health.",
    descriptionVi:
      "Hiệp hội Tim mạch Hoa Kỳ khuyến nghị ưu tiên nguồn protein từ thực vật thay cho thịt để hỗ trợ sức khỏe tim mạch.",
    paragraphsEn: [
      "This health and nutrition update summarizes the American Heart Association recommendation on replacing meat with plant-based protein sources.",
      "The guidance highlights dietary patterns that support cardiometabolic health and long-term risk reduction.",
      "Read the full article for context and key takeaways relevant to clinical counseling.",
    ],
    paragraphsVi: [
      "Bản tin sức khỏe và dinh dưỡng này tóm tắt khuyến nghị của Hiệp hội Tim mạch Hoa Kỳ về việc thay thế thịt bằng nguồn protein thực vật.",
      "Nội dung nhấn mạnh mô hình ăn uống hỗ trợ sức khỏe tim mạch - chuyển hóa và giảm nguy cơ bệnh trong dài hạn.",
      "Xem bài đầy đủ để nắm rõ bối cảnh và các điểm chính có thể áp dụng trong tư vấn lâm sàng.",
    ],
    links: [
      {
        text: "Health & Nutrition News",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "Good Nutrition",
        url: `${BASE}/good-nutrition`,
      },
    ],
    linksVi: [
      {
        text: "Health & Nutrition News",
        text_vi: "Tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "Good Nutrition",
        text_vi: "Dinh dưỡng lành mạnh",
        url: `${BASE}/good-nutrition`,
      },
    ],
  },
  {
    path: "/news/exam-room-podcast/can-your-gut-predict-parkinsons-alzheimers-dr-trisha-pasricha",
    titleEn: "Can Your Gut Predict Parkinson’s & Alzheimer’s? | Dr. Trisha Pasricha",
    titleVi: "Đường ruột có thể dự đoán Parkinson và Alzheimer? | TS.BS. Trisha Pasricha",
    descriptionEn:
      "In this Exam Room episode, Dr. Trisha Pasricha discusses emerging evidence linking gut health with neurodegenerative disease risk.",
    descriptionVi:
      "Trong tập Exam Room này, TS.BS. Trisha Pasricha trao đổi về các bằng chứng mới liên hệ sức khỏe đường ruột với nguy cơ bệnh thoái hóa thần kinh.",
    paragraphsEn: [
      "The episode explores current research on the gut-brain axis and how digestive patterns may relate to Parkinson’s and Alzheimer’s disease.",
      "It also discusses what is known today, what remains uncertain, and how clinicians should communicate evidence to the public.",
      "Listen to the full episode for expert context and practical interpretation.",
    ],
    paragraphsVi: [
      "Tập podcast phân tích các nghiên cứu hiện tại về trục ruột - não và cách đặc điểm tiêu hóa có thể liên quan đến Parkinson cũng như Alzheimer.",
      "Nội dung đồng thời làm rõ những gì đã có bằng chứng, những điểm còn chưa chắc chắn và cách truyền đạt thông tin cho người bệnh.",
      "Nghe toàn bộ tập để theo dõi bối cảnh chuyên gia và cách diễn giải mang tính thực hành.",
    ],
    links: [
      {
        text: "Exam Room Podcast",
        url: `${BASE}/news/exam-room-podcast`,
      },
      {
        text: "Health Topics",
        url: `${BASE}/health-topics`,
      },
    ],
    linksVi: [
      {
        text: "Exam Room Podcast",
        text_vi: "Podcast Exam Room",
        url: `${BASE}/news/exam-room-podcast`,
      },
      {
        text: "Health Topics",
        text_vi: "Chủ đề sức khỏe",
        url: `${BASE}/health-topics`,
      },
    ],
  },
  {
    path: "/news/health-nutrition/plant-based-diets-reduce-risk-cancer",
    titleEn: "Plant-Based Diets Reduce the Risk of Cancer",
    titleVi: "Chế độ ăn thực vật giúp giảm nguy cơ ung thư",
    descriptionEn:
      "A health and nutrition feature reviews evidence showing that plant-based dietary patterns are associated with lower cancer risk.",
    descriptionVi:
      "Bài viết sức khỏe - dinh dưỡng tổng hợp bằng chứng cho thấy mô hình ăn dựa trên thực vật có liên quan với nguy cơ ung thư thấp hơn.",
    paragraphsEn: [
      "The article summarizes how dietary patterns centered on whole plant foods may contribute to lower risk across multiple cancer outcomes.",
      "It highlights practical implications for prevention-focused nutrition counseling in clinical and community settings.",
      "Read the full story for study context and evidence highlights.",
    ],
    paragraphsVi: [
      "Bài viết tóm tắt cách mô hình ăn tập trung vào thực phẩm thực vật nguyên chất có thể góp phần giảm nguy cơ ở nhiều nhóm ung thư.",
      "Nội dung nhấn mạnh ý nghĩa ứng dụng trong tư vấn dinh dưỡng dự phòng, cả trong lâm sàng lẫn cộng đồng.",
      "Xem bài đầy đủ để theo dõi bối cảnh nghiên cứu và các điểm bằng chứng quan trọng.",
    ],
    links: [
      {
        text: "Health & Nutrition News",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "Health Topics",
        url: `${BASE}/health-topics/cancer`,
      },
    ],
    linksVi: [
      {
        text: "Health & Nutrition News",
        text_vi: "Tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "Health Topics",
        text_vi: "Chủ đề sức khỏe: ung thư",
        url: `${BASE}/health-topics/cancer`,
      },
    ],
  },
  {
    path: "/news/innovative-science/patient-derived-brain-organoids-provide-new-insights-autism-spectrum",
    titleEn: "Patient-Derived Brain Organoids Provide New Insights Into Autism Spectrum Disorders",
    titleVi: "Não cơ quan mini từ tế bào người bệnh mở ra góc nhìn mới về rối loạn phổ tự kỷ",
    descriptionEn:
      "Innovative science researchers report how patient-derived brain organoids are helping clarify mechanisms related to autism spectrum disorders.",
    descriptionVi:
      "Bản tin khoa học đổi mới cho thấy mô hình não cơ quan mini từ tế bào người bệnh đang giúp làm rõ thêm các cơ chế liên quan đến rối loạn phổ tự kỷ.",
    paragraphsEn: [
      "The article explains how patient-derived organoid models can capture human-relevant biological signals that are difficult to observe in older models.",
      "It discusses why this approach may improve hypothesis testing and translational relevance in neurodevelopmental research.",
      "Read the full update for study framing and key scientific implications.",
    ],
    paragraphsVi: [
      "Bài viết giải thích cách mô hình organoid tạo từ tế bào người bệnh có thể phản ánh tín hiệu sinh học liên quan trực tiếp đến con người, vốn khó quan sát trong các mô hình cũ.",
      "Nội dung cũng nêu vì sao cách tiếp cận này có thể hỗ trợ kiểm định giả thuyết tốt hơn và tăng giá trị chuyển giao trong nghiên cứu phát triển thần kinh.",
      "Xem bản cập nhật đầy đủ để theo dõi thiết kế nghiên cứu và các hàm ý khoa học chính.",
    ],
    links: [
      {
        text: "Innovative Science News",
        url: `${BASE}/news/innovative-science-news`,
      },
      {
        text: "Good Science Digest",
        url: `${BASE}/news/good-science-digest`,
      },
    ],
    linksVi: [
      {
        text: "Innovative Science News",
        text_vi: "Tin khoa học đổi mới",
        url: `${BASE}/news/innovative-science-news`,
      },
      {
        text: "Good Science Digest",
        text_vi: "Bản tin khoa học chuyên sâu",
        url: `${BASE}/news/good-science-digest`,
      },
    ],
  },
  {
    path: "/icnm",
    titleEn: "International Conference on Nutrition in Medicine August 13-15, 2026",
    titleVi: "Hội nghị Quốc tế về Dinh dưỡng trong Y học, 13-15 tháng 8, 2026",
    descriptionEn:
      "The International Conference on Nutrition in Medicine brings clinicians and researchers together to share evidence-based nutrition updates for medical practice.",
    descriptionVi:
      "Hội nghị Quốc tế về Dinh dưỡng trong Y học quy tụ bác sĩ và nhà nghiên cứu để cập nhật bằng chứng dinh dưỡng ứng dụng trong thực hành lâm sàng.",
    paragraphsEn: [
      "This conference highlights practical nutrition science, prevention-focused medicine, and clinical implementation strategies.",
      "Sessions include current research summaries, case-based discussions, and applied guidance for healthcare professionals.",
      "See the full conference details for program updates and participation information.",
    ],
    paragraphsVi: [
      "Hội nghị tập trung vào khoa học dinh dưỡng ứng dụng, y học dự phòng và các chiến lược triển khai trong thực hành.",
      "Nội dung bao gồm tổng quan nghiên cứu mới, thảo luận tình huống lâm sàng và hướng dẫn áp dụng cho nhân viên y tế.",
      "Xem thông tin đầy đủ của hội nghị để theo dõi chương trình và hình thức tham gia.",
    ],
    images: [
      {
        src: "https://www.pcrm.org/sites/default/files/2023-12/Neal-Barnard-ICNM-2023-Podium.jpg",
        alt: "Diễn giả tại Hội nghị Quốc tế về Dinh dưỡng trong Y học",
      },
    ],
    links: [
      {
        text: "Events",
        url: `${BASE}/events`,
      },
      {
        text: "Good Nutrition",
        url: `${BASE}/good-nutrition`,
      },
    ],
    linksVi: [
      {
        text: "Events",
        text_vi: "Sự kiện",
        url: `${BASE}/events`,
      },
      {
        text: "Good Nutrition",
        text_vi: "Dinh dưỡng lành mạnh",
        url: `${BASE}/good-nutrition`,
      },
    ],
  },
  {
    path: "/ethical-science/summer-immersion",
    titleEn: "2026 Summer Immersion on Innovative Approaches in Science",
    titleVi: "Summer Immersion 2026 về các phương pháp khoa học đổi mới",
    descriptionEn:
      "A focused summer program exploring modern, human-relevant scientific approaches and responsible research methods.",
    descriptionVi:
      "Chương trình mùa hè chuyên sâu về các phương pháp khoa học hiện đại, phù hợp với dữ liệu người và định hướng nghiên cứu có trách nhiệm.",
    paragraphsEn: [
      "The immersion introduces participants to innovative research frameworks that improve translational relevance and scientific quality.",
      "It covers practical examples, policy context, and collaborative learning for ethically grounded science.",
      "Read the full program page for curriculum details, schedule, and eligibility.",
    ],
    paragraphsVi: [
      "Chương trình giới thiệu các khung nghiên cứu đổi mới giúp nâng cao tính chuyển giao và chất lượng bằng chứng khoa học.",
      "Nội dung bao gồm ví dụ thực tiễn, bối cảnh chính sách và hoạt động học tập hợp tác theo định hướng đạo đức.",
      "Xem trang chương trình đầy đủ để theo dõi nội dung học, lịch trình và điều kiện tham gia.",
    ],
    images: [
      {
        src: "https://www.pcrm.org/sites/default/files/2025-12/2026-Summer-Immersion.jpg",
        alt: "Summer Immersion 2026 về các phương pháp khoa học đổi mới",
      },
    ],
    links: [
      {
        text: "Ethical Science",
        url: `${BASE}/ethical-science`,
      },
      {
        text: "Good Science Digest",
        url: `${BASE}/news/good-science-digest`,
      },
    ],
    linksVi: [
      {
        text: "Ethical Science",
        text_vi: "Khoa học có đạo đức",
        url: `${BASE}/ethical-science`,
      },
      {
        text: "Good Science Digest",
        text_vi: "Bản tin khoa học",
        url: `${BASE}/news/good-science-digest`,
      },
    ],
  },
  {
    path: "/news/news-releases/swapping-meat-and-dairy-plant-based-foods-cuts-climate-pollution-35-randomized",
    titleEn:
      "Swapping Meat and Dairy for Plant-Based Foods Cuts Climate Pollution by 35%, Randomized Trial Finds",
    titleVi:
      "Thay thịt và sữa bằng thực phẩm thực vật giúp giảm 35% phát thải khí hậu, theo thử nghiệm ngẫu nhiên",
    descriptionEn:
      "A randomized trial reported that replacing meat and dairy with plant-based foods lowered climate-related pollution by 35%.",
    descriptionVi:
      "Một thử nghiệm ngẫu nhiên cho thấy việc thay thịt và sữa bằng thực phẩm thực vật giúp giảm 35% phát thải liên quan đến khí hậu.",
    paragraphsEn: [
      "The Physicians Committee shared findings from a randomized trial showing a measurable drop in climate pollution when participants replaced meat and dairy with plant-based foods.",
      "The report highlights that everyday food choices may create meaningful environmental benefits while remaining aligned with preventive-health goals.",
      "Read the release for methods, trial context, and full study summary.",
    ],
    paragraphsVi: [
      "Ủy ban Bác sĩ công bố kết quả thử nghiệm ngẫu nhiên cho thấy mức phát thải khí hậu giảm rõ rệt khi người tham gia thay thịt và sữa bằng thực phẩm thực vật.",
      "Bản tin nhấn mạnh lựa chọn ăn uống hằng ngày có thể tạo lợi ích môi trường đáng kể, đồng thời phù hợp với định hướng y học dự phòng.",
      "Xem toàn văn thông cáo để theo dõi phương pháp, bối cảnh thử nghiệm và tóm tắt nghiên cứu đầy đủ.",
    ],
    links: [
      {
        text: "Health & Nutrition News",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "News Releases",
        url: `${BASE}/news/news-releases`,
      },
    ],
    linksVi: [
      {
        text: "Health & Nutrition News",
        text_vi: "Tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "News Releases",
        text_vi: "Thông cáo báo chí",
        url: `${BASE}/news/news-releases`,
      },
    ],
  },
  {
    path: "/news/innovative-science/progress-expanding-organ-donor-pool",
    titleEn: "Progress in Expanding the Organ Donor Pool",
    titleVi: "Tiến triển trong việc mở rộng nguồn hiến tạng",
    descriptionEn:
      "An innovative science update highlights current progress and research directions aimed at expanding the organ donor pool.",
    descriptionVi:
      "Bản tin khoa học đổi mới cập nhật các tiến triển và hướng nghiên cứu nhằm mở rộng nguồn hiến tạng.",
    paragraphsEn: [
      "This update reviews scientific strategies intended to increase organ availability and improve transplant pathways.",
      "It outlines research directions, including human-relevant methods that may improve translation into clinical settings.",
      "Read the full article for study context, limitations, and linked sources.",
    ],
    paragraphsVi: [
      "Bài cập nhật tổng hợp các chiến lược khoa học nhằm tăng khả năng sẵn có của tạng hiến và cải thiện quy trình ghép tạng.",
      "Nội dung nêu các hướng nghiên cứu, trong đó có những phương pháp phù hợp với sinh học người để tăng tính ứng dụng lâm sàng.",
      "Xem bài đầy đủ để theo dõi bối cảnh nghiên cứu, giới hạn dữ liệu và nguồn tham chiếu.",
    ],
    links: [
      {
        text: "Innovative Science News",
        url: `${BASE}/news/innovative-science-news`,
      },
      {
        text: "Good Science Digest",
        url: `${BASE}/news/good-science-digest`,
      },
    ],
    linksVi: [
      {
        text: "Innovative Science News",
        text_vi: "Tin khoa học đổi mới",
        url: `${BASE}/news/innovative-science-news`,
      },
      {
        text: "Good Science Digest",
        text_vi: "Bản tin khoa học chuyên sâu",
        url: `${BASE}/news/good-science-digest`,
      },
    ],
  },
  {
    path: "/news/blog/chicken-ick-fecal-soup",
    titleEn: "Chicken Ick: Fecal Soup",
    titleVi: "Góc khuất thịt gà: nguy cơ nhiễm bẩn từ quy trình chế biến",
    descriptionEn:
      "A blog post discussing contamination concerns around chicken processing and what consumers should know.",
    descriptionVi:
      "Bài blog phân tích nguy cơ nhiễm bẩn trong chuỗi chế biến thịt gà và các điểm người tiêu dùng cần lưu ý.",
    paragraphsEn: [
      "The post explains why contamination risk in chicken production remains a persistent public-health concern.",
      "It summarizes practical context for consumers and links to broader food-safety and prevention resources.",
      "Read the full article for references and additional guidance.",
    ],
    paragraphsVi: [
      "Bài viết làm rõ vì sao nguy cơ nhiễm bẩn trong sản xuất thịt gà vẫn là vấn đề đáng quan ngại đối với sức khỏe cộng đồng.",
      "Nội dung tóm tắt bối cảnh thực tế cho người tiêu dùng và dẫn tới các tài liệu liên quan về an toàn thực phẩm, dự phòng bệnh.",
      "Xem bài đầy đủ để theo dõi nguồn tham khảo và hướng dẫn chi tiết hơn.",
    ],
    links: [
      {
        text: "Health & Nutrition News",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "Blog",
        url: `${BASE}/news/blog`,
      },
    ],
    linksVi: [
      {
        text: "Health & Nutrition News",
        text_vi: "Tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
      {
        text: "Blog",
        text_vi: "Blog",
        url: `${BASE}/news/blog`,
      },
    ],
  },
  {
    path: "/news/good-science-digest/human-health-human-science-how-physicians-committee-improving-public",
    titleEn:
      "Human Health, Human Science: How the Physicians Committee Is Improving Public Health Through Smarter Research",
    titleVi:
      "Sức khỏe con người, khoa học vì con người: cách Ủy ban Bác sĩ cải thiện y tế công cộng bằng nghiên cứu phù hợp hơn",
    descriptionEn:
      "A Good Science Digest overview of how human-relevant research supports better public-health outcomes.",
    descriptionVi:
      "Bài tổng hợp Good Science Digest cho thấy nghiên cứu phù hợp với sinh học người có thể hỗ trợ kết quả y tế công cộng tốt hơn.",
    paragraphsEn: [
      "The digest outlines how human-relevant science can strengthen evidence quality for public-health decision-making.",
      "It highlights policy and research priorities that seek better outcomes while reducing dependence on outdated animal-based models.",
      "Read the full entry for complete context and references.",
    ],
    paragraphsVi: [
      "Bài tổng hợp trình bày cách khoa học gắn chặt với dữ liệu trên người có thể nâng chất lượng bằng chứng cho quyết định y tế công cộng.",
      "Nội dung nhấn mạnh các ưu tiên chính sách và nghiên cứu nhằm cải thiện hiệu quả sức khỏe, đồng thời giảm phụ thuộc vào mô hình động vật đã lỗi thời.",
      "Xem toàn văn để theo dõi đầy đủ bối cảnh và tài liệu tham chiếu.",
    ],
    links: [
      {
        text: "Good Science Digest",
        url: `${BASE}/news/good-science-digest`,
      },
      {
        text: "Innovative Science News",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
    linksVi: [
      {
        text: "Good Science Digest",
        text_vi: "Bản tin khoa học chuyên sâu",
        url: `${BASE}/news/good-science-digest`,
      },
      {
        text: "Innovative Science News",
        text_vi: "Tin khoa học đổi mới",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
  },
  {
    path: "/news/good-science-digest/physicians-committee-calls-nih-implement-key-fiscal-year-2026",
    titleEn: "Physicians Committee Calls on NIH to Implement Key Fiscal Year 2026 Congressional Directives",
    titleVi: "Ủy ban Bác sĩ kêu gọi NIH thực hiện các chỉ đạo trọng điểm của Quốc hội năm tài khóa 2026",
    descriptionEn:
      "A Good Science Digest update outlining calls for NIH to implement key congressional directives in fiscal year 2026.",
    descriptionVi:
      "Bản tin Good Science Digest cập nhật lời kêu gọi NIH triển khai các chỉ đạo quan trọng của Quốc hội trong năm tài khóa 2026.",
    paragraphsEn: [
      "The update summarizes policy directives highlighted for NIH implementation in fiscal year 2026.",
      "It explains why human-relevant research priorities matter for public accountability and scientific impact.",
      "Read the full digest entry for context, recommendations, and source references.",
    ],
    paragraphsVi: [
      "Bài viết tóm tắt các chỉ đạo chính sách được nhấn mạnh để NIH triển khai trong năm tài khóa 2026.",
      "Nội dung giải thích vì sao ưu tiên nghiên cứu phù hợp với sinh học người là cần thiết cho trách nhiệm giải trình và hiệu quả khoa học.",
      "Xem bản tin đầy đủ để theo dõi bối cảnh, khuyến nghị và nguồn tham chiếu.",
    ],
    images: [
      {
        src: "https://www.pcrm.org/sites/default/files/2026-03/octopus.jpeg",
        alt: "Bản tin khoa học về định hướng nghiên cứu phù hợp với con người",
      },
    ],
    links: [
      {
        text: "Good Science Digest",
        url: `${BASE}/news/good-science-digest`,
      },
      {
        text: "Innovative Science News",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
    linksVi: [
      {
        text: "Good Science Digest",
        text_vi: "Bản tin khoa học",
        url: `${BASE}/news/good-science-digest`,
      },
      {
        text: "Innovative Science News",
        text_vi: "Tin khoa học đổi mới",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
  },
  {
    path: "/news/good-science-digest/physicians-committee-calls-greater-investment-human-based-research-nimh",
    titleEn: "Physicians Committee Calls for Greater Investment in Human-Based Research at NIMH",
    titleVi: "Ủy ban Bác sĩ kêu gọi tăng đầu tư cho nghiên cứu dựa trên con người tại NIMH",
    descriptionEn:
      "A Good Science Digest story on recommendations to expand investment in human-based research at NIMH.",
    descriptionVi:
      "Bản tin Good Science Digest về đề xuất tăng đầu tư cho các hướng nghiên cứu dựa trên con người tại NIMH.",
    paragraphsEn: [
      "The story highlights recommendations for stronger federal investment in human-based neuroscience research pathways.",
      "It emphasizes research strategies that can improve translational relevance for mental health science.",
      "Read the full digest article for rationale, context, and linked references.",
    ],
    paragraphsVi: [
      "Bài viết nêu các khuyến nghị nhằm tăng cường đầu tư liên bang cho các hướng nghiên cứu thần kinh học dựa trên dữ liệu người.",
      "Nội dung nhấn mạnh các chiến lược nghiên cứu có thể cải thiện tính chuyển giao trong khoa học sức khỏe tâm thần.",
      "Xem toàn văn bản tin để theo dõi lập luận, bối cảnh và tài liệu liên quan.",
    ],
    images: [
      {
        src: "https://www.pcrm.org/sites/default/files/styles/teaser_400x225/public/2026-03/MRI-scans.jpg?h=d1cb525d&itok=LJLOXJE3",
        alt: "Hình minh họa nghiên cứu thần kinh học dựa trên dữ liệu người",
      },
    ],
    links: [
      {
        text: "Good Science Digest",
        url: `${BASE}/news/good-science-digest`,
      },
      {
        text: "Innovative Science News",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
    linksVi: [
      {
        text: "Good Science Digest",
        text_vi: "Bản tin khoa học",
        url: `${BASE}/news/good-science-digest`,
      },
      {
        text: "Innovative Science News",
        text_vi: "Tin khoa học đổi mới",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
  },
];

export const manualPages = [
  ...manualPageSpecs.map(createPage),
  ...priorityArticleManualPages.map(createDetailedPage),
];

