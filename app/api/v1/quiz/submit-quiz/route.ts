import { auth } from "@/actions/authAction";
import prisma from "@/lib/singleton";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid"


export async function POST (req: NextRequest) {
    const submitQuizSchema = z.object({
        quizId: z.string(),
        answersArray: z.array(
            z.object({
                questionId: z.string(),
                optionId: z.string()
            })
        )
    })

    try {

        const [body, session] = await Promise.all([
            req.json(),
            auth()
        ])

        if(!session) {
            return NextResponse.json({msg: "You are not authorised to attempt this quiz"}, {status:409})
        }

        const userId = session.user.id
        
        
        const parsedBody = submitQuizSchema.safeParse(body);
        if(!parsedBody.success) {
            console.error(parsedBody.error)
            return NextResponse.json({msg: "Please Ensure Input Is Correct"}, { status:400 })
        }

        const saveToDb = await prisma.$transaction(async(tx) => {
            const questions = await tx.question.findMany({
                where: { quizId: parsedBody.data.quizId },
                include: { options: true }
            });

            const totalQuestions = questions.length;
    
            const correctOptionIds = new Set();

            let correctAnswers = 0;

            questions.forEach(question => {
                const correctOption = question.options.find(opt => opt.isCorrect);
                if(correctOption) {
                    correctOptionIds.add(correctOption.id)
                }
            });
    
            parsedBody.data.answersArray.forEach(answer => {
                if(correctOptionIds.has(answer.optionId)) {
                    correctAnswers++;
                }
            })
            
            const quizAttemptId = uuidv4();
            
            const questionAnswerArrayObject = parsedBody.data.answersArray.map((questionAnswer) => {
                return {
                    quizAttemptId: quizAttemptId,
                    questionId: questionAnswer.questionId,
                    optionId: questionAnswer.optionId,
                    quizId: parsedBody.data.quizId
                }
            })

            await Promise.all([
                tx.quizAttempt.create({
                    data: {
                        id: quizAttemptId,
                        quizId: parsedBody.data.quizId,
                        userId,
                        score: correctAnswers
                    }
                }),
                
                tx.quizAnswer.createMany({
                    data: questionAnswerArrayObject
                }) 
            ]) 
            
            return {
                totalQuestions,
                correctAnswers
            }
            
        })
        
        return NextResponse.json({msg: "Quiz Answers Submitted Successfully", totalQuestions: saveToDb.totalQuestions, score: saveToDb.correctAnswers})

    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: "Server Error"}, { status: 500 })
    }
}