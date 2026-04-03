import vietnameseData from '@/pcrm_translated/pcrm_vietnamese_data.json';

export type Language = 'en' | 'vi';

type NavItem = {
  label_en: string;
  label_vi: string;
  href: string;
};

type SiteInfo = {
  name_en: string;
  name_vi: string;
  description_en: string;
  description_vi: string;
  logo: string;
  color_primary: string;
  color_secondary: string;
};

type TranslationsData = {
  site: SiteInfo;
  navigation: NavItem[];
};

const translations = vietnameseData as TranslationsData;

export const t = (key: string, lang: Language = 'en'): string => {
  if (lang === 'vi') {
    const viKey = key.replace('_en', '_vi');
    return (translations as unknown as Record<string, string>)?.[viKey] || (translations as unknown as Record<string, string>)?.[key] || key;
  }
  return (translations as unknown as Record<string, string>)?.[key] || key;
};

// Navigation translations
export const getNavigation = (lang: Language = 'en') => {
  return translations.navigation.map(item => ({
    label: lang === 'vi' ? item.label_vi : item.label_en,
    href: item.href,
  }));
};

// Site info translations
export const getSiteInfo = (lang: Language = 'en') => ({
  name: lang === 'vi' ? translations.site.name_vi : translations.site.name_en,
  description: lang === 'vi' ? translations.site.description_vi : translations.site.description_en,
  logo: translations.site.logo,
  color_primary: translations.site.color_primary,
  color_secondary: translations.site.color_secondary,
});
