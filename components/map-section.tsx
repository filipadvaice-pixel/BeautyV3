'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Clock } from 'lucide-react'

export default function MapSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contacts" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как нас <span className="gradient-text">найти</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Адрес</h3>
                  <p className="text-white/70">г. Щёлково, Московская область</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <a href="tel:+79104957737" className="text-purple-300 hover:text-purple-200 transition">+7 910 495-77-37</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-white/70">Круглосуточно, 7 дней в неделю</p>
                </div>
              </div>
            </div>

            <a 
              href="https://t.me/BeautyLazer_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
            >
              Записаться сейчас
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-2 overflow-hidden"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?display-text=beautylazery&ll=37.974659%2C55.936820&mode=search&oid=32426065758&ol=biz&z=16.94"
              style={{ width: '100%', height: '400px', border: 'none', borderRadius: '14px' }}
              allowFullScreen
              title="BeautyLazer на карте"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
