/*
  Warnings:

  - The values [REFUNDED] on the enum `paymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "paymentStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "payments" ALTER COLUMN "payment_Status" TYPE "paymentStatus_new" USING ("payment_Status"::text::"paymentStatus_new");
ALTER TYPE "paymentStatus" RENAME TO "paymentStatus_old";
ALTER TYPE "paymentStatus_new" RENAME TO "paymentStatus";
DROP TYPE "paymentStatus_old";
COMMIT;
