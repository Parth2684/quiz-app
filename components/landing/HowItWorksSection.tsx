"use client"
import { motion } from "framer-motion";


export const HowItWorksSection = () => {
    const steps = [
      { step: "01", title: "Create", desc: "Design your quiz with our intuitive builder", icon: "✨" },
      { step: "02", title: "Share", desc: "Generate a link and share with anyone", icon: "🚀" },
      { step: "03", title: "Analyze", desc: "Track responses and see detailed analytics", icon: "📊" }
    ];
  
    return (
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl py-1 sm:py-2 sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 bg-linear-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Three Simple Steps
          </motion.h2>
  
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <motion.div
                  className="text-4xl sm:text-6xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-4">{item.step}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base max-w-xs mx-auto">{item.desc}</p>
                
                {i < 2 && (
                  <motion.div
                    className="hidden lg:block absolute top-12 -right-6 w-12 h-0.5 bg-linear-to-r from-purple-400 to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };