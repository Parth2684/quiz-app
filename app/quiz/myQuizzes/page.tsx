import { auth } from "@/actions/authAction";
import { NotVerified } from "@/components/NotVerified";
import prisma from "@/lib/singleton";
import Link from "next/link";

export const metadata = {
  title: "My Quizzes | Quizzo",
  description: "View, manage, and edit quizzes you’ve created on Quizzo. Total control in one place.",
};


export default async function MyQuizzes () {
    const session = await auth()
    if(!session) {
        return <NotVerified />
    }
    const myquizzes = await prisma.quiz.findMany({
        where: { createdById: session.user.id },
        orderBy: { createdAt: 'desc' }
    })

    return <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-semibold mb-6">Your Created Quizzes</h1>

    {myquizzes.length === 0 ? (
      <p className="text-gray-600">You haven't created any quizzes yet.</p>
    ) : (
      <div className="space-y-4">
        {myquizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/quiz/${quiz.id}/attempts`} 
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition hover:text-purple-700"
          >
            <h2 className="text-lg font-medium">{quiz.name}</h2>
            {quiz.description && (
              <p className="text-sm text-gray-600 mt-1">
                {quiz.description}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Created on {new Date(quiz.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    )}
  </div>
}
