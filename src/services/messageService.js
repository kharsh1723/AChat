import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

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

export async function sendSystemMessage(roomCode, message) {
  await addDoc(
    collection(db, "rooms", roomCode, "messages"),
    {
      type: "system",
      message,
      createdAt: serverTimestamp(),
    }
  );
}

export function subscribeMessages(roomCode, callback) {
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
      console.error("Firestore listener error:", error);
    }
  );
}