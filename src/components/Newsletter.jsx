import { useState } from "react";
import "./../styles/newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <h2>Stay Updated</h2>
        <p>
          Subscribe for new skincare drops, soap bundles, sample deals, and
          product updates from Yusra Khan.
        </p>

        {!subscribed ? (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        ) : (
          <div className="newsletter-success">
            You are subscribed!
            <span>We will keep you updated.</span>
          </div>
        )}
      </div>
    </section>
  );
}
