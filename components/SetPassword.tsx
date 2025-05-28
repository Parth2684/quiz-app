"use client"
import { MouseEvent, useState } from "react";
import { InputBar } from "./InputBar";
import Button from "./Button";
import toast from "react-hot-toast";


export default function () {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error("Password Dont Match")
        }
    }
    return <div className="pb-36 pt-10 flex flex-col">
        <div className="self-center border border-white p-5 rounded-xl shadow-md">
        <InputBar title="Password" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value) } /> 
        <InputBar title="Confirm Password" placeholder="Enter Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <div className="flex justify-center mt-5">
        <Button onClick={(e) => {handleOnClick}} title="Submit"/>
    </div>
    </div>
    </div>
}