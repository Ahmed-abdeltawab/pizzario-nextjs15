"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { Extra, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types";
import SizeSelector from "./SizeSelector";
import ExtrasSelector from "./ExtrasSelector";

interface ProductModalProps {
  product: ProductWithRelations;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: ProductWithRelations,
    selectedSize: Size | null,
    selectedExtras: Extra[],
    quantity: number
  ) => void;
  isInCart?: boolean;
  currentQuantity?: number;
  onUpdateQuantity?: (quantity: number) => void;
  onRemoveFromCart?: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isInCart = false,
  currentQuantity = 0,
  onUpdateQuantity,
  onRemoveFromCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedSize(null);
      setSelectedExtras([]);
      setQuantity(isInCart ? currentQuantity : 1);
    }
  }, [isOpen, isInCart, currentQuantity]);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart && onUpdateQuantity) {
      onUpdateQuantity(newQuantity);
    }
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    if (isInCart && onUpdateQuantity) {
      onUpdateQuantity(newQuantity);
    }
  };

  const calculateTotal = () => {
    let total = product.price;
    if (selectedSize) {
      total += selectedSize.price;
    }
    selectedExtras.forEach((extra) => {
      total += extra.price;
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedExtras, quantity);
    onClose();
  };

  const handleRemoveFromCart = () => {
    if (onRemoveFromCart) {
      onRemoveFromCart();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[1em] bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
        style={{ fontSize: "1rem" }}
      >
        <button
          onClick={onClose}
          className="absolute top-[1em] right-[1em] z-20 w-[2.5em] h-[2.5em] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-900 hover:scale-110 transition-all shadow-lg group"
          aria-label="Close modal"
        >
          <X className="w-[1.25em] h-[1.25em] text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </button>
        <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-[3em] pt-[4em]">
            <div className="relative w-full max-w-[18em] aspect-square">
              {product.image.startsWith("http") ||
              product.image.startsWith("/") ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-white/95 shadow-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white dark:bg-white/95 rounded-2xl shadow-xl">
                  <span className="text-[8em] filter drop-shadow-lg">
                    {product.image}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="text-center px-[2em] pt-[2em] pb-[1.5em] border-b border-border">
            <h2 className="text-[2em] font-bold text-foreground mb-[0.75em] leading-tight">
              {product.name}
            </h2>
            <p className="text-[1em] text-muted-foreground leading-relaxed max-w-[90%] mx-auto">
              {product.description}
            </p>
          </div>
          <div className="px-[2em] py-[2em] space-y-[2em]">
            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector
                sizes={product.sizes}
                basePrice={product.price}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            )}
            {product.extras && product.extras.length > 0 && (
              <ExtrasSelector
                extras={product.extras}
                selectedExtras={selectedExtras}
                onExtrasChange={setSelectedExtras}
              />
            )}
          </div>
          <div className="px-[2em] pb-[2em] pt-[1em] border-t border-border">
            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                disabled={
                  product.sizes && product.sizes.length > 0 && !selectedSize
                }
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-[2em] py-[1.5em] rounded-xl transition-all duration-300 font-bold text-[1.1em] flex items-center justify-between shadow-lg hover:shadow-xl active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-orange-500 disabled:hover:to-orange-600 disabled:active:scale-100 group"
              >
                <div className="flex items-center gap-[0.75em]">
                  <ShoppingCart
                    className="w-[1.5em] h-[1.5em]"
                    strokeWidth={2.5}
                  />
                  <span>Add to Cart</span>
                </div>
                <span className="text-[1.3em] font-extrabold">
                  ${calculateTotal().toFixed(2)}
                </span>
              </button>
            ) : (
              <div className="space-y-[1em]">
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 rounded-xl p-[1em]">
                  <span className="text-[1em] font-semibold text-foreground">
                    Quantity
                  </span>
                  <div className="flex items-center gap-[1em]">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-[2.5em] h-[2.5em] rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus
                        className="w-[1.25em] h-[1.25em] text-gray-700 dark:text-gray-300"
                        strokeWidth={2.5}
                      />
                    </button>
                    <span className="text-[1.5em] font-bold text-foreground min-w-[2em] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-[2.5em] h-[2.5em] rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-all active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus
                        className="w-[1.25em] h-[1.25em] text-white"
                        strokeWidth={2.5}
                      />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-[2em] py-[1.25em] rounded-xl transition-all duration-300 font-semibold text-[1em] flex items-center justify-center gap-[0.75em] shadow-md hover:shadow-lg active:scale-98"
                >
                  <Trash2 className="w-[1.25em] h-[1.25em]" strokeWidth={2.5} />
                  <span>Remove from Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
