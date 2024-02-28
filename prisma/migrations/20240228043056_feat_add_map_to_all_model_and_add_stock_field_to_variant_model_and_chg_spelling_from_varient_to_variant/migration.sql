/*
  Warnings:

  - You are about to drop the column `hasVarient` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "hasVarient";
ALTER TABLE "products" ADD COLUMN     "hasVariant" BOOL NOT NULL DEFAULT false;
