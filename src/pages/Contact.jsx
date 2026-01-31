import "./../styles/contact.css";

export default function Contact() {
  // 🔴 CHANGE THIS NUMBER ONLY
  // Format: countrycode + number (NO +, NO spaces)
  const whatsappNumber = "917060160754";

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const whatsappMessage = `Hello, I contacted you from CarSell website.%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* LEFT INFO */}
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p>
            Have questions about buying or selling a car?
            We’re here to help you.
          </p>

          <div className="info-box">
            <h4>Email</h4>
            <span>atulsharmas2806@gmail.com</span>
          </div>

          <div className="info-box">
            <h4>Phone</h4>
            <span>+91 70601 60754</span>
          </div>

          <div className="info-box">
            <h4>Address</h4>
            <span>Aligarh, India</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form">
          <h2>Send us a message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
