import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/logo.png";
import "./../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = location.pathname === "/login";
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleSellClick = () => {
    if (!user) {
      alert("You must be logged in first to sell a car.");
      navigate("/login");
      return;
    }
    navigate("/sell");
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <Link to="/" className="logo-box">
        <img src={logo} alt="CarSell Logo" className="logo-image" />
        <span className="brand-name">CarSell</span>
      </Link>

      {/* DESKTOP CENTER */}
      <nav className="nav-center desktop-only">
        <Link to="/cars">Buy Cars</Link>
        <Link to="/used-cars">Used Cars</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* DESKTOP RIGHT */}
      <div className="nav-right desktop-only">
        {!isAuthPage && <ThemeToggle />}

        <button className="sell-btn" onClick={handleSellClick}>
          Sell Car
        </button>

        {user ? (
          <div className="user-area">
            <div className="user-avatar">{firstLetter}</div>
            <span className="user-greeting">Hi, {user.name.split(" ")[0]}</span>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "dashboard-btn dashboard-btn-active"
                  : "dashboard-btn"
              }
            >
              Dashboard
            </NavLink>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>

      {/* HAMBURGER */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {user && (
          <div className="mobile-user">
            <div className="user-avatar">{firstLetter}</div>
            <span>{user.name}</span>
          </div>
        )}

        <Link to="/cars" onClick={() => setMenuOpen(false)}>
          Buy Cars
        </Link>
        <Link to="/used-cars" onClick={() => setMenuOpen(false)}>
          Used Cars
        </Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        <button className="sell-btn" onClick={handleSellClick}>
          Sell Car
        </button>

        {!isAuthPage && <ThemeToggle />}

        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
