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
      english: locale.languageSwitcher.english,
      vietnamese: locale.languageSwitcher.vietnamese,
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
        className="fixed inset-x-0 top-0 z-[9999] border-b border-[color:var(--color-border-light)] bg-white shadow-sm"
      >
        <div className="border-b border-white/20 bg-[color:var(--color-primary-navy)]">
          <div className="mx-auto flex max-w-7xl items-center justify-center overflow-hidden px-2 py-1.5 text-center text-slate-100 md:px-6">
            <span className="block max-w-full truncate whitespace-nowrap text-[10px] font-medium leading-4 tracking-[0.005em] sm:text-xs md:text-sm md:leading-5">
              Nội dung trang web này được trích từ{" "}
              <a
                href="https://www.pcrm.org"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/70 underline-offset-2 hover:text-white"
              >
                PCRM.org
              </a>
            </span>
          </div>
          <div className="mx-auto hidden max-w-7xl grid-cols-4 gap-2 px-4 py-1.5 md:px-6 lg:grid">
            {topGroups.map((group) => (
              <div key={group.id} className="group relative">
                <Link
                  href={group.href}
                  className="flex h-full items-center justify-center rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-center text-[13px] font-medium leading-5 tracking-[0.005em] text-white no-underline transition hover:bg-white/18"
                >
                  <span className="line-clamp-1">{group.label}</span>
                  <span className="ml-1 text-[11px]">{"\u25BE"}</span>
                </Link>

                <div className="absolute left-0 top-full z-50 hidden min-w-[260px] rounded-md border border-[#CFE1E5] bg-[#EEF6F7] p-2 shadow-[0_12px_24px_rgba(18,59,93,0.12)] lg:group-hover:block lg:group-focus-within:block">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.id}-${item.href}`}
                      href={item.href}
                      className="block rounded px-2.5 py-2 text-sm font-medium leading-6 text-[#244150] no-underline hover:bg-[#DCEDEF] hover:text-[#0F6E7E]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-[color:var(--color-border-light)] bg-white px-2 py-2 sm:px-4 md:px-6 md:py-2">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-1 sm:gap-2">
            <div className="order-1 flex shrink-0 items-center gap-1.5 md:gap-3">
              {mounted ? (
                <div className="inline-flex flex-nowrap overflow-hidden rounded-md border border-slate-300 bg-white lg:hidden">
                  <button
                    onClick={() => handleLanguageChange('vi')}
                    className={`whitespace-nowrap px-2.5 py-1.5 text-xs font-semibold tracking-[0.005em] transition ${
                      language === 'vi' ? 'bg-[color:var(--color-primary-navy)] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {currentLabels.vietnamese}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`whitespace-nowrap border-l border-slate-300 px-2.5 py-1.5 text-xs font-semibold tracking-[0.005em] transition ${
                      language === 'en' ? 'bg-[color:var(--color-primary-navy)] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {currentLabels.english}
                  </button>
                </div>
              ) : null}

              {mounted ? (
                <div className="hidden lg:block">
                  <LanguageSwitcher
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    englishLabel={currentLabels.english}
                    vietnameseLabel={currentLabels.vietnamese}
                  />
                </div>
              ) : null}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-[color:var(--color-primary-navy)] lg:hidden"
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
                  className="h-[30px] w-auto object-contain drop-shadow-[0_2px_7px_rgba(15,92,115,0.24)] sm:h-[54px] md:h-[46px] lg:h-[48px]"
                  sizes="(min-width: 1024px) 48px, (min-width: 768px) 46px, (min-width: 640px) 54px, 46px"
                  priority
                />
                <p className="hidden whitespace-nowrap text-xs font-medium tracking-[0.005em] text-[color:var(--color-primary-navy)] sm:block sm:text-sm md:hidden">
                  {locale.site.tagline}
                </p>
              </div>
            </Link>
          </div>
          <p className="mt-1 text-center text-xs font-medium tracking-[0.005em] text-[color:var(--color-primary-navy)] sm:hidden">
            {locale.site.tagline}
          </p>
        </div>

        <nav className="hidden bg-[color:var(--color-primary-navy)] lg:block">
          <div className="mx-auto flex max-w-7xl items-stretch justify-between px-4 md:px-6">
            {mainGroups.map((group, index) => {
              const alignClass = index >= mainGroups.length - 2 ? 'left-auto right-0' : 'left-0';
              const panelWidthClass = group.columns === 3 ? 'w-[880px]' : 'w-[620px]';
              const gridColsClass = group.columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

              return (
                <div key={group.id} className="group relative">
                  <Link
                    href={group.href}
                    className="flex h-full items-center px-4 py-3 text-sm font-semibold leading-[1.35rem] tracking-[0.005em] text-white no-underline hover:bg-[color:var(--color-secondary-teal)]"
                  >
                    {group.label}
                  </Link>

                  {group.items.length > 0 ? (
                    <div
                      className={`absolute ${alignClass} top-full z-50 hidden ${panelWidthClass} max-w-[94vw] border border-[#CFE1E5] bg-[#EEF6F7] p-5 shadow-[0_14px_28px_rgba(18,59,93,0.12)] group-hover:block`}
                    >
                      <div className="mb-3 border-b border-[#CFE1E5] pb-2 text-[13px] font-semibold tracking-[0.005em] text-[#0F6E7E]">
                        {group.label}
                      </div>
                      <div className={`grid max-h-[68vh] ${gridColsClass} gap-x-6 gap-y-2 overflow-auto pr-1`}>
                        {group.items.map((item) => (
                          <Link
                            key={`${group.id}-${item.href}`}
                            href={item.href}
                            className="block rounded-sm px-2 py-2 text-sm font-medium leading-6 text-[#244150] no-underline hover:bg-[#DCEDEF] hover:text-[#0F6E7E]"
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
          <div className="max-h-[72vh] overflow-y-auto border-t border-[#CFE1E5] bg-[#EEF6F7] px-4 py-4 lg:hidden">
            <div className="space-y-4">
              {mounted ? (
                <div className="rounded-lg border border-[#CFE1E5] bg-[#EEF6F7] p-3">
                  <div className="mb-2 text-[13px] font-medium tracking-[0.005em] text-[#0F6E7E]">
                    {currentLabels.quickAccess}
                  </div>
                  <LanguageSwitcher
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    englishLabel={currentLabels.english}
                    vietnameseLabel={currentLabels.vietnamese}
                  />
                </div>
              ) : null}

              {mobileMenuGroups.map((group) => (
                <div key={group.key} className="rounded-lg border border-[#CFE1E5] bg-[#EEF6F7]">
                  <button
                    onClick={() => setOpenMobileGroup((prev) => (prev === group.key ? null : group.key))}
                    className="flex w-full items-center justify-between border-b border-[#CFE1E5] px-4 py-3 text-left text-[15px] font-medium leading-snug text-[#0F6E7E]"
                    aria-expanded={openMobileGroup === group.key}
                  >
                    <span>{group.label}</span>
                    <span className={`text-base transition-transform ${openMobileGroup === group.key ? 'rotate-180' : ''}`}>{"\u25BE"}</span>
                  </button>
                  {openMobileGroup === group.key ? (
                    <div className="grid gap-1 p-2">
                      <Link
                        href={group.href}
                        className="rounded px-3 py-2 text-sm font-semibold leading-6 text-[#0F6E7E] no-underline hover:bg-[#DCEDEF]"
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
                            className="rounded px-3 py-2 text-sm font-medium leading-6 text-[#244150] no-underline hover:bg-[#DCEDEF] hover:text-[#0F6E7E]"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            key={`${group.key}-${item.href}`}
                            href={item.href}
                            className="rounded px-3 py-2 text-sm font-medium leading-6 text-[#244150] no-underline hover:bg-[#DCEDEF] hover:text-[#0F6E7E]"
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

              <div className="flex flex-col gap-2 border-t border-[#CFE1E5] pt-4 text-sm text-[#244150]">
                <a
                  href={`tel:${locale.site.contact.phoneHref}`}
                  className="inline-flex items-center gap-2 no-underline hover:text-[color:var(--color-secondary-teal)]"
                >
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
