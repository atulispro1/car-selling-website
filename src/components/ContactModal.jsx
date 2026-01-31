import "./../styles/contactModal.css";

export default function ContactModal({ open, onClose, car }) {
  if (!open) return null;

  const whatsappNumber = car?.sellerPhone;
  const message = `Hi ${car?.sellerName}, I'm interested in your car (${car?.name}) listed on CarSell.`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Contact Seller</h2>
        <p>You can directly contact the seller via WhatsApp.</p>

        <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn"
          style={{ display: "inline-block", textAlign: "center" }}
        >
          Open WhatsApp
        </a>
      </div>
    </div>
  );
}
