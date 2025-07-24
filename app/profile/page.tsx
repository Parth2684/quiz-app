import { auth } from "@/actions/authAction";
import prisma from "@/lib/singleton";
import { format } from "date-fns";
import Link from "next/link";


export default async function Profile () {
    const session = await auth()
    const attemptedQuizzes = await prisma.quizAttempt.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            quiz: true
        },
        orderBy: { attemptedAt: 'desc' }
    })
    return <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-semibold mb-6">Your Attempted Quizzes</h1>

    {attemptedQuizzes.length === 0 ? (
      <p className="text-gray-400">You haven't attempted any quizzes yet.</p>
    ) : (
      <div className="space-y-4">
        {attemptedQuizzes.map((quiz) => (
          <Link
            key={quiz.quiz.id}
            href={`/quiz/${quiz.quiz.id}/attempts/${quiz.id}`} 
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition hover:text-purple-700"
          >
            <h2 className="text-lg font-medium">{quiz.quiz.name}</h2>
            {quiz.quiz.description && (
              <p className="text-sm text-gray-600 mt-1">
                {quiz.quiz.description}
              </p>
            )}
            <div className="text-right">
                  <p className="text-purple-300 font-bold">Score: {quiz.score}</p>
                  <p className="text-gray-400 text-sm">{format(new Date(quiz.attemptedAt), 'PPpp')}</p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
}