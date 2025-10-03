'use client'
import { Globe } from "lucide-react";
import React, { useState } from "react";

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

const LangSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border
          hover:bg-accent/10 hover:border-primary/50
          active:scale-95 transition-all duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Globe className="w-4 h-4" strokeWidth={2} />
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
                onClick={() => {
                  setCurrentLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm
                  hover:bg-accent/50 transition-colors
                  ${currentLang === lang.code ? 'bg-accent/30 font-medium text-primary' : ''}
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
