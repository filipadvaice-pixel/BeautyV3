'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calculator } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://cdn.abacus.ai/videos/4df5ca8e-2dac-4eb1-a9b2-1bd40867defa.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0021]/80 via-[#0b0021]/60 to-[#0b0021]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">BeautyLazer</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
        >
          Салон красоты в Щёлково. Лазерная эпиляция, косметология, шугаринг. Работаем круглосуточно.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="https://t.me/BeautyLazer_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
          >
            Записаться сейчас <ArrowRight size={20} />
          </a>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openCalculator'))}
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition"
          >
            <Calculator size={20} /> Калькулятор услуг
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
