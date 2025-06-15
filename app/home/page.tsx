import HomePage from "@/components/HomePage"
import prisma from "@/lib/singleton"
import { auth } from "@/actions/authAction"



export default async function () {
    const session = await auth()
    async function getQuizes () {
        const quizes = await prisma.quiz.findMany({
            include: {
                quizAttempt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return quizes;
    }

    async function countPeople () {
        const totalUsers = await prisma.user.count()
        return totalUsers;
    }
    const totalUsers = await countPeople()
    const quizes = await getQuizes()
    return <div>
        <HomePage quizes={quizes} session={session} totalUsers={totalUsers} />
    </div>
}