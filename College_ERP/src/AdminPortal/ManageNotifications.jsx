import React from 'react';

const ManageNotifications = () => {
  return (
    <div className="p-6 ml-64">
      <h2 className="text-lg font-semibold mb-4">Manage Notifications</h2>
      <select>
        <option>Assignment</option>
        <option>Attendance</option>
      </select>
      <div>New Assignment: "Thermodynamics Problem Set"</div>
    </div>
  );
};

export default ManageNotifications;