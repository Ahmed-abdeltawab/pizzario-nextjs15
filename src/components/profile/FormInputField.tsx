"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInputField = forwardRef<HTMLInputElement, FormInputFieldProps>(
  ({ label, error, className, required, ...props }, ref) => {
    return (
      <div className={cn("space-y-[0.5em]", className)}>
        <Label className="text-[0.9em] text-muted-foreground">
          {label}
          {required && <span className="text-destructive ml-[0.2em]">*</span>}
        </Label>
        <Input
          ref={ref}
          className={cn(
            "h-[2.75em] text-[1em] bg-muted/20 transition-colors duration-200",
            error && "border-destructive focus-visible:ring-destructive",
            props.readOnly && "bg-muted/40 cursor-not-allowed opacity-60"
          )}
          {...props}
        />
        {error && (
          <p className="text-[0.875em] text-destructive font-medium mt-[0.5em] animate-in fade-in-50 slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInputField.displayName = "FormInputField";
