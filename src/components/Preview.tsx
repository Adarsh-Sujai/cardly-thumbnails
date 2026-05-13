import { useMemo, useState } from 'react'

interface Props {
  svg: string | null
  error: string | null
  rendering: boolean
  width: number
  height: number
}

export function Preview({ svg, error, rendering, width, height }: Props) {
  const [zoomMode, setZoomMode] = useState<'fit' | 1>('fit')

  const dataUrl = useMemo(() => {
    if (!svg) return null
    // Encode as data URL so the browser renders it as a raster-friendly image.
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }, [svg])

  return (
    <div className="flex h-full w-full flex-col bg-bg">
      <div className="flex items-center justify-between border-b border-border bg-panel px-4 py-2 text-xs text-muted">
        <div>
          Preview · <span className="text-text">{width}×{height}</span>
          {rendering && <span className="ml-3 text-accent">rendering…</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`rounded border border-border px-2 py-0.5 ${zoomMode === 'fit' ? 'bg-bg text-text' : 'text-muted'}`}
            onClick={() => setZoomMode('fit')}
          >
            Fit
          </button>
          <button
            className={`rounded border border-border px-2 py-0.5 ${zoomMode === 1 ? 'bg-bg text-text' : 'text-muted'}`}
            onClick={() => setZoomMode(1)}
          >
            100%
          </button>
        </div>
      </div>

      <div className="checker relative flex-1 overflow-auto">
        <div className="flex min-h-full min-w-full items-center justify-center p-6">
          {error ? (
            <pre className="max-w-2xl whitespace-pre-wrap rounded border border-red-500/50 bg-red-500/10 p-4 text-xs text-red-300">
              {error}
            </pre>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt="OG preview"
              style={
                zoomMode === 'fit'
                  ? { maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }
                  : { width, height }
              }
              className="shadow-2xl"
            />
          ) : (
            <div className="text-sm text-muted">Loading…</div>
          )}
        </div>
      </div>
    </div>
  )
}
