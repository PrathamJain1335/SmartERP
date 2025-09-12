// src/AdminPortal/Header.jsx
import React, { useState } from "react";
import { Bell, MessageSquare, User, Moon, Sun } from "lucide-react";

export default function Header({ theme, toggleTheme, notifications = [], user = {}, onLogout, onProfile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-[#ffffff] text-black-200 p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Title */}
      <h1 className="text-xl font-semibold">Admin</h1>

      {/* Right-side action buttons */}
      <div className="flex items-center space-x-6 relative">
        {/* Dark/Light Mode Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[#383849] transition"
          aria-label="Toggle dark/light mode"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button> */}

        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-[#383849] transition"
          aria-label="Notifications"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <Bell size={20} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Messages */}
        <button className="p-2 rounded-full hover:bg-[#383849] transition" aria-label="Messages">
          <MessageSquare size={20} />
        </button>

        {/* User/Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-[#383849] transition"
            aria-label="User menu"
          >
            <User size={20} />
            {/* Optionally user name if desired */}
            {/* <span>{user.name}</span> */}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#27272a] rounded-md shadow-lg z-50 text-gray-200">
              <button
                className="block w-full px-4 py-2 hover:bg-[#383849] transition text-left"
                onClick={() => {
                  setDropdownOpen(false);
                  onProfile?.();
                }}
              >
                Profile
              </button>
              <button
                className="block w-full px-4 py-2 hover:bg-[#383849] transition text-left"
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout?.();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
