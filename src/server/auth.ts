import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/validation/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // Remove PrismaAdapter when using JWT strategy with Credentials provider
  adapter: PrismaAdapter(prisma),
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
            id: user.id.toString(),
            name: user.name || "",
            email: user.email || "",
            // role: user.role || "USER",
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
          token.name = dbUser.name ?? (typeof token.name === "string" ? token.name : "");
          token.email = dbUser.email ?? (typeof token.email === "string" ? token.email : "");
          token.role = (dbUser as any).role || token.role || "USER";
          token.image = dbUser.image ?? null;
          token.emailVerified = dbUser.emailVerified ?? null;
          token.createdAt = (dbUser as any).createdAt?.toISOString() ?? token.createdAt;
          token.updatedAt = (dbUser as any).updatedAt?.toISOString() ?? token.updatedAt;
        }
      }

      // Refresh user data on update trigger
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
        });

        if (dbUser) {
          token.name = dbUser.name ?? (typeof token.name === "string" ? token.name : "");
          token.email = dbUser.email ?? (typeof token.email === "string" ? token.email : "");
          token.role = (dbUser as any).role || token.role || "USER";
          token.image = dbUser.image ?? null;
          token.emailVerified = dbUser.emailVerified ?? null;
          token.updatedAt = (dbUser as any).updatedAt?.toISOString() ?? token.updatedAt;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user info to session from token
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.name = typeof token.name === "string" ? token.name : session.user.name;
        session.user.email = typeof token.email === "string" ? token.email : session.user.email;
        session.user.image = (token.image as string | null) ?? session.user.image;
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
