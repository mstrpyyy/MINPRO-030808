/*
  Warnings:

  - You are about to drop the `wishlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlistitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlistitem` DROP FOREIGN KEY `WishlistItem_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlistitem` DROP FOREIGN KEY `WishlistItem_wishlistId_fkey`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `confirmedAt` DATETIME(3) NULL,
    ADD COLUMN `paidAt` DATETIME(3) NULL,
    MODIFY `totalDiscount` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `wishlist`;

-- DropTable
DROP TABLE `wishlistitem`;
