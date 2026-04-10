import "server-only";

import { cookies } from "next/headers";
import enCommon from "@/public/locales/en/common.json";
import viCommon from "@/public/locales/vi/common.json";

export type SiteLanguage = "en" | "vi";
export type CommonLocale = typeof enCommon;

function repairMojibakeText(value: string): string {
  const suspiciousPattern = /Ã|Â|Ä|â|áº|á»|á¼|Ã¡|Ã©|Ã³|Ã£|Ãª|Ã´|Ã‘|Â©/;
  if (!suspiciousPattern.test(value)) {
    return value;
  }

  try {
    const repaired = decodeURIComponent(escape(value));
    return repaired || value;
  } catch {
    return value;
  }
}

function repairMojibakeDeep<T>(input: T): T {
  if (typeof input === "string") {
    return repairMojibakeText(input) as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => repairMojibakeDeep(item)) as T;
  }

  if (input && typeof input === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      output[key] = repairMojibakeDeep(value);
    }
    return output as T;
  }

  return input;
}

const VI_COMMON_LOCALE = repairMojibakeDeep(viCommon as CommonLocale);

export function normalizeSiteLanguage(value?: string | null): SiteLanguage {
  return value === "en" ? "en" : "vi";
}

export async function getSiteLanguageFromCookie(): Promise<SiteLanguage> {
  const cookieStore = await cookies();
  return normalizeSiteLanguage(cookieStore.get("site_lang")?.value);
}

export function getCommonLocale(lang: SiteLanguage): CommonLocale {
  return lang === "vi" ? VI_COMMON_LOCALE : enCommon;
}
