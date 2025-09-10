import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/blog': {
        target: 'https://www.autotouch.ai',
        changeOrigin: true,
        secure: true
      },
      '/future-of-sales': {
        target: 'https://www.autotouch.ai',
        changeOrigin: true,
        secure: true
      },
      '/post': {
        target: 'https://www.autotouch.ai',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})