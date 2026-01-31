import "./../styles/howItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-header">
        <h2>How CarSell Works</h2>
        <p>Buy or sell cars in just a few simple steps</p>
      </div>

      <div className="how-steps">
        <div className="how-step">
          <div className="step-number">1</div>
          <h3>Create Account</h3>
          <p>
            Sign up for free and get access to buy, sell, and manage your car
            listings.
          </p>
        </div>

        <div className="how-step">
          <div className="step-number">2</div>
          <h3>List or Explore Cars</h3>
          <p>
            Sell your car by adding details or explore verified new and used
            cars.
          </p>
        </div>

        <div className="how-step">
          <div className="step-number">3</div>
          <h3>Connect Directly</h3>
          <p>
            Contact sellers directly via phone or WhatsApp — no brokers involved.
          </p>
        </div>

        <div className="how-step">
          <div className="step-number">4</div>
          <h3>Close the Deal</h3>
          <p>
            Finalize the deal at the best price with complete transparency.
          </p>
        </div>
      </div>
    </section>
  );
}
