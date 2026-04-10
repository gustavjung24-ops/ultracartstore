import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy-policy",
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật của website Y học lành mạnh.",
  type: "website",
  language: "vi",
});

const breadcrumbs = [
  { label: "Trang chá»§", href: "/" },
  { label: "Trá»£ giÃºp", href: "#" },
  { label: "ChÃ­nh sÃ¡ch báº£o máº­t" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-brand-teal text-3xl font-semibold leading-tight pb-3 mb-6 border-b border-gray-200">
            ChÃ­nh sÃ¡ch báº£o máº­t
          </h1>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <p>
              Y há»c lÃ nh máº¡nh cam káº¿t báº£o vá»‡ quyá»n riÃªng tÆ° cá»§a báº¡n. ChÃ­nh sÃ¡ch nÃ y mÃ´ táº£ cÃ¡ch
              chÃºng tÃ´i thu tháº­p, sá»­ dá»¥ng vÃ  báº£o vá»‡ thÃ´ng tin cÃ¡ nhÃ¢n khi báº¡n sá»­ dá»¥ng website.
            </p>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                1. ThÃ´ng tin chÃºng tÃ´i thu tháº­p
              </h2>
              <p>
                Khi báº¡n liÃªn há»‡ vá»›i chÃºng tÃ´i hoáº·c gá»­i cÃ¢u há»i, chÃºng tÃ´i cÃ³ thá»ƒ thu tháº­p:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Há» tÃªn vÃ  Ä‘á»‹a chá»‰ email</li>
                <li>Sá»‘ Ä‘iá»‡n thoáº¡i (náº¿u báº¡n cung cáº¥p)</li>
                <li>Ná»™i dung tin nháº¯n hoáº·c cÃ¢u há»i</li>
                <li>ThÃ´ng tin Ä‘Æ¡n hÃ ng khi mua sáº£n pháº©m</li>
              </ul>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                2. CÃ¡ch chÃºng tÃ´i sá»­ dá»¥ng thÃ´ng tin
              </h2>
              <p>ThÃ´ng tin cá»§a báº¡n Ä‘Æ°á»£c sá»­ dá»¥ng Ä‘á»ƒ:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Xá»­ lÃ½ vÃ  hoÃ n thÃ nh Ä‘Æ¡n hÃ ng</li>
                <li>Pháº£n há»“i cÃ¢u há»i vÃ  yÃªu cáº§u há»— trá»£</li>
                <li>Cáº£i thiá»‡n dá»‹ch vá»¥ vÃ  sáº£n pháº©m cá»§a chÃºng tÃ´i</li>
                <li>Gá»­i thÃ´ng tin liÃªn quan Ä‘áº¿n Ä‘Æ¡n hÃ ng (náº¿u cáº§n)</li>
              </ul>
              <p className="mt-2">
                ChÃºng tÃ´i <strong>khÃ´ng bÃ¡n, cho thuÃª hoáº·c chia sáº»</strong> thÃ´ng tin cÃ¡ nhÃ¢n cá»§a
                báº¡n vá»›i bÃªn thá»© ba ngoÃ i má»¥c Ä‘Ã­ch hoÃ n thÃ nh Ä‘Æ¡n hÃ ng.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                3. Báº£o máº­t thÃ´ng tin
              </h2>
              <p>
                ChÃºng tÃ´i Ã¡p dá»¥ng cÃ¡c biá»‡n phÃ¡p ká»¹ thuáº­t vÃ  tá»• chá»©c phÃ¹ há»£p Ä‘á»ƒ báº£o vá»‡ thÃ´ng tin
                cá»§a báº¡n khá»i truy cáº­p trÃ¡i phÃ©p, máº¥t mÃ¡t hoáº·c tiáº¿t lá»™.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                4. Cookie vÃ  lÆ°u lÆ°á»£ng truy cáº­p
              </h2>
              <p>
                Website cÃ³ thá»ƒ sá»­ dá»¥ng cookie Ä‘á»ƒ cáº£i thiá»‡n tráº£i nghiá»‡m ngÆ°á»i dÃ¹ng. Báº¡n cÃ³ thá»ƒ
                táº¯t cookie trong cÃ i Ä‘áº·t trÃ¬nh duyá»‡t, tuy nhiÃªn má»™t sá»‘ tÃ­nh nÄƒng cÃ³ thá»ƒ bá»‹ áº£nh hÆ°á»Ÿng.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                5. LiÃªn káº¿t bÃªn ngoÃ i
              </h2>
              <p>
                Website cÃ³ thá»ƒ chá»©a liÃªn káº¿t Ä‘áº¿n cÃ¡c trang web cá»§a bÃªn thá»© ba. ChÃºng tÃ´i khÃ´ng
                chá»‹u trÃ¡ch nhiá»‡m vá» chÃ­nh sÃ¡ch báº£o máº­t cá»§a cÃ¡c trang Ä‘Ã³.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                6. LiÃªn há»‡
              </h2>
              <p>
                Náº¿u báº¡n cÃ³ cÃ¢u há»i vá» chÃ­nh sÃ¡ch báº£o máº­t, vui lÃ²ng liÃªn há»‡:
              </p>
              <address className="not-italic mt-2 space-y-1">
                <p>Physicians Committee for Responsible Medicine</p>
                <p>5100 Wisconsin Avenue, NW, Suite 400</p>
                <p>Washington, DC 20016</p>
                <p>
                  <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline">
                    fulfillment@PCRM.org
                  </a>
                </p>
                <p>
                  <a href="tel:+12025277306" className="text-brand-teal hover:underline">
                    202-527-7306
                  </a>
                </p>
              </address>
            </section>

            <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
              ChÃ­nh sÃ¡ch nÃ y cÅ©ng Ä‘Æ°á»£c Ä‘Äƒng táº£i táº¡i{" "}
              <a
                href="https://www.pcrm.org/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal hover:underline"
              >
                pcrm.org/privacy-policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

