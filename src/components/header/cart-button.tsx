import { ShoppingCart } from "lucide-react";
import React from "react";

const CartButton = () => {
  const count = 3;

  return (
    <button
      type="button"
      aria-label={`Shopping cart with ${count} items`}
      className="relative inline-flex items-center justify-center p-2 rounded-lg
        hover:bg-accent/10 active:scale-95
        transition-all duration-200 ease-in-out group"
    >
      <ShoppingCart 
        className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" 
        strokeWidth={2}
      />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 inline-flex items-center justify-center
            min-w-[20px] h-5 px-1.5 text-xs font-bold
            text-white bg-primary rounded-full
            border-2 border-background shadow-md
            animate-in zoom-in-50 duration-200"
          aria-live="polite"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

export default CartButton;
