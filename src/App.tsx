import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Toolbar } from './components/Toolbar'
import { Editor } from './components/Editor'
import { FormEditor } from './components/FormEditor'
import { Preview } from './components/Preview'
import { renderToSvg, renderToPng } from './render'
import { applyFields, defaultFieldValues, DEFAULT_TEMPLATE } from './templates'
import { readFromHash, writeToHash } from './share'
import type { EditorMode, RenderSettings, Template } from './types'

const DEFAULT_SETTINGS: RenderSettings = {
  width: 1200,
  height: 630,
  debug: false,
  fontFamily: 'inter',
}

function App() {
  const initial = useMemo(() => {
    const fromHash = readFromHash()
    if (fromHash) {
      // Hashed state is always treated as Code mode - we don't know which template
      // generated it (or whether it was edited freehand).
      return {
        mode: 'code' as EditorMode,
        template: DEFAULT_TEMPLATE,
        fieldValues: defaultFieldValues(DEFAULT_TEMPLATE),
        codeHtml: fromHash.html,
        settings: fromHash.settings,
      }
    }
    return {
      mode: 'form' as EditorMode,
      template: DEFAULT_TEMPLATE,
      fieldValues: defaultFieldValues(DEFAULT_TEMPLATE),
      codeHtml: applyFields(DEFAULT_TEMPLATE.html, defaultFieldValues(DEFAULT_TEMPLATE)),
      settings: DEFAULT_SETTINGS,
    }
  }, [])

  const [mode, setMode] = useState<EditorMode>(initial.mode)
  const [template, setTemplate] = useState<Template>(initial.template)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(initial.fieldValues)
  const [codeHtml, setCodeHtml] = useState<string>(initial.codeHtml)
  const [settings, setSettings] = useState<RenderSettings>(initial.settings)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rendering, setRendering] = useState(false)

  // The HTML actually sent to Satori. In form mode this is derived from the
  // template + field values; in code mode it's the raw editor buffer.
  const renderedHtml = useMemo(
    () => (mode === 'form' ? applyFields(template.html, fieldValues) : codeHtml),
    [mode, template, fieldValues, codeHtml],
  )

  // Discard out-of-order renders so a slow one doesn't overwrite a fresh one.
  const renderTokenRef = useRef(0)

  const doRender = useCallback(async (htmlInput: string, s: RenderSettings) => {
    const token = ++renderTokenRef.current
    setRendering(true)
    try {
      const next = await renderToSvg(htmlInput, s)
      if (token !== renderTokenRef.current) return
      setSvg(next)
      setError(null)
    } catch (err) {
      if (token !== renderTokenRef.current) return
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      if (token === renderTokenRef.current) setRendering(false)
    }
  }, [])

  // Debounced live render and hash sync.
  useEffect(() => {
    const id = setTimeout(() => {
      doRender(renderedHtml, settings)
      writeToHash(renderedHtml, settings)
    }, 200)
    return () => clearTimeout(id)
  }, [renderedHtml, settings, doRender])

  const loadTemplate = useCallback((t: Template) => {
    const values = defaultFieldValues(t)
    setTemplate(t)
    setFieldValues(values)
    setCodeHtml(applyFields(t.html, values))
    setMode('form')
    setSettings((s) => ({
      ...s,
      width: t.width ?? s.width,
      height: t.height ?? s.height,
    }))
  }, [])

  const changeMode = useCallback(
    (m: EditorMode) => {
      if (m === mode) return
      if (m === 'code') {
        // Materialize the current form output so the user can edit it freely.
        setCodeHtml(applyFields(template.html, fieldValues))
      }
      setMode(m)
    },
    [mode, template, fieldValues],
  )

  const resetField = useCallback(
    (key: string) => {
      const spec = template.fields?.find((f) => f.key === key)
      if (!spec) return
      setFieldValues((v) => ({ ...v, [key]: spec.default }))
    },
    [template],
  )

  const exportSvg = useCallback(() => {
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    triggerDownload(blob, `${template.id}.svg`)
  }, [svg, template.id])

  const exportPng = useCallback(async () => {
    if (!svg) return
    try {
      const png = await renderToPng(svg, settings.width)
      const buf = new Uint8Array(png).buffer
      const blob = new Blob([buf], { type: 'image/png' })
      triggerDownload(blob, `${template.id}.png`)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }, [svg, settings.width, template.id])

  const copyShareUrl = useCallback(async () => {
    return writeToHash(renderedHtml, settings)
  }, [renderedHtml, settings])

  const canFormMode = (template.fields?.length ?? 0) > 0

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar
        settings={settings}
        onChange={setSettings}
        onLoadTemplate={loadTemplate}
        onExportPng={exportPng}
        onExportSvg={exportSvg}
        onCopyShareUrl={copyShareUrl}
        mode={mode}
        onChangeMode={changeMode}
        canFormMode={canFormMode}
      />
      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <div className="min-h-0 border-r border-border">
          {mode === 'form' ? (
            <FormEditor
              template={template}
              values={fieldValues}
              onChange={setFieldValues}
              onResetField={resetField}
            />
          ) : (
            <Editor value={codeHtml} onChange={setCodeHtml} />
          )}
        </div>
        <div className="min-h-0">
          <Preview
            svg={svg}
            error={error}
            rendering={rendering}
            width={settings.width}
            height={settings.height}
          />
        </div>
      </div>
    </div>
  )
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default App
