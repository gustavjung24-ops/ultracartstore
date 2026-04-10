import "server-only";

import { cookies } from "next/headers";
import enCommon from "@/public/locales/en/common.json";
import viCommon from "@/public/locales/vi/common.json";

export type SiteLanguage = "en" | "vi";
export type CommonLocale = typeof enCommon;

export function normalizeSiteLanguage(value?: string | null): SiteLanguage {
  return value === "en" ? "en" : "vi";
}

export async function getSiteLanguageFromCookie(): Promise<SiteLanguage> {
  const cookieStore = await cookies();
  return normalizeSiteLanguage(cookieStore.get("site_lang")?.value);
}

export function getCommonLocale(lang: SiteLanguage): CommonLocale {
  return lang === "en" ? enCommon : viCommon;
}
