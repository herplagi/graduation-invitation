export default function RSVP() {

  return (
    <section className="py-28 px-6">

      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-3xl p-10">

        <div className="text-center">

          <p className="text-yellow-400 tracking-[4px] uppercase">
            RSVP
          </p>

          <h1 className="text-5xl font-bold mt-5">
            Konfirmasi Kehadiran
          </h1>

        </div>

        <div className="flex flex-col gap-5 mt-12">

          <input
            type="text"
            placeholder="Nama"
            className="bg-black p-4 rounded-xl"
          />

          <select
            className="bg-black p-4 rounded-xl"
          >
            <option>Hadir</option>
            <option>Tidak Hadir</option>
          </select>

          <button
            className="bg-yellow-400 text-black font-bold p-4 rounded-xl"
          >
            Kirim RSVP
          </button>

        </div>

      </div>

    </section>
  )
}