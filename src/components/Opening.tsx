import { useState } from "react"

export default function Opening() {
  const [open, setOpen] = useState(false)

  if (open) return null

  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: "#0A0E1A" }}>

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            top: `${(i * 97 + 13) % 100}%`,
            left: `${(i * 173 + 37) % 100}%`,
            opacity: 0.2 + (i % 5) * 0.12,
            animationDuration: `${1.5 + (i % 3) * 0.5}s`,
            animationDelay: `${(i % 5) * 0.3}s`,
          }} />
      ))}

      {/* Portal Ring */}
      <div className="relative flex items-center justify-center mb-8"
        style={{ width: 200, height: 200 }}>
        <div className="absolute inset-0 rounded-full border-[6px] animate-spin"
          style={{
            borderColor: "#00FF88",
            boxShadow: "0 0 30px #00FF88, inset 0 0 30px rgba(0,255,136,0.2)",
            animationDuration: "4s",
          }} />
        <div className="absolute inset-3 rounded-full border-[3px] border-dashed animate-spin"
          style={{
            borderColor: "#00CCFF",
            boxShadow: "0 0 20px #00CCFF",
            animationDuration: "2s",
            animationDirection: "reverse",
          }} />
        <div className="relative z-10 flex items-center justify-center rounded-full text-5xl"
          style={{
            width: 120, height: 120,
            background: "radial-gradient(circle, #00FF88 0%, #00BBCC 40%, #0A3A2A 100%)",
            animation: "portal-pulse 2s ease-in-out infinite",
          }}>
          🎓
        </div>
      </div>

      {/* Name */}
      <h1 className="text-5xl font-bold leading-tight mb-2"
        style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 54,
          color: "#fff",
          textShadow: "4px 4px 0 #00FF88, 6px 6px 0 rgba(0,255,136,0.3)",
        }}>
        ALVINO<br />
        <span style={{ color: "#00FF88" }}>ALBAS</span>
      </h1>

      <p className="mb-6 tracking-widest uppercase text-sm font-bold"
        style={{ color: "#00CCFF", letterSpacing: 4 }}>
        Graduation Dimension · 2026
      </p>

      {/* Speech Bubble */}
      <div className="relative mb-6 px-6 py-4 rounded-2xl border-[3px] max-w-xs"
        style={{ background: "#fff", borderColor: "#1A1A2E" }}>
        <p className="font-bold text-sm leading-relaxed" style={{ color: "#1A1A2E" }}>
          "Listen Morty, get to my graduation or I swear to god—"
        </p>
        <div className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "10px solid #fff",
          }} />
      </div>

      <button
        onClick={() => setOpen(true)}
        className="mt-4 font-bold rounded-full cursor-pointer transition-all duration-150"
        style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 22,
          letterSpacing: 1,
          background: "#00FF88",
          color: "#1A1A2E",
          border: "4px solid #1A1A2E",
          padding: "16px 44px",
          boxShadow: "4px 4px 0 #1A1A2E",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px,-2px)"
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "6px 6px 0 #1A1A2E"
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)"
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #1A1A2E"
        }}>
        BUKA UNDANGAN ⚡
      </button>

      <p className="mt-4 text-xs tracking-widest" style={{ color: "#444", letterSpacing: 2 }}>
        Wisuda Sistem Informasi · FTI Unand
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;700;900&display=swap');
        @keyframes portal-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}