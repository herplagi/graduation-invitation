import Opening from "./components/Opening.tsx"
import Hero from "./components/Hero"
import Countdown from "./components/Countdown"
import Gallery from "./components/Gallery"
import Location from "./components/Location"
import RSVP from "./components/RSVP"
import GuestBook from "./components/GuestBook"
import Footer from "./components/Footer"

export default function App() {

  return (
    <main className="bg-black text-white overflow-x-hidden">

      <Opening />

      <Hero />

      <Countdown />

      <Gallery />

      <Location />

      <RSVP />

      <GuestBook />

      <Footer />

    </main>
  )
}