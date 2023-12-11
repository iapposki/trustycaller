-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" TEXT,
    "phoneNumber" VARCHAR(15) NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spam" (
    "id" SERIAL NOT NULL,
    "phoneNumber" VARCHAR(15) NOT NULL,
    "reportedTimes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "spam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "spam_phoneNumber_key" ON "spam"("phoneNumber");
