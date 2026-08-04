import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  sendMessage,
  subscribeMessages,
} from "../../services/messageService";

import { getUsername } from "../../utils/localStorage";

function ChatRoom() {
  const { roomCode } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeMessages(roomCode, setMessages);

    return () => unsubscribe();
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

      {/* Header */}

      <div className="bg-slate-900 border-b border-slate-700 p-5">

        <h1 className="text-cyan-400 text-2xl font-bold">
          Room {roomCode}
        </h1>

      </div>

      {/* Messages */}

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

      {/* Input */}

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