import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@Router": "/src/Router",
      "@store": "/src/store",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@validation": "/src/validation",
    },
  },
});
