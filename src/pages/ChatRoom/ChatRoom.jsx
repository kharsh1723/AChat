import { useState } from "react";
import MessageBubble from "../../components/MessageBubble/MessageBubble";

function ChatRoom() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello 👋",
      mine: false,
    },
    {
      id: 2,
      text: "Hi!!",
      mine: true,
    },
    {
      id: 3,
      text: "Welcome to AChat 🚀",
      mine: false,
    },
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: input,
        mine: true,
      },
    ]);

    setInput("");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Header */}

      <div className="border-b border-slate-800 p-5 flex justify-between">

        <h1 className="text-cyan-400 text-2xl font-bold">
          AChat 🚀
        </h1>

        <p className="text-green-400">
          🟢 Connected
        </p>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6">

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            mine={msg.mine}
          />
        ))}

      </div>

      {/* Input */}

      <div className="border-t border-slate-800 p-4 flex gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl bg-slate-800 px-5 py-4 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-cyan-500 px-8 text-white hover:bg-cyan-400"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatRoom;