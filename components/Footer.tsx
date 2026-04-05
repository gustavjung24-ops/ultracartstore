'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Language } from '@/lib/translations';
import { getPreferredClientLanguage } from '@/lib/client-language';
import {
  COMMON_LOCALES,
  FOOTER_LEGAL_LINKS,
  FOOTER_UTILITY_LINKS,
  HEADER_MAIN_NAV_GROUPS,
  resolveCatalogLabel,
} from '@/lib/navigation-catalog';

export default function Footer() {
  const [language, setLanguage] = useState<Language>(() => getPreferredClientLanguage());

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

  return (
    <footer className="mt-16 border-t border-[#dbe5ec] bg-white text-[#1f2d3d]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Image
                src="/images/pcrm-wordmark.svg"
                alt={locale.site.name}
                width={210}
                height={95}
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
            <address className="not-italic text-sm leading-relaxed text-[#4a6072]">
              {locale.site.contact.addressLine1}
              <br />
              {locale.site.contact.addressLine2}
            </address>
            <div className="mt-3 space-y-1 text-sm">
              <a href={`mailto:${locale.site.contact.email}`} className="block text-[#1f2d3d] no-underline hover:text-[#007fab]">
                {locale.site.contact.email}
              </a>
              <a href={`tel:${locale.site.contact.phoneHref}`} className="block text-[#1f2d3d] no-underline hover:text-[#007fab]">
                {locale.site.contact.phoneDisplay}
              </a>
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
