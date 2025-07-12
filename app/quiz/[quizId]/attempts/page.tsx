import Header from "@/components/Header";
import { Card } from "@/components/Card";
import { format } from "date-fns";
import Link from "next/link";
import prisma from "@/lib/singleton";
import { auth } from "@/actions/authAction";
import { NotVerified } from "@/components/NotVerified";

interface AttemptTypes {
  user: {
    jwt: string | null;
    name: string;
    id: string;
    email: string;
    password: string | null;
    provider: string;
    verified: boolean;
    jwtExpiry: Date | null;
    image: string | null;
  };
  quiz: {
    name: string;
    id: string;
    description: string | null;
    createdById: string;
    createdAt: Date;
  };
  id: string;
  userId: string;
  quizId: string;
  score: number;
  attemptedAt: Date;
}

export default async function QuizAttemptsPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params
  const session = await auth()
  const attempts: AttemptTypes[] = await prisma.quizAttempt.findMany({
    where: { quizId },
    include: {
      user: true,
      quiz: true
    },
    orderBy: {
      attemptedAt: 'desc'
    }
  })

  if (!attempts || attempts.length === 0 || !attempts[0].quiz || attempts[0].quiz.createdById !== session?.user.id) {
    return (
      <div className="flex justify-center">
        <div className="mt-10">
        <NotVerified />
        </div>
        
      </div>
    );
  }
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Header title="Quiz Attempts" subtitle="See who has taken your quiz" />
      <div className="space-y-4">
        {attempts.map(attempt => (
          <Link href={`/quiz/${quizId}/attempts/${attempt.id}`} key={attempt.id}>
            <Card className="hover:bg-white/20 cursor-pointer transition mb-1.5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-white font-semibold">{attempt.user.name}</p>
                  <p className="text-sm text-gray-400">{attempt.user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-300 font-bold">Score: {attempt.score}</p>
                  <p className="text-gray-400 text-sm">{format(new Date(attempt.attemptedAt), 'PPpp')}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
