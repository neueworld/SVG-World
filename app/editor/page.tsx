import Link from 'next/link'
import SvgEditor from '@/components/svg/SvgEditor'

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200 px-5 py-3 flex items-center gap-3 flex-shrink-0 bg-white">
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 hover:text-violet-600 transition-colors text-sm">
          SVG World
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500 text-sm">Editor</span>
        <span className="ml-auto text-[10px] font-semibold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full tracking-widest uppercase">
          WRLD-01
        </span>
      </header>
      <div className="flex-1 overflow-hidden">
        <SvgEditor />
      </div>
    </div>
  )
}
