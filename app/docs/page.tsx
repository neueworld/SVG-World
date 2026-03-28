import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docs — SVG World',
  description: 'SVG World documentation: WRLD-01 model, API keys, and how to contribute.',
}

const CARDS = [
  {
    href: '/docs/wrld-01',
    title: 'WRLD-01 Model',
    desc: 'How our AI model generates SVGs, its capabilities, limitations, and prompting guide.',
    icon: '⬡',
  },
  {
    href: '/docs/api-keys',
    title: 'API Keys',
    desc: 'Use the WRLD-01 API to generate SVGs programmatically from your own applications.',
    icon: '🔑',
  },
  {
    href: '/docs/contributing',
    title: 'Contributing',
    desc: 'How to set up the project locally, submit PRs, and help improve SVG World.',
    icon: '🤝',
  },
]

export default function DocsPage() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Documentation</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SVG World Docs</h1>
        <p className="text-lg text-gray-500 not-prose leading-relaxed">
          Everything you need to build with, contribute to, and understand SVG World and WRLD-01.
        </p>
      </div>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 ring-1 ring-gray-200 transition-colors"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">{card.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
          </Link>
        ))}
      </div>

      <h2>Quick start</h2>
      <p>
        The fastest way to get started is to use the{' '}
        <Link href="/editor">hosted editor</Link> — no setup required. Type a prompt, hit Generate, and
        WRLD-01 streams your SVG in real time.
      </p>
      <p>
        To self-host or contribute, clone the repo and follow the{' '}
        <Link href="/docs/contributing">Contributing guide</Link>.
      </p>

      <h2>Architecture</h2>
      <p>SVG World is a Next.js 15 app with three main layers:</p>
      <ul>
        <li><strong>Frontend</strong> — React editor with live SSE streaming, layer panel, and export tools.</li>
        <li><strong>API routes</strong> — <code>/api/svg/generate</code> streams SVG from WRLD-01; <code>/api/svg/vectorize</code> converts images via potrace + sharp.</li>
        <li><strong>Model layer</strong> — <code>lib/claude-svg.ts</code> wraps the WRLD-01 inference with our design-focused system prompt.</li>
      </ul>

      <h2>Environment variables</h2>
      <p>Copy <code>.env.local.example</code> to <code>.env.local</code> and fill in:</p>
      <pre><code>{`ANTHROPIC_API_KEY=your_key_here`}</code></pre>
      <p>
        Get a key at{' '}
        <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">
          console.anthropic.com
        </a>
        .
      </p>
    </div>
  )
}
