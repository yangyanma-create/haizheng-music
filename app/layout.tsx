import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '海正音樂',
  description: '裘海正官方音樂專頁',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
