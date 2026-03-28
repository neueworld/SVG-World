'use client'

import type { SvgLayer } from '@/lib/svg-parser'

interface Props {
  layers: SvgLayer[]
  hiddenLayers: Set<string>
  onToggle: (id: string) => void
}

export default function SvgLayerPanel({ layers, hiddenLayers, onToggle }: Props) {
  return (
    <div className="w-52 border-r border-gray-200 bg-gray-50 overflow-y-auto flex-shrink-0">
      <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-200 bg-white">
        Layers
      </div>
      <ul className="py-1">
        {layers.map((layer) => (
          <li key={layer.id}>
            <button
              onClick={() => onToggle(layer.id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-left text-sm transition-colors"
            >
              <span
                className={`w-3.5 h-3.5 flex-shrink-0 rounded-sm border transition-colors ${
                  hiddenLayers.has(layer.id)
                    ? 'border-gray-300 bg-white'
                    : 'bg-violet-500 border-violet-500'
                }`}
              />
              <span
                className={`truncate transition-colors ${
                  hiddenLayers.has(layer.id)
                    ? 'text-gray-400 line-through'
                    : 'text-gray-700'
                }`}
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
