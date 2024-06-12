/*
  Warnings:

  - You are about to drop the `completedPayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentsTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "completedPayments";

-- DropTable
DROP TABLE "paymentsTransaction";

-- CreateTable
CREATE TABLE "paymentsHistory" (
    "order_id" TEXT NOT NULL,
    "payment_status" "paymentStatus" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentsHistory_pkey" PRIMARY KEY ("created_at")
);

-- CreateTable
CREATE TABLE "PaymentsTransaction" (
    "transaction_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "payment_status" "paymentStatus" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentsTransaction_pkey" PRIMARY KEY ("transaction_id")
);
