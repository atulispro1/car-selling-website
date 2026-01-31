import { Link } from "react-router-dom";
import "./../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* BRAND */}
        <div className="footer-col">
          <h3>CarSell</h3>
          <p>Created by Atul Sharma</p>
          <br />
          <p>
            Buy and sell premium new & used cars with trust,
            transparency and ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/cars">Buy Cars</Link></li>
            <li><Link to="/sell">Sell Car</Link></li>
            <li><Link to="/cars">Used Cars</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="socials">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CarSell. All rights reserved. Created by Atul Sharma
      </div>
    </footer>
  );
}
