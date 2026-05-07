import { useEffect, useRef, useState } from "react"

type GameState = "start" | "playing" | "gameOver"

export default function RSVP() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>("start")
  const [score, setScore] = useState(0)

  const gameRef = useRef({
    bird: { x: 50, y: 180, velocity: 0, radius: 14 },
    pipes: [] as Array<{ x: number; topHeight: number; scored?: boolean }>,
    score: 0,
    running: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const gravity = 0.4
    const pipeGap = 135
    const pipeW = 48
    const pipeSpeed = 2.5

    function drawStars() {
      for (let i = 0; i < 35; i++) {
        const x = (i * 173 + 37) % W
        const y = (i * 97 + 13) % H
        const r = (i % 2) + 1
        ctx!.fillStyle = "#fff"
        ctx!.globalAlpha = 0.15 + (i % 5) * 0.07
        ctx!.beginPath()
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    function drawPipes() {
      gameRef.current.pipes.forEach(p => {
        // Top pipe
        ctx!.fillStyle = "#00FF88"
        ctx!.strokeStyle = "#1A1A2E"
        ctx!.lineWidth = 3
        roundRect(ctx!, p.x, 0, pipeW, p.topHeight, 6)
        ctx!.fill()
        ctx!.stroke()
        // Pipe cap
        ctx!.fillStyle = "#00CC66"
        roundRect(ctx!, p.x - 4, p.topHeight - 16, pipeW + 8, 16, 4)
        ctx!.fill()
        ctx!.stroke()

        // Bottom pipe
        const bottomY = p.topHeight + pipeGap
        ctx!.fillStyle = "#00FF88"
        roundRect(ctx!, p.x, bottomY, pipeW, H - bottomY, 6)
        ctx!.fill()
        ctx!.stroke()
        // Bottom cap
        ctx!.fillStyle = "#00CC66"
        roundRect(ctx!, p.x - 4, bottomY, pipeW + 8, 16, 4)
        ctx!.fill()
        ctx!.stroke()
      })
    }

    function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      c.beginPath()
      c.moveTo(x + r, y)
      c.lineTo(x + w - r, y)
      c.arcTo(x + w, y, x + w, y + r, r)
      c.lineTo(x + w, y + h - r)
      c.arcTo(x + w, y + h, x + w - r, y + h, r)
      c.lineTo(x + r, y + h)
      c.arcTo(x, y + h, x, y + h - r, r)
      c.lineTo(x, y + r)
      c.arcTo(x, y, x + r, y, r)
      c.closePath()
    }

    function drawBird() {
      const b = gameRef.current.bird
      ctx!.font = "28px serif"
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      ctx!.fillText("🛸", b.x, b.y)
    }

    function drawScore() {
      ctx!.fillStyle = "#00FF88"
      ctx!.font = "bold 18px 'Boogaloo', cursive"
      ctx!.textAlign = "left"
      ctx!.textBaseline = "top"
      ctx!.fillText(`Score: ${gameRef.current.score}`, 14, 14)
    }

    function drawIdle() {
      ctx!.fillStyle = "#0A0E1A"
      ctx!.fillRect(0, 0, W, H)
      drawStars()
      ctx!.fillStyle = "#00FF88"
      ctx!.font = "bold 22px 'Boogaloo', cursive"
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      ctx!.fillText("Tekan MULAI!", W / 2, H / 2 + 10)
      ctx!.font = "42px serif"
      ctx!.fillText("🛸", W / 2, H / 2 - 36)
    }

    function checkCollision() {
      const b = gameRef.current.bird
      if (b.y - b.radius < 0 || b.y + b.radius > H) return true
      for (const p of gameRef.current.pipes) {
        if (
          b.x + b.radius > p.x &&
          b.x - b.radius < p.x + pipeW &&
          (b.y - b.radius < p.topHeight || b.y + b.radius > p.topHeight + pipeGap)
        ) return true
      }
      return false
    }

    if (gameState === "start") { drawIdle(); return }

    function loop() {
      if (!gameRef.current.running) return
      ctx!.fillStyle = "#0A0E1A"
      ctx!.fillRect(0, 0, W, H)
      drawStars()

      // Bird physics
      gameRef.current.bird.velocity += gravity
      gameRef.current.bird.y += gameRef.current.bird.velocity

      // Pipes
      gameRef.current.pipes = gameRef.current.pipes.filter(p => p.x + pipeW > 0)
      if (
        gameRef.current.pipes.length === 0 ||
        gameRef.current.pipes[gameRef.current.pipes.length - 1].x < W - 200
      ) {
        gameRef.current.pipes.push({
          x: W,
          topHeight: 50 + Math.random() * (H - pipeGap - 100),
          scored: false,
        })
      }

      gameRef.current.pipes.forEach(p => {
        p.x -= pipeSpeed
        if (!p.scored && p.x + pipeW < gameRef.current.bird.x) {
          gameRef.current.score++
          setScore(gameRef.current.score)
          p.scored = true
        }
      })

      drawPipes()
      drawBird()
      drawScore()

      if (checkCollision()) {
        gameRef.current.running = false
        setGameState("gameOver")
        setScore(gameRef.current.score)
        return
      }
      requestAnimationFrame(loop)
    }

    if (gameState === "playing" && gameRef.current.running) {
      const id = requestAnimationFrame(loop)
      return () => cancelAnimationFrame(id)
    }
  }, [gameState])

  function jump() {
    gameRef.current.bird.velocity = -8
  }

  function startGame() {
    gameRef.current = {
      bird: { x: 50, y: 180, velocity: 0, radius: 14 },
      pipes: [],
      score: 0,
      running: true,
    }
    setScore(0)
    setGameState("playing")
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === " " || e.key === "Enter") && gameState === "playing") {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [gameState])

  const btnStyle: React.CSSProperties = {
    fontFamily: "'Boogaloo', cursive",
    fontSize: 20,
    letterSpacing: 1,
    background: "#FFD700",
    color: "#0A0E1A",
    border: "4px solid #1A1A2E",
    borderRadius: 40,
    padding: "12px 36px",
    boxShadow: "4px 4px 0 #1A1A2E",
    cursor: "pointer",
    transition: "all 0.15s",
  }

  return (
    <section id="minigame" className="relative px-6 py-16 overflow-hidden"
      style={{ background: "#0F1629" }}>

      {/* Stars */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            top: `${(i * 119 + 11) % 100}%`, left: `${(i * 163 + 47) % 100}%`,
            opacity: 0.12 + (i % 4) * 0.08,
            animationDuration: `${1.6 + (i % 3) * 0.5}s`,
          }} />
      ))}

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1 rounded-full font-black text-xs border-[3px] uppercase mb-3"
          style={{
            background: "#7B2FBE", color: "#fff",
            borderColor: "#1A1A2E", letterSpacing: 3,
          }}>
          🎮 Mini Game
        </span>
        <h2 style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: 40, color: "#fff",
          textShadow: "3px 3px 0 #1A1A2E", lineHeight: 1,
        }}>
          Flappy<br />Morty!
        </h2>
      </div>

      {/* Game Box */}
      <div className="rounded-2xl border-[4px] p-6 max-w-sm mx-auto"
        style={{
          background: "#0A0E1A",
          borderColor: "#00FF88",
          boxShadow: "0 0 25px rgba(0,255,136,0.2)",
        }}>
        <canvas
          ref={canvasRef}
          width={300}
          height={360}
          onClick={() => { if (gameState === "playing") jump() }}
          onTouchStart={e => { e.preventDefault(); if (gameState === "playing") jump() }}
          className="block mx-auto rounded-xl cursor-pointer"
          style={{
            border: "3px solid #1A1A2E",
            width: "100%",
            maxWidth: 300,
            touchAction: "none",
          }}
        />

        <div className="mt-4 text-center">
          {gameState === "start" && (
            <button style={btnStyle} onClick={startGame}>
              Mulai! ⚡
            </button>
          )}

          {gameState === "gameOver" && (
            <div>
              <p style={{ fontFamily: "'Boogaloo', cursive", fontSize: 26, color: "#FF6B9D" }}>
                Morty Down! 💀
              </p>
              <p className="text-lg font-bold mt-1" style={{ color: "#FFD700" }}>
                Score: {score}
              </p>
              <button style={{ ...btnStyle, marginTop: 12 }} onClick={startGame}>
                Main Lagi!
              </button>
            </div>
          )}

          {gameState === "playing" && (
            <div>
              <p className="text-xs mb-3" style={{ color: "#555", letterSpacing: 1 }}>
                Tap layar atau tekan SPACE untuk terbang!
              </p>
              <button
                onClick={jump}
                className="md:hidden"
                style={{ ...btnStyle, width: "100%" }}>
                TERBANG 🛸
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
