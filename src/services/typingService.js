import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function setTyping(roomCode, username) {
  await setDoc(
    doc(db, "rooms", roomCode, "typing", username),
    {
      username,
      typing: true,
    }
  );
}

export async function stopTyping(roomCode, username) {
  await deleteDoc(
    doc(db, "rooms", roomCode, "typing", username)
  );
}

export function subscribeTyping(roomCode, callback) {
  return onSnapshot(
    collection(db, "rooms", roomCode, "typing"),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => doc.data())
      );
    }
  );
}