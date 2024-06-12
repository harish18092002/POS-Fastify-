/*
  Warnings:

  - The `payment_id` column on the `paymentsHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "paymentsHistory" DROP COLUMN "payment_id",
ADD COLUMN     "payment_id" TEXT[];
