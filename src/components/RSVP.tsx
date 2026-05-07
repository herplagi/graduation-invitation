import { useEffect, useRef, useState } from "react"

export default function RSVP() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<"playing" | "gameOver" | "start">("start")
  const [score, setScore] = useState(0)

  const gameRef = useRef({
    bird: { x: 50, y: 150, velocity: 0, radius: 10 },
    pipes: [] as Array<{ x: number; topHeight: number; scored?: boolean }>,
    score: 0,
    gameRunning: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gravity = 0.35
    const pipeGap = 160
    const pipeWidth = 60
    const pipeSpeed = 2.5

    const drawBird = () => {
      const bird = gameRef.current.bird
      ctx.fillStyle = "#FBBF24"
      ctx.beginPath()
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawPipes = () => {
      ctx.fillStyle = "#27272A"
      gameRef.current.pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight)
        ctx.fillRect(
          pipe.x,
          pipe.topHeight + pipeGap,
          pipeWidth,
          canvas.height - (pipe.topHeight + pipeGap)
        )
      })
    }

    const drawScore = () => {
      ctx.fillStyle = "#FBBF24"
      ctx.font = "bold 24px Arial"
      ctx.fillText(`Score: ${gameRef.current.score}`, 20, 40)
    }

    const checkCollisions = () => {
      const bird = gameRef.current.bird

      if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
        setGameState("gameOver")
        setScore(gameRef.current.score)
        return true
      }

      for (let pipe of gameRef.current.pipes) {
        if (
          bird.x + bird.radius > pipe.x &&
          bird.x - bird.radius < pipe.x + pipeWidth &&
          (bird.y - bird.radius < pipe.topHeight ||
            bird.y + bird.radius > pipe.topHeight + pipeGap)
        ) {
          setGameState("gameOver")
          setScore(gameRef.current.score)
          return true
        }
      }

      return false
    }

    const gameLoop = () => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const bird = gameRef.current.bird
      bird.velocity += gravity
      bird.y += bird.velocity

      gameRef.current.pipes = gameRef.current.pipes.filter(
        (pipe) => pipe.x + pipeWidth > 0
      )

      if (
        gameRef.current.pipes.length === 0 ||
        gameRef.current.pipes[gameRef.current.pipes.length - 1].x <
          canvas.width - 200
      ) {
        const topHeight =
          Math.random() * (canvas.height - pipeGap - 100) + 50
        gameRef.current.pipes.push({
          x: canvas.width,
          topHeight,
          scored: false,
        })
      }

      gameRef.current.pipes.forEach((pipe) => {
        pipe.x -= pipeSpeed

        // Fixed scoring logic
        if (pipe.x + pipeWidth < 50 && !pipe.scored) {
          gameRef.current.score++
          setScore(gameRef.current.score)
          pipe.scored = true
        }
      })

      drawPipes()
      drawBird()
      drawScore()

      if (!checkCollisions() && gameRef.current.gameRunning) {
        requestAnimationFrame(gameLoop)
      }
    }

    if (gameState === "playing" && gameRef.current.gameRunning) {
      const animationId = requestAnimationFrame(gameLoop)
      return () => cancelAnimationFrame(animationId)
    }
  }, [gameState])

  const handleJump = () => {
    gameRef.current.bird.velocity = -7
  }

  const handleStart = () => {
    gameRef.current = {
      bird: { x: 50, y: 150, velocity: 0, radius: 10 },
      pipes: [],
      score: 0,
      gameRunning: true,
    }
    setScore(0)
    setGameState("playing")
  }

  const handleRestart = () => {
    handleStart()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      (e.key === " " || e.key === "Enter") &&
      gameState === "playing"
    ) {
      e.preventDefault()
      handleJump()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameState === "playing") {
      e.preventDefault()
      handleJump()
    }
  }

  const handleCanvasClick = () => {
    if (gameState === "playing") {
      handleJump()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameState])

  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-3xl p-10">
        <div className="text-center">
          <p className="text-yellow-400 tracking-[4px] uppercase">
            Mini Game
          </p>

          <h1 className="text-5xl font-bold mt-5">Flappy Bird</h1>
        </div>

        <div className="flex flex-col gap-5 mt-12 items-center">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onClick={handleCanvasClick}
            onTouchStart={handleTouchStart}
            className="bg-black border-2 border-yellow-400 rounded-xl cursor-pointer w-full max-w-sm"
          />

          {gameState === "start" && (
            <button
              onClick={handleStart}
              className="bg-yellow-400 text-black font-bold p-4 px-8 rounded-xl hover:scale-105 duration-300"
            >
              Mulai Game
            </button>
          )}

          {gameState === "gameOver" && (
            <div className="text-center">
              <p className="text-yellow-400 text-2xl font-bold">
                Game Over!
              </p>

              <p className="text-zinc-300 mt-2 text-xl">Score: {score}</p>

              <button
                onClick={handleRestart}
                className="bg-yellow-400 text-black font-bold p-4 px-8 rounded-xl mt-4 hover:scale-105 duration-300"
              >
                Main Lagi
              </button>
            </div>
          )}

          {gameState === "playing" && (
            <div className="text-center w-full">
              <p className="text-zinc-400 text-sm mb-3">
                Tap layar atau tekan SPACE untuk terbang!
              </p>

              <button
                onClick={handleJump}
                className="w-full bg-yellow-400 text-black font-bold p-3 rounded-xl hover:scale-105 duration-300 md:hidden"
              >
                TERBANG ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}