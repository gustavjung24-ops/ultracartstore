import Link from "next/link";
import { getAuthorByArticlePath } from "@/lib/authors";

type AuthorAboutBoxProps = {
  articlePath: string;
  language: "en" | "vi";
};

export default function AuthorAboutBox({ articlePath, language }: AuthorAboutBoxProps) {
  const author = getAuthorByArticlePath(articlePath);

  const copy =
    language === "vi"
      ? {
          title: "Về tác giả",
          cta: "Xem hồ sơ tác giả",
          empty: "Hồ sơ tác giả cho bài viết này đang được biên tập.",
        }
      : {
          title: "About the Author",
          cta: "View Author Profile",
          empty: "Author profile for this article is being curated.",
        };

  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h3 className="text-lg font-bold text-slate-900">{copy.title}</h3>
      {author ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-base font-semibold text-slate-900">{author.displayName || author.fullName}</p>
          {author.headline ? <p className="mt-1 text-sm text-slate-700">{author.headline}</p> : null}
          {author.shortBio ? <p className="mt-3 text-sm leading-6 text-slate-700">{author.shortBio}</p> : null}
          <Link
            href={`/authors/${author.slug}`}
            className="mt-4 inline-block text-sm font-semibold text-[#006c96] hover:underline"
          >
            {copy.cta}
          </Link>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-600">{copy.empty}</p>
      )}
    </section>
  );
}
