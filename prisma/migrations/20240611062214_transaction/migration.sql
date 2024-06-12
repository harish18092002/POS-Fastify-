/*
  Warnings:

  - You are about to drop the `PaymentsTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaymentsTransaction";

-- CreateTable
CREATE TABLE "paymentsTransaction" (
    "transaction_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "payment_status" "paymentStatus" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentsTransaction_pkey" PRIMARY KEY ("transaction_id")
);
