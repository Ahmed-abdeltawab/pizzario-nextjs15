import { Extra, Size } from "@prisma/client";

export const generateUniqueKey = (
  productId: string,
  size?: Size,
  extras?: Extra[]
) => {
  const extrasKey = (extras ?? [])
    .map((e) => e.id)
    .sort()
    .join("-");
  return `${productId}_${size?.id ?? "no-size"}_${extrasKey}`;
};
