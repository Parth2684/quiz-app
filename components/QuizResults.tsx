import { Button } from "./Button";
import { Card } from "./Card";
import Header from "./Header";


interface QuizResultsProps {
  quiz: any;
  results: any;
  answers: Record<string, string>;
  timeElapsed: number;
}

export function QuizResults({ quiz, results, answers, timeElapsed }: QuizResultsProps) {
  const { score, quizAttempt } = results;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent! 🎉';
    if (score >= 80) return 'Great job! 👏';
    if (score >= 70) return 'Good work! 👍';
    if (score >= 60) return 'Not bad! 😊';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="space-y-8">
      <Header 
        title="Quiz Complete!"
        subtitle={quiz.name}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Your Score</h3>
            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-xl text-gray-300">{getScoreMessage(score)}</p>
            <div className="text-sm text-gray-400">
              {quizAttempt.answers.filter((a: any) => 
                quiz.questions.find((q: any) => q.id === a.questionId)?.options.find((o: any) => o.id === a.optionId)?.isCorrect
              ).length} out of {quiz.questions.length} correct
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quiz Stats</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span>{quiz.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Correct:</span>
                <span className="text-green-400">
                  {quizAttempt.answers.filter((a: any) => 
                    quiz.questions.find((q: any) => q.id === a.questionId)?.options.find((o: any) => o.id === a.optionId)?.isCorrect
                  ).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Incorrect:</span>
                <span className="text-red-400">
                  {quiz.questions.length - quizAttempt.answers.filter((a: any) => 
                    quiz.questions.find((q: any) => q.id === a.questionId)?.options.find((o: any) => o.id === a.optionId)?.isCorrect
                  ).length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-bold text-white mb-6">Review Your Answers</h3>
        <div className="space-y-6">
          {quiz.questions.map((question: any, index: number) => {
            const userAnswer = quizAttempt.answers.find((a: any) => a.questionId === question.id);
            const correctOption = question.options.find((o: any) => o.isCorrect);
            const userOption = question.options.find((o: any) => o.id === userAnswer?.optionId);
            const isCorrect = userOption?.isCorrect;

            return (
              <div key={question.id} className="border-b border-white/10 pb-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-2">{question.question}</h4>
                    <div className="space-y-1 text-sm">
                      <div className={`${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {userOption?.option || 'No answer'}
                      </div>
                      {!isCorrect && (
                        <div className="text-green-400">
                          Correct answer: {correctOption?.option}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button onClick={() => window.location.href = '/quizzes'}>
          Back to Quizzes
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}