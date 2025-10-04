/*
  Warnings:

  - You are about to drop the `Extras` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ExtraName" AS ENUM ('COKE', 'SPRITE', 'FRIES', 'CHEESE', 'BACON');

-- DropForeignKey
ALTER TABLE "public"."Extras" DROP CONSTRAINT "Extras_productId_fkey";

-- DropTable
DROP TABLE "public"."Extras";

-- DropEnum
DROP TYPE "public"."ExtrasName";

-- CreateTable
CREATE TABLE "Extra" (
    "id" TEXT NOT NULL,
    "name" "ExtraName" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
