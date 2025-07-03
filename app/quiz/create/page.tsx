export const dynamic = 'force-static'; 
import { auth } from "@/actions/authAction";
import { CreateQuiz } from "@/components/CreateQuiz";
import { redirect } from "next/navigation";

const session = await auth()
if(!session) {
    redirect("/signup")
}

export default function Create () {
    return <CreateQuiz />
}