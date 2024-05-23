/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `item_Id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `order_Id` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Tax` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `item_Id` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `tax_Id` on the `Tax` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_id` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_order_Id_fkey";

-- DropForeignKey
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_item_Id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "item_Id",
DROP COLUMN "order_Id",
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id");

-- AlterTable
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_pkey",
DROP COLUMN "item_Id",
DROP COLUMN "tax_Id",
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "tax_id" TEXT NOT NULL,
ADD CONSTRAINT "Tax_pkey" PRIMARY KEY ("tax_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "OrderDetails"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
