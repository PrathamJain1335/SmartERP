import React, { useState } from "react";
import Header from "./Header";

const Dashboard = () => {
  const [userType, setUserType] = useState("student");

  return (
    <>
      
      <div className="p-6 ml-100 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Total Faculty</h3>
          <p className="text-3xl font-bold text-blue-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold text-green-600">76</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Total Courses</h3>
          <p className="text-3xl font-bold text-purple-600">25</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Pending Approvals</h3>
          <p className="text-3xl font-bold text-red-600">12</p>
        </div>
      </div>

      {/* Create User Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Create New User</h3>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                userType === "student" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setUserType("student")}
            >
              Student
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                userType === "faculty" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setUserType("faculty")}
            >
              Faculty
            </button>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder={
                userType === "student" ? "Registration No." : "Faculty ID"
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Create User
            </button>
          </form>
        </div>

        {/* Faculty Attendance */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Faculty Attendance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select className="border rounded-lg px-3 py-2">
              <option>Select Department</option>
              <option>Computer Science</option>
              <option>Physics</option>
              <option>Mathematics</option>
            </select>
            <input type="date" className="border rounded-lg px-3 py-2" />
            <input type="date" className="border rounded-lg px-3 py-2" />
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Export Report
          </button>
        </div>
      </div>

      {/* Faculty List + Communication Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faculty List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Faculty List</h3>
            <button className="text-red-500 text-sm">View All</button>
          </div>
          <input
            type="text"
            placeholder="Search Faculty..."
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Faculty</th>
                <th className="p-2">Course</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">John Doe</td>
                <td className="p-2">B.Sc</td>
                <td className="p-2 text-green-600">Active</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Jane Smith</td>
                <td className="p-2">B.Sc</td>
                <td className="p-2 text-red-500">Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Communication Hub */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Communication Hub</h3>
            <button className="text-red-500 text-sm">View All</button>
          </div>
          <ul className="space-y-2">
            <li className="border-b pb-2">New staff meeting schedule posted.</li>
            <li className="border-b pb-2">
              Parent-teacher conference sign-ups are now open.
            </li>
            <li>Semester results will be released tomorrow.</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
