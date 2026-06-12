import type { Metadata } from 'next'
import { Playfair_Display, Noto_Serif_TC } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const zcool = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-zcool',
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
    <html lang="zh-TW" className={`${playfair.variable} ${zcool.variable}`}>
      <body style={{ background: '#f0ebe3', color: '#1a1a1a', minHeight: '100vh', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
