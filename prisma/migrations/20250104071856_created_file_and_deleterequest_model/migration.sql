/*
  Warnings:

  - You are about to drop the column `fileId` on the `Record` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deleteReqId]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Record` DROP COLUMN `fileId`,
    ADD COLUMN `deleteReqId` INTEGER NULL;

-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `recordId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeleteRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reqUserId` VARCHAR(191) NOT NULL,
    `approveUserId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Record_deleteReqId_key` ON `Record`(`deleteReqId`);

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_deleteReqId_fkey` FOREIGN KEY (`deleteReqId`) REFERENCES `DeleteRequest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_recordId_fkey` FOREIGN KEY (`recordId`) REFERENCES `Record`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteRequest` ADD CONSTRAINT `DeleteRequest_reqUserId_fkey` FOREIGN KEY (`reqUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteRequest` ADD CONSTRAINT `DeleteRequest_approveUserId_fkey` FOREIGN KEY (`approveUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
