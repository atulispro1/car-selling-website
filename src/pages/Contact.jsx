import "./../styles/contact.css";

export default function Contact() {
  const whatsappNumber = "7900377204";

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const whatsappMessage = `Hello, I contacted you from yusieorganics website.%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Contact yusieorganics</h1>
          <p>
            Have questions about skincare, soap, hand wash, bundles, ingredients,
            or product availability? We are here to help you.
          </p>

          <div className="info-box">
            <h4>Email</h4>
            <span>hello@yusieorganics.com</span>
          </div>

          <div className="info-box">
            <h4>Phone</h4>
            <span>+91 79003 77204</span>
          </div>

          <div className="info-box">
            <h4>Address</h4>
            <span>Aligarh, India</span>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a message</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />

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
