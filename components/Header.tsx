'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { getMainNavigation } from '@/lib/pcrm-content';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = getMainNavigation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-[#ffb53d]">
      {/* Top Callout Bar */}
      <div className="bg-[#005e86] text-white text-sm py-2 px-4">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <span className="font-semibold">🏥 Physicians Committee for Responsible Medicine - Việt Nam</span>
          <span>📞 +84 (28) 2222-2222</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[#005e86] font-bold text-lg hover:opacity-80 transition">
          <span className="text-2xl">🏥</span>
          <span className="hidden sm:inline font-serif">PCRM</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#005e86] transition duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#005e86] rounded transition">
              Thêm ▼
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block py-2">
              {nav.slice(5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#005e86] transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/donate"
            className="btn btn-accent px-4 py-2 md:px-5 md:py-2 text-sm font-bold rounded-lg hover:shadow-lg transition"
          >
            💝 Quyên góp
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#005e86] hover:bg-gray-100 rounded-lg"
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
          <div className="space-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
