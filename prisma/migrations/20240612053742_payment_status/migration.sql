/*
  Warnings:

  - The values [FULL_COMPLETED] on the enum `paymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "paymentStatus_new" AS ENUM ('PENDING', 'PARTIAL_COMPLETED', 'FULLY_COMPLETED', 'CANCELLED', 'REFUNDED');
ALTER TABLE "paymentsHistory" ALTER COLUMN "payment_status" TYPE "paymentStatus_new" USING ("payment_status"::text::"paymentStatus_new");
ALTER TABLE "paymentsTransaction" ALTER COLUMN "payment_status" TYPE "paymentStatus_new" USING ("payment_status"::text::"paymentStatus_new");
ALTER TYPE "paymentStatus" RENAME TO "paymentStatus_old";
ALTER TYPE "paymentStatus_new" RENAME TO "paymentStatus";
DROP TYPE "paymentStatus_old";
COMMIT;
