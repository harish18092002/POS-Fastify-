-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "payments" (
    "paymentId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "paymentStatus" "paymentStatus" NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("paymentId")
);
