"use client"
import { Check, X } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { QuizSchema } from "@/types/quiz";


interface PreviewModeProps {
    quiz: QuizSchema;
    onExit: () => void;
}

export const PreviewMode = ({ quiz, onExit }: PreviewModeProps) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Quiz Preview</h1>
            <Button variant="outline" onClick={onExit}>
              <X size={20} />
              Exit Preview
            </Button>
          </div>
          
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{quiz.name || 'Untitled Quiz'}</h2>
            {quiz.description && <p className="text-gray-300 mb-6">{quiz.description}</p>}
          </Card>
  
          {quiz.questionAnswer.map((question, index) => (
            <Card key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-6">
                {index + 1}. {question.question || 'Question text'}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    option === question.correctOption 
                      ? 'border-green-400/50 bg-green-500/10 shadow-lg shadow-green-500/20' 
                      : 'border-white/20 bg-white/5'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-sm text-white/80 font-semibold">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="text-white">{option || 'Option text'}</span>
                      {option === question.correctOption && (
                        <span className="ml-auto text-green-400 text-sm font-semibold flex items-center gap-1">
                          <Check size={14} />
                          Correct
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };