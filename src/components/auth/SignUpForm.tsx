"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { registerUser } from "@/app/actions/auth";

const initialState = { success: false, message: "" };

interface SignUpFormProps {
  locale: string;
  dict: {
    auth: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      termsAgree: string;
      signUp: string;
      orContinueWith: string;
    };
  };
}

export function SignUpForm({ locale, dict }: SignUpFormProps) {
  const [state, formAction] = useActionState(registerUser, initialState);
  const router = useRouter();

  // Redirect to sign-in page after successful registration
  useEffect(() => {
    if (state.success) {
      // Wait 2 seconds to show success message, then redirect
      const timer = setTimeout(() => {
        router.push(`/${locale}/auth/signin`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.success, locale, router]);

  return (
    <>
      <form className="space-y-[1.25em]" action={formAction}>
        {/* Full Name Field */}
        <div className="space-y-[0.5em]">
          <Label htmlFor="fullName" className="text-[0.9em] font-medium">
            {dict.auth.fullName}
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            className="h-[2.75em] text-[1em] border-border/60 focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Email Field */}
        <div className="space-y-[0.5em]">
          <Label htmlFor="email" className="text-[0.9em] font-medium">
            {dict.auth.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="h-[2.75em] text-[1em] border-border/60 focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-[0.5em]">
          <Label htmlFor="password" className="text-[0.9em] font-medium">
            {dict.auth.password}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="h-[2.75em] text-[1em] border-border/60 focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-[0.5em]">
          <Label htmlFor="confirmPassword" className="text-[0.9em] font-medium">
            {dict.auth.confirmPassword}
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="h-[2.75em] text-[1em] border-border/60 focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start space-x-[0.5em] rtl:space-x-reverse">
          <Checkbox id="terms" className="mt-[0.25em]" required />
          <Label
            htmlFor="terms"
            className="text-[0.85em] font-normal cursor-pointer leading-relaxed"
          >
            {dict.auth.termsAgree}
          </Label>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="w-full h-[2.75em] text-[1em] font-semibold bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
        >
          {dict.auth.signUp}
        </Button>

        {/* Success/Error Message */}
        {state.message && (
          <div
            className={`p-[1em] rounded-lg border ${
              state.success
                ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}
          >
            <p className="text-[0.9em] text-center">{state.message}</p>
          </div>
        )}
      </form>

      {/* Divider */}
      <div className="relative my-[1.5em]">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-[0.85em] uppercase">
          <span className="bg-card px-[1em] text-muted-foreground">
            {dict.auth.orContinueWith}
          </span>
        </div>
      </div>

      {/* Social Signup Buttons */}
      <div className="grid grid-cols-2 gap-[0.75em]">
        <Button
          type="button"
          variant="outline"
          className="h-[2.5em] border-border/60 hover:bg-accent/50 transition-all"
        >
          <svg
            className="w-[1.25em] h-[1.25em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em]"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-[2.5em] border-border/60 hover:bg-accent/50 transition-all"
        >
          <svg
            className="w-[1.25em] h-[1.25em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>
    </>
  );
}
