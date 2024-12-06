import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Custom aliases
    },
  },
  server: {
    host: "0.0.0.0", // Allow external access
    port: process.env.PORT || 5173, // Use dynamic port if specified
  },
  build: {
    rollupOptions: {
      external: ["axios"], // Treat axios as an external module
    },
  },
});
