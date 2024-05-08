/*
  Warnings:

  - You are about to drop the column `expireDate` on the `pointuser` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `PointUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pointuser` DROP COLUMN `expireDate`,
    ADD COLUMN `createdAt` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `promoItemId` INTEGER NULL;
