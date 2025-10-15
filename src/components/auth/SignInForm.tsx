"use client";

import { Locale } from "@/i18n-config";
// import { signIn } from "@/server/auth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const SignInForm = ({ locale, dict }: { locale: Locale; dict: any }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    console.log("Signing in with:", { email, password, rememberMe });
    try {
      const res = await signIn("credentials", {
        redirect: false, // Don't redirect automatically, we'll handle it manually
        email,
        password,
      });
      console.log("Sign in response:", res);
      if (res?.error) {
        setError(
          res.error === "CredentialsSignin"
            ? "Invalid email or password. Please try again."
            : res.error
        );
      } else if (res?.ok) {
        // Successful sign in
        router.push(`/${locale}/`); // Redirect to home page
        router.refresh(); // Refresh to update auth state
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {error && (
        <div className="p-[1em] bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-[0.9em] text-destructive text-center">{error}</p>
        </div>
      )}
      <form className="space-y-[1.25em]" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-[0.5em]">
          <Label htmlFor="email" className="text-[0.9em] font-medium">
            {dict.auth.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
            required
            className="h-[2.75em] text-[1em] border-border/60 focus:border-primary transition-colors"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-[0.5em]">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[0.9em] font-medium">
              {dict.auth.password}
            </Label>
            <Link
              href={`/${locale}/auth/forgot-password`}
              className="text-[0.85em] text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {dict.auth.forgotPassword}
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            required
            className="h-[2.75em] text-[1em] border-border/60 focus:border-primary transition-colors"
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-[0.5em] rtl:space-x-reverse">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-[0.9em] font-normal cursor-pointer"
          >
            {dict.auth.rememberMe}
          </Label>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-[2.75em] text-[1em] font-semibold bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-[1.25em] w-[1.25em] mr-[0.5em]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            dict.auth.signIn
          )}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
