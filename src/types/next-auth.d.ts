import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      image?: string | null;
      phone?: string | null;
      streetAddress?: string | null;
      postalCode?: string | null;
      city?: string | null;
      country?: string | null;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    image?: string | null;
    phone?: string | null;
    streetAddress?: string | null;
    postalCode?: string | null;
    city?: string | null;
    country?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: UserRole;
    email: string;
    image?: string | null;
    phone?: string | null;
    streetAddress?: string | null;
    postalCode?: string | null;
    city?: string | null;
    country?: string | null;
    createdAt: string;
    updatedAt: string;
  }
}
