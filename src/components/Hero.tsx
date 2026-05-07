import profileImg from "/profile.jpg"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center text-center px-6 pt-16 pb-12 overflow-hidden"
      style={{ background: "#0A0E1A" }}>

      {/* Stars */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            top: `${(i * 97 + 13) % 100}%`,
            left: `${(i * 173 + 37) % 100}%`,
            opacity: 0.2 + (i % 5) * 0.12,
            animationDuration: `${1.5 + (i % 3) * 0.6}s`,
            animationDelay: `${(i % 4) * 0.4}s`,
          }} />
      ))}

      {/* Floating UFO */}
      <div className="absolute left-3 top-14 text-4xl select-none pointer-events-none"
        style={{ animation: "float-ufo 3s ease-in-out infinite" }}>
        🛸
      </div>

      {/* Planet */}
      <div className="absolute -right-8 top-5 rounded-full opacity-70 pointer-events-none"
        style={{
          width: 120, height: 120,
          background: "linear-gradient(135deg, #C0392B, #922B21)",
          border: "4px solid #1A1A2E",
        }} />

      {/* Profile Avatar */}
      <div className="relative z-10 flex items-center justify-center rounded-full mb-5"
        style={{
          width: 120, height: 120,
          border: "5px solid #00FF88",
          boxShadow: "0 0 25px #00FF88, 0 0 50px rgba(0,255,136,0.2)",
          overflow: "hidden",
          background: "linear-gradient(135deg, #2C3E50, #3498DB)",
        }}>
        <img
          src={profileImg}
          alt="Alvino Albas"
          className="w-full h-full object-cover object-top"
          onError={e => {
            (e.currentTarget as HTMLImageElement).style.display = "none"
            ;(e.currentTarget.parentElement as HTMLElement).innerHTML =
              `<span style="font-family:'Boogaloo',cursive;font-size:52px;color:#00FF88">A</span>`
          }}
        />
      </div>

      {/* Tag */}
      <div className="mb-4 px-4 py-1 rounded-full font-black text-xs tracking-widest uppercase border-[3px]"
        style={{
          background: "#FF6B9D",
          color: "#fff",
          borderColor: "#1A1A2E",
          letterSpacing: 3,
        }}>
        Graduation Ceremony
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: "'Boogaloo', cursive",
        fontSize: 56,
        color: "#fff",
        lineHeight: 1,
        textShadow: "3px 3px 0 #1A1A2E, -1px -1px 0 #1A1A2E",
        marginBottom: 8,
      }}>
        Alvino <span style={{ color: "#FFD700" }}>Albas</span>
      </h1>

      {/* Desc Box */}
      <div className="mt-5 rounded-2xl border-2 border-dashed px-5 py-4 max-w-sm"
        style={{
          background: "rgba(0,255,136,0.07)",
          borderColor: "#00FF88",
        }}>
        <p className="text-sm leading-relaxed" style={{ color: "#ccc" }}>
          Dengan penuh rasa syukur — dan sedikit drama interdimensi — saya mengundang
          Bapak/Ibu/Saudara/i untuk hadir merayakan wisuda saya.
        </p>
      </div>

      {/* Event Info Cards */}
      <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm">
        <div className="rounded-2xl p-4 text-center border-[3px]"
          style={{ background: "#00FF88", borderColor: "#1A1A2E", color: "#1A1A2E" }}>
          <div className="font-black text-xs tracking-widest uppercase mb-1" style={{ letterSpacing: 2, opacity: 0.7 }}>
            Waktu
          </div>
          <div style={{ fontFamily: "'Boogaloo',cursive", fontSize: 22, lineHeight: 1.2 }}>
            13.00<br />Selesai
          </div>
        </div>

        <div className="rounded-2xl p-4 text-center border-[3px]"
          style={{ background: "#FFD700", borderColor: "#1A1A2E", color: "#1A1A2E" }}>
          <div className="font-black text-xs tracking-widest uppercase mb-1" style={{ letterSpacing: 2, opacity: 0.7 }}>
            Tempat
          </div>
          <div style={{ fontFamily: "'Boogaloo',cursive", fontSize: 22, lineHeight: 1.2 }}>
            Lobby FTI<br />Unand
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="mt-4 px-4 py-3 rounded-2xl border-2 border-dashed font-bold text-sm w-full max-w-sm"
        style={{
          background: "rgba(255,215,0,0.1)",
          borderColor: "#FFD700",
          color: "#FFD700",
        }}>
        📅 Minggu, 10 Mei 2026
      </div>

      <style>{`
        @keyframes float-ufo {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
      `}</style>
    </section>
  )
}
