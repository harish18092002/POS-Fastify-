/*
  Warnings:

  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "payments";

-- CreateTable
CREATE TABLE "paymentsTransaction" (
    "order_id" TEXT NOT NULL,
    "payment_status" "paymentStatus" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentsTransaction_pkey" PRIMARY KEY ("created_at")
);

-- CreateTable
CREATE TABLE "completedPayments" (
    "order_id" TEXT NOT NULL,
    "payment_status" "paymentStatus" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "completedPayments_pkey" PRIMARY KEY ("created_at")
);
