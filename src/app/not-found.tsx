import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <html>
      <body>
        <div
          className="min-h-screen flex items-center justify-center px-[1em] py-[2em] bg-gradient-to-br from-primary/5 to-orange-50 dark:from-background dark:to-background"
          style={{ fontSize: "1rem" }}
        >
          <div className="max-w-[50em] w-full text-center space-y-[2em]">
            {/* 404 Number with Pizza Animation */}
            <div className="relative">
              <h1
                className="text-[8em] md:text-[12em] font-bold text-primary/20 dark:text-primary/10 leading-none select-none"
                style={{ fontSize: "8em" }}
              >
                404
              </h1>

              {/* Animated Pizza Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative animate-bounce">
                  <div
                    className="text-[6em] filter drop-shadow-lg"
                    style={{ fontSize: "6em" }}
                  >
                    🍕
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-[1em]">
              <h2
                className="text-[2em] md:text-[3em] font-bold text-foreground"
                style={{ fontSize: "2em" }}
              >
                Oops! Pizza Not Found
              </h2>
              <p
                className="text-[1.1em] text-muted-foreground max-w-[35em] mx-auto"
                style={{ fontSize: "1.1em" }}
              >
                Looks like this page got delivered to the wrong address. Don't
                worry, we've got plenty of other delicious options waiting for
                you!
              </p>
            </div>

            {/* Suggestions */}
            <div
              className="bg-card border border-border rounded-lg p-[2em] shadow-sm space-y-[1.5em]"
              style={{ padding: "2em" }}
            >
              <h3
                className="text-[1.3em] font-semibold text-foreground"
                style={{ fontSize: "1.3em" }}
              >
                Here's what you can do:
              </h3>
              <ul className="space-y-[0.8em] text-left max-w-[30em] mx-auto">
                <li className="flex items-start gap-[0.8em]">
                  <span className="text-[1.5em] mt-[-0.2em]">🏠</span>
                  <span className="text-muted-foreground">
                    Go back to the{" "}
                    <Link
                      href="/"
                      className="text-primary hover:underline font-medium"
                    >
                      homepage
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-[0.8em]">
                  <span className="text-[1.5em] mt-[-0.2em]">🍕</span>
                  <span className="text-muted-foreground">
                    Browse our{" "}
                    <Link
                      href="/menu"
                      className="text-primary hover:underline font-medium"
                    >
                      delicious menu
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-[0.8em]">
                  <span className="text-[1.5em] mt-[-0.2em]">🛒</span>
                  <span className="text-muted-foreground">
                    Check your{" "}
                    <Link
                      href="/cart"
                      className="text-primary hover:underline font-medium"
                    >
                      cart
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-[0.8em]">
                  <span className="text-[1.5em] mt-[-0.2em]">📞</span>
                  <span className="text-muted-foreground">
                    Need help?{" "}
                    <Link
                      href="/contact"
                      className="text-primary hover:underline font-medium"
                    >
                      Contact us
                    </Link>
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-[1em] justify-center items-center"
              style={{ gap: "1em" }}
            >
              <Button asChild size="lg" className="min-w-[12em]">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-w-[12em]"
              >
                <Link href="/menu">View Menu</Link>
              </Button>
            </div>

            {/* Fun Fact */}
            <div
              className="pt-[2em] border-t border-border"
              style={{ paddingTop: "2em" }}
            >
              <p
                className="text-[0.9em] text-muted-foreground italic"
                style={{ fontSize: "0.9em" }}
              >
                💡 Fun Fact: The first pizza delivery was made in 1889 to Queen
                Margherita of Italy!
              </p>
            </div>
          </div>

          {/* Floating Pizza Slices Decoration */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-[10%] left-[10%] text-[3em] opacity-10 animate-spin-slow"
              style={{ fontSize: "3em", animationDuration: "20s" }}
            >
              🍕
            </div>
            <div
              className="absolute top-[20%] right-[15%] text-[2em] opacity-10 animate-bounce"
              style={{ fontSize: "2em", animationDelay: "1s" }}
            >
              🍕
            </div>
            <div
              className="absolute bottom-[15%] left-[15%] text-[2.5em] opacity-10 animate-pulse"
              style={{ fontSize: "2.5em", animationDelay: "2s" }}
            >
              🍕
            </div>
            <div
              className="absolute bottom-[20%] right-[10%] text-[3.5em] opacity-10 animate-spin-slow"
              style={{ fontSize: "3.5em", animationDuration: "25s" }}
            >
              🍕
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
