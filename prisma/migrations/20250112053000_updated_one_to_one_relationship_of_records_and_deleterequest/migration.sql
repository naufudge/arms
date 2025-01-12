/*
  Warnings:

  - You are about to drop the column `deleteReqId` on the `Record` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recordId]` on the table `DeleteRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Record` DROP FOREIGN KEY `Record_deleteReqId_fkey`;

-- DropIndex
DROP INDEX `Record_deleteReqId_key` ON `Record`;

-- AlterTable
ALTER TABLE `DeleteRequest` ADD COLUMN `recordId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Record` DROP COLUMN `deleteReqId`;

-- CreateIndex
CREATE UNIQUE INDEX `DeleteRequest_recordId_key` ON `DeleteRequest`(`recordId`);

-- AddForeignKey
ALTER TABLE `DeleteRequest` ADD CONSTRAINT `DeleteRequest_recordId_fkey` FOREIGN KEY (`recordId`) REFERENCES `Record`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
