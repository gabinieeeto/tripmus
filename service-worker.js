// Service worker mínimo. De momento no cachea nada (así que sigue
// necesitando conexión a internet), pero es el requisito técnico
// que exige el navegador para poder "instalar" la web como app.
self.addEventListener("install", function (evento) {
  self.skipWaiting();
});

self.addEventListener("fetch", function (evento) {
  // Dejamos pasar todas las peticiones tal cual, sin modificarlas.
});
