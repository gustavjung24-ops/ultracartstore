import Link from "next/link";
import AuthorAvatar from "@/components/AuthorAvatar";
import type { AuthorProfile } from "@/data/authors";
import { getAuthorProfileHref } from "@/lib/authors";

type AuthorAboutBoxProps = {
  author: AuthorProfile;
  ui: {
    aboutLabel: string;
    viewProfileLabel: string;
  };
};

export default function AuthorAboutBox({ author, ui }: AuthorAboutBoxProps) {
  const degreeLine = author.degrees.map((degree) => degree.trim()).filter(Boolean).join(", ");

  return (
    <section className="mt-10 rounded-2xl border border-[#d9e4eb] bg-[#f8fbfd] p-5 font-sans md:p-6">
      <p className="text-sm font-semibold tracking-[0.005em] text-[#0f5c73]">{ui.aboutLabel}</p>
      <div className="mt-3 flex items-start gap-4">
        <AuthorAvatar author={author} size="md" className="shrink-0" />
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-slate-900">{author.displayName}</h3>
          {degreeLine ? <p className="mt-1 text-sm font-medium text-slate-500">{degreeLine}</p> : null}
          <p className="mt-1 text-sm font-medium text-slate-700">{author.headline}</p>
          <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-600">{author.shortBio}</p>
          <Link
            href={getAuthorProfileHref(author)}
            className="mt-4 inline-flex rounded-full border border-[#0f5c73] px-5 py-2 text-sm font-semibold tracking-[0.005em] text-[#0f5c73] no-underline transition hover:bg-[#0f5c73] hover:text-white"
          >
            {ui.viewProfileLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
