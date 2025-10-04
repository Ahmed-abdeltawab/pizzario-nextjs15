import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

const EmptyState: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-[4em] px-[2em] min-h-[60vh]"
      style={{ fontSize: "1rem" }}
    >
      {/* Icon Container */}
      <div className="relative mb-[2em]">
        {/* Background Circle */}
        <div className="w-[10em] h-[10em] rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-900/20 flex items-center justify-center">
          <ShoppingCart 
            className="w-[5em] h-[5em] text-orange-300 dark:text-orange-700" 
            strokeWidth={1.5}
          />
        </div>
        
        {/* Decorative Dots */}
        <div className="absolute top-0 right-0 w-[1.5em] h-[1.5em] rounded-full bg-orange-200 dark:bg-orange-800/50 animate-pulse" style={{ animationDelay: "0s" }}></div>
        <div className="absolute bottom-[1em] left-0 w-[1em] h-[1em] rounded-full bg-orange-300 dark:bg-orange-700/50 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Message */}
      <h2 className="text-[2em] font-bold text-foreground mb-[0.5em]">
        Your Cart is Empty
      </h2>
      <p className="text-[1.1em] text-muted-foreground mb-[2em] max-w-[30em]">
        Looks like you haven't added any delicious items to your cart yet. 
        Start exploring our menu and add your favorites!
      </p>

      {/* Action Button */}
      <Link href="/menu">
        <button className="group inline-flex items-center gap-[0.75em] px-[2em] py-[1em] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-[1.1em] rounded-[0.75em] shadow-lg hover:shadow-xl transition-all active:scale-95">
          Browse Menu
          <ArrowRight 
            className="w-[1.25em] h-[1.25em] transition-transform group-hover:translate-x-[0.25em]" 
            strokeWidth={2.5}
          />
        </button>
      </Link>

      {/* Additional Info */}
      <p className="text-[0.9em] text-muted-foreground/70 mt-[2em]">
        Need help? Contact our support team
      </p>
    </div>
  );
};

export default EmptyState;
