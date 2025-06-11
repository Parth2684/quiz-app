import { auth } from "@/actions/authAction";
import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/singleton";
import { quizSchema } from "@/types/quiz";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req: NextRequest) => {
    const session = await auth()
    if(!session){
        return NextResponse.json({msg: "Unauthorized"}, {status: 401})
    }
    const body = await req.json()
    const response = quizSchema.safeParse(body)
    if(!response.success){
        return NextResponse.json({msg: "Please Ensure you are providing correct details"}, {status: 411})
    }
    const { name, description } = response.data;

    const result = await prisma.$transaction(async (tx) => {
        
        const quiz = await tx.quiz.create({
            data: {
                name,
                createdById: session.user.id
            }
        })

        await Promise.all(
            description.map(async (q) => {
                const question = await tx.question.create({
                    data: {
                        question: q.question,
                        quizId: quiz.id
                    }
                })

                const optionsData: Prisma.OptionCreateManyInput[] = q.options.map((opt) => ({
                    option: opt,
                    isCorrect: opt === q.correctOption,
                    questionId: question.id
                }))

                await tx.option.createMany({data: optionsData})
            })
        )

    })

    
}