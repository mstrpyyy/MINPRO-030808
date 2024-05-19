/*
  Warnings:

  - You are about to drop the column `usedPointId` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `usedPointId`,
    ADD COLUMN `pointId` INTEGER NULL;
