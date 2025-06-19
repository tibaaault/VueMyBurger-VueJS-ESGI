/*
  Warnings:

  - Added the required column `ingredients` to the `Burger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Burger` ADD COLUMN `ingredients` TEXT NOT NULL;
