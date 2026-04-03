'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { getNavigation, getSiteInfo, type Language } from '@/lib/translations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
  };

  const nav = getNavigation(language);
  const siteInfo = getSiteInfo(language);

  const labels = {
    en: {
      search: 'Search',
      contact: 'Contact',
      donate: 'Donate',
    },
    vi: {
      search: 'Tìm kiếm',
      contact: 'Liên hệ',
      donate: 'Quyên góp',
    },
  };

  const currentLabels = labels[language];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Toolbar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex gap-8">
            <a href="tel:+1-202-527-7306" className="hover:text-gray-300 transition">
              📞 202-527-7306
            </a>
            <a href="mailto:info@pcrm.org" className="hover:text-gray-300 transition">
              ✉️ info@pcrm.org
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <button className="hover:text-gray-300 transition">
              🔍 {currentLabels.search}
            </button>
            <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-200">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <span className="text-3xl font-bold text-[#007fab]">🏥</span>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-gray-700 leading-tight">
              {siteInfo.name}
            </div>
            <div className="text-xs text-gray-500 leading-tight">
              Promoting Preventive Medicine
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center px-8">
          {nav.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-[#007fab] transition duration-200 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="text-sm font-medium text-gray-700 hover:text-[#007fab] transition">
              More ▼
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg hidden group-hover:block py-2 border border-gray-200">
              {nav.slice(6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#007fab] transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="bg-[#f0ad4e] hover:bg-[#ec971f] text-gray-900 font-bold px-4 py-2 rounded-md transition text-sm"
          >
            💝 {currentLabels.donate}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-gray-50 py-4 px-4">
          <div className="space-y-2 mb-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-700 font-medium hover:bg-blue-100 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t pt-4 px-4">
            <div className="mb-3">
              {mounted && (
                <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
              )}
            </div>
            <a
              href="tel:+1-202-527-7306"
              className="block text-sm text-[#007fab] font-medium hover:underline"
            >
              📞 202-527-7306
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

