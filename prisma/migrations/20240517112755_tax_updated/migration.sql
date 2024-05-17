/*
  Warnings:

  - Changed the type of `tax_type` on the `Tax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "taxType" AS ENUM ('GST', 'VAT', 'SGST');

-- AlterTable
ALTER TABLE "Tax" DROP COLUMN "tax_type",
ADD COLUMN     "tax_type" "taxType" NOT NULL;

-- DropEnum
DROP TYPE "taxtype";
