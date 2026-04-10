import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/donate",
  title: "Support Information",
  description: "Thông tin hỗ trợ và phạm vi sử dụng của website Y học lành mạnh.",
  type: "website",
  language: "vi",
});

export default function DonatePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Support Information</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          This website is a supporting reference resource and does not accept donations.
        </p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">No donation processing on this site</h2>
          <p className="mt-2 text-sm text-slate-600">
            We have removed fundraising prompts to avoid confusion. You can continue exploring health resources,
            research information, and educational content on this site.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
