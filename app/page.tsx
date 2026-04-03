import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPages, getPcrmPageByPath } from "@/lib/pcrm-content";

export default function HomePage() {
  const home = getPcrmPageByPath("/");
  const blog = getBlogPages().slice(0, 9);

  if (!home) return null;

  const heroImage = home.images[0]?.src;

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[#005e86] text-white">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={home.h1[0] || home.title}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
              unoptimized
            />
          ) : null}
          <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffd38a]">PCRM</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
              {home.h1[0] || home.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-sky-100 md:text-lg">{home.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="rounded bg-[#ffb53d] px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-[#ffc869]"
              >
                Donate
              </Link>
              <Link
                href="/news/blog"
                className="rounded border border-white/50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                News & Events
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-bold text-slate-900">Tin và bài viết mới</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {blog.map((post) => (
              <article key={post.path} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                {post.images[0]?.src ? (
                  <div className="relative h-44 w-full">
                    <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{post.h1[0] || post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.paragraphs[0] || post.description}</p>
                  <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-[#006c96] hover:underline">
                    Đọc chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
