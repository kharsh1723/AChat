import { getUsername } from "../../utils/localStorage";
import Avatar from "../Avatar/Avatar";

function MessageBubble({ message }) {
  // System message
  if (message.type === "system") {
    return (
      <div className="flex justify-center mb-4">
        <div className="text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-full">
          {message.message}
        </div>
      </div>
    );
  }

  const mine = message.username === getUsername();

  const time = message.createdAt?.toDate
    ? message.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`flex mb-5 ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      {!mine && (
        <div className="mr-3">
          <Avatar username={message.username} />
        </div>
      )}

      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
          mine
            ? "bg-cyan-500 text-white rounded-br-md"
            : "bg-slate-800 text-white rounded-bl-md"
        }`}
      >
        {!mine && (
          <p className="text-xs font-semibold text-cyan-300 mb-1">
            {message.username}
          </p>
        )}

        <p className="break-words">
          {message.message}
        </p>

        <p
          className={`text-[10px] mt-2 text-right ${
            mine
              ? "text-cyan-100"
              : "text-slate-400"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;