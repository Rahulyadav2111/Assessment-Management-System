import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// Vite configuration
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    port: 5173, // Explicitly set port
    host: 'localhost', // Bind to localhost
    hmr: {
      protocol: 'ws', // Use WebSocket for HMR
      host: 'localhost', // Ensure WebSocket uses localhost
      port: 5173, // WebSocket port
    },
  },
});