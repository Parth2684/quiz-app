import { auth } from "@/actions/authAction";
import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/singleton";
import { quizSchema } from "@/types/quiz";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"

export const POST = async(req: NextRequest) => {
    try {
        const session = await auth()
        if(!session){
            return NextResponse.json({msg: "Unauthorized"}, {status: 401})
        }
        const body = await req.json()
        const response = quizSchema.safeParse(body)
        if(!response.success){
            console.error(response.error)
            return NextResponse.json({msg: "Please Ensure you are providing correct details"}, {status: 411})
        }
        const { name, description, questionAnswer } = response.data;

        await prisma.$transaction(async (tx) => {
            
            const quizId = uuidv4()

            await tx.quiz.create({
                data: {
                    id: quizId,
                    name,
                    description,
                    createdById: session.user.id
                }
            })

            const questionIds: string[] = []
            const questionData = questionAnswer.map((q) => {
                const questionId = uuidv4();
                questionIds.push(questionId);
                return {
                    id: questionId,
                    question: q.question,
                    quizId
                }
            })

            await tx.question.createMany({data: questionData})

            const allOptions: Prisma.OptionCreateManyInput[] = questionAnswer.flatMap((q, index) => {
                const questionId = questionIds[index];
                return q.options.map((opt) => ({
                    id: uuidv4(),
                    option: opt,
                    questionId,
                    isCorrect: opt === q.correctOption
                }))
            })

            await tx.option.createMany({ data: allOptions })
        })

        return NextResponse.json({ msg: "Successfully Created The Quiz" })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ msg: "Could not create the quiz" }, { status: 500 })
    }
}