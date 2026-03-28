import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Keys — SVG World Docs',
  description: 'Use the WRLD-01 API to generate SVGs programmatically.',
}

export default function ApiKeysPage() {
  return (
    <div>
      <div className="not-prose mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">API</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Keys</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Generate SVGs programmatically using the WRLD-01 API. Managed keys with
          rate limiting and usage analytics are coming soon.
        </p>
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-sm px-4 py-2 rounded-xl mt-4">
          <span>🚧</span>
          <span>Managed API keys are in development. Self-host today using your own Anthropic key.</span>
        </div>
      </div>

      <h2>Option A — Self-host (available now)</h2>
      <p>
        Clone the repo, add your Anthropic API key, and deploy. You get the full WRLD-01 API
        under your own domain with no rate limits beyond what Anthropic imposes.
      </p>
      <pre><code>{`# 1. Clone and install
git clone https://github.com/neueworld/SVG-World.git
cd SVG-World
npm install

# 2. Set your API key
cp .env.local.example .env.local
# Edit .env.local: ANTHROPIC_API_KEY=your_key

# 3. Run
npm run dev      # development
npm run build && npm start  # production`}</code></pre>

      <p>
        Your instance exposes the same endpoints documented below — just swap the base URL.
        Deploy to Vercel with one click: your <code>ANTHROPIC_API_KEY</code> goes in
        Vercel&rsquo;s environment variables.
      </p>

      <h2>Option B — Managed WRLD-01 API (coming soon)</h2>
      <p>
        The hosted WRLD-01 API will issue per-user keys with usage dashboards, rate limits, and
        no Anthropic account required. Add yourself to the waitlist on GitHub:
      </p>
      <div className="not-prose">
        <a
          href="https://github.com/neueworld/SVG-World/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Join the waitlist on GitHub →
        </a>
      </div>

      <h2>API reference</h2>
      <p>
        The WRLD-01 API is a thin REST wrapper around the editor&rsquo;s SSE streaming endpoint.
      </p>

      <h3>Generate SVG</h3>
      <pre><code>{`POST /api/svg/generate
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY   # future managed keys

{
  "prompt": "A mountain landscape at golden hour",
  "stream": true   // default true
}`}</code></pre>

      <p><strong>Streaming response</strong> (Server-Sent Events):</p>
      <pre><code>{`data: "<svg viewBox=\\"0 0 800 600\\" xmlns=\\"http://www.w3.org/2000/svg\\">"
data: "  <defs>"
data: "    <linearGradient id=\\"sky\\">"
...
data: "</svg>"
data: [DONE]`}</code></pre>

      <p>Each <code>data:</code> line is a JSON-encoded string fragment. Concatenate all fragments
      to reconstruct the full SVG. On error:</p>
      <pre><code>{`data: {"error": "Content policy blocked this request. Try rephrasing."}`}</code></pre>

      <h3>Vectorize image</h3>
      <pre><code>{`POST /api/svg/vectorize
Content-Type: multipart/form-data

Form fields:
  image   File   PNG, JPG, GIF, WebP (max 10 MB recommended)`}</code></pre>
      <p><strong>Response</strong>: raw SVG string (<code>Content-Type: image/svg+xml</code>)</p>

      <h2>Rate limits (self-hosted)</h2>
      <p>
        When self-hosting, rate limits are determined entirely by your Anthropic account tier.
        See{' '}
        <a href="https://docs.anthropic.com/en/api/rate-limits" target="_blank" rel="noopener noreferrer">
          Anthropic rate limits
        </a>{' '}
        for details.
      </p>

      <h2>Planned managed tiers</h2>
      <table>
        <thead>
          <tr><th>Tier</th><th>Requests / day</th><th>Price</th></tr>
        </thead>
        <tbody>
          <tr><td>Free</td><td>20</td><td>$0</td></tr>
          <tr><td>Pro</td><td>500</td><td>TBD</td></tr>
          <tr><td>Team</td><td>Unlimited</td><td>TBD</td></tr>
        </tbody>
      </table>
      <p className="not-prose text-sm text-gray-500">
        Pricing is not final. <Link href="https://github.com/neueworld/SVG-World/issues" className="text-violet-600 hover:underline">Follow the issue</Link> for updates.
      </p>
    </div>
  )
}
