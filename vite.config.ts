
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: './', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
