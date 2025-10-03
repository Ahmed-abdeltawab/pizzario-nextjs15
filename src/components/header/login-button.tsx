import { Pages, Routes } from "@/constants/enums";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  return (
    <Link
      href={`${Routes.AUTH}/${Pages.LOGIN}`}
      className="inline-flex items-center gap-2 px-6 py-2.5 
        bg-primary text-primary-foreground font-medium rounded-full
        hover:bg-primary/90 hover:shadow-lg hover:scale-105
        active:scale-95 transition-all duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <LogIn className="w-4 h-4" strokeWidth={2.5} />
      <span>Login</span>
    </Link>
  );
};

export default LoginButton;
