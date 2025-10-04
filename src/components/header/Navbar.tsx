'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Routes } from "@/constants/enums";

const links = [
  {
    id: crypto.randomUUID(),
    name: "Home",
    path: Routes.ROOT,
  },
  {
    id: crypto.randomUUID(),
    name: "Menu",
    path: Routes.MENU,
  },
  {
    id: crypto.randomUUID(),
    name: "About",
    path: Routes.ABOUT,
  },
  {
    id: crypto.randomUUID(),
    name: "Contact",
    path: Routes.CONTACT,
  },
];

interface NavbarProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const Navbar = ({ isMobile = false, onLinkClick }: NavbarProps) => {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label="Main navigation"
      className={isMobile ? "flex flex-col gap-1" : "flex flex-row items-center gap-0.5 md:gap-1 lg:gap-2"}
    >
      {links.map((link) => {
        const isActive =
          pathname === link.path ||
          (link.path !== "/" && pathname.startsWith(link.path));

        return (
          <Link
            key={link.id}
            href={link.path}
            aria-current={isActive ? "page" : undefined}
            onClick={onLinkClick}
            className={`
              relative px-2 md:px-3 lg:px-4 py-2 rounded-lg font-medium 
              text-sm md:text-base
              transition-all duration-200 ease-in-out
              ${isActive 
                ? 'text-primary bg-primary/10' 
                : 'text-foreground hover:text-primary hover:bg-accent/10'
              }
              ${isMobile ? 'w-full text-left' : ''}
            `}
          >
            {link.name}
            {isActive && !isMobile && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
