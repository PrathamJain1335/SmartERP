import React, { useState, useEffect } from "react";
import { ChevronLeft, Edit, Badge, User2Icon } from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const initialStudent = {
  name: "Aarav Sharma",
  enrollmentNo: "STU-2023-001",
  status: "Active",
  dob: "January 15, 2003",
  gender: "Male",
  contact: "(555) 111-2222",
  email: "aarav.sharma@example.com",
  address: "123 University Ave, New Delhi, India",
  guardian: {
    father: { name: "Rajesh Sharma", contact: "(555) 111-2233", occupation: "Engineer" },
    mother: { name: "Sunita Sharma", contact: "(555) 111-2244", occupation: "Teacher" },
  },
};

const initialAttendanceData = [
  { rollNo: "STU-001", student: "Aarav Sharma", status: "Present" },
  { rollNo: "STU-002", student: "Diya Patel", status: "Absent" },
  { rollNo: "STU-003", student: "Rohan Gupta", status: "Leave" },
];
const initialDisciplinaryData = [
  { date: "2023-10-26", student: "Aarav Sharma", type: "Warning", action: "Verbal Warning" },
  { date: "2023-11-05", student: "Aarav Sharma", type: "Fine", action: "INR 500 Fine" },
];

export default function StudentDetails() {
  const [student, setStudent] = useState(initialStudent);
  const [attendance, setAttendance] = useState(initialAttendanceData);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [attendanceFilter, setAttendanceFilter] = useState("CSE - 2nd Year - Section A"); // Added state for attendance filter

  // Chart Data
  const attendanceTrendData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Attendance (%)",
        data: [95, 92, 88, 90, 93],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const academicPerformanceData = {
    labels: ["Sem 1", "Sem 2", "Sem 3"],
    datasets: [
      {
        label: "Marks",
        data: [85, 88, 92],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const disciplinaryDistributionData = {
    labels: ["Warning", "Fine", "Suspension"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  useEffect(() => {
    // Initialize selected status from attendance data
    const initialStatus = {};
    attendance.forEach((item) => {
      initialStatus[item.rollNo] = item.status;
    });
    setSelectedStatus(initialStatus);
  }, [attendance]);

  const handleStatusChange = (rollNo, status) => {
    setSelectedStatus((prev) => ({ ...prev, [rollNo]: status }));
  };

  const handleSaveAttendance = () => {
    setAttendance((prev) =>
      prev.map((item) => ({
        ...item,
        status: selectedStatus[item.rollNo] || item.status,
      }))
    );
    console.log("Attendance saved:", attendance);
  };

  const handleEditProfile = () => {
    console.log("Editing profile for", student.name);
    // Placeholder for edit logic
  };

  const handleDownloadID = () => {
    console.log("Downloading ID card for", student.name);
    // Placeholder for download logic
  };

  const handleDeactivate = () => {
    console.log("Deactivating student", student.name);
    // Placeholder for deactivate logic
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">
          {student.name} <span className="text-sm text-gray-500">Enrollment No: {student.enrollmentNo}</span>
        </h2>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            onClick={handleEditProfile}
          >
            <Edit size={16} className="mr-2" /> Edit Profile
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Date of Birth:</strong> {student.dob}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Contact No.:</strong> {student.contact}</p>
            <p><strong>Email ID:</strong> {student.email}</p>
            <p><strong>Permanent Address:</strong> {student.address}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Father</strong></p>
              <p>Name: {student.guardian.father.name}</p>
              <p>Contact No.: {student.guardian.father.contact}</p>
              <p>Occupation: {student.guardian.father.occupation}</p>
            </div>
            <div>
              <p><strong>Mother</strong></p>
              <p>Name: {student.guardian.mother.name}</p>
              <p>Contact No.: {student.guardian.mother.contact}</p>
              <p>Occupation: {student.guardian.mother.occupation}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            onClick={handleDownloadID}
          >
            <Badge size={16} className="mr-2" /> Download ID Card
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
            onClick={handleDeactivate}
          >
            <User2Icon size={16} className="mr-2" /> Deactivate Student
          </button>
        </div>
      </div>

      {/* Attendance Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Daily Attendance</h3>
        <div className="mb-4">
          <select
            className="bg-gray-200 border rounded p-2 mr-2"
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value)}
          >
            <option>CSE - 2nd Year - Section A</option>
            <option>ECE - 3rd Year - Section B</option>
            <option>MECH - 1st Year - Section A</option>
          </select>
        </div>
        <table className="w-full text-left text-sm mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Roll No.</th>
              <th className="p-2">Student Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item) => (
              <tr key={item.rollNo} className="border-b">
                <td className="p-2">{item.rollNo}</td>
                <td className="p-2">{item.student}</td>
                <td className="p-2">
                  <select
                    className="bg-white border rounded p-2"
                    value={selectedStatus[item.rollNo] || item.status}
                    onChange={(e) => handleStatusChange(item.rollNo, e.target.value)}
                  >
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Leave</option>
                    <option>Late</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    className="bg-white border rounded p-2 w-full"
                    placeholder="Remarks"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setSelectedStatus((prev) => ({ ...prev, ...Object.fromEntries(attendance.map((a) => [a.rollNo, "Present"])) }))}
          >
            Mark All Present
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => console.log("Edit Later")}
          >
            Edit Later
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSaveAttendance}
          >
            Save Attendance
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Attendance Records</h3>
          <p>Attendance Records content will be here.</p>
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Attendance Reports</h3>
          <div className="bg-white p-2 rounded-lg shadow">
            <div className="bg-white p-2 rounded-lg shadow" style={{ height: "260px" }}>
              <Line data={attendanceTrendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Academics Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-1">Academics</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="bg-white p-4 rounded-lg shadow" style={{ height: "260px" }}>
            <Bar data={academicPerformanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>

        </div>
        <p className="mt-4">Academic records will be displayed here.</p>
      </div>

      {/* Fees Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Fees</h3>
        <p>Fee information will be displayed here.</p>
      </div>

      {/* Certificate & Requests Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Certificate & Requests</h3>
        <p>Certificates and requests will be managed here.</p>
      </div>

      {/* Remark & Discipline Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 mb-1">Remark & Discipline</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="bg-white p-4 rounded-lg shadow" style={{ height: "260px" }}>
            <Pie data={disciplinaryDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>

        </div>
        <p className="mt-4">Disciplinary records and remarks will be displayed here.</p>
      </div>
    </div>
  );
}