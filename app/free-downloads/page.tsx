import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/free-downloads",
  title: "Tải miễn phí",
  description: "Tải miễn phí tài liệu giáo dục sức khỏe dựa trên bằng chứng.",
  type: "website",
  language: "vi",
});

const breadcrumbs = [
  { label: "Trang chá»§", href: "/" },
  { label: "Táº£i miá»…n phÃ­" },
];

const freeResources = [
  {
    id: "pcrm-kickstart",
    title: "ChÆ°Æ¡ng trÃ¬nh Kickstart 21 ngÃ y",
    description:
      "HÆ°á»›ng dáº«n tá»«ng bÆ°á»›c trong 21 ngÃ y Ä‘á»ƒ chuyá»ƒn sang cháº¿ Ä‘á»™ Äƒn thá»±c váº­t. KÃ¨m thá»±c Ä‘Æ¡n máº«u, máº¹o mua sáº¯m vÃ  cÃ´ng thá»©c náº¥u Äƒn Ä‘Æ¡n giáº£n.",
    type: "PDF",
    link: "https://pcrm.org/kickstart",
  },
  {
    id: "diabetes-starter",
    title: "HÆ°á»›ng dáº«n kiá»ƒm soÃ¡t tiá»ƒu Ä‘Æ°á»ng báº±ng cháº¿ Ä‘á»™ Äƒn thá»±c váº­t",
    description:
      "Tá»•ng há»£p báº±ng chá»©ng khoa há»c vÃ  hÆ°á»›ng dáº«n thá»±c tiá»…n giÃºp ngÆ°á»i máº¯c tiá»ƒu Ä‘Æ°á»ng loáº¡i 2 cáº£i thiá»‡n Ä‘Æ°á»ng huyáº¿t thÃ´ng qua Äƒn uá»‘ng Ä‘Ãºng cÃ¡ch.",
    type: "PDF",
    link: "https://pcrm.org/diabetes",
  },
  {
    id: "healthy-heart",
    title: "Cháº¿ Ä‘á»™ Äƒn báº£o vá»‡ tim máº¡ch",
    description:
      "Thá»±c pháº©m nÃªn Äƒn, thá»±c pháº©m nÃªn trÃ¡nh vÃ  káº¿ hoáº¡ch 4 tuáº§n Ä‘á»ƒ cáº£i thiá»‡n sá»©c khá»e tim máº¡ch â€” dá»±a trÃªn nghiÃªn cá»©u cá»§a Physicians Committee.",
    type: "PDF",
    link: "https://pcrm.org/heart",
  },
  {
    id: "cancer-prevention",
    title: "PhÃ²ng ngá»«a ung thÆ° qua Äƒn uá»‘ng",
    description:
      "PhÃ¢n tÃ­ch má»‘i liÃªn há»‡ giá»¯a cháº¿ Ä‘á»™ Äƒn vÃ  nguy cÆ¡ ung thÆ°, kÃ¨m khuyáº¿n nghá»‹ thá»±c tiá»…n dá»… Ã¡p dá»¥ng hÃ ng ngÃ y.",
    type: "PDF",
    link: "https://pcrm.org/cancer",
  },
  {
    id: "weight-loss-guide",
    title: "Giáº£m cÃ¢n bá»n vá»¯ng vá»›i thá»±c váº­t",
    description:
      "PhÆ°Æ¡ng phÃ¡p giáº£m cÃ¢n khÃ´ng tÃ­nh calo, khÃ´ng nhá»‹n Ä‘Ã³i â€” dá»±a trÃªn nguyÃªn lÃ½ máº­t Ä‘á»™ nÄƒng lÆ°á»£ng thá»±c pháº©m tá»« PCRM.",
    type: "PDF",
    link: "https://pcrm.org/weightloss",
  },
  {
    id: "pcrm-plate",
    title: "ÄÄ©a thá»©c Äƒn lÃ nh máº¡nh PCRM",
    description:
      "HÆ°á»›ng dáº«n trá»±c quan vá» tá»· lá»‡ cÃ¡c nhÃ³m thá»±c pháº©m trong má»™t bá»¯a Äƒn cÃ¢n báº±ng theo khuyáº¿n nghá»‹ cá»§a Physicians Committee.",
    type: "PDF",
    link: "https://pcrm.org/plate",
  },
];

export default function FreeDownloadsPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-4 border-b border-gray-200 uppercase tracking-wide">
          Táº£i miá»…n phÃ­
        </h1>
        <p className="text-gray-600 mb-8 text-sm leading-relaxed max-w-2xl">
          Y há»c lÃ nh máº¡nh cung cáº¥p miá»…n phÃ­ nhiá»u tÃ i liá»‡u giÃ¡o dá»¥c sá»©c khá»e dÆ°á»›i dáº¡ng PDF.
          Táº£i vá» vÃ  chia sáº» vá»›i cá»™ng Ä‘á»“ng, bá»‡nh nhÃ¢n hoáº·c nhá»¯ng ngÆ°á»i thÃ¢n mÃ  báº¡n yÃªu quÃ½.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeResources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-2 py-0.5 rounded uppercase flex-shrink-0 mt-0.5">
                  {res.type}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">{res.title}</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{res.description}</p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-mid text-white text-sm font-semibold py-2 px-4 transition-colors self-start"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Táº£i xuá»‘ng
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-brand-dark text-white p-6 rounded text-sm">
          <p className="font-semibold text-brand-teal mb-2">Muá»‘n tÃ i liá»‡u in sáºµn?</p>
          <p className="text-gray-300 mb-4">
            ChÃºng tÃ´i cÅ©ng cung cáº¥p tÃ i liá»‡u in sáºµn cháº¥t lÆ°á»£ng cao Ä‘á»ƒ phÃ¡t táº¡i sá»± kiá»‡n,
            phÃ²ng khÃ¡m vÃ  cá»™ng Ä‘á»“ng.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-brand-teal hover:bg-brand-mid text-white font-bold py-2 px-6 transition-colors"
          >
            Xem ná»™i dung
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

