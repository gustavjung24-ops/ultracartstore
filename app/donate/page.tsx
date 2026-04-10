import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

export const metadata: Metadata = buildPageMetadata({
  path: "/donate",
  title: "Site Information",
  description: "Thông tin phạm vi nội dung và định hướng biên tập của website Y học lành mạnh.",
  type: "website",
  language: "vi",
});

export default async function SiteInformationPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const copy =
    lang === "en"
      ? {
          title: "Site Information",
          lead: "This website is an educational reference focused on preventive medicine, plant-based nutrition, and ethical science.",
          cardTitle: "Educational scope",
          cardBody:
            "Public-facing fundraising and store prompts have been removed so the site can stay focused on health resources, research context, and academic reading.",
        }
      : {
          title: "Thông tin website",
          lead: "Website này là nguồn tham khảo giáo dục, tập trung vào y học dự phòng, dinh dưỡng thực vật và khoa học có đạo đức.",
          cardTitle: "Phạm vi nội dung",
          cardBody:
            "Các lời kêu gọi quyên góp và nội dung kiểu cửa hàng đã được loại khỏi giao diện công khai để website giữ đúng định hướng học thuật và tài liệu sức khỏe.",
        };

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <span>{copy.title}</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{copy.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{copy.lead}</p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">{copy.cardTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{copy.cardBody}</p>
        </section>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
