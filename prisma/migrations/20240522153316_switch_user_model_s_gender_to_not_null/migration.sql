/*
  Warnings:

  - Made the column `gender` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('male', 'female', 'other') NOT NULL;
