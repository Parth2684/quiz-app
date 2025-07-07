import { SigninComponent } from "@/components/SigninComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | Quizzo",
    description: "Log in to your Quizzo account and start solving or creating quizzes in seconds.",
  };
  
export default function Signin () {
    
    return <div>
            <SigninComponent />
    </div>
} 