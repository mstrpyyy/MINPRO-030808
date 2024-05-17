/*
  Warnings:

  - The values [Decline] on the enum `Transaction_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `status` ENUM('WaitingPayment', 'WaitingConfirmation', 'Paid', 'Cancelled', 'Declined') NOT NULL;
