import sharp from 'sharp'
import potrace from 'potrace'

export async function vectorizeImage(buffer: Buffer): Promise<string> {
  // Convert to grayscale PNG via sharp
  const grayscale = await sharp(buffer)
    .grayscale()
    .png()
    .toBuffer()

  // Trace to SVG via potrace
  return new Promise<string>((resolve, reject) => {
    potrace.trace(grayscale, { threshold: 128, turdSize: 2, optCurve: true }, (err, svg) => {
      if (err) reject(err)
      else resolve(svg)
    })
  })
}
