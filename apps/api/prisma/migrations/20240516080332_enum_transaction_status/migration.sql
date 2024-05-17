-- AlterTable
ALTER TABLE `transaction` MODIFY `status` ENUM('WaitingPayment', 'WaitingConfirmation', 'Pending', 'Paid', 'Cancel') NOT NULL;
