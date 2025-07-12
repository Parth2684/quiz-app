import { auth } from "@/actions/authAction";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const quizPrompt = (topic: string, count: Number) => {
    const prompt = `Give me a quiz in the following syntax:
    questionAnswer: {
        question: string;
        options: string[];
        correctOption: string;
    }[]
        with dynamic number of options, options can range from 2-6
        I wan total ${count} questions
        on topic ${topic}
      `
      return prompt;
}


const generateQuizSchema = z.object({
    topic: z.string(),
    count: z.number()
})
export default async function POST (req: NextRequest) {
    try {
        const [session, body ] = await Promise.all([
            auth(),
            req.json()
        ]) 
    
        if(!session?.user.id) {
            return NextResponse.json({
                msg: "You are not authenticated"
            },
        {
            status: 401
        })
        }
        const parsedBody = generateQuizSchema.safeParse(body)
    
        if(!parsedBody.success) {
            return NextResponse.json({msg: "Please send correct body"}, { status: 400 })
        }
        
        const aiGenQuiz = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",{
            contents: [
                {
                    parts: [
                        {
                            text: quizPrompt(parsedBody.data.topic, parsedBody.data.count) 
                        }
                    ]
                }
            ]
        },
        {
            headers: {
              "Content-Type": "application/json",
              "X-goog-api-key": process.env.GEMINI_API_KEY
            }
          }
        )
    
        const generatedQuiz = aiGenQuiz.data
        return NextResponse.json({
            generatedQuiz,
            msg: "Generation Success"
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            msg: "Server Error"
        }, {
            status: 500
        })
    }
}