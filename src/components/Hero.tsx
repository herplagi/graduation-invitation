export default function Hero() {

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative"
    >

      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent" />

      <img
        src="/foto.jpg"
        alt="profile"
        className="w-52 h-52 rounded-full object-cover border-4 border-yellow-400 shadow-2xl"
      />

      <p className="mt-10 tracking-[5px] text-yellow-400 uppercase">
        Graduation Ceremony
      </p>

      <h1 className="text-6xl md:text-7xl font-bold mt-5">
        Alvino Albas
      </h1>

      <p className="mt-6 text-zinc-400 max-w-xl leading-8">
        Dengan penuh rasa syukur, saya mengundang
        Bapak/Ibu/Saudara/i untuk hadir dalam acara wisuda saya.
      </p>

    </section>
  )
}