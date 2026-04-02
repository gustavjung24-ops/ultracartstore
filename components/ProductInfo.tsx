import type { Product } from "@/data/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-5">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
        {product.title}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-green-700">
          {product.price}
        </span>
        <span className="text-sm text-gray-500">per copy</span>
      </div>

      {/* Short description */}
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {product.shortDescription}
      </p>

      {/* Contact note */}
      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        <p className="text-green-800 text-sm font-medium">
          📋 {product.contactNote}
        </p>
      </div>

      {/* CTA Buttons — WhatsApp / Zalo / Call */}
      <div className="space-y-3">
        {/* WhatsApp */}
        <a
          href={product.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-3 px-5 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold rounded-xl shadow-sm transition-colors"
        >
          {/* WhatsApp icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat WhatsApp
        </a>

        {/* Zalo */}
        <a
          href={product.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-3 px-5 bg-[#0068ff] hover:bg-[#0057d9] text-white font-semibold rounded-xl shadow-sm transition-colors"
        >
          {/* Zalo "Z" icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 16.5h-4.75l4.75-6.5H12.5V8.5H18l-4.75 6.5H18.5v1.5zm-8-8h-2v8h2v-8zm-1-3a1 1 0 110 2 1 1 0 010-2z" />
          </svg>
          Chat Zalo
        </a>

        {/* Call */}
        <a
          href={product.phoneNumber}
          className="flex items-center justify-center gap-3 w-full py-3 px-5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl shadow-sm border border-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
            />
          </svg>
          Call Now
        </a>
      </div>

      {/* SKU */}
      <p className="text-xs text-gray-400 pt-2">
        <span className="font-medium">SKU:</span> {product.sku}
      </p>
    </div>
  );
}
