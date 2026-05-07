export default function Gallery() {
  const images = [
    import.meta.env.BASE_URL + "gallery1.jpg",
    import.meta.env.BASE_URL + "gallery6.jpg",
    import.meta.env.BASE_URL + "gallery5.jpg",
    import.meta.env.BASE_URL + "gallery9.jpg",
  ];

  return (
    <section className="py-28 px-6">
      <div className="text-center">
        <p className="text-yellow-400 tracking-[4px] uppercase">
          Gallery
        </p>

        <h1 className="text-5xl font-bold mt-5">
          Momen Kenangan
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            className="rounded-3xl w-full h-[400px] object-cover object-center hover:scale-[1.02] duration-300"
          />
        ))}
      </div>
    </section>
  );
}