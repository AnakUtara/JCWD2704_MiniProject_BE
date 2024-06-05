/*
  Warnings:

  - You are about to drop the column `invoice_no` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `invoice_code` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_voucher_id_fkey`;

-- DropIndex
DROP INDEX `transactions_invoice_no_status_user_id_event_id_idx` ON `transactions`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `invoice_no`,
    ADD COLUMN `invoice_code` VARCHAR(191) NOT NULL,
    MODIFY `voucher_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `transactions_invoice_code_status_user_id_event_id_idx` ON `transactions`(`invoice_code`, `status`, `user_id`, `event_id`);

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
