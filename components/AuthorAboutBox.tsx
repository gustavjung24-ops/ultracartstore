import Link from "next/link";
import type { AuthorProfile } from "@/data/authors";
import { getAuthorProfileHref } from "@/lib/authors";

type AuthorAboutBoxProps = {
  author: AuthorProfile;
};

export default function AuthorAboutBox({ author }: AuthorAboutBoxProps) {
  return (
    <section className="mt-10 rounded-2xl border border-[#d9e4eb] bg-[#f8fbfd] p-5 md:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">Về tác giả</p>
      <h3 className="mt-2 text-xl font-bold text-slate-900">{author.displayName}</h3>
      <p className="mt-1 text-sm font-medium text-slate-700">{author.headline}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{author.shortBio}</p>
      <Link
        href={getAuthorProfileHref(author)}
        className="mt-4 inline-flex rounded-full border border-[#0f5c73] px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline transition hover:bg-[#0f5c73] hover:text-white"
      >
        Xem hồ sơ tác giả
      </Link>
    </section>
  );
}
