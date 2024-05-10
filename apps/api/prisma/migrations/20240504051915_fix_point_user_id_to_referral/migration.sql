/*
  Warnings:

  - You are about to drop the column `userId` on the `pointuser` table. All the data in the column will be lost.
  - Added the required column `referral` to the `PointUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pointuser` DROP FOREIGN KEY `PointUser_userId_fkey`;

-- AlterTable
ALTER TABLE `pointuser` DROP COLUMN `userId`,
    ADD COLUMN `referral` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PointUser` ADD CONSTRAINT `PointUser_referral_fkey` FOREIGN KEY (`referral`) REFERENCES `User`(`referral`) ON DELETE RESTRICT ON UPDATE CASCADE;
