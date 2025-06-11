"use client"

import { Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { InputBar } from "./InputBar";
import { QuestionAnswerSchema } from "@/types/quiz";
import { Option } from "./Option";

interface QuestionProps {
    question: QuestionAnswerSchema;
    questionIndex: number;
    onUpdate: (questionIndex: number, value: string) => void;
    onDelete: (questionIndex: number) => void;
    onAddOption: (questionIndex: number) => void;
    onUpdateOption: (questionIndex: number, optionIndex: number, value: string) => void;
    onDeleteOption: (questionIndex: number, optionIndex: number) => void;
    onToggleCorrect: (questionIndex: number, optionIndex: number) => void
}


export const Question = ({ question, questionIndex, onUpdate, onDelete, onAddOption, onUpdateOption, onDeleteOption, onToggleCorrect }: QuestionProps) => {
    return (
      <Card className="mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Question {questionIndex + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(questionIndex)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 ml-auto"
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <InputBar
              placeholder="Enter your question..."
              value={question.question}
              onChange={(e) => onUpdate(questionIndex, e.target.value)}
              className="mb-6 text-md font-medium"
            />
          </div>
        </div>
  
        <div className="space-y-4">
          <h4 className="font-semibold text-white/90 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            Options:
          </h4>
          {question.options.map((option, optionIndex) => (
            <Option
              key={optionIndex}
              option={option}
              questionIndex={questionIndex}
              optionIndex={optionIndex}
              onUpdate={onUpdateOption}
              onDelete={onDeleteOption}
              onToggleCorrect={onToggleCorrect}
              correctOption={question.correctOption}
            />
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddOption(questionIndex)}
            className="mt-6"
          >
            <Plus size={16} />
            Add Option
          </Button>
        </div>
      </Card>
    );
  };