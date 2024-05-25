/*
  Warnings:

  - You are about to alter the column `amount` on the `vouchers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - A unique constraint covering the columns `[voucher_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `vouchers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `vouchers` MODIFY `amount` DOUBLE NOT NULL,
    MODIFY `is_valid` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `used_at` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `transactions_voucher_id_key` ON `transactions`(`voucher_id`);

-- CreateIndex
CREATE UNIQUE INDEX `vouchers_user_id_key` ON `vouchers`(`user_id`);
