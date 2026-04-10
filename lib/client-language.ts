import type { Language } from '@/lib/translations';

const LANGUAGE_COOKIE_REGEX = /(?:^|; )site_lang=(en|vi)(?:;|$)/;

function normalizeLanguage(value?: string | null): Language | null {
  if (value === 'en' || value === 'vi') {
    return value;
  }

  return null;
}

export function getClientLanguageFromStorage(): Language | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return normalizeLanguage(window.localStorage.getItem('language'));
  } catch {
    return null;
  }
}

export function getClientLanguageFromCookie(cookieValue?: string): Language | null {
  const cookieSource = cookieValue ?? (typeof document !== 'undefined' ? document.cookie : '');
  if (!cookieSource) {
    return null;
  }

  const match = cookieSource.match(LANGUAGE_COOKIE_REGEX);
  return normalizeLanguage(match?.[1]);
}

export function getPreferredClientLanguage(): Language {
  return getClientLanguageFromStorage() ?? getClientLanguageFromCookie() ?? 'vi';
}

export function persistClientLanguage(language: Language): void {
  if (typeof document === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem('language', language);
  } catch {
    // Ignore write failures in private modes and continue with cookie fallback.
  }

  document.cookie = `site_lang=${language}; path=/; max-age=31536000`;
}
