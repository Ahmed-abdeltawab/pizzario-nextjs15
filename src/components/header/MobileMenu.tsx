"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "./Navbar";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import ProfileButton from "./profile-button";
import LangSwitcher from "./lang-switcher";
import CartButton from "./cart-button";
import ThemeToggle from "./theme-toggle";
import { Session } from "next-auth";

interface MobileMenuProps {
  translations: { [key: string]: string };
  locale: string;
  session: Session | null;
}

const MobileMenu = ({ translations, locale, session }: MobileMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex md:hidden items-center gap-3">
      <CartButton />
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        className="glass-button p-2 rounded-lg transition-all duration-200 hover:scale-105"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute left-0 right-0 top-16 sm:top-20 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 py-4 space-y-4 glass-card rounded-lg mt-2 p-4">
          <Navbar
            isMobile
            translations={translations}
            onLinkClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
            <ThemeToggle />
            <LangSwitcher />
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
      </div>
    </div>
  );
};

export default MobileMenu;
