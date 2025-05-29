import Header from "@/components/Header";
import SigninComponent from "@/components/SigninComponent";


export default function Signin () {
    return <div className="flex flex-col justify-center min-h-screen items-center">
        <div className="border border-black/50 px-28 py-16 rounded-xl shadow-xl backdrop-blur-md bg-white/50 text-black/50">
            <Header title="Login" />
            <SigninComponent />
        </div>
    </div>
} 