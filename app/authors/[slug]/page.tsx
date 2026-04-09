import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedAuthorBySlug, getPublishedAuthors, type AuthorExternalLink, type AuthorProfile, type AuthorSocialLink } from "@/lib/authors";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

type Props = {
  params: Promise<{ slug: string }>;
};

function asArticleHref(value: string): string {
  if (!value) {
    return "/news";
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (value.startsWith("news/")) {
    return `/${value}`;
  }

  return `/news/${value}`;
}

function RenderList({ items }: { items: string[] }) {
  if (!items.length) {
    return <p className="text-sm text-slate-600">-</p>;
  }

  return (
    <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function RenderExternalLinks({ links }: { links: AuthorExternalLink[] }) {
  if (!links.length) {
    return <p className="text-sm text-slate-600">-</p>;
  }

  return (
    <ul className="space-y-2 text-sm text-slate-700">
      {links.map((link) => (
        <li key={`${link.label}-${link.url}`}>
          <a href={link.url} target="_blank" rel="noreferrer" className="text-[#006c96] hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function RenderSocialLinks({ links }: { links: AuthorSocialLink[] }) {
  if (!links.length) {
    return <p className="text-sm text-slate-600">-</p>;
  }

  return (
    <ul className="space-y-2 text-sm text-slate-700">
      {links.map((link) => (
        <li key={`${link.platform}-${link.url}`}>
          <a href={link.url} target="_blank" rel="noreferrer" className="text-[#006c96] hover:underline">
            {link.platform}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-slate-200 pt-6">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function getSectionTitle(lang: "en" | "vi") {
  if (lang === "vi") {
    return {
      intro: "Giới thiệu",
      expertise: "Thông tin chuyên môn",
      interests: "Lĩnh vực quan tâm",
      milestones: "Mốc nghề nghiệp",
      works: "Công trình và hoạt động nổi bật",
      whyWrite: "Vì sao tác giả này viết chủ đề này",
      related: "Bài viết liên quan",
      sources: "Nguồn tham khảo",
      profileList: "Tác giả",
    };
  }

  return {
    intro: "Introduction",
    expertise: "Professional Profile",
    interests: "Areas of Interest",
    milestones: "Career Milestones",
    works: "Notable Works and Activities",
    whyWrite: "Why This Author Writes This Topic",
    related: "Related Articles",
    sources: "References",
    profileList: "Authors",
  };
}

function renderExpertise(author: AuthorProfile) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-slate-800">Bằng cấp</p>
        <RenderList items={author.degrees} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Chuyên môn</p>
        <RenderList items={author.specialty} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Vai trò hiện tại</p>
        <p className="text-sm text-slate-700">{author.currentRole || "-"}</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Tổ chức hiện tại</p>
        <p className="text-sm text-slate-700">{author.currentOrganization || "-"}</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Trọng tâm nghề nghiệp</p>
        <RenderList items={author.professionalFocus} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Học vấn</p>
        <RenderList items={author.education} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Chứng chỉ</p>
        <RenderList items={author.certifications} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Giải thưởng</p>
        <RenderList items={author.awards} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getPublishedAuthors().map((author) => ({ slug: author.slug }));
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const sectionTitle = getSectionTitle(lang);
  const author = getPublishedAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <Link href="/authors" className="hover:underline">
            {sectionTitle.profileList}
          </Link>
          <span className="mx-2">/</span>
          <span>{author.displayName || author.fullName}</span>
        </div>

        <article className="page-surface p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{author.displayName || author.fullName}</h1>
          {author.headline ? <p className="mt-3 text-base text-slate-700">{author.headline}</p> : null}

          <Section title={sectionTitle.intro}>
            <p className="text-sm leading-7 text-slate-700">{author.shortBio || "-"}</p>
          </Section>

          <Section title={sectionTitle.expertise}>{renderExpertise(author)}</Section>

          <Section title={sectionTitle.interests}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-800">Research Interests</p>
                <RenderList items={author.researchInterests} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Author Themes</p>
                <RenderList items={author.authorThemes} />
              </div>
            </div>
          </Section>

          <Section title={sectionTitle.milestones}>
            <RenderList items={author.keyCareerMilestones} />
          </Section>

          <Section title={sectionTitle.works}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-800">Notable Works</p>
                <RenderList items={author.notableWorks} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Books</p>
                <RenderList items={author.books} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Podcasts</p>
                <RenderList items={author.podcasts} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Talks</p>
                <RenderList items={author.talks} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Major Activities</p>
                <RenderList items={author.majorActivities} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Publication List</p>
                <RenderList items={author.publicationList} />
              </div>
            </div>
          </Section>

          <Section title={sectionTitle.whyWrite}>
            <p className="text-sm leading-7 text-slate-700">{author.whyThisAuthorWritesThisTopic || "-"}</p>
          </Section>

          <Section title={sectionTitle.related}>
            {author.relatedArticleSlugs.length ? (
              <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                {author.relatedArticleSlugs.map((articleSlug) => (
                  <li key={articleSlug}>
                    <Link href={asArticleHref(articleSlug)} className="text-[#006c96] hover:underline">
                      {articleSlug}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-600">-</p>
            )}
          </Section>

          <Section title={sectionTitle.sources}>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">Profile Source Links</p>
                <RenderExternalLinks links={author.profileSourceLinks} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">External Links</p>
                <RenderExternalLinks links={author.externalLinks} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Social Links</p>
                <RenderSocialLinks links={author.socialLinks} />
              </div>
            </div>
          </Section>
        </article>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
