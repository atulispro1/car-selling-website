import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import "../styles/authToggle.css";

export default function Auth() {
  useEffect(() => {
    document.body.setAttribute("data-theme", "light");
    return () => {
      // Restore theme on unmount
    };
  }, []);

  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // States
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await login(loginUser, loginPass);
    navigate("/");
  } catch {
    alert("Invalid credentials");
  }
};

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    await signup(regEmail, regPass, regName);
    alert("Account created successfully. Please login.");
    setIsRegister(false);
  } catch (error) {
    alert(error.message);
  }
};




  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className={`tab ${!isRegister ? 'active' : ''}`} onClick={() => setIsRegister(false)}>
            Login
          </div>
          <div className={`tab ${isRegister ? 'active' : ''}`} onClick={() => setIsRegister(true)}>
            Register
          </div>
        </div>

        {/* Form */}
        <div className={`auth-form ${isRegister ? 'register' : 'login'}`}>
          {!isRegister ? (
            <form onSubmit={handleLogin} className="form-container">
              <h2>Welcome Back</h2>
              <p>Enter your credentials to continue</p>
              
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  required
                />
                <span className="input-icon">📧</span>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  required
                />
                <span className="input-icon">🔒</span>
              </div>

              <a href="#" className="forgot-link">Forgot Password?</a>
              
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="form-container">
              <h2>Create Account</h2>
              <p>Join us today</p>
              
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
                <span className="input-icon">👤</span>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
                <span className="input-icon">📧</span>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  required
                />
                <span className="input-icon">🔒</span>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
