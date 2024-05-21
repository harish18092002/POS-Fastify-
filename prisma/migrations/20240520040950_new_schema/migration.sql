-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_item_Id_fkey";

-- DropForeignKey
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_taxId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderDetails"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
