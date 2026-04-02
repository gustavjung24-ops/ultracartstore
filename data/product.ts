// ============================================================
// DỮ LIỆU SẢN PHẨM — Chỉnh sửa file này để cập nhật nội dung
// ============================================================

export interface RelatedResource {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface Product {
  slug: string;
  category: string;        // khớp với href /shop/[category]
  categoryLabel: string;   // tên danh mục hiển thị
  title: string;
  price: string;
  unit?: string;           // ví dụ: "/ tờ rơi"
  sku: string;
  shortDescription: string;
  longDescription: string;
  contactNote: string;
  whatsappUrl: string;
  zaloUrl: string;
  phoneNumber: string;
  images: string[];
  relatedResources: RelatedResource[];
}

// ──────────────────────────────────────────────
// DANH SÁCH SẢN PHẨM
// ──────────────────────────────────────────────
export const products: Product[] = [

  // ── CỘNG ĐỒNG KHỎE MẠNH ──────────────────
  {
    slug: "xay-dung-cong-dong-khoe-manh-to-roi",
    category: "healthy-communities",
    categoryLabel: "Cộng đồng Khỏe mạnh",
    title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
    price: "$0.15",
    unit: "/ tờ",
    sku: "BHCOM-100",
    shortDescription:
      "Tờ rơi 2 trang giới thiệu chương trình BHC — dành cho Trưởng nhóm phát tại cộng đồng. Trình bày sứ mệnh, lợi ích tham gia và cách đăng ký; giúp nhóm của bạn ngày càng lớn mạnh.",
    longDescription:
      "Chương trình Xây dựng Cộng đồng Khỏe mạnh (BHC) trao quyền cho các nhà lãnh đạo địa phương đưa giáo dục dinh dưỡng có cơ sở khoa học trực tiếp đến với người dân. Tờ rơi được thiết kế để in số lượng lớn và phát tại sự kiện, phòng khám, trường học, nhà thờ và các địa điểm sinh hoạt cộng đồng.\n\nMỗi tờ rơi trình bày tổng quan về sáng kiến BHC, những lợi ích nổi bật khi trở thành Trưởng nhóm, và hướng dẫn từng bước để bắt đầu — viết súc tích, dễ đọc, phù hợp mọi đối tượng.\n\nPhù hợp cho: giáo viên sức khỏe, tình nguyện viên cộng đồng, lãnh đạo tôn giáo và bất kỳ ai muốn lan tỏa lối sống lành mạnh dựa trên thực vật.",
    contactNote: "Liên hệ để đặt hàng số lượng lớn và nhận tư vấn miễn phí",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/bhc-brochure-main.svg",
      "/images/bhc-brochure-front.svg",
      "/images/bhc-brochure-back.svg",
    ],
    relatedResources: [
      {
        id: "bhc-pod-guide",
        title: "Sổ tay Hướng dẫn Trưởng nhóm BHC",
        description: "Tài liệu toàn diện giúp Trưởng nhóm lập kế hoạch và dẫn dắt các buổi sinh hoạt sức khỏe cộng đồng.",
        image: "/images/bhc-guide-main.svg",
        href: "/product/so-tay-truong-nhom-bhc",
      },
      {
        id: "bhc-recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Tổng hợp công thức thuần thực vật và mẹo dinh dưỡng thực tiễn cho các chương trình sức khỏe cộng đồng.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "bhc-activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Phiếu bài tập và hoạt động nhóm sẵn dùng, lý tưởng để hướng dẫn sống lành mạnh trong hội thảo.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
    ],
  },

  {
    slug: "so-tay-truong-nhom-bhc",
    category: "healthy-communities",
    categoryLabel: "Cộng đồng Khỏe mạnh",
    title: "Sổ tay Hướng dẫn Trưởng nhóm BHC",
    price: "$2.50",
    unit: "/ quyển",
    sku: "BHCOM-200",
    shortDescription:
      "Sổ tay hướng dẫn chi tiết dành cho Trưởng nhóm chương trình BHC — bao gồm kế hoạch buổi họp, tài liệu phát tay và chiến lược thu hút thành viên mới.",
    longDescription:
      "Sổ tay này là tài liệu không thể thiếu với bất kỳ Trưởng nhóm BHC nào. Nội dung hướng dẫn từng bước: từ cách tổ chức buổi họp đầu tiên, duy trì sự gắn kết của thành viên, đến cách đánh giá hiệu quả chương trình.\n\nBao gồm: kế hoạch 12 tuần, danh sách câu hỏi thảo luận, mẫu email mời tham gia và các mẹo thực tiễn từ Trưởng nhóm có kinh nghiệm.\n\nThích hợp cùng với tờ rơi BHC để tạo bộ tài liệu hoàn chỉnh cho nhóm của bạn.",
    contactNote: "Liên hệ để đặt hàng theo bộ và được giá đặc biệt",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/bhc-guide-main.svg",
      "/images/bhc-guide-inside.svg",
    ],
    relatedResources: [
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Tờ rơi 2 trang để phát tại các buổi sinh hoạt BHC và sự kiện cộng đồng.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
      {
        id: "bhc-activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Phiếu bài tập và trò chơi nhóm để tổ chức buổi họp thêm sinh động.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
      {
        id: "bhc-recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Công thức nấu ăn thuần thực vật đơn giản, ngon lành và bổ dưỡng.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
    ],
  },

  {
    slug: "sach-cong-thuc-an-lanh-manh",
    category: "healthy-communities",
    categoryLabel: "Cộng đồng Khỏe mạnh",
    title: "Sách công thức: Ăn lành mạnh mỗi ngày",
    price: "$3.00",
    unit: "/ quyển",
    sku: "BHCOM-300",
    shortDescription:
      "Tập hợp các công thức nấu ăn thuần thực vật dễ làm, ngon miệng và giàu dinh dưỡng — lý tưởng để chia sẻ tại các buổi sinh hoạt nhóm sức khỏe.",
    longDescription:
      "Cuốn sách công thức này tập hợp hơn 30 công thức món ăn từ thực vật được lựa chọn kỹ lưỡng — từ bữa sáng đến bữa tối, từ đơn giản đến nâng cao. Mỗi công thức đều kèm thông tin dinh dưỡng và lời khuyên điều chỉnh phù hợp khẩu vị.\n\nThiết kế dạng vừa cầm, dễ photocopy, thích hợp phát tại hội thảo, lớp học hoặc sự kiện cộng đồng.\n\nĐây là món quà ý nghĩa cho bất kỳ ai muốn bắt đầu hành trình ăn uống lành mạnh.",
    contactNote: "Đặt hàng sớm để nhận ưu đãi giao hàng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/recipe-book-main.svg",
      "/images/recipe-book-inside.svg",
    ],
    relatedResources: [
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Giới thiệu chương trình BHC để phát kèm với sách công thức.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
      {
        id: "bhc-pod-guide",
        title: "Sổ tay Hướng dẫn Trưởng nhóm BHC",
        description: "Hướng dẫn tổ chức buổi họp và chia sẻ công thức ăn uống lành mạnh.",
        image: "/images/bhc-guide-main.svg",
        href: "/product/so-tay-truong-nhom-bhc",
      },
      {
        id: "bhc-activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Kết hợp với sách công thức để tạo buổi nấu ăn nhóm thú vị.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
    ],
  },

  {
    slug: "bo-hoat-dong-cong-dong",
    category: "healthy-communities",
    categoryLabel: "Cộng đồng Khỏe mạnh",
    title: "Bộ hoạt động cộng đồng",
    price: "$5.00",
    unit: "/ bộ",
    sku: "BHCOM-400",
    shortDescription:
      "Bộ phiếu bài tập và trò chơi nhóm theo chủ đề sức khỏe thực vật — thiết kế sẵn để dùng ngay trong hội thảo, phòng học hoặc buổi sinh hoạt nhóm.",
    longDescription:
      "Bộ công cụ này gồm hơn 20 phiếu bài tập tương tác và hướng dẫn hoạt động nhóm xoay quanh chủ đề dinh dưỡng thực vật, lối sống khỏe mạnh và phòng ngừa bệnh mãn tính.\n\nMỗi hoạt động được thiết kế ngắn gọn (15–30 phút), dễ hướng dẫn ngay cả khi không có chuyên môn y tế. Phù hợp cho mọi lứa tuổi từ thanh thiếu niên đến người cao tuổi.\n\nBộ tài liệu lý tưởng để kết hợp với Sổ tay Trưởng nhóm và Sách công thức khi tổ chức chuỗi buổi sinh hoạt.",
    contactNote: "Liên hệ để nhận báo giá gói bộ trọn bộ",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/activity-kit-main.svg",
      "/images/activity-kit-inside.svg",
    ],
    relatedResources: [
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Tờ rơi để phát kèm trong buổi hoạt động nhóm.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
      {
        id: "bhc-pod-guide",
        title: "Sổ tay Hướng dẫn Trưởng nhóm BHC",
        description: "Hỗ trợ tổ chức buổi hoạt động nhóm chuyên nghiệp và hiệu quả.",
        image: "/images/bhc-guide-main.svg",
        href: "/product/so-tay-truong-nhom-bhc",
      },
      {
        id: "bhc-recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Kết hợp hoạt động nấu ăn cùng bộ công cụ này.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
    ],
  },

  // ── SÁCH ─────────────────────────────────
  {
    slug: "bep-khong-pho-mai",
    category: "books",
    categoryLabel: "Sách",
    title: "Bếp không phô mai (The Cheese Trap)",
    price: "$18.00",
    unit: "/ quyển",
    sku: "HEAL-107",
    shortDescription:
      "Bác sĩ Neal Barnard chỉ ra tại sao phô mai gây nghiện như ma túy và cách dứt bỏ để giảm cân, hạ cholesterol và cải thiện sức khỏe tổng thể. Kèm 28 ngày thực đơn mẫu.",
    longDescription:
      "Cuốn sách của Tiến sĩ Neal Barnard tiết lộ sự thật khoa học về phô mai: tại sao nó gây nghiện, ảnh hưởng như thế nào đến cân nặng, tim mạch và nội tiết tố của bạn.\n\nKèm theo là chương trình 28 ngày cai phô mai từng bước, thực đơn mẫu và hơn 50 công thức thuần thực vật thay thế — ngon không kém nhưng lành mạnh hơn nhiều.\n\nĐây là một trong những cuốn sách bán chạy nhất của PCRM, được hàng triệu độc giả trên thế giới tin dùng.",
    contactNote: "Liên hệ để đặt số lượng lớn hoặc nhận sách tặng tổ chức",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/cheese-trap-main.svg",
      "/images/cheese-trap-back.svg",
    ],
    relatedResources: [
      {
        id: "power-foods",
        title: "Thực phẩm siêu năng lượng (Power Foods for the Brain)",
        description: "Khám phá những thực phẩm bảo vệ não bộ và phòng ngừa Alzheimer.",
        image: "/images/power-foods-main.svg",
        href: "/product/thuc-pham-sieu-nang-luong",
      },
      {
        id: "cancer-survivor",
        title: "Hướng dẫn dinh dưỡng cho người vượt qua ung thư",
        description: "Phác đồ ăn uống thực vật hỗ trợ hồi phục sau ung thư.",
        image: "/images/cancer-guide-main.svg",
        href: "/product/dinh-duong-cho-nguoi-ung-thu",
      },
      {
        id: "bhc-recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Công thức thuần thực vật dễ làm để bắt đầu hành trình ăn uống mới.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
    ],
  },

  {
    slug: "thuc-pham-sieu-nang-luong",
    category: "books",
    categoryLabel: "Sách",
    title: "Thực phẩm siêu năng lượng (Power Foods for the Brain)",
    price: "$16.00",
    unit: "/ quyển",
    sku: "HEAL-108",
    shortDescription:
      "Tiến sĩ Neal Barnard hướng dẫn ăn uống đúng cách để bảo vệ trí nhớ, tăng cường não bộ và giảm nguy cơ mắc Alzheimer — dựa trên nghiên cứu khoa học thực chứng.",
    longDescription:
      "Cuốn sách cung cấp bằng chứng khoa học mạnh mẽ rằng chế độ ăn có thể ảnh hưởng trực tiếp đến sức khỏe não bộ. Từ đó đưa ra kế hoạch 3 bước đơn giản để giảm nguy cơ sa sút trí tuệ.\n\nBao gồm danh sách các 'thực phẩm siêu năng lượng' cho não, thực phẩm nên tránh, và hơn 75 công thức nấu ăn giúp nuôi dưỡng trí não mỗi ngày.",
    contactNote: "Liên hệ để được tư vấn và đặt hàng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/power-foods-main.svg",
    ],
    relatedResources: [
      {
        id: "cheese-trap",
        title: "Bếp không phô mai (The Cheese Trap)",
        description: "Tìm hiểu tại sao phô mai gây hại và cách ăn lành mạnh hơn.",
        image: "/images/cheese-trap-main.svg",
        href: "/product/bep-khong-pho-mai",
      },
      {
        id: "bhc-recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Công thức thực tế để áp dụng ngay những gì đọc được.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Chia sẻ kiến thức sức khỏe não bộ với cộng đồng xung quanh.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
    ],
  },

  // ── TÀI LIỆU IN ẤN ───────────────────────
  {
    slug: "ap-phich-dinh-duong-thuc-vat",
    category: "literature",
    categoryLabel: "Tài liệu in ấn",
    title: "Áp phích: Kim tự tháp dinh dưỡng thực vật",
    price: "$1.50",
    unit: "/ tờ",
    sku: "LIT-101",
    shortDescription:
      "Áp phích màu A2 trình bày kim tự tháp dinh dưỡng thực vật — công cụ trực quan tuyệt vời cho phòng khám, trường học và trung tâm cộng đồng.",
    longDescription:
      "Áp phích khổ A2 (420×594mm) in màu chất lượng cao, trình bày rõ ràng các nhóm thực phẩm thực vật theo tỷ lệ khoa học. Đây là công cụ giáo dục trực quan hiệu quả, dễ hiểu ngay cả với người không có nền tảng y khoa.\n\nThích hợp treo tại: phòng chờ bác sĩ, phòng học dinh dưỡng, trung tâm cộng đồng, nhà bếp gia đình.\n\nIn trên giấy couche 150gsm, màu sắc bền, không bong tróc theo thời gian.",
    contactNote: "Đặt từ 10 tờ để được giảm giá đặc biệt",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/poster-nutrition-main.svg",
    ],
    relatedResources: [
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Kết hợp áp phích với tờ rơi để tạo góc thông tin sức khỏe hoàn chỉnh.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
      {
        id: "bhc-recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Hướng dẫn nấu ăn theo đúng kim tự tháp dinh dưỡng.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "bhc-activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Dùng áp phích làm tài liệu nền cho các buổi hoạt động nhóm.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
    ],
  },
];

// ──────────────────────────────────────────────
// Hàm tiện ích
// ──────────────────────────────────────────────
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export const categories = [
  { slug: "healthy-communities", label: "Cộng đồng Khỏe mạnh", description: "Tài liệu cho chương trình BHC và hoạt động cộng đồng" },
  { slug: "books", label: "Sách", description: "Sách nghiên cứu và hướng dẫn dinh dưỡng từ bác sĩ PCRM" },
  { slug: "literature", label: "Tài liệu in ấn", description: "Áp phích, tờ rơi và phiếu thông tin" },
  { slug: "health-topics", label: "Theo chủ đề sức khỏe", description: "Tài liệu phân loại theo bệnh lý và chủ đề sức khỏe" },
  { slug: "posters", label: "Áp phích", description: "Áp phích màu chất lượng cao để treo tại cơ sở y tế" },
  { slug: "clinicians", label: "Dành cho bác sĩ", description: "Tài liệu chuyên sâu dành cho nhân viên y tế" },
  { slug: "multimedia", label: "Bộ đa phương tiện", description: "Bộ tài liệu kết hợp nhiều định dạng" },
  { slug: "apparel", label: "Quần áo", description: "Áo thun và phụ kiện mang thông điệp PCRM" },
  { slug: "new", label: "Mới nhất", description: "Sản phẩm mới nhất vừa ra mắt" },
  { slug: "product-spotlight", label: "Sản phẩm nổi bật", description: "Những sản phẩm được ưa chuộng nhất" },
];

// ──────────────────────────────────────────────
// ĐIỀU HƯỚNG
// ──────────────────────────────────────────────
export const mainMenu = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/shop" },
  { label: "Tải miễn phí", href: "/free-downloads" },
];

export const helpMenu = [
  { label: "Chính sách bảo mật", href: "/privacy-policy" },
  { label: "Thời gian xử lý đơn", href: "/order-turnaround-time" },
  { label: "Biểu mẫu liên hệ", href: "/contact" },
];

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────
export const footerInfo = {
  brandName: "Physicians Committee Shop",
  address: "5100 Wisconsin Avenue, NW, Suite 400",
  city: "Washington, DC 20016",
  phone: "ĐT: 202-527-7306",
  email: "fulfillment@PCRM.org",
  copyright: `© 2014 – ${new Date().getFullYear()} Physicians Committee for Responsible Medicine. Đã đăng ký bản quyền.`,
};

