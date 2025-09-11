import React, { useState, useEffect } from "react";
import Header from "./Header";

const Dashboard = () => {
  const [userType, setUserType] = useState("student");
  const [notifications, setNotifications] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // Simulate real-time data (replace with API calls in a real app)
  useEffect(() => {
    setNotifications([
      { id: 1, message: "New staff meeting scheduled for 09/12/2025", time: "12:35 AM" },
      { id: 2, message: "System update completed", time: "12:30 AM" },
    ]);
    setActivityLog([
      { id: 1, user: "Admin1", action: "Created new student", timestamp: "12:32 AM" },
      { id: 2, user: "Admin2", action: "Approved course", timestamp: "12:15 AM" },
    ]);
  }, []);

  return (
    <>
      <div className="p-6 ml-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-800">
        {/* <Header />
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard Overview
        </h2> */}

        {/* Stats Section with 3D Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000" style={{ perspective: "1000px" }}>
            <h3 className="text-gray-500 text-sm font-medium">Total Faculty</h3>
            <p className="text-4xl font-bold text-blue-600">150</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000" style={{ perspective: "1000px" }}>
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <p className="text-4xl font-bold text-green-600">760</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000" style={{ perspective: "1000px" }}>
            <h3 className="text-gray-500 text-sm font-medium">Total Courses</h3>
            <p className="text-4xl font-bold text-purple-600">25</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000" style={{ perspective: "1000px" }}>
            <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
            <p className="text-4xl font-bold text-red-600">12</p>
          </div>
        </div>

        {/* Create User & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Create User Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Create New User</h3>
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  userType === "student" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors duration-200`}
                onClick={() => setUserType("student")}
              >
                Student
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  userType === "faculty" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors duration-200`}
                onClick={() => setUserType("faculty")}
              >
                Faculty
              </button>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder={userType === "student" ? "Registration No." : "Faculty ID"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold"
              >
                Create User
              </button>
            </form>
          </div>

          {/* Analytics Overview */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Analytics Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Student Enrollment Growth</span>
                <span className="text-green-600 font-medium">+5% (Last Month)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Course Completion Rate</span>
                <span className="text-blue-600 font-medium">88%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Faculty Satisfaction</span>
                <span className="text-purple-600 font-medium">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty List & Communication Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Faculty List with 3D Hover Effect */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000" style={{ perspective: "1000px" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Faculty List</h3>
              <button className="text-red-500 text-sm font-medium hover:underline">View All</button>
            </div>
            <input
              type="text"
              placeholder="Search Faculty..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-medium text-gray-600">Faculty</th>
                  <th className="p-3 text-sm font-medium text-gray-600">Course</th>
                  <th className="p-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="p-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">B.Sc</td>
                  <td className="p-3 text-green-600">Active</td>
                  <td className="p-3">
                    <button className="text-red-500 hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">Jane Smith</td>
                  <td className="p-3">B.Sc</td>
                  <td className="p-3 text-red-500">Inactive</td>
                  <td className="p-3">
                    <button className="text-red-500 hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Communication Hub with Real-Time Notifications */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Communication Hub</h3>
              <button className="text-red-500 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="border-b pb-2 text-gray-700">
                  <p className="text-sm">{notif.message}</p>
                  <span className="text-xs text-gray-500">{notif.time} IST</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">User Activity Log</h3>
          <div className="space-y-4 max-h-48 overflow-y-auto">
            {activityLog.map((log) => (
              <div key={log.id} className="flex justify-between items-center text-gray-700">
                <p className="text-sm">{log.user} - {log.action}</p>
                <span className="text-xs text-gray-500">{log.timestamp} IST</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;