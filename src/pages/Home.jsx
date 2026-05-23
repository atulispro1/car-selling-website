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

      <div className="gallery-heading">
        <h2>Explore Everyday Care Products</h2>
        <p>
          From face wash and hand soap to moisturizers and bath bars, discover
          sample products ready for a polished storefront.
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
