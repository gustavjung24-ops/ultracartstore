import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DonatePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Donate</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Hỗ trợ sứ mệnh về y học dự phòng, nghiên cứu lâm sàng và chuẩn mực đạo đức trong đào tạo y khoa.
        </p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Ủng hộ qua PayPal</h2>
          <p className="mt-2 text-sm text-slate-600">
            Nhấn nút bên dưới để chuyển tới PayPal và hoàn tất quyên góp an toàn.
          </p>
          <a
            href="https://www.paypal.com/donate"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded bg-[#0070ba] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#005f9f]"
          >
            Donate with PayPal
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
