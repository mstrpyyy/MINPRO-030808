/*
  Warnings:

  - You are about to drop the column `startSaleDateDateTime` on the `event` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `startSaleDateDateTime`,
    ADD COLUMN `slug` LONGTEXT NOT NULL,
    ADD COLUMN `startSale` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
