/*
  Warnings:

  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "volume" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" VARCHAR(60) NOT NULL;
