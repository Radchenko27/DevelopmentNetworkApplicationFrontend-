import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/drivers": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/drivers/, "/drivers"), // сохраняем путь без изменений
      },
    },
  },
  plugins: [react()],
  base: "/DevelopmentNetworkApplicationFrontend/",
});
