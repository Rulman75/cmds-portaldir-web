import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'lucide-react': path.resolve(__dirname, 'src/utils/icons.tsx')
    }
  },
  server: {
    port: 5176,
    proxy: {
      '/api': {
        target: 'http://localhost:3008',
        changeOrigin: true
      }
    }
  }
});
