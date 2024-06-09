/*
  Warnings:

  - You are about to alter the column `start_time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - You are about to alter the column `end_time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `scheduled_at` DATETIME(3) NOT NULL,
    MODIFY `start_time` DATETIME(3) NOT NULL,
    MODIFY `end_time` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `points_used` INTEGER NULL;
