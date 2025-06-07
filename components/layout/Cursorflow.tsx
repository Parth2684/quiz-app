"use client"

import { MouseEvent, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Cursorflow () {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove as EventListener)
        return () => window.removeEventListener('mousemove', handleMouseMove as EventListener)
    },[])

    return <motion.div 
            className="fixed w-2 h-2 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden sm:block"
            animate={{
                x: mousePosition.x - 10,
                y: mousePosition.y - 10
            }}
            transition={{ type: "spring", damping: 5, stiffness: 500 }}
        />
}