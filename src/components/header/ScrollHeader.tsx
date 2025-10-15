"use client";
import React, { useState, useEffect } from "react";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

const ScrollHeader = ({ children }: ScrollHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full glass-header transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {children}
    </header>
  );
};

export default ScrollHeader;
