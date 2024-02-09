/*
  Warnings:

  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `Participants_programsId_fkey`;

-- AlterTable
ALTER TABLE `program` ADD COLUMN `numberOfParticipants` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `participants`;

-- CreateTable
CREATE TABLE `Participant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emailAddress` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `courseAndYear` VARCHAR(191) NOT NULL,
    `enrolmentNumber` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `hall` VARCHAR(191) NOT NULL,
    `hostelAndRoom` VARCHAR(191) NOT NULL,
    `competition_individual_1` VARCHAR(191) NOT NULL,
    `competition_individual_2` VARCHAR(191) NOT NULL,
    `competition_individual_3` VARCHAR(191) NOT NULL,
    `competition_individual_4` VARCHAR(191) NOT NULL,
    `competition_group_1` VARCHAR(191) NOT NULL,
    `competition_group_2` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParticipantGirls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emailAddress` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `courseAndYear` VARCHAR(191) NOT NULL,
    `enrolmentNumber` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `hall` VARCHAR(191) NOT NULL,
    `competition_individual_1` VARCHAR(191) NOT NULL,
    `competition_individual_2` VARCHAR(191) NOT NULL,
    `competition_individual_3` VARCHAR(191) NOT NULL,
    `competition_individual_4` VARCHAR(191) NOT NULL,
    `competition_group_1` VARCHAR(191) NOT NULL,
    `competition_group_2` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
