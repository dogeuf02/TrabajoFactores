import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que las rutas sean absolutas desde la raíz
  build: {
    outDir: 'dist', // Directorio de salida explícito
    emptyOutDir: true, // Limpia el directorio en cada build
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        manualChunks: {
          // Divide los chunks para optimizar carga
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios'] // Añade otras dependencias grandes aquí
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Aumenta el límite de warning
  },
  server: {
    // Configuración para desarrollo si es necesario
    port: 3000,
    open: true
  }
})