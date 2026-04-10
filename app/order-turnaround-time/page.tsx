import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/order-turnaround-time",
  title: "Thời gian xử lý đơn hàng",
  description: "Thông tin về thời gian xử lý và giao hàng trên website Y học lành mạnh.",
  type: "website",
  language: "vi",
});

const breadcrumbs = [
  { label: "Trang chá»§", href: "/" },
  { label: "Trá»£ giÃºp", href: "#" },
  { label: "Thá»i gian xá»­ lÃ½ Ä‘Æ¡n hÃ ng" },
];

export default function OrderTurnaroundPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-brand-teal text-3xl font-semibold leading-tight pb-3 mb-6 border-b border-gray-200">
            Thá»i gian xá»­ lÃ½ Ä‘Æ¡n hÃ ng
          </h1>

          <div className="space-y-8 text-sm text-gray-600">

            {/* Tá»•ng quan */}
            <section className="bg-brand-teal/10 border border-brand-teal/30 p-5 rounded">
              <p className="font-semibold text-brand-dark mb-1">ThÃ´ng thÆ°á»ng:</p>
              <p>
                ÄÆ¡n hÃ ng Ä‘Æ°á»£c xá»­ lÃ½ vÃ  giao Ä‘áº¿n Ä‘á»‹a chá»‰ trÃªn toÃ n quá»‘c trong vÃ²ng{" "}
                <strong>7â€“10 ngÃ y lÃ m viá»‡c</strong> ká»ƒ tá»« ngÃ y xÃ¡c nháº­n Ä‘áº·t hÃ ng.
              </p>
            </section>

            {/* Quy trÃ¬nh */}
            <section>
              <h2 className="text-brand-dark font-bold text-base mb-3 pb-1 border-b border-gray-100">
                Quy trÃ¬nh xá»­ lÃ½ Ä‘Æ¡n hÃ ng
              </h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>XÃ¡c nháº­n Ä‘Æ¡n hÃ ng (1â€“2 ngÃ y lÃ m viá»‡c):</strong> Sau khi nháº­n Ä‘Æ°á»£c yÃªu
                  cáº§u qua WhatsApp, Zalo hoáº·c Ä‘iá»‡n thoáº¡i, nhÃ¢n viÃªn sáº½ xÃ¡c nháº­n Ä‘áº·t hÃ ng vÃ 
                  thÃ´ng bÃ¡o lá»‹ch giao.
                </li>
                <li>
                  <strong>Chuáº©n bá»‹ vÃ  Ä‘Ã³ng gÃ³i (1â€“3 ngÃ y lÃ m viá»‡c):</strong> Kiá»ƒm tra kho,
                  Ä‘Ã³ng gÃ³i sáº£n pháº©m cáº©n tháº­n vÃ  bÃ n giao cho Ä‘Æ¡n vá»‹ váº­n chuyá»ƒn.
                </li>
                <li>
                  <strong>Váº­n chuyá»ƒn (3â€“5 ngÃ y lÃ m viá»‡c):</strong> Thá»i gian giao hÃ ng tÃ¹y
                  thuá»™c vÃ o khu vá»±c Ä‘á»‹a lÃ½ vÃ  Ä‘Æ¡n vá»‹ váº­n chuyá»ƒn.
                </li>
              </ol>
            </section>

            {/* ÄÆ¡n sá»‘ lÆ°á»£ng lá»›n */}
            <section>
              <h2 className="text-brand-dark font-bold text-base mb-3 pb-1 border-b border-gray-100">
                ÄÆ¡n hÃ ng sá»‘ lÆ°á»£ng lá»›n
              </h2>
              <p className="mb-2">
                Vá»›i Ä‘Æ¡n hÃ ng tá»« <strong>100 sáº£n pháº©m trá»Ÿ lÃªn</strong>, thá»i gian xá»­ lÃ½ cÃ³ thá»ƒ
                kÃ©o dÃ i hÆ¡n (10â€“15 ngÃ y lÃ m viá»‡c). Vui lÃ²ng liÃªn há»‡ trÆ°á»›c Ä‘á»ƒ Ä‘Æ°á»£c sáº¯p xáº¿p phÃ¹ há»£p.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="https://wa.me/12025277306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 text-sm transition-colors"
                >
                  ðŸ’¬ Nháº¯n WhatsApp
                </a>
                <a
                  href="tel:+12025277306"
                  className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-mid text-white font-semibold py-2 px-5 text-sm transition-colors"
                >
                  ðŸ“ž Gá»i ngay
                </a>
              </div>
            </section>

            {/* Theo dÃµi Ä‘Æ¡n hÃ ng */}
            <section>
              <h2 className="text-brand-dark font-bold text-base mb-3 pb-1 border-b border-gray-100">
                Theo dÃµi Ä‘Æ¡n hÃ ng
              </h2>
              <p>
                Sau khi Ä‘Æ¡n hÃ ng Ä‘Æ°á»£c giao cho Ä‘Æ¡n vá»‹ váº­n chuyá»ƒn, chÃºng tÃ´i sáº½ gá»­i mÃ£ theo dÃµi
                qua tin nháº¯n hoáº·c email. Báº¡n cÃ³ thá»ƒ liÃªn há»‡{" "}
                <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline">
                  fulfillment@PCRM.org
                </a>{" "}
                Ä‘á»ƒ há»i thÃªm thÃ´ng tin vá» tÃ¬nh tráº¡ng Ä‘Æ¡n hÃ ng.
              </p>
            </section>

            {/* CÃ¢u há»i */}
            <section className="bg-gray-50 border border-gray-200 p-5 rounded">
              <p className="font-semibold text-gray-700 mb-2">CÃ³ cÃ¢u há»i?</p>
              <p>
                LiÃªn há»‡ chÃºng tÃ´i qua{" "}
                <a href="tel:+12025277306" className="text-brand-teal hover:underline font-medium">
                  202-527-7306
                </a>{" "}
                hoáº·c email{" "}
                <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline font-medium">
                  fulfillment@PCRM.org
                </a>
                . Äá»™i ngÅ© há»— trá»£ lÃ m viá»‡c tá»« thá»© Hai Ä‘áº¿n thá»© SÃ¡u, 9:00â€“17:00 (giá» miá»n ÄÃ´ng Hoa Ká»³).
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

