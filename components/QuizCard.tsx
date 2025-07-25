"use client"
import { QuizWithoutQuestionAnswer } from "@/types/quiz";
import { Card } from "./Card";
import { Button } from "./Button";
import { Edit, Play, Share2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuizCardProps {
    quiz: QuizWithoutQuestionAnswer
    onPlay: (quiz: QuizWithoutQuestionAnswer, createdById: string) => void;
    onShare: (quizId: string) => void;
    isOwned?: boolean
    onDelete?: () => void;
    isAttempted: boolean
}

export const QuizCard = ({ quiz, onPlay, onShare, isOwned = false, onDelete, isAttempted }: QuizCardProps) => {
  const router = useRouter()

  return <Card className="p-6">
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{quiz.name}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{quiz.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onPlay(quiz, quiz.createdById as string)}>
            <Play className="w-4 h-4" />
            {(isOwned || isAttempted) ? "Show Stats" : "Play" }
          </Button>
          
          {isOwned && <>
            <Button size="sm" variant="outline" onClick={onDelete} >
              <Trash />
            </Button>
          </>}
          <Button variant="outline" size="sm" onClick={() => onShare(quiz.id as string)}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        {isOwned && (
          <div className="text-purple-400 text-xs font-semibold pl-2">Your Quiz</div>
        )}
      </div>
    </div>
  </Card>
};