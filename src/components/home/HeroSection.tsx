import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-orange-50 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Delicious
            <span className="text-primary block">Pizza</span>
            Delivered Fresh
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            Experience the perfect blend of authentic Italian flavors with fresh ingredients. 
            Made with love, delivered to your door in 30 minutes or less.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/menu" 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Order Now
            </Link>
            <Link 
              href="/menu" 
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
            >
              View Menu
            </Link>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative">
          <div className="relative bg-orange-100 rounded-full aspect-square max-w-lg mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-200/30"></div>
            {/* Placeholder for pizza image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80% h-80% bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-6xl">🍕</span>
              </div>
            </div>
          </div>
          
          {/* Floating badges */}
          <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold text-sm">4.9/5</div>
                <div className="text-xs text-muted-foreground">2k+ reviews</div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-4 bg-white rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <div>
                <div className="font-bold text-sm">30 min</div>
                <div className="text-xs text-muted-foreground">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;