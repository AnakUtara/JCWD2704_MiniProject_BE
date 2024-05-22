-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(55) NOT NULL,
    `fullname` VARCHAR(85) NOT NULL,
    `email` VARCHAR(85) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('customer', 'promotor') NOT NULL DEFAULT 'customer',
    `phone_no` VARCHAR(25) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `id_card` VARCHAR(16) NOT NULL,
    `gender` ENUM('male', 'female', 'other') NULL,
    `date_of_birth` DATETIME(3) NULL,
    `avatar` BLOB NULL,
    `referral_code` VARCHAR(191) NOT NULL,
    `reference_code` VARCHAR(191) NULL,
    `points` INTEGER NULL,
    `points_expiry_date` DATETIME(3) NULL,
    `bank_acc_no` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `users_username_fullname_role_idx`(`username`, `fullname`, `role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `city` VARCHAR(55) NOT NULL,
    `zip_code` INTEGER NOT NULL,
    `venue_type` ENUM('indoor', 'outdoor') NOT NULL,
    `details` TEXT NOT NULL,
    `roster` VARCHAR(191) NOT NULL,
    `scheduled_at` DATETIME(3) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `status` ENUM('active', 'finished') NOT NULL DEFAULT 'active',
    `discount_amount` ENUM('5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '60%', '70%', '80%') NOT NULL,
    `ticket_price` DOUBLE NOT NULL,
    `ticket_amount` INTEGER NOT NULL,
    `assigned_pic` VARCHAR(191) NOT NULL,
    `pic_phone_no` VARCHAR(25) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `events_title_location_scheduled_at_status_venue_type_city_idx`(`title`, `location`, `scheduled_at`, `status`, `venue_type`, `city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review` TEXT NOT NULL,
    `rating` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`, `event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(55) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_images` (
    `id` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `ticket_bought` INTEGER NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `transfer_proof` BLOB NOT NULL,
    `status` ENUM('unpaid', 'pending', 'success') NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,
    `voucher_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paid_at` DATETIME(3) NOT NULL,

    INDEX `transactions_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vouchers` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `is_valid` BOOLEAN NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `used_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_images` ADD CONSTRAINT `event_images_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
