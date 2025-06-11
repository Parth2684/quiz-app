"use client"
import { Check, Trash2 } from "lucide-react";
import { InputBar } from "./InputBar";
import { Button } from "./Button";

interface OptionTypes {
    option: string;
    questionIndex: number;
    optionIndex: number;
    onUpdate: (questionIndex: number, optionIndex: number, value: string) => void;
    onDelete: (questionIndex: number, optionIndex: number) => void;
    onToggleCorrect: (questionIndex: number, optionIndex: number) => void;
    correctOption: string
}

export const Option = ({ option, questionIndex, optionIndex, onUpdate, onDelete, onToggleCorrect, correctOption }: OptionTypes) => {
    const isCorrect = option === correctOption;
    
    return (
      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
        <button
          onClick={() => onToggleCorrect(questionIndex, optionIndex)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isCorrect 
              ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30' 
              : 'border-white/30 hover:border-green-400 text-white/70 hover:text-green-400'
          }`}
        >
          {isCorrect && <Check size={14} />}
        </button>
        
        <InputBar
          placeholder="Enter option text..."
          value={option}
          onChange={(e) => onUpdate(questionIndex, optionIndex, e.target.value)}
          className="flex-1 w-full"
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(questionIndex, optionIndex)}
          className="flex-shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    );
  };

