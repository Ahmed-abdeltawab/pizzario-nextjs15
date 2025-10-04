import React from "react";
import { User, MapPin, Phone, Mail, CreditCard } from "lucide-react";

const CheckoutForm: React.FC = () => {
  return (
    <div
      className="bg-card rounded-[1.25em] p-[2em] border-[1px] border-border shadow-md"
      style={{ fontSize: "1rem" }}
    >
      <h2 className="text-[1.75em] font-bold text-foreground mb-[1.5em]">
        Checkout Information
      </h2>

      <form className="space-y-[1.5em]">
        {/* Personal Information Section */}
        <div>
          <h3 className="text-[1.2em] font-semibold text-foreground mb-[1em] flex items-center gap-[0.5em]">
            <User className="w-[1.25em] h-[1.25em] text-orange-500" strokeWidth={2.5} />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1em]">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                className="w-full px-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-[1em] top-[50%] translate-y-[-50%] w-[1.1em] h-[1.1em] text-muted-foreground" strokeWidth={2} />
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="w-full pl-[3em] pr-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-[1em] top-[50%] translate-y-[-50%] w-[1.1em] h-[1.1em] text-muted-foreground" strokeWidth={2} />
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-[3em] pr-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div>
          <h3 className="text-[1.2em] font-semibold text-foreground mb-[1em] flex items-center gap-[0.5em]">
            <MapPin className="w-[1.25em] h-[1.25em] text-orange-500" strokeWidth={2.5} />
            Delivery Address
          </h3>
          
          <div className="space-y-[1em]">
            {/* Street Address */}
            <div>
              <label htmlFor="address" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="123 Main Street"
                className="w-full px-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* City, State, Zip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1em]">
              <div>
                <label htmlFor="city" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="New York"
                  className="w-full px-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="NY"
                  className="w-full px-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="zip" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="10001"
                  className="w-full px-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div>
          <h3 className="text-[1.2em] font-semibold text-foreground mb-[1em] flex items-center gap-[0.5em]">
            <CreditCard className="w-[1.25em] h-[1.25em] text-orange-500" strokeWidth={2.5} />
            Payment Method
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1em]">
            {/* Credit Card */}
            <button
              type="button"
              className="px-[1.5em] py-[1em] rounded-[0.75em] border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 font-semibold text-[0.95em] transition-all hover:bg-orange-100 dark:hover:bg-orange-950/30 active:scale-95"
            >
              💳 Credit Card
            </button>

            {/* PayPal */}
            <button
              type="button"
              className="px-[1.5em] py-[1em] rounded-[0.75em] border-[1px] border-border bg-background text-foreground font-semibold text-[0.95em] hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95"
            >
              🅿️ PayPal
            </button>

            {/* Cash */}
            <button
              type="button"
              className="px-[1.5em] py-[1em] rounded-[0.75em] border-[1px] border-border bg-background text-foreground font-semibold text-[0.95em] hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95"
            >
              💵 Cash
            </button>
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label htmlFor="instructions" className="block text-[0.95em] font-semibold text-foreground mb-[0.5em]">
            Special Instructions (Optional)
          </label>
          <textarea
            id="instructions"
            rows={3}
            placeholder="Add any special delivery instructions..."
            className="w-full px-[1em] py-[0.75em] rounded-[0.5em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
