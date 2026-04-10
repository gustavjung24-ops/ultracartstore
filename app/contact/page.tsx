import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactFormClient from "@/components/ContactFormClient";
import { buildPageMetadata } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Liên hệ",
  description: "Thông tin liên hệ và biểu mẫu hỗ trợ của Y học lành mạnh.",
  type: "website",
  language: "vi",
});

export default async function ContactPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const contactUi = locale.contactPage;
  const breadcrumbs = [
    { label: locale.common.home, href: "/" },
    { label: locale.common.support },
    { label: contactUi.title },
  ];

  return (
    <>
      <Header initialLanguage={lang} />
      <Breadcrumbs items={breadcrumbs} ariaLabel={locale.breadcrumbs.ariaLabel} />
      <ContactFormClient contactUi={contactUi} />

      <Footer initialLanguage={lang} />
    </>
  );
}
