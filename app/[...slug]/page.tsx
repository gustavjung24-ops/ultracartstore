import Image from "next/image";
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
  const page = getPcrmPageBySegments(slug);

  if (!page || page.path === "/") {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{page.h1[0] || page.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{page.description}</p>

        {page.images[0]?.src ? (
          <div className="relative mt-8 h-[280px] overflow-hidden rounded-xl md:h-[420px]">
            <Image src={page.images[0].src} alt={page.h1[0] || page.title} fill className="object-cover" unoptimized />
          </div>
        ) : null}

        <section className="prose mt-8 max-w-none prose-p:leading-7 prose-p:text-slate-700">
          {page.h2.map((heading) => (
            <h2 key={heading} className="text-2xl font-bold text-slate-900">
              {heading}
            </h2>
          ))}

          {page.paragraphs.map((paragraph, index) => (
            <p key={`${page.path}-p-${index}`}>{paragraph}</p>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
