/*
  Warnings:

  - Added the required column `type` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "notes_title_key";

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "type" TEXT NOT NULL;
