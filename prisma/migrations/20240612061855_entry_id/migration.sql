/*
  Warnings:

  - The primary key for the `paymentsHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `entry_id` to the `paymentsHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paymentsHistory" DROP CONSTRAINT "paymentsHistory_pkey",
ADD COLUMN     "entry_id" TEXT NOT NULL,
ADD CONSTRAINT "paymentsHistory_pkey" PRIMARY KEY ("entry_id");
