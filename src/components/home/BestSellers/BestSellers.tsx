"use client";
import React, { useState } from "react";
import ProductModal from "@/components/modals/ProductModal";
import ProductComp from "../../shared/Product";
import Heading from "./Heading";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/fearures/cart/cartSlice";

interface BestSellersProps {
  products: Product[];
}
const BestSellers = ({ products }: BestSellersProps) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithRelations | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Heading />
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductComp
                handleAddToCart={handleAddToCart}
                product={product}
                index={index}
                key={product.id}
              />
            ))
          ) : (
            <div className="text-center col-span-full">
              <p className="glass-card p-8 rounded-xl text-muted-foreground inline-block">
                No best sellers available at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProduct(null);
            }}
            
          />
        )}
      </div>
    </section>
  );
};

export default BestSellers;
