import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPages } from "@/lib/pcrm-content";

export default function BlogIndexPage() {
  const posts = getBlogPages();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">News Blog</h1>
        <p className="mt-3 max-w-3xl text-slate-700">Hệ thống bài viết động được dựng từ dữ liệu đã crawl từ pcrm.org.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.path} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              {post.images[0]?.src ? (
                <div className="relative h-44 w-full">
                  <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                </div>
              ) : null}
              <div className="p-4">
                <h2 className="line-clamp-2 text-base font-semibold text-slate-900">{post.h1[0] || post.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.paragraphs[0] || post.description}</p>
                <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-[#006c96] hover:underline">
                  Đọc bài viết
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
