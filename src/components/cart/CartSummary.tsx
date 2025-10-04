import React from "react";
import { Receipt, Truck, CreditCard } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  delivery: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  delivery,
  total,
}) => {
  return (
    <div
      className="bg-card rounded-[1.25em] p-[2em] border-[1px] border-border shadow-lg sticky top-[2em]"
      style={{ fontSize: "1rem" }}
    >
      <div className="flex items-center gap-[0.75em] mb-[1.5em] pb-[1em] border-b-[1px] border-border">
        <Receipt className="w-[1.5em] h-[1.5em] text-orange-500" strokeWidth={2.5} />
        <h2 className="text-[1.5em] font-bold text-foreground">
          Order Summary
        </h2>
      </div>

      {/* Summary Details */}
      <div className="space-y-[1em] mb-[1.5em]">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-[1em] text-muted-foreground">Subtotal</span>
          <span className="text-[1.1em] font-semibold text-foreground">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.5em]">
            <Truck className="w-[1.1em] h-[1.1em] text-muted-foreground" strokeWidth={2} />
            <span className="text-[1em] text-muted-foreground">Delivery Fee</span>
          </div>
          <span className="text-[1.1em] font-semibold text-foreground">
            ${delivery.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t-[1px] border-border pt-[1em]"></div>

        {/* Total */}
        <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-950/20 rounded-[0.75em] p-[1em]">
          <span className="text-[1.2em] font-bold text-foreground">Total</span>
          <span className="text-[1.75em] font-extrabold text-orange-600 dark:text-orange-400">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-[1em] px-[2em] rounded-[0.75em] font-bold text-[1.1em] flex items-center justify-center gap-[0.75em] shadow-lg hover:shadow-xl transition-all active:scale-98">
        <CreditCard className="w-[1.5em] h-[1.5em]" strokeWidth={2.5} />
        <span>Proceed to Checkout</span>
      </button>

      {/* Info Text */}
      <p className="text-[0.85em] text-muted-foreground text-center mt-[1em] leading-relaxed">
        Taxes and additional fees calculated at checkout
      </p>
    </div>
  );
};

export default CartSummary;
