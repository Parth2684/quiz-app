import { auth } from "@/actions/authAction";
import { Alert } from "@/components/Alert";
import prisma from "@/lib/singleton";
import { redirect } from "next/navigation";



export default async function Stats ({ params } : { params: Promise<{ quizId: string }> }) {
    const session = await auth()
    
    if(!session) {
        redirect("/signin")
    }

    const quizId = (await params).quizId
    const stats = await prisma.quizAttempt.findMany({
        where: { quizId },
        select: {
            user: true,
            quiz: true,
            answers: true
        }
    })
    if(stats.length === 0) {
        return <div>
            no users
        </div>
    }
    const isOwner = Boolean(session.user.id != stats[0].quiz.createdById)

    if(!isOwner) {
        return <Alert type="error" message="You are not authenticated for this action" />
    }else {
        return <div>
            Hello World
        </div>
    }
}