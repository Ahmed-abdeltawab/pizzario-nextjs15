import { i18n, type Locale } from "@/i18n-config";

/**
 * Gets the current locale from URL pathname (client-side)
 * This function can be used in Client Components
 */
export function getLocaleFromPathname(pathname: string): Locale {
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }

  return i18n.defaultLocale as Locale;
}