// src/FacultyPortal/Faculty.jsx

import React, { useEffect, useState } from "react";
import Header from "./FacultyPortal/Header";
import Shell from "./FacultyPortal/Shell";
import Sidebar from "./FacultyPortal/Sidebar";
import Main from "./FacultyPortal/Main";
import Chatbot from "./FacultyPortal/Chatbot";

// Example profile and dashboard data. Adjust as needed, or pass as props/context
const initialData = {
  profile: {
    name: "Dr. Priya Sharma",
    designation: "Assistant Professor",
    email: "priya@jecrc.ac.in",
    facultyId: "FAC101",
    photo: "", // Use user's photo URL or leave blank for fallback
  },
  students: [
    { id: "s1", roll: "STU-001", name: "Aarav Sharma" },
    { id: "s2", roll: "STU-002", name: "Diya Patel" },
    { id: "s3", roll: "STU-003", name: "Rohan Gupta" },
  ],
  courses: [
    {
      id: "c1",
      title: "Mathematics I",
      description: "Mathematics basics",
      syllabus: ["Algebra", "Calculus"],
      lessons: ["Intro", "Limits"],
    },
    {
      id: "c2",
      title: "Physics",
      description: "Mechanics",
      syllabus: ["Kinematics", "Dynamics"],
      lessons: ["Vectors", "Newton"],
    },
  ],
  assignedCells: [
    { row: 0, col: 1, label: "Mathematics I\nCS101", color: "#cbe4ff", section: "CS101" },
    { row: 1, col: 2, label: "Physics\nCS102", color: "#ffecd0", section: "CS102" },
    { row: 2, col: 3, label: "Programming\nCS101", color: "#ffd2e8", section: "CS101" },
    { row: 3, col: 4, label: "Electronics\nEE201", color: "#d2ffd7", section: "EE201" },
    { row: 4, col: 5, label: "Engg Graphics\nME202", color: "#f1fdd6", section: "ME202" },
  ],
  fullTimeSlots: [
    "8:00 - 8:50",
    "8:50 - 9:40",
    "9:40 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10",
    "12:10 - 13:00",
    "13:00 - 13:50",
  ],
  evaluations: [{ id: "e1", title: "Midterm", course: "Mathematics I", uploaded: false }],
  approvals: [
    { id: "ap1", type: "Certificate", section: "CS101-A", student: "Aarav Sharma", status: "pending" },
  ],
  assignments: [
    { id: "as1", title: "Assignment 1: Intro to C++", deadline: "2025-09-10", marks: 20 },
  ],
  exams: [{ id: "ex1", title: "End Sem", date: "2025-12-15" }],
  reports: [],
  notifications: [{ id: 1, title: "Internship approval pending", timestamp: "Today, 10:30 AM", seen: false }],
};

export default function Faculty() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [pinned, setPinned] = useState(() =>
    JSON.parse(localStorage.getItem("sidebarPinned") || "true")
  );
  const [sidebarExpanded, setSidebarExpanded] = useState(pinned);
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePage") || "Dashboard"
  );
  const [data, setData] = useState(initialData);

  // Main dashboard handlers as before
  const handlers = {
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    theme,
    approve: (id) =>
      setData((d) => ({
        ...d,
        approvals: d.approvals.map((a) =>
          a.id === id ? { ...a, status: "approved" } : a
        ),
      })),
    reject: (id) =>
      setData((d) => ({
        ...d,
        approvals: d.approvals.map((a) =>
          a.id === id ? { ...a, status: "rejected" } : a
        ),
      })),
    createAssignment: (assignment) =>
      setData((d) => ({ ...d, assignments: [assignment, ...d.assignments] })),
    updateProfile: (prof) => setData((d) => ({ ...d, profile: prof })),
    saveMarks: (payload) => {
      console.log("Saved marks (mock):", payload);
    },
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("sidebarPinned", JSON.stringify(pinned));
  }, [pinned]);
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#081028] transition-colors">
      {/* <Header
        activePage={activePage}
        theme={theme}
        toggleTheme={handlers.toggleTheme}
        notifications={data.notifications}
        user={{ name: data.profile.name, photo: data.profile.photo }}
        onLogout={() => window.location.href = "/"} // replace with better logic as needed
        onProfile={() => setActivePage("Profile")}
      /> */}
      <Shell
        sidebar={
          <Sidebar
            activeSection={activePage}
            setActiveSection={setActivePage}
            pinned={pinned}
            setPinned={setPinned}
            onExpandChange={setSidebarExpanded}
          />
        }
        main={<Main activePage={activePage} data={data} handlers={handlers} />}
        sidebarExpanded={sidebarExpanded}
      />
      <Chatbot />
    </div>
  );
}
