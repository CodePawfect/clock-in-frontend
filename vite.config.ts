import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import {defineConfig as defineVitestConfig} from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    ...defineVitestConfig({
        test: {
            environment: 'jsdom',
            globals: true
        }
    })
})
