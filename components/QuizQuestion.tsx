'use client';

interface Question {
  id: string;
  question: string;
}

interface QuizQuestionProps {
  question: Question;
  options: {
    id: string;
    option: string;
    isCorrect: boolean;
    questionId: string;
}[];
  selectedOptionId?: string;
  onAnswerSelect: (questionId: string, optionId: string) => void;
  questionNumber: number;
}

export function QuizQuestion({ 
  question,
  options,
  selectedOptionId, 
  onAnswerSelect, 
  questionNumber 
}: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {questionNumber}. {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelect(question.id, option.id)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
              selectedOptionId === option.id
                ? 'border-purple-500 bg-purple-500/20 text-white'
                : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-400 hover:bg-purple-400/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedOptionId === option.id
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-400'
              }`}>
                <span className="text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
              <span className="text-base">{option.option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}