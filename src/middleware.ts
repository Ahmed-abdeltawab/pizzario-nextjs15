import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { Routes, UserRole } from "./constants/enums";
const PROTECTED_ROUTES = ["/profile", "/cart"];
const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];
const locales = i18n.locales as string[]; //  ['en', 'ar']

// 2. إنشاء Regex ديناميكيًا
const localePathnameRegex = new RegExp(`^/(${locales.join("|")})(/|$)`);
function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Array.from(i18n.locales);

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}
function intlMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // التحقق إذا كان المسار يفتقد للغة
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // إعادة التوجيه إذا كانت اللغة مفقودة
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // first handle locale redirects
    const localeResponse = intlMiddleware(request);
    // if intlMiddleware issued a redirect, propagate it
    if (localeResponse.headers.get("location")) {
      return localeResponse;
    }

    const { pathname } = request.nextUrl;

    const localeMatch = pathname.match(localePathnameRegex);
    const locale = localeMatch ? localeMatch[1] : i18n.defaultLocale;
    const pathnameWithoutLocale = localeMatch
      ? pathname.replace(`/${locale}`, "") || "/"
      : pathname;

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathnameWithoutLocale.startsWith(route)
    );
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      pathnameWithoutLocale.startsWith(route)
    );

    const token = request.nextauth?.token;

    // If user is logged in and trying to access auth pages, redirect to home
    if (isAuthRoute && token) {
      const role = token.role;
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${locale}/${Routes.ADMIN}`, request.url)
        );
      }
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
    if (token && pathname.startsWith(`/${locale}/${Routes.ADMIN}`)) {
      if (token.role !== UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${locale}/${Routes.PROFILE}`, request.url)
        );
      }
      return NextResponse.next();
    }
    if (!isProtectedRoute) {
      // If the route is not protected, allow access
      return NextResponse.next();
    }

    // If the user has a valid token, allow access
    if (token) {
      return NextResponse.next();
    }

    // If the route is protected and the user is not authenticated, redirect to sign-in page
    const signInUrl = new URL(`/${locale}/auth/signin`, request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  },
  {
    callbacks: {
      // authorized must return a boolean; actual redirect logic lives in the middleware above
      authorized: () => true,
    },
  }
);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
