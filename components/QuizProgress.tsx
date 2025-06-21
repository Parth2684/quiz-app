interface QuizProgressProps {
    currentQuestion: number;
    totalQuestions: number;
    answered: number;
  }
  
  export function QuizProgress({ currentQuestion, totalQuestions, answered }: QuizProgressProps) {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span>Progress: {currentQuestion}/{totalQuestions}</span>
          <span>Answered: {answered}/{totalQuestions}</span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }