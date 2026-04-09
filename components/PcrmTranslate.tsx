"use client";

import { useMemo } from "react";

type Props = {
  text: string;
  lang?: "vi" | "en";
};

const QUICK_MAP: Record<string, string> = {
  "News & Events": "Thông tin & sự kiện",
  "Donate": "Quyên góp",
  "Contact": "Liên hệ",
  "About Us": "Về chúng tôi",
  "Health Topics": "Chủ đề sức khỏe",
  "Clinical Research": "Nghiên cứu lâm sàng",
  "Ethical Science": "Khoa học có đạo đức",
  "Good Nutrition": "Dinh dưỡng lành mạnh",
};

export default function PcrmTranslate({ text, lang = "vi" }: Props) {
  const value = useMemo(() => {
    if (lang === "en") return text;
    return QUICK_MAP[text] ?? text;
  }, [lang, text]);

  return <>{value}</>;
}
