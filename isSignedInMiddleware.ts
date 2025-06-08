import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export const isSignedInMiddleware = async(request: NextRequest) => {
    await getToken({ req: request })
    return NextResponse.next()
}