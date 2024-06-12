/*
  Warnings:

  - Added the required column `amount` to the `paymentsTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paymentsTransaction" ADD COLUMN     "amount" TEXT NOT NULL;
