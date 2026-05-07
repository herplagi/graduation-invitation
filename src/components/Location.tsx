export default function Location() {
  return (
    <section id="location" className="relative px-6 py-16 overflow-hidden"
      style={{ background: "#0F1629" }}>

      {/* Stars */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            top: `${(i * 109 + 17) % 100}%`, left: `${(i * 193 + 59) % 100}%`,
            opacity: 0.15 + (i % 4) * 0.1,
            animationDuration: `${1.7 + (i % 3) * 0.4}s`,
          }} />
      ))}

      {/* Deco */}
      <div className="absolute top-5 right-5 text-3xl pointer-events-none select-none"
        style={{ animation: "float-ufo 3.5s ease-in-out infinite 0.5s" }}>
        🌌
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1 rounded-full font-black text-xs border-[3px] uppercase mb-3"
          style={{
            background: "#00FF88", color: "#0A0E1A",
            borderColor: "#1A1A2E", letterSpacing: 3,
          }}>
          📍 Lokasi
        </span>
        <h2 style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 40, color: "#fff",
          textShadow: "3px 3px 0 #1A1A2E", lineHeight: 1,
        }}>
          Koordinat<br />Wisuda!
        </h2>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border-[4px] max-w-lg mx-auto"
        style={{
          borderColor: "#00FF88",
          boxShadow: "0 0 20px rgba(0,255,136,0.3)",
        }}>
        {/* Map Label Bar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b-[3px]"
          style={{
            background: "#00FF88",
            borderColor: "#1A1A2E",
            fontFamily: "'Boogaloo', cursive",
            fontSize: 18,
            color: "#0A0E1A",
          }}>
          🗺️ FTI Universitas Andalas
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.309172682548!2d100.45847837496508!3d-0.9153507990757912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7963e1ea631%3A0x452d09b61f76d6ec!2sFakultas%20Teknologi%20InformasiUniversitas%20Andalas!5e0!3m2!1sid!2sid!4v1778147003056!5m2!1sid!2sid"
          width="100%"
          height="300"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Info Card */}
      <div className="flex items-center gap-4 mt-4 rounded-2xl border-[3px] px-5 py-4 max-w-lg mx-auto"
        style={{
          background: "rgba(0,255,136,0.08)",
          borderColor: "#00FF88",
        }}>
        <span className="text-4xl">🏫</span>
        <div>
          <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: 18, color: "#00FF88" }}>
            Lobby FTI Unand
          </div>
          <div className="text-xs mt-1" style={{ color: "#888" }}>
            Fakultas Teknologi Informasi · Universitas Andalas
          </div>
        </div>
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
