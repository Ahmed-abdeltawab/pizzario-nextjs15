import "server-only";
import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n-config";

/**
 * Gets the current locale from the request headers
 * This function can ONLY be used in Server Components
 */
export async function getCurrentLocale(): Promise<Locale> {
  const headersList = await headers();

  // Try to get pathname from different header sources
  const pathname = headersList.get("x-url");
  // Extract locale from pathname
  for (const locale of i18n.locales) {
    if (pathname?.includes(`/${locale}/`) || pathname?.endsWith(`/${locale}`)) {
      return locale;
    }
  }

  // Return default locale if not found
  return i18n.defaultLocale as Locale;
}
