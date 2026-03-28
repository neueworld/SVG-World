import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SVG World — AI-Powered SVG Generator',
  description: 'Generate production-ready scalable vector graphics with AI. Powered by WRLD-01.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
