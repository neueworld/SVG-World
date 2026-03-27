import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { streamSvgFromClaude } from '@/lib/claude-svg'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return new Response('Missing prompt', { status: 400 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamSvgFromClaude(prompt.trim())) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        let message = 'An error occurred while generating the SVG.'
        if (err instanceof Anthropic.BadRequestError) {
          if (err.message.includes('content filtering') || err.message.includes('Output blocked')) {
            message = 'Content policy blocked this request. Try rephrasing your prompt.'
          } else {
            message = `Bad request: ${err.message}`
          }
        } else if (err instanceof Anthropic.AuthenticationError) {
          message = 'Invalid API key. Please check your ANTHROPIC_API_KEY.'
        } else if (err instanceof Anthropic.RateLimitError) {
          message = 'Rate limit reached. Please wait a moment and try again.'
        } else if (err instanceof Anthropic.APIError) {
          message = `API error (${err.status}): ${err.message}`
        } else if (err instanceof Error) {
          message = err.message
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
