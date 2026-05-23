import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const imagesRef = useRef([]);
  const currentIndex = useRef(0);
  const intervalRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const images = [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1600&q=80",
  ];

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
      alert("You must be logged in first to add a product.");
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
            alt="beauty product background"
          />
        ))}
      </div>

      <div className="hero-overlay"></div>

      {/* SLIDER CONTROLS */}
      <button className="slider-btn left" onClick={prevSlide}>
        &lt;
      </button>
      <button className="slider-btn right" onClick={nextSlide}>
        &gt;
      </button>

      {/* CONTENT */}
      <div className="hero-content">
        <h1>
          Discover <span>Daily Glow Essentials</span>
        </h1>

        <p>
          Shop sample skincare, soaps, hand wash, hair care, and bath products
          curated for a fresh everyday routine.
        </p>

        <div className="hero-buttons">
          <button className="primary" onClick={handleExplore}>
            Shop Products
          </button>

          <button className="secondary" onClick={handleSell}>
            Add Product
          </button>
        </div>
      </div>
    </section>
  );
}
