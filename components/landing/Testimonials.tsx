"use client"
import { motion } from "framer-motion";
import { Star } from "lucide-react";


export const TestimonialsSection = () => {
    const testimonials = [
      { name: "Sarah Chen", role: "Teacher", text: "Quizzo transformed my classroom engagement!", rating: 5 },
      { name: "Mike Rodriguez", role: "Team Lead", text: "Perfect for team building activities.", rating: 5 },
      { name: "Emily Watson", role: "Content Creator", text: "My audience loves the interactive quizzes!", rating: 5 }
    ];
  
    return (
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl py-1 sm:py-2 lg:text-5xl font-bold text-center mb-12 sm:mb-16 bg-linear-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Loved by Creators
          </motion.h2>
  
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic text-sm sm:text-base">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-purple-400 text-xs sm:text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };