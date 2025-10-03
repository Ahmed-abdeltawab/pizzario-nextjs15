import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/contexts/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  preload: true,
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Pizzario - Order Your Favorite Pizza Online",
  description: "A web application for ordering food online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className + " container mx-auto"}>
        <ThemeProvider defaultTheme="light" storageKey="pizzario-theme">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
