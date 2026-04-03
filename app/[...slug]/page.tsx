import Image from "next/image";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPcrmPages, getPcrmPageBySegments } from "@/lib/pcrm-content";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getAllPcrmPages()
    .filter((page) => page.path !== "/")
    .map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

export default async function DynamicPcrmPage({ params }: Props) {
  const { slug } = await params;
  const lang = (await cookies()).get("site_lang")?.value === "vi" ? "vi" : "en";
  const page = getPcrmPageBySegments(slug);

  if (!page || page.path === "/") {
    notFound();
  }

  const title = lang === "vi" ? page.h1_vi?.[0] || page.title_vi || page.h1[0] || page.title : page.h1_en?.[0] || page.title_en || page.h1[0] || page.title;
  const description = lang === "vi" ? page.description_vi || page.description : page.description_en || page.description;
  const h2 = lang === "vi" ? page.h2_vi || page.h2_en || page.h2 : page.h2_en || page.h2;
  const h3 = lang === "vi" ? page.h3_vi || page.h3_en || page.h3 : page.h3_en || page.h3;
  const paragraphs = lang === "vi" ? page.paragraphs_vi || page.paragraphs_en || page.paragraphs : page.paragraphs_en || page.paragraphs;
  const links = lang === "vi" && page.links_vi?.length
    ? page.links_vi.map((link) => ({ text: link.text_vi || link.text, url: link.url }))
    : page.links;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{description}</p>

        {page.images[0]?.src ? (
          <div className="relative mt-8 h-[280px] overflow-hidden rounded-xl md:h-[420px]">
            <Image src={page.images[0].src} alt={title} fill className="object-cover" unoptimized />
          </div>
        ) : null}

        <section className="prose mt-8 max-w-none prose-p:leading-7 prose-p:text-slate-700">
          {h2.map((heading, index) => (
            <h2 key={`${heading}-${index}`} className="text-2xl font-bold text-slate-900">
              {heading}
            </h2>
          ))}

          {h3.map((heading, index) => (
            <h3 key={`${heading}-${index}`} className="text-xl font-semibold text-slate-800">
              {heading}
            </h3>
          ))}

          {paragraphs.map((paragraph, index) => (
            <p key={`${page.path}-p-${index}`}>{paragraph}</p>
          ))}
        </section>

        {links?.length ? (
          <section className="mt-10">
            <h3 className="text-lg font-bold text-slate-900">{lang === "vi" ? "Liên kết liên quan" : "Related Links"}</h3>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              {links.slice(0, 24).map((link, index) => (
                <li key={`${link.url}-${index}`}>
                  <a href={link.url} className="text-[#006c96] hover:underline" target="_blank" rel="noreferrer">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
