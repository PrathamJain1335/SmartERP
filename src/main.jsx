import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // Login Page
import StudentDashboard from "./pages/Student.jsx"; // Student Dashboard
import FacultyDashboard from "./pages/Faculty.jsx"; // Faculty Dashboard
import AdminDashboard from "./pages/Admin.jsx";
import "./index.css"; // Global CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default Login / Landing */}
        <Route path="/" element={<App />} />

        {/* Student Dashboard */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* Faculty Dashboard */}
        <Route path="/faculty" element={<FacultyDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />

        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
