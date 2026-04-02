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
  title: "Building Healthy Communities Brochure",
  price: "$0.15",
  sku: "BHCOM-100",
  shortDescription:
    "The Building Healthy Communities (BHC) brochure is a two-page resource for leaders to share. It highlights the BHC mission, benefits, and how to join—helping grow your group and community.",
  contactNote: "Contact us to request this resource",
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
      title: "BHC Pod Leader Guide",
      description:
        "A comprehensive guide for pod leaders to organize and run effective community health sessions.",
      image: "/images/placeholder-guide.svg",
      href: "/product/bhc-pod-leader-guide",
    },
    {
      id: "bhc-recipe-book",
      title: "Healthy Eating Recipe Book",
      description:
        "Plant-based recipes and nutrition tips curated for community wellness programs.",
      image: "/images/placeholder-recipe.svg",
      href: "/product/healthy-eating-recipe-book",
    },
    {
      id: "bhc-activity-kit",
      title: "Community Activity Kit",
      description:
        "Ready-to-use activities and worksheets for facilitating healthy lifestyle workshops.",
      image: "/images/placeholder-kit.svg",
      href: "/product/community-activity-kit",
    },
  ],
};

// ============================================================
// SITE NAVIGATION — Edit menu items here
// ============================================================
export const mainMenu = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Free Downloads", href: "/free-downloads" },
];

export const helpMenu = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Order Turnaround Time", href: "/order-turnaround-time" },
  { label: "Contact Form", href: "/contact" },
];

// ============================================================
// FOOTER — Edit address / contact info here
// ============================================================
export const footerInfo = {
  brandName: "Physicians Committee Shop",
  address: "5100 Wisconsin Avenue, NW, Suite 400",
  city: "Washington, DC 20016",
  phone: "ph. 202-527-7306",
  email: "fulfillment@PCRM.org",
  copyright: `© ${new Date().getFullYear()} Physicians Committee for Responsible Medicine. All rights reserved.`,
};
