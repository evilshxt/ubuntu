import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        // Main entry points
        main: path.resolve(__dirname, 'index.html'),
        landing: path.resolve(__dirname, 'main.html'),
        
        // Campaign website pages
        about: path.resolve(__dirname, 'about.html'),
        vision: path.resolve(__dirname, 'vision.html'),
        resources: path.resolve(__dirname, 'resources.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        campaign: path.resolve(__dirname, 'campaign.html'),
      }
    },
  }
})
// This configuration file sets up Vite with Tailwind CSS and specifies multiple HTML entry points for the build process.
// It uses the `@tailwindcss/vite` plugin for Tailwind CSS support and configures Rollup to handle multiple HTML files as entry points.
// The `path` module is used to resolve the paths to the HTML files, ensuring that the build process can correctly locate them.