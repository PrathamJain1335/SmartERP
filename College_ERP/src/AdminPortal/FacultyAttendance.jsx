import React from 'react';

const FacultyAttendance = () => {
  return (
    <div className="p-6 ml-64">
      <h2 className="text-lg font-semibold mb-4">Faculty Attendance</h2>
      <select>
        <option>B.Tech</option>
        <option>B.Sc</option>
      </select>
      <div>download Export Report</div>
    </div>
  );
};

export default FacultyAttendance;