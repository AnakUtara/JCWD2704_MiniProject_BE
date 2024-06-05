/*
  Warnings:

  - You are about to drop the column `discount_price` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `discount_price`;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `ticket_discount` INTEGER NULL;
