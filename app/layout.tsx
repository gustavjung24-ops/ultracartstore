import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Merriweather } from "next/font/google";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Merriweather({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cửa hàng Physicians Committee",
  description:
    "Tài liệu giáo dục sức khỏe dành cho cộng đồng, nhà giáo dục và người lãnh đạo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${headingFont.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
