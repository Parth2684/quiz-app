import { redirect } from "next/navigation";



export default async function PlayQuiz({ params }: { params: { id: string[] } }) {
    const quizId = params.id[0];

    if(!quizId) {
        redirect("/home");
    }

    try {
        const quiz = await 
    } catch (error) {
        
    }
}