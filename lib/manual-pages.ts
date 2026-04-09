import type { PcrmLink, PcrmPage } from "./pcrm-content";

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
    "Chế độ ăn thực vật",
    "Foundational guides and resources about plant-based eating.",
    "Tài liệu nền tảng và tài nguyên về chế độ ăn thực vật.",
  ],
  [
    "/good-nutrition/plant-based-diets/nutrition-faq",
    "Nutrition FAQ",
    "Câu hỏi thường gặp về dinh dưỡng",
    "Answers to common questions about plant-based nutrition.",
    "Giải đáp các câu hỏi thường gặp về dinh dưỡng thực vật.",
  ],
  [
    "/good-nutrition/nutrition-for-clinicians",
    "Nutrition for Clinicians",
    "Dinh dưỡng cho bác sĩ",
    "Practical nutrition resources for healthcare professionals.",
    "Tài liệu dinh dưỡng thực hành dành cho nhân viên y tế.",
  ],
  [
    "/good-nutrition/nutrition-for-clinicians/medical-students",
    "Nutrition for Medical Students",
    "Dinh dưỡng cho sinh viên y khoa",
    "Introductory resources for medical students learning plant-based nutrition.",
    "Tài liệu nhập môn cho sinh viên y khoa tìm hiểu dinh dưỡng thực vật.",
  ],
  [
    "/good-nutrition/nutrition-information/the-carbohydrate-advantage",
    "The Carbohydrate Advantage",
    "Lợi thế của carbohydrate",
    "Why smart carbohydrate choices matter in a plant-based diet.",
    "Vì sao lựa chọn carbohydrate phù hợp rất quan trọng trong chế độ ăn thực vật.",
  ],
  [
    "/good-nutrition/nutrition-information/soy-and-health",
    "Soy and Health",
    "Đậu nành và sức khỏe",
    "Evidence-based guidance on soy foods and health outcomes.",
    "Hướng dẫn dựa trên bằng chứng về đậu nành và sức khỏe.",
  ],
  [
    "/good-nutrition/nutrition-information/lowering-cholesterol-with-a-plant-based-diet",
    "Lowering Cholesterol with a Plant-Based Diet",
    "Giảm cholesterol bằng chế độ ăn thực vật",
    "Ways to support healthy cholesterol levels through food choices.",
    "Cách hỗ trợ mức cholesterol lành mạnh thông qua lựa chọn thực phẩm.",
  ],
  [
    "/good-nutrition/nutrition-information/chicken",
    "Chicken",
    "Thịt gà",
    "Nutrition guidance and concerns related to chicken consumption.",
    "Hướng dẫn dinh dưỡng và các lưu ý liên quan đến việc ăn thịt gà.",
  ],
  [
    "/good-nutrition/nutrition-information/processed-meat",
    "Processed Meat",
    "Thịt chế biến sẵn",
    "Health concerns and evidence about processed meat.",
    "Các lo ngại sức khỏe và bằng chứng về thịt chế biến sẵn.",
  ],
  [
    "/good-nutrition/healthy-communities",
    "Healthy Communities",
    "Cộng đồng khỏe mạnh",
    "Community-based programs and outreach resources.",
    "Chương trình cộng đồng và tài nguyên truyền thông.",
  ],
  [
    "/good-nutrition/nutrition-programs-policies",
    "Nutrition Programs & Policies",
    "Chương trình và chính sách dinh dưỡng",
    "Program and policy resources supporting healthier food environments.",
    "Tài nguyên về chương trình và chính sách hỗ trợ môi trường ăn uống lành mạnh.",
  ],
  [
    "/ethical-science/ethical-education-and-training/paramedic-training",
    "Paramedic Training",
    "Đào tạo nhân viên cấp cứu",
    "Training resources focused on humane and effective medical education.",
    "Tài liệu đào tạo hướng tới giáo dục y khoa hiệu quả và nhân đạo.",
  ],
  [
    "/ethical-science/animals-in-medical-research",
    "Animals in Medical Research",
    "Động vật trong nghiên cứu y khoa",
    "Alternatives, analysis, and discussion of animal use in research.",
    "Các giải pháp thay thế, phân tích và thảo luận về việc dùng động vật trong nghiên cứu.",
  ],
  [
    "/ethical-science/animals-in-medical-research/alzheimers-disease-research-without-animals",
    "Alzheimer's Disease Research Without Animals",
    "Nghiên cứu Alzheimer không dùng động vật",
    "Human-relevant research and alternatives for Alzheimer’s studies.",
    "Nghiên cứu phù hợp với con người và các giải pháp thay thế cho nghiên cứu Alzheimer.",
  ],
  [
    "/ethical-science/ethical-education-and-training/ERA21",
    "ERA21",
    "ERA21",
    "Alternative surgical training resources and education initiatives.",
    "Tài nguyên đào tạo phẫu thuật thay thế và các sáng kiến giáo dục.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives",
    "Animal Testing and Alternatives",
    "Thử nghiệm trên động vật và giải pháp thay thế",
    "Overview of modern research methods and alternatives to animal testing.",
    "Tổng quan về các phương pháp nghiên cứu hiện đại và giải pháp thay thế thử nghiệm động vật.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives/animal-free-antibodies",
    "Animal-Free Antibodies",
    "Kháng thể không dùng động vật",
    "Methods and resources for producing antibodies without animals.",
    "Phương pháp và tài nguyên sản xuất kháng thể mà không cần động vật.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives/cruelty-free-cosmetics",
    "Cruelty-Free Cosmetics",
    "Mỹ phẩm không thử nghiệm trên động vật",
    "How cosmetic testing can move away from animal use.",
    "Cách ngành mỹ phẩm có thể chuyển sang không dùng động vật.",
  ],
  [
    "/ethical-science/animal-testing-and-alternatives/human-tissue-research",
    "Human Tissue Research",
    "Nghiên cứu mô người",
    "Human tissue-based approaches to biomedical research.",
    "Các phương pháp nghiên cứu y sinh dựa trên mô người.",
  ],
  [
    "/clinical-research/endometriosis",
    "Endometriosis",
    "Lạc nội mạc tử cung",
    "Clinical research and nutrition-related resources on endometriosis.",
    "Nghiên cứu lâm sàng và tài nguyên dinh dưỡng liên quan đến lạc nội mạc tử cung.",
  ],
  [
    "/clinical-research/fighting-hot-flashes-with-diet",
    "Fighting Hot Flashes with Diet",
    "Kiểm soát bốc hỏa bằng chế độ ăn",
    "Diet strategies and clinical guidance for managing hot flashes.",
    "Chiến lược dinh dưỡng và hướng dẫn lâm sàng để kiểm soát bốc hỏa.",
  ],
  [
    "/health-topics/alzheimers",
    "Alzheimer's",
    "Alzheimer",
    "Research-backed guidance and articles related to Alzheimer’s disease.",
    "Tài liệu và bài viết dựa trên bằng chứng về bệnh Alzheimer.",
  ],
  [
    "/health-topics/arthritis",
    "Arthritis",
    "Viêm khớp",
    "Research-backed guidance and articles related to arthritis.",
    "Tài liệu và bài viết dựa trên bằng chứng về viêm khớp.",
  ],
  [
    "/health-topics/asthma",
    "Asthma",
    "Hen suyễn",
    "Research-backed guidance and articles related to asthma.",
    "Tài liệu và bài viết dựa trên bằng chứng về hen suyễn.",
  ],
  [
    "/health-topics/breast-cancer",
    "Breast Cancer",
    "Ung thư vú",
    "Research-backed guidance and articles related to breast cancer.",
    "Tài liệu và bài viết dựa trên bằng chứng về ung thư vú.",
  ],
  [
    "/health-topics/coronavirus",
    "Coronavirus",
    "Coronavirus",
    "Research-backed guidance and articles related to coronavirus.",
    "Tài liệu và bài viết dựa trên bằng chứng về coronavirus.",
  ],
  [
    "/health-topics/healthy-bones",
    "Healthy Bones",
    "Xương khỏe mạnh",
    "Research-backed guidance and articles related to bone health.",
    "Tài liệu và bài viết dựa trên bằng chứng về sức khỏe xương.",
  ],
  [
    "/health-topics/heart-disease",
    "Heart Disease",
    "Bệnh tim",
    "Research-backed guidance and articles related to heart disease.",
    "Tài liệu và bài viết dựa trên bằng chứng về bệnh tim.",
  ],
  [
    "/health-topics/migraines",
    "Migraines",
    "Đau nửa đầu",
    "Research-backed guidance and articles related to migraines.",
    "Tài liệu và bài viết dựa trên bằng chứng về đau nửa đầu.",
  ],
  [
    "/health-topics/ovarian-cancer",
    "Ovarian Cancer",
    "Ung thư buồng trứng",
    "Research-backed guidance and articles related to ovarian cancer.",
    "Tài liệu và bài viết dựa trên bằng chứng về ung thư buồng trứng.",
  ],
  [
    "/health-topics/polycystic-ovarian-syndrome",
    "Polycystic Ovarian Syndrome",
    "Hội chứng buồng trứng đa nang",
    "Research-backed guidance and articles related to PCOS.",
    "Tài liệu và bài viết dựa trên bằng chứng về hội chứng buồng trứng đa nang.",
  ],
  [
    "/about-us/careers",
    "Careers",
    "Tuyển dụng",
    "Open roles and opportunities with PCRM.",
    "Các vị trí tuyển dụng và cơ hội nghề nghiệp tại PCRM.",
  ],
  [
    "/about-us/careers/internships",
    "Internships",
    "Thực tập",
    "Student and early-career internship opportunities.",
    "Cơ hội thực tập cho sinh viên và người mới bắt đầu sự nghiệp.",
  ],
  [
    "/about-us/financial-report",
    "Annual & Financial Reports",
    "Báo cáo thường niên và tài chính",
    "Annual reports and financial information.",
    "Báo cáo thường niên và thông tin tài chính.",
  ],
  [
    "/events",
    "Events",
    "Sự kiện",
    "Upcoming events, programs, and featured activities.",
    "Các sự kiện, chương trình và hoạt động nổi bật sắp tới.",
  ],
  [
    "/news",
    "News",
    "Tin tức",
    "Latest news, science updates, and event coverage from PCRM.",
    "Tin tức mới nhất, cập nhật khoa học và tường thuật sự kiện từ PCRM.",
  ],
  [
    "/news/health-nutrition",
    "Health & Nutrition News",
    "Tin tức sức khỏe và dinh dưỡng",
    "Research-backed nutrition news and articles.",
    "Tin tức và bài viết dinh dưỡng dựa trên bằng chứng.",
  ],
  [
    "/news/innovative-science-news",
    "Innovative Science News",
    "Tin khoa học đổi mới",
    "News about humane, human-relevant science.",
    "Tin tức về khoa học nhân văn và phù hợp với con người.",
  ],
  [
    "/news/media-center",
    "Media Center",
    "Trung tâm truyền thông",
    "Press materials and media resources.",
    "Tài liệu báo chí và nguồn lực dành cho truyền thông.",
  ],
  [
    "/ways-to-give",
    "Support Information",
    "Thông tin hỗ trợ",
    "This supporting reference site does not accept donations.",
    "Website tham chiếu này không tiếp nhận quyên góp.",
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
    images: [],
    links,
    links_vi: linksVi,
  };
}

const priorityArticleManualPages: DetailedManualPageSpec[] = [
  {
    path: "/news/news-releases/swapping-meat-and-dairy-plant-based-foods-cuts-climate-pollution-35-randomized",
    titleEn:
      "Swapping Meat and Dairy for Plant-Based Foods Cuts Climate Pollution by 35%, Randomized Trial Finds",
    titleVi:
      "Thay thịt và sữa bằng thực phẩm từ thực vật giúp giảm 35% phát thải khí hậu, theo thử nghiệm ngẫu nhiên",
    descriptionEn:
      "A randomized trial reported that replacing meat and dairy with plant-based foods lowered climate-related pollution by 35%.",
    descriptionVi:
      "Một thử nghiệm ngẫu nhiên cho thấy việc thay thịt và sữa bằng thực phẩm từ thực vật giúp giảm 35% phát thải liên quan đến khí hậu.",
    paragraphsEn: [
      "The Physicians Committee shared findings from a randomized trial showing a measurable drop in climate pollution when participants replaced meat and dairy with plant-based foods.",
      "The report emphasizes that individual food choices can produce meaningful environmental impact while aligning with health-focused dietary patterns.",
      "Read the release for study context, methods, and the full summary from the research team.",
    ],
    paragraphsVi: [
      "Ủy ban Bác sĩ công bố kết quả từ một thử nghiệm ngẫu nhiên cho thấy mức phát thải khí hậu giảm rõ rệt khi người tham gia thay thịt và sữa bằng thực phẩm từ thực vật.",
      "Bản tin nhấn mạnh rằng lựa chọn thực phẩm hằng ngày có thể tạo tác động môi trường đáng kể, đồng thời phù hợp với định hướng dinh dưỡng lành mạnh.",
      "Xem toàn văn thông cáo để theo dõi bối cảnh nghiên cứu, phương pháp và tóm tắt chi tiết từ nhóm nghiên cứu.",
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
        text_vi: "Thông tin sức khỏe và dinh dưỡng",
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
      "An Innovative Science update highlights current progress and research directions aimed at expanding the organ donor pool.",
    descriptionVi:
      "Bài viết thuộc chuyên mục Khoa học đổi mới cập nhật các tiến triển và hướng nghiên cứu nhằm mở rộng nguồn hiến tạng.",
    paragraphsEn: [
      "This update reviews scientific efforts designed to increase organ availability and improve transplant pathways.",
      "It outlines where research is moving, including human-relevant methods that may strengthen translation into clinical use.",
      "See the full article for detailed context and linked sources.",
    ],
    paragraphsVi: [
      "Bài cập nhật này tổng hợp các hướng nghiên cứu nhằm tăng khả năng tiếp cận nguồn tạng hiến và cải thiện lộ trình ghép tạng.",
      "Nội dung nêu rõ các xu hướng mới, trong đó có những phương pháp phù hợp với sinh học người để hỗ trợ chuyển giao vào thực hành lâm sàng.",
      "Xem bài gốc để theo dõi bối cảnh chi tiết và các nguồn liên quan.",
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
        text_vi: "Thông tin khoa học đổi mới",
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
    titleVi: "Góc khuất thịt gà: “canh vi khuẩn phân”",
    descriptionEn:
      "A blog post discussing contamination concerns around chicken processing and what consumers should know.",
    descriptionVi:
      "Bài blog phân tích các rủi ro nhiễm bẩn trong chuỗi xử lý thịt gà và những điều người tiêu dùng nên lưu ý.",
    paragraphsEn: [
      "This article explains why contamination risks in chicken production continue to raise public-health concerns.",
      "It summarizes practical context for consumers and points readers to broader food-safety and prevention resources.",
      "Read the full post for references and additional guidance.",
    ],
    paragraphsVi: [
      "Bài viết làm rõ vì sao nguy cơ nhiễm bẩn trong sản xuất thịt gà vẫn là vấn đề đáng lo ngại đối với sức khỏe cộng đồng.",
      "Nội dung tóm tắt bối cảnh thực tế cho người tiêu dùng, đồng thời dẫn tới các tài liệu liên quan đến an toàn thực phẩm và phòng ngừa.",
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
        text_vi: "Thông tin sức khỏe và dinh dưỡng",
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
      "Sức khỏe con người, khoa học vì con người: Cách Ủy ban Bác sĩ cải thiện sức khỏe cộng đồng bằng nghiên cứu thông minh hơn",
    descriptionEn:
      "A Good Science Digest overview of how human-relevant research supports better public-health outcomes.",
    descriptionVi:
      "Bài tổng hợp Good Science Digest về cách nghiên cứu phù hợp với con người có thể hỗ trợ kết quả sức khỏe cộng đồng tốt hơn.",
    paragraphsEn: [
      "The article outlines how science that is more directly relevant to humans can strengthen evidence for health decisions.",
      "It highlights policy and research priorities that aim to improve outcomes while reducing reliance on outdated animal-based models.",
      "Read the full digest entry for complete context and references.",
    ],
    paragraphsVi: [
      "Bài viết trình bày cách tiếp cận nghiên cứu gắn chặt hơn với sinh học người có thể củng cố bằng chứng cho các quyết định y tế công cộng.",
      "Nội dung nhấn mạnh các ưu tiên chính sách và nghiên cứu nhằm cải thiện hiệu quả sức khỏe, đồng thời giảm phụ thuộc vào mô hình cũ dựa trên động vật.",
      "Xem toàn văn bài tổng hợp để nắm đầy đủ bối cảnh và tài liệu tham chiếu.",
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
        text_vi: "Thông tin khoa học đổi mới",
        url: `${BASE}/news/innovative-science-news`,
      },
    ],
  },
  {
    path: "/news/news-releases/doctors-group-files-legal-petition-urging-usda-require-colorectal-cancer-warning",
    titleEn:
      "Doctors Group Files Legal Petition Urging USDA to Require Colorectal Cancer Warning",
    titleVi:
      "Nhóm bác sĩ nộp kiến nghị pháp lý, đề nghị USDA yêu cầu cảnh báo về nguy cơ ung thư đại trực tràng",
    descriptionEn:
      "A Physicians Committee legal petition asks USDA to require colorectal-cancer warnings connected to processed meat.",
    descriptionVi:
      "Một kiến nghị pháp lý từ Ủy ban Bác sĩ đề nghị USDA yêu cầu cảnh báo về nguy cơ ung thư đại trực tràng liên quan thịt chế biến sẵn.",
    paragraphsEn: [
      "The Physicians Committee announced a legal petition requesting that USDA add clearer warning language tied to colorectal-cancer risk.",
      "The petition focuses on consumer-facing information and transparency in public nutrition communication.",
      "Read the full release for filing details and supporting context.",
    ],
    paragraphsVi: [
      "Ủy ban Bác sĩ thông báo đã nộp kiến nghị pháp lý, đề xuất USDA bổ sung cảnh báo rõ ràng hơn về nguy cơ ung thư đại trực tràng.",
      "Kiến nghị tập trung vào thông tin dành cho người tiêu dùng và tính minh bạch trong truyền thông dinh dưỡng công cộng.",
      "Xem toàn văn thông cáo để theo dõi chi tiết hồ sơ và bối cảnh liên quan.",
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
        text_vi: "Thông tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
    ],
  },
  {
    path: "/news/news-releases/physicians-committee-offering-grants-farmers-who-are-growing-health-promoting",
    titleEn:
      "Physicians Committee Offering Grants to Farmers Who Are Growing Health-Promoting Crops",
    titleVi:
      "Ủy ban Bác sĩ cấp tài trợ cho nông dân trồng các loại cây có lợi cho sức khỏe",
    descriptionEn:
      "The Physicians Committee announced grant support for farmers growing crops that promote healthier food systems.",
    descriptionVi:
      "Ủy ban Bác sĩ công bố chương trình tài trợ dành cho nông dân trồng các loại cây góp phần xây dựng hệ thực phẩm lành mạnh hơn.",
    paragraphsEn: [
      "The release introduces grant opportunities aimed at farmers producing health-promoting crops.",
      "The initiative highlights practical support for agricultural transitions aligned with public-health priorities.",
      "Read the full release for eligibility and program details.",
    ],
    paragraphsVi: [
      "Thông cáo giới thiệu các khoản tài trợ dành cho nông dân đang canh tác các loại cây có lợi cho sức khỏe cộng đồng.",
      "Sáng kiến này nhấn mạnh hỗ trợ thực tế cho quá trình chuyển đổi nông nghiệp theo định hướng sức khỏe.",
      "Xem toàn văn thông cáo để biết tiêu chí tham gia và thông tin chi tiết của chương trình.",
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
        text_vi: "Thông tin sức khỏe và dinh dưỡng",
        url: `${BASE}/news/health-nutrition`,
      },
    ],
  },
];

export const manualPages = [
  ...manualPageSpecs.map(createPage),
  ...priorityArticleManualPages.map(createDetailedPage),
];