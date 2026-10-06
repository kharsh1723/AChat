import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { getUsername } from "../utils/localStorage";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4
  );

  const base64 = (
    base64String +
    padding
  )
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
}

export async function enableNotifications() {
  if (!("Notification" in window)) {
    throw new Error(
      "This browser does not support notifications."
    );
  }

  if (!("serviceWorker" in navigator)) {
    throw new Error(
      "This browser does not support service workers."
    );
  }

  const permission =
    await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error(
      "Notification permission was not granted."
    );
  }

  const registration =
    await navigator.serviceWorker.ready;

  const subscription =
    await registration.pushManager.subscribe({
      userVisibleOnly: true,

      applicationServerKey:
        urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY
        ),
    });

  const username = getUsername();

  await addDoc(
    collection(db, "pushSubscriptions"),
    {
      username,
      subscription: subscription.toJSON(),
      createdAt: Date.now(),
    }
  );

  return true;
}