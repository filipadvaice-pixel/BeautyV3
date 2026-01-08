'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Sparkles, Zap, Heart, Scissors, Syringe, Sun } from 'lucide-react'

const categories = [
  {
    icon: Zap,
    title: 'Лазерная эпиляция',
    items: [
      { name: 'Подмышки', price: '1 000 ₽' },
      { name: 'Глубокое бикини', price: '2 000 ₽' },
      { name: 'Глубокое бикини + подмышки', price: '4 000 ₽' },
      { name: 'Голени + глубокое бикини', price: '6 000 ₽' },
      { name: 'Ноги полностью + бикини + подмышки', price: '9 700 ₽' },
      { name: 'Всё тело и лицо', price: '14 990 ₽' },
    ]
  },
  {
    icon: Sparkles,
    title: 'Косметология',
    items: [
      { name: 'Чистка лица комбинированная', price: '4 000 ₽' },
      { name: 'Чистка лица + миндальный пилинг', price: '6 000 ₽' },
      { name: 'Чистка лица PRX-133', price: '6 000 ₽' },
      { name: 'Чистка лица + BioReePeel', price: '7 000 ₽' },
      { name: 'Уход вокруг глаз', price: '4 000 ₽' },
    ]
  },
  {
    icon: Syringe,
    title: 'Инъекции',
    items: [
      { name: 'Биоревитализация HYALUAL', price: '8 000 ₽' },
      { name: 'MESO EYE', price: '12 000 ₽' },
      { name: 'PROFHILO', price: '14 000 ₽' },
      { name: 'REVI STRONG', price: '14 000 ₽' },
      { name: 'Ботулинотерапия', price: 'от 300 ₽' },
    ]
  },
  {
    icon: Sun,
    title: 'Пилинги',
    items: [
      { name: 'Миндальный пилинг', price: '2 500 ₽' },
      { name: 'Джесснера пилинг', price: '4 000 ₽' },
      { name: 'Жёлтый TIME CODE', price: '4 000 ₽' },
      { name: 'PRX-133 пилинг', price: '5 000 ₽' },
      { name: 'BioReePeel пилинг', price: '5 000 ₽' },
    ]
  },
  {
    icon: Heart,
    title: 'Массаж и контур',
    items: [
      { name: 'RSL скульптурирование', price: '3 000 ₽' },
      { name: 'Грудь/декольте', price: '800 ₽' },
      { name: 'Поясница', price: '800 ₽' },
      { name: 'Ягодицы', price: '600 ₽' },
      { name: 'Липолитики по лицу', price: '4 500 ₽' },
    ]
  },
  {
    icon: Scissors,
    title: 'Шугаринг',
    items: [
      { name: 'Белая линия живота', price: '300 ₽' },
      { name: 'Бакенбарды', price: '500 ₽' },
      { name: 'Подбородок', price: '500 ₽' },
      { name: 'Бикини классика', price: '1 000 ₽' },
      { name: 'Лицо полностью', price: '1 500 ₽' },
    ]
  },
]

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Наши <span className="gradient-text">услуги</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Профессиональный уход за вашей красотой с использованием современного оборудования
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-6 hover:bg-white/12 transition-all hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-lg">{cat.title}</h3>
                </div>

                <ul className="space-y-2">
                  {cat.items.map(item => (
                    <li key={item.name} className="flex justify-between text-sm">
                      <span className="text-white/80">{item.name}</span>
                      <span className="font-semibold text-purple-300">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openCalculator'))}
            className="bg-gradient-to-r from-purple-600 to-purple-400 px-8 py-4 rounded-full font-semibold hover:scale-105