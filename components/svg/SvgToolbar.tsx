'use client'

import type { SvgStyle } from '@/lib/claude-svg'

interface Props {
  prompt: string
  onPromptChange: (v: string) => void
  onGenerate: () => void
  onVectorizeClick: () => void
  onDownload: () => void
  onCopy: () => void
  onClear: () => void
  isGenerating: boolean
  hasSvg: boolean
  style: SvgStyle
  onStyleChange: (s: SvgStyle) => void
}

const STYLE_OPTIONS: { value: SvgStyle; label: string; description: string }[] = [
  { value: 'default', label: 'Default', description: 'Rich gradients, editorial style' },
  { value: 'flat-icon', label: 'Flat Icon', description: 'Dark bg, bold neon, pure vector' },
  { value: 'holographic', label: 'Holographic', description: 'Cream bg, mesh gradients, 3D depth' },
]

export default function SvgToolbar({
  prompt,
  onPromptChange,
  onGenerate,
  onVectorizeClick,
  onDownload,
  onCopy,
  onClear,
  isGenerating,
  hasSvg,
  style,
  onStyleChange,
}: Props) {
  return (
    <div className="border-b border-gray-200 bg-white flex-shrink-0">
      {/* Main toolbar row */}
      <div className="px-4 py-3 flex items-center gap-2.5">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
          placeholder="Describe your SVG… e.g. a glowing city skyline at night"
          className="flex-1 bg-gray-100 hover:bg-gray-200 focus:bg-white text-gray-900 placeholder-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors border border-transparent focus:border-violet-300"
        />
        <button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 disabled:text-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
        <button
          onClick={onVectorizeClick}
          disabled={isGenerating}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border border-gray-200"
        >
          Vectorize
        </button>
        {hasSvg && (
          <>
            <div className="w-px h-6 bg-gray-200" />
            <button
              onClick={onCopy}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm transition-colors border border-gray-200"
            >
              Copy
            </button>
            <button
              onClick={onDownload}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm transition-colors border border-gray-200"
            >
              Download
            </button>
            <button
              onClick={onClear}
              className="bg-gray-100 hover:bg-gray-200 text-red-500 px-3 py-2 rounded-lg text-sm transition-colors border border-gray-200"
            >
              Clear
            </button>
          </>
        )}
      </div>

      {/* Style selector row */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-1">Style</span>
        {STYLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStyleChange(opt.value)}
            title={opt.description}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              style === opt.value
                ? 'bg-violet-600 text-white border-violet-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-1">
          — {STYLE_OPTIONS.find((o) => o.value === style)?.description}
        </span>
      </div>
    </div>
  )
}
