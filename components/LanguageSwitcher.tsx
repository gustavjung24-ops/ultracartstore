'use client';

import { type Language } from '@/lib/translations';

interface LanguageSwitcherProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function LanguageSwitcher({
  language = 'vi',
  onLanguageChange,
}: LanguageSwitcherProps) {
  const handleChange = (lang: Language) => {
    localStorage.setItem('language', lang);
    document.cookie = `site_lang=${lang}; path=/; max-age=31536000`;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
    window.location.reload();
  };

  return (
    <div className="inline-flex flex-nowrap items-center gap-1 rounded-md bg-gray-100 p-1">
      <button
        onClick={() => handleChange('en')}
        className={`whitespace-nowrap rounded px-2 py-1 text-[11px] font-semibold tracking-[0.01em] transition sm:px-3 ${
          language === 'en'
            ? 'bg-[#007fab] text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        ENGLISH
      </button>
      <button
        onClick={() => handleChange('vi')}
        className={`whitespace-nowrap rounded px-2 py-1 text-[11px] font-semibold tracking-[0.01em] transition sm:px-3 ${
          language === 'vi'
            ? 'bg-[#007fab] text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        {"TI\u1ebeNG VI\u1ec6T"}
      </button>
    </div>
  );
}
