/*
  Warnings:

  - You are about to drop the `OrderDetais` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetais" DROP CONSTRAINT "OrderDetais_order_id_fkey";

-- DropTable
DROP TABLE "OrderDetais";

-- CreateTable
CREATE TABLE "OrderDetails" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,
    "status" "orderStatus" NOT NULL,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Item"("item_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
