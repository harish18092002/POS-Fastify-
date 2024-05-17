/*
  Warnings:

  - The values [SGST] on the enum `taxType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `tax_amount` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "taxType_new" AS ENUM ('GST', 'VAT');
ALTER TABLE "Tax" ALTER COLUMN "tax_type" TYPE "taxType_new" USING ("tax_type"::text::"taxType_new");
ALTER TYPE "taxType" RENAME TO "taxType_old";
ALTER TYPE "taxType_new" RENAME TO "taxType";
DROP TYPE "taxType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "tax_amount" TEXT NOT NULL;
