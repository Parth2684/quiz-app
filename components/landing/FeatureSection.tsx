"use client"
import { Share2, Trophy, Users, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    
    const features = [
      {
        icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Lightning Fast Creation",
        description: "Build engaging quizzes in minutes with our intuitive drag-and-drop interface"
      },
      {
        icon: <Share2 className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Instant Sharing",
        description: "Generate shareable links instantly and watch responses pour in real-time"
      },
      {
        icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Collaborative Fun",
        description: "Invite friends, colleagues, or students to participate in your custom quizzes"
      },
      {
        icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Gamified Experience",
        description: "Built-in leaderboards and scoring systems make every quiz competitive"
      }
    ];
  
    return (
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl py-1 sm:py-2 sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Quizzo?
          </motion.h2>
  
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setActiveFeature(i)}
              >
                <motion.div
                  className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };