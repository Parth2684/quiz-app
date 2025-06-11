"use client"
import { motion } from "framer-motion"

export default function Background () {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
            className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
                x:[0, 100, 0],
                y:[0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{ left: '10%', top: '20%' }}
        />
        <motion.div 
            className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
                x:[0, -80, 0],
                y:[0, 100, 0]
            }}
            transition={{ duration: 25, repeat: Infinity}}
            style={{ right: '10%', bottom: '20%' }}
        />
    </div>
}