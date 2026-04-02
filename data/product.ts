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

  {
    slug: "dinh-duong-cho-nguoi-ung-thu",
    category: "health-topics",
    categoryLabel: "Theo chủ đề sức khỏe",
    title: "Hướng dẫn dinh dưỡng cho người vượt qua ung thư",
    price: "$4.50",
    unit: "/ quyển",
    sku: "HT-201",
    shortDescription:
      "Cẩm nang thực hành dành cho người đang điều trị hoặc hồi phục sau ung thư, tập trung vào thực đơn thực vật dễ áp dụng, an toàn và giàu dưỡng chất.",
    longDescription:
      "Tài liệu này tổng hợp các khuyến nghị dinh dưỡng thực vật dành cho người đang điều trị hoặc hồi phục sau ung thư, với mục tiêu hỗ trợ thể trạng, kiểm soát tác dụng phụ và cải thiện chất lượng sống.\n\nNội dung bao gồm nguyên tắc xây dựng bữa ăn, gợi ý thực phẩm phù hợp trong từng giai đoạn điều trị, mẹo tăng năng lượng khi mệt mỏi và các thực đơn mẫu dễ thực hiện tại nhà.\n\nPhù hợp cho bệnh nhân, người chăm sóc và các nhóm hỗ trợ cộng đồng cần một tài liệu ngắn gọn nhưng có tính ứng dụng cao.",
    contactNote: "Có thể đặt theo bộ cùng tài liệu giáo dục sức khỏe khác",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/cancer-guide-main.svg",
    ],
    relatedResources: [
      {
        id: "brain-health",
        title: "Thực phẩm siêu năng lượng cho não bộ",
        description: "Những nguyên tắc dinh dưỡng giúp bảo vệ trí nhớ và sức khỏe não bộ lâu dài.",
        image: "/images/power-foods-main.svg",
        href: "/product/thuc-pham-sieu-nang-luong",
      },
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Hướng dẫn xây dựng thực đơn tốt cho tim và giảm nguy cơ bệnh mạn tính.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
      {
        id: "diabetes-guide",
        title: "Tài liệu kiểm soát tiểu đường bằng thực vật",
        description: "Mẹo thực hành hàng ngày giúp ổn định đường huyết và xây dựng thói quen ăn uống bền vững.",
        image: "/images/health-diabetes-main.svg",
        href: "/product/tai-lieu-kiem-soat-tieu-duong",
      },
    ],
  },

  {
    slug: "tai-lieu-kiem-soat-tieu-duong",
    category: "health-topics",
    categoryLabel: "Theo chủ đề sức khỏe",
    title: "Tài liệu kiểm soát tiểu đường bằng thực vật",
    price: "$2.95",
    unit: "/ quyển",
    sku: "HT-202",
    shortDescription:
      "Tài liệu dễ hiểu về chế độ ăn thực vật dành cho người tiểu đường hoặc tiền tiểu đường, nhấn mạnh vào kiểm soát đường huyết và giảm phụ thuộc thuốc theo chỉ định bác sĩ.",
    longDescription:
      "Đây là cẩm nang giới thiệu các nguyên tắc ăn uống thực vật giúp cải thiện độ nhạy insulin, kiểm soát đường huyết sau ăn và hỗ trợ quản lý cân nặng.\n\nTài liệu trình bày rõ nhóm thực phẩm nên ưu tiên, cách đọc khẩu phần, các ví dụ bữa ăn thực tế và câu hỏi thường gặp khi mới chuyển sang lối sống lành mạnh hơn.\n\nPhù hợp để phát tại phòng khám, chương trình cộng đồng hoặc sử dụng trong lớp học giáo dục sức khỏe.",
    contactNote: "Phù hợp in phát tại phòng khám và lớp học sức khỏe cộng đồng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/health-diabetes-main.svg",
    ],
    relatedResources: [
      {
        id: "oncology-guide",
        title: "Hướng dẫn dinh dưỡng cho người vượt qua ung thư",
        description: "Bổ sung thêm tài liệu thực đơn nhẹ nhàng cho người cần phục hồi thể trạng.",
        image: "/images/cancer-guide-main.svg",
        href: "/product/dinh-duong-cho-nguoi-ung-thu",
      },
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Một tài liệu song hành giúp giảm nguy cơ tim mạch ở người tiểu đường.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
      {
        id: "recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Công thức thực vật đơn giản để áp dụng ngay cho bữa ăn hàng ngày.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
    ],
  },

  {
    slug: "cam-nang-suc-khoe-tim-mach",
    category: "health-topics",
    categoryLabel: "Theo chủ đề sức khỏe",
    title: "Cẩm nang sức khỏe tim mạch từ thực vật",
    price: "$3.25",
    unit: "/ quyển",
    sku: "HT-203",
    shortDescription:
      "Tài liệu thực hành giúp giảm cholesterol, huyết áp và nguy cơ tim mạch nhờ chế độ ăn dựa trên thực vật, trình bày ngắn gọn cho cộng đồng và bệnh nhân mới bắt đầu.",
    longDescription:
      "Cẩm nang này giải thích mối liên hệ giữa thực phẩm, cholesterol máu, huyết áp và bệnh tim theo cách dễ hiểu, đồng thời hướng dẫn xây dựng thực đơn tốt cho tim từ nguyên liệu quen thuộc.\n\nBên cạnh phần kiến thức nền tảng, tài liệu còn có danh sách thay thế thực phẩm, gợi ý mua sắm, và một kế hoạch 7 ngày để người đọc bắt đầu thay đổi từng bước.\n\nRất phù hợp cho các hội thảo giáo dục sức khỏe, phòng khám tim mạch và chiến dịch truyền thông cộng đồng.",
    contactNote: "Có sẵn gói in số lượng lớn cho chiến dịch truyền thông sức khỏe tim mạch",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/heart-health-main.svg",
    ],
    relatedResources: [
      {
        id: "diabetes-guide",
        title: "Tài liệu kiểm soát tiểu đường bằng thực vật",
        description: "Kết hợp cùng tài liệu tim mạch cho các chương trình phòng ngừa bệnh mạn tính.",
        image: "/images/health-diabetes-main.svg",
        href: "/product/tai-lieu-kiem-soat-tieu-duong",
      },
      {
        id: "nutrition-poster",
        title: "Áp phích: Kim tự tháp dinh dưỡng thực vật",
        description: "Tài liệu trực quan lý tưởng để treo tại lớp học và phòng chờ.",
        image: "/images/poster-nutrition-main.svg",
        href: "/product/ap-phich-dinh-duong-thuc-vat",
      },
      {
        id: "brain-health",
        title: "Thực phẩm siêu năng lượng cho não bộ",
        description: "Một đầu sách bổ sung về sức khỏe thần kinh và lối sống dài hạn.",
        image: "/images/power-foods-main.svg",
        href: "/product/thuc-pham-sieu-nang-luong",
      },
    ],
  },

  {
    slug: "cam-nang-dinh-duong-lam-sang",
    category: "clinicians",
    categoryLabel: "Dành cho bác sĩ",
    title: "Cẩm nang dinh dưỡng lâm sàng cho nhân viên y tế",
    price: "$12.00",
    unit: "/ bộ",
    sku: "CLN-101",
    shortDescription:
      "Bộ tài liệu chuyên sâu dành cho bác sĩ, điều dưỡng và nhà giáo dục sức khỏe, tóm tắt bằng chứng khoa học về dinh dưỡng thực vật trong thực hành lâm sàng.",
    longDescription:
      "Cẩm nang này được biên soạn cho đội ngũ y tế cần một tài liệu tra cứu nhanh về dinh dưỡng thực vật trong chăm sóc bệnh nhân. Nội dung gồm các bảng tóm tắt bằng chứng, chỉ định thường gặp, lưu ý khi tư vấn và tài liệu phát tay cho người bệnh.\n\nPhù hợp sử dụng trong bệnh viện, phòng khám và các khóa đào tạo ngắn hạn cho nhân viên y tế cộng đồng.\n\nBộ tài liệu giúp việc tư vấn trở nên nhất quán, khoa học và tiết kiệm thời gian hơn.",
    contactNote: "Phù hợp đặt theo nhóm cho cơ sở y tế và đào tạo nội bộ",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/clinical-guide-main.svg",
    ],
    relatedResources: [
      {
        id: "multimedia-kit",
        title: "Bộ slide hội thảo dinh dưỡng thực vật",
        description: "Slide và biểu mẫu giảng dạy hỗ trợ đào tạo nhóm lớn.",
        image: "/images/multimedia-kit-main.svg",
        href: "/product/bo-slide-hoi-thao-thuc-vat",
      },
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Tài liệu phát tay phù hợp đi kèm trong tư vấn bệnh mạn tính.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
      {
        id: "oncology-guide",
        title: "Hướng dẫn dinh dưỡng cho người vượt qua ung thư",
        description: "Bổ sung cho nhóm bệnh nhân cần hướng dẫn phục hồi cụ thể.",
        image: "/images/cancer-guide-main.svg",
        href: "/product/dinh-duong-cho-nguoi-ung-thu",
      },
    ],
  },

  {
    slug: "bo-slide-hoi-thao-thuc-vat",
    category: "multimedia",
    categoryLabel: "Bộ đa phương tiện",
    title: "Bộ slide hội thảo dinh dưỡng thực vật",
    price: "$9.00",
    unit: "/ bộ",
    sku: "MM-101",
    shortDescription:
      "Bộ slide thuyết trình, handout và checklist triển khai hội thảo dinh dưỡng thực vật, phù hợp cho người dẫn chương trình và giáo dục sức khỏe cộng đồng.",
    longDescription:
      "Bộ đa phương tiện này gồm slide trình chiếu, handout in phát tay, mẫu kịch bản buổi nói chuyện và checklist chuẩn bị sự kiện. Nội dung được thiết kế cho người cần triển khai hội thảo dinh dưỡng thực vật nhanh chóng mà vẫn giữ tính chuyên nghiệp.\n\nTài liệu phù hợp với trường học, trung tâm cộng đồng, hội nhóm tôn giáo và chương trình chăm sóc sức khỏe tại nơi làm việc.\n\nĐây là lựa chọn tiện lợi nếu bạn muốn triển khai truyền thông sức khỏe theo nhóm mà không phải chuẩn bị từ đầu.",
    contactNote: "Liên hệ nếu cần tùy chỉnh bộ slide cho lớp học hoặc hội thảo riêng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/multimedia-kit-main.svg",
    ],
    relatedResources: [
      {
        id: "clinical-guide",
        title: "Cẩm nang dinh dưỡng lâm sàng cho nhân viên y tế",
        description: "Hữu ích khi cần bổ sung bằng chứng chuyên môn cho nội dung thuyết trình.",
        image: "/images/clinical-guide-main.svg",
        href: "/product/cam-nang-dinh-duong-lam-sang",
      },
      {
        id: "bhc-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Kết hợp để tăng tính tương tác trong các buổi chia sẻ trực tiếp.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
      {
        id: "nutrition-poster",
        title: "Áp phích: Kim tự tháp dinh dưỡng thực vật",
        description: "Bổ sung yếu tố trực quan cho không gian hội thảo và khu trưng bày.",
        image: "/images/poster-nutrition-main.svg",
        href: "/product/ap-phich-dinh-duong-thuc-vat",
      },
    ],
  },

  {
    slug: "ao-thun-plant-powered",
    category: "apparel",
    categoryLabel: "Quần áo",
    title: "Áo thun Plant Powered",
    price: "$22.00",
    unit: "/ áo",
    sku: "APR-101",
    shortDescription:
      "Áo thun cotton in thông điệp Plant Powered, phù hợp cho tình nguyện viên, sự kiện sức khỏe cộng đồng và chiến dịch truyền thông tích cực về lối sống lành mạnh.",
    longDescription:
      "Áo thun Plant Powered được thiết kế theo tinh thần đơn giản, hiện đại và dễ phối, với thông điệp tích cực khuyến khích lối sống lành mạnh dựa trên thực vật.\n\nChất liệu cotton mềm, dễ mặc trong ngày dài và thích hợp sử dụng tại sự kiện ngoài trời, lớp học sức khỏe, hội chợ cộng đồng hoặc làm đồng phục nhóm.\n\nĐây là sản phẩm vừa mang tính nhận diện, vừa giúp truyền tải thông điệp của chương trình một cách nhẹ nhàng và gần gũi.",
    contactNote: "Có thể đặt áo theo nhóm hoặc theo số lượng sự kiện",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: [
      "/images/plant-powered-shirt-main.svg",
    ],
    relatedResources: [
      {
        id: "multimedia-kit",
        title: "Bộ slide hội thảo dinh dưỡng thực vật",
        description: "Đi cùng áo sự kiện để tạo bộ nhận diện đồng nhất cho chương trình.",
        image: "/images/multimedia-kit-main.svg",
        href: "/product/bo-slide-hoi-thao-thuc-vat",
      },
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Phát kèm trong các hoạt động cộng đồng hoặc bàn thông tin sự kiện.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
      {
        id: "activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Tăng trải nghiệm tương tác cho nhóm thiện nguyện và người tham gia.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
    ],
  },

  {
    slug: "bo-the-thao-luan-bhc",
    category: "healthy-communities",
    categoryLabel: "Cộng đồng Khỏe mạnh",
    title: "Bộ thẻ thảo luận BHC",
    price: "$4.20",
    unit: "/ bộ",
    sku: "BHCOM-500",
    shortDescription:
      "Bộ thẻ câu hỏi tình huống giúp dẫn dắt thảo luận nhóm về dinh dưỡng thực vật, phù hợp cho sinh hoạt cộng đồng và lớp học sức khỏe.",
    longDescription:
      "Bộ thẻ gồm 50 câu hỏi theo chủ đề dinh dưỡng, thói quen ăn uống và thay đổi hành vi sức khỏe. Mỗi thẻ được thiết kế để tạo tương tác nhóm nhanh trong 10-20 phút.\n\nPhù hợp cho người điều phối chương trình BHC, tình nguyện viên cộng đồng và giáo viên cần công cụ thảo luận dễ triển khai.",
    contactNote: "Có thể đặt kèm bộ hoạt động cộng đồng để dùng đồng bộ",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/bhc-workshop-cards.svg"],
    relatedResources: [
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Phát tay cho người tham gia trước khi bắt đầu thảo luận nhóm.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
      {
        id: "activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Kết hợp với bộ thẻ để tăng mức độ tương tác trong buổi sinh hoạt.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
      {
        id: "pod-guide",
        title: "Sổ tay Hướng dẫn Trưởng nhóm BHC",
        description: "Cung cấp khung điều phối và kế hoạch buổi họp rõ ràng.",
        image: "/images/bhc-guide-main.svg",
        href: "/product/so-tay-truong-nhom-bhc",
      },
    ],
  },

  {
    slug: "lich-21-ngay-an-thuc-vat",
    category: "healthy-communities",
    categoryLabel: "Cộng đồng Khỏe mạnh",
    title: "Lịch 21 ngày ăn thực vật cộng đồng",
    price: "$2.20",
    unit: "/ quyển",
    sku: "BHCOM-510",
    shortDescription:
      "Lịch theo dõi 21 ngày với nhiệm vụ ngắn mỗi ngày, giúp nhóm cộng đồng duy trì thói quen ăn thực vật một cách nhất quán.",
    longDescription:
      "Tài liệu này được thiết kế theo dạng hành trình 21 ngày, mỗi trang là một mục tiêu nhỏ đi kèm gợi ý bữa ăn, mẹo thay thế thực phẩm và câu hỏi tự đánh giá.\n\nPhù hợp phát theo nhóm để tạo động lực chung, đặc biệt hiệu quả trong các chương trình thay đổi hành vi sức khỏe cộng đồng.",
    contactNote: "Có ưu đãi khi đặt theo gói từ 25 cuốn trở lên",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/bhc-calendar-main.svg"],
    relatedResources: [
      {
        id: "recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Nguồn công thức thực tế để hoàn thành thử thách 21 ngày.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Bổ sung hoạt động nhóm giúp duy trì động lực trong suốt chương trình.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Tài liệu giới thiệu nhanh cho thành viên mới tham gia nhóm.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
    ],
  },

  {
    slug: "can-bang-noi-tiet-to-tu-thuc-vat",
    category: "books",
    categoryLabel: "Sách",
    title: "Cân bằng nội tiết tố từ thực vật",
    price: "$17.00",
    unit: "/ quyển",
    sku: "HEAL-201",
    shortDescription:
      "Cuốn sách tổng hợp chiến lược dinh dưỡng và lối sống dựa trên thực vật giúp hỗ trợ cân bằng nội tiết tự nhiên theo từng giai đoạn tuổi.",
    longDescription:
      "Sách cung cấp kiến thức nền tảng về vai trò của dinh dưỡng đối với nội tiết tố, đồng thời đưa ra kế hoạch ăn uống thực tế để giảm viêm và hỗ trợ sức khỏe chuyển hóa.\n\nNội dung phù hợp cho người đọc phổ thông, đặc biệt những ai quan tâm đến sức khỏe phụ nữ, giấc ngủ và năng lượng hàng ngày.",
    contactNote: "Liên hệ để đặt combo cùng tài liệu sức khỏe chuyên đề",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/hormone-health-book.svg"],
    relatedResources: [
      {
        id: "power-foods",
        title: "Thực phẩm siêu năng lượng cho não bộ",
        description: "Mở rộng kiến thức dinh dưỡng cho sức khỏe thần kinh và nội tiết.",
        image: "/images/power-foods-main.svg",
        href: "/product/thuc-pham-sieu-nang-luong",
      },
      {
        id: "cheese-trap",
        title: "Bếp không phô mai (The Cheese Trap)",
        description: "Giảm thực phẩm gây viêm để hỗ trợ cân bằng chuyển hóa.",
        image: "/images/cheese-trap-main.svg",
        href: "/product/bep-khong-pho-mai",
      },
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Ứng dụng thêm nguyên tắc ăn uống lành mạnh cho tim mạch.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
    ],
  },

  {
    slug: "giam-can-khong-dem-calo",
    category: "books",
    categoryLabel: "Sách",
    title: "Giảm cân không đếm calo",
    price: "$15.50",
    unit: "/ quyển",
    sku: "HEAL-202",
    shortDescription:
      "Hướng dẫn giảm cân bền vững bằng mật độ năng lượng thực phẩm, không ép cân cực đoan và không cần đếm calo hằng ngày.",
    longDescription:
      "Cuốn sách trình bày phương pháp giảm cân dựa trên thực phẩm toàn phần thực vật, tập trung vào cảm giác no tự nhiên, chất xơ và thói quen ăn uống linh hoạt.\n\nBao gồm thực đơn mẫu, kế hoạch đi chợ và mẹo xử lý tình huống thường gặp khi mới thay đổi chế độ ăn.",
    contactNote: "Có thể đặt kèm sách công thức để thực hành ngay",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/weight-loss-book.svg"],
    relatedResources: [
      {
        id: "cheese-trap",
        title: "Bếp không phô mai (The Cheese Trap)",
        description: "Giảm thực phẩm dễ gây nghiện và hỗ trợ kiểm soát cân nặng.",
        image: "/images/cheese-trap-main.svg",
        href: "/product/bep-khong-pho-mai",
      },
      {
        id: "recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Công thức dễ làm để duy trì thực đơn giảm cân dài hạn.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "bp-guide",
        title: "Hướng dẫn huyết áp ổn định bằng dinh dưỡng",
        description: "Bổ sung kiến thức về cân nặng và sức khỏe chuyển hóa toàn diện.",
        image: "/images/blood-pressure-guide.svg",
        href: "/product/huong-dan-huyet-ap-on-dinh",
      },
    ],
  },

  {
    slug: "an-thuc-vat-cho-gia-dinh-ban-ron",
    category: "books",
    categoryLabel: "Sách",
    title: "Ăn thực vật cho gia đình bận rộn",
    price: "$14.00",
    unit: "/ quyển",
    sku: "HEAL-203",
    shortDescription:
      "Bộ thực đơn nhanh cho gia đình ít thời gian, tập trung món đơn giản, tiết kiệm và phù hợp nhiều độ tuổi.",
    longDescription:
      "Sách tập hợp các kế hoạch bữa ăn 15-30 phút cùng danh sách chuẩn bị theo tuần, giúp gia đình duy trì ăn uống lành mạnh ngay cả khi lịch sinh hoạt dày đặc.\n\nNội dung thực tế, dễ áp dụng và phù hợp cho các hộ gia đình muốn chuyển dần sang chế độ ăn thực vật.",
    contactNote: "Phù hợp làm quà tặng trong chương trình giáo dục gia đình",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/family-plant-book.svg"],
    relatedResources: [
      {
        id: "recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Mở rộng thêm lựa chọn món ăn cho cả nhà.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "breakfast-brochure",
        title: "Tờ rơi: 10 bữa sáng thực vật nhanh",
        description: "Tài liệu ngắn gọn để áp dụng ngay vào buổi sáng bận rộn.",
        image: "/images/brochure-breakfast-main.svg",
        href: "/product/to-roi-10-bua-sang-thuc-vat",
      },
      {
        id: "plant-shirt",
        title: "Áo thun Plant Powered",
        description: "Sản phẩm truyền cảm hứng cho lối sống lành mạnh trong gia đình.",
        image: "/images/plant-powered-shirt-main.svg",
        href: "/product/ao-thun-plant-powered",
      },
    ],
  },

  {
    slug: "poster-suc-khoe-tim-mach",
    category: "literature",
    categoryLabel: "Tài liệu in ấn",
    title: "Poster: Thực đơn bảo vệ tim mạch",
    price: "$1.20",
    unit: "/ tờ",
    sku: "LIT-201",
    shortDescription:
      "Poster trực quan về nhóm thực phẩm tốt cho tim, phù hợp treo tại phòng khám, lớp học và khu vực tư vấn cộng đồng.",
    longDescription:
      "Poster trình bày rõ các nhóm thực phẩm nên ưu tiên cho sức khỏe tim mạch và các nhóm nên hạn chế, với thiết kế dễ đọc từ xa.\n\nPhù hợp cho không gian giáo dục sức khỏe, phòng chờ và hoạt động truyền thông tại cộng đồng.",
    contactNote: "Có thể đặt in số lượng lớn cho chiến dịch truyền thông",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/poster-heart-main.svg"],
    relatedResources: [
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Tài liệu chi tiết đi kèm poster để tư vấn sâu hơn.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
      {
        id: "nutrition-poster",
        title: "Áp phích: Kim tự tháp dinh dưỡng thực vật",
        description: "Bổ sung hình ảnh nền tảng cho khu vực tư vấn dinh dưỡng.",
        image: "/images/poster-nutrition-main.svg",
        href: "/product/ap-phich-dinh-duong-thuc-vat",
      },
      {
        id: "bp-guide",
        title: "Hướng dẫn huyết áp ổn định bằng dinh dưỡng",
        description: "Tài liệu thực hành cho người cần kiểm soát huyết áp lâu dài.",
        image: "/images/blood-pressure-guide.svg",
        href: "/product/huong-dan-huyet-ap-on-dinh",
      },
    ],
  },

  {
    slug: "poster-kiem-soat-duong-huyet",
    category: "literature",
    categoryLabel: "Tài liệu in ấn",
    title: "Poster: Kiểm soát đường huyết mỗi ngày",
    price: "$1.20",
    unit: "/ tờ",
    sku: "LIT-202",
    shortDescription:
      "Poster hướng dẫn nhanh các bước xây dựng bữa ăn ổn định đường huyết, dễ theo dõi cho người mới bắt đầu.",
    longDescription:
      "Nội dung poster tập trung vào khẩu phần, chất xơ và thói quen ăn uống hợp lý giúp ổn định đường huyết theo hướng dễ áp dụng.\n\nThiết kế phù hợp cho phòng khám, lớp học cộng đồng và khu vực tư vấn nhóm nhỏ.",
    contactNote: "Đặt combo poster + tài liệu bệnh lý để dùng đồng bộ",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/poster-diabetes-main.svg"],
    relatedResources: [
      {
        id: "diabetes-guide",
        title: "Tài liệu kiểm soát tiểu đường bằng thực vật",
        description: "Bản đầy đủ để triển khai thực tế sau khi xem poster.",
        image: "/images/health-diabetes-main.svg",
        href: "/product/tai-lieu-kiem-soat-tieu-duong",
      },
      {
        id: "lipid-guide",
        title: "Hướng dẫn giảm mỡ máu bằng thực vật",
        description: "Kết hợp quản lý đường huyết và mỡ máu trong cùng chương trình.",
        image: "/images/lipid-guide.svg",
        href: "/product/huong-dan-giam-mo-mau",
      },
      {
        id: "nutrition-poster",
        title: "Áp phích: Kim tự tháp dinh dưỡng thực vật",
        description: "Bổ sung nền tảng dinh dưỡng chung cho người đọc.",
        image: "/images/poster-nutrition-main.svg",
        href: "/product/ap-phich-dinh-duong-thuc-vat",
      },
    ],
  },

  {
    slug: "to-roi-10-bua-sang-thuc-vat",
    category: "literature",
    categoryLabel: "Tài liệu in ấn",
    title: "Tờ rơi: 10 bữa sáng thực vật nhanh",
    price: "$0.35",
    unit: "/ tờ",
    sku: "LIT-203",
    shortDescription:
      "Tờ rơi một trang với 10 gợi ý bữa sáng thực vật dưới 15 phút, phù hợp cho học sinh, người đi làm và gia đình bận rộn.",
    longDescription:
      "Tài liệu cô đọng những công thức bữa sáng nhanh, dễ chuẩn bị và giàu dinh dưỡng.\n\nĐịnh dạng một trang tiện phát tay tại sự kiện hoặc sử dụng trong lớp học hướng dẫn ăn uống lành mạnh.",
    contactNote: "Có thể in theo lô để phát miễn phí tại chương trình cộng đồng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/brochure-breakfast-main.svg"],
    relatedResources: [
      {
        id: "recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Mở rộng từ bữa sáng sang bữa chính cho cả ngày.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
      {
        id: "calendar-21",
        title: "Lịch 21 ngày ăn thực vật cộng đồng",
        description: "Theo dõi tiến độ và duy trì động lực thay đổi thói quen.",
        image: "/images/bhc-calendar-main.svg",
        href: "/product/lich-21-ngay-an-thuc-vat",
      },
      {
        id: "bhc-brochure",
        title: "Tờ rơi: Xây dựng Cộng đồng Khỏe mạnh",
        description: "Kết nối người đọc với các hoạt động cộng đồng tại địa phương.",
        image: "/images/bhc-brochure-main.svg",
        href: "/product/xay-dung-cong-dong-khoe-manh-to-roi",
      },
    ],
  },

  {
    slug: "huong-dan-huyet-ap-on-dinh",
    category: "health-topics",
    categoryLabel: "Theo chủ đề sức khỏe",
    title: "Hướng dẫn huyết áp ổn định bằng dinh dưỡng",
    price: "$3.10",
    unit: "/ quyển",
    sku: "HT-204",
    shortDescription:
      "Hướng dẫn thực hành giúp kiểm soát huyết áp bằng chế độ ăn thực vật, theo cách đơn giản và phù hợp sinh hoạt thường ngày.",
    longDescription:
      "Tài liệu cung cấp kế hoạch ăn uống và thay đổi thói quen sinh hoạt nhằm hỗ trợ ổn định huyết áp theo hướng an toàn, bền vững.\n\nPhù hợp cho người mới bắt đầu thay đổi chế độ ăn và nhóm cộng đồng cần tài liệu tư vấn thực tế.",
    contactNote: "Có thể đặt theo bộ cùng poster tim mạch",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/blood-pressure-guide.svg"],
    relatedResources: [
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Nội dung đầy đủ để đi sâu hơn sau khi đọc bản hướng dẫn nhanh.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
      {
        id: "heart-poster",
        title: "Poster: Thực đơn bảo vệ tim mạch",
        description: "Bản trực quan để treo tại phòng khám hoặc lớp học cộng đồng.",
        image: "/images/poster-heart-main.svg",
        href: "/product/poster-suc-khoe-tim-mach",
      },
      {
        id: "lipid-guide",
        title: "Hướng dẫn giảm mỡ máu bằng thực vật",
        description: "Kết hợp tốt với lộ trình kiểm soát huyết áp dài hạn.",
        image: "/images/lipid-guide.svg",
        href: "/product/huong-dan-giam-mo-mau",
      },
    ],
  },

  {
    slug: "huong-dan-suc-khoe-xuong-khop",
    category: "health-topics",
    categoryLabel: "Theo chủ đề sức khỏe",
    title: "Hướng dẫn sức khỏe xương khớp từ thực vật",
    price: "$3.40",
    unit: "/ quyển",
    sku: "HT-205",
    shortDescription:
      "Tài liệu chuyên đề về dinh dưỡng và vận động nhẹ hỗ trợ xương khớp, phù hợp cho người trung niên và cao tuổi.",
    longDescription:
      "Nội dung tập trung vào nhóm thực phẩm hỗ trợ xương khớp, thói quen vận động phù hợp và các lưu ý thực tế trong sinh hoạt hàng ngày.\n\nThiết kế theo hướng dễ đọc, có thể dùng tại lớp học sức khỏe người cao tuổi hoặc tư vấn tại cộng đồng.",
    contactNote: "Có sẵn gói tài liệu cho câu lạc bộ sức khỏe người cao tuổi",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/bone-joint-guide.svg"],
    relatedResources: [
      {
        id: "hormone-book",
        title: "Cân bằng nội tiết tố từ thực vật",
        description: "Bổ sung kiến thức về sức khỏe chuyển hóa và lối sống toàn diện.",
        image: "/images/hormone-health-book.svg",
        href: "/product/can-bang-noi-tiet-to-tu-thuc-vat",
      },
      {
        id: "media-kit",
        title: "Bộ slide hội thảo dinh dưỡng thực vật",
        description: "Dùng để tổ chức buổi chia sẻ nhóm về chăm sóc xương khớp.",
        image: "/images/multimedia-kit-main.svg",
        href: "/product/bo-slide-hoi-thao-thuc-vat",
      },
      {
        id: "recipe-book",
        title: "Sách công thức: Ăn lành mạnh mỗi ngày",
        description: "Gợi ý món ăn dễ thực hiện cho người cần chăm sóc xương khớp.",
        image: "/images/recipe-book-main.svg",
        href: "/product/sach-cong-thuc-an-lanh-manh",
      },
    ],
  },

  {
    slug: "huong-dan-giam-mo-mau",
    category: "health-topics",
    categoryLabel: "Theo chủ đề sức khỏe",
    title: "Hướng dẫn giảm mỡ máu bằng thực vật",
    price: "$3.00",
    unit: "/ quyển",
    sku: "HT-206",
    shortDescription:
      "Hướng dẫn thực hành để cải thiện lipid máu qua dinh dưỡng thực vật, có kế hoạch ngắn hạn và các mẹo áp dụng hằng ngày.",
    longDescription:
      "Tài liệu diễn giải đơn giản về cholesterol, triglyceride và vai trò của thực phẩm trong kiểm soát mỡ máu.\n\nNgười đọc có thể áp dụng ngay qua gợi ý khẩu phần, thực đơn mẫu và danh sách thực phẩm thay thế.",
    contactNote: "Phù hợp cho chương trình phòng ngừa bệnh mạn tính cộng đồng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/lipid-guide.svg"],
    relatedResources: [
      {
        id: "heart-guide",
        title: "Cẩm nang sức khỏe tim mạch từ thực vật",
        description: "Bổ sung kiến thức tim mạch đi kèm quản lý mỡ máu.",
        image: "/images/heart-health-main.svg",
        href: "/product/cam-nang-suc-khoe-tim-mach",
      },
      {
        id: "bp-guide",
        title: "Hướng dẫn huyết áp ổn định bằng dinh dưỡng",
        description: "Kết hợp tốt trong kế hoạch cải thiện sức khỏe chuyển hóa.",
        image: "/images/blood-pressure-guide.svg",
        href: "/product/huong-dan-huyet-ap-on-dinh",
      },
      {
        id: "diabetes-guide",
        title: "Tài liệu kiểm soát tiểu đường bằng thực vật",
        description: "Mở rộng sang kiểm soát đường huyết và cân nặng đồng thời.",
        image: "/images/health-diabetes-main.svg",
        href: "/product/tai-lieu-kiem-soat-tieu-duong",
      },
    ],
  },

  {
    slug: "quy-trinh-tu-van-15-phut",
    category: "clinicians",
    categoryLabel: "Dành cho bác sĩ",
    title: "Quy trình tư vấn dinh dưỡng 15 phút",
    price: "$8.50",
    unit: "/ bộ",
    sku: "CLN-201",
    shortDescription:
      "Bộ quy trình ngắn giúp bác sĩ và điều dưỡng triển khai tư vấn dinh dưỡng thực vật hiệu quả ngay trong lịch khám bận rộn.",
    longDescription:
      "Tài liệu cung cấp mẫu kịch bản tư vấn 15 phút, câu hỏi sàng lọc nhanh và checklist hành động cho bệnh nhân sau mỗi lần khám.\n\nPhù hợp với phòng khám ngoại trú, cơ sở y tế cộng đồng và đội ngũ cần chuẩn hóa quy trình tư vấn.",
    contactNote: "Có thể đặt theo nhóm cho phòng khám và bệnh viện",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/clinician-protocol-main.svg"],
    relatedResources: [
      {
        id: "clinical-guide",
        title: "Cẩm nang dinh dưỡng lâm sàng cho nhân viên y tế",
        description: "Tài liệu nền tảng để đào sâu bằng chứng và chỉ định thực hành.",
        image: "/images/clinical-guide-main.svg",
        href: "/product/cam-nang-dinh-duong-lam-sang",
      },
      {
        id: "slide-kit",
        title: "Bộ slide hội thảo dinh dưỡng thực vật",
        description: "Hỗ trợ đào tạo nhóm nội bộ cho nhân viên mới.",
        image: "/images/multimedia-kit-main.svg",
        href: "/product/bo-slide-hoi-thao-thuc-vat",
      },
      {
        id: "clinic-forms",
        title: "Mẫu đơn dinh dưỡng cho phòng khám",
        description: "Sử dụng cùng quy trình để theo dõi kế hoạch điều trị.",
        image: "/images/prescription-pad-main.svg",
        href: "/product/mau-don-dinh-duong-phong-kham",
      },
    ],
  },

  {
    slug: "mau-don-dinh-duong-phong-kham",
    category: "clinicians",
    categoryLabel: "Dành cho bác sĩ",
    title: "Mẫu đơn dinh dưỡng cho phòng khám",
    price: "$6.00",
    unit: "/ bộ",
    sku: "CLN-202",
    shortDescription:
      "Bộ biểu mẫu theo dõi dinh dưỡng, mục tiêu bệnh nhân và tái khám, thiết kế dành riêng cho quy trình phòng khám thực tế.",
    longDescription:
      "Bộ biểu mẫu bao gồm mẫu ghi nhận thói quen ăn uống, mục tiêu 4 tuần, bảng theo dõi tái khám và phiếu hướng dẫn bệnh nhân mang về nhà.\n\nGiúp đội ngũ y tế chuẩn hóa hồ sơ, giảm thời gian ghi chép và tăng tính liên tục trong tư vấn dinh dưỡng.",
    contactNote: "Có thể tùy chỉnh logo cơ sở khi đặt theo số lượng",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/prescription-pad-main.svg"],
    relatedResources: [
      {
        id: "clinical-guide",
        title: "Cẩm nang dinh dưỡng lâm sàng cho nhân viên y tế",
        description: "Bộ tài liệu nền để sử dụng biểu mẫu đúng bối cảnh chuyên môn.",
        image: "/images/clinical-guide-main.svg",
        href: "/product/cam-nang-dinh-duong-lam-sang",
      },
      {
        id: "consult-protocol",
        title: "Quy trình tư vấn dinh dưỡng 15 phút",
        description: "Giúp biểu mẫu đi vào luồng khám một cách mượt mà.",
        image: "/images/clinician-protocol-main.svg",
        href: "/product/quy-trinh-tu-van-15-phut",
      },
      {
        id: "diabetes-guide",
        title: "Tài liệu kiểm soát tiểu đường bằng thực vật",
        description: "Tài liệu phát tay thường dùng cho nhóm bệnh nhân mạn tính.",
        image: "/images/health-diabetes-main.svg",
        href: "/product/tai-lieu-kiem-soat-tieu-duong",
      },
    ],
  },

  {
    slug: "bo-webinar-dinh-duong-thuc-vat",
    category: "multimedia",
    categoryLabel: "Bộ đa phương tiện",
    title: "Bộ webinar dinh dưỡng thực vật",
    price: "$10.00",
    unit: "/ bộ",
    sku: "MM-201",
    shortDescription:
      "Gói tài liệu webinar gồm slide, kịch bản MC và checklist vận hành buổi học trực tuyến cho cộng đồng.",
    longDescription:
      "Bộ webinar hỗ trợ tổ chức buổi học trực tuyến từ A-Z: cấu trúc nội dung, phân bổ thời lượng, mẫu tương tác hỏi đáp và gợi ý tài liệu phát sau buổi học.\n\nPhù hợp cho nhóm cộng đồng, tổ chức phi lợi nhuận và đơn vị y tế muốn triển khai truyền thông online chuyên nghiệp.",
    contactNote: "Liên hệ nếu cần bản tùy biến theo từng chủ đề bệnh lý",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/webinar-kit-main.svg"],
    relatedResources: [
      {
        id: "slide-kit",
        title: "Bộ slide hội thảo dinh dưỡng thực vật",
        description: "Nội dung nền để tái sử dụng trong webinar và hội thảo trực tiếp.",
        image: "/images/multimedia-kit-main.svg",
        href: "/product/bo-slide-hoi-thao-thuc-vat",
      },
      {
        id: "clinical-guide",
        title: "Cẩm nang dinh dưỡng lâm sàng cho nhân viên y tế",
        description: "Bổ sung chiều sâu chuyên môn cho người dẫn chương trình.",
        image: "/images/clinical-guide-main.svg",
        href: "/product/cam-nang-dinh-duong-lam-sang",
      },
      {
        id: "shirt",
        title: "Áo thun Plant Powered",
        description: "Sản phẩm nhận diện phù hợp khi tổ chức sự kiện cộng đồng.",
        image: "/images/plant-powered-shirt-main.svg",
        href: "/product/ao-thun-plant-powered",
      },
    ],
  },

  {
    slug: "bo-truyen-thong-lop-hoc-suc-khoe",
    category: "multimedia",
    categoryLabel: "Bộ đa phương tiện",
    title: "Bộ truyền thông lớp học sức khỏe",
    price: "$8.80",
    unit: "/ bộ",
    sku: "MM-202",
    shortDescription:
      "Bộ tài liệu truyền thông dạng lớp học gồm poster, handout và mini game để tăng hứng thú học tập về dinh dưỡng.",
    longDescription:
      "Bộ truyền thông lớp học tập trung vào tính tương tác, gồm công cụ trực quan và hoạt động nhóm ngắn để người học dễ tiếp thu.\n\nPhù hợp cho trường học, trung tâm cộng đồng và các câu lạc bộ sức khỏe cần giải pháp truyền thông có thể dùng ngay.",
    contactNote: "Có thể đặt theo chương trình lớp học theo quý",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/classroom-media-main.svg"],
    relatedResources: [
      {
        id: "slide-kit",
        title: "Bộ slide hội thảo dinh dưỡng thực vật",
        description: "Mở rộng nội dung từ lớp học sang buổi nói chuyện chuyên đề.",
        image: "/images/multimedia-kit-main.svg",
        href: "/product/bo-slide-hoi-thao-thuc-vat",
      },
      {
        id: "activity-kit",
        title: "Bộ hoạt động cộng đồng",
        description: "Kết hợp thêm trò chơi và bài tập nhóm thực hành.",
        image: "/images/activity-kit-main.svg",
        href: "/product/bo-hoat-dong-cong-dong",
      },
      {
        id: "heart-poster",
        title: "Poster: Thực đơn bảo vệ tim mạch",
        description: "Tăng phần trực quan trong lớp học và góc trưng bày.",
        image: "/images/poster-heart-main.svg",
        href: "/product/poster-suc-khoe-tim-mach",
      },
    ],
  },

  {
    slug: "tui-vai-eat-plants-live-better",
    category: "apparel",
    categoryLabel: "Quần áo",
    title: "Túi vải Eat Plants Live Better",
    price: "$12.00",
    unit: "/ túi",
    sku: "APR-102",
    shortDescription:
      "Túi vải canvas in thông điệp Eat Plants Live Better, phù hợp cho sự kiện cộng đồng, tình nguyện viên và hoạt động truyền thông xanh.",
    longDescription:
      "Túi vải làm từ chất liệu bền chắc, có thể tái sử dụng nhiều lần, phù hợp đựng tài liệu sự kiện, sách và vật dụng cá nhân.\n\nSản phẩm giúp tăng nhận diện chương trình và truyền tải thông điệp sống lành mạnh, thân thiện môi trường.",
    contactNote: "Có thể đặt theo số lượng sự kiện hoặc làm quà tặng chương trình",
    whatsappUrl: "https://wa.me/12025277306",
    zaloUrl: "https://zalo.me/12025277306",
    phoneNumber: "tel:+12025277306",
    images: ["/images/tote-bag-main.svg"],
    relatedResources: [
      {
        id: "shirt",
        title: "Áo thun Plant Powered",
        description: "Kết hợp thành bộ nhận diện đồng nhất cho đội ngũ sự kiện.",
        image: "/images/plant-powered-shirt-main.svg",
        href: "/product/ao-thun-plant-powered",
      },
      {
        id: "classroom-kit",
        title: "Bộ truyền thông lớp học sức khỏe",
        description: "Đựng tài liệu và vật dụng cho hoạt động lớp học cộng đồng.",
        image: "/images/classroom-media-main.svg",
        href: "/product/bo-truyen-thong-lop-hoc-suc-khoe",
      },
      {
        id: "breakfast-brochure",
        title: "Tờ rơi: 10 bữa sáng thực vật nhanh",
        description: "Tài liệu phát tay gọn nhẹ phù hợp mang theo trong sự kiện.",
        image: "/images/brochure-breakfast-main.svg",
        href: "/product/to-roi-10-bua-sang-thuc-vat",
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
  if (category === "posters") {
    return products.filter((p) => p.category === "literature");
  }

  if (category === "product-spotlight") {
    return products.filter((p) => [
      "bep-khong-pho-mai",
      "xay-dung-cong-dong-khoe-manh-to-roi",
      "cam-nang-dinh-duong-lam-sang",
      "bo-slide-hoi-thao-thuc-vat",
      "can-bang-noi-tiet-to-tu-thuc-vat",
      "huong-dan-huyet-ap-on-dinh",
      "quy-trinh-tu-van-15-phut",
    ].includes(p.slug));
  }

  if (category === "new") {
    return products.slice(-4).reverse();
  }

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

