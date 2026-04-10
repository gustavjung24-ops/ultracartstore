import type { Config } from "tailwindcss";

const sansFontStack = ["var(--font-body)", "Segoe UI", "Noto Sans", "Arial", "system-ui", "sans-serif"];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: sansFontStack,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Màu chủ đạo website
        brand: {
          dark: "#0f3744",   // Header, Footer, nav sẫm
          mid: "#1e8d8d",    // Thanh trên header, đường viền nav
          teal: "#28afb0",   // Accent: tiêu đề, nút, highlight
        },
      },
    },
  },
  plugins: [],
};
export default config;
