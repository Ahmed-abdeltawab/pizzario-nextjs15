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
      className="group relative glass-card rounded-[1.5em] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1"
      style={{ fontSize: "1rem" }}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-orange-200/30 overflow-hidden">
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
            <span className="text-[5em] filter drop-shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              {product.image}
            </span>
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

        {/* Price Badge */}
        <div className="absolute top-[1em] right-[1em] glass-card px-[1em] py-[0.5em] rounded-[0.75em] font-bold text-[1.1em] shadow-xl border-2 border-primary/30 text-primary">
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-[1.5em]">
        <h3 className="text-[1.3em] font-bold text-foreground mb-[0.5em] line-clamp-1 group-hover:text-primary transition-colors drop-shadow-sm">
          {product.name}
        </h3>
        <p className="text-[0.95em] text-muted-foreground leading-relaxed line-clamp-2 mb-[1.5em] min-h-[2.8em]">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white py-[0.875em] px-[1.5em] rounded-[0.75em] font-semibold text-[1em] flex items-center justify-center gap-[0.5em] transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 hover:scale-105">
          <ShoppingCart className="w-[1.25em] h-[1.25em]" strokeWidth={2.5} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default MenuProductCard;
