import React, { useState } from "react";
import { Notifications as NotificationsIcon, Settings as SettingsIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Logout as LogoutIcon } from "@mui/icons-material";

export default function Header({ activePage, theme, toggleTheme, notifications, user, onLogout, onProfile }) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="bg-[var(--card)] text-[var(--text)] border-b border-[var(--border)] dark:bg-[var(--card)] dark:text-[var(--text)] dark:border-[var(--border)] p-4 flex justify-between items-center">
      {/* Left: Page Title */}
      <h1 className="text-xl font-bold">{activePage || "Dashboard"}</h1>

      {/* Right: User Info and Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <NotificationsIcon
            className="cursor-pointer"
            onClick={() => setNotificationOpen(!notificationOpen)}
          />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {notifications.length}
            </span>
          )}
          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded shadow-lg p-2 z-50">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-2 hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] rounded">
                  <p className="text-sm">{notif.title}</p>
                  <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">{notif.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">Student ID: {user.id || "12345"}</p>
          </div>
          <SettingsIcon
            className="cursor-pointer"
            onClick={onProfile}
          />
        </div>

        {/* Theme Toggle */}
        <Brightness4Icon
          className="cursor-pointer"
          onClick={toggleTheme}
          style={{ color: theme === "dark" ? "var(--muted)" : "var(--brand)" }}
        />

        {/* Logout */}
        <LogoutIcon
          className="cursor-pointer"
          onClick={onLogout}
        />
      </div>
    </header>
  );
}