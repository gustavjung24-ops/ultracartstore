// ============================================================
// MOCK DATA — Edit this file to update product details
// ============================================================
// Fields you can change:
//   title          — product name shown on page
//   price          — shown as-is (e.g. "$0.15")
//   sku            — item code shown below the title
//   shortDescription — paragraph below the price
//   whatsappUrl    — https://wa.me/<number>
//   zaloUrl        — https://zalo.me/<number>
//   phoneNumber    — tel: link (e.g. "+12025277306")
//   images         — array of image URLs (use /images/... or external URL)
//   relatedResources — array of 3 related items
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
  title: string;
  price: string;
  sku: string;
  shortDescription: string;
  contactNote: string;
  whatsappUrl: string;
  zaloUrl: string;
  phoneNumber: string;
  images: string[];
  relatedResources: RelatedResource[];
}

export const product: Product = {
  slug: "building-healthy-communities-brochure",
  title: "Tờ rơi Xây dựng Cộng đồng Khỏe mạnh",
  price: "$0.15",
  sku: "BHCOM-100",
  shortDescription:
    "Tờ rơi BHC 2 trang — dành cho các Trưởng nhóm chia sẻ với cộng đồng. Nêu rõ sứ mệnh chương trình, lợi ích khi tham gia và cách đăng ký, giúp nhóm của bạn ngày càng lớn mạnh.",
  contactNote: "Liên hệ ngay để đặt mua và nhận tư vấn miễn phí",
  // 👇 Replace with your real WhatsApp number
  whatsappUrl: "https://wa.me/12025277306",
  // 👇 Replace with your real Zalo number
  zaloUrl: "https://zalo.me/12025277306",
  // 👇 Replace with your real phone number
  phoneNumber: "tel:+12025277306",
  // 👇 Replace with real image paths under /public/images/ or use external URLs
  images: [
    "/images/placeholder-main.svg",
    "/images/placeholder-front.svg",
    "/images/placeholder-back.svg",
  ],
  relatedResources: [
    {
      id: "bhc-pod-guide",
      title: "Sổ tay Hướng dẫn Trưởng nhóm BHC",
      description:
        "Tài liệu toàn diện giúp Trưởng nhóm lập kế hoạch và điều phối các buổi sinh hoạt sức khỏe cộng đồng hiệu quả.",
      image: "/images/placeholder-guide.svg",
      href: "/product/bhc-pod-leader-guide",
    },
    {
      id: "bhc-recipe-book",
      title: "Sách công thức ăn lành mạnh",
      description:
        "Tổng hợp công thức thuần thực vật và mẹo dinh dưỡng thực tiễn cho các chương trình sức khỏe cộng đồng.",
      image: "/images/placeholder-recipe.svg",
      href: "/product/healthy-eating-recipe-book",
    },
    {
      id: "bhc-activity-kit",
      title: "Bộ công cụ hoạt động cộng đồng",
      description:
        "Hoạt động và phiếu bài tập dùng ngay — lý tưởng để hướng dẫn lối sống lành mạnh trong các buổi hội thảo nhóm.",
      image: "/images/placeholder-kit.svg",
      href: "/product/community-activity-kit",
    },
  ],
};

// ============================================================
// SITE NAVIGATION — Edit menu items here
// ============================================================
export const mainMenu = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/shop" },
  { label: "Tải miễn phí", href: "/free-downloads" },
];

export const helpMenu = [
  { label: "Chính sách bảo mật", href: "/privacy-policy" },
  { label: "Thời gian xử lý đơn hàng", href: "/order-turnaround-time" },
  { label: "Biểu mẫu liên hệ", href: "/contact" },
];

// ============================================================
// FOOTER — Edit address / contact info here
// ============================================================
export const footerInfo = {
  brandName: "Cửa hàng Physicians Committee",
  address: "5100 Wisconsin Avenue, NW, Suite 400",
  city: "Washington, DC 20016",
  phone: "Điện thoại: 202-527-7306",
  email: "fulfillment@PCRM.org",
  copyright: `© ${new Date().getFullYear()} Physicians Committee for Responsible Medicine. Đã đăng ký bản quyền.`,
};
