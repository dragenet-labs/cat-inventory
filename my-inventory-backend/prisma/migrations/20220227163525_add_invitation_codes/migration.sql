/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `InvitationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InvitationCode_userId_key" ON "InvitationCode"("userId");
