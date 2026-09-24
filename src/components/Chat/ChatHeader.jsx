function ChatHeader({ roomCode, users }) {
  return (
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
  );
}

export default ChatHeader;
