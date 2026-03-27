import SvgEditor from '@/components/svg/SvgEditor'

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b border-gray-800 px-6 py-3 flex items-center gap-3 flex-shrink-0">
        <a href="/" className="text-purple-400 hover:text-purple-300 font-bold text-lg transition-colors">
          SVG World
        </a>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400 text-sm">Editor</span>
      </header>
      <div className="flex-1 overflow-hidden">
        <SvgEditor />
      </div>
    </div>
  )
}
