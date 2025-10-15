import { Routes } from "@/constants/enums";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProfileButtonProps {
  locale?: string;
}

const ProfileButton = ({ locale = "en" }: ProfileButtonProps) => {
  return (
    <Link
      href={`/${locale}/${Routes.PROFILE}`}
      className="inline-flex items-center justify-center
        w-10 h-10 md:w-11 md:h-11
        bg-primary/10 text-primary font-medium rounded-full
        hover:bg-primary/20 hover:shadow-lg hover:scale-105
        active:scale-95 transition-all duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Profile"
      title="Profile"
    >
      <User className="w-5 h-5 md:w-5.5 md:h-5.5" strokeWidth={2.5} />
    </Link>
  );
};

export default ProfileButton;
