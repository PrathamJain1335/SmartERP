import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Bell, MessageCircle, User, LogOut } from "lucide-react";

export default function Header({
  activePage,
  theme,
  toggleTheme,
  notifications = [],
  user = { name: "Dr. Tokir Khan", photo: "" },
  onLogout,
  onProfile,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unseenNotifications = notifications.filter((n) => !n.seen);

  const avatar = user.photo ? (
    <img
      src={user.photo}
      alt="avatar"
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
    <User size={18} className="text-gray-600 dark:text-gray-300" />
  );

  // Close dropdowns on outside click
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setNotifOpen(false);
        setMsgOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800 bg-white dark:bg-[#071025] relative z-10">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">{activePage}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">Welcome back</div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4" ref={ref}>
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded bg-white dark:bg-[#0b1224] border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative p-2 rounded bg-white dark:bg-[#0b1224] border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unseenNotifications.length > 0 && !notifOpen && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                {unseenNotifications.length}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#131A2C] shadow-lg rounded-lg p-2 z-50">
              <div className="font-semibold mb-2">Notifications</div>
              {unseenNotifications.length === 0 ? (
                <div className="text-xs text-gray-400">No new notifications</div>
              ) : (
                unseenNotifications.slice(0, 5).map((n, i) => (
                  <div key={i} className="p-2 text-sm text-gray-800 dark:text-gray-200 border-b">
                    <span className="font-medium">{n.title}</span>
                    <div className="text-xs text-gray-500">{n.timestamp}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative">
          <button
            onClick={() => setMsgOpen((v) => !v)}
            className="p-2 rounded bg-white dark:bg-[#0b1224] border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Messages"
          >
            <MessageCircle size={18} />
          </button>
          {msgOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#131A2C] shadow-lg rounded-lg p-3 z-50">
              <div className="font-semibold text-sm mb-2">Messages</div>
              <div className="text-xs text-gray-400 mb-2">
                - Send messages to students and faculty
                <br />
                - Group chat and quick reply coming soon!
              </div>
              <div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs mr-2">Open Chat</button>
                <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs" onClick={() => setMsgOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1 border dark:border-gray-700 rounded bg-white dark:bg-[#0b1224] transition"
            aria-label="Open Profile Menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              {avatar}
            </div>
            <span className="hidden md:block text-sm font-medium">{user.name}</span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#131A2C] shadow-lg rounded-lg py-2 z-50">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  if (onProfile) onProfile();
                  setProfileOpen(false);
                }}
              >
                View Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  if (onLogout) onLogout();
                  setProfileOpen(false);
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
