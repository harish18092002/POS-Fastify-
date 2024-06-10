/*
  Warnings:

  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `payments` table. All the data in the column will be lost.
  - Added the required column `order_Id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_Id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_Status` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_Amount` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "orderId",
DROP COLUMN "paymentId",
DROP COLUMN "paymentStatus",
DROP COLUMN "totalAmount",
ADD COLUMN     "order_Id" TEXT NOT NULL,
ADD COLUMN     "payment_Id" TEXT NOT NULL,
ADD COLUMN     "payment_Status" "paymentStatus" NOT NULL,
ADD COLUMN     "total_Amount" TEXT NOT NULL,
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_Id");
