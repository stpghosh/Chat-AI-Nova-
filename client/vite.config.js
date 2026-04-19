import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/') || id.includes('scheduler') || id.includes('use-sync-external-store')) {
              return 'react-core'
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            if (id.includes('react-router')) {
              return 'router'
            }
            if (id.includes('react-icons')) {
              return 'icons'
            }
            if (id.includes('react-syntax-highlighter')) {
              return 'syntax-highlighter'
            }
            if (id.includes('tailwindcss') || id.includes('postcss') || id.includes('autoprefixer') || id.includes('cssnano') || id.includes('lightningcss')) {
              return 'tailwind'
            }
            if (id.includes('hoist-non-react-statics') || id.includes('js-tokens') || id.includes('object-assign') || id.includes('prop-types') || id.includes('react-is')) {
              return 'react-deps'
            }
            if (id.includes('@babel') || id.includes('debug') || id.includes('ms') || id.includes('supports-color') || id.includes('has-flag')) {
              return 'babel-utils'
            }
            if (id.includes('tslib')) {
              return 'tslib'
            }
            if (id.includes('path-type') || id.includes('fastq') || id.includes('yocto-queue') || id.includes('parent') || id.includes('isexe') || id.includes('which')) {
              return 'fs-utils'
            }
            if (id.includes('@emotion') || id.includes('stylis')) {
              return 'emotion'
            }
            if (id.includes('nanoid') || id.includes('queue-microtask') || id.includes('picomatch') || id.includes('reusify') || id.includes('@nodelib')) {
              return 'util-deps'
            }
            if (id.includes('caniuse-lite') || id.includes('browserslist')) {
              return 'browserslist'
            }
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 650,
    sourcemap: false,
    minify: 'esbuild'
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
