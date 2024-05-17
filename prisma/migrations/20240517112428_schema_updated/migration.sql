/*
  Warnings:

  - The primary key for the `Tax` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tax` on the `Tax` table. All the data in the column will be lost.
  - Added the required column `taxId` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_type` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "taxtype" AS ENUM ('GST', 'VAT', 'SGST');

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_item_Id_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_order_id_fkey";

-- AlterTable
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_pkey",
DROP COLUMN "tax",
ADD COLUMN     "taxId" TEXT NOT NULL,
ADD COLUMN     "tax_type" "taxtype" NOT NULL,
ADD CONSTRAINT "Tax_pkey" PRIMARY KEY ("taxId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_item_Id_fkey" FOREIGN KEY ("item_Id") REFERENCES "OrderDetails"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
