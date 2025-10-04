import { ShoppingCart } from "lucide-react";
import React from "react";
interface AddToCartProps {
  handleAddToCart: (product: any) => void;
  product: any;
}

const AddToCart = ({ handleAddToCart, product }: AddToCartProps) => {
  return (
    <button
      onClick={() => handleAddToCart(product)}
      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all duration-200 font-medium text-sm group/btn"
    >
      <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
      Add
    </button>
  );
};

export default AddToCart;
