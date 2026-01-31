import "./../styles/whyChoose.css";

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="why-header">
        <h2>Why Choose CarSell?</h2>
        <p>
          A smarter, faster and safer way to buy and sell cars across India
        </p>
      </div>

      <div className="why-grid">
        <div className="why-card">
          <span className="why-icon">✅</span>
          <h3>Verified Listings</h3>
          <p>
            Every car listing is posted by real users with complete details and
            transparency.
          </p>
        </div>

        <div className="why-card">
          <span className="why-icon">⚡</span>
          <h3>Fast & Easy</h3>
          <p>
            List your car in minutes or find your dream car without any hassle.
          </p>
        </div>

        <div className="why-card">
          <span className="why-icon">📞</span>
          <h3>Direct Contact</h3>
          <p>
            Contact sellers directly via WhatsApp or phone — no middlemen.
          </p>
        </div>

        <div className="why-card">
          <span className="why-icon">💰</span>
          <h3>Best Prices</h3>
          <p>
            Compare multiple cars and get the best deal that fits your budget.
          </p>
        </div>

        <div className="why-card">
          <span className="why-icon">🚗</span>
          <h3>New & Used Cars</h3>
          <p>
            Explore both brand-new models and trusted used cars in one place.
          </p>
        </div>

        <div className="why-card">
          <span className="why-icon">🔒</span>
          <h3>Secure Platform</h3>
          <p>
            Your data is safe and your listings stay under your control.
          </p>
        </div>
      </div>
    </section>
  );
}
