import { type Locale } from "@/i18n-config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getDictionary } from "@/lib/getDictionary";
import SignInForm from "@/components/auth/SignInForm";

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;

  const dict = await getDictionary(locale);
  return (
    <div className="min-h-screen flex items-center justify-center p-[1rem] bg-gradient-to-br from-primary/10 via-background to-secondary/20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[20rem] h-[20rem] bg-primary/5 rounded-full blur-[5rem]" />
        <div className="absolute bottom-[15%] right-[15%] w-[25rem] h-[25rem] bg-secondary/10 rounded-full blur-[5rem]" />
      </div>

      <Card className="w-full max-w-[28rem] relative backdrop-blur-[1em] bg-card/80 border-border/50 shadow-2xl">
        <CardHeader className="space-y-[0.5em] text-center">
          {/* Logo or Icon */}
          <div className="mx-auto mb-[1em] w-[4rem] h-[4rem] rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-[2rem] h-[2rem] text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <CardTitle className="text-[1.75rem] font-bold text-foreground">
            {dict.auth.welcomeBack}
          </CardTitle>
          <CardDescription className="text-[0.95em] text-muted-foreground">
            {dict.auth.signInSubtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-[1.25em]">
          <SignInForm locale={locale} dict={dict} />
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

          {/* Social Login Buttons */}
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
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-[0.9em] text-muted-foreground">
            {dict.auth.noAccount}{" "}
            <Link
              href={`/${locale}/auth/signup`}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              {dict.auth.signUp}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
