"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";




export default function TopBar () {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.screenY > 50)
        };
        window.addEventListener('scroll', handleScroll)
        return window.removeEventListener('scroll', handleScroll)
    }, [])

    return <motion.header
            className={ `fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6 transition-all duration-300 ${ isScrolled ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' : '' }` }
            initial={{ y: -100 }}
            animate={{ y:0 }}
            transition={{ duration: 0.6 }}
        >
            
        </motion.header>
}