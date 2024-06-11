/*
  Warnings:

  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("created_at");
