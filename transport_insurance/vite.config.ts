// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     host: "0.0.0.0",
//     port: 3000,
//     proxy: {
//       "/drivers": {
//         target: "http://localhost:8000",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/drivers/, "/drivers"), // сохраняем путь без изменений
//       },
//     },
//   },
//   plugins: [react()],
//   base: "/DevelopmentNetworkApplicationFrontend/",
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { api_proxy_addr, img_proxy_addr, dest_root } from "./src/target_config"; // Импортируем необходимые переменные

export default defineConfig({
  base: dest_root, // Динамическое значение base для корректного пути
  server: {
    port: 3000, // Порт разработки
    proxy: {
      "/drivers": {
        target: api_proxy_addr, // Прокси-адрес для API
        changeOrigin: true, // Изменение заголовков при проксировании
        rewrite: (path) => path.replace(/^\/drivers/, "/drivers"), // Оставляем префикс /datacenter-services в пути
      },
      "/img-proxy": {
        target: img_proxy_addr, // Прокси-адрес для изображений
        changeOrigin: true, // Изменение заголовков при проксировании
        rewrite: (path) => path.replace(/^\/img-proxy/, "/"), // Оставляем префикс /img-proxy в пути
      },
    },
  },
  plugins: [react()],
  // Плагин для работы с React
});
