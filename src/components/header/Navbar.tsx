"use client";
import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Routes } from "@/constants/enums";
import { languagesType } from "@/i18n-config";

interface NavbarProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
  translations?: { [key: string]: string };
}

const Navbar = ({
  isMobile = false,
  onLinkClick,
  translations,
}: NavbarProps) => {
  const pathname = usePathname() ?? "/";
  const { locale } = useParams() as { locale: languagesType };

  const links = [
    {
      name: translations?.home,
      path: Routes.ROOT,
    },
    {
      name: translations?.menu,
      path: Routes.MENU,
    },
    {
      name: translations?.about,
      path: Routes.ABOUT,
    },
    {
      name: translations?.contact,
      path: Routes.CONTACT,
    },
  ];
  return (
    <nav
      aria-label="Main navigation"
      className={
        isMobile
          ? "flex flex-col gap-1"
          : "flex flex-row items-center gap-0.5 md:gap-1 lg:gap-2"
      }
    >
      {links.map((link) => {
        // Construct the full path with locale
        const fullPath = link.path === Routes.ROOT 
          ? `/${locale}` 
          : `/${locale}/${link.path}`;
        
        // Check if current path is active
        const isActive = pathname === fullPath || 
          (link.path !== Routes.ROOT && pathname.startsWith(fullPath));

        return (
          <Link
            key={link.path}
            href={fullPath}
            aria-current={isActive ? "page" : undefined}
            onClick={onLinkClick}
            className={`
              relative px-2 md:px-3 lg:px-4 py-2 rounded-lg font-medium 
              text-sm md:text-base
              transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "text-primary glass-card shadow-md scale-105"
                  : "text-foreground hover:text-primary hover:glass-button hover:scale-105"
              }
              ${isMobile ? "w-full text-left" : ""}
            `}
          >
            {link.name}
            {isActive && !isMobile && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full shadow-lg shadow-primary/50" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
