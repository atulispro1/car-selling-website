import "./../styles/testimonials.css";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sana Khan",
      city: "Delhi",
      rating: 5,
      text: "The face wash and soap combo felt fresh, simple, and nicely packed.",
    },
    {
      name: "Ananya Verma",
      city: "Mumbai",
      rating: 4,
      text: "Loved browsing the product images. The catalog feels clean and easy.",
    },
    {
      name: "Mehak Ali",
      city: "Bangalore",
      rating: 5,
      text: "The moisturizer listing had clear details and the WhatsApp contact was helpful.",
    },
    {
      name: "Priya Singh",
      city: "Pune",
      rating: 4,
      text: "Great place to compare skincare basics and daily-use care products.",
    },
  ];

  return (
    <section className="testimonials">
      <h2 className="test-title">What Customers Say</h2>
      <p className="test-sub">Trusted for skincare and daily-care essentials</p>

      <div className="test-grid">
        {reviews.map((r, i) => (
          <div className="test-card" key={i}>
            <div className="test-header">
              <div className="avatar">{r.name.charAt(0)}</div>
              <div>
                <h4>{r.name}</h4>
                <span>{r.city}</span>
              </div>
            </div>

            <div className="stars">
              {"*".repeat(r.rating)}
              {".".repeat(5 - r.rating)}
            </div>

            <p className="review-text">"{r.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
