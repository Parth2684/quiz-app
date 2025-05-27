import prisma from "@/lib/singleton";
import { InitSignupSchema } from "@/types/signup/init";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Resend } from "resend";


export async function POST (req: NextRequest) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const secret = process.env.NEXT_AUTH_SECRET as string
        const body = await req.json()
        const response = InitSignupSchema.safeParse(body)

        if(!response.success) {
            return NextResponse.json({
                msg: "Please Provide Appropriate Details"
            }, { status: 400 })
        }

        const { name, email } = response.data

        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                provider: "Credentials",
                verified: false,
            }
        })

        const userId = user.id
        
        const token = jwt.sign({
            userId
        }, secret)

        await resend.emails.send({
            from: "Quizzo <onboarding@resend.dev>",
            to: email,
            subject: "Verify your email",
            html: `<p>Hi ${name}, click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/set-password?token=${token}">here</a> to verify your email and set the password </p>`
        })
        
        return NextResponse.json({
            msg: "Email sent successfully"
        }, { status: 200 })
    } catch (error) {
        console.error("Error in sending email in init signup", error)
        return NextResponse.json({
            msg: "Error in sending verification email"
        }, { status: 500 })
    }
}