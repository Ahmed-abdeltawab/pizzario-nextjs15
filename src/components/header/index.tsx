"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import LoginButton from "./login-button";
import LangSwitcher from "./lang-switcher";
import CartButton from "./cart-button";
import ThemeToggle from "./theme-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import {
  getLocaleFromPathname,
} from "@/lib/getCurrentLocale";
import { usePathname } from "next/navigation";

const Header = ({
  translations,
}: {
  translations: { [key: string]: string };
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full glass-header transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
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
              <LoginButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
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
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 glass-card rounded-lg mt-2 p-4">
            <Navbar isMobile translations={translations} onLinkClick={() => setIsMobileMenuOpen(false)} />
            <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
              <ThemeToggle />
              <LangSwitcher />
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
