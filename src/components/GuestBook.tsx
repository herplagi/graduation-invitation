import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Guestbook = {
  id: number
  name: string
  message: string
}

export default function GuestBook() {
  const [messages, setMessages] = useState<Guestbook[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [gifPosition, setGifPosition] = useState({ x: 10, y: 10 })

  useEffect(() => {
    const interval = setInterval(() => {
      setGifPosition({
        x: Math.random() * 85,
        y: Math.random() * 85,
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  async function loadMessages() {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("id", { ascending: false })
    if (data) setMessages(data)
  }

  async function sendMessage() {
    if (!name || !message) return
    setLoading(true)
    await supabase.from("guestbook").insert([{ name, message }])
    setName("")
    setMessage("")
    await loadMessages()
    setLoading(false)
  }

  useEffect(() => { loadMessages() }, [])

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0A0E1A",
    border: "3px solid #00FF88",
    borderRadius: 14,
    padding: "14px 18px",
    color: "#fff",
    fontFamily: "'Nunito', sans-serif",
    fontSize: 14,
    outline: "none",
    marginBottom: 12,
  }

  return (
    <section id="guestbook" className="relative px-6 py-16 overflow-hidden"
      style={{ background: "#0A0E1A" }}>

      {/* Floating Rick and Morty GIF */}
      <div
        className="absolute pointer-events-none transition-all duration-1000"
        style={{
          left: `${gifPosition.x}%`,
          top: `${gifPosition.y}%`,
          opacity: 0.15,
          zIndex: 0,
        }}
      >
        <img
          src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cWl2NGlzYWU0b3MxdzN6Mmtkdmc4b3kwNDA4a3N3Z3d3dHhyMnFiNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/el7VG1XOOvi24oRXFt/giphy.gif"
          alt="rick-morty"
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Stars */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            top: `${(i * 97 + 29) % 100}%`, left: `${(i * 181 + 43) % 100}%`,
            opacity: 0.12 + (i % 4) * 0.08,
            animationDuration: `${1.8 + (i % 3) * 0.5}s`,
            zIndex: 1,
          }} />
      ))}

      {/* Header */}
      <div className="mb-8 relative z-10">
        <span className="inline-block px-4 py-1 rounded-full font-black text-xs border-[3px] uppercase mb-3"
          style={{
            background: "#FF8C42", color: "#fff",
            borderColor: "#1A1A2E", letterSpacing: 3,
          }}>
          💌 Guest Book
        </span>
        <h2 style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 40, color: "#fff",
          textShadow: "3px 3px 0 #1A1A2E", lineHeight: 1,
        }}>
          Ucapan &amp;<br />Doa!
        </h2>
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Form */}
        <input
          type="text"
          placeholder="Nama kamu siapa, Morty?"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "#FFD700")}
          onBlur={e => (e.currentTarget.style.borderColor = "#00FF88")}
        />
        <textarea
          placeholder="Tulis ucapan buat Alvino..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ ...inputStyle, height: 100, resize: "vertical" }}
          onFocus={e => (e.currentTarget.style.borderColor = "#FFD700")}
          onBlur={e => (e.currentTarget.style.borderColor = "#00FF88")}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-full rounded-2xl cursor-pointer transition-all duration-150"
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: 20,
            letterSpacing: 1,
            background: loading ? "#555" : "#00FF88",
            color: "#0A0E1A",
            border: "4px solid #1A1A2E",
            padding: "14px 0",
            boxShadow: "4px 4px 0 #1A1A2E",
          }}
          onMouseEnter={e => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px,-1px)"
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0 #1A1A2E"
            }
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)"
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #1A1A2E"
          }}>
          {loading ? "MENGIRIM..." : "KIRIM UCAPAN ⚡"}
        </button>

        {/* Messages */}
        <div className="mt-6 flex flex-col gap-3">
          {messages.map(item => (
            <div key={item.id} className="rounded-2xl border-[3px] px-5 py-4"
              style={{ background: "#0F1629", borderColor: "#00CCFF" }}>
              <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: 22, color: "#FFD700" }}>
                {item.name}
              </div>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "#aaa" }}>
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}