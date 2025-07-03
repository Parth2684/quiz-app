import { auth } from "@/actions/authAction";
import { CreateQuiz } from "@/components/CreateQuiz";
import { redirect } from "next/navigation";

export default async function Create () {
    try {
        await auth()
    } catch (error) {
        redirect("/signup")
    }

    return <>
    <CreateQuiz />
 
    </>
}