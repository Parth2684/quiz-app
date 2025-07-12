import { auth } from "@/actions/authAction";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const quizPrompt = (topic: string, count: number) => {
    return `
  Generate a quiz with the following structure ONLY. Do NOT add any explanation or markdown. Return raw JSON only in this format:
  
  {
    "quiz": {
      "questionAnswer": [
        {
          "question": "Question goes here",
          "options": ["Option 1", "Option 2", "Option 3"],
          "correctOption": "Option 2"
        }
        // ${count} questions total
      ]
    }
  }
  
  Topic: ${topic}
  Questions: ${count}
  Options should range from 2 to 6 per question.
  Only ONE correct option per question. Keep formatting exact.`;
  };


const generateQuizSchema = z.object({
    topic: z.string(),
    count: z.number()
})
export const POST = async (req: NextRequest) => {
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