import type { FieldSpec, Template } from '../types'

interface Props {
  template: Template
  values: Record<string, string>
  onChange: (next: Record<string, string>) => void
  onResetField: (key: string) => void
}

export function FormEditor({ template, values, onChange, onResetField }: Props) {
  const fields = template.fields ?? []

  const set = (key: string, value: string) => onChange({ ...values, [key]: value })

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-panel">
      <div className="border-b border-border bg-bg/60 px-5 py-4">
        <div className="text-sm font-semibold text-text">{template.label}</div>
        <div className="mt-1 text-xs text-muted">
          Fill in the fields below to update your image. Switch to <span className="text-text">Code</span> mode at the top to edit the raw HTML.
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {fields.length === 0 && (
          <div className="text-xs text-muted">This template has no editable fields. Switch to Code mode to customize it.</div>
        )}
        {fields.map((f) => (
          <Field
            key={f.key}
            spec={f}
            value={values[f.key] ?? ''}
            onChange={(v) => set(f.key, v)}
            onReset={() => onResetField(f.key)}
          />
        ))}
      </div>
    </div>
  )
}

function Field({
  spec,
  value,
  onChange,
  onReset,
}: {
  spec: FieldSpec
  value: string
  onChange: (v: string) => void
  onReset: () => void
}) {
  const isDirty = value !== spec.default

  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-text">{spec.label}</span>
        {isDirty && (
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] uppercase tracking-wider text-muted hover:text-accent"
          >
            reset
          </button>
        )}
      </div>

      {spec.type === 'textarea' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="resize-y rounded border border-border bg-bg px-2.5 py-1.5 text-sm text-text focus:border-accent focus:outline-none"
        />
      )}

      {spec.type === 'text' && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded border border-border bg-bg px-2.5 py-1.5 text-sm text-text focus:border-accent focus:outline-none"
        />
      )}

      {spec.type === 'color' && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={normalizeColor(value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-border bg-bg"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 rounded border border-border bg-bg px-2.5 py-1.5 font-mono text-xs text-text focus:border-accent focus:outline-none"
          />
        </div>
      )}

      {spec.hint && <span className="text-[11px] text-muted">{spec.hint}</span>}
    </label>
  )
}

// HTML <input type="color"> only accepts #RRGGBB. If the field has anything else
// (rgba, hsl, named), fall back to #000000 for the swatch so the picker still renders.
function normalizeColor(v: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v : '#000000'
}
