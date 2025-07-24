import Header from "@/components/Header";
import { Card } from "@/components/Card";
import prisma from "@/lib/singleton";
import { auth } from "@/actions/authAction";
import PrintButton from "@/components/PrintButton";

export default async function AttemptDetailsPage({
  params
}: { params: Promise<{ quizId: string, attemptId: string }> }) {
  const { quizId, attemptId } = await params
  const session = await auth()
  const attempt = await prisma.quizAttempt.findFirst({
    where: { id: attemptId },
    include: {
        user: true,
        answers: {
            include: {
                question: {
                    include: {
                        options: true
                    }
                }
            }
        },
        quiz: true
    }
  })

  
  if(attempt && (attempt.quiz.createdById == session?.user.id || attempt.userId == session?.user.id)){ return (
    <div className="p-6 max-w-4xl mx-auto print:text-xs print:mt-0 print:mb-2 print:pt-0 leading-snug">
      <div className="mb-4 text-center">
      <h2 className="text-lg font-bold text-white print:text-black print:text-base">
        {attempt.user.name}'s Attempt on {attempt.quiz.name}
      </h2>
      <p className="text-sm text-gray-400 print:text-black print:text-xs">
        {new Date(attempt.attemptedAt).toLocaleString()}
      </p>
    </div>

       <div className="flex justify-center pb-2">
        <PrintButton />
      </div>
      <div className="space-y-6">
        {attempt.answers.map((ans, index) => (
          <Card key={ans.id}>
            <div className="text-white space-y-1 print:text-black print:font-bold">
              <p className="font-light ">Q{index + 1}: {ans.question.question}</p>
              <div className="flex flex-col gap-1">
                {ans.question.options.map((opt) => {
                  const isSelected = opt.id === ans.optionId;
                  const isCorrect = opt.isCorrect;

                  return (
                    <div
                      key={opt.id}
                      className={`px-2 py-1 rounded-md border 
                        ${isCorrect ? 'border-green-500 text-green-400' : 'border-white/20 text-white font-light'}
                        ${isSelected ? 'bg-purple-600/20' : 'bg-white/5'}`}
                    >
                      {opt.option}
                      {isSelected && <span className="ml-2 text-purple-400">(Selected)</span>}
                      {isCorrect && <span className="ml-2 text-green-400">(Correct)</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
  else{
    return <p className="text-white">Attempt not found</p>;
  }
}
