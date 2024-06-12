/*
  Warnings:

  - The values [COMPLETED,PARTIAL] on the enum `paymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `payment_type` on the `paymentsTransaction` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "paymentStatus_new" AS ENUM ('PENDING', 'PARTIAL_COMPLETED', 'FULL_COMPLETED', 'CANCELLED', 'REFUNDED');
ALTER TABLE "paymentsHistory" ALTER COLUMN "payment_status" TYPE "paymentStatus_new" USING ("payment_status"::text::"paymentStatus_new");
ALTER TABLE "paymentsTransaction" ALTER COLUMN "payment_status" TYPE "paymentStatus_new" USING ("payment_status"::text::"paymentStatus_new");
ALTER TYPE "paymentStatus" RENAME TO "paymentStatus_old";
ALTER TYPE "paymentStatus_new" RENAME TO "paymentStatus";
DROP TYPE "paymentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "paymentsTransaction" DROP COLUMN "payment_type";

-- DropEnum
DROP TYPE "paymentType";
