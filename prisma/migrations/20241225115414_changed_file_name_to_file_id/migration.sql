/*
  Warnings:

  - You are about to drop the column `fileName` on the `Record` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Record` DROP COLUMN `fileName`,
    ADD COLUMN `fileId` VARCHAR(191) NOT NULL;
