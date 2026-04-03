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

  if (!home) return null;

  const heroImage = home.images[0]?.src;
  const healthAndNutritionPosts = blog.filter((post) => post.path.includes("/news/health-nutrition/")).slice(0, 2);
  const innovativeSciencePosts = blog.filter((post) => post.path.includes("/news/innovative-science/")).slice(0, 2);
  const scienceDigestPosts = blog.filter((post) => post.path.includes("/news/good-science-digest/")).slice(0, 2);

  const sectionHighlights = [
    {
      href: "/news/health-nutrition/plant-based-diets-reduce-risk-cancer",
      title: lang === "vi" ? "Tin Sức Khỏe và Dinh Dưỡng" : "Health and Nutrition News",
      summary:
        lang === "vi"
          ? home.paragraphs_vi?.[6] || home.paragraphs_vi?.[5] || home.paragraphs[6] || home.paragraphs[5]
          : home.paragraphs_en?.[6] || home.paragraphs_en?.[5] || home.paragraphs[6] || home.paragraphs[5],
      posts: healthAndNutritionPosts,
    },
    {
      href: "/news/innovative-science",
      title: lang === "vi" ? "Tin Khoa Học Đổi Mới" : "Innovative Science News",
      summary:
        lang === "vi"
          ? home.paragraphs_vi?.[8] || home.paragraphs_vi?.[7] || home.paragraphs[8] || home.paragraphs[7]
          : home.paragraphs_en?.[8] || home.paragraphs_en?.[7] || home.paragraphs[8] || home.paragraphs[7],
      posts: innovativeSciencePosts,
    },
    {
      href: "/news/good-science-digest",
      title: lang === "vi" ? "Bản Tin Khoa Học" : "Good Science Digest",
      summary:
        lang === "vi"
          ? "Cập nhật khoa học ngắn gọn, đáng tin cậy cho cộng đồng y tế và người đọc quan tâm sức khỏe."
          : "Curated science updates with practical takeaways for clinicians and readers.",
      posts: scienceDigestPosts,
    },
  ];

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-5 md:px-6">
          <section className="rounded-2xl border border-[#d5dce2] bg-white/90 px-5 py-4 shadow-sm backdrop-blur md:px-8">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
              <p className="text-sm font-semibold uppercase tracking-[0.09em] text-[#0f5c73]">
                {lang === "vi" ? "Chiến dịch thành viên 2026" : "2026 Membership Campaign"}
              </p>
              <p className="text-sm text-slate-700 md:text-base">
                {lang === "vi"
                  ? home.paragraphs_vi?.[0] || home.paragraphs[0] || "Hãy trao tặng món quà thành viên năm 2026 ngay hôm nay."
                  : home.paragraphs_en?.[0] || home.paragraphs[0] || "Make your 2026 membership gift today."}
              </p>
              <Link href="/donate" className="rounded-full bg-[#c89d59] px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#17232d] no-underline hover:bg-[#ddbb83] md:text-sm">
                {lang === "vi" ? "Ủng hộ ngay" : "Give Now"}
              </Link>
            </div>
          </section>
        </div>

        <section className="mx-auto mb-12 mt-2 flex max-w-7xl overflow-hidden rounded-[28px] bg-[#102c3a] md:min-h-[520px]">
          <div className="relative flex flex-1 items-center px-6 py-14 md:px-12">
            {heroImage && (
              <Image
                src={heroImage}
                alt="Hero"
                fill
                className="object-cover opacity-25"
                priority
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d2430] via-[#123847]/85 to-[#123847]/30" />
            <div className="relative z-10 max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ddbb83]">
                {lang === "vi" ? "Y học dự phòng từ 1985" : "Preventive Medicine Since 1985"}
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
                {lang === "vi"
                  ? home.title_vi || home.h1_vi?.[0] || home.title
                  : home.title_en || home.h1_en?.[0] || home.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                {lang === "vi" ? home.description_vi || home.description : home.description_en || home.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/donate" className="rounded-full bg-[#c89d59] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#17232d] no-underline transition hover:bg-[#ddbb83]">
                  {lang === "vi" ? "Quyên góp hôm nay" : "Donate Today"}
                </Link>
                <Link href="/ways-to-give" className="rounded-full border border-white/40 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white no-underline transition hover:bg-white/10">
                  {lang === "vi" ? "Các cách ủng hộ" : "Ways to Give"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 md:px-6 pb-14">
          <section className="grid gap-5 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.path} className="article-card bg-white border-[#d5dce2]">
                {post.images[0]?.src ? (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover transition duration-500 hover:scale-105" unoptimized />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.09em] text-[#0f5c73]">
                    {lang === "vi" ? "Bài viết nổi bật" : "Featured Story"}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {lang === "vi"
                      ? post.h1_vi?.[0] || post.title_vi || post.h1[0] || post.title
                      : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                    {lang === "vi"
                      ? post.paragraphs_vi?.[0] || post.description_vi || post.paragraphs[0] || post.description
                      : post.paragraphs_en?.[0] || post.paragraphs[0] || post.description_en || post.description}
                  </p>
                  <Link href={post.path} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline hover:underline">
                    {lang === "vi" ? "Xem bài" : "View story"}
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-14 grid grid-cols-1 items-center gap-10 rounded-2xl border border-[#d5dce2] bg-white p-8 md:grid-cols-2 md:p-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0f5c73] mb-4">{lang === "vi" ? "40 Năm Tác Động" : "40 Years of Impact"}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {lang === "vi"
                  ? home.paragraphs_vi?.[3] || home.paragraphs_en?.[3] || home.paragraphs[3] || "40 năm thúc đẩy y học dự phòng."
                  : home.paragraphs_en?.[3] || home.paragraphs[3] || "For 40 years, advancing preventive medicine."}
              </p>
              <div className="flex gap-4">
                <Link href="/about-us" className="rounded-full bg-[#0f5c73] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white hover:opacity-90 transition no-underline">
                  {lang === "vi" ? "Tìm hiểu thêm" : "Learn More"}
                </Link>
              </div>
            </div>
            {home.images[1]?.src && (
              <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg">
                <Image src={home.images[1].src} alt="Impact" fill className="object-cover" unoptimized />
              </div>
            )}
          </section>

          <section className="mt-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#0f5c73]">{lang === "vi" ? "Tin Theo Chuyên Mục" : "Topic Highlights"}</h2>
              <Link href="/news/blog" className="text-sm font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline hover:underline">
                {lang === "vi" ? "Xem tất cả" : "Browse All News"}
              </Link>
            </div>
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
                    {lang === "vi" ? "Xem chuyên mục" : "Open section"}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-20 mt-14">
            <h2 className="text-3xl font-bold text-[#0f5c73] mb-8">{lang === "vi" ? "Tin tức & Sự kiện" : "News & Events"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blog.slice(0, 9).map((post) => (
                <article key={post.path} className="bg-white rounded-2xl border border-[#d5dce2] shadow-sm hover:shadow-md">
                  {post.images[0]?.src && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover hover:scale-105 transition-transform" unoptimized />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-base font-bold text-gray-900 mb-2">
                      {lang === "vi"
                        ? post.h1_vi?.[0] || post.title_vi || post.h1_en?.[0] || post.h1[0] || post.title
                        : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-gray-600 mb-4">
                      {lang === "vi"
                        ? post.paragraphs_vi?.[0] || post.description_vi || post.paragraphs_en?.[0] || post.paragraphs[0] || post.description
                        : post.paragraphs_en?.[0] || post.paragraphs[0] || post.description_en || post.description}
                    </p>
                    <Link href={post.path} className="text-[#0f5c73] font-semibold text-sm hover:underline">
                      {lang === "vi" ? "Đọc thêm" : "Read More"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-gradient-to-r from-[#0f5c73] to-[#123847] p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{lang === "vi" ? "Ủng hộ sứ mệnh của chúng tôi" : "Support Our Mission"}</h2>
            <p className="mx-auto mb-7 max-w-3xl text-slate-200">
              {lang === "vi"
                ? home.paragraphs_vi?.[4] || home.paragraphs[4] || "Đồng hành cùng chúng tôi trong y học dự phòng và nghiên cứu đạo đức."
                : home.paragraphs_en?.[4] || home.paragraphs[4] || "Join us in preventive medicine and ethical science."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/donate" className="inline-block rounded-full bg-[#c89d59] px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#17232d] transition hover:bg-[#ddbb83] no-underline">
                {lang === "vi" ? "Quyên góp" : "Donate"}
              </Link>
              <Link href="/ways-to-give" className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 no-underline">
                {lang === "vi" ? "Các cách ủng hộ" : "Ways to Give"}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
