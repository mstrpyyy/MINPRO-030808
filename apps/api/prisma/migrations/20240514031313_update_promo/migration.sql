/*
  Warnings:

  - Added the required column `discountType` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promo` ADD COLUMN `discountType` ENUM('Nominal', 'Percent') NOT NULL;
