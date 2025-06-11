import { z } from "zod";

export const questionAnswerSchema = z.object({
        question: z.string().min(2, "Question Should be atleast 2 characters long"),
        options: z.array(z.string().min(1, "Option cannot be empty")),
        correctOption: z.string()
    })

export type QuestionAnswerSchema = z.infer<typeof questionAnswerSchema>

export const quizSchema = z.object({
    name: z.string().min(1, "Name of the quiz cannot be empty"),
    description: z.union([
        z.string().min(15, "Description must be at least 15 characters"),
        z.undefined()
      ]),
    questionAnswer: z.array(questionAnswerSchema)
}) 

export type QuizSchema = z.infer<typeof quizSchema>