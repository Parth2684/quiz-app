import { auth } from "@/actions/authAction";
import prisma from "@/lib/singleton";
import { NextResponse } from "next/server";



export default async function DELETE ({ params }: { params: { id: string } }) {
    try {
        const sessionId = (await auth()).user.id
        const postToDeleteId = params.id;
        await prisma.quiz.delete({ where: {id: postToDeleteId, createdById: sessionId} })
        return NextResponse.json({msg: "Deleted The Post Successfully"})
    } catch (error) {
        console.error(error, "error deleting quiz")
        return NextResponse.json({msg: "Could Not delete the quiz"}, {status: 500})
    }
}