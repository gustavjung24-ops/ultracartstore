import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { footerInfo } from "@/data/product";

export const metadata: Metadata = {
  title: "Thời gian xử lý đơn hàng - Physicians Committee Shop",
  description: "Thông tin về thời gian xử lý và giao hàng tại Physicians Committee Shop.",
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Trợ giúp", href: "#" },
  { label: "Thời gian xử lý đơn hàng" },
];

export default function OrderTurnaroundPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-6 border-b border-gray-200 uppercase tracking-wide">
            Thời gian xử lý đơn hàng
          </h1>

          <div className="space-y-8 text-sm text-gray-600">

            {/* Tổng quan */}
            <section className="bg-brand-teal/10 border border-brand-teal/30 p-5 rounded">
              <p className="font-semibold text-brand-dark mb-1">Thông thường:</p>
              <p>
                Đơn hàng được xử lý và giao đến địa chỉ trên toàn quốc trong vòng{" "}
                <strong>7–10 ngày làm việc</strong> kể từ ngày xác nhận đặt hàng.
              </p>
            </section>

            {/* Quy trình */}
            <section>
              <h2 className="text-brand-dark font-bold text-base mb-3 pb-1 border-b border-gray-100">
                Quy trình xử lý đơn hàng
              </h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Xác nhận đơn hàng (1–2 ngày làm việc):</strong> Sau khi nhận được yêu
                  cầu qua WhatsApp, Zalo hoặc điện thoại, nhân viên sẽ xác nhận đặt hàng và
                  thông báo lịch giao.
                </li>
                <li>
                  <strong>Chuẩn bị và đóng gói (1–3 ngày làm việc):</strong> Kiểm tra kho,
                  đóng gói sản phẩm cẩn thận và bàn giao cho đơn vị vận chuyển.
                </li>
                <li>
                  <strong>Vận chuyển (3–5 ngày làm việc):</strong> Thời gian giao hàng tùy
                  thuộc vào khu vực địa lý và đơn vị vận chuyển.
                </li>
              </ol>
            </section>

            {/* Đơn số lượng lớn */}
            <section>
              <h2 className="text-brand-dark font-bold text-base mb-3 pb-1 border-b border-gray-100">
                Đơn hàng số lượng lớn
              </h2>
              <p className="mb-2">
                Với đơn hàng từ <strong>100 sản phẩm trở lên</strong>, thời gian xử lý có thể
                kéo dài hơn (10–15 ngày làm việc). Vui lòng liên hệ trước để được sắp xếp phù hợp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="https://wa.me/12025277306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 text-sm transition-colors"
                >
                  💬 Nhắn WhatsApp
                </a>
                <a
                  href="tel:+12025277306"
                  className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-mid text-white font-semibold py-2 px-5 text-sm transition-colors"
                >
                  📞 Gọi ngay
                </a>
              </div>
            </section>

            {/* Theo dõi đơn hàng */}
            <section>
              <h2 className="text-brand-dark font-bold text-base mb-3 pb-1 border-b border-gray-100">
                Theo dõi đơn hàng
              </h2>
              <p>
                Sau khi đơn hàng được giao cho đơn vị vận chuyển, chúng tôi sẽ gửi mã theo dõi
                qua tin nhắn hoặc email. Bạn có thể liên hệ{" "}
                <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline">
                  fulfillment@PCRM.org
                </a>{" "}
                để hỏi thêm thông tin về tình trạng đơn hàng.
              </p>
            </section>

            {/* Câu hỏi */}
            <section className="bg-gray-50 border border-gray-200 p-5 rounded">
              <p className="font-semibold text-gray-700 mb-2">Có câu hỏi?</p>
              <p>
                Liên hệ chúng tôi qua{" "}
                <a href="tel:+12025277306" className="text-brand-teal hover:underline font-medium">
                  202-527-7306
                </a>{" "}
                hoặc email{" "}
                <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline font-medium">
                  fulfillment@PCRM.org
                </a>
                . Đội ngũ hỗ trợ làm việc từ thứ Hai đến thứ Sáu, 9:00–17:00 (giờ miền Đông Hoa Kỳ).
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
