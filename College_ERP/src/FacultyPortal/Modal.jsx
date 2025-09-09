import React from "react";

export default function Modal({ open=true, onClose=()=>{}, title="", children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#071025] w-[95%] md:w-3/4 rounded shadow overflow-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
