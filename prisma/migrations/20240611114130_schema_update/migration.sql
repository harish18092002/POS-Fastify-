/*
  Warnings:

  - Added the required column `amount` to the `paymentsHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paymentsHistory" ADD COLUMN     "amount" TEXT NOT NULL;
