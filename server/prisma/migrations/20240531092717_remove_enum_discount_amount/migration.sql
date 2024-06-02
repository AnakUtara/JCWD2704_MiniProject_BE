/*
  Warnings:

  - You are about to alter the column `discount_amount` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Int`.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `discount_amount` INTEGER NULL;
