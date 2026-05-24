import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/authToggle.css";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(loginUser, loginPass);
      window.location.assign("/");
    } catch {
      alert("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <button type="button" className="tab active">
            Admin Login
          </button>
        </div>

        <div className="auth-form login">
          <form onSubmit={handleLogin} className="form-container">
            <h2>Admin Access</h2>
            <p>Customers can browse and buy without logging in</p>

            <div className="input-group">
              <input
                type="email"
                placeholder="Admin email"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                required
              />
              <span className="input-icon">@</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Admin password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
              <span className="input-icon">#</span>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
