export default function Location() {

  return (
    <section className="py-28 px-6 text-center">

      <p className="text-yellow-400 tracking-[4px] uppercase">
        Location
      </p>

      <h1 className="text-5xl font-bold mt-5">
        Lokasi Wisuda
      </h1>

      <div className="max-w-4xl mx-auto mt-14 rounded-3xl overflow-hidden">

        <iframe
          src="https://www.google.com/maps/embed?pb="
          width="100%"
          height="450"
          loading="lazy"
        />

      </div>

    </section>
  )
}