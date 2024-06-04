/*
  Warnings:

  - You are about to alter the column `avatar` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `avatar` VARCHAR(191) NULL;
