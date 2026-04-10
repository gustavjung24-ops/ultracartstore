"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type enCommon from "@/public/locales/en/common.json";

type ContactUi = (typeof enCommon)["contactPage"];

type ContactFormClientProps = {
  contactUi: ContactUi;
};

export default function ContactFormClient({ contactUi }: ContactFormClientProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(contactUi.mailSubject);
    const body = encodeURIComponent(
      `${contactUi.emailBodyName}: ${form.name}\n${contactUi.emailBodyEmail}: ${form.email}\n\n${contactUi.emailBodyMessage}:\n${form.message}`,
    );
    window.location.href = `mailto:fulfillment@PCRM.org?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-xl">
        <h1 className="text-brand-teal text-3xl font-semibold leading-tight pb-3 mb-4 border-b border-gray-200">
          {contactUi.title}
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          {contactUi.shopQuestionsPrefix}{" "}
          <a href="tel:+12025277306" className="text-brand-teal hover:underline font-medium">
            202-527-7306
          </a>
          , {contactUi.shopQuestionsMiddle}{" "}
          <a href="mailto:fulfillment@PCRM.org" className="text-brand-teal hover:underline font-medium">
            fulfillment@PCRM.org
          </a>
          . {contactUi.nonShopQuestionsPrefix}{" "}
          <a href="tel:+12026862210" className="text-brand-teal hover:underline font-medium">
            202-686-2210
          </a>{" "}
          {contactUi.orText}{" "}
          <a href="mailto:yhoclanhmanh@gmail.com" className="text-brand-teal hover:underline font-medium">
            yhoclanhmanh@gmail.com
          </a>
          . {contactUi.thankYou}
        </p>

        {sent ? (
          <div className="bg-brand-teal/10 border border-brand-teal/30 rounded p-6 text-brand-dark">
            <p className="font-semibold text-lg mb-1">{contactUi.successTitle}</p>
            <p className="text-sm text-gray-600">{contactUi.successDescription}</p>
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
                className="bg-brand-teal hover:bg-brand-mid text-white text-sm font-semibold tracking-[0.01em] py-3 px-8 transition-colors"
              >
                {contactUi.submitButton}
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
              <p className="font-semibold text-sm text-gray-800">{contactUi.whatsappLabel}</p>
              <p className="text-xs text-gray-500">{contactUi.whatsappSubLabel}</p>
            </div>
          </a>
          <a
            href="tel:+12025277306"
            className="flex items-center gap-3 p-4 border border-gray-200 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors"
          >
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-semibold text-sm text-gray-800">202-527-7306</p>
              <p className="text-xs text-gray-500">{contactUi.callSubLabel}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
