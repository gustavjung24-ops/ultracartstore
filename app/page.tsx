import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductsByCategoryFromData, getStoreData } from "@/lib/store-data";

export default async function HomePage() {
  const { products, footerInfo } = await getStoreData();
  const featured = getProductsByCategoryFromData(products, "product-spotlight").slice(0, 4);

  return (
    <>
      <Header />

      <main>
        {/* ─── Banner giới thiệu ─── */}
        <section className="bg-brand-dark text-white py-14 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-teal">
              Physicians Committee Shop
            </h1>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
              Cửa hàng Physicians Committee cung cấp tài liệu giáo dục và các
              công cụ truyền thông vì sứ mệnh bảo vệ sức khỏe con người và
              động vật thông qua chế độ ăn thực vật và nghiên cứu khoa học có
              đạo đức. Tầm nhìn của chúng tôi là xây dựng một thế giới khỏe
              mạnh hơn, nơi y tế và lòng nhân ái là những giá trị cốt lõi.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href="/shop"
                className="bg-brand-teal hover:bg-brand-mid text-white font-bold py-3 px-8 uppercase tracking-wide transition-colors shadow"
              >
                Vào cửa hàng
              </Link>
              <a
                href="https://pcrm.org"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white hover:bg-white/10 font-semibold py-3 px-8 uppercase tracking-wide transition-colors"
              >
                PCRM.org
              </a>
            </div>
          </div>
        </section>

        {/* ─── Sản phẩm nổi bật ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-brand-teal font-bold text-lg pb-3 mb-6 border-b border-gray-200 uppercase tracking-wide">
            Sản phẩm nổi bật
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <article
                key={p.slug}
                className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-50">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 25vw"
                    unoptimized
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-brand-teal font-bold">
                    {p.price}
                    {p.unit && <span className="text-xs text-gray-400 ml-1">{p.unit}</span>}
                  </p>
                  <Link
                    href={`/product/${p.slug}`}
                    className="mt-auto inline-block text-center bg-brand-teal hover:bg-brand-mid text-white text-sm font-semibold py-2 px-4 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer info={footerInfo} />
    </>
  );
}
