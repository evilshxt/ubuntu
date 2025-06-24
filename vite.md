import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(), // ✅ your working Tailwind plugin
  ],
  build: {
    rollupOptions: {
      input: {
        // 👇 Add more HTML entry points here
        main: path.resolve(__dirname, 'index.html'),
        second: path.resolve(__dirname, 'main.html'),
        // more pages:
        about: path.resolve(__dirname, 'about.html'),
        contact: path.resolve(__dirname, 'contact.html'),
      }
    }
  }
})
