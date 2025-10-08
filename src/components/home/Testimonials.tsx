import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Blogger",
      rating: 5,
      comment: "Absolutely amazing! The Margherita pizza was perfection - fresh basil, creamy mozzarella, and that perfect crispy crust. Will definitely order again!",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Regular Customer",
      rating: 5,
      comment: "Best pizza in town! Fast delivery, always hot, and the flavors are incredible. The meat lovers pizza is my go-to weekend treat.",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Local Resident",
      rating: 5,
      comment: "I'm vegetarian and their veggie deluxe pizza is outstanding. So many fresh vegetables and the cheese is divine. Highly recommend!",
      avatar: "👩‍🎨"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers who keep coming back for more!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="glass-card rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass-button rounded-full flex items-center justify-center text-2xl shadow-md">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="glass-button p-4 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="glass-button p-4 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">2000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="glass-button p-4 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">30min</div>
              <div className="text-sm text-muted-foreground">Delivery Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;