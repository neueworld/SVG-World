'use client'

import type { SvgLayer } from '@/lib/svg-parser'

interface Props {
  layers: SvgLayer[]
  hiddenLayers: Set<string>
  onToggle: (id: string) => void
}

export default function SvgLayerPanel({ layers, hiddenLayers, onToggle }: Props) {
  return (
    <div className="w-56 border-r border-gray-800 bg-gray-950 overflow-y-auto flex-shrink-0">
      <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-800">
        Layers
      </div>
      <ul>
        {layers.map((layer) => (
          <li key={layer.id}>
            <button
              onClick={() => onToggle(layer.id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 text-left text-sm transition-colors"
            >
              <span
                className={`w-4 h-4 flex-shrink-0 rounded border ${
                  hiddenLayers.has(layer.id)
                    ? 'border-gray-600'
                    : 'bg-purple-500 border-purple-500'
                }`}
              />
              <span
                className={
                  hiddenLayers.has(layer.id)
                    ? 'text-gray-600 line-through'
                    : 'text-gray-200'
                }
              >
                {layer.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
