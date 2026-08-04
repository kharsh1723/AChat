import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function joinRoom(roomCode, username) {
  await setDoc(
    doc(db, "rooms", roomCode, "onlineUsers", username),
    {
      username,
      joinedAt: Date.now(),
    }
  );
}

export async function leaveRoom(roomCode, username) {
  await deleteDoc(
    doc(db, "rooms", roomCode, "onlineUsers", username)
  );
}

export function subscribeUsers(roomCode, callback) {
  return onSnapshot(
    collection(db, "rooms", roomCode, "onlineUsers"),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => doc.data())
      );
    }
  );
}