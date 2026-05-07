export default function Gallery() {
  const images = [
    { src: import.meta.env.BASE_URL + "gallery1.jpg"},
    { src: import.meta.env.BASE_URL + "gallery6.jpg"},
    { src: import.meta.env.BASE_URL + "gallery5.jpg"},
    { src: import.meta.env.BASE_URL + "gallery9.jpg"},
  ]

  return (
    <section id="gallery" className="relative px-6 py-16 overflow-hidden"
      style={{ background: "#0A0E1A" }}>

      {/* Stars */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            width: `${(i % 2) + 1}px`, height: `${(i % 2) + 1}px`,
            top: `${(i * 131 + 23) % 100}%`, left: `${(i * 167 + 41) % 100}%`,
            opacity: 0.15 + (i % 4) * 0.1,
            animationDuration: `${1.6 + (i % 3) * 0.5}s`,
          }} />
      ))}

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1 rounded-full font-black text-xs border-[3px] uppercase mb-3"
          style={{
            background: "#FF6B9D", color: "#fff",
            borderColor: "#1A1A2E", letterSpacing: 3,
          }}>
          📸 Gallery
        </span>
        <h2 style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 40, color: "#fff",
          textShadow: "3px 3px 0 #1A1A2E", lineHeight: 1,
        }}>
          Momen<br />Kenangan!
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden border-[3px]"
            style={{
              borderColor: "#1A1A2E",
              aspectRatio: i === 0 ? "16/7" : "1/1",
              gridColumn: i === 0 ? "1 / -1" : undefined,
              background: "#0F1629",
            }}>

            {/* Actual image */}
            <img
              src={img.src}
              alt={`Gallery ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
            />
            {/* Portal green "SCENE" tag */}
            <div className="absolute top-2 left-3 font-black text-xs tracking-widest"
              style={{ color: "#00FF88", letterSpacing: 2, zIndex: 2 }}>
              SCENE
            </div>

            {/* Bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(10,14,26,0.6), transparent)",
                zIndex: 2,
              }} />
          </div>
        ))}
      </div>
    </section>
  )
}
