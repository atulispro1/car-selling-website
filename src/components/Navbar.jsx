import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "./../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = location.pathname === "/login";
  const firstLetter = user?.name?.charAt(0).toUpperCase();
  const isAdmin = Boolean(user?.isAdmin);

  const handleLogout = async () => {
    await logout();
    window.location.assign("/");
  };

  const handleSellClick = () => {
    if (!user) {
      alert("You must be logged in first to add a product.");
      navigate("/login");
      return;
    }

    if (!isAdmin) {
      alert(
        "Only the admin can add products. You can browse, comment, and buy products.",
      );
      navigate("/cars");
      setMenuOpen(false);
      return;
    }

    navigate("/sell");
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo-box">
        <span className="logo-image">YO</span>
        <span className="brand-name">yusieorganics</span>
      </Link>

      <nav className="nav-center desktop-only">
        <Link to="/cars">Shop Products</Link>
        <Link to="/used-cars">Best Sellers</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="nav-right desktop-only">
        {!isAuthPage && <ThemeToggle />}

        {isAdmin && (
          <button className="sell-btn" onClick={handleSellClick}>
            Add Product
          </button>
        )}

        {user ? (
          <div className="user-area">
            <div className="user-avatar">{firstLetter}</div>
            <span className="user-greeting">Hi, {user.name.split(" ")[0]}</span>

            {isAdmin && (
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
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Admin Login
          </Link>
        )}
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {user && (
          <div className="mobile-user">
            <div className="user-avatar">{firstLetter}</div>
            <span>{user.name}</span>
          </div>
        )}

        <Link to="/cars" onClick={() => setMenuOpen(false)}>
          Shop Products
        </Link>
        <Link to="/used-cars" onClick={() => setMenuOpen(false)}>
          Best Sellers
        </Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        {isAdmin && (
          <button className="sell-btn" onClick={handleSellClick}>
            Add Product
          </button>
        )}

        {!isAuthPage && <ThemeToggle />}

        {user ? (
          <>
            {isAdmin && (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <button
              className="logout-btn"
              onClick={async () => {
                await logout();
                setMenuOpen(false);
                window.location.assign("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Admin Login
          </Link>
        )}
      </div>
    </header>
  );
}
