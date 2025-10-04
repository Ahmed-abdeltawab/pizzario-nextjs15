-- CreateEnum
CREATE TYPE "ExtrasName" AS ENUM ('COKE', 'SPRITE', 'FRIES', 'CHEESE', 'BACON');

-- CreateTable
CREATE TABLE "Extras" (
    "id" TEXT NOT NULL,
    "name" "ExtrasName" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Extras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extras" ADD CONSTRAINT "Extras_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
