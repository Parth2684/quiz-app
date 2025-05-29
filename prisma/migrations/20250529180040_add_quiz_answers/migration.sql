/*
  Warnings:

  - You are about to drop the column `optionIds` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `questionIds` on the `QuizAttempt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "optionIds",
DROP COLUMN "questionIds";

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "id" TEXT NOT NULL,
    "quizAttemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "QuizAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
