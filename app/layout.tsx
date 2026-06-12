import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="zh-TW">
      <body className="text-white min-h-screen" style={{ background: '#0a0614' }}>
        {children}
      </body>
    </html>
  )
}
