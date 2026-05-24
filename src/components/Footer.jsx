import { Link } from "react-router-dom";
import "./../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h3>Yusra Khan</h3>
          <p>Product storefront</p>
          <br />
          <p>
            Shop skincare, soaps, hand wash, body care, and daily essentials
            with clear product images and details.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/cars">Shop Products</Link>
            </li>
            <li>
              <Link to="/used-cars">Best Sellers</Link>
            </li>
            <li>
              <Link to="/contact">Contact Store</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="socials">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="YouTube">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright {new Date().getFullYear()} Yusra Khan. All rights reserved.
      </div>
    </footer>
  );
}
