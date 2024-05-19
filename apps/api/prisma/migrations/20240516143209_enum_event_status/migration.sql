-- AlterTable
ALTER TABLE `event` MODIFY `status` ENUM('ComingSoon', 'Available', 'Finished', 'Cancelled', 'SoldOut') NOT NULL;
