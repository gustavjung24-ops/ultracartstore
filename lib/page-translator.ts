import {
  getAllPcrmPages,
  getLocalizedPcrmPageContent,
  getPcrmPageByPath as getPcrmResolvedPageByPath,
} from "./pcrm-content";
import { type Language } from './translations';

export type PageContent = {
  url?: string;
  title?: string;
  title_vi?: string;
  description?: string;
  description_vi?: string;
  h1?: string[];
  h1_vi?: string[];
  h2?: string[];
  h2_vi?: string[];
  paragraphs?: string[];
  paragraphs_vi?: string[];
  images?: Array<{ src: string; alt?: string }>;
};

type TranslatedPageData = PageContent & {
  url: string;
};

function normalizePagePathInput(pageUrl: string): string {
  const trimmed = pageUrl.trim();
  if (!trimmed) {
    return "/";
  }

  let pathname = trimmed;

  if (!trimmed.startsWith("/")) {
    try {
      pathname = new URL(trimmed).pathname || "/";
    } catch {
      pathname = `/${trimmed.replace(/^\/+/, "")}`;
    }
  }

  const lowerCased = pathname.toLowerCase();
  const clean = lowerCased.replace(/\/+$/g, "");
  if (!clean || clean === "/home") {
    return "/";
  }

  return clean.startsWith("/") ? clean : `/${clean}`;
}

export const getPageTranslation = (pageUrl: string, language: Language = 'en'): PageContent | null => {
  const page = getPcrmResolvedPageByPath(normalizePagePathInput(pageUrl));

  if (!page) return null;

  const localized = getLocalizedPcrmPageContent(page, language);

  return {
    url: page.url,
    title: localized.title,
    title_vi: page.title_vi,
    description: localized.description,
    description_vi: page.description_vi,
    h1: localized.h1,
    h1_vi: page.h1_vi,
    h2: localized.h2,
    h2_vi: page.h2_vi,
    paragraphs: localized.paragraphs,
    paragraphs_vi: page.paragraphs_vi,
    images: page.images,
  };
};

export const translateText = (text: string | undefined | null, language: Language = 'en'): string => {
  if (!text) return '';
  if (language === 'en') return text;
  
  // Simple Vietnamese translations for common phrases
  const dictionary: Record<string, string> = {
    'Home': 'Trang chủ',
    'About': 'Về chúng tôi',
    'About Us': 'Về chúng tôi',
    'News': 'Tin tức',
    'Blog': 'Blog',
    'Contact': 'Liên hệ',
    'Donate': 'Quyên góp',
    'Products': 'Sản phẩm',
    'Shop': 'Cửa hàng',
    'Nutrition': 'Dinh dưỡng',
    'Health': 'Sức khỏe',
    'Medical': 'Y tế',
    'Research': 'Nghiên cứu',
    'Learn More': 'Tìm hiểu thêm',
    'Read More': 'Đọc tiếp',
    'back': 'quay lại',
  };

  for (const [en, vi] of Object.entries(dictionary)) {
    const regex = new RegExp(`\\b${en}\\b`, 'gi');
    if (regex.test(text)) {
      text = text.replace(regex, vi);
    }
  }

  return text;
};

export const getAllPages = () => getAllPcrmPages() as unknown as TranslatedPageData[];

export const getPageByPath = (path: string) => {
  return getPcrmResolvedPageByPath(path) as unknown as TranslatedPageData | undefined;
};
