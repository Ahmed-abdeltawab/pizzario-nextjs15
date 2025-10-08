import React from "react";
import { MenuHero, MenuFilters, MenuCategory } from "@/components/menu";
import { get } from "http";
import { getCategoriesWithProducts } from "@/server/db/categories";

// Mock data for demonstration (UI only - no logic)
// const mockCategories = [
//   {
//     id: "1",
//     name: "Pizza",
//     products: [
//       {
//         id: "p1",
//         name: "Margherita Pizza",
//         description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
//         price: 12.99,
//         image: "🍕",
//       },
//       {
//         id: "p2",
//         name: "Pepperoni Pizza",
//         description: "Loaded with pepperoni, cheese, and our signature sauce",
//         price: 14.99,
//         image: "🍕",
//       },
//       {
//         id: "p3",
//         name: "Vegetarian Pizza",
//         description: "Fresh vegetables, olives, mushrooms, and cheese",
//         price: 13.99,
//         image: "🍕",
//       },
//       {
//         id: "p4",
//         name: "BBQ Chicken Pizza",
//         description: "Grilled chicken, BBQ sauce, onions, and cheese",
//         price: 15.99,
//         image: "🍕",
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Burgers",
//     products: [
//       {
//         id: "b1",
//         name: "Classic Burger",
//         description: "Juicy beef patty with lettuce, tomato, and special sauce",
//         price: 9.99,
//         image: "🍔",
//       },
//       {
//         id: "b2",
//         name: "Cheese Burger",
//         description: "Double cheese, beef patty, pickles, and ketchup",
//         price: 10.99,
//         image: "🍔",
//       },
//       {
//         id: "b3",
//         name: "Chicken Burger",
//         description: "Crispy chicken, lettuce, mayo, and tomatoes",
//         price: 9.49,
//         image: "🍔",
//       },
//       {
//         id: "b4",
//         name: "Bacon Burger",
//         description: "Beef patty, crispy bacon, cheese, and BBQ sauce",
//         price: 11.99,
//         image: "🍔",
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "Drinks",
//     products: [
//       {
//         id: "d1",
//         name: "Coca Cola",
//         description: "Refreshing classic cola beverage",
//         price: 2.99,
//         image: "🥤",
//       },
//       {
//         id: "d2",
//         name: "Fresh Orange Juice",
//         description: "Freshly squeezed orange juice",
//         price: 4.99,
//         image: "🍊",
//       },
//       {
//         id: "d3",
//         name: "Lemonade",
//         description: "Homemade fresh lemonade with mint",
//         price: 3.99,
//         image: "🍋",
//       },
//       {
//         id: "d4",
//         name: "Iced Coffee",
//         description: "Cold brew coffee with ice and cream",
//         price: 4.49,
//         image: "☕",
//       },
//     ],
//   },
//   {
//     id: "4",
//     name: "Desserts",
//     products: [
//       {
//         id: "ds1",
//         name: "Chocolate Cake",
//         description: "Rich chocolate cake with chocolate frosting",
//         price: 6.99,
//         image: "🍰",
//       },
//       {
//         id: "ds2",
//         name: "Ice Cream",
//         description: "Vanilla, chocolate, or strawberry flavors",
//         price: 4.99,
//         image: "🍦",
//       },
//       {
//         id: "ds3",
//         name: "Apple Pie",
//         description: "Homemade apple pie with cinnamon",
//         price: 5.99,
//         image: "🥧",
//       },
//       {
//         id: "ds4",
//         name: "Tiramisu",
//         description: "Classic Italian coffee-flavored dessert",
//         price: 7.99,
//         image: "🍰",
//       },
//     ],
//   },
// ];

const MenuPage = async () => {
  const categories = await getCategoriesWithProducts();
  console.log('categories', categories);
  return (
    <main className="min-h-screen bg-background" style={{ fontSize: "1rem" }}>
      {/* Hero Section */}
      <MenuHero />

      {/* Filters Section */}
      <MenuFilters />

      {/* Menu Content */}
      <div className="max-w-[1400px] mx-auto px-[2em] py-[4em]">
        {/* Category Sections */}
        {categories.map((category) => (
          <MenuCategory
            key={category.id}
            categoryName={category.name}
            products={category.products}
          />
        ))}
      </div>

      {/* Empty State (Hidden in mock) */}
      <div className="hidden max-w-[600px] mx-auto text-center py-[5em] px-[2em]">
        <div className="text-[5em] mb-[0.5em]">🍽️</div>
        <h3 className="text-[2em] font-bold text-foreground mb-[0.5em]">
          No items found
        </h3>
        <p className="text-[1.1em] text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    </main>
  );
};

export default MenuPage;
