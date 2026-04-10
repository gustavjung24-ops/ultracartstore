'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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

  const footerAuthors = useMemo(() => getAuthors().slice(0, 3), []);
  const headquartersLabel = language === 'vi' ? 'Trụ sở PCRM' : 'PCRM Headquarters';

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
            <p className="mt-4 text-sm leading-relaxed text-[#4a6072]">{locale.site.tagline}</p>
            <div className="mt-4 flex gap-3 text-sm font-medium">
              <a href="https://www.facebook.com/PCRM.org" target="_blank" rel="noreferrer" className="no-underline hover:text-[#007fab]">
                Facebook
              </a>
              <a href="https://www.instagram.com/pcrmhealth/" target="_blank" rel="noreferrer" className="no-underline hover:text-[#007fab]">
                Instagram
              </a>
              <a href="https://www.youtube.com/user/PCRMvideos" target="_blank" rel="noreferrer" className="no-underline hover:text-[#007fab]">
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#007fab]">{locale.common.mainMenu}</h4>
            <ul className="space-y-2 text-sm">
              {mainNavLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#1f2d3d] no-underline hover:text-[#007fab]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#007fab]">{locale.common.resources}</h4>
            <ul className="space-y-2 text-sm">
              {utilityLinks.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-[#1f2d3d] no-underline hover:text-[#007fab]">
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
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#007fab]">{locale.utilityNav.contact}</h4>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{headquartersLabel}</p>
            <address className="not-italic text-sm leading-relaxed text-[#4a6072]">
              {locale.site.contact.addressLine1}
              <br />
              {locale.site.contact.addressLine2}
            </address>
            <div className="mt-3 space-y-1 text-sm">
              <a
                href={`tel:${locale.site.contact.phoneHref}`}
                className="inline-flex items-center gap-2 text-[#1f2d3d] no-underline hover:text-[#007fab]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.65 2.61a2 2 0 0 1-.45 2.11L8.07 9.67a16 16 0 0 0 6.26 6.26l1.23-1.24a2 2 0 0 1 2.11-.45c.84.31 1.71.53 2.61.65A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{locale.site.contact.phoneDisplay}</span>
              </a>
            </div>
            <div className="mt-4 border-t border-[#e2e8f0] pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#007fab]">{locale.footerAuthor.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{locale.footerAuthor.description}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {footerAuthors.map((author) => (
                  <li key={author.id}>
                    <Link href={getAuthorProfileHref(author)} className="text-[#1f2d3d] no-underline hover:text-[#007fab]">
                      {author.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#e2e8f0] pt-6 text-sm text-[#64748b] md:flex-row md:items-center md:justify-between">
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
