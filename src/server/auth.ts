import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/validation/auth";

export const authOptions: NextAuthOptions = {
  // Using JWT strategy with Credentials provider - no adapter needed
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials using Zod schema
          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            throw new Error("Invalid credentials format");
          }

          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          // Return user object with all necessary fields
          return {
            id: user.id,
            name: user.name || "",
            email: user.email || "",
            role: user.role || "USER",
            image: user.image || null,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial sign in - get fresh data from database
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.image = dbUser.image;
          token.phone = dbUser.phone;
          token.streetAddress = dbUser.streetAddress;
          token.postalCode = dbUser.postalCode;
          token.city = dbUser.city;
          token.country = dbUser.country;
          token.createdAt = dbUser.createdAt.toISOString();
          token.updatedAt = dbUser.updatedAt.toISOString();
        }
      }

      // Refresh user data on update trigger
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
        });

        if (dbUser) {
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.image = dbUser.image;
          token.phone = dbUser.phone;
          token.streetAddress = dbUser.streetAddress;
          token.postalCode = dbUser.postalCode;
          token.city = dbUser.city;
          token.country = dbUser.country;
          token.updatedAt = dbUser.updatedAt.toISOString();
          token.createdAt = dbUser.createdAt.toISOString();
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add all user info to session from token
      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.phone = token.phone;
        session.user.streetAddress = token.streetAddress;
        session.user.postalCode = token.postalCode;
        session.user.city = token.city;
        session.user.country = token.country;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    // error: "/auth/signin", // Redirect to signin page on error
  },

  // Security options
  secret: process.env.NEXTAUTH_SECRET,

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
};
