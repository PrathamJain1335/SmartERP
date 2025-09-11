import React, { useEffect, useState } from "react";
import Dashboard from "./StudentPortal/Dashboard";
import Header from "./StudentPortal/Header";
import Shell from "./StudentPortal/Shell";
import Sidebar from "./StudentPortal/Sidebar";
import Main from "./StudentPortal/Main";
import Chatbot from "./StudentPortal/Chatbot";
import NotificationPanel from "./StudentPortal/NotificationPanel";
import Profile from "./StudentPortal/Profile";
import Courses from "./StudentPortal/Course";
import Result from "./StudentPortal/Result";
import Attendance from "./StudentPortal/Attendance";
import Assignments from "./StudentPortal/Assignment";
import Examination from "./StudentPortal/Examination";
import Certificates from "./StudentPortal/Certificates";
import Career from "./StudentPortal/Career";
import Reports from "./StudentPortal/Reports";
import Library from "./StudentPortal/Library";
import Academics from "./StudentPortal/Academics";
import Fees from "./StudentPortal/Fees";
import Internal from "./StudentPortal/InternalMarks";
import "./theme.css";

// Fallback component for missing or non-exported sections
const Placeholder = () => (
  <div className="p-6 text-[var(--text)] dark:text-[var(--text)] bg-[var(--bg)] dark:bg-[var(--bg)]">
    <h2 className="text-xl font-semibold">Under Construction</h2>
    <p className="text-[var(--muted)] dark:text-[var(--muted)]">This section is not yet implemented.</p>
  </div>
);

const initialData = {
  profile: { name: "Pratham Jain ", rollNumber: "24BCON2776", email: "prathamjain.24bcon2776.@jecrc.ac.in", photo: "./pratham.png" },
  courses: [{ id: "c1", title: "Advanced Mathematics", code: "CS101", instructor: "Dr. Priya Sharma", schedule: "Mon/Wed 8:00-9:40", enrolled: true }],
  results: [{ id: "r1", course: "Advanced Mathematics", grade: "A", semester: "Fall 2025" }],
  attendance: [{ id: "a1", course: "Advanced Mathematics", date: "2025-09-09", present: true }],
  assignments: [{ id: "as1", course: "Advanced Mathematics", title: "Assignment 3", dueDate: "2025-09-11", submitted: false }],
  exams: [{ id: "ex1", course: "Advanced Mathematics", title: "Midterm", date: "2025-09-15" }],
  notifications: [
    { id: 1, title: "Mid-term exam schedule published", timestamp: "Today, 11:36 PM", seen: false },
    { id: 2, title: "Library hours extended", timestamp: "Yesterday, 10:00 AM", seen: false },
    { id: 3, title: "Guest Lecture on AI", timestamp: "2025-09-07, 2:00 PM", seen: false },
  ],
};

export default function Student() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [pinned, setPinned] = useState(() => JSON.parse(localStorage.getItem("sidebarPinned") || "true"));
  const [sidebarExpanded, setSidebarExpanded] = useState(pinned);
  const [activePage, setActivePage] = useState(() => localStorage.getItem("activePage") || "Dashboard");
  const [data, setData] = useState(initialData);

  const handlers = {
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    submitAssignment: (assignmentId) => setData((d) => ({
      ...d,
      assignments: d.assignments.map((a) => a.id === assignmentId ? { ...a, submitted: true } : a),
    })),
    updateProfile: (prof) => setData((d) => ({ ...d, profile: prof })),
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark-root", theme === "dark");
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("sidebarPinned", JSON.stringify(pinned));
  }, [pinned]);
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const pageComponents = {
    Dashboard,
    Profile,
    Courses,
    Result,
    Attendance,
    Assignments,
    Examination,
    Certificates,
    Career,
    Reports,
    Library,
    Academics,
    Fees,
    Internal,
    NotificationPanel,
  };

  // Fallback to Placeholder if component is not a function or lacks default export
  const getComponent = (name) => {
    const Component = pageComponents[name] || Placeholder;
    return typeof Component === "function" ? Component : Placeholder;
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] dark:bg-[var(--bg)] transition-colors duration-300">
      <Header
        activePage={activePage}
        theme={theme}
        toggleTheme={handlers.toggleTheme}
        notifications={data.notifications}
        user={{ name: data.profile.name, id: data.profile.rollNumber }}
        onLogout={() => window.location.href = "/"}
        onProfile={() => setActivePage("Profile")}
      />
      <Shell
        sidebar={
          <Sidebar
            pinned={pinned}
            setPinned={setPinned}
            onExpandChange={setSidebarExpanded}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        }
        main={
          <Main
            activePage={activePage}
            data={data}
            handlers={handlers}
            pageComponents={pageComponents}
            getComponent={getComponent}
          />
        }
        sidebarExpanded={sidebarExpanded}
      />
      <Chatbot />
    </div>
  );
}