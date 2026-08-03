function Card({ children }) {
  return (
    <div
      className="
      relative
      w-full
      max-w-xl
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-12
      shadow-[0_0_80px_rgba(0,255,255,0.12)]
      "
    >
      {children}
    </div>
  );
}

export default Card;