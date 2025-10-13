import { type Locale } from "@/i18n-config";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDictionary } from "@/lib/getDictionary";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;
  const dict = await getDictionary(locale);
  return (
    <div className="min-h-screen flex items-center justify-center p-[1rem] bg-gradient-to-br from-secondary/10 via-background to-primary/10">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[22rem] h-[22rem] bg-primary/5 rounded-full blur-[5rem]" />
        <div className="absolute bottom-[10%] left-[5%] w-[28rem] h-[28rem] bg-secondary/10 rounded-full blur-[5rem]" />
      </div>

      <Card className="w-full max-w-[32rem] relative backdrop-blur-[1em] bg-card/80 border-border/50 shadow-2xl">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <CardTitle className="text-[1.75rem] font-bold text-foreground">
            {dict.auth.createAccount}
          </CardTitle>
          <CardDescription className="text-[0.95em] text-muted-foreground">
            {dict.auth.signUpSubtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-[1.25em]">
          <SignUpForm locale={locale} dict={dict} />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-[0.9em] text-muted-foreground">
            {dict.auth.haveAccount}{" "}
            <Link
              href={`/${locale}/auth/signin`}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              {dict.auth.signIn}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
