import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Roboto } from "next/font/google";
import { Directions, Languages } from "@/constants/enums";
import { i18n, type Locale } from "@/i18n-config";
import { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import ReduxProvider from "@/providers/ReduxProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import Header from "@/components/header";

const roboto = Roboto({
  subsets: ["latin"],
  preload: true,
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Pizzario - Order Your Favorite Pizza Online",
  description: "A web application for ordering food online",
};
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const locale = (await params).locale;
  const direction =
    locale === Languages.ARABIC ? Directions.RTL : Directions.LTR;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={roboto.className + " container mx-auto"}>
        <ReduxProvider>
          <NextAuthProvider>
            <ThemeProvider defaultTheme="light" storageKey="pizzario-theme">
              <Header translations={dict.nav} locale={locale} />
              {children}
            </ThemeProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
