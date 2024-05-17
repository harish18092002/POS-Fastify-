/*
  Warnings:

  - You are about to drop the column `tax` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemItemId` on the `OrderDetais` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetais" DROP CONSTRAINT "OrderDetais_itemItemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "tax",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetais" DROP COLUMN "itemItemId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Tax" (
    "tax" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("itemId")
);

-- AddForeignKey
ALTER TABLE "OrderDetais" ADD CONSTRAINT "OrderDetais_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_item_Id_fkey" FOREIGN KEY ("item_Id") REFERENCES "Tax"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
