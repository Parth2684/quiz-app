"use client"
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";



export const CTASection = () => {
    return (
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          className="max-w-5xl mx-auto text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl py-1 sm:py-2 sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Ready to Create Magic?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Join thousands of creators who are already building amazing quizzes with Quizzo.
            Start your journey today - completely free!
          </p>
          <motion.button
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 mx-auto shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
            <Link href={"/signup"}>
            Get Started Now
            </Link>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </section>
    );
  };