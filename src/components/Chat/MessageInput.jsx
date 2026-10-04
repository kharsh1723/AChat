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
  handleImageSelect,
}) {
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploading, setUploading] = useState(false);

  const emojis = [
    "😀", "😂", "🤣", "😊", "😍",
    "🥰", "😎", "😢", "😭", "😡",
    "😮", "😅", "😉", "❤️", "💔",
    "👍", "👎", "👏", "🔥", "🎉",
    "🙏", "💯", "✨", "🤔",
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

  async function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be smaller than 10 MB.");
      return;
    }

    try {
      setUploading(true);

      await handleImageSelect(file);
    } finally {
      setUploading(false);

      // Allows selecting the same image again later
      e.target.value = "";
    }
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
    <div className="shrink-0 z-50 bg-slate-900 border-t border-slate-700 p-3 sm:p-5">

      <div className="relative flex gap-2 min-w-0 w-full">

        {/* EMOJI BUTTON */}

        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="shrink-0 w-14 h-14 bg-slate-800 hover:bg-slate-700 rounded-xl text-2xl transition"
        >
          😊
        </button>

        {/* IMAGE BUTTON */}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 w-14 h-14 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-xl text-2xl transition"
        >
          {uploading ? "⏳" : "📷"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

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
          placeholder={
            uploading
              ? "Uploading image..."
              : "Type a message..."
          }
          disabled={uploading}
          className="flex-1 min-w-0 w-0 rounded-xl bg-slate-800 text-white p-3 outline-none border border-transparent focus:border-cyan-500 disabled:opacity-60"
        />

        {/* SEND BUTTON */}

        <button
          onClick={handleSend}
          disabled={uploading}
          className="shrink-0 w-16 h-14 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 rounded-xl text-white transition"
        >
          Send
        </button>

      </div>
    </div>
  );
}

export default MessageInput;