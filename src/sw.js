import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

// Handle incoming push notifications
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || "AChat";

  const options = {
    body: data.body || "You have a new message",
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Open AChat when notification is tapped
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      return clients.openWindow(url);
    })
  );
});