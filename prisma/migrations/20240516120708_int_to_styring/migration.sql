/*
  Warnings:

  - The primary key for the `data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `orderDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "data" DROP CONSTRAINT "data_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "data_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_pkey",
ALTER COLUMN "order_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("order_id");
