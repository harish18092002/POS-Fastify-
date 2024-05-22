/*
  Warnings:

  - Added the required column `orderDetails` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "orderDetails" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_orderDetails_fkey" FOREIGN KEY ("orderDetails") REFERENCES "OrderDetails"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
