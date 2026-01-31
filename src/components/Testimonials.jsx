import "./../styles/testimonials.css";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rohit Sharma",
      city: "Delhi",
      rating: 5,
      text: "Selling my car was super easy. Got genuine buyers within 2 days. Highly recommended!",
    },
    {
      name: "Ananya Verma",
      city: "Mumbai",
      rating: 4,
      text: "Loved the clean interface and smooth experience. Buying a used car felt very safe here.",
    },
    {
      name: "Aman Gupta",
      city: "Bangalore",
      rating: 5,
      text: "Best car marketplace I’ve used. The image gallery and contact options are top-notch.",
    },
    {
      name: "Priya Singh",
      city: "Pune",
      rating: 4,
      text: "Great platform for comparing cars. The seller contact feature is very helpful.",
    },
  ];

  return (
    <section className="testimonials">
      <h2 className="test-title">What Our Customers Say</h2>
      <p className="test-sub">
        Trusted by thousands of buyers and sellers across India
      </p>

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
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>

            <p className="review-text">“{r.text}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
