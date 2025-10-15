"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

interface LogoutButtonProps {
  locale?: string;
}

const LogoutButton = ({ locale = "en" }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: `/${locale}`,
      redirect: true,
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 md:gap-2 
        px-4 md:px-5 lg:px-6 py-2 md:py-2.5
        bg-destructive text-destructive-foreground font-medium rounded-full
        text-sm md:text-base
        hover:bg-destructive/90 hover:shadow-lg hover:scale-105
        active:scale-95 transition-all duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        whitespace-nowrap"
    >
      <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
