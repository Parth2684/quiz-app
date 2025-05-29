import prisma from "@/lib/singleton";
import { InitSignupSchema } from "@/types/auth/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyEmail } from "@/lib/email";


export async function POST (req: NextRequest) {
    try {
        const secret = process.env.NEXT_AUTH_SECRET as string
        const body = await req.json()
        const response = InitSignupSchema.safeParse(body)

        if(!response.success) {
            return NextResponse.json({
                msg: "Please Provide Appropriate Details"
            }, { status: 400 })
        }

        const { name, email } = response.data

        const existingUser = await prisma.user.findUnique({ where: { email } })

        if(!existingUser) {
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
            }, secret, { expiresIn:"1h" })

            const jwtExpiry = new Date(Date.now() + 60 * 60 * 1000)

            await Promise.all([
                prisma.user.update({
                    where: { id: userId },
                    data: { jwt: token, jwtExpiry }
                }),
                verifyEmail(email, token, name)
            ])
            
            return NextResponse.json({
                msg: "Email sent successfully"
            }, { status: 200 })
        }

        if(existingUser.verified === true) {
            return NextResponse.json({ msg: "User Already Exists and Email is also verified" }, { status: 409 })
        }

        const userId = existingUser.id
        const token = jwt.sign({
            userId
        }, secret, { expiresIn: "1hr" })

        const jwtExpiry = new Date(Date.now() + 60 * 60 * 1000)

        await Promise.all([
            prisma.user.update({
                where: { id: userId },
                data: { jwt: token, jwtExpiry }
            }),
            verifyEmail(email, token, name)
        ])

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