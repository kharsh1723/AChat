import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

import { roomExists } from "../../services/roomService";
import { saveUsername } from "../../utils/localStorage";

function JoinRoom() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleJoinRoom() {

    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!roomCode.trim()) {
      alert("Please enter room code.");
      return;
    }

    setLoading(true);

    const exists = await roomExists(roomCode.toUpperCase());

    setLoading(false);

    if (!exists) {
      alert("Room not found.");
      return;
    }

    saveUsername(username);

    navigate(`/chat/${roomCode.toUpperCase()}`);

  }

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <Card>

        <h1 className="text-4xl text-cyan-400 font-bold text-center">
          Join Room
        </h1>

        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full mt-8 p-3 rounded-xl bg-slate-800 text-white"
        />

        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e)=>setRoomCode(e.target.value)}
          className="w-full mt-4 p-3 rounded-xl bg-slate-800 text-white uppercase"
        />

        <div className="mt-6">

          <Button
            title={loading ? "Joining..." : "Join Room"}
            onClick={handleJoinRoom}
          />

        </div>

      </Card>

    </div>

  );

}

export default JoinRoom;