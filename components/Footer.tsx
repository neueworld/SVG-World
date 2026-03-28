import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-gray-900">SVG World</span>
              <span className="text-[10px] font-semibold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full tracking-widest uppercase">Beta</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-powered SVG generation, powered by WRLD-01. Open source and free to use.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/editor" className="hover:text-gray-900 transition-colors">Editor</Link></li>
              <li><Link href="/docs/api-keys" className="hover:text-gray-900 transition-colors">API</Link></li>
              <li><span className="text-gray-400 cursor-default">Changelog</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Docs</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/docs" className="hover:text-gray-900 transition-colors">Overview</Link></li>
              <li><Link href="/docs/wrld-01" className="hover:text-gray-900 transition-colors">WRLD-01 Model</Link></li>
              <li><Link href="/docs/contributing" className="hover:text-gray-900 transition-colors">Contributing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Open Source</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="https://github.com/neueworld/SVG-World" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/neueworld/SVG-World/issues" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                  Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/neueworld/SVG-World/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SVG World. Released under{' '}
            <a href="https://github.com/neueworld/SVG-World/blob/main/LICENSE" className="underline hover:text-gray-600 transition-colors">AGPL-3.0</a>.
          </p>
          <p className="text-xs text-gray-400">
            Powered by <span className="font-medium text-gray-500">WRLD-01</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
