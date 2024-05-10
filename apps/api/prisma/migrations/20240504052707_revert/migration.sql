/*
  Warnings:

  - You are about to drop the column `referral` on the `pointuser` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PointUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pointuser` DROP FOREIGN KEY `PointUser_referral_fkey`;

-- AlterTable
ALTER TABLE `pointuser` DROP COLUMN `referral`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PointUser` ADD CONSTRAINT `PointUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
