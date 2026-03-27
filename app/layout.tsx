import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SVG World — AI-Powered SVG Generator',
  description: 'Generate and edit scalable vector graphics with AI. Open source alternative to QuiverAI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-950 text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
