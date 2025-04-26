import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // Optional: enables global APIs like describe, it, expect without importing
    environment: 'jsdom', // Essential for React Testing Library & mocking browser APIs like fetch
    setupFiles: ['./setupVitest.js'],
  },
});
