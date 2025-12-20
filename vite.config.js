/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // This forces Vite to pre-bundle these packages correctly
    include: ['@mediapipe/pose', '@mediapipe/camera_utils'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})