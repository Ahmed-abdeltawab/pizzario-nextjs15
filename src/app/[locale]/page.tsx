import React from "react";
import {
  HeroSection,
  WhyChooseUs,
  Testimonials,
  ContactLocation,
} from "@/components/home";
import BestSellers from "@/components/home/BestSellers/BestSellers";

import { getBestSellingProducts } from "@/server/db/products";
import { getDictionary } from "@/lib/getDictionary";
import { languagesType } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: languagesType }>;
}) {
  const bestSellersProducts = await getBestSellingProducts(3);

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
