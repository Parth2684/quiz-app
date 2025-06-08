import { NextRequest, NextResponse } from "next/server";

function pathnameMiddleware (req: NextRequest, res: NextResponse) {
    res.headers.set("x-pathname", req.nextUrl.pathname)
}

export default function middleware (req: NextRequest) {
    const res = NextResponse.next()
   pathnameMiddleware(req, res)
   return res
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"]
}