import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contributing — SVG World Docs',
  description: 'How to contribute to SVG World — setup, PR process, and areas of focus.',
}

export default function ContributingPage() {
  return (
    <div>
      <div className="not-prose mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Open Source</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contributing</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          SVG World is open source under AGPL-3.0. All contributions — code, docs,
          bug reports, and prompt improvements — are welcome.
        </p>
      </div>

      <h2>Ways to contribute</h2>
      <ul>
        <li><strong>Improve WRLD-01</strong> — edit the system prompt in <code>lib/claude-svg.ts</code> to produce better output</li>
        <li><strong>Fix bugs</strong> — check <a href="https://github.com/neueworld/SVG-World/issues" target="_blank" rel="noopener noreferrer">open issues</a> for things to fix</li>
        <li><strong>Add features</strong> — SVG editing tools, export formats, animation support</li>
        <li><strong>Improve docs</strong> — better examples, clearer explanations, translations</li>
        <li><strong>Report issues</strong> — <a href="https://github.com/neueworld/SVG-World/issues/new" target="_blank" rel="noopener noreferrer">open an issue</a> with steps to reproduce</li>
      </ul>

      <h2>Local setup</h2>
      <pre><code>{`# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/SVG-World.git
cd SVG-World

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# 4. Start dev server
npm run dev
# Open http://localhost:3000`}</code></pre>

      <h2>Project structure</h2>
      <pre><code>{`SVG-World/
├── app/
│   ├── page.tsx              # Landing page
│   ├── editor/page.tsx       # SVG editor
│   ├── docs/                 # Documentation pages
│   └── api/svg/
│       ├── generate/route.ts # SSE streaming endpoint
│       └── vectorize/route.ts # Image→SVG endpoint
├── components/
│   ├── Nav.tsx               # Global navigation
│   ├── Footer.tsx            # Global footer
│   └── svg/
│       ├── SvgEditor.tsx     # Editor orchestrator
│       ├── SvgPreview.tsx    # Live preview
│       ├── SvgLayerPanel.tsx # Layer toggles
│       └── SvgToolbar.tsx    # Toolbar
└── lib/
    ├── claude-svg.ts         # WRLD-01 inference
    ├── vectorize.ts          # potrace/sharp pipeline
    └── svg-parser.ts         # Layer parsing + sanitization`}</code></pre>

      <h2>Making a change</h2>
      <ol>
        <li>Create a branch: <code>git checkout -b feat/my-feature</code></li>
        <li>Make your changes</li>
        <li>Run <code>npm run build</code> — must pass with zero TypeScript errors</li>
        <li>Commit with a clear message describing <em>what</em> and <em>why</em></li>
        <li>Push and open a PR against <code>main</code></li>
      </ol>

      <h2>PR guidelines</h2>
      <ul>
        <li>Keep PRs focused — one concern per PR</li>
        <li>If changing WRLD-01&rsquo;s system prompt, include before/after example SVGs in the PR description</li>
        <li>All TypeScript must compile with <code>strict: true</code> — no <code>any</code> casts without justification</li>
        <li>Don&rsquo;t add dependencies without discussion — open an issue first</li>
        <li>AGPL-3.0 applies: your contribution will be open source</li>
      </ul>

      <h2>Improving WRLD-01</h2>
      <p>
        The model system prompt lives in <code>lib/claude-svg.ts</code>. This is the highest-leverage
        place to contribute — small wording changes can significantly improve output quality.
      </p>
      <p>
        When opening a prompt-improvement PR, include:
      </p>
      <ul>
        <li>The exact diff to the system prompt</li>
        <li>3+ example SVGs generated with the new prompt vs the old one</li>
        <li>The prompts used to generate them</li>
      </ul>

      <h2>Code of conduct</h2>
      <p>
        Be respectful. Critique ideas, not people. We&rsquo;re building something cool — keep it fun.
      </p>
    </div>
  )
}
