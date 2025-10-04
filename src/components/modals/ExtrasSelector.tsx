"use client";

import React from "react";
import { Extra } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ExtrasSelectorProps {
  extras: Extra[];
  selectedExtras: Extra[];
  onExtrasChange: (extras: Extra[]) => void;
}

const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({
  extras,
  selectedExtras,
  onExtrasChange,
}) => {
  const handleExtraToggle = (extra: Extra, checked: boolean) => {
    if (checked) {
      onExtrasChange([...selectedExtras, extra]);
    } else {
      onExtrasChange(selectedExtras.filter((e) => e.id !== extra.id));
    }
  };

  return (
    <div className="space-y-[1em]" style={{ fontSize: "1rem" }}>
      <h3 className="text-[1.2em] font-bold text-foreground">
        Add Extras
        <span className="text-[0.9em] font-normal text-muted-foreground ml-[0.5em]">
          (Optional)
        </span>
      </h3>

      <div className="space-y-[0.75em]">
        {extras.map((extra) => {
          const isSelected = selectedExtras.some((e) => e.id === extra.id);

          return (
            <div
              key={extra.id}
              className={`relative flex items-center space-x-[1em] px-[1.5em] py-[1.25em] rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                  : "border-gray-300 dark:border-gray-700 bg-card hover:border-orange-300 dark:hover:border-orange-700"
              }`}
            >
              <Checkbox
                id={extra.id}
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleExtraToggle(extra, checked as boolean)
                }
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label
                htmlFor={extra.id}
                className={`flex-1 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-foreground"
                }`}
              >
                <span className="text-[1em] font-semibold">{extra.name}</span>
                <span className="text-[1em] font-bold">
                  +${extra.price.toFixed(2)}
                </span>
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtrasSelector;
