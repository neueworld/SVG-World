import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// --- Hardcoded showcase SVGs ---

const MOUNTAIN_SVG = `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="msky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0d0423"/><stop offset="35%" stop-color="#6b1f42"/><stop offset="60%" stop-color="#c85a28"/><stop offset="80%" stop-color="#e8923c"/><stop offset="100%" stop-color="#f5c66a"/></linearGradient><radialGradient id="msun" cx="50%" cy="70%" r="22%"><stop offset="0%" stop-color="#fff9d0"/><stop offset="30%" stop-color="#ffd760" stop-opacity="0.95"/><stop offset="100%" stop-color="#ffb347" stop-opacity="0"/></radialGradient><linearGradient id="mm1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b1868"/><stop offset="100%" stop-color="#180a35"/></linearGradient><linearGradient id="mm2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#241055"/><stop offset="100%" stop-color="#0e0522"/></linearGradient><linearGradient id="mm3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#160938"/><stop offset="100%" stop-color="#07030f"/></linearGradient></defs><rect width="800" height="500" fill="url(#msky)"/><ellipse cx="400" cy="350" rx="120" ry="120" fill="url(#msun)"/><circle cx="400" cy="350" r="40" fill="#fff9d0" opacity="0.97"/><path d="M0,440 L70,300 L140,360 L220,250 L300,320 L380,210 L460,290 L540,235 L620,300 L700,255 L780,295 L800,280 L800,500 L0,500Z" fill="url(#mm1)"/><path d="M0,470 L90,370 L170,415 L260,340 L350,385 L440,325 L525,368 L615,330 L700,365 L780,340 L800,355 L800,500 L0,500Z" fill="url(#mm2)"/><path d="M0,490 L120,458 L240,472 L380,453 L500,466 L640,450 L760,462 L800,455 L800,500 L0,500Z" fill="url(#mm3)"/></svg>`

const AURORA_SVG = `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="abg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#010810"/><stop offset="100%" stop-color="#030f1e"/></linearGradient><linearGradient id="a1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#00c97a" stop-opacity="0"/><stop offset="30%" stop-color="#00c97a" stop-opacity="0.7"/><stop offset="65%" stop-color="#7c3aed" stop-opacity="0.6"/><stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/></linearGradient><linearGradient id="a2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0ea5e9" stop-opacity="0"/><stop offset="40%" stop-color="#0ea5e9" stop-opacity="0.55"/><stop offset="80%" stop-color="#a855f7" stop-opacity="0.5"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></linearGradient><linearGradient id="a3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#34d399" stop-opacity="0"/><stop offset="50%" stop-color="#22d3ee" stop-opacity="0.4"/><stop offset="100%" stop-color="#818cf8" stop-opacity="0"/></linearGradient><filter id="ablur"><feGaussianBlur stdDeviation="14"/></filter></defs><rect width="800" height="500" fill="url(#abg)"/><circle cx="50" cy="28" r="1.2" fill="white" opacity="0.8"/><circle cx="135" cy="52" r="0.8" fill="white" opacity="0.6"/><circle cx="225" cy="18" r="1.1" fill="white" opacity="0.7"/><circle cx="315" cy="44" r="0.9" fill="white" opacity="0.5"/><circle cx="400" cy="12" r="1.4" fill="white" opacity="0.8"/><circle cx="485" cy="36" r="1" fill="white" opacity="0.6"/><circle cx="575" cy="22" r="0.8" fill="white" opacity="0.7"/><circle cx="665" cy="48" r="1.3" fill="white" opacity="0.5"/><circle cx="748" cy="16" r="1" fill="white" opacity="0.9"/><circle cx="92" cy="88" r="0.7" fill="white" opacity="0.5"/><circle cx="195" cy="108" r="1" fill="white" opacity="0.6"/><circle cx="358" cy="76" r="0.9" fill="white" opacity="0.7"/><circle cx="525" cy="92" r="1.1" fill="white" opacity="0.5"/><circle cx="705" cy="82" r="0.8" fill="white" opacity="0.8"/><path d="M-100,200 C60,155 200,215 380,165 C560,115 700,175 900,140 L900,120 C700,155 560,95 380,145 C200,195 60,135 -100,180Z" fill="url(#a1)" filter="url(#ablur)"/><path d="M-100,270 C50,228 230,285 430,235 C630,185 740,248 900,210 L900,192 C740,230 630,167 430,217 C230,267 50,210 -100,252Z" fill="url(#a2)" filter="url(#ablur)"/><path d="M-100,330 C80,298 270,345 470,305 C670,265 780,312 900,282 L900,268 C780,298 670,251 470,291 C270,331 80,284 -100,316Z" fill="url(#a3)" filter="url(#ablur)"/><rect x="0" y="415" width="800" height="85" fill="#010810" opacity="0.96"/></svg>`

const GEOMETRIC_SVG = `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#faf7ff"/><stop offset="100%" stop-color="#ede9fe"/></linearGradient><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#4f46e5"/></linearGradient><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f472b6"/><stop offset="100%" stop-color="#f97316"/></linearGradient><linearGradient id="g3" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient><filter id="gshadow"><feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#7c3aed" flood-opacity="0.18"/></filter></defs><rect width="800" height="500" fill="url(#gbg)"/><rect x="80" y="60" width="300" height="300" rx="32" fill="url(#g1)" transform="rotate(-18 230 210)" filter="url(#gshadow)"/><circle cx="570" cy="200" r="155" fill="url(#g2)" filter="url(#gshadow)" opacity="0.92"/><rect x="290" y="295" width="180" height="180" rx="20" fill="url(#g3)" transform="rotate(22 380 385)" filter="url(#gshadow)" opacity="0.9"/><circle cx="155" cy="395" r="65" fill="white" opacity="0.45"/><circle cx="700" cy="70" r="10" fill="#7c3aed" opacity="0.2"/><circle cx="740" cy="95" r="6" fill="#4f46e5" opacity="0.15"/><circle cx="668" cy="88" r="8" fill="#ec4899" opacity="0.2"/><circle cx="120" cy="445" r="30" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.2"/><circle cx="685" cy="435" r="20" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.2"/></svg>`

const EXAMPLES = [
  {
    prompt: 'Mountain landscape at golden hour with layered peaks',
    svg: MOUNTAIN_SVG,
    tag: 'Scene',
  },
  {
    prompt: 'Northern lights dancing over a dark ocean, with stars',
    svg: AURORA_SVG,
    tag: 'Atmospheric',
  },
  {
    prompt: 'Abstract geometric composition with overlapping gradients',
    svg: GEOMETRIC_SVG,
    tag: 'Abstract',
  },
]

const FEATURES = [
  {
    icon: '⚡',
    title: 'Streamed in real time',
    desc: 'Watch your SVG render token by token as WRLD-01 draws it live.',
  },
  {
    icon: '⬡',
    title: 'Fully layered output',
    desc: 'Every graphic ships with named <g> layers you can toggle independently.',
  },
  {
    icon: '🖼',
    title: 'Image → Vector',
    desc: 'Upload a PNG or JPG. Get a clean traced SVG back via potrace.',
  },
  {
    icon: '⬇',
    title: 'Export anywhere',
    desc: 'Download raw SVG or copy to clipboard. Scales to any size, forever.',
  },
]

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle gradient blob */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-br from-violet-100 via-purple-50 to-transparent opacity-60 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            WRLD-01 is live · SVG World (beta)
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.08] mb-6">
            Generate stunning SVGs
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              with AI.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Describe anything in plain English. WRLD-01 produces production-ready,
            layered vector graphics in seconds — no design tools required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/editor"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Open the editor →
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Examples ─────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3">Examples</p>
            <h2 className="text-3xl font-bold text-gray-900">What WRLD-01 can draw</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              These are actual SVGs generated from plain text prompts — no editing, no post-processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXAMPLES.map((ex) => (
              <div key={ex.prompt} className="group bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="w-full aspect-video"
                  dangerouslySetInnerHTML={{ __html: ex.svg }}
                />
                <div className="p-4 border-t border-gray-100">
                  <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-widest bg-violet-50 px-2 py-0.5 rounded-full">
                    {ex.tag}
                  </span>
                  <p className="mt-2 text-sm text-gray-600 italic leading-snug">
                    &ldquo;{ex.prompt}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/editor" className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors">
              Try it yourself →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold text-gray-900">Everything you need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 ring-1 ring-gray-100">
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WRLD-01 ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-4">The model</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet WRLD-01
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                WRLD-01 is our AI model purpose-built for SVG generation. It understands color theory,
                composition, layering, and visual design — not just code. Tell it what you want and it
                handles the rest.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Versioned like software: WRLD-01 ships today. WRLD-01.1 improves color fidelity and
                complex scene handling. WRLD-01.2 adds animation support. The roadmap is public and
                contributions are welcome.
              </p>
              <Link href="/docs/wrld-01" className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                Read the model docs →
              </Link>
            </div>

            <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6 font-mono text-sm shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400">WRLD-01 API</span>
              </div>
              <pre className="text-xs leading-relaxed text-gray-700 overflow-x-auto">{`POST /api/v1/generate

{
  "model": "wrld-01",
  "prompt": "A mountain at sunset",
  "stream": true
}

// Response (streamed)
data: "<svg viewBox="0 0 800 600"
data: "  <defs>..."
data: "  <g id=\\"background\\">"
data: "    <rect fill=\\"url(#sky)\\""
...
data: [DONE]`}</pre>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/docs/api-keys" className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors">
                  Get API access →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Open Source ──────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'License', value: 'AGPL-3.0' },
                  { label: 'Language', value: 'TypeScript' },
                  { label: 'Framework', value: 'Next.js 15' },
                  { label: 'Status', value: 'Public beta' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-4">Open Source</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Built in public,<br />owned by everyone.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                SVG World is fully open source under AGPL-3.0. Fork it, self-host it,
                improve the model prompt, add new export formats — all contributions are welcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/neueworld/SVG-World"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View on GitHub
                </a>
                <Link
                  href="/docs/contributing"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  How to contribute
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── API CTA ──────────────────────────────────────────── */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">API Access</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to build with WRLD-01?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            The WRLD-01 API lets you generate SVGs programmatically from your own apps.
            Managed keys, rate limits, and usage analytics — coming soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/docs/api-keys"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Read the API docs →
            </Link>
            <a
              href="https://github.com/neueworld/SVG-World"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Self-host instead
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
