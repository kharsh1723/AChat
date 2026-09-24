import {
  subscribeTyping,
} from "../../services/typingService";

import { useNavigate } from "react-router-dom";
import ChatHeader from "../../components/Header/ChatHeader";
import MessageInput from "../../components/Chat/MessageInput";
import MessageBubble from "../../components/Chat/MessageBubble";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  sendMessage,
  sendSystemMessage,
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
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  // Prevent React StrictMode from creating fake join/leave notifications
  const effectRunRef = useRef(0);

  useEffect(() => {
    const username = getUsername();

    effectRunRef.current += 1;

    const currentRun = effectRunRef.current;

    // Join room
    joinRoom(roomCode, username);

    // Only send join notification on the real initialization
    if (currentRun === 1 || !import.meta.env.DEV) {
      sendSystemMessage(
        roomCode,
        `${username} joined the room`
      );
    }

    const unsubscribeMessages =
      subscribeMessages(roomCode, setMessages);

    const unsubscribeUsers =
      subscribeUsers(roomCode, setUsers);

    const unsubscribeTyping =
      subscribeTyping(roomCode, setTypingUsers);

    return () => {
      unsubscribeMessages();
      unsubscribeUsers();
      unsubscribeTyping();

      /*
        React StrictMode runs cleanup once immediately
        after the first effect in development.

        We don't want that fake cleanup to create
        a "left the room" message.
      */
      if (import.meta.env.DEV && currentRun === 1) {
        return;
      }

      sendSystemMessage(
        roomCode,
        `${username} left the room`
      );

      leaveRoom(roomCode, username);
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

  function handleCopy() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  }

  function handleLeave() {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* HEADER */}

      <ChatHeader
        roomCode={roomCode}
        users={users}
        onCopy={handleCopy}
        onLeave={handleLeave}
      />

      {/* TYPING INDICATOR */}

      {typingUsers
        .filter(
          (user) => user.username !== getUsername()
        )
        .map((user) => (
          <div
            key={user.username}
            className="fixed bottom-24 left-6 z-40 text-sm text-slate-400"
          >
            <span className="text-cyan-400 font-semibold">
              {user.username}
            </span>{" "}
            is typing...
          </div>
        ))}

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto p-6 pt-40 pb-24">

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
          />
        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* INPUT */}

      <MessageInput
        roomCode={roomCode}
        text={text}
        setText={setText}
        handleSend={handleSend}
      />

    </div>
  );
}

export default ChatRoom;