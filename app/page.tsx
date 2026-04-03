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
      <main className="pb-12 md:pb-16">
        <section className="mx-auto max-w-7xl px-4 pt-3 md:px-6 md:pt-5">
          <div className="overflow-hidden rounded-[34px] border border-[#cad8df] bg-white shadow-[0_18px_44px_rgba(15,35,45,0.16)]">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[260px] bg-[#dce8ee] md:min-h-[500px]">
                <Image
                  src="/images/pig-in-grass.jpg"
                  alt={lang === "vi" ? "Chú heo trên bãi cỏ" : "Pig in grass"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center bg-[radial-gradient(circle_at_top_left,#1f7390_0%,#0f5c73_58%,#0c4a5e_100%)] px-5 py-8 text-white md:px-10 md:py-14">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ddbb83]">
                    {lang === "vi" ? "CHIẾN THẮNG!" : "VICTORY!"}
                  </p>
                  <h1 className="home-hero-title mt-2.5 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:mt-3 md:text-5xl">
                    {lang === "vi"
                      ? "Đại học Brown dừng chương trình huấn luyện gây chết người!"
                      : "Brown University Halts Deadly Training Exercise!"}
                  </h1>
                  <p className="home-hero-copy mt-4 max-w-xl text-base leading-8 text-slate-100 md:mt-5 md:text-lg">
                    {lang === "vi"
                      ? "Cập nhật mới từ chiến dịch khoa học đạo đức của Physicians Committee."
                      : "Latest win from the Physicians Committee's ethical science campaign."}
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Link
                      href="https://act.pcrm.org/a/victory-brown-university"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/45 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white no-underline transition hover:bg-white/10 md:px-7 md:py-3 md:text-sm"
                    >
                      {lang === "vi" ? "Tìm hiểu thêm" : "Learn More"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-12 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {lang === "vi" ? "Tin tức và Sự kiện" : "News and Events"}
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.path} className="smooth-card rounded-2xl">
                {post.images[0]?.src ? (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl md:h-52">
                    <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-4 md:p-5">
                  <h3 className="home-card-title line-clamp-2 text-xl font-bold leading-tight text-slate-900">
                    {lang === "vi"
                      ? post.h1_vi?.[0] || post.title_vi || post.h1[0] || post.title
                      : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                  </h3>
                  <p className="home-card-copy mt-2.5 line-clamp-3 text-sm leading-7 text-slate-600 md:mt-3">
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

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {lang === "vi" ? "Tin theo Chuyên mục" : "Topic Highlights"}
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {sectionHighlights.map((section) => (
              <article key={section.href} className="smooth-card rounded-2xl p-4 md:p-6">
                <h3 className="home-card-title text-xl font-bold text-slate-900">{section.title}</h3>
                <p className="home-card-copy mt-2.5 text-sm leading-7 text-slate-600 md:mt-3">{section.summary}</p>
                <div className="mt-3.5 space-y-2 md:mt-4">
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

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <div className="smooth-surface grid items-center gap-6 rounded-3xl p-5 md:gap-8 md:p-10 md:grid-cols-2">
            <div>
              <h2 className="home-section-title text-3xl font-bold text-[#0f5c73] md:text-4xl">
                {lang === "vi" ? "40 Năm Tác Động" : "40 Years of Impact"}
              </h2>
              <p className="home-hero-copy mt-3 text-base leading-8 text-slate-700 md:mt-4 md:text-lg">
                {lang === "vi"
                  ? home.paragraphs_vi?.[3] || home.paragraphs_en?.[3] || home.paragraphs[3] || "40 năm thúc đẩy y học dự phòng."
                  : home.paragraphs_en?.[3] || home.paragraphs[3] || "For 40 years, advancing preventive medicine."}
              </p>
              <Link
                href="/about-us"
                className="mt-5 inline-block rounded-full bg-[#0f5c73] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white no-underline hover:opacity-90 md:mt-6 md:py-3 md:text-sm"
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

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {lang === "vi" ? "Bài viết mới nhất" : "Latest Stories"}
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.path} className="smooth-card rounded-2xl">
                {post.images[0]?.src ? (
                  <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
                    <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="home-card-title line-clamp-2 text-base font-bold text-gray-900">
                    {lang === "vi"
                      ? post.h1_vi?.[0] || post.title_vi || post.h1_en?.[0] || post.h1[0] || post.title
                      : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                  </h3>
                  <p className="home-card-copy mt-2 line-clamp-3 text-sm text-gray-600">
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

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#0f5c73] to-[#123847] px-5 py-8 text-center text-white md:px-12 md:py-10">
            <h2 className="home-section-title text-3xl font-bold md:text-4xl">
              {lang === "vi" ? "Ủng hộ sứ mệnh của chúng tôi" : "Support Our Mission"}
            </h2>
            <p className="home-hero-copy mx-auto mt-3 max-w-3xl text-slate-200 md:mt-4">
              {lang === "vi"
                ? home.paragraphs_vi?.[4] || home.paragraphs[4] || "Đồng hành cùng chúng tôi trong y học dự phòng và nghiên cứu đạo đức."
                : home.paragraphs_en?.[4] || home.paragraphs[4] || "Join us in preventive medicine and ethical science."}
            </p>
            <div className="mt-5 md:mt-6">
              <Link href="/about-us/our-victories" className="inline-block rounded-full border border-white/40 px-7 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 no-underline md:px-8 md:py-3 md:text-sm">
                {lang === "vi" ? "Xem thành tựu" : "See Our Victories"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
