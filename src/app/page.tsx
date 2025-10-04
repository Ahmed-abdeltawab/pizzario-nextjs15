import React from "react";
import {
  HeroSection,
  WhyChooseUs,
  Testimonials,
  ContactLocation,
} from "@/components/home";
import BestSellers from "@/components/home/BestSellers/BestSellers";

import { getBestSellingProducts } from "@/server/db/products";

export default async function Home() {
  const bestSellersProducts = await getBestSellingProducts(3);
  console.log("Best Sellers Products:", bestSellersProducts);
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BestSellers products={bestSellersProducts} />
      <WhyChooseUs />
      <Testimonials />
      <ContactLocation />
    </main>
  );
}
