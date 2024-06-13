-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('unpaid', 'pending', 'success', 'cancelled') NOT NULL DEFAULT 'unpaid';
