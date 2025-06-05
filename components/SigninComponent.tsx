"use client"
import { useEffect, useState } from "react";
import { InputBar } from "./InputBar";
import Button from "./Button";
import { getProviders, signIn } from "next-auth/react";


export default function SigninComponent () {
    const [providers, setProviders] = useState<any>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        (async() => {
            const res = await getProviders();
            console.log("res: ", res)
            setProviders(res)
        })()
    }, [])
    return <div>
        <InputBar type="email" title="Email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}/>
        <InputBar type="password" title="Password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)}/>
        <div className="flex justify-center mt-5 mb-2">
            <Button title="Login" onClick={async(e) => await signIn("credentials", { email, password, callbackUrl:"/home" })} />
        </div>
        <p className="text-center">----------OR----------</p>
        {providers?.google && (
            <div className="mt-2 w-full max-w-sm flex justify-center">
                <Button title="Login With Google" onClick={() => signIn("google", { callbackUrl: "/home" })} />
            </div>
        )}
        <a href="/signup"><p className="text-center mt-6 hover:underline">Create an account? Signup</p></a>
    </div>  
}