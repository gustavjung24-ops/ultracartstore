import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPages, getPcrmPageByPath } from "@/lib/pcrm-content";

export default function HomePage() {
  const home = getPcrmPageByPath("/");
  const blog = getBlogPages().slice(0, 6);

  if (!home) return null;

  const heroImage = home.images[0]?.src;

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero">
          {heroImage && (
            <Image
              src={heroImage}
              alt={home.h1[0] || home.title}
              fill
              className="absolute inset-0 object-cover opacity-15"
              priority
              unoptimized
            />
          )}
          <div className="hero-content">
            <h1 className="text-white font-serif">{home.h1[0] || home.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-100">{home.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/donate" className="btn btn-accent px-6 py-3 text-base font-bold">
                💝 Quyên góp ngay
              </Link>
              <Link href="/news/blog" className="btn btn-secondary text-white border-white px-6 py-3">
                📰 Tin tức & Sự kiện
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#005e86] font-serif">Về chúng tôi</h2>
              <p className="mt-4 text-gray-700 leading-8">
                Physicians Committee for Responsible Medicine là một tổ chức phi lợi nhuận lâu đời, cam kết thúc đẩy y học dự phòng, tiến hành nghiên cứu lâm sàng có tính đạo đức, và nâng cao tiêu chuẩn đào tạo y khoa.
              </p>
              <div className="mt-6 flex gap-4">
                <Link href="/about-us" className="btn btn-primary px-6 py-2">
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
            {home.images[1] && (
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={home.images[1].src}
                  alt="About"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
        </section>

        {/* Latest News */}
        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-[#005e86] font-serif">Tin tức mới nhất</h2>
            <p className="mt-2 text-gray-600">Cập nhật thông tin sức khỏe và nghiên cứu từ PCRM</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blog.map((post) => (
                <article key={post.path} className="article-card group">
                  {post.images[0]?.src && (
                    <div className="article-card-image group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={post.images[0].src}
                        alt={post.h1[0] || post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="card-body">
                    <h3 className="line-clamp-2 text-lg font-bold text-[#005e86]">
                      {post.h1[0] || post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                      {post.paragraphs[0] || post.description}
                    </p>
                    <Link href={post.path} className="mt-4 inline-block font-semibold text-[#0f7ea8] hover:text-[#005e86]">
                      Đọc bài viết →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/news/blog" className="btn btn-primary px-8 py-3">
                Xem tất cả bài viết
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#005e86] text-white py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif">Ủng hộ sứ mệnh của chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-100">
              Hãy quyên góp để hỗ trợ nghiên cứu về y học dự phòng và dinh dưỡng lành mạnh
            </p>
            <Link href="/donate" className="mt-8 inline-block btn btn-accent px-8 py-3 text-lg font-bold">
              Quyên góp ngay
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
