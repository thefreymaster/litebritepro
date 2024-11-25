import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
