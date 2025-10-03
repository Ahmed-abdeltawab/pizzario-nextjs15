import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className + " container mx-auto"}>
        <Header />
        {children}
      </body>
    </html>
  );
}
