import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/authOptions/authOptions";


export const GET = (req: NextRequest) => {
  return NextAuth(authOptions)(req);
};

// Export POST handler
export const POST = (req: NextRequest) => {
  return NextAuth(authOptions)(req);
};