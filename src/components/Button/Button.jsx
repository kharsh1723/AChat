function Button({ title, type = "primary", onClick }) {
  const primary =
    "w-full rounded-xl bg-cyan-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/30";

  const secondary =
    "w-full rounded-xl border border-slate-600 bg-slate-900/50 py-4 text-lg text-white transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02] active:scale-95";

  return (
    <button
      onClick={onClick}
      className={type === "primary" ? primary : secondary}
    >
      {title}
    </button>
  );
}

export default Button;