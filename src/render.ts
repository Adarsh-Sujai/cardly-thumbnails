import satori from 'satori'
import { html as satoriHtml } from 'satori-html'
import { initWasm, Resvg } from '@resvg/resvg-wasm'
import resvgWasmUrl from '@resvg/resvg-wasm/index_bg.wasm?url'
import { loadFonts, fontCssFamily } from './fonts'
import type { RenderSettings } from './types'

let wasmReady: Promise<void> | null = null
function ensureWasm() {
  if (!wasmReady) wasmReady = initWasm(fetch(resvgWasmUrl))
  return wasmReady
}

export interface RenderResult {
  svg: string
  png: Uint8Array
}

// Satori rejects divs whose only children are whitespace text nodes,
// so we collapse whitespace between tags. This matches the behavior most
// users expect when they format their HTML for readability.
function normalizeHtml(input: string): string {
  return input.replace(/>\s+</g, '><').trim()
}

export async function renderToSvg(htmlSource: string, settings: RenderSettings): Promise<string> {
  const fonts = await loadFonts(settings.fontFamily)
  const node = satoriHtml(normalizeHtml(htmlSource))
  const svg = await satori(node as Parameters<typeof satori>[0], {
    width: settings.width,
    height: settings.height,
    fonts: fonts.length
      ? fonts
      : // Satori requires at least one font. If load failed, throw a clear error.
        (() => {
          throw new Error(`Failed to load font '${fontCssFamily(settings.fontFamily)}'. Check your network connection.`)
        })(),
    debug: settings.debug,
  })
  return svg
}

export async function renderToPng(svg: string, width: number): Promise<Uint8Array> {
  await ensureWasm()
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: false },
  })
  return resvg.render().asPng()
}

export async function render(htmlSource: string, settings: RenderSettings): Promise<RenderResult> {
  const svg = await renderToSvg(htmlSource, settings)
  const png = await renderToPng(svg, settings.width)
  return { svg, png }
}
