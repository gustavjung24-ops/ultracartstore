'use client';

import { type Language } from '@/lib/translations';

interface LanguageSwitcherProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
  englishLabel?: string;
  vietnameseLabel?: string;
}

export default function LanguageSwitcher({
  language = 'vi',
  onLanguageChange,
  englishLabel = 'English',
  vietnameseLabel = 'Vietnamese',
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
    <div className="inline-flex flex-nowrap items-center gap-2 rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-soft-cream)] p-1">
      <button
        onClick={() => handleChange('en')}
        className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold leading-5 tracking-[0.005em] transition ${
          language === 'en'
            ? 'bg-[color:var(--color-secondary-teal)] text-white'
            : 'text-[color:var(--color-body-text)] hover:text-[color:var(--color-primary-navy)]'
        }`}
      >
        {englishLabel}
      </button>
      <button
        onClick={() => handleChange('vi')}
        className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold leading-5 tracking-[0.005em] transition ${
          language === 'vi'
            ? 'bg-[color:var(--color-secondary-teal)] text-white'
            : 'text-[color:var(--color-body-text)] hover:text-[color:var(--color-primary-navy)]'
        }`}
      >
        {vietnameseLabel}
      </button>
    </div>
  );
}
