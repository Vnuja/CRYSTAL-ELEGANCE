import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base:"/vite-deploy/",
  resolve: {
    alias: {
      
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
