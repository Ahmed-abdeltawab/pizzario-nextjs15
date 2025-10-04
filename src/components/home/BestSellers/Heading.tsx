import { Star } from "lucide-react";
import React from "react";

const Heading = () => {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
        <Star className="w-4 h-4 fill-current" />
        Best Sellers
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
        Our Most Popular
        <span className="block text-primary">Pizza Selections</span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Discover our customers' favorite pizzas, crafted with premium
        ingredients and perfected recipes that have made us the top choice for
        pizza lovers
      </p>
    </div>
  );
};

export default Heading;
