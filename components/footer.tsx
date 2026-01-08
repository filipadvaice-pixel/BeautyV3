import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span>© 2026 BeautyLazer. Все права защищены.</span>
        </div>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-white transition">Услуги</a>
          <a href="#reviews" className="hover:text-white transition">Отзывы</a>
          <a href="#contacts" className="hover:text-white transition">Контакты</a>
        </div>
      </div>
    </footer>
  )
}
