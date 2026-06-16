import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages のプロジェクトサイト用ベースパス（https://solahy.github.io/Salesforce-learner/）
  base: '/Salesforce-learner/',
  server: {
    port: 5173,
    open: true,
  },
})
