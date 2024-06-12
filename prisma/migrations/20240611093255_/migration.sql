/*
  Warnings:

  - The primary key for the `paymentsHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "paymentsHistory" DROP CONSTRAINT "paymentsHistory_pkey",
ADD COLUMN     "sNo" SERIAL NOT NULL,
ADD CONSTRAINT "paymentsHistory_pkey" PRIMARY KEY ("sNo");
