import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@mui/material": "@material-ui/core",
      "@mui/icons-material": "@material-ui/icons",
      "@mui/lab": "@material-ui/lab",
      epubjs: "epubjs/dist/epub.js"
    }
  }
});
