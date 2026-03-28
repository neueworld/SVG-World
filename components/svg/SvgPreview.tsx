'use client'

import { useMemo } from 'react'

interface Props {
  svgContent: string
  hiddenLayers: Set<string>
  isGenerating: boolean
  error: string | null
}

export default function SvgPreview({ svgContent, hiddenLayers, isGenerating, error }: Props) {
  const processedSvg = useMemo(() => {
    if (!svgContent || hiddenLayers.size === 0) return svgContent
    return svgContent.replace(
      /<g([^>]*id="([^"]+)"[^>]*)>/gi,
      (match, attrs, id) => {
        if (hiddenLayers.has(id)) return `<g${attrs} style="display:none">`
        return match
      }
    )
  }, [svgContent, hiddenLayers])

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm px-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
            <span className="text-red-500 text-lg">!</span>
          </div>
          <p className="text-sm text-gray-700 font-medium mb-1">Generation failed</p>
          <p className="text-xs text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  if (!svgContent && !isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-gray-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M12 3v9m0 0l-3-3m3 3l3-3" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">Nothing here yet</p>
          <p className="text-xs text-gray-400">Type a prompt above and press Generate,<br />or upload an image to vectorize.</p>
        </div>
      </div>
    )
  }

  if (isGenerating && !svgContent) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">WRLD-01 is drawing…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-8">
      <div
        className="w-full max-w-3xl aspect-video bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: processedSvg }}
      />
    </div>
  )
}
