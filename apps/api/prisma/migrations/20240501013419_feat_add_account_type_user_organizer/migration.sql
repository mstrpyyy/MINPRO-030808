/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `user` table. All the data in the column will be lost.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableTickets` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `date`,
    DROP COLUMN `location`,
    DROP COLUMN `stock`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `availableTickets` INTEGER NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `startSaleDateDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` ENUM('ComingSoon', 'available', 'Finished') NOT NULL;

-- AlterTable
ALTER TABLE `organizer` ADD COLUMN `accountType` VARCHAR(191) NOT NULL DEFAULT 'organizer';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `points`,
    ADD COLUMN `accountType` VARCHAR(191) NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `PointUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `expireDate` DATETIME(3) NOT NULL,
    `isRedeem` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
