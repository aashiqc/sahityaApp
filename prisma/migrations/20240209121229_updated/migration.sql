/*
  Warnings:

  - You are about to drop the column `competition_group_1` on the `participantgirls` table. All the data in the column will be lost.
  - You are about to drop the column `competition_group_2` on the `participantgirls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `participantgirls` DROP COLUMN `competition_group_1`,
    DROP COLUMN `competition_group_2`;
