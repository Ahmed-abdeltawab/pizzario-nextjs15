"use client";
import React, { useState } from "react";
import ProductModal from "@/components/modals/ProductModal";
import ProductComp from "../../shared/Product";
import Heading from "./Heading";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/types";

interface BestSellersProps {
  products: Product[];
}
const BestSellers = ({ products }: BestSellersProps) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithRelations | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalAddToCart = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24">
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
            <p className="text-center col-span-full text-muted-foreground">
              No best sellers available at the moment.
            </p>
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
            onAddToCart={handleModalAddToCart}
          />
        )}
      </div>
    </section>
  );
};

export default BestSellers;
