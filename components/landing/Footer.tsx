"use client"
import { motion } from "framer-motion";


export const Footer = () => {
    return (
      <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="text-xl sm:text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Quizzo
          </motion.div>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Making quiz creation effortless and fun for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    );
  };