"use client"
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";
import { Session } from "next-auth";

export default function TopBar({ isSignnedIn, session }: { isSignnedIn: boolean, session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setLoading } = useLoadingStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-lg border-b border-gray-600 transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-lg border-b border-white/10"
          : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <a href={isSignnedIn ? "/home" : "/"}>Quizzo</a>
        </motion.div>

        <div className="flex items-center space-x-4 print:hidden relative">
          {isSignnedIn ? (
            <div className="relative" ref={dropdownRef}>
              <motion.img
                src={session?.user?.image || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-purple-500 transition-all object-cover"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-44 bg-blue-200/90 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl z-50"
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-purple-700 hover:bg-white/10 transition-colors border-b border-blue-500"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setLoading(true);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <motion.a
                className="hidden sm:block bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
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
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/40 backdrop-blur-lg border-b border-white/10 mt-4 rounded-2xl mx-4"
          >
            <div className="px-6 py-4 space-y-4">
              <motion.a
                href="/signin"
                className="block py-2 hover:text-purple-300 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: 10 }}
              >
                Sign In
              </motion.a>
              <motion.button
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 mt-4"
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
  );
}
