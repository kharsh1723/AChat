import { useEffect, useRef, useState } from "react";

import {
  setTyping,
  stopTyping,
} from "../../services/typingService";

import { getUsername } from "../../utils/localStorage";

function MessageInput({
  roomCode,
  text,
  setText,
  handleSend,
}) {
  const typingTimeoutRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = [
    "😀", "😂", "🤣", "😊", "😍",
    "🥰", "😎", "😢", "😭", "😡",
    "😮", "😅", "😉", "❤️", "💔",
    "👍", "👎", "👏", "🔥", "🎉",
    "🙏", "💯", "✨", "😂", "🤔",
  ];

  function handleChange(e) {
    const value = e.target.value;

    setText(value);

    const username = getUsername();

    if (!value.trim()) {
      stopTyping(roomCode, username);
      return;
    }

    setTyping(roomCode, username);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(roomCode, username);
    }, 2000);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      stopTyping(roomCode, getUsername());

      handleSend();
    }
  }

  function addEmoji(emoji) {
    setText(text + emoji);

    const username = getUsername();

    setTyping(roomCode, username);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(roomCode, username);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      stopTyping(roomCode, getUsername());
    };
  }, [roomCode]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-5">

      <div className="relative flex gap-3">

        {/* EMOJI BUTTON */}

        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-slate-800 hover:bg-slate-700 px-4 rounded-xl text-2xl transition"
        >
          😊
        </button>

        {/* EMOJI PICKER */}

        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 w-80 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl">

            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl p-2 rounded-lg hover:bg-slate-700 transition"
                >
                  {emoji}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* MESSAGE INPUT */}

        <input
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 rounded-xl bg-slate-800 text-white p-3 outline-none border border-transparent focus:border-cyan-500"
        />

        {/* SEND BUTTON */}

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

export default MessageInput;