import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Faculty from "./Faculty"; // Correct path to Faculty.jsx inside FacultyPortal
import Admin from "./Admin";
import Student from "./Student"; // Correct path to Student.jsx inside StudentPortal



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/faculty/*" element={<Faculty />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/student/*" element={<Student />} />
    </Routes>
  );
}

