/*
  Warnings:

  - You are about to drop the column `typed` on the `completed_chapters` table. All the data in the column will be lost.
  - Added the required column `typedWords` to the `completed_chapters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "completed_chapters" DROP COLUMN "typed",
ADD COLUMN     "typedWords" TEXT NOT NULL;
