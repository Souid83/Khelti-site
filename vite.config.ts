import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // ✅ Pour Netlify : déploiement à la racine
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
