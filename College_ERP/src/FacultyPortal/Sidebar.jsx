import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Clock,
  CheckSquare,
  FileText,
  Clipboard,
  Wrench,
  Briefcase,
  User,
  Pin,
  PinOff,
} from "lucide-react";

const MENU = [
  { id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "Students", label: "Students", icon: <Users size={18} /> },
  { id: "Courses", label: "Courses & Teaching", icon: <BookOpen size={18} /> },
  { id: "Timetable", label: "Time Table", icon: <Clock size={18} /> },
  { id: "Evaluation", label: "Evaluation & Result", icon: <CheckSquare size={18} /> },
  { id: "Approvals", label: "Student Documents", icon: <FileText size={18} /> },
  { id: "Assignments", label: "Assignments", icon: <Clipboard size={18} /> },
  { id: "Examination", label: "Examination", icon: <Wrench size={18} /> },
  { id: "Reports", label: "Reports & Analytics", icon: <Briefcase size={18} /> },
  { id: "Profile", label: "Profile", icon: <User size={18} /> },
];

export default function Sidebar({ activeSection, setActiveSection, pinned, setPinned, onExpandChange }) {
  const [hovered, setHovered] = useState(false);

  const expanded = pinned || hovered;

  useEffect(() => {
    onExpandChange?.(expanded);
  }, [expanded]);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-40
        transition-all duration-300
        ${expanded ? "w-64" : "w-16"}
        bg-white dark:bg-[#071025] border-r dark:border-gray-800
        flex flex-col
      `}
      onMouseEnter={() => !pinned && setHovered(true)}
      onMouseLeave={() => !pinned && setHovered(false)}
    >
      {/* --- Header --- */}
      <div className="p-4 flex items-center gap-3 border-b dark:border-gray-800">
        <img
          src="/image.png" // 👈 Put JECRC logo in /public/image.png
          alt="JECRC University"
          className="w-8 h-8 object-contain"
        />
        {expanded && (
          <div className="flex-1">
            <div className="font-bold">Faculty Portal</div>
            <div className="text-sm text-gray-500">JECRC University</div>
          </div>
        )}
        <button
          onClick={() => setPinned((p) => !p)}
          className="ml-auto p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {pinned ? <PinOff size={18} /> : <Pin size={18} />}
        </button>
      </div>

      {/* --- Navigation --- */}
      <nav className="p-3 flex-1">
        {MENU.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveSection(m.id)}
            className={`
              flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors
              ${activeSection === m.id
                ? "bg-red-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
            `}
          >
            {m.icon}
            {expanded && <span className="font-medium">{m.label}</span>}
          </button>
        ))}
      </nav>

      {/* --- Footer --- */}
      <div className="p-3 border-t dark:border-gray-800 text-center">
        {expanded && <div className="text-xs text-gray-400">v1.0</div>}
      </div>
    </aside>
  );
}
