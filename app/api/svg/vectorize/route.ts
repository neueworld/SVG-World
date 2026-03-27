import { NextRequest } from 'next/server'
import { vectorizeImage } from '@/lib/vectorize'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('image')

  if (!file || !(file instanceof Blob)) {
    return new Response('Missing image file', { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const svg = await vectorizeImage(buffer)
    return new Response(svg, {
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Vectorization failed'
    return new Response(message, { status: 500 })
  }
}
