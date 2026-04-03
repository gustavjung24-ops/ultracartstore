import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPages } from "@/lib/pcrm-content";

export default async function BlogIndexPage() {
  const lang = (await cookies()).get("site_lang")?.value === "vi" ? "vi" : "en";
  const posts = getBlogPages();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="page-surface p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{lang === "vi" ? "Tin Tức" : "News Blog"}</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          {lang === "vi"
            ? "Danh sách bài viết được đồng bộ từ dữ liệu pcrm.org."
            : "Article index synchronized from pcrm.org data."}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.path} className="article-card">
              {post.images[0]?.src ? (
                <div className="relative h-44 w-full">
                  <Image src={post.images[0].src} alt={post.h1[0] || post.title} fill className="object-cover" unoptimized />
                </div>
              ) : null}
              <div className="p-4">
                    <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
                      {lang === "vi"
                        ? post.h1_vi?.[0] || post.title_vi || post.h1_en?.[0] || post.h1[0] || post.title
                        : post.h1_en?.[0] || post.h1[0] || post.title_en || post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {lang === "vi"
                        ? post.paragraphs_vi?.[0] || post.description_vi || post.paragraphs_en?.[0] || post.paragraphs[0] || post.description
                        : post.paragraphs_en?.[0] || post.paragraphs[0] || post.description_en || post.description}
                    </p>
                <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-[#006c96] hover:underline">
                      {lang === "vi" ? "Đọc bài viết" : "Read article"}
                </Link>
              </div>
            </article>
          ))}
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
