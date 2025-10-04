import React from "react";
import MenuProductCard from "@/components/menu/MenuProductCard";

interface MenuCategoryProps {
  categoryName: string;
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }>;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  categoryName,
  products,
}) => {
  return (
    <section className="w-full mb-[4em]" style={{ fontSize: "1rem" }}>
      {/* Category Header */}
      <div className="mb-[2.5em] text-center">
        <h2 className="text-[2.5em] font-bold text-foreground mb-[0.5em] relative inline-block">
          {categoryName}
          {/* Decorative underline */}
          <span className="absolute bottom-[-0.3em] left-[50%] translate-x-[-50%] w-[60%] h-[0.15em] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></span>
        </h2>
        <p className="text-[1.1em] text-muted-foreground mt-[1em] max-w-[90%] md:max-w-[70%] mx-auto">
          Explore our delicious selection of {categoryName.toLowerCase()}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5em] md:gap-[2em]">
        {products.map((product) => (
          <MenuProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MenuCategory;
