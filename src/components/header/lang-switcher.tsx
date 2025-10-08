'use client'
import { Globe } from "lucide-react";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

const LangSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname
  const currentLocale = i18n.locales.find(locale => pathname.startsWith(`/${locale}`)) || i18n.defaultLocale;
  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    
    // Add new locale to pathname
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1.5 md:gap-2 
          px-2.5 md:px-3 lg:px-4 py-2 rounded-lg border
          text-sm md:text-base
          hover:bg-accent/10 hover:border-primary/50
          active:scale-95 transition-all duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          whitespace-nowrap"
      >
        <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage?.nativeName}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 py-1 bg-popover border rounded-lg shadow-lg z-50
            animate-in fade-in-0 zoom-in-95 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full px-4 py-2.5 text-left text-sm
                  hover:bg-accent/50 transition-colors
                  ${currentLocale === lang.code ? 'bg-accent/30 font-medium text-primary' : ''}
                `}
              >
                <span className="block">{lang.nativeName}</span>
                <span className="block text-xs text-muted-foreground">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LangSwitcher;
