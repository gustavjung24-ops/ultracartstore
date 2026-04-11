'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import AuthorAvatar from '@/components/AuthorAvatar';
import logoImage from '../logo_main_2.png';
import type { Language } from '@/lib/translations';
import { getPreferredClientLanguage } from '@/lib/client-language';
import { getAuthorProfileHref, getAuthors } from '@/lib/authors';
import {
  COMMON_LOCALES,
  FOOTER_LEGAL_LINKS,
  FOOTER_UTILITY_LINKS,
  HEADER_MAIN_NAV_GROUPS,
  resolveCatalogLabel,
} from '@/lib/navigation-catalog';

type FooterProps = {
  initialLanguage?: Language;
};

export default function Footer({ initialLanguage }: FooterProps) {
  const [language, setLanguage] = useState<Language>(() => initialLanguage ?? getPreferredClientLanguage());
  const [isMainMenuOpen, setMainMenuOpen] = useState(false);
  const [isResourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    setLanguage(getPreferredClientLanguage());
  }, []);

  const locale = useMemo(() => COMMON_LOCALES[language], [language]);
  const currentYear = new Date().getFullYear();

  const mainNavLinks = useMemo(
    () =>
      HEADER_MAIN_NAV_GROUPS.map((group) => ({
        href: group.href,
        label: resolveCatalogLabel(locale, language, group),
      })),
    [locale, language]
  );

  const utilityLinks = useMemo(
    () =>
      FOOTER_UTILITY_LINKS.map((item) => ({
        href: item.href,
        label: resolveCatalogLabel(locale, language, item),
        external: item.external,
      })),
    [locale, language]
  );

  const legalLinks = useMemo(
    () =>
      FOOTER_LEGAL_LINKS.map((item) => ({
        href: item.href,
        label: resolveCatalogLabel(locale, language, item),
      })),
    [locale, language]
  );

  const footerAuthors = useMemo(() => getAuthors(), []);
  const viewAllAuthorsLabel = language === 'vi' ? 'Xem tất cả tác giả' : 'View all authors';

  return (
    <footer className="mt-16 border-t border-[#dbe5ec] bg-white text-[#1f2d3d]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Image
                src={logoImage}
                alt={locale.site.name}
                width={1024}
                height={1024}
                className="h-auto w-[180px]"
              />
            </Link>
            <p className="mt-4 text-[15px] leading-7 text-[#4a6072]">{locale.site.tagline}</p>
          </div>

          <div>
            <button
              type="button"
              className="mb-2 flex w-full items-center justify-between text-left"
              onClick={() => setMainMenuOpen((current) => !current)}
              aria-expanded={isMainMenuOpen}
            >
              <span className="text-[14px] font-semibold tracking-[0.005em] text-[#007fab]">{locale.common.mainMenu}</span>
              <span
                className={`text-[#007fab] transition-transform ${isMainMenuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {isMainMenuOpen ? (
              <ul className="space-y-2 text-[15px] leading-6">
                {mainNavLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[#1f2d3d] no-underline hover:text-[#007fab]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <button
              type="button"
              className="mb-2 flex w-full items-center justify-between text-left"
              onClick={() => setResourcesOpen((current) => !current)}
              aria-expanded={isResourcesOpen}
            >
              <span className="text-[14px] font-semibold tracking-[0.005em] text-[#007fab]">{locale.common.resources}</span>
              <span
                className={`text-[#007fab] transition-transform ${isResourcesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {isResourcesOpen ? (
              <ul className="space-y-2 text-[15px] leading-6">
                {utilityLinks.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1f2d3d] no-underline hover:text-[#007fab]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-[#1f2d3d] no-underline hover:text-[#007fab]">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <h4 className="mb-4 text-[14px] font-semibold tracking-[0.005em] text-[#007fab]">{locale.utilityNav.contact}</h4>
            <p className="text-sm leading-relaxed text-[#4a6072]">{locale.footer.contactDescription}</p>
            <Link
              href="/contact"
              className="mt-3 inline-flex rounded-full border border-[#0f5c73] px-4 py-2 text-sm font-semibold tracking-[0.005em] text-[#0f5c73] no-underline transition hover:bg-[#0f5c73] hover:text-white"
            >
              {locale.footer.contactCta}
            </Link>
            <div className="mt-4 border-t border-[#e2e8f0] pt-3">
              <p className="text-[14px] font-semibold tracking-[0.005em] text-[#007fab]">{locale.footerAuthor.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#64748b]">{locale.footerAuthor.description}</p>
              <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1 text-sm">
                {footerAuthors.map((author) => (
                  <li key={author.id}>
                    <Link
                      href={getAuthorProfileHref(author)}
                      className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 text-[#1f2d3d] no-underline transition hover:border-[#007fab]/40 hover:bg-slate-50"
                    >
                      <AuthorAvatar author={author} size="sm" className="shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-[#007fab]">
                          {author.displayName}
                        </p>
                        <p className="line-clamp-2 text-xs leading-[1.35rem] text-slate-500">{author.headline}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/authors"
                className="mt-3 inline-flex text-xs font-semibold tracking-[0.005em] text-[#0f5c73] no-underline hover:text-[#007fab]"
              >
                {viewAllAuthorsLabel}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#e2e8f0] pt-6 text-[13px] leading-6 text-[#64748b] md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} {locale.site.name}. {locale.footerLegal.allRightsReserved}</p>
          <div className="flex gap-4">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="no-underline hover:text-[#007fab]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
