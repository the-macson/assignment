import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
  },
  server: {
    origin: "http://127.0.0.1:4000",
  },
  optimizeDeps: {
    include: ['@emotion/styled']
  }
});
