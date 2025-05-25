"use client"
import { MouseEvent } from "react"

interface ButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
    title: string
    bgColor: 'blue' | 'green' | 'red' 
}

export default function Button ({ title, onClick, bgColor }: ButtonProps) {
    bgColor ? bgColor = bgColor : bgColor = 'blue'
    const bgColorMap = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        red: 'bg-red-600 hover:bg-red-700'
    }
    return <button onClick={onClick} className={`${bgColorMap[bgColor]} px-4 rounded-md py-1 text-white text-lg max-w-fit`}> 
        { title }
    </button>
}