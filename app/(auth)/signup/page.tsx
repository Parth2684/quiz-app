import { SignupComponent } from "@/components/SignupComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | Quizzo",
    description: "Create your free Quizzo account and join a powerful quiz platform with dynamic quizzes and leaderboards.",
  };
  

export default function Signup () {
    return <div>
        <SignupComponent  />
    </div>
}