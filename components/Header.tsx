'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import logoImage from '../logo_main_2.png';
import LanguageSwitcher from './LanguageSwitcher';
import { type Language } from '@/lib/translations';
import { getPreferredClientLanguage, persistClientLanguage } from '@/lib/client-language';
import {
  COMMON_LOCALES,
  HEADER_MAIN_NAV_GROUPS,
  HEADER_TOP_NAV_GROUPS,
  resolveCatalogLabel,
  type CatalogItem,
  type CommonLocaleDictionary,
} from '@/lib/navigation-catalog';

type RenderNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

type RenderTopGroup = {
  id: string;
  href: string;
  label: string;
  items: RenderNavItem[];
};

type RenderMainGroup = {
  id: string;
  href: string;
  label: string;
  columns: 2 | 3;
  items: RenderNavItem[];
};

function toRenderItem(locale: CommonLocaleDictionary, language: Language, item: CatalogItem): RenderNavItem {
  return {
    href: item.href,
    label: resolveCatalogLabel(locale, language, item),
    external: item.external,
  };
}

type HeaderProps = {
  initialLanguage?: Language;
};

export default function Header({ initialLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(() => initialLanguage ?? getPreferredClientLanguage());
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setLanguage(getPreferredClientLanguage());
  }, []);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    setHeaderHeight(node.offsetHeight);

    const observer = new ResizeObserver((entries) => {
      const [entry] = entries;
      if (entry) {
        setHeaderHeight(Math.ceil(entry.contentRect.height));
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    persistClientLanguage(lang);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
    window.location.reload();
  };

  const locale = useMemo(() => COMMON_LOCALES[language], [language]);

  const topGroups = useMemo<RenderTopGroup[]>(() => {
    return HEADER_TOP_NAV_GROUPS.map((group) => ({
      id: group.id,
      href: group.href,
      label: resolveCatalogLabel(locale, language, group),
      items: group.items.map((item) => toRenderItem(locale, language, item)),
    }));
  }, [locale, language]);

  const mainGroups = useMemo<RenderMainGroup[]>(() => {
    return HEADER_MAIN_NAV_GROUPS.map((group) => ({
      id: group.id,
      href: group.href,
      columns: group.columns,
      label: resolveCatalogLabel(locale, language, group),
      items: group.items.map((item) => toRenderItem(locale, language, item)),
    }));
  }, [locale, language]);

  const currentLabels = useMemo(() => {
    return {
      menu: locale.common.mainMenu,
      quickAccess: locale.repoUi.quickAccess,
      openMainSection: locale.repoUi.openMainSection,
    };
  }, [locale]);

  const mobileMenuGroups: Array<{ key: string; href: string; label: string; items: RenderNavItem[] }> = [
    ...topGroups.map((group) => ({
      key: `top:${group.id}`,
      href: group.href,
      label: group.label,
      items: group.items,
    })),
    ...mainGroups.map((group) => ({
      key: `main:${group.id}`,
      href: group.href,
      label: group.label,
      items: group.items,
    })),
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="inset-x-0 top-0 z-[9999] border-b border-slate-200 bg-white shadow-sm"
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <div className="border-b border-[#2a5d7d] bg-[#18354a]">
          <div className="mx-auto max-w-7xl overflow-hidden px-3 py-1 text-center text-[9px] leading-4 text-slate-100 whitespace-nowrap md:px-6 md:text-[11px] md:leading-5">
            {locale.repoUi.sourceNotice}{" "}
            <a
              href="http://www.pcrm.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-100 underline underline-offset-2 hover:text-white"
            >
              www.pcrm.org
            </a>
          </div>
          <div className="mx-auto hidden max-w-7xl grid-cols-4 gap-2 px-4 py-2 md:px-6 lg:grid">
            {topGroups.map((group) => (
              <div key={group.id} className="group relative">
                <Link
                  href={group.href}
                  className="flex h-full items-center justify-center rounded-md border border-white/20 bg-white/10 px-2 py-2 text-center text-[11px] font-semibold text-white no-underline transition hover:bg-white/18"
                >
                  <span className="line-clamp-1">{group.label}</span>
                  <span className="ml-1 text-[10px]">▾</span>
                </Link>

                <div className="absolute left-0 top-full z-50 hidden min-w-[260px] rounded-md border border-slate-200 bg-white p-2 shadow-2xl lg:group-hover:block lg:group-focus-within:block">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.id}-${item.href}`}
                      href={item.href}
                      className="block rounded px-2.5 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 hover:text-[#007fab]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-slate-200 bg-white px-2 py-2 sm:px-4 md:px-6 md:py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-1 sm:gap-2">
            <div className="order-1 flex shrink-0 items-center gap-1.5 md:gap-3">
              {mounted ? (
                <div className="inline-flex flex-nowrap overflow-hidden rounded-md border border-slate-300 bg-white lg:hidden">
                  <button
                    onClick={() => handleLanguageChange('vi')}
                    className={`whitespace-nowrap px-2 py-1 text-[10px] font-bold uppercase tracking-[0.02em] transition ${
                      language === 'vi' ? 'bg-[#007fab] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    TIẾNG VIỆT
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`whitespace-nowrap border-l border-slate-300 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.02em] transition ${
                      language === 'en' ? 'bg-[#007fab] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    ENGLISH
                  </button>
                </div>
              ) : null}

              {mounted ? (
                <div className="hidden lg:block">
                  <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
                </div>
              ) : null}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-[#0f5c73] lg:hidden"
                aria-label={currentLabels.menu}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>

            <Link href="/" className="order-2 ml-auto shrink-0 no-underline hover:opacity-95">
              <div className="flex flex-col items-center gap-0.5 text-center sm:items-end sm:text-right">
                <Image
                  src={logoImage}
                  alt={locale.site.name}
                  width={1024}
                  height={1024}
                  className="h-[30px] w-auto object-contain drop-shadow-[0_2px_7px_rgba(15,92,115,0.24)] sm:h-[54px] md:h-[62px]"
                  sizes="(min-width: 768px) 62px, (min-width: 640px) 54px, 46px"
                  priority
                />
                <p className="hidden text-[8px] font-semibold tracking-[0.02em] text-[#0f5c73] whitespace-nowrap sm:block sm:text-[11px] sm:uppercase sm:tracking-[0.08em]">
                  {locale.site.tagline}
                </p>
              </div>
            </Link>
          </div>
          <p className="mt-1 text-center text-[8px] font-semibold uppercase tracking-[0.08em] text-[#0f5c73] sm:hidden">
            {locale.site.tagline}
          </p>
        </div>

        <nav className="hidden bg-[#007fab] lg:block">
          <div className="mx-auto flex max-w-7xl items-stretch justify-between px-4 md:px-6">
            {mainGroups.map((group, index) => {
              const alignClass = index >= mainGroups.length - 2 ? 'left-auto right-0' : 'left-0';
              const panelWidthClass = group.columns === 3 ? 'w-[880px]' : 'w-[620px]';
              const gridColsClass = group.columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

              return (
                <div key={group.id} className="group relative">
                  <Link
                    href={group.href}
                    className="flex h-full items-center px-4 py-4 text-sm font-bold uppercase tracking-[0.05em] text-white no-underline hover:bg-[#005f87]"
                  >
                    {group.label}
                  </Link>

                  {group.items.length > 0 ? (
                    <div className={`absolute ${alignClass} top-full z-50 hidden ${panelWidthClass} max-w-[94vw] border border-slate-200 bg-white p-5 shadow-2xl group-hover:block`}>
                      <div className="mb-3 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-[0.06em] text-[#007fab]">
                        {group.label}
                      </div>
                      <div className={`grid max-h-[68vh] ${gridColsClass} gap-x-6 gap-y-2 overflow-auto pr-1`}>
                        {group.items.map((item) => (
                          <Link
                            key={`${group.id}-${item.href}`}
                            href={item.href}
                            className="block rounded-sm px-2 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 hover:text-[#007fab]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>

        {isMenuOpen ? (
          <div className="max-h-[72vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="space-y-4">
              {mounted ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    {currentLabels.quickAccess}
                  </div>
                  <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
                </div>
              ) : null}

              {mobileMenuGroups.map((group) => (
                <div key={group.key} className="rounded-lg border border-slate-200">
                  <button
                    onClick={() => setOpenMobileGroup((prev) => (prev === group.key ? null : group.key))}
                    className="flex w-full items-center justify-between border-b border-slate-200 px-4 py-3 text-left text-sm font-bold text-[#007fab]"
                    aria-expanded={openMobileGroup === group.key}
                  >
                    <span>{group.label}</span>
                    <span className={`text-base transition-transform ${openMobileGroup === group.key ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {openMobileGroup === group.key ? (
                    <div className="grid gap-1 p-2">
                      <Link
                        href={group.href}
                        className="rounded px-3 py-2 text-sm font-semibold text-[#0f5c73] no-underline hover:bg-slate-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {currentLabels.openMainSection}
                      </Link>
                      {group.items.map((item) => (
                        item.external ? (
                          <a
                            key={`${group.key}-${item.href}`}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded px-3 py-2 text-sm text-slate-700 no-underline hover:bg-slate-50"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            key={`${group.key}-${item.href}`}
                            href={item.href}
                            className="rounded px-3 py-2 text-sm text-slate-700 no-underline hover:bg-slate-50"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm text-slate-700">
                <a href={`tel:${locale.site.contact.phoneHref}`} className="inline-flex items-center gap-2 no-underline hover:text-[#007fab]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.65 2.61a2 2 0 0 1-.45 2.11L8.07 9.67a16 16 0 0 0 6.26 6.26l1.23-1.24a2 2 0 0 1 2.11-.45c.84.31 1.71.53 2.61.65A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{locale.site.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>
      <div aria-hidden style={{ height: headerHeight > 0 ? `${headerHeight}px` : '120px' }} />
    </>
  );
}
