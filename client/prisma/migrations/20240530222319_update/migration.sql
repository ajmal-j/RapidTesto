/*
  Warnings:

  - Added the required column `wordId` to the `completed_chapters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "completed_chapters" ADD COLUMN     "wordId" TEXT NOT NULL;
