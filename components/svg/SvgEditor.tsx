'use client'

import { useState, useRef } from 'react'
import SvgToolbar from './SvgToolbar'
import SvgLayerPanel from './SvgLayerPanel'
import SvgPreview from './SvgPreview'
import { parseSvgLayers, sanitizeSvg, type SvgLayer } from '@/lib/svg-parser'

export default function SvgEditor() {
  const [prompt, setPrompt] = useState('')
  const [svgContent, setSvgContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [layers, setLayers] = useState<SvgLayer[]>([])
  const [hiddenLayers, setHiddenLayers] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return
    setIsGenerating(true)
    setSvgContent('')
    setLayers([])
    setHiddenLayers(new Set())
    setError(null)

    try {
      const res = await fetch('/api/svg/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.body) {
        setError('No response from server.')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const lines = decoder.decode(value, { stream: true }).split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (typeof parsed === 'string') {
              accumulated += parsed
              setSvgContent(sanitizeSvg(accumulated))
            } else if (parsed && typeof parsed === 'object' && 'error' in parsed) {
              setError(String(parsed.error))
              setSvgContent('')
              return
            }
          } catch {
            // skip malformed chunk
          }
        }
      }

      if (accumulated) {
        setLayers(parseSvgLayers(accumulated))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleVectorize = async (file: File) => {
    setError(null)
    const form = new FormData()
    form.append('image', file)
    try {
      const res = await fetch('/api/svg/vectorize', { method: 'POST', body: form })
      if (!res.ok) {
        setError(await res.text())
        return
      }
      const svg = await res.text()
      const clean = sanitizeSvg(svg)
      setSvgContent(clean)
      setLayers(parseSvgLayers(clean))
      setHiddenLayers(new Set())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Vectorization failed.')
    }
  }

  const toggleLayer = (id: string) => {
    setHiddenLayers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'svg-world-output.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => navigator.clipboard.writeText(svgContent)

  const handleClear = () => {
    setSvgContent('')
    setLayers([])
    setHiddenLayers(new Set())
    setError(null)
  }

  return (
    <div className="flex flex-col h-full">
      <SvgToolbar
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        onVectorizeClick={() => fileInputRef.current?.click()}
        onDownload={handleDownload}
        onCopy={handleCopy}
        onClear={handleClear}
        isGenerating={isGenerating}
        hasSvg={!!svgContent}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleVectorize(file)
          e.target.value = ''
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        {layers.length > 0 && (
          <SvgLayerPanel
            layers={layers}
            hiddenLayers={hiddenLayers}
            onToggle={toggleLayer}
          />
        )}
        <SvgPreview
          svgContent={svgContent}
          hiddenLayers={hiddenLayers}
          isGenerating={isGenerating}
          error={error}
        />
      </div>
    </div>
  )
}
