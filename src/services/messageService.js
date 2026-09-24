import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// Send normal text message
export async function sendMessage(
  roomCode,
  username,
  message
) {
  await addDoc(
    collection(db, "rooms", roomCode, "messages"),
    {
      type: "message",
      username,
      message,
      createdAt: serverTimestamp(),
    }
  );
}

// Send system message
export async function sendSystemMessage(
  roomCode,
  message
) {
  await addDoc(
    collection(db, "rooms", roomCode, "messages"),
    {
      type: "system",
      message,
      createdAt: serverTimestamp(),
    }
  );
}

// Send image message
export async function sendImageMessage(
  roomCode,
  username,
  imageUrl
) {
  await addDoc(
    collection(db, "rooms", roomCode, "messages"),
    {
      type: "image",
      username,
      imageUrl,
      createdAt: serverTimestamp(),
    }
  );
}

// Listen for messages
export function subscribeMessages(
  roomCode,
  callback
) {
  const q = query(
    collection(db, "rooms", roomCode, "messages"),
    orderBy("createdAt")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(messages);
    },
    (error) => {
      console.error(
        "Firestore listener error:",
        error
      );
    }
  );
}