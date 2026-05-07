export default function Footer() {
  return (
    <footer className="relative px-6 py-16 text-center overflow-hidden"
      style={{
        background: "#0F1629",
        borderTop: "4px solid #00FF88",
      }}>

      {/* Stars */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            top: `${(i * 131 + 19) % 100}%`, left: `${(i * 179 + 53) % 100}%`,
            opacity: 0.12 + (i % 4) * 0.08,
            animationDuration: `${1.5 + (i % 3) * 0.5}s`,
          }} />
      ))}

      <div className="text-5xl mb-4">🎓</div>

      <h2 style={{
        fontFamily: "'Boogaloo', cursive",
        fontSize: 48,
        color: "#fff",
        textShadow: "3px 3px 0 #1A1A2E",
        lineHeight: 1,
      }}>
        Terima<br />
        <span style={{ color: "#00FF88" }}>Kasih!</span>
      </h2>

      <p className="mt-3 text-sm" style={{ color: "#666" }}>
        Sampai bertemu di dimensi wisuda.
      </p>

      <div className="flex items-center justify-center gap-4 mt-6">
        {["✦", "✦", "✦"].map((s, i) => (
          <span key={i} className="animate-pulse"
            style={{
              color: "#00FF88",
              fontSize: 20,
              animationDuration: `${1.5 + i * 0.4}s`,
              animationDelay: `${i * 0.2}s`,
            }}>
            {s}
          </span>
        ))}
      </div>

      <p className="mt-6 text-xs tracking-widest" style={{ color: "#333", letterSpacing: 3 }}>
        © 2026 ALVINO ALBAS · WUBBA LUBBA DUB DUB
      </p>
    </footer>
  )
}
