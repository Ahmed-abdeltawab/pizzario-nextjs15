import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🍕",
      title: "Fresh Ingredients",
      description: "We use only the freshest, locally sourced ingredients to create our authentic Italian pizzas."
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Hot pizza delivered to your door in 30 minutes or less, guaranteed fresh and delicious."
    },
    {
      icon: "👨‍🍳",
      title: "Expert Chefs",
      description: "Our experienced Italian chefs bring traditional recipes and modern techniques together."
    },
    {
      icon: "🌟",
      title: "Quality Guarantee",
      description: "Not satisfied? We'll make it right. Your happiness is our top priority."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Our Pizza?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              For over 20 years, we've been serving authentic Italian pizza made with 
              passion and the finest ingredients. Our commitment to quality and customer 
              satisfaction has made us the neighborhood's favorite pizzeria.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Pizza Chef Illustration */}
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Made by Expert Chefs
                </h3>
                <p className="text-muted-foreground text-sm">
                  Traditional Italian recipes passed down through generations
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50k+</div>
                  <div className="text-xs text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg">
              <span className="text-2xl">❤️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;