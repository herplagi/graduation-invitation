export default function Gallery() {
  const images = [
    import.meta.env.BASE_URL + "gallery1.jpg",
    import.meta.env.BASE_URL + "gallery6.jpg",
    import.meta.env.BASE_URL + "gallery5.jpg",
    import.meta.env.BASE_URL + "gallery9.jpg",
  ]

  return (
    <section id="gallery" className="relative px-6 py-28 overflow-hidden"
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

      {/* Grid with 2 columns responsive */}
      <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            className="rounded-3xl w-full h-[400px] object-cover hover:scale-[1.02] duration-300 shadow-lg"
          />
        ))}
      </div>
    </section>
  )
}