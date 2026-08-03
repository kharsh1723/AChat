function RoomCode({ code, onCopy }) {
  return (
    <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6">

      <h3 className="text-center text-slate-300 text-lg">
        Room Code
      </h3>

      <h2 className="mt-3 text-center text-4xl font-bold tracking-widest text-cyan-400">
        {code}
      </h2>

      <button
        onClick={onCopy}
        className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
      >
        📋 Copy Room Code
      </button>

    </div>
  );
}

export default RoomCode;