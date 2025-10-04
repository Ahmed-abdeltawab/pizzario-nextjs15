import React from "react";

const MenuHero: React.FC = () => {
  return (
    <section
      className="relative w-full bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 dark:from-orange-700 dark:via-orange-800 dark:to-amber-800 overflow-hidden"
      style={{ fontSize: "1rem" }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center py-[5em] px-[2em]">
        <h1 className="text-[3em] md:text-[4em] lg:text-[5em] font-extrabold text-white mb-[0.5em] leading-tight drop-shadow-lg">
          Our Menu
        </h1>
        <p className="text-[1.2em] md:text-[1.4em] text-white/95 max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto leading-relaxed drop-shadow-md">
          Discover our carefully crafted selection of delicious dishes, made
          with fresh ingredients and served with love
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-[1em] mt-[2.5em]">
          <div className="w-[3em] h-[0.2em] bg-white/60 rounded-full"></div>
          <div className="w-[1.5em] h-[1.5em] bg-white/60 rounded-full"></div>
          <div className="w-[3em] h-[0.2em] bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default MenuHero;
