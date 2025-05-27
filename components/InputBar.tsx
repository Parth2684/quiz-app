
import { ChangeEvent } from "react"

interface InputBarProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type: 'text' | 'password' | 'email' | 'number' 
    title?: string
    titleClassname?: string
    classname?: string
}


export const InputBar = ({ title, onChange, placeholder, type, titleClassname, classname }: InputBarProps) => {
    return <div className={`flex flex-col`}>
        <label className={titleClassname}>{title}: </label> 
        <input onChange={onChange} type={type} placeholder={placeholder} className={`focus:outline-none focus:border-black pl-1 rounded-md w-96 py-1 border border-gray-300 ${classname}`} />
    </div> 
}