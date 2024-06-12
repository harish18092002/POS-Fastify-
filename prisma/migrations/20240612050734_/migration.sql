/*
  Warnings:

  - The primary key for the `paymentsHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sNo` on the `paymentsHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "paymentsHistory" DROP CONSTRAINT "paymentsHistory_pkey",
DROP COLUMN "sNo",
ADD CONSTRAINT "paymentsHistory_pkey" PRIMARY KEY ("payment_id");
