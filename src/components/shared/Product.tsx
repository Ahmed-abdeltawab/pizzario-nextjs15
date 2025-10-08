import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@prisma/client";
import AddToCart from "./AddToCart";

interface ProductProps {
  product: Product;
  index: number;
  handleAddToCart: (product: Product) => void;
}
const ProductComp = ({ product, index, handleAddToCart }: ProductProps) => {
  return (
    <div
      key={product.id}
      className="group glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative bg-gradient-to-br from-primary/10 via-orange-100/30 to-orange-200/30 dark:from-primary/20 dark:via-orange-950/40 dark:to-orange-900/30 aspect-square overflow-hidden">
        {/* Badge for top products */}
        {index < 3 && (
          <div className="absolute top-3 left-3 z-20 glass-card px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-primary/30 text-primary">
            #{index + 1} Popular
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-20 w-8 h-8 glass-button rounded-full flex items-center justify-center hover:scale-110 transition-all group/heart shadow-lg">
          <Heart className="w-4 h-4 text-foreground group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all" />
        </button>

        {/* Product Image */}
        <div className="w-full h-full flex items-center justify-center p-6">
          {product.image.startsWith("http") || product.image.startsWith("/") ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden glass shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ) : (
            <span className="text-8xl sm:text-9xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-2xl">
              {product.image}
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4 ? "text-yellow-400 fill-current drop-shadow-md" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            (4.{Math.floor(Math.random() * 5) + 5})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1 drop-shadow-sm">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary drop-shadow-sm">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <AddToCart handleAddToCart={handleAddToCart} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductComp;
