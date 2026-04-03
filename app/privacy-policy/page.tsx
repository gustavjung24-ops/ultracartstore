import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { footerInfo } from "@/data/product";

export const metadata: Metadata = {
  title: "Chính sách bảo mật - Physicians Committee Shop",
  description: "Chính sách bảo mật của Physicians Committee Shop.",
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Trợ giúp", href: "#" },
  { label: "Chính sách bảo mật" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-6 border-b border-gray-200 uppercase tracking-wide">
            Chính sách bảo mật
          </h1>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <p>
              Physicians Committee for Responsible Medicine (PCRM) cam kết bảo vệ quyền riêng tư
              của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin
              cá nhân khi bạn sử dụng Physicians Committee Shop.
            </p>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                1. Thông tin chúng tôi thu thập
              </h2>
              <p>
                Khi bạn liên hệ với chúng tôi hoặc gửi câu hỏi, chúng tôi có thể thu thập:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Họ tên và địa chỉ email</li>
                <li>Số điện thoại (nếu bạn cung cấp)</li>
                <li>Nội dung tin nhắn hoặc câu hỏi</li>
                <li>Thông tin đơn hàng khi mua sản phẩm</li>
              </ul>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                2. Cách chúng tôi sử dụng thông tin
              </h2>
              <p>Thông tin của bạn được sử dụng để:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Xử lý và hoàn thành đơn hàng</li>
                <li>Phản hồi câu hỏi và yêu cầu hỗ trợ</li>
                <li>Cải thiện dịch vụ và sản phẩm của chúng tôi</li>
                <li>Gửi thông tin liên quan đến đơn hàng (nếu cần)</li>
              </ul>
              <p className="mt-2">
                Chúng tôi <strong>không bán, cho thuê hoặc chia sẻ</strong> thông tin cá nhân của
                bạn với bên thứ ba ngoài mục đích hoàn thành đơn hàng.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                3. Bảo mật thông tin
              </h2>
              <p>
                Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin
                của bạn khỏi truy cập trái phép, mất mát hoặc tiết lộ.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                4. Cookie và lưu lượng truy cập
              </h2>
              <p>
                Website có thể sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể
                tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng có thể bị ảnh hưởng.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                5. Liên kết bên ngoài
              </h2>
              <p>
                Website có thể chứa liên kết đến các trang web của bên thứ ba. Chúng tôi không
                chịu trách nhiệm về chính sách bảo mật của các trang đó.
              </p>
            </section>

            <section>
              <h2 className="text-brand-dark font-bold text-base mt-6 mb-2 pb-1 border-b border-gray-100">
                6. Liên hệ
              </h2>
              <p>
                Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
              </p>
              <address className="not-italic mt-2 space-y-1">
                <p>Physicians Committee for Responsible Medicine</p>
                <p>5100 Wisconsin Avenue, NW, Suite 400</p>
                <p>Washington, DC 20016</p>
                <p>
                  <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline">
                    fulfillment@PCRM.org
                  </a>
                </p>
                <p>
                  <a href="tel:+12025277306" className="text-brand-teal hover:underline">
                    202-527-7306
                  </a>
                </p>
              </address>
            </section>

            <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
              Chính sách này cũng được đăng tải tại{" "}
              <a
                href="https://www.pcrm.org/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal hover:underline"
              >
                pcrm.org/privacy-policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
