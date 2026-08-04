import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

import { createRoom } from "../../services/roomService";
import { saveUsername } from "../../utils/localStorage";

function CreateRoom() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  async function handleCreateRoom() {

    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    saveUsername(username);

    setLoading(true);

    const code = await createRoom();

    setRoomCode(code);

    setLoading(false);
  }

  function enterChat() {
    navigate(`/chat/${roomCode}`);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <Card>

        <h1 className="text-4xl font-bold text-cyan-400 text-center">
          Create Room
        </h1>

        {!roomCode ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 text-white mt-8 mb-6 outline-none border border-slate-700 focus:border-cyan-500"
            />

            <Button
              title={loading ? "Creating..." : "Create Room"}
              onClick={handleCreateRoom}
            />
          </>
        ) : (
          <>
            <h2 className="text-center text-5xl text-white mt-8">
              {roomCode}
            </h2>

            <div className="mt-8">
              <Button
                title="Enter Chat"
                onClick={enterChat}
              />
            </div>
          </>
        )}

      </Card>

    </div>
  );
}

export default CreateRoom;