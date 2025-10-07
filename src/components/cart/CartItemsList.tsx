import React from "react";
import CartItemCard from "./CartItemCard";
import { CartItem } from "@/redux/fearures/cart/cartSlice";

interface CartItemsListProps {
  items: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({ items }) => {
  return (
    <div className="space-y-[1.5em]" style={{ fontSize: "1rem" }}>
      <h2 className="text-[1.5em] font-bold text-foreground mb-[1em]">
        Cart Items ({items.length})
      </h2>
      
      <div className="space-y-[1.25em]">
        {items.map((item) => (
          <CartItemCard key={item.uniqueKey} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
