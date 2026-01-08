import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'BeautyLazer — Салон красоты в Щёлково',
  description: 'Лазерная эпиляция, косметология, шугаринг. Запишитесь онлайн!',
  icons: {
  icon: '/favicon.ico',
  shortcut: '/favicon.ico',
},
  openGraph: {
    title: 'BeautyLazer — Салон красоты в Щёлково',
    description: 'Лазерная эпиляция, косметология, шугаринг',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
