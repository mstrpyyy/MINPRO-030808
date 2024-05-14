/*
  Warnings:

  - The values [available] on the enum `Event_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `status` ENUM('ComingSoon', 'Available', 'Finished') NOT NULL;
