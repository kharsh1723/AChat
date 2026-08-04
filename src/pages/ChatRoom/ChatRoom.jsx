import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  sendMessage,
  subscribeMessages,
} from "../../services/messageService";

import {
  joinRoom,
  leaveRoom,
  subscribeUsers,
} from "../../services/presenceService";

import { getUsername } from "../../utils/localStorage";

function ChatRoom() {

  const { roomCode } = useParams();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {

    const username = getUsername();

    joinRoom(roomCode, username);

    const unsubscribeMessages =
      subscribeMessages(roomCode, setMessages);

    const unsubscribeUsers =
      subscribeUsers(roomCode, setUsers);

    return () => {

      leaveRoom(roomCode, username);

      unsubscribeMessages();

      unsubscribeUsers();

    };

  }, [roomCode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend() {

    if (!text.trim()) return;

    await sendMessage(
      roomCode,
      getUsername(),
      text
    );

    setText("");

  }

  return (

    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* HEADER */}

      <div className="bg-slate-900 border-b border-slate-700 p-5">

        <h1 className="text-cyan-400 text-2xl font-bold">
          Room {roomCode}
        </h1>

        <p className="text-green-400 mt-2">
          🟢 Online ({users.length})
        </p>

        <div className="flex flex-wrap gap-2 mt-3">

          {users.map((user) => (

            <span
              key={user.username}
              className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm"
            >
              {user.username}
            </span>

          ))}

        </div>

      </div>

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto p-6">

        {messages.map((msg) => {

          const mine = msg.username === getUsername();

          return (

            <div
              key={msg.id}
              className={`flex mb-4 ${
                mine ? "justify-end" : "justify-start"
              }`}
            >

              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  mine
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-800 text-white"
                }`}
              >

                {!mine && (

                  <p className="text-xs text-cyan-300 font-bold mb-1">
                    {msg.username}
                  </p>

                )}

                <p>{msg.message}</p>

              </div>

            </div>

          );

        })}

        <div ref={bottomRef}></div>

      </div>

      {/* INPUT */}

      <div className="p-5 bg-slate-900 flex gap-3">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl bg-slate-800 text-white p-3 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-600 px-8 rounded-xl text-white transition"
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatRoom;