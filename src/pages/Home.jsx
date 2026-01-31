import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import AutoScrollGallery from "../components/AutoScrollGallery";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import AnimatedDivider from "../components/AnimatedDivider";
import Testimonials from "../components/Testimonials";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import Newsletter from "../components/Newsletter";
import CarSearchBar from "../components/CarSearchBar";

import "../styles/hero.css";

export default function Home() {
  return (
    <>
      <Hero />
      <CarSearchBar />
      <StatsSection />
      {/* ===== GALLERY SECTION ===== */}
      <div className="gallery-heading">
        <h2>Explore the World of Cars</h2>
        <p>
          From luxury sedans to powerful SUVs — discover vehicles that define
          style, performance, and passion.
        </p>
      </div>

      <AutoScrollGallery />
      <AnimatedDivider />
      <WhyChoose />
      <AnimatedDivider />
      <HowItWorks />
      <AnimatedDivider />
      <Testimonials />
      <AnimatedDivider />
      <CTASection />
      <AnimatedDivider />
      <Newsletter />
      <AnimatedDivider />

      <FeaturedCars />
      <AutoScrollGallery />
    </>
  );
}
