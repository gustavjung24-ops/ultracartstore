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
];
