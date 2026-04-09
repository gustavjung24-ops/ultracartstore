import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedAuthors } from "@/lib/authors";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

export default async function AuthorsPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const authors = getPublishedAuthors();

  const title = lang === "vi" ? "Tác giả" : "Authors";
  const intro =
    lang === "vi"
      ? "Danh sách hồ sơ tác giả được biên tập thủ công từ nguồn chính thức đã kiểm chứng."
      : "A curated list of author profiles entered manually from verified official sources.";
  const empty =
    lang === "vi"
      ? "Chưa có hồ sơ tác giả được xuất bản."
      : "No author profiles have been published yet.";

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>

        <section className="page-surface p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-700">{intro}</p>

          {authors.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {authors.map((author) => (
                <article key={author.id} className="rounded-md border border-slate-200 bg-white p-5">
                  <h2 className="text-lg font-semibold text-slate-900">{author.displayName || author.fullName}</h2>
                  {author.headline ? <p className="mt-1 text-sm text-slate-700">{author.headline}</p> : null}
                  {author.shortBio ? <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-700">{author.shortBio}</p> : null}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-[#006c96] hover:underline"
                  >
                    {lang === "vi" ? "Xem hồ sơ tác giả" : "View Author Profile"}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-slate-600">{empty}</p>
          )}
        </section>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
