import translatedAll from '@/pcrm_translated/translated_all.json';
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

export const getPageTranslation = (pageUrl: string, language: Language = 'en'): PageContent | null => {
  const normalizedUrl = pageUrl.toLowerCase().trim();
  
  const page = (translatedAll as unknown as TranslatedPageData[]).find((p) => {
    const pUrl = p.url?.toLowerCase() || '';
    return pUrl === normalizedUrl || pUrl.includes(normalizedUrl);
  });

  if (!page) return null;

  if (language === 'vi') {
    return {
      title: page.title_vi || page.title,
      description: page.description_vi || page.description,
      h1: page.h1_vi || page.h1,
      h2: page.h2_vi || page.h2,
      paragraphs: page.paragraphs_vi || page.paragraphs,
      images: page.images,
      url: page.url,
    };
  }

  return page;
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

export const getAllPages = () => translatedAll as unknown as TranslatedPageData[];

export const getPageByPath = (path: string) => {
  const normalizedPath = path.toLowerCase();
  return (translatedAll as unknown as TranslatedPageData[]).find((p) => {
    const pUrl = p.url?.toLowerCase() || '';
    return pUrl.includes(normalizedPath);
  });
};
