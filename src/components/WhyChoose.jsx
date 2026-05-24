import "./../styles/whyChoose.css";

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="why-header">
        <h2>Why Choose Yusra Khan?</h2>
        <p>A simple personal-care storefront for daily essentials and gifts</p>
      </div>

      <div className="why-grid">
        <div className="why-card">
          <span className="why-icon">OK</span>
          <h3>Curated Products</h3>
          <p>Browse clean listings for skincare, hand care, and bath care.</p>
        </div>

        <div className="why-card">
          <span className="why-icon">01</span>
          <h3>Easy Shopping</h3>
          <p>Find products by name, price, and city with a quick storefront search.</p>
        </div>

        <div className="why-card">
          <span className="why-icon">WA</span>
          <h3>Direct WhatsApp</h3>
          <p>Contact the store directly for product questions, orders, and availability.</p>
        </div>

        <div className="why-card">
          <span className="why-icon">RS</span>
          <h3>Clear Pricing</h3>
          <p>Each listing includes product pricing and useful details.</p>
        </div>

        <div className="why-card">
          <span className="why-icon">YK</span>
          <h3>Beauty Essentials</h3>
          <p>Face wash, soap, serum, moisturizer, lotion, and hair oil in one place.</p>
        </div>

        <div className="why-card">
          <span className="why-icon">24</span>
          <h3>Ready to Expand</h3>
          <p>The catalog is prepared for more products, images, and live inventory.</p>
        </div>
      </div>
    </section>
  );
}
