import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { product, footerInfo } from "@/data/product";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero / Welcome Banner */}
      <main>
        <section className="bg-gradient-to-br from-emerald-700/40 via-zinc-900 to-black text-white py-16 px-4 border-b border-emerald-500/30">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Cửa hàng tài liệu sức khỏe
            </h1>
            <p className="text-emerald-200 text-lg">
              Tài liệu thực tiễn cho cộng đồng, nhà giáo dục và đội ngũ lãnh đạo.
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="inline-block mt-2 bg-emerald-500 text-black font-semibold py-3 px-8 rounded-full hover:bg-emerald-400 transition-colors shadow"
            >
              Xem tài liệu
            </Link>
          </div>
        </section>

        {/* Featured Product */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-zinc-100 mb-6 pb-2 border-b border-emerald-500/30">
            Tài liệu nổi bật
          </h2>
          <div className="max-w-sm">
            <article className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-emerald-900/30 transition-shadow flex flex-col">
              <div className="relative w-full aspect-[4/3] bg-zinc-950">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, 384px"
                  unoptimized
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-100 leading-snug">
                  {product.title}
                </h3>
                <p className="text-emerald-400 font-bold text-lg">
                  {product.price}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {product.shortDescription.slice(0, 100)}…
                </p>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer info={footerInfo} />
    </>
  );
}
