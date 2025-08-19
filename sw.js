const CACHE_NAME = "animals-cache-v1";
const urlsToCache = [
  "/",                // 首页
  "/index.html",
  "/all-animals.html",
  "/all-birds.html",
  "/big-five.html",
  "/big-nine.html",
  "/assets/kenya-animals/media/image10.jpeg",
  // ...在这里把需要离线的图片都列出来
];

// 安装阶段：把文件加到缓存
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 请求拦截：优先从缓存取，缓存没有再去网络
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});