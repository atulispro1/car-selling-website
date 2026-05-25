import { useNavigate } from "react-router-dom";
import "./../styles/ctaSection.css";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="cta-content">
        <h2>Ready to Build Your Skincare Routine?</h2>
        <p>
          Browse skincare and daily-care products, then contact yusieorganics
          directly for availability, bundles, and routine suggestions.
        </p>

        <div className="cta-buttons">
          <button className="cta-primary" onClick={() => navigate("/cars")}>
            Shop Products
          </button>

          <button className="cta-secondary" onClick={() => navigate("/contact")}>
            Contact Store
          </button>
        </div>
      </div>
    </section>
  );
}
