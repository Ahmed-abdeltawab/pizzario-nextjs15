import React from 'react';
import Link from 'next/link';

const FeaturedMenu = () => {
  const featuredPizzas = [
    {
      id: 1,
      name: "Margherita Classic",
      description: "Fresh mozzarella, tomato sauce, basil leaves",
      price: "$14.99",
      image: "🍕",
      popular: true
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      description: "Pepperoni, mozzarella, tomato sauce",
      price: "$16.99",
      image: "🍕",
      popular: false
    },
    {
      id: 3,
      name: "Veggie Deluxe",
      description: "Bell peppers, mushrooms, olives, onions",
      price: "$15.99",
      image: "🍕",
      popular: true
    },
    {
      id: 4,
      name: "Meat Lovers",
      description: "Pepperoni, sausage, ham, bacon",
      price: "$18.99",
      image: "🍕",
      popular: false
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Featured Pizzas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and delicious pizza creations, made with the finest ingredients
          </p>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredPizzas.map((pizza) => (
            <div 
              key={pizza.id}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-orange-50 to-primary/5 h-48 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {pizza.image}
                </span>
                {pizza.popular && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {pizza.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {pizza.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {pizza.price}
                  </span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center">
          <Link 
            href="/menu"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
          >
            View Full Menu
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;