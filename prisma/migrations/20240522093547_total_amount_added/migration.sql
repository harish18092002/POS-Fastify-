/*
  Warnings:

  - Added the required column `total_amount` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "total_amount" TEXT NOT NULL;
