import type { Metadata } from 'next'
import { Playfair_Display, Ma_Shan_Zheng } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const zcool = Ma_Shan_Zheng({
  subsets: ['latin'],
  weight: '400',
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
      <body className="text-white min-h-screen" style={{ background: '#0a0614' }}>
        {children}
      </body>
    </html>
  )
}
