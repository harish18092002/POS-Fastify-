/*
  Warnings:

  - Changed the type of `payment_type` on the `paymentsTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('FULL', 'PARTIAL');

-- AlterTable
ALTER TABLE "paymentsTransaction" DROP COLUMN "payment_type",
ADD COLUMN     "payment_type" "paymentType" NOT NULL;
