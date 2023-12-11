/*
  Warnings:

  - You are about to drop the `spam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "spam";

-- CreateTable
CREATE TABLE "Spam" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "phoneNumber" VARCHAR(15) NOT NULL,
    "reportedTimes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Spam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spam_phoneNumber_key" ON "Spam"("phoneNumber");
