/*
  Warnings:

  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "image" STRING;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" STRING NOT NULL;
