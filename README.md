# SVG World

An open source, AI-powered SVG generator. Describe what you want and get production-ready scalable vector graphics instantly — streamed live as Claude draws them.

> A free, open alternative to QuiverAI.

## Features

- **AI Generation** — Describe any image and Claude streams back clean, layered SVG markup in real time
- **Image Vectorization** — Upload a PNG/JPG and convert it to SVG via potrace
- **Layer Panel** — Toggle individual `<g>` layers on/off in the preview
- **Export** — Download or copy the raw SVG with one click
- **Dark UI** — Clean editor interface built with Tailwind CSS

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| AI | Claude via `@anthropic-ai/sdk` |
| Vectorization | `sharp` + `potrace` |
| Styling | Tailwind CSS v3 |
| Language | TypeScript (strict) |
| License | AGPL-3.0 |

## Getting Started

### 1. Clone

```bash
git clone https://github.com/neueworld/SVG-World.git
cd SVG-World
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

```bash
cp .env.local.example .env.local
# Edit .env.local and add your Anthropic API key
```

```env
ANTHROPIC_API_KEY=your_api_key_here
```

Get an API key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                   # Landing page
  editor/page.tsx            # SVG editor
  api/svg/generate/route.ts  # SSE streaming generation endpoint
  api/svg/vectorize/route.ts # Image-to-SVG endpoint
lib/
  claude-svg.ts              # Claude API streaming integration
  vectorize.ts               # Image vectorization (sharp + potrace)
  svg-parser.ts              # SVG layer parsing + sanitization
components/svg/
  SvgEditor.tsx              # Main editor orchestrator
  SvgPreview.tsx             # Live SVG preview pane
  SvgLayerPanel.tsx          # Layer toggle sidebar
  SvgToolbar.tsx             # Prompt input + action buttons
```

## Contributing

PRs welcome. This project is AGPL-3.0 licensed — contributions must remain open source.

## License

[AGPL-3.0](./LICENSE)
