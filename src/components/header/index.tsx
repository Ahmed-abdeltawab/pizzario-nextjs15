import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Navbar from "./Navbar";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import ProfileButton from "./profile-button";
import LangSwitcher from "./lang-switcher";
import CartButton from "./cart-button";
import ThemeToggle from "./theme-toggle";
import MobileMenu from "./MobileMenu";
import ScrollHeader from "./ScrollHeader";

interface HeaderProps {
  translations: { [key: string]: string };
  locale: string;
}

const Header= async ({ translations, locale }: HeaderProps) => {
  const session = await getServerSession(authOptions);
  return (
    <ScrollHeader>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="logo flex items-center gap-2 flex-shrink-0 hover:scale-105 transition-transform duration-200"
          >
            <span className="text-3xl sm:text-4xl drop-shadow-lg">🍕</span>
            <span className="text-xl sm:text-2xl font-bold text-primary drop-shadow-sm">
              Pizzario
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-8 flex-1 justify-end">
            <Navbar translations={translations} />
            <div className="flex items-center gap-1.5 md:gap-2 lg:gap-4 flex-shrink-0">
              <ThemeToggle />
              <LangSwitcher />
              <CartButton />
              {!session ? (
                <LoginButton locale={locale} />
              ) : (
                <>
                  <ProfileButton locale={locale} />
                  <LogoutButton locale={locale} />
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            translations={translations}
            locale={locale}
            session={session}
          />
        </div>
      </div>
    </ScrollHeader>
  );
};

export default Header;
