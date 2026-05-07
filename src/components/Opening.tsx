import { useState } from "react"

export default function Opening() {

  const [open, setOpen] = useState(false)

  if (open) return null

  return (
    <section className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center text-center px-6">

      <p className="text-yellow-400 tracking-[6px] uppercase">
        Graduation Invitation
      </p>

      <h1 className="text-5xl font-bold mt-5">
        Alvino Albas
      </h1>

      <p className="text-zinc-400 mt-4">
        Wisuda Sistem Informasi
      </p>

      <button
        onClick={() => setOpen(true)}
        className="mt-10 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 duration-300"
      >
        Buka Undangan
      </button>

    </section>
  )
}