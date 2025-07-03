import { QuizPlay } from "@/components/QuizPlay";
import prisma from "@/lib/singleton";
import { redirect } from "next/navigation";



export default async function PlayQuiz({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const quizId = id;

    if(!quizId) {
        redirect("/home");
    }

    try {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: { questions: true, createdBy: true, options: true }
        })
    if (!quiz) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Quiz Not Found</h1>
              <p className="text-gray-300">The quiz you're looking for doesn't exist.</p>
            </div>
          </div>
        );
      }
  
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <QuizPlay quiz={quiz} />
        </div>
      );
    } catch (error) {
      console.error('Error loading quiz:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-gray-300">Unable to load the quiz. Please try again later.</p>
          </div>
        </div>
      );
    }
  }
  
