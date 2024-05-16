/*
  Warnings:

  - The primary key for the `orderDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderid` on the `orderDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `orderDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `orderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orderDetails_orderid_key";

-- AlterTable
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_pkey",
DROP COLUMN "orderid",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "orderDetails_order_id_key" ON "orderDetails"("order_id");
