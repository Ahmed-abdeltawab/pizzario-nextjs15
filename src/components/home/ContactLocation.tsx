import React from 'react';
import Link from 'next/link';

const ContactLocation = () => {
  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Pizza Street", "Downtown City, ST 12345"],
      action: "Get Directions"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["(555) 123-PIZZA", "Available 24/7"],
      action: "Call Now"
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["info@pizzaplace.com", "We reply within 1 hour"],
      action: "Send Email"
    }
  ];

  const hours = [
    { day: "Monday - Thursday", time: "11:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", time: "11:00 AM - 11:00 PM" },
    { day: "Sunday", time: "12:00 PM - 9:00 PM" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Visit Us Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Come experience our authentic Italian pizza in person, or contact us for delivery and takeout orders.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm mb-1">
                          {detail}
                        </p>
                      ))}
                      <button className="text-primary font-medium text-sm hover:text-primary/80 transition-colors mt-2">
                        {info.action} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-primary text-primary-foreground rounded-lg p-6">
              <h3 className="font-bold mb-2">Ready to Order?</h3>
              <p className="text-sm mb-4 opacity-90">
                Call us now or browse our menu online for quick and easy ordering.
              </p>
              <div className="flex gap-3">
                <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Call (555) 123-PIZZA
                </button>
                <Link 
                  href="/menu"
                  className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
                >
                  Order Online
                </Link>
              </div>
            </div>
          </div>

          {/* Hours & Location */}
          <div>
            {/* Opening Hours */}
            <div className="bg-card rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">🕒</span>
                Opening Hours
              </h3>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="font-medium text-foreground">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                Find Us
              </h3>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <div className="text-muted-foreground">
                    <p className="font-medium">123 Pizza Street</p>
                    <p>Downtown City, ST 12345</p>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🚚</span>
                  <span className="font-medium text-foreground">Free Delivery</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Within 5 miles • Minimum order $25 • Usually 30 minutes or less
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactLocation;