import React from "react";
import { ShoppingBag } from "lucide-react";

const CartHeader: React.FC = () => {
  return (
    <div
      className="w-full bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-b-[1px] border-border"
      style={{ fontSize: "1rem" }}
    >
      <div className="max-w-[1400px] mx-auto px-[2em] py-[3em]">
        <div className="flex items-center gap-[1em] justify-center md:justify-start">
          <div className="w-[3em] h-[3em] bg-orange-500 rounded-[0.75em] flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-[1.75em] h-[1.75em] text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[2.5em] font-bold text-foreground leading-tight">
              Shopping Cart
            </h1>
            <p className="text-[1em] text-muted-foreground mt-[0.25em]">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
