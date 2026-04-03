"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



const navigation = [
  { label_en: 'Home', label_vi: 'Trang chủ', href: '/' },
  { label_en: 'About Us', label_vi: 'Về chúng tôi', href: '/about' },
  { label_en: 'Good Nutrition', label_vi: 'Dinh dưỡng tốt', href: '/nutrition' },
  { label_en: 'Ethical Science', label_vi: 'Khoa học đạo đức', href: '/science' },
  { label_en: 'Clinical Research', label_vi: 'Nghiên cứu lâm sàng', href: '/research' },
  { label_en: 'Health Topics', label_vi: 'Các chủ đề sức khỏe', href: '/health' },
  { label_en: 'Blog', label_vi: 'Blog', href: '/blog' },
  { label_en: 'Contact', label_vi: 'Liên hệ', href: '/contact' },
];

interface HeaderProps {
  locale?: string;
}

export default function Header({ locale = 'en' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLabel = (nav: any) => (locale === 'en' ? nav.label_en : nav.label_vi);
  return (
    <header className="sticky top-0 z-50 shadow-md">

      {/* ─── Tầng 1: thanh trên (teal vừa) ─── */}
      <div className="bg-brand-mid text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-7 gap-4">

          {/* Search */}
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="flex-1 max-w-xs hidden sm:flex items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm tài liệu..."
                className="w-full pl-3 pr-8 py-0.5 text-xs border border-brand-dark rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-teal"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-teal" aria-label="Tìm kiếm">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Nút liên hệ nhanh */}
          <div className="flex items-center gap-3 ml-auto text-xs font-medium">
            <a
              href="https://wa.me/12025277306"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-0.5 rounded text-white transition-colors"
            >
              {/* WhatsApp icon */}
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href="tel:+12025277306"
              className="flex items-center gap-1 hover:text-brand-teal transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
              </svg>
              <span>202-527-7306</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Tầng 2: header chính (teal sẫm) ─── */}
      <div className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Trang chủ">
            <Image
              src="https://d9i5ve8f04qxt.cloudfront.net/PCRM1/5011/pcrm_logo_white.png"
              alt="Physicians Committee Shop"
              width={180}
              height={48}
              className="h-10 w-auto object-contain"
              unoptimized
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0 text-sm font-bold uppercase tracking-wide">
            <Link href="/" className="px-4 py-6 hover:text-brand-teal transition-colors">
              Trang chủ
            </Link>

            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-6 hover:text-brand-teal transition-colors">
                Cửa hàng
                <svg className="h-3 w-3 mt-0.5" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
                </svg>
              </button>
              {shopOpen && (
                <div className="absolute top-full right-0 bg-brand-dark border-t border-brand-mid min-w-[200px] py-2 z-50">
                  {shopCategories.map((cat) => (
                    cat.external ? (
                      <a
                        key={cat.href}
                        href={cat.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-5 py-2 text-xs font-normal normal-case text-gray-200 hover:text-brand-teal hover:bg-brand-mid/30 whitespace-nowrap"
                        onClick={() => setShopOpen(false)}
                      >
                        {cat.label}
                      </a>
                    ) : (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-5 py-2 text-xs font-normal normal-case text-gray-200 hover:text-brand-teal hover:bg-brand-mid/30 whitespace-nowrap"
                        onClick={() => setShopOpen(false)}
                      >
                        {cat.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Hamburger mobile */}
          <button
            className="lg:hidden p-2 rounded hover:bg-brand-mid/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Mở menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tìm kiếm tài liệu..."
              className="w-full pl-3 pr-9 py-1.5 text-sm bg-white text-gray-700 border border-brand-mid rounded focus:outline-none focus:ring-1 focus:ring-brand-teal"
            />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-teal" aria-label="Tìm kiếm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile nav slide-down ─── */}
      {mobileOpen && (
        <div className="lg:hidden bg-brand-dark border-t border-brand-mid">
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col text-sm font-bold uppercase text-white">
            <Link href="/" className="py-3 border-b border-brand-mid/50 hover:text-brand-teal" onClick={() => setMobileOpen(false)}>
              Trang chủ
            </Link>
            <Link href="/shop" className="py-3 border-b border-brand-mid/50 hover:text-brand-teal" onClick={() => setMobileOpen(false)}>
              Cửa hàng
            </Link>
            <div className="py-2 border-b border-brand-mid/50">
              {shopCategories.map((cat) => (
                cat.external ? (
                  <a
                    key={cat.href}
                    href={cat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 pl-5 text-xs font-normal normal-case text-gray-300 hover:text-brand-teal"
                    onClick={() => setMobileOpen(false)}
                  >
                    — {cat.label}
                  </a>
                ) : (
                  <Link key={cat.href} href={cat.href} className="block py-1.5 pl-5 text-xs font-normal normal-case text-gray-300 hover:text-brand-teal" onClick={() => setMobileOpen(false)}>
                    — {cat.label}
                  </Link>
                )
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
