import React from "react";

const Shell = ({ sidebar, header, main, sidebarExpanded }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#ffffff]">
      {/* Sidebar */}
      <div
        className={`${
          sidebarExpanded ? "w-64" : "w-20"
        } fixed left-0 top-0 h-full transition-all duration-300`}
      >
        {sidebar}
      </div>

      {/* Main Layout */}
      <div
        className={`flex-1 ${
          sidebarExpanded ? "ml-64" : "ml-20"
        } flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="sticky top-0 z-50">{header}</div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{main}</main>
      </div>
    </div>
  );
};

export default Shell;
