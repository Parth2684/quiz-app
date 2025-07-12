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

    async function countPeople () {
        const [totalUsers, totalQuizCount] = await Promise.all([prisma.user.count(), prisma.quiz.count()])
        return totalUsers;
    }

    
    const totalUsers = await countPeople()
    return <div>
        <HomePage session={session} totalUsers={totalUsers} />
    </div>
}