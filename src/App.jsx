import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FacultyDashboard from "./pages/Faculty.jsx";
import StudentDashboard from "./pages/Student.jsx";

import "./App.css";
import logo from "./assets/logo.png";
import background from "./assets/bg.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "student" && password === "student123") {
      navigate("/student");   // student route
    } else if (username === "faculty" && password === "faculty123") {
      navigate("/faculty");   // faculty route
    } else {
      alert("Invalid credentials. Try student or faculty with respective passwords.");
    }
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
            <button type="submit" className="login-button">Log In</button>
          </form>
          <div className="forgot">Forgot Password? <a href="#">Click here</a></div>
          <div className="address">
            Plot No. IS-2036 to IS-2039 Ramchandrapura Industrial Area,
            Sitapura, Vidhani, Jaipur, Rajasthan 303905
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <LoginPage />;
}
