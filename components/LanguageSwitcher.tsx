'use client';

import { type Language } from '@/lib/translations';

interface LanguageSwitcherProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function LanguageSwitcher({
  language = 'en',
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
    <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1 inline-flex">
      <button
        onClick={() => handleChange('en')}
        className={`px-3 py-1 text-xs font-semibold rounded transition ${
          language === 'en'
            ? 'bg-[#007fab] text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleChange('vi')}
        className={`px-3 py-1 text-xs font-semibold rounded transition ${
          language === 'vi'
            ? 'bg-[#007fab] text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        Tiếng Việt
      </button>
    </div>
  );
}
