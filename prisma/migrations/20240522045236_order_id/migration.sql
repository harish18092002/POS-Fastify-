/*
  Warnings:

  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Tax` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `taxId` on the `Tax` table. All the data in the column will be lost.
  - Added the required column `order_Id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_Id` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_Id` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderId",
ADD COLUMN     "order_Id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_pkey",
DROP COLUMN "orderId",
DROP COLUMN "taxId",
ADD COLUMN     "item_Id" TEXT NOT NULL,
ADD COLUMN     "tax_Id" TEXT NOT NULL,
ADD CONSTRAINT "Tax_pkey" PRIMARY KEY ("tax_Id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_order_Id_fkey" FOREIGN KEY ("order_Id") REFERENCES "OrderDetails"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_item_Id_fkey" FOREIGN KEY ("item_Id") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
