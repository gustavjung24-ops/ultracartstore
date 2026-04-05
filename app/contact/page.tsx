import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactFormClient from "@/components/ContactFormClient";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

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
      <Breadcrumbs items={breadcrumbs} />
      <ContactFormClient contactUi={contactUi} />

      <Footer initialLanguage={lang} />
    </>
  );
}
