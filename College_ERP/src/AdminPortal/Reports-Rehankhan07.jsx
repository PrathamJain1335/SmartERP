import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Edit, Search, Plus, ArrowRight } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
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

const initialAttendanceData = [
  { student: "Aarav Sharma", subject: "CS101", attendance: 93 },
  { student: "Diya Patel", subject: "PHY101", attendance: 88 },
  { student: "Rohan Gupta", subject: "MA203", attendance: 72 },
];
const initialMarksData = [
  { student: "Aarav Sharma", subject: "CS101", marks: 88, grade: "A" },
  { student: "Diya Patel", subject: "PHY101", marks: 92, grade: "A+" },
  { student: "Rohan Gupta", subject: "MA203", marks: 75, grade: "B" },
];
const initialPlacementData = [
  { student: "Priya Singh", company: "Tech Solutions", role: "SDE Intern", status: "Internship" },
  { student: "Vikram Kumar", company: "Innovate Inc.", role: "Data Analyst", status: "Placed" },
  { student: "Aarav Sharma", company: "Web Weavers", role: "Frontend Dev", status: "Ongoing" },
];
const initialDisciplinaryData = [
  { date: "2023-10-26", student: "Rohan Gupta", type: "Warning", action: "Verbal Warning" },
  { date: "2023-11-05", student: "Anonymous", type: "Fine", action: "INR 500 Fine" },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("summary");
  const [attendanceFilter, setAttendanceFilter] = useState({ period: "Daily", class: "All Classes/Sections" });
  const [marksFilter, setMarksFilter] = useState({ semester: "All Semesters", subject: "All Subjects" });
  const [placementFilter, setPlacementFilter] = useState({ batch: "All Batches/Years" });
  const [disciplinaryFilter, setDisciplinaryFilter] = useState({ type: "All Incident Types" });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Dummy data for charts
  const attendanceTrendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Average Attendance (%)",
        data: [92.5, 91.8, 90.5, 89.2],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const gradeDistributionData = {
    labels: ["A", "A+", "B", "C"],
    datasets: [
      {
        data: [30, 25, 35, 10],
        backgroundColor: ["#4CAF50", "#8BC34A", "#FF9800", "#F44336"],
      },
    ],
  };

  const progressOverSemestersData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    datasets: [
      {
        label: "Average GPA",
        data: [3.5, 3.7, 3.6, 3.8],
        borderColor: "rgb(153, 102, 255)",
        tension: 0.1,
      },
    ],
  };

  const placementStatusData = {
    labels: ["Placed", "Internship", "Ongoing"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      },
    ],
  };

  const companyWisePlacementsData = {
    labels: ["Tech Solutions", "Innovate Inc.", "Web Weavers"],
    datasets: [
      {
        label: "Placements",
        data: [15, 10, 5],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      },
    ],
  };

  const incidentTrendData = {
    labels: ["Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Incidents",
        data: [5, 4, 3],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const filteredAttendance = initialAttendanceData.filter(
    (item) =>
      item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMarks = initialMarksData.filter(
    (item) =>
      item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPlacement = initialPlacementData.filter(
    (item) =>
      item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDisciplinary = initialDisciplinaryData.filter(
    (item) =>
      item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.includes(searchTerm)
  );

  const pagedAttendance = filteredAttendance.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedMarks = filteredMarks.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedPlacement = filteredPlacement.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedDisciplinary = filteredDisciplinary.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredAttendance.length / rowsPerPage);

  const handleExport = () => {
    console.log("Exporting report...");
    // Placeholder for export logic (e.g., CSV generation)
  };

  const handleEdit = (item) => {
    console.log("Editing:", item);
    // Placeholder for edit logic
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h2>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {["summary", "attendance", "academic", "placement", "disciplinary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg ${activeTab === tab ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Summary Dashboard */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Attendance Overview</h3>
            <p className="text-2xl font-bold text-green-600">92.5%</p>
            <p className="text-sm text-gray-500">Overall Average</p>
            <a href="#" className="text-red-500 hover:underline flex items-center mt-2">
              <ArrowRight size={16} className="mr-1" /> View Details
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Academic Performance</h3>
            <p className="text-2xl font-bold text-red-600">3.7 GPA</p>
            <p className="text-sm text-gray-500">Average GPA</p>
            <a href="#" className="text-red-500 hover:underline flex items-center mt-2">
              <ArrowRight size={16} className="mr-1" /> View Details
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Placement & Internship</h3>
            <p className="text-2xl font-bold text-purple-600">85%</p>
            <p className="text-sm text-gray-500">Placement Rate</p>
            <a href="#" className="text-red-500 hover:underline flex items-center mt-2">
              <ArrowRight size={16} className="mr-1" /> View Details
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Disciplinary Records</h3>
            <p className="text-2xl font-bold text-red-600">12</p>
            <p className="text-sm text-gray-500">Incidents this month</p>
            <a href="#" className="text-red-500 hover:underline flex items-center mt-2">
              <ArrowRight size={16} className="mr-1" /> View Details
            </a>
          </div>
        </div>
      )}

      {/* Attendance Reports */}
      {activeTab === "attendance" && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <select
              className="bg-white border rounded p-2"
              value={attendanceFilter.period}
              onChange={(e) => setAttendanceFilter({ ...attendanceFilter, period: e.target.value })}
            >
              <option>Daily</option>
              <option>Monthly</option>
              <option>Semester-wise</option>
            </select>
            <select
              className="bg-white border rounded p-2"
              value={attendanceFilter.class}
              onChange={(e) => setAttendanceFilter({ ...attendanceFilter, class: e.target.value })}
            >
              <option>All Classes/Sections</option>
              <option>CSE-A</option>
              <option>ECE-B</option>
            </select>
            <input
              type="text"
              placeholder="Search/Filter"
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
              onClick={() => console.log("Edit Attendance")}
            >
              <Edit size={16} className="mr-2" /> Edit Attendance
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Attendance Details</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Student Name</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Attendance %</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedAttendance.map((item) => (
                  <tr key={item.student} className="border-b">
                    <td className="p-2">{item.student}</td>
                    <td className="p-2">{item.subject}</td>
                    <td className="p-2">{item.attendance}%</td>
                    <td className="p-2">
                      <button
                        className="text-red-500 hover:underline mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Attendance Trend</h3>
            <Line data={attendanceTrendData} />
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredAttendance.length)} of{" "}
              {filteredAttendance.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Academic Performance Reports */}
      {activeTab === "academic" && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <select
              className="bg-white border rounded p-2"
              value={marksFilter.semester}
              onChange={(e) => setMarksFilter({ ...marksFilter, semester: e.target.value })}
            >
              <option>All Semesters</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>
            <select
              className="bg-white border rounded p-2"
              value={marksFilter.subject}
              onChange={(e) => setMarksFilter({ ...marksFilter, subject: e.target.value })}
            >
              <option>All Subjects</option>
              <option>CS101</option>
              <option>PHY101</option>
            </select>
            <input
              type="text"
              placeholder="Search/Filter"
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
              onClick={() => console.log("Edit Marks")}
            >
              <Edit size={16} className="mr-2" /> Edit Marks
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Student Marks</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Student</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Marks</th>
                  <th className="p-2">Grade</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedMarks.map((item) => (
                  <tr key={item.student} className="border-b">
                    <td className="p-2">{item.student}</td>
                    <td className="p-2">{item.subject}</td>
                    <td className="p-2">{item.marks}</td>
                    <td className="p-2">{item.grade}</td>
                    <td className="p-2">
                      <button
                        className="text-red-500 hover:underline mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Grade Distribution</h3>
              <Pie data={gradeDistributionData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Progress Over Semesters</h3>
              <Line data={progressOverSemestersData} />
            </div>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredMarks.length)} of{" "}
              {filteredMarks.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Placement & Internship Statistics */}
      {activeTab === "placement" && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <select
              className="bg-white border rounded p-2"
              value={placementFilter.batch}
              onChange={(e) => setPlacementFilter({ ...placementFilter, batch: e.target.value })}
            >
              <option>All Batches/Years</option>
              <option>2023</option>
              <option>2024</option>
            </select>
            <input
              type="text"
              placeholder="Filter/Search"
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Report
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
              onClick={() => console.log("Add Record")}
            >
              <Plus size={16} className="mr-2" /> Add Record
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Placement Data</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Student Name</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedPlacement.map((item) => (
                  <tr key={item.student} className="border-b">
                    <td className="p-2">{item.student}</td>
                    <td className="p-2">{item.company}</td>
                    <td className="p-2">{item.role}</td>
                    <td className="p-2">{item.status}</td>
                    <td className="p-2">
                      <button
                        className="text-red-500 hover:underline mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Placement Status</h3>
              <Pie data={placementStatusData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Company-wise Placements</h3>
              <Bar data={companyWisePlacementsData} />
            </div>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredPlacement.length)} of{" "}
              {filteredPlacement.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disciplinary Records */}
      {activeTab === "disciplinary" && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <select
              className="bg-white border rounded p-2"
              value={disciplinaryFilter.type}
              onChange={(e) => setDisciplinaryFilter({ ...disciplinaryFilter, type: e.target.value })}
            >
              <option>All Incident Types</option>
              <option>Warning</option>
              <option>Fine</option>
              <option>Suspension</option>
            </select>
            <input
              type="text"
              placeholder="Search/Filter"
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Report
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
              onClick={() => console.log("Add Incident")}
            >
              <Plus size={16} className="mr-2" /> Add Incident
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Incident Log</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Date</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Action Taken</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedDisciplinary.map((item) => (
                  <tr key={item.date + item.student} className="border-b">
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">{item.student}</td>
                    <td className="p-2">{item.type}</td>
                    <td className="p-2">{item.action}</td>
                    <td className="p-2">
                      <button
                        className="text-red-500 hover:underline mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Incident Trend (Monthly)</h3>
            <Line data={incidentTrendData} />
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredDisciplinary.length)} of{" "}
              {filteredDisciplinary.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}