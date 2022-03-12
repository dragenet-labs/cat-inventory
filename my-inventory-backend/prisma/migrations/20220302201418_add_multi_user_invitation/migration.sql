/*
  Warnings:

  - The values [USED] on the enum `InvitationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Invitation` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvitationStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');
ALTER TABLE "Invitation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invitation" ALTER COLUMN "status" TYPE "InvitationStatus_new" USING ("status"::text::"InvitationStatus_new");
ALTER TYPE "InvitationStatus" RENAME TO "InvitationStatus_old";
ALTER TYPE "InvitationStatus_new" RENAME TO "InvitationStatus";
DROP TYPE "InvitationStatus_old";
ALTER TABLE "Invitation" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_userId_fkey";

-- DropIndex
DROP INDEX "Invitation_userId_key";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "userId",
ADD COLUMN     "volume" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "invitationId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
