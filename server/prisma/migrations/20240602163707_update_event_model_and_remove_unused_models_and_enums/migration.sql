/*
  Warnings:

  - You are about to alter the column `status` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(3))`.
  - You are about to alter the column `discount_amount` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Int`.
  - The values [Accoustic,SemiPunk,Koplo] on the enum `events_category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `transfer_proof` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(191)`.
  - You are about to drop the `event_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_url` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_no` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event_images` DROP FOREIGN KEY `event_images_event_id_fkey`;

-- DropIndex
DROP INDEX `transactions_status_idx` ON `transactions`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `discount_price` DOUBLE NULL,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('published', 'finished') NOT NULL DEFAULT 'published',
    MODIFY `discount_amount` INTEGER NULL,
    MODIFY `category` ENUM('Acoustic', 'Rock', 'Punk', 'Metal', 'Pop', 'Electronic', 'Experimental') NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `invoice_no` VARCHAR(191) NOT NULL,
    MODIFY `transfer_proof` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `event_images`;

-- CreateIndex
CREATE INDEX `transactions_invoice_no_status_user_id_event_id_idx` ON `transactions`(`invoice_no`, `status`, `user_id`, `event_id`);
