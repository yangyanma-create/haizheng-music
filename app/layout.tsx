import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: '非我勇敢 — 裘海正',
  description: '裘海正 2016 年專輯《非我勇敢》',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={playfair.variable}>
      <body className="text-white min-h-screen" style={{ background: '#0a0614' }}>
        {children}
      </body>
    </html>
  )
}
