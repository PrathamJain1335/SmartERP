import React from "react";

export default function Shell({ sidebar, main, sidebarExpanded }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {sidebar}
      <main
        className={`
          flex-1 ml-${sidebarExpanded ? "64" : "16"} transition-all duration-300 ease-in-out
          overflow-y-auto bg-[var(--bg)] dark:bg-[var(--bg)]
        `}
      >
        {main}
      </main>
    </div>
  );
}