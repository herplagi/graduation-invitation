import { useEffect, useState } from "react"

export default function Countdown() {
  const targetDate = new Date("2026-05-10T13:00:00")

  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = targetDate.getTime() - Date.now()
      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" })
        return
      }
      setTimeLeft({
        days: String(Math.floor(distance / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((distance % 60000) / 1000)).padStart(2, "0"),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const cards = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ]

  return (
    <section
      id="countdown"
      className="relative px-6 py-16 overflow-hidden"
      style={{ background: "#0F1629" }}>

      {/* Stars */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            top: `${(i * 113 + 7) % 100}%`, left: `${(i * 211 + 53) % 100}%`,
            opacity: 0.15 + (i % 4) * 0.1,
            animationDuration: `${1.8 + (i % 3) * 0.4}s`,
          }} />
      ))}

      {/* Planet deco */}
      <div className="absolute top-5 right-5 text-4xl pointer-events-none select-none"
        style={{ animation: "float-ufo 4s ease-in-out infinite" }}>
        🪐
      </div>

      {/* Section Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1 rounded-full font-black text-xs border-[3px] uppercase tracking-widest mb-3"
          style={{
            background: "#00CCFF", color: "#0A0E1A",
            borderColor: "#1A1A2E", letterSpacing: 3,
          }}>
          ⏱ Countdown
        </span>
        <h2 style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 40, color: "#fff",
          textShadow: "3px 3px 0 #1A1A2E",
          lineHeight: 1,
        }}>
          Menuju Hari<br />Wisuda!
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {cards.map(({ label, value }) => (
          <div key={label}
            className="relative rounded-2xl border-[3px] py-6 text-center overflow-hidden"
            style={{ background: "#0A0E1A", borderColor: "#00FF88" }}>
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.15), transparent)" }} />
            <div style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: 60, color: "#00FF88", lineHeight: 1,
              textShadow: "0 0 20px rgba(0,255,136,0.5)",
            }}>
              {value}
            </div>
            <div className="font-black text-xs tracking-widest uppercase mt-2"
              style={{ color: "#aaa", letterSpacing: 3 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-4 text-xs tracking-widest" style={{ color: "#555", letterSpacing: 2 }}>
        10 · 05 · 2026
      </p>

      <style>{`
        @keyframes float-ufo {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
      `}</style>
    </section>
  )
}
