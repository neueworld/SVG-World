export interface SvgLayer {
  id: string
  label: string
  visible: boolean
}

export function parseSvgLayers(svg: string): SvgLayer[] {
  const layers: SvgLayer[] = []
  const groupRegex = /<g([^>]*)>/gi
  let match: RegExpExecArray | null

  while ((match = groupRegex.exec(svg)) !== null) {
    const attrs = match[1]
    const idMatch = attrs.match(/id="([^"]+)"/)
    const labelMatch = attrs.match(/(?:inkscape:label|data-label)="([^"]+)"/)
    if (idMatch) {
      layers.push({
        id: idMatch[1],
        label: labelMatch ? labelMatch[1] : idMatch[1],
        visible: true,
      })
    }
  }

  return layers
}

export function extractSvgDimensions(svg: string): { width: number; height: number } {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/)
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/[\s,]+/)
    if (parts.length === 4) {
      return { width: parseFloat(parts[2]), height: parseFloat(parts[3]) }
    }
  }
  const widthMatch = svg.match(/width="([0-9.]+)"/)
  const heightMatch = svg.match(/height="([0-9.]+)"/)
  return {
    width: widthMatch ? parseFloat(widthMatch[1]) : 800,
    height: heightMatch ? parseFloat(heightMatch[1]) : 600,
  }
}

export function sanitizeSvg(svg: string): string {
  return svg
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\bon\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\bon\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}
