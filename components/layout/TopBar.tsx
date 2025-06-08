"use client"
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";



export default function TopBar ({isSignnedIn}: {isSignnedIn: boolean}) {
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
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <motion.div
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                ><a href={isSignnedIn ? "/home" : "/"}>
                    Quizzo
                    </a>
                </motion.div>

                
                <div className="flex items-center space-x-4">
                    {isSignnedIn ? <motion.a
                        className="hidden sm:block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => signOut({callbackUrl: "/"})}
                    >
                        Logout
                    </motion.a> : <>
                    <motion.a
                        className="hidden sm:block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/signup"
                    >
                        Sign Up
                    </motion.a>
                    <motion.a
                        className="hidden sm:block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/signin"
                    >
                        Sign In
                    </motion.a>
                    <motion.button
                        className="sm:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        { isMenuOpen ? <X size={24} /> : <Menu size={24} /> }
                    </motion.button>
                    </>}
                    
                    
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden bg-black/40 backdrop-blur-lg border-b border-white/10 mt-4 rounded-2xl mx-4"
                >
                    <div className="px-6 py-4 space-y-4">
                   
                        <motion.a
                        href='/signin'
                        className="block py-2 hover:text-purple-300 transition-colors text-center"
                        onClick={() => setIsMenuOpen(false)}
                        whileHover={{ x: 10 }}
                        >
                            Sign In
                        </motion.a>
                        <motion.button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 mt-4"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign Up 
                        </motion.button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </motion.header>

}