export interface RenderSettings {
  width: number
  height: number
  debug: boolean
  fontFamily: FontKey
}

export type FontKey = 'inter' | 'plex-mono'

export interface FontDef {
  key: FontKey
  label: string
  cssUrl: string
}

export type FieldType = 'text' | 'textarea' | 'color'

export interface FieldSpec {
  key: string
  label: string
  type: FieldType
  default: string
  hint?: string
}

export interface Template {
  id: string
  label: string
  description: string
  html: string
  width?: number
  height?: number
  fields?: FieldSpec[]
}

export type EditorMode = 'form' | 'code'
