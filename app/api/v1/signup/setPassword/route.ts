import prisma from "@/lib/singleton";
import { setPasswordSchema } from "@/types/auth/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST (req: NextRequest) {
    try{
        const body = await req.json()
        const response = setPasswordSchema.safeParse(body)
        
        if(!response.success) {
            return NextResponse.json({msg: response.error}, {status: 411})
        }

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token")
        if(!token) {
            return NextResponse.json({ msg: "Error parsing token" }, { status: 411 })
        }

        const password = response.data.password
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.update({
            where: { jwt: token },
            data: { password: hashedPassword }
        })
        return NextResponse.json({ msg: "Password set succesfully" })
    }catch(error) {
        console.error(error)
        return NextResponse.json({msg: "Server Error"}, { status: 500 })
    }
}