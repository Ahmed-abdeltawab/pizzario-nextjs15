
import React from 'react';
import {
  HeroSection,
  FeaturedMenu,
  WhyChooseUs,
  Testimonials,
  ContactLocation
} from '@/components/home';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedMenu />
      <WhyChooseUs />
      <Testimonials />
      <ContactLocation />

    </main>
  );
}
