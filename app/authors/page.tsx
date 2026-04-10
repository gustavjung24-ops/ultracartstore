import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAuthorInitials, getAuthorProfileHref, getAuthors } from "@/lib/authors";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

export const metadata: Metadata = {
  title: "Tác giả | Y học lành mạnh",
  description: "Danh sách tác giả và hồ sơ chuyên môn trên website Y học lành mạnh.",
};

export default async function AuthorsPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const authorList = getAuthors();

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <span>Tác giả</span>
        </div>

        <section className="page-surface p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Tác giả</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Danh sách hồ sơ tác giả theo định dạng học thuật để thuận tiện cho việc biên tập, đối chiếu nguồn và
            gắn bài viết theo author slug/id.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {authorList.map((author) => (
              <article key={author.id} className="smooth-card rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  {author.avatar ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-200 bg-white">
                      <Image src={author.avatar} alt={author.displayName} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-[#0f5c73]">
                      {getAuthorInitials(author.displayName)}
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{author.displayName}</h2>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">
                      {author.degrees.join(", ")}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-700">{author.headline}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-600">{author.shortBio}</p>

                <Link
                  href={getAuthorProfileHref(author)}
                  className="mt-4 inline-flex rounded-full border border-[#0f5c73] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline transition hover:bg-[#0f5c73] hover:text-white"
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
