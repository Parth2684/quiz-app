"use client"
import { MouseEvent, useState } from "react";
import { InputBar } from "./InputBar";
import Button from "./Button";
import toast from "react-hot-toast";
import axios from "axios";
import { ResponseSchema } from "@/types/auth/user";
import { useRouter } from "next/navigation";


export default function ({token}: {token: string}) {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()
    async function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password Dont Match")
        }
        try {
            const response: ResponseSchema = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup/setPassword?token=${token}`, {
                password
            })
            if(response.status !== 200) {
                toast.error(String(response.data.msg))
                return
            }
            toast.success("Set Password Sucessfull")
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`)
        } catch (error) {
            
        }
    }
    return <div className="pb-36 pt-10 flex flex-col">
        <div className="self-center border border-black/50 bg-white/50 p-5 rounded-xl shadow-xl">
            <InputBar title="Password" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <InputBar title="Confirm Password" placeholder="Enter Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
            <div className="flex justify-center mt-5">
                <Button onClick={(e) => { handleOnClick(e) }} title="Submit" />
            </div>
        </div>
    </div>
}