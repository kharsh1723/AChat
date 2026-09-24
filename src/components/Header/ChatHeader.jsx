import Avatar from "../Avatar/Avatar";

function ChatHeader({
  roomCode,
  users,
  onCopy,
  onLeave,
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 px-6 py-4 shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-cyan-400">
            💬 AChat
          </h1>

          <p className="text-slate-400 text-sm">
            Room {roomCode}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onCopy}
            className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-white transition"
          >
            📋 Copy
          </button>

          <button
            onClick={onLeave}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
          >
            Leave
          </button>

        </div>

      </div>

      <div className="flex items-center gap-4 mt-5">

        <span className="text-green-400 text-sm">
          🟢 {users.length} Online
        </span>

        {users.map((user) => (

          <div
            key={user.username}
            className="flex items-center gap-2"
          >

            <Avatar
              username={user.username}
              size={30}
            />

            <span className="text-slate-300 text-sm">
              {user.username}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ChatHeader;