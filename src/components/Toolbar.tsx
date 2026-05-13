import { useState } from 'react'
import { FONTS } from '../fonts'
import { TEMPLATES } from '../templates'
import type { EditorMode, RenderSettings, Template } from '../types'

interface Props {
  settings: RenderSettings
  onChange: (next: RenderSettings) => void
  onLoadTemplate: (t: Template) => void
  onExportPng: () => void
  onExportSvg: () => void
  onCopyShareUrl: () => Promise<string>
  mode: EditorMode
  onChangeMode: (m: EditorMode) => void
  canFormMode: boolean
}

export function Toolbar({
  settings,
  onChange,
  onLoadTemplate,
  onExportPng,
  onExportSvg,
  onCopyShareUrl,
  mode,
  onChangeMode,
  canFormMode,
}: Props) {
  const [copied, setCopied] = useState(false)

  const set = <K extends keyof RenderSettings>(key: K, value: RenderSettings[K]) =>
    onChange({ ...settings, [key]: value })

  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-panel px-4 py-2.5">
      <div className="flex items-center gap-2 text-text font-semibold tracking-tight">
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent" />
        Cardly
      </div>

      <div className="mx-2 h-5 w-px bg-border" />

      <div className="flex items-center overflow-hidden rounded border border-border text-xs">
        <button
          type="button"
          onClick={() => onChangeMode('form')}
          disabled={!canFormMode && mode !== 'form'}
          title={canFormMode ? 'Edit using simple form fields' : 'Pick a template to enable Form mode'}
          className={`px-2.5 py-1 ${mode === 'form' ? 'bg-accent/30 text-text' : 'bg-bg text-muted hover:text-text'} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Form
        </button>
        <button
          type="button"
          onClick={() => onChangeMode('code')}
          title="Edit raw HTML"
          className={`px-2.5 py-1 ${mode === 'code' ? 'bg-accent/30 text-text' : 'bg-bg text-muted hover:text-text'}`}
        >
          Code
        </button>
      </div>

      <label className="flex items-center gap-2 text-xs text-muted">
        Template
        <select
          className="rounded bg-bg border border-border px-2 py-1 text-text text-xs"
          onChange={(e) => {
            const t = TEMPLATES.find((x) => x.id === e.target.value)
            if (t) onLoadTemplate(t)
          }}
          value=""
        >
          <option value="" disabled>
            Load…
          </option>
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label} - {t.description}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-xs text-muted">
        Font
        <select
          className="rounded bg-bg border border-border px-2 py-1 text-text text-xs"
          value={settings.fontFamily}
          onChange={(e) => set('fontFamily', e.target.value as RenderSettings['fontFamily'])}
        >
          {Object.values(FONTS).map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-xs text-muted">
        W
        <input
          type="number"
          min={100}
          max={4000}
          step={10}
          className="w-20 rounded bg-bg border border-border px-2 py-1 text-text text-xs"
          value={settings.width}
          onChange={(e) => set('width', Number(e.target.value) || settings.width)}
        />
      </label>

      <label className="flex items-center gap-2 text-xs text-muted">
        H
        <input
          type="number"
          min={100}
          max={4000}
          step={10}
          className="w-20 rounded bg-bg border border-border px-2 py-1 text-text text-xs"
          value={settings.height}
          onChange={(e) => set('height', Number(e.target.value) || settings.height)}
        />
      </label>

      <label className="flex items-center gap-2 text-xs text-muted select-none">
        <input
          type="checkbox"
          checked={settings.debug}
          onChange={(e) => set('debug', e.target.checked)}
        />
        Debug
      </label>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="rounded border border-border bg-bg px-3 py-1 text-xs text-text hover:border-accent"
          onClick={async () => {
            const url = await onCopyShareUrl()
            try {
              await navigator.clipboard.writeText(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 1400)
            } catch {
              // clipboard may be blocked; URL is still in the address bar
            }
          }}
        >
          {copied ? 'Copied!' : 'Share'}
        </button>
        <button
          className="rounded border border-border bg-bg px-3 py-1 text-xs text-text hover:border-accent"
          onClick={onExportSvg}
        >
          Export SVG
        </button>
        <button
          className="rounded border border-accent bg-accent/20 px-3 py-1 text-xs text-text hover:bg-accent/30"
          onClick={onExportPng}
        >
          Export PNG
        </button>
      </div>
    </header>
  )
}
