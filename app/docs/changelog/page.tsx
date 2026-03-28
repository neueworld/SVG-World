import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog — SVG World Docs',
  description: 'WRLD-01 version history, quality anchors, and model improvements over time.',
}

export default function ChangelogPage() {
  return (
    <div>
      <div className="not-prose mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Model History</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Changelog</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Every WRLD-01 version is documented here with quality anchors — standardised benchmark
          prompts run across versions so you can see exactly what improved and why.
        </p>
      </div>

      {/* What are anchors */}
      <h2>What are quality anchors?</h2>
      <p>
        A quality anchor is a fixed benchmark prompt that we run against every version of WRLD-01.
        By keeping the prompt identical and only changing the model (system prompt, parameters, or
        underlying Claude version), we can directly compare outputs and measure improvement.
      </p>
      <p>
        Anchors are stored in <code>benchmarks/</code> at the root of the repo. Each version gets
        its own JSON file (<code>wrld-01-baseline.json</code>, <code>wrld-011-baseline.json</code>, …)
        that records the prompts, style modes, and what quality dimension each prompt tests.
      </p>
      <p>
        When contributing a WRLD-01 improvement, include before/after SVGs for the relevant
        anchor prompts in your pull request. See the{' '}
        <a href="/docs/contributing">Contributing guide</a> for details.
      </p>

      {/* Benchmark dimensions */}
      <h2>Quality dimensions</h2>
      <p>Each benchmark output is evaluated across six dimensions:</p>
      <ul>
        <li><strong>Color harmony</strong> — palette coherence, sophistication of hue choices</li>
        <li><strong>Composition</strong> — focal point, balance, use of negative space</li>
        <li><strong>Layer structure</strong> — meaningful <code>&lt;g&gt;</code> groups, logical draw order</li>
        <li><strong>Style adherence</strong> — does the output actually match the requested style mode?</li>
        <li><strong>Technical correctness</strong> — valid SVG, correct viewBox, no broken paths</li>
        <li><strong>Visual craft</strong> — overall impression; does it look premium?</li>
      </ul>
      <p>Scores are 1–5 per dimension. A version &ldquo;improves&rdquo; if its average visual craft score rises without regressing on technical correctness.</p>

      {/* Version list */}
      <h2>Versions</h2>

      {/* WRLD-01 */}
      <div className="not-prose my-8 rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-bold text-gray-900">WRLD-01</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
                Current
              </span>
            </div>
            <p className="text-sm text-gray-500">Released March 2026 · Baseline release</p>
          </div>
          <span className="text-xs font-mono text-gray-400 mt-1">claude-opus-4-6</span>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-gray-700 mb-4">
            The initial public release of WRLD-01. Establishes the foundation for all future versions.
            Focus areas: scene illustration, abstract art, and icon design across three style modes.
          </p>

          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Style modes introduced</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-sm font-semibold text-gray-800 mb-1">Default</p>
              <p className="text-xs text-gray-500">Rich gradients, editorial illustration, atmospheric scenes</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-900 p-3">
              <p className="text-sm font-semibold text-white mb-1">Flat Icon</p>
              <p className="text-xs text-gray-400">Dark bg, bold neon fills, pure vector, no gradients</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-[#FAFAF8] p-3">
              <p className="text-sm font-semibold text-gray-800 mb-1">Holographic</p>
              <p className="text-xs text-gray-500">Cream bg, mesh gradients, 3D depth, feGaussianBlur glows</p>
            </div>
          </div>

          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Benchmark anchor prompts</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 pr-4 font-semibold text-gray-500">ID</th>
                  <th className="pb-2 pr-4 font-semibold text-gray-500">Style</th>
                  <th className="pb-2 pr-4 font-semibold text-gray-500">Complexity</th>
                  <th className="pb-2 font-semibold text-gray-500">Prompt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: 'flat-simple-01', style: 'flat-icon', complexity: 'simple', prompt: 'a lightning bolt' },
                  { id: 'flat-simple-02', style: 'flat-icon', complexity: 'simple', prompt: 'a diamond gem badge' },
                  { id: 'flat-medium-01', style: 'flat-icon', complexity: 'medium', prompt: 'a space rocket launching with flames' },
                  { id: 'flat-medium-02', style: 'flat-icon', complexity: 'medium', prompt: 'a retro cassette tape with equalizer bars' },
                  { id: 'holo-simple-01', style: 'holographic', complexity: 'simple', prompt: 'a floating sphere with iridescent surface' },
                  { id: 'holo-simple-02', style: 'holographic', complexity: 'simple', prompt: 'an abstract organic blob shape' },
                  { id: 'holo-medium-01', style: 'holographic', complexity: 'medium', prompt: 'a glass pill capsule with colorful liquid inside' },
                  { id: 'holo-medium-02', style: 'holographic', complexity: 'medium', prompt: 'a floating crystal cluster on a light background' },
                  { id: 'default-simple-01', style: 'default', complexity: 'simple', prompt: 'a mountain peak at golden hour' },
                  { id: 'default-medium-01', style: 'default', complexity: 'medium', prompt: 'a coffee cup on a wooden desk with morning light' },
                  { id: 'default-complex-01', style: 'default', complexity: 'complex', prompt: 'a futuristic city skyline at night with neon reflections' },
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-2 pr-4 font-mono text-gray-400">{row.id}</td>
                    <td className="py-2 pr-4">
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium ${
                        row.style === 'flat-icon'
                          ? 'bg-gray-900 text-gray-100'
                          : row.style === 'holographic'
                          ? 'bg-violet-50 text-violet-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {row.style}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-500 capitalize">{row.complexity}</td>
                    <td className="py-2 text-gray-700">{row.prompt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Full benchmark spec: <code className="bg-gray-100 px-1 rounded">benchmarks/wrld-01-baseline.json</code>
          </p>
        </div>
      </div>

      {/* Future versions */}
      <div className="not-prose my-6 rounded-xl border border-dashed border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-base font-bold text-gray-400">WRLD-01.1</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
            Planned
          </span>
        </div>
        <p className="text-sm text-gray-400">
          Focus: color fidelity and complex scene quality. Will be benchmarked against WRLD-01 anchors.
          Target: +0.5 average on color_harmony and visual_craft dimensions.
        </p>
      </div>

      <div className="not-prose my-6 rounded-xl border border-dashed border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-base font-bold text-gray-400">WRLD-01.2</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
            Planned
          </span>
        </div>
        <p className="text-sm text-gray-400">
          Focus: SMIL animation support — CSS keyframes and SMIL &lt;animate&gt; elements in generated SVGs.
          New benchmark dimension: animation_quality.
        </p>
      </div>

      {/* How to contribute */}
      <h2>How to contribute to WRLD-01</h2>
      <p>
        The highest-leverage contribution to SVG World is improving the WRLD-01 system prompt
        in <code>lib/claude-svg.ts</code>. When submitting a prompt improvement:
      </p>
      <ol>
        <li>Run all relevant benchmark prompts before and after your change</li>
        <li>Include the before/after SVG outputs in your PR (as attachments or as embedded data URIs)</li>
        <li>State which quality dimensions improved and by how much</li>
        <li>If your change improves the baseline significantly, it may warrant a new version (WRLD-01.1)</li>
      </ol>
      <p>
        Read the full contribution process in the{' '}
        <a href="/docs/contributing">Contributing guide</a>.
      </p>
    </div>
  )
}
