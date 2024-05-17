/*
  Warnings:

  - You are about to drop the `data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "data";

-- DropTable
DROP TABLE "orderDetails";

-- CreateTable
CREATE TABLE "Item" (
    "name" TEXT NOT NULL,
    "item_Id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_Id")
);

-- CreateTable
CREATE TABLE "OrderDetais" (
    "order_id" TEXT NOT NULL,
    "status" "orderStatus" NOT NULL,
    "itemItemId" TEXT NOT NULL,

    CONSTRAINT "OrderDetais_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "OrderDetais" ADD CONSTRAINT "OrderDetais_itemItemId_fkey" FOREIGN KEY ("itemItemId") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
