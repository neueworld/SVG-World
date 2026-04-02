#!/usr/bin/env python3
"""
SVG Model Comparison Script
Runs benchmark prompts against three models and generates an HTML comparison report.

Models tested:
  1. StarVector 1B  — HuggingFace Space (free GPU via ZeroGPU)
  2. OmniSVG 3B     — HuggingFace Space (free GPU via ZeroGPU)
  3. WRLD-01        — Anthropic Claude API (our current model)

Usage:
  pip install gradio_client anthropic
  export ANTHROPIC_API_KEY=sk-ant-...
  python scripts/compare_models.py

  # Quick test with a single prompt (skips full benchmark):
  python scripts/compare_models.py --quick

  # List APIs of the Spaces without running generation:
  python scripts/compare_models.py --probe
"""

import os
import json
import time
import argparse
import re
from pathlib import Path
from datetime import datetime

# ─── Configuration ────────────────────────────────────────────────────────────

BENCHMARK_FILE = Path(__file__).parent.parent / "benchmarks" / "wrld-01-baseline.json"
OUTPUT_DIR = Path(__file__).parent.parent / "benchmarks" / "outputs"

# Only run "simple" complexity prompts by default (fast + cheap)
DEFAULT_COMPLEXITY_FILTER = ["simple"]

# Quick-test prompt (used with --quick flag)
QUICK_PROMPTS = [
    {"id": "quick-01", "style": "flat-icon", "prompt": "a lightning bolt"},
    {"id": "quick-02", "style": "holographic", "prompt": "a floating sphere with iridescent surface"},
    {"id": "quick-03", "style": "default", "prompt": "a mountain peak at golden hour"},
]

# WRLD-01 system prompts (must match lib/claude-svg.ts)
WRLD01_PROMPTS = {
    "default": """You are a world-class SVG illustrator with the aesthetic sensibility of a senior designer at a top creative studio. You create stunning, polished SVG illustrations that look genuinely impressive.
AESTHETICS & STYLE: Use rich, harmonious color palettes. Add visual depth with gradients (linearGradient, radialGradient), layered shapes, and subtle drop shadows.
TECHNICAL REQUIREMENTS: Begin your response directly with the <svg opening tag. No prose, no markdown, no code fences. Use viewBox="0 0 800 600" with width="100%" height="100%". Define all gradients inside a <defs> block. Use smooth bezier curves for organic shapes.
QUALITY BAR: The result should look like it belongs in a premium design portfolio.""",

    "flat-icon": """You are an expert icon and badge designer working in a bold, flat, Y2K-inspired vector style. Your output is always pure, crisp SVG with zero gradients, zero blur, and zero texture.
VISUAL STYLE: Background: near-black (#0A0A0A). Neon fills: hot pink (#FF2D9B), electric violet (#7C3AED), lime yellow (#D4F72B), cyan (#00D4FF). Bold geometric forms — circles, rounded squares, diamonds, starbursts.
TECHNICAL REQUIREMENTS: Begin your response directly with the <svg opening tag. Use viewBox="0 0 800 800". NO gradients. NO feGaussianBlur. Only flat fills. Pure vector craft.
QUALITY BAR: Bold, minimal, instantly readable. Like a limited-edition streetwear graphic.""",

    "holographic": """You are a premium editorial illustrator specializing in iridescent, holographic vector art. Your illustrations combine soft mesh gradients, 3D-illusion depth, and fluid organic shapes.
VISUAL STYLE: Background: off-white cream (#FAFAF8). Iridescent tones: coral rose (#F2896A), periwinkle blue (#8BA7E8), lavender (#C5A8E8). Fluid blob shapes. radialGradient highlights to suggest 3D surfaces.
TECHNICAL REQUIREMENTS: Begin your response directly with the <svg opening tag. Use viewBox="0 0 800 600". Use feGaussianBlur (stdDeviation 8-20) on glow layers. Every major form should use a gradient.
QUALITY BAR: Premium packaging design feel. Soft, beautiful, three-dimensional.""",
}

# ─── Model Runners ────────────────────────────────────────────────────────────

def run_starvector(prompt: str, probe_only: bool = False) -> str | None:
    """Call StarVector 1B via HuggingFace Space (gradio_client)."""
    try:
        from gradio_client import Client
        client = Client("starvector/starvector-1b-im2svg", verbose=False)

        if probe_only:
            print("\n[StarVector API]")
            client.view_api()
            return None

        # StarVector expects text input for text-to-SVG
        # Try common api_names; fall back to positional if needed
        try:
            result = client.predict(prompt, api_name="/generate_from_text")
        except Exception:
            try:
                result = client.predict(prompt, api_name="/predict")
            except Exception:
                result = client.predict(prompt)

        if isinstance(result, tuple):
            result = result[0]
        if isinstance(result, dict) and "value" in result:
            result = result["value"]

        svg = str(result).strip()
        if "<svg" not in svg:
            print(f"  [StarVector] Warning: output doesn't look like SVG")
        return svg

    except ImportError:
        print("  [StarVector] gradio_client not installed. Run: pip install gradio_client")
        return None
    except Exception as e:
        print(f"  [StarVector] Error: {e}")
        return None


def run_omnisvg(prompt: str, probe_only: bool = False) -> str | None:
    """Call OmniSVG 3B via HuggingFace Space (gradio_client)."""
    try:
        from gradio_client import Client
        client = Client("OmniSVG/OmniSVG-3B", verbose=False)

        if probe_only:
            print("\n[OmniSVG API]")
            client.view_api()
            return None

        # OmniSVG text-to-SVG mode
        try:
            result = client.predict(prompt, api_name="/text_to_svg")
        except Exception:
            try:
                result = client.predict(prompt, None, "text", api_name="/generate")
            except Exception:
                result = client.predict(prompt)

        if isinstance(result, tuple):
            result = result[0]
        if isinstance(result, dict) and "value" in result:
            result = result["value"]

        svg = str(result).strip()
        if "<svg" not in svg:
            print(f"  [OmniSVG] Warning: output doesn't look like SVG")
        return svg

    except ImportError:
        print("  [OmniSVG] gradio_client not installed. Run: pip install gradio_client")
        return None
    except Exception as e:
        print(f"  [OmniSVG] Error: {e}")
        return None


def run_wrld01(prompt: str, style: str = "default") -> str | None:
    """Call WRLD-01 (Claude claude-opus-4-6) directly via Anthropic SDK."""
    try:
        import anthropic
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            print("  [WRLD-01] ANTHROPIC_API_KEY not set — skipping")
            return None

        client = anthropic.Anthropic(api_key=api_key)
        system_prompt = WRLD01_PROMPTS.get(style, WRLD01_PROMPTS["default"])

        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=8192,
            system=system_prompt,
            messages=[{"role": "user", "content": f"Create an SVG illustration for: {prompt}"}],
        )
        svg = message.content[0].text.strip()
        # Strip any accidental markdown fences
        svg = re.sub(r"^```[a-z]*\n?", "", svg)
        svg = re.sub(r"\n?```$", "", svg)
        return svg.strip()

    except ImportError:
        print("  [WRLD-01] anthropic not installed. Run: pip install anthropic")
        return None
    except Exception as e:
        print(f"  [WRLD-01] Error: {e}")
        return None


# ─── HTML Report Generator ────────────────────────────────────────────────────

def generate_html_report(results: list[dict]) -> str:
    """Generate a standalone HTML comparison page."""
    cards = ""
    for r in results:
        model_cols = ""
        for model_name, svg_content in r["outputs"].items():
            if svg_content:
                # Embed SVG inline for instant rendering
                safe_svg = svg_content.replace("<script", "&lt;script").replace("</script>", "&lt;/script&gt;")
                preview = f'<div class="svg-preview">{safe_svg}</div>'
                status_cls = "ok"
                status_txt = "✓ Generated"
            else:
                preview = '<div class="svg-preview empty">No output</div>'
                status_cls = "err"
                status_txt = "✗ Failed"

            model_cols += f"""
            <div class="model-col">
              <div class="model-header">
                <span class="model-name">{model_name}</span>
                <span class="status {status_cls}">{status_txt}</span>
              </div>
              {preview}
            </div>"""

        style_badge = {
            "flat-icon": "badge-dark",
            "holographic": "badge-holo",
            "default": "badge-default",
        }.get(r["style"], "badge-default")

        cards += f"""
        <div class="prompt-card">
          <div class="prompt-meta">
            <span class="prompt-id">{r["id"]}</span>
            <span class="badge {style_badge}">{r["style"]}</span>
            <span class="complexity">{r["complexity"]}</span>
          </div>
          <p class="prompt-text">"{r["prompt"]}"</p>
          <div class="model-grid">{model_cols}</div>
        </div>"""

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M UTC")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WRLD-01 Model Comparison</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; color: #111; }}
  header {{ background: #0a0a0a; color: white; padding: 24px 32px; }}
  header h1 {{ font-size: 1.4rem; font-weight: 700; letter-spacing: -0.01em; }}
  header p {{ font-size: 0.85rem; color: #888; margin-top: 4px; }}
  main {{ max-width: 1400px; margin: 0 auto; padding: 32px; }}
  .prompt-card {{ background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px; }}
  .prompt-meta {{ display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }}
  .prompt-id {{ font-family: monospace; font-size: 0.75rem; color: #9ca3af; }}
  .badge {{ display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }}
  .badge-dark {{ background: #111; color: #f0f0f0; }}
  .badge-holo {{ background: #ede9fe; color: #6d28d9; }}
  .badge-default {{ background: #f3f4f6; color: #374151; }}
  .complexity {{ font-size: 0.75rem; color: #9ca3af; text-transform: capitalize; }}
  .prompt-text {{ font-size: 1rem; color: #374151; margin-bottom: 16px; font-style: italic; }}
  .model-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }}
  .model-col {{ border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }}
  .model-header {{ display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }}
  .model-name {{ font-size: 0.8rem; font-weight: 600; color: #374151; }}
  .status {{ font-size: 0.7rem; }}
  .status.ok {{ color: #16a34a; }}
  .status.err {{ color: #dc2626; }}
  .svg-preview {{ width: 100%; aspect-ratio: 1; background: #fafafa; display: flex; align-items: center; justify-content: center; overflow: hidden; }}
  .svg-preview svg {{ width: 100%; height: 100%; }}
  .svg-preview.empty {{ color: #d1d5db; font-size: 0.8rem; }}
  @media (max-width: 900px) {{ .model-grid {{ grid-template-columns: 1fr; }} }}
</style>
</head>
<body>
<header>
  <h1>WRLD-01 Model Comparison</h1>
  <p>Generated {timestamp} · StarVector 1B vs OmniSVG 3B vs WRLD-01 (Claude claude-opus-4-6)</p>
</header>
<main>
  {cards}
</main>
</body>
</html>"""


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Compare SVG generation models")
    parser.add_argument("--quick", action="store_true", help="Run 3 quick prompts only")
    parser.add_argument("--probe", action="store_true", help="Print Space APIs without generating")
    parser.add_argument("--complexity", nargs="+", default=DEFAULT_COMPLEXITY_FILTER,
                        help="Complexity tiers to test: simple medium complex (default: simple)")
    parser.add_argument("--skip-starvector", action="store_true")
    parser.add_argument("--skip-omnisvg", action="store_true")
    parser.add_argument("--skip-wrld01", action="store_true")
    args = parser.parse_args()

    # Probe mode — just show the Space APIs
    if args.probe:
        print("Probing HuggingFace Space APIs...\n")
        run_starvector("", probe_only=True)
        run_omnisvg("", probe_only=True)
        return

    # Load prompts
    if args.quick:
        prompts = QUICK_PROMPTS
        print(f"Quick mode: running {len(prompts)} prompts\n")
    else:
        with open(BENCHMARK_FILE) as f:
            benchmark = json.load(f)
        prompts = [
            p for p in benchmark["prompts"]
            if p.get("complexity", "simple") in args.complexity
        ]
        print(f"Benchmark mode: running {len(prompts)} prompts (complexity: {args.complexity})\n")

    # Create output dirs
    models = []
    if not args.skip_starvector:
        models.append("starvector-1b")
    if not args.skip_omnisvg:
        models.append("omnisvg-3b")
    if not args.skip_wrld01:
        models.append("wrld-01")

    for model in models:
        (OUTPUT_DIR / model).mkdir(parents=True, exist_ok=True)

    results = []

    for p in prompts:
        prompt_id = p["id"]
        prompt_text = p["prompt"]
        style = p.get("style", "default")
        complexity = p.get("complexity", "simple")

        print(f"── {prompt_id} [{style}] ──────────────────────────")
        print(f"   Prompt: \"{prompt_text}\"")

        outputs = {}

        # StarVector 1B
        if "starvector-1b" in models:
            print(f"   Running StarVector 1B...", end=" ", flush=True)
            t0 = time.time()
            svg = run_starvector(prompt_text)
            elapsed = time.time() - t0
            if svg and "<svg" in svg:
                path = OUTPUT_DIR / "starvector-1b" / f"{prompt_id}.svg"
                path.write_text(svg)
                print(f"✓ ({elapsed:.1f}s, {len(svg)} chars)")
            else:
                print(f"✗ ({elapsed:.1f}s)")
            outputs["StarVector 1B"] = svg

        # OmniSVG 3B
        if "omnisvg-3b" in models:
            print(f"   Running OmniSVG 3B...", end=" ", flush=True)
            t0 = time.time()
            svg = run_omnisvg(prompt_text)
            elapsed = time.time() - t0
            if svg and "<svg" in svg:
                path = OUTPUT_DIR / "omnisvg-3b" / f"{prompt_id}.svg"
                path.write_text(svg)
                print(f"✓ ({elapsed:.1f}s, {len(svg)} chars)")
            else:
                print(f"✗ ({elapsed:.1f}s)")
            outputs["OmniSVG 3B"] = svg

        # WRLD-01 (Claude)
        if "wrld-01" in models:
            print(f"   Running WRLD-01...", end=" ", flush=True)
            t0 = time.time()
            svg = run_wrld01(prompt_text, style=style)
            elapsed = time.time() - t0
            if svg and "<svg" in svg:
                path = OUTPUT_DIR / "wrld-01" / f"{prompt_id}.svg"
                path.write_text(svg)
                print(f"✓ ({elapsed:.1f}s, {len(svg)} chars)")
            else:
                print(f"✗ ({elapsed:.1f}s)")
            outputs["WRLD-01"] = svg

        results.append({
            "id": prompt_id,
            "prompt": prompt_text,
            "style": style,
            "complexity": complexity,
            "outputs": outputs,
        })
        print()

    # Save JSON results summary
    summary_path = OUTPUT_DIR / "results.json"
    summary = [
        {
            "id": r["id"],
            "prompt": r["prompt"],
            "style": r["style"],
            "complexity": r["complexity"],
            "outputs": {k: bool(v and "<svg" in v) for k, v in r["outputs"].items()},
        }
        for r in results
    ]
    summary_path.write_text(json.dumps(summary, indent=2))

    # Generate HTML comparison report
    html = generate_html_report(results)
    html_path = OUTPUT_DIR / "comparison.html"
    html_path.write_text(html)

    print(f"✓ Results saved to: {OUTPUT_DIR}/")
    print(f"✓ HTML report:      {html_path}")
    print(f"\nOpen the report in your browser:")
    print(f"  open {html_path}")


if __name__ == "__main__":
    main()
