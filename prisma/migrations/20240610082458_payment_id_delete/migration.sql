/*
  Warnings:

  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `payment_Id` on the `payments` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "paymentStatus" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "payment_Id",
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("order_Id");
