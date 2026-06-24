import Hero from '../components/Hero'
import GallerySection from '../components/GallerySection'
import FoodSection from '../components/FoodSection'
import TravelSection from '../components/TravelSection'
import CompanyLinks from '../components/CompanyLinks'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <GallerySection />
      <FoodSection />
      <TravelSection />
      <CompanyLinks />
      <Footer />
    </>
  )
}
