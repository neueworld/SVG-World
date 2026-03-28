# Contributing to SVG World

Thanks for your interest in contributing. SVG World is open source under AGPL-3.0 — all improvements stay open.

## Quick links

- [Open issues](https://github.com/neueworld/SVG-World/issues)
- [Docs: Contributing guide](https://svg-world.vercel.app/docs/contributing)
- [Docs: WRLD-01 model](https://svg-world.vercel.app/docs/wrld-01)

---

## Local setup

```bash
# 1. Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/SVG-World.git
cd SVG-World

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Edit .env.local — add your ANTHROPIC_API_KEY

# 4. Start dev server
npm run dev
# Visit http://localhost:3000
```

**Requirements:** Node.js 18+, npm 9+

---

## Areas we welcome contributions

| Area | Location | Notes |
|------|----------|-------|
| WRLD-01 prompt quality | `lib/claude-svg.ts` | Highest leverage — include before/after SVG examples |
| New export formats | `components/svg/SvgToolbar.tsx` | PNG, PDF, etc. |
| SVG editing tools | `components/svg/` | Path editing, color picker, transform |
| Vectorization quality | `lib/vectorize.ts` | potrace options, preprocessing |
| Docs improvements | `app/docs/` | Examples, clarity, translations |
| Bug fixes | anywhere | Check open issues |
| Performance | anywhere | Bundle size, streaming latency |

---

## Submitting a PR

1. **Branch** off `main`: `git checkout -b feat/my-feature`
2. **Build** must pass: `npm run build` (zero TypeScript errors, strict mode)
3. **Commit** clearly — describe the *why*, not just the *what*
4. **PR** against `main` — keep it focused (one concern per PR)

### Improving WRLD-01

The system prompt in `lib/claude-svg.ts` is the core of WRLD-01. When submitting prompt changes:

- Include the exact diff
- Show **3+ before/after SVG pairs** (same prompt, old vs new)
- Describe what design quality dimension improved

### Adding dependencies

Open an issue for discussion before adding a new npm package. We keep the dependency tree lean.

---

## Code standards

- **TypeScript strict** — no `any` without justification
- **No unused imports** — keep files clean
- **No new dark-mode styles** — the UI is light mode
- **AGPL-3.0** — your contribution will be open source; don't include code under incompatible licenses

---

## Reporting bugs

Open an issue with:

1. What you did
2. What you expected
3. What actually happened
4. Browser / OS if it's a UI bug
5. The SVG prompt if it's a generation bug

---

## License

By contributing, you agree that your changes will be licensed under [AGPL-3.0](./LICENSE).
