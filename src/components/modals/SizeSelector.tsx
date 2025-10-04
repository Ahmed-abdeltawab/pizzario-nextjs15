"use client";

import React from "react";
import { Size } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SizeSelectorProps {
  sizes: Size[];
  basePrice: number;
  selectedSize: Size | null;
  onSizeChange: (size: Size) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  basePrice,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div className="space-y-[1em]" style={{ fontSize: "1rem" }}>
      <h3 className="text-[1.2em] font-bold text-foreground">
        Select Size
        <span className="text-red-500 ml-[0.5em]">*</span>
      </h3>

      <RadioGroup
        value={selectedSize?.id || ""}
        onValueChange={(value) => {
          const size = sizes.find((s) => s.id === value);
          if (size) onSizeChange(size);
        }}
        className="space-y-[0.75em]"
      >
        {sizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;
          const totalPrice = basePrice + size.price;

          return (
            <div
              key={size.id}
              className={`relative flex items-center space-x-[1em] px-[1.5em] py-[1.25em] rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                  : "border-gray-300 dark:border-gray-700 bg-card hover:border-orange-300 dark:hover:border-orange-700"
              }`}
            >
              <RadioGroupItem
                value={size.id}
                id={size.id}
                className="data-[state=checked]:border-orange-500 data-[state=checked]:text-orange-500"
              />
              <Label
                htmlFor={size.id}
                className={`flex-1 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-foreground"
                }`}
              >
                <span className="text-[1em] font-semibold">{size.name}</span>
                <span className="text-[1em] font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {!selectedSize && (
        <p className="text-[0.9em] text-red-500 mt-[0.5em]">
          Please select a size
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
