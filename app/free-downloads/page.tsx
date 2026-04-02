import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { footerInfo } from "@/data/product";

export const metadata: Metadata = {
  title: "Tải miễn phí - Physicians Committee Shop",
  description: "Tải miễn phí tài liệu giáo dục sức khỏe từ Physicians Committee.",
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Tải miễn phí" },
];

const freeResources = [
  {
    id: "pcrm-kickstart",
    title: "Chương trình Kickstart 21 ngày",
    description:
      "Hướng dẫn từng bước trong 21 ngày để chuyển sang chế độ ăn thực vật. Kèm thực đơn mẫu, mẹo mua sắm và công thức nấu ăn đơn giản.",
    type: "PDF",
    link: "https://pcrm.org/kickstart",
  },
  {
    id: "diabetes-starter",
    title: "Hướng dẫn kiểm soát tiểu đường bằng chế độ ăn thực vật",
    description:
      "Tổng hợp bằng chứng khoa học và hướng dẫn thực tiễn giúp người mắc tiểu đường loại 2 cải thiện đường huyết thông qua ăn uống đúng cách.",
    type: "PDF",
    link: "https://pcrm.org/diabetes",
  },
  {
    id: "healthy-heart",
    title: "Chế độ ăn bảo vệ tim mạch",
    description:
      "Thực phẩm nên ăn, thực phẩm nên tránh và kế hoạch 4 tuần để cải thiện sức khỏe tim mạch — dựa trên nghiên cứu của Physicians Committee.",
    type: "PDF",
    link: "https://pcrm.org/heart",
  },
  {
    id: "cancer-prevention",
    title: "Phòng ngừa ung thư qua ăn uống",
    description:
      "Phân tích mối liên hệ giữa chế độ ăn và nguy cơ ung thư, kèm khuyến nghị thực tiễn dễ áp dụng hàng ngày.",
    type: "PDF",
    link: "https://pcrm.org/cancer",
  },
  {
    id: "weight-loss-guide",
    title: "Giảm cân bền vững với thực vật",
    description:
      "Phương pháp giảm cân không tính calo, không nhịn đói — dựa trên nguyên lý mật độ năng lượng thực phẩm từ PCRM.",
    type: "PDF",
    link: "https://pcrm.org/weightloss",
  },
  {
    id: "pcrm-plate",
    title: "Đĩa thức ăn lành mạnh PCRM",
    description:
      "Hướng dẫn trực quan về tỷ lệ các nhóm thực phẩm trong một bữa ăn cân bằng theo khuyến nghị của Physicians Committee.",
    type: "PDF",
    link: "https://pcrm.org/plate",
  },
];

export default function FreeDownloadsPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-4 border-b border-gray-200 uppercase tracking-wide">
          Tải miễn phí
        </h1>
        <p className="text-gray-600 mb-8 text-sm leading-relaxed max-w-2xl">
          Physicians Committee cung cấp miễn phí nhiều tài liệu giáo dục sức khỏe dưới dạng PDF.
          Tải về và chia sẻ với cộng đồng, bệnh nhân hoặc những người thân mà bạn yêu quý.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeResources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-2 py-0.5 rounded uppercase flex-shrink-0 mt-0.5">
                  {res.type}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">{res.title}</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{res.description}</p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-mid text-white text-sm font-semibold py-2 px-4 transition-colors self-start"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Tải xuống
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-brand-dark text-white p-6 rounded text-sm">
          <p className="font-semibold text-brand-teal mb-2">Muốn tài liệu in sẵn?</p>
          <p className="text-gray-300 mb-4">
            Chúng tôi cũng cung cấp tài liệu in sẵn chất lượng cao để phát tại sự kiện,
            phòng khám và cộng đồng.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-brand-teal hover:bg-brand-mid text-white font-bold py-2 px-6 transition-colors"
          >
            Xem cửa hàng
          </Link>
        </div>
      </div>

      <Footer info={footerInfo} />
    </>
  );
}
