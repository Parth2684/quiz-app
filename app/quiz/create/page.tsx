import { auth } from "@/actions/authAction";
import { CreateQuiz } from "@/components/CreateQuiz";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Create a Quiz | Quizzo",
    description: "Design custom quizzes with dynamic questions and options using our full-stack quiz builder.",
  };
  

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