import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Guestbook = {
  id: number
  name: string
  message: string
}

export default function GuestBook() {

  const [messages, setMessages] =
    useState<Guestbook[]>([])

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  async function loadMessages() {

    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("id", { ascending: false })

    if (data) {
      setMessages(data)
    }
  }

  async function sendMessage() {

    if (!name || !message) return

    await supabase
      .from("guestbook")
      .insert([
        {
          name,
          message
        }
      ])

    setName("")
    setMessage("")

    loadMessages()
  }

  useEffect(() => {
    loadMessages()
  }, [])

  return (
    <section className="py-28 px-6">

      <div className="text-center">

        <p className="text-yellow-400 tracking-[4px] uppercase">
          Guest Book
        </p>

        <h1 className="text-5xl font-bold mt-5">
          Ucapan & Doa
        </h1>

      </div>

      <div className="max-w-3xl mx-auto mt-14">

        <div className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-900 p-4 rounded-xl"
          />

          <textarea
            placeholder="Ucapan"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-zinc-900 p-4 rounded-xl h-32"
          />

          <button
            onClick={sendMessage}
            className="bg-yellow-400 text-black font-bold p-4 rounded-xl"
          >
            Kirim Ucapan
          </button>

        </div>

        <div className="mt-14 flex flex-col gap-5">

          {
            messages.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 p-6 rounded-3xl"
              >

                <h1 className="font-bold text-xl">
                  {item.name}
                </h1>

                <p className="text-zinc-400 mt-3 leading-7">
                  {item.message}
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </section>
  )
}