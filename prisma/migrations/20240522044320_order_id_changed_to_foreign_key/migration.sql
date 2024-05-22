/*
  Warnings:

  - You are about to drop the column `itemId` on the `Tax` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_itemId_fkey";

-- AlterTable
ALTER TABLE "Tax" DROP COLUMN "itemId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
