import { auth } from "@/actions/authAction";
import prisma from "@/lib/singleton";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async (req: NextRequest, context: { params: Promise<{id: string}> }) => {
    try {
        const session = await auth()
        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
        const postToDeleteId = (await context.params).id;
        await prisma.quiz.delete({ where: {id: postToDeleteId, createdById: session.user.id} })
        return NextResponse.json({msg: "Deleted The Post Successfully"})
    } catch (error) {
        console.error(error, "error deleting quiz")
        return NextResponse.json({msg: "Could Not delete the quiz"}, {status: 500})
    }
}