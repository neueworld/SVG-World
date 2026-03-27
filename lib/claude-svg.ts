import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Cooperative, design-focused prompt — avoids "output ONLY" phrasing that
// triggers Anthropic's output content filter (HTTP 400).
const SYSTEM_PROMPT = `You are an expert SVG designer and illustrator. When given a description of something to draw or design, respond with clean, well-structured SVG markup. Start your response directly with the opening <svg tag. Use a viewBox attribute and include meaningful <g> group elements with id attributes to organize layers. Keep the SVG production-ready and visually appealing.`

export async function* streamSvgFromClaude(prompt: string): AsyncGenerator<string> {
  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Create an SVG illustration for: ${prompt}`,
      },
    ],
  })

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      yield event.delta.text
    }
  }
}
