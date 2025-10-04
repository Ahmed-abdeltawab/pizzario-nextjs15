import React from "react";
import { Search } from "lucide-react";

const MenuFilters: React.FC = () => {
  return (
    <div
      className="w-full bg-card border-y-[1px] border-border sticky top-0 z-20 shadow-md"
      style={{ fontSize: "1rem" }}
    >
      <div className="max-w-[1400px] mx-auto px-[2em] py-[1.5em]">
        <div className="flex flex-col md:flex-row gap-[1.5em] items-center justify-between">
          {/* Search Bar */}
          <div className="w-full md:w-[50%] lg:w-[40%]">
            <div className="relative">
              <Search className="absolute left-[1em] top-[50%] translate-y-[-50%] w-[1.25em] h-[1.25em] text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for dishes..."
                className="w-full pl-[3.5em] pr-[1.5em] py-[0.875em] rounded-[0.75em] border-[1px] border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-[0.75em] justify-center md:justify-end">
            <button className="px-[1.5em] py-[0.75em] rounded-[0.75em] bg-orange-500 text-white font-semibold text-[0.95em] hover:bg-orange-600 transition-all shadow-sm hover:shadow-md active:scale-95">
              All Items
            </button>
            <button className="px-[1.5em] py-[0.75em] rounded-[0.75em] bg-background border-[1px] border-border text-foreground font-semibold text-[0.95em] hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95">
              Pizza
            </button>
            <button className="px-[1.5em] py-[0.75em] rounded-[0.75em] bg-background border-[1px] border-border text-foreground font-semibold text-[0.95em] hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95">
              Burgers
            </button>
            <button className="px-[1.5em] py-[0.75em] rounded-[0.75em] bg-background border-[1px] border-border text-foreground font-semibold text-[0.95em] hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95">
              Drinks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;
