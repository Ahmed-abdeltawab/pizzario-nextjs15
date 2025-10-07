import { cache } from "@/lib/cache";
import prisma from "@/lib/prisma";

export const getBestSellingProducts = cache(
  (limit?: number | undefined) => {
    const bestsellers = prisma.product.findMany({
      orderBy: { orders: { _count: "desc" } },
      take: limit,
      include: { sizes: true, extras: true },
      // where: { orders: { some: {} } },
    });
    return bestsellers;
  },
  ["best-selling-products"],
  { revalidate: 3600 } // Revalidate every 60 minutes
);
export const getProductsByCategory = cache(
  (categoryId: string) => {
    return prisma.product.findMany({
      where: { categoryId },
      include: { sizes: true, extras: true },
    });
  },
  ["products-by-category"],
  { revalidate: 3600 }
);
