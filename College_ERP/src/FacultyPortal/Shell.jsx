import React from "react";

export default function Shell({ sidebar, main, sidebarExpanded }) {
  return (
    <div className="flex min-h-screen">
      {sidebar}
      <div
        className={`
          flex-1 min-h-screen flex flex-col transition-all duration-300
          ${sidebarExpanded ? "ml-64" : "ml-16"}
        `}
      >
        {main}
      </div>
    </div>
  );
}
