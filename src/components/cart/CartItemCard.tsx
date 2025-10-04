import React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/redux/fearures/cart/cartSlice";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  return (
    <div
      className="bg-card rounded-[1.25em] p-[1.5em] border-[1px] border-border shadow-sm hover:shadow-md transition-shadow"
      style={{ fontSize: "1rem" }}
    >
      <div className="flex flex-col sm:flex-row gap-[1.5em]">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full sm:w-[30%] md:w-[20%] max-w-[10em]">
          <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-[1em] overflow-hidden">
            {item.image.startsWith("http") || item.image.startsWith("/") ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[4em]">{item.image}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-[1.3em] font-bold text-foreground mb-[0.25em]">
              {item.name}
            </h3>
            <p className="text-[0.95em] text-muted-foreground mb-[0.75em] line-clamp-2">
              {item.description}
            </p>
            
            {/* Size and Extras */}
            <div className="flex flex-wrap gap-[0.5em] mb-[1em]">
              {item.size && (
                <span className="px-[0.75em] py-[0.35em] bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 rounded-[0.5em] text-[0.85em] font-semibold">
                  Size: {item.size}
                </span>
              )}
              {item.extras && item.extras.length > 0 && (
                <span className="px-[0.75em] py-[0.35em] bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-[0.5em] text-[0.85em] font-semibold">
                  +{item.extras.length} Extra{item.extras.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="text-[1.5em] font-bold text-orange-600 dark:text-orange-400">
              ${item.price.toFixed(2)}
            </div>
          </div>

          {/* Quantity Controls & Remove */}
          <div className="flex items-center justify-between mt-[1em] pt-[1em] border-t-[1px] border-border">
            {/* Quantity Controls */}
            <div className="flex items-center gap-[1em]">
              <span className="text-[0.9em] font-semibold text-muted-foreground">
                Quantity:
              </span>
              <div className="flex items-center gap-[0.75em] bg-gray-100 dark:bg-gray-900 rounded-[0.75em] p-[0.35em]">
                <button
                  className="w-[2em] h-[2em] rounded-[0.5em] bg-white dark:bg-gray-800 border-[1px] border-gray-300 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 flex items-center justify-center transition-all active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-[1em] h-[1em] text-gray-700 dark:text-gray-300" strokeWidth={2.5} />
                </button>
                
                <span className="text-[1.1em] font-bold text-foreground min-w-[2em] text-center">
                  {item.quantity}
                </span>
                
                <button
                  className="w-[2em] h-[2em] rounded-[0.5em] bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-all active:scale-95"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-[1em] h-[1em] text-white" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              className="flex items-center gap-[0.5em] px-[1em] py-[0.5em] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-[0.5em] transition-all active:scale-95"
              aria-label="Remove item"
            >
              <Trash2 className="w-[1.1em] h-[1.1em]" strokeWidth={2} />
              <span className="text-[0.9em] font-semibold hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
