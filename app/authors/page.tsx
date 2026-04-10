import type { Metadata } from "next";
import Link from "next/link";
import AuthorAvatar from "@/components/AuthorAvatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAuthorProfileHref, getAuthors } from "@/lib/authors";
import { buildPageMetadata } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

export const metadata: Metadata = buildPageMetadata({
  path: "/authors",
  title: "Tác giả",
  description: "Danh sách tác giả và hồ sơ chuyên môn trên website Y học lành mạnh.",
  type: "website",
  language: "vi",
});

export default async function AuthorsPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const authorList = getAuthors();

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-7xl px-4 py-8 font-sans md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <span>Tác giả</span>
        </div>

        <section className="page-surface p-6 font-sans md:p-8">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Tác giả</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Danh sách hồ sơ chuyên môn của đội ngũ tác giả, trình bày theo hướng gọn, rõ và học thuật.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {authorList.map((author) => (
              <article key={author.id} className="smooth-card rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <AuthorAvatar author={author} size="md" />

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{author.displayName}</h2>
                    <p className="mt-0.5 text-sm font-medium tracking-[0.01em] text-slate-500">
                      {author.degrees.join(", ")}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-700">{author.headline}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">{author.shortBio}</p>

                <Link
                  href={getAuthorProfileHref(author)}
                  className="mt-4 inline-flex rounded-full border border-[#0f5c73] px-4 py-2 text-sm font-semibold tracking-[0.01em] text-[#0f5c73] no-underline transition hover:bg-[#0f5c73] hover:text-white"
                >
                  Xem hồ sơ tác giả
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
