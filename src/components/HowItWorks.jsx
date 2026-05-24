import "./../styles/howItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-header">
        <h2>How Yusra Khan Works</h2>
        <p>Browse products and connect with the store in a few simple steps</p>
      </div>

      <div className="how-steps">
        <div className="how-step">
          <div className="step-number">1</div>
          <h3>Explore Catalog</h3>
          <p>View face wash, hand soap, soap bars, serums, lotions, and more.</p>
        </div>

        <div className="how-step">
          <div className="step-number">2</div>
          <h3>Check Details</h3>
          <p>Open any product to see images, size, category, price, and description.</p>
        </div>

        <div className="how-step">
          <div className="step-number">3</div>
          <h3>Ask on WhatsApp</h3>
          <p>Use the contact button to ask about stock, delivery, and product bundles.</p>
        </div>

        <div className="how-step">
          <div className="step-number">4</div>
          <h3>Place Order</h3>
          <p>Finalize orders directly with the store until checkout is added.</p>
        </div>
      </div>
    </section>
  );
}
