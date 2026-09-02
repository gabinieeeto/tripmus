// Service worker mínimo. De momento no cachea nada (así que sigue
// necesitando conexión a internet), pero es el requisito técnico
// que exige el navegador para poder "instalar" la web como app.
self.addEventListener("install", function (evento) {
  self.skipWaiting();
});

self.addEventListener("fetch", function (evento) {
  // Dejamos pasar todas las peticiones tal cual, sin modificarlas.
});

// ---------- NOTIFICACIONES PUSH ----------
// Este evento se dispara cuando llega un aviso push desde nuestra
// Edge Function, incluso si Tripmus no está abierto en ese momento.
self.addEventListener("push", function (evento) {
  let datos = { titulo: "Tripmus", mensaje: "Hay novedades en tu grupo" };
  try {
    datos = evento.data.json();
  } catch (e) {
    // Si el payload no viniera en JSON por algún motivo, usamos el texto por defecto de arriba.
  }

  evento.waitUntil(
    self.registration.showNotification(datos.titulo || "Tripmus", {
      body: datos.mensaje || "",
      icon: "icon-192.png",
      badge: "icon-192.png"
    })
  );
});

// Cuando alguien toca la notificación, abrimos (o enfocamos) Tripmus.
self.addEventListener("notificationclick", function (evento) {
  evento.notification.close();
  evento.waitUntil(
    clients.matchAll({ type: "window" }).then(function (listaVentanas) {
      for (const ventana of listaVentanas) {
        if ("focus" in ventana) return ventana.focus();
      }
      if (clients.openWindow) return clients.openWindow("index.html");
    })
  );
});
