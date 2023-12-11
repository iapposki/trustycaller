/*
  Warnings:

  - Made the column `numberWithoutCountryCode` on table `Spam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Spam" ALTER COLUMN "numberWithoutCountryCode" SET NOT NULL;
