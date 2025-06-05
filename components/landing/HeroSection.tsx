"use client"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"


export function HeroFunction () {
    const stats = [
        { number: "50k+", label: "Quizzes Created" },
        { number: "2M+", label: "Quiz Attempts" },
        { number: "95%", label: "User Satisfaction" },
        { number: "150+", label: "Countries" }
    ]
    return <section className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-40 pb-16 sm:pb-20 text-center">
        <motion.div
            initial={{ opacity: 0, y:50 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
        >
            <motion.h1 
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                >
                Create{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    Epic
                </span>
                <br />
                Quizzes in{" "}
                <motion.span
                    className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Seconds
                </motion.span>
            </motion.h1>
            <motion.p
            className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            >
            The ultimate quiz creation platform that lets you build, share, and track engaging quizzes with zero hassle. Turn any topic into an interactive experience.
            </motion.p>

            <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            >
            <motion.button
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center gap-3 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                Start Creating Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
                className="w-full sm:w-auto border border-white/30 hover:border-white/60 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Watch Demo
            </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            >
            {stats.map((stat, i) => (
                <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                >
                <motion.div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                >
                    {stat.number}
                </motion.div>
                <div className="text-gray-400 mt-2 text-sm sm:text-base">{stat.label}</div>
                </motion.div>
            ))}
            </motion.div>
        </motion.div>
    </section>
}