/*
  Warnings:

  - The `status` column on the `Invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('ACTIVE', 'USED', 'EXPIRED');

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "status",
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT E'ACTIVE';

-- DropEnum
DROP TYPE "InvitationCodeStatus";
