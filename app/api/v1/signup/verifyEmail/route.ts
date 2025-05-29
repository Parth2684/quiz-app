import prisma from "@/lib/singleton";
import { NextRequest, NextResponse } from "next/server"


export async function PUT (req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token')
        if(!token) {
            return NextResponse.json({
                valid: false
            }, { status:  411})
        }


        await prisma.user.update({
            where: { jwt: token },
            data: { verified: true },
          });

        return NextResponse.json({ valid: true });
    } catch (error) {
        console.error(error)
        NextResponse.json({msg: "Server Error", valid: false}, { status: 500 })
    }
}