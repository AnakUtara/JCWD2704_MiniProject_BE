-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('unpaid', 'pending', 'success') NOT NULL DEFAULT 'unpaid';
