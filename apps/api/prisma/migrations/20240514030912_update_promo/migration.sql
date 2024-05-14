/*
  Warnings:

  - You are about to drop the `promoitem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discount` to the `Promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `promoitem` DROP FOREIGN KEY `PromoItem_promoId_fkey`;

-- AlterTable
ALTER TABLE `promo` ADD COLUMN `StartDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `discount` INTEGER NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `promoitem`;
