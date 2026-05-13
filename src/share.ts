import LZString from 'lz-string'
import type { RenderSettings } from './types'

interface SharePayload {
  v: 1
  html: string
  settings: RenderSettings
}

export function encodeState(html: string, settings: RenderSettings): string {
  const payload: SharePayload = { v: 1, html, settings }
  return LZString.compressToEncodedURIComponent(JSON.stringify(payload))
}

export function decodeState(encoded: string): SharePayload | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    const data = JSON.parse(json) as SharePayload
    if (data.v !== 1 || typeof data.html !== 'string' || !data.settings) return null
    return data
  } catch {
    return null
  }
}

export function readFromHash(): SharePayload | null {
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return null
  return decodeState(hash)
}

export function writeToHash(html: string, settings: RenderSettings): string {
  const encoded = encodeState(html, settings)
  // Use replaceState to avoid spamming history while user types.
  history.replaceState(null, '', `#${encoded}`)
  return `${location.origin}${location.pathname}#${encoded}`
}
