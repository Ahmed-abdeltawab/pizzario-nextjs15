import React from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const HeroSection = async () => {
  const locale = await getCurrentLocale();
  const dict = await getDictionary(locale);
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="space-y-6 glass-card p-8 rounded-2xl animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight drop-shadow-lg">
            {dict.hero.title}
            <span className="text-primary block drop-shadow-md">
              {dict.hero.titleHighlight}
            </span>
            {dict.hero.titleEnd}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            {dict.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/menu`}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center shadow-md"
            >
              {dict.hero.orderNow}
            </Link>
            <Link
              href={`/${locale}/menu`}
              className="glass-button border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center"
            >
              {dict.hero.viewMenu}
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative animate-fadeIn delay-200">
          <div className="relative glass-card rounded-full aspect-square max-w-lg mx-auto overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-orange-200/40"></div>
            {/* Placeholder for pizza image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 glass rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-6xl animate-bounce-slow">🍕</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute top-4 right-4 glass-card rounded-xl px-4 py-2 shadow-xl animate-slideUp hover:scale-110 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold text-sm">4.9/5</div>
                <div className="text-xs text-muted-foreground">2k+ reviews</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 glass-card rounded-xl px-4 py-2 shadow-xl animate-slideUp delay-100 hover:scale-110 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <div>
                <div className="font-bold text-sm">30 min</div>
                <div className="text-xs text-muted-foreground">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
