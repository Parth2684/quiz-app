
import { ChangeEvent } from "react"

interface InputBarProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type: 'text' | 'password' | 'email' | 'number' 
    title?: string
    titleClassname?: string
}


export const InputBar = ({ title, onChange, placeholder, type, titleClassname }: InputBarProps) => {
    return <div className="flex gap-x-2">
        <p className={titleClassname}>{title}: </p> 
        <input onChange={onChange} type={type} placeholder={placeholder} className="w-full h-full rounded-md" />
    </div> 
}