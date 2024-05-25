-- DropIndex
DROP INDEX `events_title_location_scheduled_at_status_venue_type_city_idx` ON `events`;

-- DropIndex
DROP INDEX `users_username_fullname_role_idx` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `events_title_location_scheduled_at_status_venue_type_city_ro_idx` ON `events`(`title`, `location`, `scheduled_at`, `status`, `venue_type`, `city`, `roster`);

-- CreateIndex
CREATE INDEX `users_username_fullname_email_role_idx` ON `users`(`username`, `fullname`, `email`, `role`);
