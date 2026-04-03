import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#005e86] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold font-serif mb-4">
              🏥 PCRM Vietnam
            </h3>
            <p className="text-gray-100 text-sm leading-6">
              Physicians Committee for Responsible Medicine - tổ chức phi lợi nhuận cam kết y học dự phòng và nghiên cứu y khoa có tính đạo đức.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#ffb53d] hover:text-white transition">
                <span className="sr-only">Facebook</span>📘
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#ffb53d] hover:text-white transition">
                <span className="sr-only">Twitter</span>🐦
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#ffb53d] hover:text-white transition">
                <span className="sr-only">YouTube</span>▶️
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4">Điều hướng</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/news/blog" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-bold mb-4">Tài nguyên</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/free-downloads" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Tải miễn phí
                </Link>
              </li>
              <li>
                <Link href="/order-turnaround-time" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Thời gian giao hàng
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-100 hover:text-[#ffb53d] transition">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold mb-4">Liên hệ</h4>
            <div className="space-y-3 text-sm text-gray-100">
              <p>
                <span className="font-semibold">📍 Địa chỉ:</span><br />
                Vietnam Office<br />
                Ho Chi Minh City
              </p>
              <p>
                <span className="font-semibold">📧 Email:</span><br />
                <a href="mailto:info@pcrm.org.vn" className="text-[#ffb53d] hover:underline">
                  info@pcrm.org.vn
                </a>
              </p>
              <p>
                <span className="font-semibold">📱 Điện thoại:</span><br />
                <a href="tel:+84282222222" className="text-[#ffb53d] hover:underline">
                  +84 (28) 2222-2222
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#00425f] px-4 md:px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-200">
          <p>
            &copy; {currentYear} Physicians Committee for Responsible Medicine (PCRM). All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#ffb53d] transition">
              Bảo mật
            </Link>
            <span>•</span>
            <a href="#" className="hover:text-[#ffb53d] transition">
              Điều khoản sử dụng
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#ffb53d] transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
