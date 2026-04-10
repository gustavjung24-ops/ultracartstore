import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorAvatar from "@/components/AuthorAvatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { AuthorProfile } from "@/data/authors";
import {
  getAuthorBySlug,
  getAuthors,
} from "@/lib/authors";
import { buildPageMetadata, resolveSeoImage } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAuthors().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {};
  }

  const authorImage = resolveSeoImage(
    `/authors/${author.slug}`,
    [
      ...(author.coverImage ? [{ src: author.coverImage, alt: author.displayName }] : []),
      ...(author.avatar ? [{ src: author.avatar, alt: author.displayName }] : []),
    ],
  );

  return buildPageMetadata({
    path: `/authors/${author.slug}`,
    title: author.displayName,
    description: author.shortBio,
    image: authorImage,
    type: "profile",
    language: "vi",
  });
}

function renderStringField(label: string, value: string) {
  if (!value.trim()) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">{label}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">{value}</p>
    </section>
  );
}

function renderListField(label: string, items: string[]) {
  const cleaned = items.map((item) => item.trim()).filter(Boolean);

  if (!cleaned.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">{label}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
        {cleaned.map((item) => (
          <li key={`${label}-${item}`} className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function renderLinkListField(label: string, items: string[]) {
  const cleaned = items.map((item) => item.trim()).filter(Boolean);

  if (!cleaned.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">{label}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
        {cleaned.map((item) => (
          <li key={`${label}-${item}`}>
            <a href={item} target="_blank" rel="noreferrer" className="text-[#0f5c73] hover:underline">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function renderExternalLinks(label: string, links: AuthorProfile["externalLinks"]) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">{label}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
        {links.map((link, index) => (
          <li key={`${label}-${link.url}-${index}`}>
            <a href={link.url} target="_blank" rel="noreferrer" className="text-[#0f5c73] hover:underline">
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function renderSocialLinks(label: string, links: AuthorProfile["socialLinks"]) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">{label}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
        {links.map((link, index) => (
          <li key={`${label}-${link.url}-${index}`}>
            <a href={link.url} target="_blank" rel="noreferrer" className="text-[#0f5c73] hover:underline">
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-7xl px-4 py-8 font-sans md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <Link href="/" className="text-slate-500 no-underline hover:underline">
            {locale.common.home}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/authors" className="text-slate-500 no-underline hover:underline">
            Tác giả
          </Link>
          <span className="mx-2">/</span>
          <span>{author.displayName}</span>
        </div>

        <article className="page-surface overflow-hidden font-sans">
          {author.coverImage ? (
            <div className="relative h-52 w-full bg-slate-100 md:h-64">
              <Image src={author.coverImage} alt={author.displayName} fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="h-28 w-full bg-gradient-to-r from-[#0f5c73] via-[#1b708d] to-[#2d8ca9]" />
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <AuthorAvatar author={author} size="lg" />

              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{author.fullName}</h1>
                <p className="mt-2 text-base text-slate-700">{author.headline}</p>
                <p className="mt-1 text-sm text-slate-500">Mã tác giả: {author.id} | Định danh: {author.slug}</p>
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-700">{author.shortBio}</p>

            <div className="mt-6 rounded-xl border border-[#d9e4eb] bg-[#f8fbfd] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5c73]">Thông tin dữ liệu</p>
              <div className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                <p>
                  <span className="font-semibold">Nổi bật:</span> {author.featured ? "Có" : "Không"}
                </p>
                <p>
                  <span className="font-semibold">Thứ tự sắp xếp:</span> {author.sortOrder}
                </p>
                <p>
                  <span className="font-semibold">Trạng thái:</span> {author.status}
                </p>
                <p>
                  <span className="font-semibold">Ngày rà soát:</span> {author.lastReviewedAt}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {renderListField("Bằng cấp", author.degrees)}
              {renderStringField("Chuyên môn", author.specialty)}
              {renderStringField("Vai trò hiện tại", author.currentRole)}
              {renderStringField("Tổ chức hiện tại", author.currentOrganization)}
              {renderStringField("Trọng tâm chuyên môn", author.professionalFocus)}
              {renderListField("Mối quan tâm nghiên cứu", author.researchInterests)}
              {renderListField("Học vấn", author.education)}
              {renderListField("Chứng chỉ", author.certifications)}
              {renderListField("Giải thưởng", author.awards)}
              {renderListField("Cột mốc nghề nghiệp", author.keyCareerMilestones)}
              {renderListField("Công trình nổi bật", author.notableWorks)}
              {renderListField("Sách", author.books)}
              {renderListField("Podcast", author.podcasts)}
              {renderListField("Bài nói chuyện", author.talks)}
              {renderListField("Hoạt động chính", author.majorActivities)}
              {renderListField("Danh mục công bố", author.publicationList)}
              {renderListField("Chủ đề tác giả", author.authorThemes)}
              {renderStringField("Vì sao tác giả viết chủ đề này", author.whyThisAuthorWritesThisTopic)}
              {renderListField("Slug bài viết liên quan", author.relatedArticleSlugs)}
              {renderLinkListField("Liên kết nguồn hồ sơ", author.profileSourceLinks)}
              {renderExternalLinks("Liên kết ngoài", author.externalLinks)}
              {renderSocialLinks("Liên kết mạng xã hội", author.socialLinks)}
            </div>
          </div>
        </article>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
