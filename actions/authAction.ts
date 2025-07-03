"use server"
import { authOptions } from "@/authOptions/authOptions";
import { getServerSession } from "next-auth";


export async function auth () {
    let session;
    try {
        session = await getServerSession(authOptions);        
    } catch (error) {
        throw new Error("Unauthorised action")
    }
    return session;
} 