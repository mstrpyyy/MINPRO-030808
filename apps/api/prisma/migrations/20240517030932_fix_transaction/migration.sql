/*
  Warnings:

  - You are about to drop the column `PointUsed` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pointuser` ADD COLUMN `transactionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `PointUsed`,
    ADD COLUMN `CancelledAt` DATETIME(3) NULL,
    ADD COLUMN `DeclinedAt` DATETIME(3) NULL,
    ADD COLUMN `usedPointId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PointUser` ADD CONSTRAINT `PointUser_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
