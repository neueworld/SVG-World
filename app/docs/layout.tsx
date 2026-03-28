import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/docs', label: 'Overview' },
  { href: '/docs/wrld-01', label: 'WRLD-01 Model' },
  { href: '/docs/api-keys', label: 'API Keys' },
  { href: '/docs/contributing', label: 'Contributing' },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Documentation</p>
            <ul className="space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Links</p>
              <ul className="space-y-0.5">
                <li>
                  <a href="https://github.com/neueworld/SVG-World" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <Link href="/editor" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Open Editor
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-violet-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none">
              {children}
            </article>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
