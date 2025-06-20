-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_burgerId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_burgerId_fkey` ON `OrderItem`;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `burgerName` VARCHAR(191) NULL,
    MODIFY `burgerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_burgerId_fkey` FOREIGN KEY (`burgerId`) REFERENCES `Burger`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
