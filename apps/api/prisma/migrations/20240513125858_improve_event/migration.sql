-- AlterTable
ALTER TABLE `event` ADD COLUMN `isFree` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `price` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `promoItemId` INTEGER NULL;
