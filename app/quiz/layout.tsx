import { auth } from "@/actions/authAction";
import { redirect } from "next/navigation";




export default async function QuizLayout ({ children }: Readonly<{children: React.ReactNode}>) {
    const session = await auth()
    if(!session || (session == undefined || null)) {
        redirect("/signup")
    }else {
        return <>
        {children}
        </>
    }
} 