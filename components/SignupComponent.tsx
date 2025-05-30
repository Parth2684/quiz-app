"use client"

import { MouseEvent, useEffect, useState } from "react"
import { InputBar } from "./InputBar"
import Header from "./Header"
import Button from "./Button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ResponseSchema } from "@/types/auth/user"
import { getProviders, signIn } from "next-auth/react"


export default function SignupComponent () {
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [providers, setProviders] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const res = await getProviders()
            setProviders(res)
        })()
    },[])

    async function handleOnClick(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            const response: ResponseSchema = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup/init`, {
                name,
                email
            })
            if(response.status == 200){
                toast.success("Verification Email Sent To Your Mail Id")
                return
            }
            toast.error(response.data.msg)
        } catch (error) {
            console.error(error)
            toast.error("Error Sending Verification Email")
        }
    }
    return <div className="px-28 rounded-xl bg-white/50 backdrop-blur-md shadow-xl p-6 text-black/70"> 
        <div className="pt-10">
        <Header title="Sign Up" />
        </div>
        <div className="flex flex-col justify-center pt-10 pb-14">
            <InputBar title="Name" placeholder="Enter Your Name" type="text" onChange={(e) => setName(e.target.value)} titleClassname="text-xl" />
            <InputBar title="Email" placeholder="Enter Your Email" type="email" onChange={(e) => setEmail(e.target.value)} titleClassname="text-xl" />
            <div className="flex justify-center mt-5">
                <Button title="Sign Up" onClick={handleOnClick} bgColor="blue" />
            </div>
            <p className="text-center">----------OR----------</p>
            {providers?.google && (
                <div className="mt-2 w-full max-w-sm flex justify-center">
                    <Button title="Login With Google" onClick={() => signIn("google", { callbackUrl: "/home" })} />
                </div>
            )}
        </div>
        <a href="/signin"><p className="text-center">Already have an account? Login</p></a>
    </div>
}