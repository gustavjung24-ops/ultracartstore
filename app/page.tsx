import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPages, getPcrmPageByPath } from "@/lib/pcrm-content";

export default async function HomePage() {
  const lang = (await cookies()).get("site_lang")?.value === "vi" ? "vi" : "en";
  const home = getPcrmPageByPath("/");
  const blog = getBlogPages().slice(0, 9);
  const featuredPosts = blog.slice(0, 3);
  const latestPosts = blog.slice(0, 6);

  if (!home) return null;

  const heroImage = home.images[0]?.src;
  const healthAndNutritionPosts = blog.filter((post) => post.path.includes("/news/health-nutrition/")).slice(0, 2);
  const innovativeSciencePosts = blog.filter((post) => post.path.includes("/news/innovative-science/")).slice(0, 2);
  const scienceDigestPosts = blog.filter((post) => post.path.includes("/news/good-science-digest/")).slice(0, 2);

  const sectionHighlights = [
    {
      href: "/news/health-nutrition",
      title: lang === "vi" ? "Sức khỏe và Dinh dưỡng" : "Health and Nutrition",
      summary:
        lang === "vi"
          ? home.paragraphs_vi?.[6] || home.paragraphs_vi?.[5] || home.paragraphs[6] || home.paragraphs[5]
          : home.paragraphs_en?.[6] || home.paragraphs_en?.[5] || home.paragraphs[6] || home.paragraphs[5],
      posts: healthAndNutritionPosts,
    },
    {
      href: "/news/innovative-science-news",
      title: lang === "vi" ? "Khoa học Đổi mới" : "Innovative Science News",
      summary:
        lang === "vi"
          ? home.paragraphs_vi?.[8] || home.paragraphs_vi?.[7] || home.paragraphs[8] || home.paragraphs[7]
          : home.paragraphs_en?.[8] || home.paragraphs_en?.[7] || home.paragraphs[8] || home.paragraphs[7],
      posts: innovativeSciencePosts,
    },
    {
      href: "/news/good-science-digest",
      title: lang === "vi" ? "Bản tin Khoa học" : "Good Science Digest",
      summary:
        lang === "vi"
          ? "Cập nhật ngắn gọn, dễ hiểu và đáng tin cậy cho cộng đồng quan tâm sức khỏe."
          : "Short, practical science updates curated for readers and clinicians.",
      posts: scienceDigestPosts,
    },
  ];

  return (
    <>
      <Header />
      <main className="pb-16">
        <section className="mx-auto max-w-7xl px-4 pt-5 md:px-6">
          <div className="rounded-2xl border border-[#d8e0e5] bg-white px-4 py-4 shadow-sm md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0f5c73]">
                  {lang === "vi" ? "Chiến dịch thành viên 2026" : "2026 Membership Campaign"}
                </p>
                <p className="mt-1 text-sm text-slate-700 md:text-base">
                  {lang === "vi"
                    ? home.paragraphs_vi?.[0] || home.paragraphs[0] || "Hãy trao tặng món quà thành viên năm 2026 ngay hôm nay."
                    : home.paragraphs_en?.[0] || home.paragraphs[0] || "Make your 2026 membership gift today."}
                </p>
              </div>
              <Link
                href="/donate"
                className="inline-block rounded-full bg-[#c89d59] px-6 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#17232d] no-underline transition hover:bg-[#ddbb83] md:text-sm"
              >
                {lang === "vi" ? "Ủng hộ ngay" : "Give Now"}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-4 max-w-7xl px-4 md:px-6">
          <div className="overflow-hidden rounded-3xl border border-[#cad8df] bg-white shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#0f5c73] px-6 py-10 text-white md:px-10 md:py-14">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ddbb83]">
                  {lang === "vi" ? "Y học dự phòng từ 1985" : "Preventive Medicine Since 1985"}
                </p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-5xl">
                  {lang === "vi"
                    ? home.title_vi || home.h1_vi?.[0] || home.title
                    : home.title_en || home.h1_en?.[0] || home.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-100 md:text-lg">
                  {lang === "vi" ? home.description_vi || home.description : home.description_en || home.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/donate"
                    className="rounded-full bg-[#c89d59] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#17232d] no-underline transition hover:bg-[#ddbb83]"
                  >
                    {lang === "vi" ? "Quyên góp hôm nay" : "Donate Today"}
                  </Link>
                  <Link
                    href="/ways-to-give"
                    className="rounded-full border border-white/45 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white no-underline transition hover:bg-white/10"
                  >
                    {lang === "vi" ? "Các cách ủng hộ" : "Ways to Give"}
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[260px] bg-[#dce8ee] md:min-h-[500px]">
                {heroImage ? (
                  <Image src={heroImage} alt="Hero" fill className="object-cover" priority unoptimized />
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold text-[#0f5c73] md:text-4xl">
            {lang === "vi" ? "Tin tức và Sự kiện" : "News and Events"}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.path} className="rounded-2xl border border-[#d5dce2] bg-white shadow-sm transition hover:shadow-md">
                {post.images[0]?.src ? (
                  <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                    <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-5">
                  <h3 className="line-clamp-2 text-xl font-bold leading-tight text-slate-900">
                    {lang === "vi"
                      ? post.h1_vi?.[0] || post.title_vi || post.h1[0] || post.title
                      : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                    {lang === "vi"
                      ? post.paragraphs_vi?.[0] || post.description_vi || post.paragraphs[0] || post.description
                      : post.paragraphs_en?.[0] || post.paragraphs[0] || post.description_en || post.description}
                  </p>
                  <Link href={post.path} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline hover:underline">
                    {lang === "vi" ? "Đọc thêm" : "Read More"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold text-[#0f5c73] md:text-4xl">
            {lang === "vi" ? "Tin theo Chuyên mục" : "Topic Highlights"}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {sectionHighlights.map((section) => (
              <article key={section.href} className="rounded-2xl border border-[#d5dce2] bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{section.summary}</p>
                <div className="mt-4 space-y-2">
                  {section.posts.map((post) => (
                    <Link key={post.path} href={post.path} className="block text-sm font-semibold text-[#0f5c73] no-underline hover:underline">
                      {lang === "vi"
                        ? post.h1_vi?.[0] || post.title_vi || post.h1[0] || post.title
                        : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                    </Link>
                  ))}
                </div>
                <Link href={section.href} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline hover:underline">
                  {lang === "vi" ? "Xem chuyên mục" : "Open Section"}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 rounded-3xl border border-[#d5dce2] bg-white p-7 md:grid-cols-2 md:p-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0f5c73] md:text-4xl">
                {lang === "vi" ? "40 Năm Tác Động" : "40 Years of Impact"}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
                {lang === "vi"
                  ? home.paragraphs_vi?.[3] || home.paragraphs_en?.[3] || home.paragraphs[3] || "40 năm thúc đẩy y học dự phòng."
                  : home.paragraphs_en?.[3] || home.paragraphs[3] || "For 40 years, advancing preventive medicine."}
              </p>
              <Link
                href="/about-us"
                className="mt-6 inline-block rounded-full bg-[#0f5c73] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white no-underline hover:opacity-90"
              >
                {lang === "vi" ? "Tìm hiểu thêm" : "Learn More"}
              </Link>
            </div>
            {home.images[1]?.src ? (
              <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-100 md:h-80">
                <Image src={home.images[1].src} alt="Impact" fill className="object-cover" unoptimized />
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold text-[#0f5c73] md:text-4xl">
            {lang === "vi" ? "Bài viết mới nhất" : "Latest Stories"}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.path} className="rounded-2xl border border-[#d5dce2] bg-white shadow-sm transition hover:shadow-md">
                {post.images[0]?.src ? (
                  <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
                    <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="line-clamp-2 text-base font-bold text-gray-900">
                    {lang === "vi"
                      ? post.h1_vi?.[0] || post.title_vi || post.h1_en?.[0] || post.h1[0] || post.title
                      : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {lang === "vi"
                      ? post.paragraphs_vi?.[0] || post.description_vi || post.paragraphs_en?.[0] || post.paragraphs[0] || post.description
                      : post.paragraphs_en?.[0] || post.paragraphs[0] || post.description_en || post.description}
                  </p>
                  <Link href={post.path} className="mt-3 inline-block text-sm font-semibold text-[#0f5c73] hover:underline">
                    {lang === "vi" ? "Đọc thêm" : "Read More"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#0f5c73] to-[#123847] px-6 py-10 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              {lang === "vi" ? "Ủng hộ sứ mệnh của chúng tôi" : "Support Our Mission"}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-200">
              {lang === "vi"
                ? home.paragraphs_vi?.[4] || home.paragraphs[4] || "Đồng hành cùng chúng tôi trong y học dự phòng và nghiên cứu đạo đức."
                : home.paragraphs_en?.[4] || home.paragraphs[4] || "Join us in preventive medicine and ethical science."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/donate" className="inline-block rounded-full bg-[#c89d59] px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#17232d] transition hover:bg-[#ddbb83] no-underline">
                {lang === "vi" ? "Quyên góp" : "Donate"}
              </Link>
              <Link href="/ways-to-give" className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 no-underline">
                {lang === "vi" ? "Các cách ủng hộ" : "Ways to Give"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
