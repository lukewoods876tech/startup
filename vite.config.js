import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      },
      '/ws': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
  },
}) 