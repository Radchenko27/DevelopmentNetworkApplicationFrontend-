// self.addEventListener("install", (event) => {
//   console.log("Service Worker устанавливается");
//   event.waitUntil(
//     caches.open("my-cache").then((cache) => {
//       return cache.addAll([
//         "/", // Главная страница
//         "/index.html", // HTML файл
//         "/logo192.png", // Логотип
//         "/logo512.png", // Логотип
//         "/manifest.json", // Манифест
//         // Добавьте другие ресурсы
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse; // Возвращаем из кэша, если есть
//       }
//       return fetch(event.request); // Загружаем из сети
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker активирован");
// });

self.addEventListener("fetch", () => console.log("fetch"));
