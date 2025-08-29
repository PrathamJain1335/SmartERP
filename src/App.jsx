import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import background from "./assets/bg.png";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="background" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay">
        <div className="login-container">
          <img src={logo} alt="JECRC University Logo" className="logo" />
          <h2 className="title">Log In</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="User Name"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((v) => !v)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                &#128065;
              </span>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <div className="forgot">
            Forgot Password? <a href="#">Click here</a>
          </div>
          <div className="address">
            Plot No. IS-2036 to IS-2039 Ramchandrapura Industrial Area, Sitapura, Vidhani, Jaipur, Rajasthan 303905
          </div>
        </div>
      </div>
    </div>
  );
}
