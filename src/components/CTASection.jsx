import { useNavigate } from "react-router-dom";
import "./../styles/ctaSection.css";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="cta-content">
        <h2>Ready to Buy or Sell Your Car?</h2>
        <p>
          Join thousands of users buying and selling cars safely, quickly and
          at the best prices.
        </p>

        <div className="cta-buttons">
          <button
            className="cta-primary"
            onClick={() => navigate("/cars")}
          >
            Explore Cars
          </button>

          <button
            className="cta-secondary"
            onClick={() => navigate("/sell")}
          >
            Sell Your Car
          </button>
        </div>
      </div>
    </section>
  );
}
