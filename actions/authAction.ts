"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function auth () {
    const session = await getServerSession(authOptions);
    if(!session){
        throw new Error("Un-Authorized action")
    }
    return session;
} 