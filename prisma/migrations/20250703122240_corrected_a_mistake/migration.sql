/*
  Warnings:

  - You are about to drop the column `attemptNumber` on the `QuizAttempt` table. All the data in the column will be lost.
  - Added the required column `score` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "attemptNumber",
ADD COLUMN     "score" INTEGER NOT NULL;
