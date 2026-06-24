import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'/https://github.com/bugkiller001/Wuhan-Website/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      ignored: ['**/images/**', '**/music/**'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
          motion: ['motion'],
          gesture: ['@use-gesture/react'],
        },
      },
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
  },
})
