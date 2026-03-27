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
        if (hiddenLayers.has(id)) {
          return `<g${attrs} style="display:none">`
        }
        return match
      }
    )
  }, [svgContent, hiddenLayers])

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-red-400 text-4xl mb-3">⚠</div>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!svgContent && !isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">✦</div>
          <p className="text-lg">Describe an SVG and click Generate</p>
          <p className="text-sm mt-2 opacity-60">or upload an image to vectorize</p>
        </div>
      </div>
    )
  }

  if (isGenerating && !svgContent) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-purple-400 text-lg">Generating SVG…</div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center p-8">
      <div
        className="w-full max-w-3xl aspect-video bg-white rounded-lg shadow-2xl overflow-hidden"
        dangerouslySetInnerHTML={{ __html: processedSvg }}
      />
    </div>
  )
}
