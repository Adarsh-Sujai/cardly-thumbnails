import Monaco, { type OnMount } from '@monaco-editor/react'

interface Props {
  value: string
  onChange: (next: string) => void
}

export function Editor({ value, onChange }: Props) {
  const handleMount: OnMount = (editor) => {
    // Soft-wrap long inline-style strings; saves a lot of horizontal scroll.
    editor.updateOptions({ wordWrap: 'on' })
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <Monaco
        height="100%"
        defaultLanguage="html"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? '')}
        onMount={handleMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
          tabSize: 2,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: 'gutter',
          guides: { indentation: false },
        }}
      />
    </div>
  )
}
