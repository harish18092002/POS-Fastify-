/*
  Warnings:

  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_Id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_Status` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `total_Amount` on the `payments` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "order_Id",
DROP COLUMN "payment_Status",
DROP COLUMN "total_Amount",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_id" TEXT NOT NULL,
ADD COLUMN     "payment_status" "paymentStatus" NOT NULL,
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("order_id");
