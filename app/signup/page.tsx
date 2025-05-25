"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";


export default function Signup () {
    return <div className="flex flex-col gap-5 items-center">
        <Header title="Signup" />
        <Button onClick={(e) => console.log("hi")} title="Submit" bgColor="blue"/>
    </div>
}