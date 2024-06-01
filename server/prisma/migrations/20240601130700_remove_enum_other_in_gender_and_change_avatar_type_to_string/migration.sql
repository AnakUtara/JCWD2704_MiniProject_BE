/*
  Warnings:

  - The values [other] on the enum `users_gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `avatar` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('male', 'female') NULL,
    MODIFY `avatar` VARCHAR(191) NULL;
