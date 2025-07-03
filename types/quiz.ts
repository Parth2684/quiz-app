import { z } from "zod";

export const questionAnswerSchema = z.object({
        question: z.string().min(2, "Question Should be atleast 2 characters long"),
        options: z.array(z.string().min(1, "Option cannot be empty")),
        correctOption: z.string().nonempty()
    })

export type QuestionAnswerSchema = z.infer<typeof questionAnswerSchema>

export const quizSchema = z.object({
    name: z.string().min(1, "Name of the quiz cannot be empty"),
    description: z.string().optional(),
    questionAnswer: z.array(questionAnswerSchema)
}) 

export type QuizSchema = z.infer<typeof quizSchema> & {id?: string, createdBy?: string}


export interface QuizWithoutQuestionAnswer {
    name: string;
    description?: string | null;
    id?: string;
    createdById?: string;
    createdAt: Date

  quizAttempt: {
    id: string
    userId: string
    quizId: string
    score: number
    attemptedAt: Date
  }[]
}


export interface IQuizPlay {
  id: string; 
  name: string;
  description: string | null;
  questions: Array<{
      id: string;
      question: string;
  }>;
  options: Array<{
      id: string;
      option: string;
      isCorrect: boolean;
      questionId: string
  }>;
  createdAt: Date;
  createdById: string;
  createdBy: {
      id: string;
      name: string;
  };
  
}

// types/analytics.ts
export interface QuizAttemptSummary {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  attemptedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface QuizAnswerDetail {
  id: string;
  questionId: string;
  optionId: string;
  question: {
    id: string;
    question: string;
    options: {
      id: string;
      option: string;
      isCorrect: boolean;
    }[];
  };
  selectedOption: {
    id: string;
    option: string;
    isCorrect: boolean;
  };
}

export interface QuizAttemptDetail {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  attemptedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  answers: QuizAnswerDetail[];
}

export interface QuizAnalytics {
  quiz: {
    id: string;
    name: string;
    description?: string;
    totalQuestions: number;
  };
  attempts: QuizAttemptSummary[];
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalAttempts: number;
}

export interface QuizDetailedResults {
  quiz: {
    id: string;
    name: string;
    description?: string;
    totalQuestions: number;
  };
  attempt: QuizAttemptDetail;
}