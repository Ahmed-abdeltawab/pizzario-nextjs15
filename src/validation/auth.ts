import z from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Validation schema for user login
export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Password is required"),
});
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .optional()
    .or(z.literal("")),
  email: z
    .email("Invalid email address")
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),
  streetAddress: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .optional()
    .or(z.literal("")),
  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(20, "Postal code is too long")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City name is too long")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country name is too long")
    .optional()
    .or(z.literal("")),
});
// export the type with Typescript inference
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
