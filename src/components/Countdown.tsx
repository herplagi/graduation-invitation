import { useEffect, useState } from "react"

export default function Countdown() {

  const targetDate = new Date("2026-08-20T08:00:00")

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date().getTime()

      const distance =
        targetDate.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })

    }, 1000)

    return () => clearInterval(timer)

  }, [])

  return (
    <section className="py-28 px-6 text-center">

      <p className="text-yellow-400 tracking-[4px] uppercase">
        Countdown
      </p>

      <h1 className="text-5xl font-bold mt-5">
        Menuju Hari Wisuda
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-5xl mx-auto">

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold">
            {timeLeft.days}
          </h1>
          <p className="mt-3 text-zinc-400">
            Hari
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold">
            {timeLeft.hours}
          </h1>
          <p className="mt-3 text-zinc-400">
            Jam
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold">
            {timeLeft.minutes}
          </h1>
          <p className="mt-3 text-zinc-400">
            Menit
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold">
            {timeLeft.seconds}
          </h1>
          <p className="mt-3 text-zinc-400">
            Detik
          </p>
        </div>

      </div>

    </section>
  )
}