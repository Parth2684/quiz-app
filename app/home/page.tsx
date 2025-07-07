import HomePage from "@/components/HomePage"
import prisma from "@/lib/singleton"
import { auth } from "@/actions/authAction"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Quizzo",
    description: "Your Quizzo hub — view your quizzes, track performance, and start solving new ones.",
  };
  
export default async function Home() {
    let session;
    try {
        session = await auth()
    } catch (error) {
        session = undefined
    }
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