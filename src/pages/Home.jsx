import { useState } from "react";
import Hero from "../components/Hero";
import AutoScrollGallery from "../components/AutoScrollGallery";
import HowItWorks from "../components/HowItWorks";
import AnimatedDivider from "../components/AnimatedDivider";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import CarSearchBar from "../components/CarSearchBar";
import CarsListing from "../components/CarsListing";

import "../styles/hero.css";

export default function Home() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <Hero />
      <StatsSection />
      <AutoScrollGallery />
      <CarSearchBar onSearch={setFilters} />
      <CarsListing
        filters={filters}
        initialLimit={8}
        showExploreButton
      />

      <div className="gallery-heading">
        <h2>Explore Everyday Care Products</h2>
        <p>
          From face wash and hand soap to moisturizers and bath bars, discover
          products ready for your everyday routine.
        </p>
      </div>

      <AnimatedDivider />
      <HowItWorks />
      <AnimatedDivider />
      <CTASection />
      <AnimatedDivider />
      <AutoScrollGallery />
    </>
  );
}
