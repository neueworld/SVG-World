import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WRLD-01 Model — SVG World Docs',
  description: 'Documentation for WRLD-01, the AI model powering SVG World.',
}

export default function Wrld01Page() {
  return (
    <div>
      <div className="not-prose mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Model</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">WRLD-01</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The AI model behind SVG World. Purpose-built for scalable vector graphics generation
          with a strong understanding of visual design, color theory, and SVG structure.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { label: 'Version', value: 'WRLD-01' },
            { label: 'Status', value: 'Live' },
            { label: 'Max output', value: '8,192 tokens' },
            { label: 'Streaming', value: 'Yes (SSE)' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm">
              <span className="text-gray-500">{item.label}: </span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>What WRLD-01 does</h2>
      <p>
        WRLD-01 takes a plain-English description and returns production-ready SVG markup, streamed
        token by token. It is specifically instructed to:
      </p>
      <ul>
        <li>Use harmonious, sophisticated color palettes — not default web colors</li>
        <li>Add visual depth with <code>linearGradient</code>, <code>radialGradient</code>, and <code>feDropShadow</code></li>
        <li>Structure output in named <code>&lt;g&gt;</code> layer groups (<code>background</code>, <code>midground</code>, <code>foreground</code>, <code>details</code>)</li>
        <li>Use smooth bezier curves for organic shapes</li>
        <li>Define reusable elements in a <code>&lt;defs&gt;</code> block</li>
        <li>Target <code>viewBox=&quot;0 0 800 600&quot;</code> with <code>width=&quot;100%&quot; height=&quot;100%&quot;</code> for responsiveness</li>
      </ul>

      <h2>Prompting guide</h2>
      <p>
        WRLD-01 performs best when prompts are specific about subject, style, mood, and color.
        Think of it like briefing a designer.
      </p>

      <h3>Good prompts</h3>
      <ul>
        <li><em>&ldquo;A mountain landscape at golden hour with layered peaks and a glowing sun&rdquo;</em></li>
        <li><em>&ldquo;Abstract geometric composition with overlapping gradients, purple and cyan&rdquo;</em></li>
        <li><em>&ldquo;Minimal tech logo mark — concentric circles with clean lines&rdquo;</em></li>
        <li><em>&ldquo;Isometric city grid, night scene, neon reflections on rain-wet streets&rdquo;</em></li>
      </ul>

      <h3>Tips</h3>
      <ul>
        <li><strong>Mention colors</strong> — &ldquo;deep indigo and gold&rdquo; beats &ldquo;colorful&rdquo;</li>
        <li><strong>Name the style</strong> — &ldquo;flat icon&rdquo;, &ldquo;illustrative scene&rdquo;, &ldquo;geometric pattern&rdquo;</li>
        <li><strong>Describe the mood</strong> — &ldquo;dark and moody&rdquo;, &ldquo;bright and airy&rdquo;, &ldquo;minimal and clean&rdquo;</li>
        <li><strong>Include a focal point</strong> — &ldquo;a lone tree on a hill&rdquo; gives the model something to anchor to</li>
      </ul>

      <h2>Capabilities</h2>
      <table>
        <thead>
          <tr><th>Capability</th><th>Support</th></tr>
        </thead>
        <tbody>
          <tr><td>Landscape / scene illustration</td><td>✅ Strong</td></tr>
          <tr><td>Abstract / geometric art</td><td>✅ Strong</td></tr>
          <tr><td>Icon and logo marks</td><td>✅ Good</td></tr>
          <tr><td>Data visualization</td><td>🔶 Basic</td></tr>
          <tr><td>Typography / lettering</td><td>🔶 Limited</td></tr>
          <tr><td>Animation (SMIL)</td><td>🚫 Not yet — WRLD-01.2</td></tr>
          <tr><td>Photorealistic rendering</td><td>🚫 Not applicable (vector)</td></tr>
        </tbody>
      </table>

      <h2>Versioning</h2>
      <p>
        WRLD-01 versions follow a <code>WRLD-[major].[minor]</code> scheme. Breaking
        changes in the system prompt or output format increment the major version.
        Quality improvements and capability expansions increment minor.
      </p>
      <table>
        <thead>
          <tr><th>Version</th><th>Status</th><th>Highlights</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>WRLD-01</strong></td><td>✅ Live</td><td>Initial release — scenes, abstract art, icons</td></tr>
          <tr><td>WRLD-01.1</td><td>🗓 Planned</td><td>Improved color fidelity, complex scene composition</td></tr>
          <tr><td>WRLD-01.2</td><td>🗓 Planned</td><td>SMIL animation support, path optimization</td></tr>
          <tr><td>WRLD-02</td><td>🔬 Research</td><td>Multi-turn editing, style transfer</td></tr>
        </tbody>
      </table>

      <h2>Technical details</h2>
      <p>
        WRLD-01 is implemented in <code>lib/claude-svg.ts</code>. It wraps the underlying
        model with a design-focused system prompt and streams the response via the Anthropic
        Messages API. The output is sanitized client-side to strip any <code>&lt;script&gt;</code>
        tags or event handlers before rendering.
      </p>
      <p>
        To modify WRLD-01&apos;s behavior — change its style, add constraints, or improve output
        quality — edit the <code>SYSTEM_PROMPT</code> constant in <code>lib/claude-svg.ts</code> and
        open a PR describing the change and its effect on output quality.
      </p>
    </div>
  )
}
