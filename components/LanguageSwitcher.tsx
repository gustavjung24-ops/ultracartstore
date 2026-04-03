'use client';

import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Retrieve saved language from localStorage
    const saved = localStorage.getItem('language') as 'en' | 'vi' | null;
    if (saved) {
      setLanguage(saved);
    } else {
      // Default to user's browser language or 'en'
      const browserLang = navigator.language.startsWith('vi') ? 'vi' : 'en';
      setLanguage(browserLang);
      localStorage.setItem('language', browserLang);
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'vi') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Optionally reload or trigger app state update
    window.dispatchEvent(
      new CustomEvent('languagechange', { detail: { language: lang } })
    );
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm font-semibold rounded transition ${
          language === 'en'
            ? 'bg-[#005e86] text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('vi')}
        className={`px-3 py-1 text-sm font-semibold rounded transition ${
          language === 'vi'
            ? 'bg-[#005e86] text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        Tiếng Việt
      </button>
    </div>
  );
}
