import { auth } from "@/actions/authAction";
import prisma from "@/lib/singleton"
import { NextRequest, NextResponse } from "next/server"



export const GET = async(req: NextRequest) => {
    let session;
    try {
        session = await auth()
    } catch (error) {
        session = undefined
    }
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = 9
    const skip = (page - 1) * limit;

    try {
        const [quizzes, total, userQuizzes] =  await Promise.all([
            prisma.quiz.findMany({
                include: {
                    quizAttempt: true
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }), 
            prisma.quiz.count,
            prisma.quiz.findMany({
                where: { createdById: session?.user.id }
            })
        ]) 

        return NextResponse.json({
            quizzes,
            total,
            userQuizzes: userQuizzes.length
        })
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({msg: "Server Error"}, {status: 500})
    }
}