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

  if (!home) return null;

  const heroImage = home.images[0]?.src;

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Hero"
              fill
              className="object-cover opacity-30"
              priority
              unoptimized
            />
          )}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {lang === "vi"
                  ? home.title_vi || home.h1_vi?.[0] || home.title
                  : home.title_en || home.h1_en?.[0] || home.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                {lang === "vi" ? home.description_vi || home.description : home.description_en || home.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/donate" className="bg-[#f0ad4e] hover:bg-[#ec971f] text-gray-900 font-bold px-8 py-3 rounded-md transition">
                  {lang === "vi" ? "💝 Quyên góp hôm nay" : "💝 Gift Today"}
                </Link>
                <Link href="/news/blog" className="border-2 border-white text-white font-bold px-8 py-3 rounded-md hover:bg-white/10 transition">
                  {lang === "vi" ? "📰 Tin tức" : "📰 News"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#007fab] mb-4">{lang === "vi" ? "40 Năm Tác Động" : "40 Years"}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {lang === "vi"
                  ? home.paragraphs_vi?.[3] || home.paragraphs_en?.[3] || home.paragraphs[3] || "40 năm thúc đẩy y học dự phòng."
                  : home.paragraphs_en?.[3] || home.paragraphs[3] || "For 40 years, advancing preventive medicine."}
              </p>
              <div className="flex gap-4">
                <Link href="/about-us" className="bg-[#007fab] text-white font-bold px-6 py-2 rounded-md hover:opacity-90 transition">
                  {lang === "vi" ? "Tìm hiểu thêm" : "Learn More"}
                </Link>
              </div>
            </div>
            {home.images[1]?.src && (
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image src={home.images[1].src} alt="Impact" fill className="object-cover" unoptimized />
              </div>
            )}
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-[#007fab] mb-8">{lang === "vi" ? "Tin tức & Sự kiện" : "News & Events"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blog.slice(0, 9).map((post) => (
                <article key={post.path} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md">
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
                    <Link href={post.path} className="text-[#007fab] font-semibold text-sm hover:underline">
                      {lang === "vi" ? "Đọc thêm" : "Read More"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#007fab] to-blue-700 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{lang === "vi" ? "Ủng hộ sứ mệnh của chúng tôi" : "Support Our Mission"}</h2>
            <Link href="/donate" className="inline-block bg-[#f0ad4e] text-gray-900 font-bold px-8 py-3 rounded-md hover:bg-[#ec971f] transition">
              {lang === "vi" ? "💝 Quyên góp" : "💝 Donate"}
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
