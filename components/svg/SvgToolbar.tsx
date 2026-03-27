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
    <div className="border-b border-gray-800 bg-gray-950 px-4 py-3 flex items-center gap-3 flex-shrink-0">
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
        placeholder="Describe your SVG… e.g. a mountain landscape at sunset"
        className="flex-1 bg-gray-800 text-gray-100 placeholder-gray-500 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={onGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
      >
        {isGenerating ? 'Generating…' : 'Generate'}
      </button>
      <button
        onClick={onVectorizeClick}
        disabled={isGenerating}
        className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
      >
        Vectorize
      </button>
      {hasSvg && (
        <>
          <button
            onClick={onCopy}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-lg text-sm transition-colors"
          >
            Copy
          </button>
          <button
            onClick={onDownload}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-lg text-sm transition-colors"
          >
            Download
          </button>
          <button
            onClick={onClear}
            className="bg-gray-700 hover:bg-gray-600 text-red-400 px-3 py-2 rounded-lg text-sm transition-colors"
          >
            Clear
          </button>
        </>
      )}
    </div>
  )
}
