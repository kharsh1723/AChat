function MessageBubble({ message, mine }) {
  return (
    <div
      className={`flex mb-4 ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs rounded-2xl px-4 py-3 ${
          mine
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;