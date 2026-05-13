import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is set from VITE_BASE env at build time so we can deploy to
// GitHub Pages (where the site lives under /<repo>/) and to Vercel (root).
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  // Satori touches `process.env` internally; shim it for the browser.
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['@resvg/resvg-wasm'],
  },
})
