import { z } from "zod";


export const quizSchema = z.object({
    name: z.string().min(1, "Name of the quiz cannot be empty"),
    description: z.array(
        z.object({
            question: z.string().min(2, "Question Should be atleast 2 characters long"),
            options: z.array(z.string().min(1, "Option cannot be empty")),
            correctOption: z.string()
        })
    )
}) 


export type QuizSchema = z.infer<typeof quizSchema>