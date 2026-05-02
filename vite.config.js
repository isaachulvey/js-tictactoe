import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets are relative for GitHub Pages
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Use default esbuild to avoid extra dependencies
  },
});
