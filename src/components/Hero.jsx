import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { useAuth } from "../context/AuthContext";

import car1 from "../assets/images/car1.jpg";
import car2 from "../assets/images/car2.jpg";
import car3 from "../assets/images/car3.jpg";
import car4 from "../assets/images/car4.jpg";
import car5 from "../assets/images/car5.jpg";
import car6 from "../assets/images/car6.jpg";
import car7 from "../assets/images/car7.jpg";

export default function Hero() {
  const imagesRef = useRef([]);
  const currentIndex = useRef(0);
  const intervalRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const images = [car1, car2, car3, car4, car5, car6, car7];

  /* ---------------- SLIDE LOGIC ---------------- */
  const slideTo = (nextIndex) => {
    if (nextIndex === currentIndex.current) return;

    const currentImg = imagesRef.current[currentIndex.current];
    const nextImg = imagesRef.current[nextIndex];

    gsap
      .timeline()
      .to(currentImg, {
        opacity: 0,
        scale: 1.08,
        duration: 1.4,
        ease: "power2.inOut",
      })
      .fromTo(
        nextImg,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.inOut" },
        "-=1.0"
      );

    currentIndex.current = nextIndex;
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (currentIndex.current + 1) % images.length;
      slideTo(next);
    }, 3000);
  };

  useEffect(() => {
    gsap.set(imagesRef.current, { opacity: 0 });
    gsap.set(imagesRef.current[0], { opacity: 1 });
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, []);

  /* ---------------- CONTROLS ---------------- */
  const prevSlide = () => {
    slideTo(
      (currentIndex.current - 1 + images.length) % images.length
    );
    startAutoSlide();
  };

  const nextSlide = () => {
    slideTo((currentIndex.current + 1) % images.length);
    startAutoSlide();
  };

  /* ---------------- BUTTON HANDLERS ---------------- */
  const handleExplore = () => {
    navigate("/cars");
  };

  const handleSell = () => {
    if (!user) {
      alert("You must be logged in first to sell a car.");
      navigate("/login");
      return;
    }
    navigate("/sell");
  };

  return (
    <section className="hero">
      {/* BACKGROUND SLIDER */}
      <div className="hero-bg-slider">
        {images.map((img, i) => (
          <img
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            src={img}
            className="hero-bg"
            alt="car background"
          />
        ))}
      </div>

      <div className="hero-overlay"></div>

      {/* SLIDER CONTROLS */}
      <button className="slider-btn left" onClick={prevSlide}>
        ‹
      </button>
      <button className="slider-btn right" onClick={nextSlide}>
        ›
      </button>

      {/* CONTENT */}
      <div className="hero-content">
        <h1>
          Drive Your <span>Dream Car</span>
        </h1>

        <p>
          Discover premium, luxury and performance cars curated just for you.
        </p>

        <div className="hero-buttons">
          <button className="primary" onClick={handleExplore}>
            Explore Cars
          </button>

          <button className="secondary" onClick={handleSell}>
            Sell Your Car
          </button>
        </div>
      </div>
    </section>
  );
}
