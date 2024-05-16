-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('ACCEPTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "data" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "Amount" TEXT NOT NULL,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderDetails" (
    "orderid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" "orderStatus" NOT NULL,

    CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("orderid")
);

-- CreateIndex
CREATE UNIQUE INDEX "data_name_key" ON "data"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orderDetails_orderid_key" ON "orderDetails"("orderid");
