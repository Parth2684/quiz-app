/*
  Warnings:

  - Added the required column `quizId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "quizId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
