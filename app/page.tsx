import Hero from '@/components/hero'
import Services from '@/components/services'
import MapSection from '@/components/map-section'
import Reviews from '@/components/reviews'
import Footer from '@/components/footer'
import Header from '@/components/MainNavbar'
import CalculatorModal from '@/components/calculator-modal'

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Header />
      <Hero />
      <Services />
      <Reviews />
      <MapSection />
      <Footer />
      <CalculatorModal />
    </main>
  )
}