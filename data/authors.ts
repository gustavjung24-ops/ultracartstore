export type AuthorStatus = "draft" | "published" | "archived";

export interface AuthorSocialLink {
  label?: string;
  url: string;
}

export interface AuthorExternalLink {
  label?: string;
  url: string;
}

export interface AuthorProfile {
  id: string;
  slug: string;
  fullName: string;
  displayName: string;
  avatar: string;
  coverImage: string;
  headline: string;
  shortBio: string;
  degrees: string[];
  specialty: string;
  currentRole: string;
  currentOrganization: string;
  professionalFocus: string;
  researchInterests: string[];
  education: string[];
  certifications: string[];
  awards: string[];
  keyCareerMilestones: string[];
  notableWorks: string[];
  books: string[];
  podcasts: string[];
  talks: string[];
  majorActivities: string[];
  publicationList: string[];
  authorThemes: string[];
  whyThisAuthorWritesThisTopic: string;
  relatedArticleSlugs: string[];
  profileSourceLinks: string[];
  externalLinks: AuthorExternalLink[];
  socialLinks: AuthorSocialLink[];
  featured: boolean;
  sortOrder: number;
  status: AuthorStatus;
  lastReviewedAt: string;
}

export const authors: AuthorProfile[] = [
  {
    id: "author-neal-barnard",
    slug: "neal-barnard",
    fullName: "Neal Barnard, MD, FACC",
    displayName: "Neal Barnard",
    avatar: "https://www.pcrm.org/sites/default/files/2023-05/Neal%20Barnard%2C%20MD%2C%20FACC%20%281%29.jpg",
    coverImage: "",
    headline: "Bác sĩ nội khoa, nhà nghiên cứu dinh dưỡng, Chủ tịch PCRM",
    shortBio:
      "Neal Barnard là bác sĩ và nhà nghiên cứu về dinh dưỡng, hiện là Chủ tịch Physicians Committee for Responsible Medicine và Adjunct Professor of Medicine tại George Washington University School of Medicine. Ông tập trung vào y học dự phòng, dinh dưỡng dựa trên thực vật và các chuẩn mực đạo đức cao hơn trong nghiên cứu.",
    degrees: ["MD", "FACC"],
    specialty: "Y khoa, dinh dưỡng lâm sàng, y học dự phòng",
    currentRole: "President",
    currentOrganization:
      "Physicians Committee for Responsible Medicine; George Washington University School of Medicine",
    professionalFocus:
      "Y học dự phòng, dinh dưỡng dựa trên thực vật, chính sách y khoa, tiêu chuẩn đạo đức trong nghiên cứu",
    researchInterests: [
      "đái tháo đường típ 2",
      "cân nặng cơ thể",
      "triệu chứng nội tiết",
      "đau mạn tính",
      "vai trò của chế độ ăn trong bệnh mạn tính",
    ],
    education: [
      "M.D., George Washington University School of Medicine",
      "Residency, George Washington University",
    ],
    certifications: [],
    awards: [
      "Fellow of the American College of Cardiology (2015)",
      "Distinguished Service Award, Medical Society of the District of Columbia (2018)",
    ],
    keyCareerMilestones: [
      "Thực hành tại St. Vincent’s Hospital ở New York",
      "Sáng lập Physicians Committee",
      "Sáng lập Barnard Medical Center tại Washington, DC vào năm 2016",
    ],
    notableWorks: [
      "Hơn 100 công bố khoa học",
      "20 đầu sách cho giới chuyên môn và độc giả phổ thông",
      "Editor in Chief của Nutrition Guide for Clinicians",
    ],
    books: ["Dr. Barnard's Books"],
    podcasts: [],
    talks: ["Host của bốn chương trình PBS về dinh dưỡng và sức khỏe"],
    majorActivities: [
      "Lãnh đạo các chương trình vận động cho y học dự phòng, dinh dưỡng tốt hơn và chuẩn mực đạo đức cao hơn trong nghiên cứu",
      "Đồng tác giả các nghị quyết hiện đã trở thành một phần của chính sách AMA",
    ],
    publicationList: ["More than 100 scientific publications"],
    authorThemes: [
      "dinh dưỡng dựa trên thực vật",
      "y học dự phòng",
      "đái tháo đường",
      "kiểm soát cân nặng",
      "chính sách sức khỏe",
    ],
    whyThisAuthorWritesThisTopic:
      "Neal Barnard phù hợp với các chủ đề về dinh dưỡng thực vật, bệnh mạn tính và y học dự phòng vì ông vừa trực tiếp nghiên cứu lâm sàng, vừa lãnh đạo PCRM trong các hoạt động học thuật và chính sách liên quan.",
    relatedArticleSlugs: [],
    profileSourceLinks: [
      "https://www.pcrm.org/about-us/staff/neal-barnard-md-facc",
    ],
    externalLinks: [],
    socialLinks: [],
    featured: true,
    sortOrder: 1,
    status: "draft",
    lastReviewedAt: "2026-04-09",
  },
  {
    id: "author-hana-kahleova",
    slug: "hana-kahleova",
    fullName: "Hana Kahleova, MD, PhD",
    displayName: "Hana Kahleova",
    avatar: "https://www.pcrm.org/sites/default/files/2026-01/Hana-Kahleova-512px.jpg",
    coverImage: "",
    headline: "Bác sĩ, nhà nghiên cứu lâm sàng về dinh dưỡng và chuyển hóa",
    shortBio:
      "Hana Kahleova là Director of Clinical Research tại PCRM. Công việc của bà tập trung vào ảnh hưởng của lựa chọn thực phẩm đối với kháng insulin, chuyển hóa và điều hòa cân nặng lành mạnh.",
    degrees: ["MD", "PhD"],
    specialty: "Nghiên cứu lâm sàng, dinh dưỡng, đái tháo đường, chuyển hóa",
    currentRole: "Director of Clinical Research",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Nghiên cứu lâm sàng về chế độ ăn thực vật, chuyển hóa, insulin, kiểm soát cân nặng",
    researchInterests: [
      "kháng insulin",
      "chức năng chuyển hóa",
      "fitness",
      "sức khỏe tinh thần",
      "thời điểm bữa ăn",
      "tần suất bữa ăn",
    ],
    education: [
      "Medical degree, Charles University in Prague",
      "Doctorate in nutrition and diabetes, Charles University in Prague",
      "Postdoctoral research fellow, Loma Linda University",
    ],
    certifications: [],
    awards: [],
    keyCareerMilestones: [
      "Phân tích dữ liệu của 50.000 người tham gia Adventist Health Study-2 tại Loma Linda University",
      "Xuất bản hơn một chục nghiên cứu về dinh dưỡng",
    ],
    notableWorks: [
      "Vegetarian Diet in the Treatment of Diabetes (2013)",
      "Chapter on plant-based diet treatment in Vegetarian and Plant-Based Diets in Health and Disease Prevention (2017)",
    ],
    books: ["Vegetarian Diet in the Treatment of Diabetes"],
    podcasts: [],
    talks: [],
    majorActivities: [
      "Chỉ đạo các nghiên cứu về tác động của lựa chọn thực phẩm lên insulin resistance và cân nặng",
      "Nghiên cứu về thermic effect of food trong can thiệp ăn uống 16 tuần",
    ],
    publicationList: ["More than a dozen nutrition studies"],
    authorThemes: [
      "đái tháo đường",
      "chuyển hóa",
      "giảm cân",
      "meal timing",
      "chế độ ăn dựa trên thực vật",
    ],
    whyThisAuthorWritesThisTopic:
      "Hana Kahleova phù hợp với các chủ đề về đái tháo đường, chuyển hóa và kiểm soát cân nặng vì nền tảng của bà là nghiên cứu lâm sàng chuyên sâu về insulin, meal timing và chế độ ăn thực vật.",
    relatedArticleSlugs: [],
    profileSourceLinks: ["https://www.pcrm.org/about-us/staff/hana-kahleova"],
    externalLinks: [],
    socialLinks: [],
    featured: true,
    sortOrder: 2,
    status: "draft",
    lastReviewedAt: "2026-04-09",
  },
  {
    id: "author-amy-lanou",
    slug: "amy-lanou",
    fullName: "Amy Lanou, PhD",
    displayName: "Amy Lanou",
    avatar: "https://www.pcrm.org/sites/default/files/styles/medium/public/amy-lanou-headshot.jpg?itok=WfnU0ErK",
    coverImage: "",
    headline: "Nhà khoa học dinh dưỡng, giáo sư sức khỏe và wellness",
    shortBio:
      "Amy Lanou là Senior Nutrition Scientist tại PCRM, đồng thời là professor of health and wellness tại UNC Asheville và editor in chief của PlantPure Magazine. Bà nghiên cứu mối liên hệ giữa chế độ ăn dựa trên thực vật và nguy cơ bệnh mạn tính.",
    degrees: ["PhD"],
    specialty: "Dinh dưỡng, sức khỏe xương, truyền thông sức khỏe, chính sách dinh dưỡng",
    currentRole: "Senior Nutrition Scientist",
    currentOrganization:
      "Physicians Committee for Responsible Medicine; University of North Carolina-Asheville",
    professionalFocus:
      "Dinh dưỡng dựa trên thực vật, giảm nguy cơ bệnh mạn tính, giáo dục dinh dưỡng",
    researchInterests: [
      "plant-based diets and chronic disease risk",
      "nutrition and bone health",
      "dairy and health",
    ],
    education: [
      "B.S. in Nutrition Science, University of California at Davis",
      "Ph.D. in Human Nutrition, Cornell University",
    ],
    certifications: [],
    awards: [],
    keyCareerMilestones: [
      "Former nutrition director at PCRM for five years",
      "Professor at UNC Asheville",
      "Từng giảng dạy tại Ithaca College và Cornell University",
    ],
    notableWorks: [
      "Building Bone Vitality",
      "Healthy Eating for Life for Children",
      "Editor in Chief, PlantPure Magazine",
    ],
    books: ["Building Bone Vitality", "Healthy Eating for Life for Children"],
    podcasts: [],
    talks: [],
    majorActivities: [
      "Gắn với các chiến dịch Healthy School Lunch, Safe Diets, Not Dairy",
      "Viết và nghiên cứu về dinh dưỡng thực vật và sức khỏe xương",
    ],
    publicationList: [
      "Papers on dairy products and health in American Journal of Clinical Nutrition and Pediatrics",
    ],
    authorThemes: [
      "dinh dưỡng thực vật",
      "sức khỏe xương",
      "dairy and health",
      "giáo dục dinh dưỡng",
    ],
    whyThisAuthorWritesThisTopic:
      "Amy Lanou phù hợp với các chủ đề về dinh dưỡng, sữa và sức khỏe xương vì công việc chuyên môn và công bố của bà tập trung trực tiếp vào các vấn đề này.",
    relatedArticleSlugs: [],
    profileSourceLinks: ["https://www.pcrm.org/about-us/staff/amy-lanou"],
    externalLinks: [],
    socialLinks: [],
    featured: true,
    sortOrder: 3,
    status: "draft",
    lastReviewedAt: "2026-04-09",
  },
  {
    id: "author-janine-mccarthy",
    slug: "janine-mccarthy",
    fullName: "Janine McCarthy, MPH",
    displayName: "Janine McCarthy",
    avatar: "https://www.pcrm.org/sites/default/files/2023-05/Janine%20McCarthy%2C%20MPH.jpg",
    coverImage: "",
    headline: "Chuyên gia chính sách nghiên cứu và khoa học nhân đạo",
    shortBio:
      "Janine McCarthy là Acting Director of Research Policy tại PCRM. Bà tập trung vào integrity trong nghiên cứu, chính sách thay thế thí nghiệm trên động vật và thúc đẩy các phương pháp nghiên cứu human-specific, nonanimal.",
    degrees: ["MPH"],
    specialty: "Research policy, research integrity, public health, ethical science",
    currentRole: "Acting Director of Research Policy",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Research integrity, ethical science, nonanimal methods, policy advocacy",
    researchInterests: [
      "research integrity",
      "ethical policy",
      "human-specific research",
      "new approach methodologies",
      "nonanimal testing",
    ],
    education: ["Master of Public Health"],
    certifications: [],
    awards: [],
    keyCareerMilestones: [
      "Launched the Human Advanced In Vitro Initiative (HUMAIN)",
      "Worked at the New York State Department of Health in the Center for Community Health and the Center for Environmental Health",
    ],
    notableWorks: [
      "Creating training opportunities in new approach methodologies for early-career researchers",
      "Considering the Risks and Costs of Solid Organ Xenotransplantation",
      "Summer school on innovative approaches in science",
      "Increasing the availability of quality human tissue for research",
    ],
    books: [],
    podcasts: [],
    talks: [],
    majorActivities: [
      "Làm việc với journals, reviewers, ethics committees, sponsors và researchers để thúc đẩy nghiên cứu minh bạch và có trách nhiệm",
      "Tham gia phát triển legislative and policy proposals nhằm thay thế nghiên cứu dùng động vật",
    ],
    publicationList: [
      "NAM Journal (2025)",
      "Advanced Biology (2025)",
      "ALTEX (2021, 2020)",
      "Animals (2020)",
    ],
    authorThemes: [
      "ethical science",
      "research policy",
      "animal-free methods",
      "scientific integrity",
    ],
    whyThisAuthorWritesThisTopic:
      "Janine McCarthy phù hợp với các chủ đề về khoa học nhân đạo, chính sách nghiên cứu và phương pháp thay thế động vật vì đây là trọng tâm công việc và công bố chuyên môn của bà tại PCRM.",
    relatedArticleSlugs: [],
    profileSourceLinks: ["https://www.pcrm.org/about-us/staff/janine-mccarthy"],
    externalLinks: [],
    socialLinks: [],
    featured: true,
    sortOrder: 4,
    status: "draft",
    lastReviewedAt: "2026-04-09",
  },
  {
    id: "author-roxanne-becker",
    slug: "roxanne-becker",
    fullName: "Roxanne Becker, MBChB, DipIBLM",
    displayName: "Roxanne Becker",
    avatar: "https://www.pcrm.org/sites/default/files/2025-06/roxie-becker-512.jpeg",
    coverImage: "",
    headline: "Biên tập viên y khoa và nhà giáo dục về lifestyle medicine",
    shortBio:
      "Roxanne Becker là Medical Editor and Educator tại PCRM. Bà tốt nghiệp y khoa tại University of Cape Town, có diploma in Lifestyle Medicine và chứng chỉ về plant-based nutrition.",
    degrees: ["MBChB", "DipIBLM"],
    specialty: "Y khoa, lifestyle medicine, giáo dục dinh dưỡng, biên tập y khoa",
    currentRole: "Medical Editor and Educator",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Giáo dục y khoa về dinh dưỡng thực vật và lifestyle medicine, biên tập nội dung y khoa",
    researchInterests: [
      "diabetes",
      "weight loss",
      "nutrition education for medical students",
      "plant-based nutrition",
    ],
    education: ["Medical degree, University of Cape Town (cum laude)"],
    certifications: [
      "Diploma in Lifestyle Medicine from the International Board of Lifestyle Medicine",
      "Certified in plant-based nutrition",
    ],
    awards: [],
    keyCareerMilestones: [
      "Worked in the public healthcare sector in South Africa for three years",
      "Medical elective at Barnard Medical Center during final year of medical training",
      "Returned later to help educate the next generation of medical students",
    ],
    notableWorks: [
      "Nutrition lectures for medical students through Lunch and Learn",
      "Weekly webinars in the National Diabetes Program with Anna Herby",
    ],
    books: [],
    podcasts: [],
    talks: ["Nutrition lectures to medical students"],
    majorActivities: [
      "Tham gia clinical research về diabetes và weight loss",
      "Cohost weekly webinars for the National Diabetes Program",
    ],
    publicationList: [],
    authorThemes: [
      "lifestyle medicine",
      "giáo dục y khoa",
      "đái tháo đường",
      "giảm cân",
      "dinh dưỡng thực vật",
    ],
    whyThisAuthorWritesThisTopic:
      "Roxanne Becker phù hợp với các chủ đề về lifestyle medicine, giáo dục dinh dưỡng và đái tháo đường vì công việc của bà kết hợp giữa biên tập y khoa, giáo dục sinh viên y và hoạt động nghiên cứu lâm sàng.",
    relatedArticleSlugs: [],
    profileSourceLinks: ["https://www.pcrm.org/about-us/staff/roxanne-becker"],
    externalLinks: [],
    socialLinks: [],
    featured: true,
    sortOrder: 5,
    status: "draft",
    lastReviewedAt: "2026-04-09",
  },
  {
    id: "author-anna-herby",
    slug: "anna-herby",
    fullName: "Anna Herby, DHSc, RD, CDCES",
    displayName: "Anna Herby",
    avatar: "https://www.pcrm.org/sites/default/files/2023-09/Anna%20Herby%2C%20DHSc%2C%20RD%2C%20CDCES%202.jpg",
    coverImage: "",
    headline: "Chuyên gia giáo dục dinh dưỡng và phòng ngừa bệnh mạn tính",
    shortBio:
      "Anna Herby là Nutrition Education Specialist tại PCRM. Cô tập trung vào giáo dục dinh dưỡng thực vật, truyền thông sức khỏe cộng đồng và hướng dẫn thực hành cho người bệnh mạn tính.",
    degrees: ["DHSc", "RD", "CDCES"],
    specialty: "Giáo dục dinh dưỡng, đái tháo đường, dinh dưỡng thực vật ứng dụng",
    currentRole: "Nutrition Education Specialist",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Biên soạn và truyền thông nội dung dinh dưỡng dựa trên bằng chứng, hỗ trợ thay đổi hành vi ăn uống lành mạnh",
    researchInterests: [
      "giáo dục dinh dưỡng cộng đồng",
      "plant-based nutrition",
      "đái tháo đường và phòng ngừa biến chứng",
      "truyền thông sức khỏe",
    ],
    education: ["Doctor of Health Science (DHSc)"],
    certifications: [
      "Registered Dietitian (RD)",
      "Certified Diabetes Care and Education Specialist (CDCES)",
    ],
    awards: [],
    keyCareerMilestones: [
      "Tham gia đội ngũ giáo dục dinh dưỡng tại PCRM",
      "Đồng dẫn các buổi webinar trong National Diabetes Program",
    ],
    notableWorks: [
      "Bacon Causes Cancer and Half of Adults Have No Idea | Anna Herby, DHSc, RD",
      "Nội dung giáo dục dinh dưỡng cho các chương trình cộng đồng của PCRM",
    ],
    books: [],
    podcasts: ["Bacon Causes Cancer and Half of Adults Have No Idea | Anna Herby, DHSc, RD"],
    talks: ["National Diabetes Program webinars"],
    majorActivities: [
      "Xây dựng nội dung dinh dưỡng thực hành cho công chúng",
      "Tham gia truyền thông khoa học về nguy cơ sức khỏe liên quan đến thực phẩm chế biến",
    ],
    publicationList: [],
    authorThemes: [
      "dinh dưỡng thực vật",
      "giáo dục sức khỏe",
      "đái tháo đường",
      "phòng ngừa bệnh mạn tính",
    ],
    whyThisAuthorWritesThisTopic:
      "Anna Herby phù hợp với các chủ đề dinh dưỡng thực vật và giáo dục sức khỏe vì vai trò chuyên môn của cô tập trung vào chuyển hóa bằng chứng khoa học thành hướng dẫn thực hành dễ áp dụng.",
    relatedArticleSlugs: ["american-heart-association-recommends-plant-based-protein-over-meat"],
    profileSourceLinks: [
      "https://www.pcrm.org/about-us/staff/anna-herby",
      "https://www.pcrm.org/news/exam-room-podcast/bacon-causes-cancer-and-half-adults-have-no-idea-anna-herby-dhsc-rd",
    ],
    externalLinks: [
      {
        label: "PCRM Staff Profile",
        url: "https://www.pcrm.org/about-us/staff/anna-herby",
      },
    ],
    socialLinks: [],
    featured: false,
    sortOrder: 6,
    status: "draft",
    lastReviewedAt: "2026-04-11",
  },
  {
    id: "author-xavier-toledo",
    slug: "xavier-toledo",
    fullName: "Xavier Toledo, MS, RD, LDN",
    displayName: "Xavier Toledo",
    avatar: "https://www.pcrm.org/sites/default/files/2025-07/Xavier%20Toledo%20Expert%20Page%20Headshot.jpg",
    coverImage: "",
    headline: "Chuyên gia dinh dưỡng thực hành và giáo dục sức khỏe",
    shortBio:
      "Xavier Toledo là chuyên gia dinh dưỡng của PCRM, tham gia xây dựng nội dung tư vấn ăn uống lành mạnh dựa trên thực vật và các chương trình giáo dục sức khỏe cộng đồng.",
    degrees: ["MS", "RD", "LDN"],
    specialty: "Dinh dưỡng lâm sàng thực hành, giáo dục sức khỏe, plant-based nutrition",
    currentRole: "Nutrition Educator",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Hướng dẫn lựa chọn thực phẩm thực vật, cải thiện chất lượng bữa ăn và hỗ trợ thay đổi hành vi ăn uống",
    researchInterests: [
      "practical nutrition education",
      "dinh dưỡng dựa trên thực vật",
      "health and nutrition communication",
      "chương trình dinh dưỡng cộng đồng",
    ],
    education: ["Master of Science (MS)"],
    certifications: ["Registered Dietitian (RD)", "Licensed Dietitian/Nutritionist (LDN)"],
    awards: [],
    keyCareerMilestones: [
      "Tham gia đội ngũ chuyên gia dinh dưỡng của PCRM",
      "Đóng góp nội dung cho các chuyên mục tin sức khỏe và dinh dưỡng",
    ],
    notableWorks: [
      "Bài viết/chuyên mục liên quan dinh dưỡng thực hành trong hệ nội dung PCRM",
    ],
    books: [],
    podcasts: [],
    talks: [],
    majorActivities: [
      "Hỗ trợ truyền thông kiến thức dinh dưỡng theo hướng dễ áp dụng",
      "Đồng hành các hoạt động giáo dục dinh dưỡng cho công chúng",
    ],
    publicationList: [],
    authorThemes: [
      "health and nutrition education",
      "thực hành dinh dưỡng hằng ngày",
      "dinh dưỡng thực vật",
    ],
    whyThisAuthorWritesThisTopic:
      "Xavier Toledo phù hợp với các chủ đề dinh dưỡng thực hành vì chuyên môn của anh tập trung vào chuyển tải khuyến nghị dinh dưỡng thành hành động cụ thể trong đời sống hằng ngày.",
    relatedArticleSlugs: ["plant-based-diets-reduce-risk-cancer"],
    profileSourceLinks: [
      "https://www.pcrm.org/about-us/staff/xavier-toledo",
      "https://www.pcrm.org/news/blog",
    ],
    externalLinks: [
      {
        label: "PCRM Staff Profile",
        url: "https://www.pcrm.org/about-us/staff/xavier-toledo",
      },
    ],
    socialLinks: [],
    featured: false,
    sortOrder: 7,
    status: "draft",
    lastReviewedAt: "2026-04-11",
  },
  {
    id: "author-john-pippin",
    slug: "john-pippin",
    fullName: "John Pippin, MD, FACC",
    displayName: "John Pippin",
    avatar: "https://www.pcrm.org/sites/default/files/2023-05/John%20Pippin%2C%20MD%2C%20FACC_.jpg",
    coverImage: "",
    headline: "Bác sĩ tim mạch, lãnh đạo học thuật về khoa học phù hợp với con người",
    shortBio:
      "John Pippin là bác sĩ tim mạch và phụ trách học thuật tại PCRM. Ông tập trung vào khoa học có đạo đức, giảm phụ thuộc vào mô hình động vật và thúc đẩy các phương pháp nghiên cứu human-relevant.",
    degrees: ["MD", "FACC"],
    specialty: "Tim mạch, ethical science, chính sách nghiên cứu, human-based research",
    currentRole: "Director of Academic Affairs",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Thúc đẩy phương pháp nghiên cứu phù hợp với con người, nâng chất lượng bằng chứng trong y sinh học và giáo dục học thuật",
    researchInterests: [
      "human-relevant biomedical research",
      "Alzheimer's research without animals",
      "research ethics",
      "translation from preclinical to clinical evidence",
    ],
    education: ["Doctor of Medicine (MD)"],
    certifications: ["Fellow of the American College of Cardiology (FACC)"],
    awards: [],
    keyCareerMilestones: [
      "Đảm nhiệm vai trò Director of Academic Affairs tại PCRM",
      "Đồng tác giả chương sách về hạn chế của nghiên cứu Alzheimer dựa trên động vật và nhu cầu chuyển sang phương pháp phù hợp với con người",
    ],
    notableWorks: [
      "Animal Research for Alzheimer Disease: Failures of Science and Ethics (co-author)",
      "Nội dung học thuật về ethical science trong hệ tài liệu PCRM",
    ],
    books: ["Animal Research for Alzheimer Disease: Failures of Science and Ethics (book chapter)"],
    podcasts: [],
    talks: [],
    majorActivities: [
      "Vận động sử dụng phương pháp nghiên cứu human-based trong khoa học thần kinh và y sinh",
      "Đóng góp nội dung học thuật cho các chủ đề innovative science và good science digest",
    ],
    publicationList: [],
    authorThemes: [
      "ethical science",
      "human-based research",
      "innovative science",
      "Alzheimer's research",
    ],
    whyThisAuthorWritesThisTopic:
      "John Pippin phù hợp với các chủ đề khoa học có đạo đức và nghiên cứu phù hợp với con người vì công việc học thuật của ông tập trung trực tiếp vào việc cải thiện tính chuyển giao và chất lượng bằng chứng nghiên cứu.",
    relatedArticleSlugs: [
      "patient-derived-brain-organoids-provide-new-insights-autism-spectrum",
      "progress-expanding-organ-donor-pool",
    ],
    profileSourceLinks: [
      "https://www.pcrm.org/about-us/staff/john-pippin",
      "https://www.pcrm.org/ethical-science/animals-in-medical-research/alzheimers-disease-research-without-animals",
    ],
    externalLinks: [
      {
        label: "PCRM Staff Profile",
        url: "https://www.pcrm.org/about-us/staff/john-pippin",
      },
    ],
    socialLinks: [],
    featured: false,
    sortOrder: 8,
    status: "draft",
    lastReviewedAt: "2026-04-11",
  },
  {
    id: "author-catharine-krebs",
    slug: "catharine-e-krebs",
    fullName: "Catharine E. Krebs, PhD",
    displayName: "Catharine E. Krebs",
    avatar: "https://www.pcrm.org/sites/default/files/2023-05/Catharine%20E.%20Krebs%2C%20PhD_0.jpg",
    coverImage: "",
    headline: "Nhà khoa học về nghiên cứu y sinh phù hợp với con người",
    shortBio:
      "Catharine E. Krebs là thành viên đội ngũ khoa học của PCRM, tập trung vào các hướng nghiên cứu human-based, khoa học có đạo đức và cải thiện khả năng ứng dụng của bằng chứng y sinh.",
    degrees: ["PhD"],
    specialty: "Khoa học sự sống, ethical science, human-based research",
    currentRole: "Scientific Staff",
    currentOrganization: "Physicians Committee for Responsible Medicine",
    professionalFocus:
      "Phân tích và truyền thông các phương pháp nghiên cứu phù hợp với con người trong các chủ đề y sinh và sức khỏe cộng đồng",
    researchInterests: [
      "human-relevant methods",
      "innovative science",
      "research quality and translation",
      "ethical scientific practice",
    ],
    education: ["Doctor of Philosophy (PhD)"],
    certifications: [],
    awards: [],
    keyCareerMilestones: [
      "Tham gia đội ngũ chuyên môn về khoa học đổi mới tại PCRM",
      "Đóng góp nội dung chuyên đề cho các chủ đề good science digest và ethical science",
    ],
    notableWorks: [
      "Nội dung khoa học về hướng nghiên cứu human-based trong hệ bài viết PCRM",
    ],
    books: [],
    podcasts: [],
    talks: [],
    majorActivities: [
      "Tổng hợp bằng chứng phục vụ truyền thông khoa học có trách nhiệm",
      "Hỗ trợ phát triển nội dung về phương pháp nghiên cứu thay thế mô hình động vật",
    ],
    publicationList: [],
    authorThemes: [
      "good science digest",
      "human-based research",
      "ethical science",
      "innovative science",
    ],
    whyThisAuthorWritesThisTopic:
      "Catharine E. Krebs phù hợp với các chủ đề khoa học đổi mới và human-based research vì chuyên môn của bà tập trung vào những phương pháp nghiên cứu có tính ứng dụng cao và phù hợp với dữ liệu người.",
    relatedArticleSlugs: ["human-health-human-science-how-physicians-committee-improving-public"],
    profileSourceLinks: [
      "https://www.pcrm.org/about-us/staff/catharine-krebs",
      "https://www.pcrm.org/news/good-science-digest",
    ],
    externalLinks: [
      {
        label: "PCRM Staff Profile",
        url: "https://www.pcrm.org/about-us/staff/catharine-krebs",
      },
    ],
    socialLinks: [],
    featured: false,
    sortOrder: 9,
    status: "draft",
    lastReviewedAt: "2026-04-11",
  },
];
