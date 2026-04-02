import Link from "next/link";

interface FooterProps {
  info: {
    brandName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    copyright: string;
  };
}

export default function Footer({ info }: FooterProps) {
  return (
    <footer className="bg-brand-dark text-white mt-16 font-[Cabin,sans-serif]">

      {/* ─── 3 cột chính ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Menu chính */}
          <div>
            <h2 className="text-brand-teal font-bold uppercase text-sm pb-3 mb-4 border-b border-gray-600 tracking-wide">
              Menu chính
            </h2>
            <ul className="space-y-2 text-sm text-gray-200">
              {[
                { label: "Trang chủ", href: "/" },
                { label: "Cửa hàng", href: "/shop" },
                { label: "Tải miễn phí", href: "/free-downloads" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h2 className="text-brand-teal font-bold uppercase text-sm pb-3 mb-4 border-b border-gray-600 tracking-wide">
              Hỗ trợ
            </h2>
            <ul className="space-y-2 text-sm text-gray-200">
              {[
                { label: "Chính sách bảo mật", href: "/privacy-policy" },
                { label: "Thời gian xử lý đơn", href: "/order-turnaround-time" },
                { label: "Biểu mẫu liên hệ", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h2 className="text-brand-teal font-bold uppercase text-sm pb-3 mb-4 border-b border-gray-600 tracking-wide">
              Liên hệ
            </h2>
            <address className="not-italic text-sm text-gray-200 leading-relaxed space-y-1">
              <p>{info.address}</p>
              <p>{info.city}</p>
              <p>{info.phone}</p>
              <a href={`mailto:${info.email}`} className="hover:text-brand-teal transition-colors">
                {info.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* ─── Subfooter ─── */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Store title box */}
          <div className="border border-white px-6 py-2 text-lg font-bold text-white text-center">
            {info.brandName}
          </div>

          {/* Phương thức thanh toán */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Thanh toán:</span>
            {["Visa", "Mastercard", "Amex", "Discover"].map((card) => (
              <span key={card} className="border border-gray-500 rounded px-2 py-0.5 text-gray-300 font-medium text-[10px]">
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Copyright ─── */}
      <div className="border-t border-gray-600 text-center text-xs text-gray-400 py-3">
        {info.copyright}
      </div>
    </footer>
  );
}
