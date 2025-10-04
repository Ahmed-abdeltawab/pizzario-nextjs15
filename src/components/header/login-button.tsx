import { Pages, Routes } from "@/constants/enums";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  return (
    <Link
      href={`${Routes.AUTH}/${Pages.LOGIN}`}
      className="inline-flex items-center gap-1.5 md:gap-2 
        px-4 md:px-5 lg:px-6 py-2 md:py-2.5
        bg-primary text-primary-foreground font-medium rounded-full
        text-sm md:text-base
        hover:bg-primary/90 hover:shadow-lg hover:scale-105
        active:scale-95 transition-all duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        whitespace-nowrap"
    >
      <LogIn className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
      <span>Login</span>
    </Link>
  );
};

export default LoginButton;
