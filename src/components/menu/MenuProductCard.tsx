import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface MenuProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const MenuProductCard: React.FC<MenuProductCardProps> = ({ product }) => {
  return (
    <div
      className="group relative bg-card rounded-[1.5em] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-[1px] border-border"
      style={{ fontSize: "1rem" }}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {product.image.startsWith("http") || product.image.startsWith("/") ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[5em] filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
              {product.image}
            </span>
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        {/* Price Badge */}
        <div className="absolute top-[1em] right-[1em] bg-orange-500 text-white px-[1em] py-[0.5em] rounded-[0.75em] font-bold text-[1.1em] shadow-lg">
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-[1.5em]">
        <h3 className="text-[1.3em] font-bold text-foreground mb-[0.5em] line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-[0.95em] text-muted-foreground leading-relaxed line-clamp-2 mb-[1.5em] min-h-[2.8em]">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-[0.875em] px-[1.5em] rounded-[0.75em] font-semibold text-[1em] flex items-center justify-center gap-[0.5em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
          <ShoppingCart className="w-[1.25em] h-[1.25em]" strokeWidth={2.5} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default MenuProductCard;
