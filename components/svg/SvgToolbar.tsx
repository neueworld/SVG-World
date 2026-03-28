'use client'

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
}

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
}: Props) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-2.5 flex-shrink-0">
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
  )
}
