export default function Location() {
  return (
    <section className="py-28 px-6 text-center">
      <p className="text-yellow-400 tracking-[4px] uppercase">Location</p>

      <h1 className="text-5xl font-bold mt-5">Lokasi Wisuda</h1>

      <div className="max-w-4xl mx-auto mt-14 rounded-3xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.309172682548!2d100.45847837496508!3d-0.9153507990757912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7963e1ea631%3A0x452d09b61f76d6ec!2sFakultas%20Teknologi%20InformasiUniversitas%20Andalas!5e0!3m2!1sid!2sid!4v1778147003056!5m2!1sid!2sid"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
