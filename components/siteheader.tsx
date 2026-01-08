'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#services', label: 'Услуги' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0b0021]/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="BeautyLazer" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
          <span className="font-bold text-xl">BeautyLazer</span>
        </a>
        <span className="text-xs text-red-400 ml-2">TEST123</span>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a key={link.href} href={link.href} className="hover:text-purple-300 transition-colors">
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openCalculator'))}
            className="bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Калькулятор услуг
          </button>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0b0021]/95 backdrop-blur-lg px-4 py-6"
          >
            {links.map(link => (
              <a key={link.href} href={link.href} className="block py-3 hover:text-purple-300" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('openCalculator')) }}
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-3 rounded-full font-semibold"
            >
              Калькулятор услуг
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}