import { cache } from "@/lib/cache";
import prisma from "@/lib/prisma";

export const getCategoriesWithProducts = cache(
  () => {
    return prisma.category.findMany({
      where: {
        products: {
          some: {},
        },
      },
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
  },
  ["categories-with-products"],
  { revalidate: 3600 }
);
