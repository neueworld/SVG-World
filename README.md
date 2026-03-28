# SVG World

**AI-powered SVG generation, powered by WRLD-01.** Describe anything in plain English and get production-ready, layered vector graphics in seconds.

> An open source alternative to QuiverAI — built in public, free to use.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-violet.svg)](LICENSE)

---

## Features

- **WRLD-01 generation** — stream SVGs live as the AI draws them, token by token
- **Image vectorization** — upload PNG/JPG, get a traced SVG via potrace + sharp
- **Layer panel** — toggle individual `<g>` layers on/off in the preview
- **One-click export** — download or copy raw SVG
- **Light mode UI** — clean, OpenAI-inspired interface

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| AI | WRLD-01 via `@anthropic-ai/sdk` |
| Vectorization | `sharp` + `potrace` |
| Styling | Tailwind CSS v3 |
| Language | TypeScript (strict) |
| Analytics | Vercel Analytics |
| License | AGPL-3.0 |

## Getting started

```bash
# 1. Clone
git clone https://github.com/neueworld/SVG-World.git
cd SVG-World

# 2. Install
npm install

# 3. Configure
cp .env.local.example .env.local
# Edit .env.local → add ANTHROPIC_API_KEY

# 4. Run
npm run dev
# Open http://localhost:3000
```

Get an API key at [console.anthropic.com](https://console.anthropic.com).

## Project structure

```
app/
  page.tsx                    # Landing page
  editor/page.tsx             # SVG editor
  docs/                       # Documentation
  api/svg/
    generate/route.ts         # SSE streaming (WRLD-01)
    vectorize/route.ts        # Image → SVG
components/
  Nav.tsx / Footer.tsx        # Shared layout
  svg/
    SvgEditor.tsx             # Editor orchestrator
    SvgPreview.tsx / SvgLayerPanel.tsx / SvgToolbar.tsx
lib/
  claude-svg.ts               # WRLD-01 system prompt + streaming
  vectorize.ts                # potrace/sharp pipeline
  svg-parser.ts               # Layer parsing + sanitization
```

## WRLD-01

WRLD-01 is our model for SVG generation. It understands color theory, composition, layering, and visual design. Versioning follows `WRLD-[major].[minor]`:

| Version | Status | Focus |
|---------|--------|-------|
| **WRLD-01** | ✅ Live | Scenes, abstract art, icons |
| WRLD-01.1 | Planned | Color fidelity, complex scenes |
| WRLD-01.2 | Planned | SMIL animation support |

[Read the full model docs →](https://svg-world.vercel.app/docs/wrld-01)

## Deploy

**Vercel (recommended):**
1. Import `neueworld/SVG-World` at [vercel.com](https://vercel.com)
2. Add `ANTHROPIC_API_KEY` to environment variables
3. Deploy — done

## API

The WRLD-01 API (`POST /api/svg/generate`) streams SVGs over SSE. Managed API keys with rate limiting are in development. [Read the API docs →](https://svg-world.vercel.app/docs/api-keys)

## Contributing

PRs welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first — the highest-leverage contribution is improving the WRLD-01 system prompt in `lib/claude-svg.ts`.

## License

[AGPL-3.0](LICENSE) — all modifications must remain open source.
