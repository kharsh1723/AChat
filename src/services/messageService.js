import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function sendMessage(roomCode, username, message) {

  console.log("Username received:", username);

  await addDoc(
    collection(db, "rooms", roomCode, "messages"),
    {
      username,
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

      console.log("Firebase returned:", messages);

      callback(messages);
    },
    (error) => {
      console.error("Firestore listener error:", error);
    }
  );
}