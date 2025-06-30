"use server"
import { authOptions } from "@/authOptions/authOptions";
import { getServerSession } from "next-auth";


export async function auth () {
    const session = await getServerSession(authOptions);
    if(!session){
        throw new Error("Un-Authorized action")
    }
    return session;
} 