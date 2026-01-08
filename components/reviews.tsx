'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star } from 'lucide-react'

export default function Reviews() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="reviews" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
  Отзывы <span className="text-white">клиентов</span>
</h2>
          <div className="flex items-center justify-center gap-2 text-white/70">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>на Яндекс Картах</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="glass-card p-2 overflow-hidden" style={{ width: '100%', maxWidth: '600px' }}>
            <iframe
              src="https://yandex.ru/maps-reviews-widget/32426065758?comments"
              style={{ width: '100%', height: '600px', border: 'none', borderRadius: '14px' }}
              title="Отзывы на Яндекс Картах"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}