/*
  Warnings:

  - You are about to drop the column `category_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event_images` DROP FOREIGN KEY `event_images_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_category_id_fkey`;

-- DropIndex
DROP INDEX `events_title_location_scheduled_at_status_venue_type_city_ro_idx` ON `events`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `category_id`,
    ADD COLUMN `category` ENUM('Accoustic', 'SemiPunk', 'Koplo') NOT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    MODIFY `scheduled_at` DATE NOT NULL,
    MODIFY `start_time` TIME(0) NOT NULL,
    MODIFY `end_time` TIME(0) NOT NULL,
    MODIFY `discount_amount` ENUM('0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '60%', '70%', '80%') NOT NULL DEFAULT '0%',
    MODIFY `assigned_pic` VARCHAR(191) NULL,
    MODIFY `pic_phone_no` VARCHAR(25) NULL;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `event_images`;

-- CreateIndex
CREATE INDEX `events_title_location_scheduled_at_status_venue_type_city_idx` ON `events`(`title`, `location`, `scheduled_at`, `status`, `venue_type`, `city`);
