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
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand & Address */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-base">{info.brandName}</h3>
            <address className="not-italic text-sm leading-relaxed space-y-1">
              <p>{info.address}</p>
              <p>{info.city}</p>
              <p>{info.phone}</p>
              <a
                href={`mailto:${info.email}`}
                className="text-green-400 hover:text-green-300 underline"
              >
                {info.email}
              </a>
            </address>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-base">Liên kết nhanh</h3>
            <ul className="text-sm space-y-1">
              {[
                { label: "Trang chủ", href: "/" },
                { label: "Cửa hàng", href: "/shop" },
                { label: "Tải miễn phí", href: "/free-downloads" },
                { label: "Liên hệ", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-base">Hỗ trợ</h3>
            <ul className="text-sm space-y-1">
              {[
                { label: "Chính sách bảo mật", href: "/privacy-policy" },
                {
                  label: "Thời gian xử lý đơn hàng",
                  href: "/order-turnaround-time",
                },
                { label: "Biểu mẫu liên hệ", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}}
        <div className="mt-8 pt-6 border-t border-gray-700 text-xs text-gray-500 text-center">
          {info.copyright}
        </div>
      </div>
    </footer>
  );
}
