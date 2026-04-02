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
        <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Cửa hàng tài liệu sức khỏe
            </h1>
            <p className="text-green-200 text-lg">
              Tài liệu giáo dục sức khỏe dành cho cộng đồng, nhà giáo dục và các nhà lãnh đạo.
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="inline-block mt-2 bg-white text-green-800 font-semibold py-3 px-8 rounded-full hover:bg-green-50 transition-colors shadow"
            >
              Xem tài liệu
            </Link>
          </div>
        </section>

        {/* Featured Product */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Sản phẩm nổi bật
          </h2>
          <div className="max-w-sm">
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="relative w-full aspect-[4/3] bg-gray-50">
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
                <h3 className="font-semibold text-gray-900 leading-snug">
                  {product.title}
                </h3>
                <p className="text-green-700 font-bold text-lg">
                  {product.price}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {product.shortDescription.slice(0, 100)}…
                </p>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-900 hover:underline"
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
