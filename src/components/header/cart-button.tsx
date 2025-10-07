import { useAppSelector } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartButton = () => {
  const count = useAppSelector((state) => state.cart.items).length;

  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart with ${count} items`}
      className="relative inline-flex items-center justify-center 
        p-1.5 md:p-2 rounded-lg
        hover:bg-accent/10 active:scale-95
        transition-all duration-200 ease-in-out group"
    >
      <ShoppingCart
        className="w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary transition-colors"
        strokeWidth={2}
      />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 inline-flex items-center justify-center
            min-w-[18px] h-[18px] md:min-w-[20px] md:h-5 
            px-1 md:px-1.5 
            text-[10px] md:text-xs font-bold
            text-white bg-primary rounded-full
            border-2 border-background shadow-md
            animate-in zoom-in-50 duration-200"
          aria-live="polite"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
