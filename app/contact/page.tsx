"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Trợ giúp", href: "#" },
  { label: "Biểu mẫu liên hệ" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi qua mailto (hoặc tích hợp API sau)
    const subject = encodeURIComponent("Liên hệ từ cửa hàng PCRM");
    const body = encodeURIComponent(
      `Tên: ${form.name}\nEmail: ${form.email}\n\nNội dung:\n${form.message}`
    );
    window.location.href = `mailto:fulfillment@PCRM.org?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-xl">
          <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-4 border-b border-gray-200 uppercase tracking-wide">
            Biểu mẫu liên hệ
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            Nếu bạn có câu hỏi liên quan đến Physicians Committee Shop, hãy gọi cho chúng tôi tại{" "}
            <a href="tel:+12025277306" className="text-brand-teal hover:underline font-medium">
              202-527-7306
            </a>
            , điền vào biểu mẫu bên dưới hoặc gửi email đến{" "}
            <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline font-medium">
              fulfillment@PCRM.org
            </a>
            . Đối với các câu hỏi không liên quan đến cửa hàng, vui lòng liên hệ{" "}
            <a href="tel:+12026862210" className="text-brand-teal hover:underline font-medium">
              202-686-2210
            </a>{" "}
            hoặc{" "}
            <a href="mailto:info@PCRM.org" className="text-brand-teal hover:underline font-medium">
              info@PCRM.org
            </a>
            . Cảm ơn bạn!
          </p>

          {sent ? (
            <div className="bg-brand-teal/10 border border-brand-teal/30 rounded p-6 text-brand-dark">
              <p className="font-semibold text-lg mb-1">✅ Đã mở ứng dụng email của bạn!</p>
              <p className="text-sm text-gray-600">Vui lòng gửi email đã được điền sẵn để hoàn tất liên hệ.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Họ tên */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={60}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={60}
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              {/* Nội dung */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-y"
                  placeholder="Nhập câu hỏi hoặc nội dung cần hỗ trợ..."
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-brand-teal hover:bg-brand-mid text-white font-bold uppercase tracking-wide py-3 px-8 transition-colors"
                >
                  Gửi
                </button>
                <span className="text-xs text-gray-400">Chúng tôi thường phản hồi trong 1-2 ngày làm việc</span>
              </div>
            </form>
          )}

          {/* Liên hệ nhanh */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/12025277306"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors"
            >
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">WhatsApp</p>
                <p className="text-xs text-gray-500">Nhắn tin nhanh</p>
              </div>
            </a>
            <a
              href="tel:+12025277306"
              className="flex items-center gap-3 p-4 border border-gray-200 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">202-527-7306</p>
                <p className="text-xs text-gray-500">Gọi điện trực tiếp</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
