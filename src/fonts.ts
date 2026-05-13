import type { FontDef, FontKey } from './types'

// We bundle TTF files in /public/fonts so Satori can use them directly
// (Satori does not accept woff/woff2, only TTF/OTF). Variable TTFs work too.
//
// To add a new font: drop a .ttf in public/fonts/ and add an entry here.

export interface FontFile {
  url: string
  weight: 400 | 600 | 700 | 800 | 900
  style: 'normal' | 'italic'
}

export const FONTS: Record<FontKey, FontDef & { files: FontFile[] }> = {
  inter: {
    key: 'inter',
    label: 'Inter',
    cssUrl: '',
    files: [
      { url: 'fonts/Inter-Regular.otf', weight: 400, style: 'normal' },
      { url: 'fonts/Inter-SemiBold.otf', weight: 600, style: 'normal' },
      { url: 'fonts/Inter-Bold.otf', weight: 700, style: 'normal' },
      { url: 'fonts/Inter-ExtraBold.otf', weight: 800, style: 'normal' },
    ],
  },
  'plex-mono': {
    key: 'plex-mono',
    label: 'IBM Plex Mono',
    cssUrl: '',
    files: [
      { url: 'fonts/IBMPlexMono-Regular.ttf', weight: 400, style: 'normal' },
      { url: 'fonts/IBMPlexMono-Bold.ttf', weight: 700, style: 'normal' },
    ],
  },
}

interface LoadedFont {
  name: string
  data: ArrayBuffer
  weight: 400 | 600 | 700 | 800 | 900
  style: 'normal' | 'italic'
}

const cache = new Map<FontKey, LoadedFont[]>()

export async function loadFonts(key: FontKey): Promise<LoadedFont[]> {
  const cached = cache.get(key)
  if (cached) return cached

  const def = FONTS[key]
  // Resolve URLs relative to Vite's base path so it works on GitHub Pages too.
  const base = import.meta.env.BASE_URL
  const buffers = await Promise.all(
    def.files.map(async (f) => {
      const res = await fetch(`${base}${f.url}`)
      if (!res.ok) throw new Error(`Failed to load font ${f.url}: ${res.status}`)
      return {
        name: def.label,
        data: await res.arrayBuffer(),
        weight: f.weight,
        style: f.style,
      } satisfies LoadedFont
    }),
  )

  cache.set(key, buffers)
  return buffers
}

export function fontCssFamily(key: FontKey): string {
  return FONTS[key].label
}
