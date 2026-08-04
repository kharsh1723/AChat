import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

export async function createRoom() {
  const roomCode = generateRoomCode();

  await setDoc(doc(collection(db, "rooms"), roomCode), {
    roomCode,
    createdAt: Date.now(),
    active: true,
  });

  return roomCode;
}

export async function roomExists(roomCode) {
  const roomRef = doc(db, "rooms", roomCode);

  const snapshot = await getDoc(roomRef);

  return snapshot.exists();
}