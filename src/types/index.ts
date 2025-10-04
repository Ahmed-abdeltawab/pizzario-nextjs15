import { Product, Size, Extra } from "@prisma/client";

// Product type with relations included
export type ProductWithRelations = Product & {
  sizes: Size[];
  extras: Extra[];
};

// You can also export individual types if needed
export type { Product, Size, Extra } from "@prisma/client";
