"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPreferredClientLanguage } from "@/lib/client-language";
import type { Language } from "@/lib/translations";
import enCommon from "@/public/locales/en/common.json";
import viCommon from "@/public/locales/vi/common.json";

type CommonLocale = typeof enCommon;

const LOCALES: Record<Language, CommonLocale> = {
  en: enCommon,
  vi: viCommon as CommonLocale,
};

const CONTACT_INTRO_TOKENS = ["{shopPhone}", "{shopEmail}", "{mainPhone}", "{mainEmail}"] as const;

function renderContactIntro(
  intro: string,
  links: {
    shopPhone: string;
    shopEmail: string;
    mainPhone: string;
    mainEmail: string;
  },
) {
  return intro.split(/(\{shopPhone\}|\{shopEmail\}|\{mainPhone\}|\{mainEmail\})/g).map((part, index) => {
    if (!CONTACT_INTRO_TOKENS.includes(part as (typeof CONTACT_INTRO_TOKENS)[number])) {
      return <span key={`text-${index}`}>{part}</span>;
    }

    if (part === "{shopPhone}") {
      return (
        <a key={`shop-phone-${index}`} href="tel:+12025277306" className="text-brand-teal hover:underline font-medium">
          {links.shopPhone}
        </a>
      );
    }

    if (part === "{shopEmail}") {
      return (
        <a key={`shop-email-${index}`} href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline font-medium">
          {links.shopEmail}
        </a>
      );
    }

    if (part === "{mainPhone}") {
      return (
        <a key={`main-phone-${index}`} href="tel:+12026862210" className="text-brand-teal hover:underline font-medium">
          {links.mainPhone}
        </a>
      );
    }

    return (
      <a key={`main-email-${index}`} href="mailto:info@PCRM.org" className="text-brand-teal hover:underline font-medium">
        {links.mainEmail}
      </a>
    );
  });
}

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>(() => getPreferredClientLanguage());
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const syncLanguage = () => {
      setLanguage(getPreferredClientLanguage());
    };

    syncLanguage();
    window.addEventListener("languagechange", syncLanguage);
    return () => {
      window.removeEventListener("languagechange", syncLanguage);
    };
  }, []);

  const locale = useMemo(() => LOCALES[language], [language]);
  const contactUi = locale.repoUi.contact;
  const breadcrumbs = useMemo(
    () => [
      { label: contactUi.breadcrumbHome, href: "/" },
      { label: contactUi.breadcrumbHelp, href: "#" },
      { label: contactUi.breadcrumbCurrent },
    ],
    [contactUi.breadcrumbCurrent, contactUi.breadcrumbHelp, contactUi.breadcrumbHome],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(contactUi.mailSubject);
    const body = encodeURIComponent(
      `${contactUi.emailBodyName}: ${form.name}\n${contactUi.emailBodyEmail}: ${form.email}\n\n${contactUi.emailBodyMessage}:\n${form.message}`,
    );
    window.location.href = `mailto:fulfillment@PCRM.org?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-xl">
          <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-4 border-b border-gray-200 uppercase tracking-wide">
            {contactUi.title}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            {renderContactIntro(contactUi.intro, {
              shopPhone: "202-527-7306",
              shopEmail: "fulfillment@PCRM.org",
              mainPhone: "202-686-2210",
              mainEmail: "info@PCRM.org",
            })}
          </p>

          {sent ? (
            <div className="bg-brand-teal/10 border border-brand-teal/30 rounded p-6 text-brand-dark">
              <p className="font-semibold text-lg mb-1">{contactUi.successTitle}</p>
              <p className="text-sm text-gray-600">{contactUi.successBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {contactUi.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={60}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                  placeholder={contactUi.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {contactUi.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={60}
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                  placeholder={contactUi.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {contactUi.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-y"
                  placeholder={contactUi.messagePlaceholder}
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-brand-teal hover:bg-brand-mid text-white font-bold uppercase tracking-wide py-3 px-8 transition-colors"
                >
                    {contactUi.submit}
                </button>
                <span className="text-xs text-gray-400">{contactUi.responseTime}</span>
              </div>
            </form>
          )}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/12025277306"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors"
            >
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">WhatsApp</p>
                <p className="text-xs text-gray-500">{contactUi.quickMessage}</p>
              </div>
            </a>
            <a
              href="tel:+12025277306"
              className="flex items-center gap-3 p-4 border border-gray-200 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">202-527-7306</p>
                <p className="text-xs text-gray-500">{contactUi.quickCall}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
