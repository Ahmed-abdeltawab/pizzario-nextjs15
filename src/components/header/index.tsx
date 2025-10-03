'use client'
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import LoginButton from "./login-button";
import LangSwitcher from "./lang-switcher";
import CartButton from "./cart-button";
import ThemeToggle from "./theme-toggle";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="logo flex items-center gap-2">
            <span className="text-3xl sm:text-4xl">🍕</span>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              Pizzario
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Navbar />
            <div className="flex items-center gap-3 lg:gap-4">
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
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
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
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t">
            <Navbar isMobile onLinkClick={() => setIsMobileMenuOpen(false)} />
            <div className="flex flex-col gap-3 pt-4 border-t">
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
