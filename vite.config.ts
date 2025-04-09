import { defineConfig } from 'vitest/config'; // Make sure you import from 'vitest/config' for test options
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Optional: enables global APIs like describe, it, expect without importing
    environment: 'jsdom', // Essential for React Testing Library & mocking browser APIs like fetch
    setupFiles: ['./setupVitest.js'],
  },
});
