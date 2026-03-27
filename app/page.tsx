import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          SVG World
        </h1>
        <p className="text-xl text-gray-400 mb-4">
          AI-powered SVG generation. Describe what you want, get production-ready scalable vector graphics instantly.
        </p>
        <p className="text-sm text-gray-600 mb-10">
          Open source · Powered by Claude · Free to use
        </p>
        <Link
          href="/editor"
          className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          Start Generating
        </Link>
      </div>
    </main>
  )
}
