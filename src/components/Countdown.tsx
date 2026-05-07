import { useEffect, useState } from "react"

export default function Countdown() {

  const targetDate = new Date("2026-05-10T08:00:00")

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  })

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date().getTime()

      const distance =
        targetDate.getTime() - now

      if (distance <= 0) {

        clearInterval(timer)

        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        })

        return
      }

      const days =
        Math.floor(distance / (1000 * 60 * 60 * 24))

      const hours =
        Math.floor((distance / (1000 * 60 * 60)) % 24)

      const minutes =
        Math.floor((distance / 1000 / 60) % 60)

      const seconds =
        Math.floor((distance / 1000) % 60)

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
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

      <p className="text-zinc-400 mt-4">
        10 Mei 2026
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-5xl mx-auto">

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold text-yellow-400">
            {timeLeft.days}
          </h1>
          <p className="mt-3 text-zinc-400">
            Hari
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold text-yellow-400">
            {timeLeft.hours}
          </h1>
          <p className="mt-3 text-zinc-400">
            Jam
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold text-yellow-400">
            {timeLeft.minutes}
          </h1>
          <p className="mt-3 text-zinc-400">
            Menit
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h1 className="text-5xl font-bold text-yellow-400">
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