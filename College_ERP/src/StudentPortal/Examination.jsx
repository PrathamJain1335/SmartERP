import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search, Calendar, AlertTriangle, BarChart2, QrCode, Timer, Lightbulb, HelpCircle, Map, PieChart, LucideLineChart } from "lucide-react";
import { Bar, Pie, Line as ChartLine } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, zoomPlugin);

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
  neutral: "#6B7280",
};

// Sample data based on JECRC University B.Tech CSE examinations
const initialTimetable = [
  { id: "t1", semester: 1, date: "2024-12-16", time: "09:00 AM to 12:00 PM", subject: "CSE101 - Introduction to Programming", venue: "Room 201", type: "Theory" },
  { id: "t2", semester: 1, date: "2024-12-17", time: "09:00 AM to 12:00 PM", subject: "MAT101 - Engineering Mathematics I", venue: "Room 202", type: "Theory" },
  { id: "t3", semester: 1, date: "2024-12-18", time: "09:00 AM to 12:00 PM", subject: "PHY101 - Engineering Physics", venue: "Room 203", type: "Theory" },
  { id: "t4", semester: 1, date: "2024-12-19", time: "09:00 AM to 12:00 PM", subject: "CHE101 - Engineering Chemistry", venue: "Room 204", type: "Theory" },
  { id: "t5", semester: 1, date: "2024-12-20", time: "09:00 AM to 12:00 PM", subject: "ECE101 - Basic Electronics", venue: "Room 205", type: "Theory" },
  { id: "t6", semester: 2, date: "2025-05-19", time: "09:00 AM to 12:00 PM", subject: "CSE201 - Data Structures", venue: "Room 201", type: "Theory" },
  { id: "t7", semester: 2, date: "2025-05-20", time: "09:00 AM to 12:00 PM", subject: "MAT201 - Engineering Mathematics II", venue: "Room 202", type: "Theory" },
  { id: "t8", semester: 2, date: "2025-05-21", time: "09:00 AM to 12:00 PM", subject: "PHY201 - Engineering Physics II", venue: "Room 203", type: "Theory" },
  { id: "t9", semester: 2, date: "2025-05-22", time: "09:00 AM to 12:00 PM", subject: "CHE201 - Engineering Chemistry II", venue: "Room 204", type: "Theory" },
  { id: "t10", semester: 2, date: "2025-05-23", time: "09:00 AM to 12:00 PM", subject: "ECE201 - Basic Electronics II", venue: "Room 205", type: "Theory" },
  // Add more up to 30
  { id: "t11", semester: 3, date: "2025-12-16", time: "09:00 AM to 12:00 PM", subject: "CSE301 - Algorithms", venue: "Room 301", type: "Theory" },
  { id: "t12", semester: 3, date: "2025-12-17", time: "09:00 AM to 12:00 PM", subject: "MAT301 - Discrete Mathematics", venue: "Room 302", type: "Theory" },
  { id: "t13", semester: 3, date: "2025-12-18", time: "09:00 AM to 12:00 PM", subject: "CSE302 - Database Management Systems", venue: "Room 303", type: "Theory" },
  { id: "t14", semester: 3, date: "2025-12-19", time: "09:00 AM to 12:00 PM", subject: "CSE303 - Computer Organization", venue: "Room 304", type: "Theory" },
  { id: "t15", semester: 3, date: "2025-12-20", time: "09:00 AM to 12:00 PM", subject: "CSE304 - Operating Systems", venue: "Room 305", type: "Theory" },
  { id: "t16", semester: 4, date: "2026-05-19", time: "09:00 AM to 12:00 PM", subject: "CSE401 - Theory of Computation", venue: "Room 401", type: "Theory" },
  { id: "t17", semester: 4, date: "2026-05-20", time: "09:00 AM to 12:00 PM", subject: "CSE402 - Compiler Design", venue: "Room 402", type: "Theory" },
  { id: "t18", semester: 4, date: "2026-05-21", time: "09:00 AM to 12:00 PM", subject: "CSE403 - Software Engineering", venue: "Room 403", type: "Theory" },
  { id: "t19", semester: 4, date: "2026-05-22", time: "09:00 AM to 12:00 PM", subject: "CSE404 - Computer Networks", venue: "Room 404", type: "Theory" },
  { id: "t20", semester: 4, date: "2026-05-23", time: "09:00 AM to 12:00 PM", subject: "CSE405 - Artificial Intelligence", venue: "Room 405", type: "Theory" },
  // Continue up to 30
  { id: "t21", semester: 5, date: "2026-12-16", time: "09:00 AM to 12:00 PM", subject: "CSE501 - Machine Learning", venue: "Room 501", type: "Theory" },
  { id: "t22", semester: 5, date: "2026-12-17", time: "09:00 AM to 12:00 PM", subject: "CSE502 - Cloud Computing", venue: "Room 502", type: "Theory" },
  { id: "t23", semester: 5, date: "2026-12-18", time: "09:00 AM to 12:00 PM", subject: "CSE503 - Big Data Analytics", venue: "Room 503", type: "Theory" },
  { id: "t24", semester: 5, date: "2026-12-19", time: "09:00 AM to 12:00 PM", subject: "CSE504 - Cyber Security", venue: "Room 504", type: "Theory" },
  { id: "t25", semester: 5, date: "2026-12-20", time: "09:00 AM to 12:00 PM", subject: "CSE505 - Internet of Things", venue: "Room 505", type: "Theory" },
  { id: "t26", semester: 6, date: "2027-05-19", time: "09:00 AM to 12:00 PM", subject: "CSE601 - Deep Learning", venue: "Room 601", type: "Theory" },
  { id: "t27", semester: 6, date: "2027-05-20", time: "09:00 AM to 12:00 PM", subject: "CSE602 - Blockchain Technology", venue: "Room 602", type: "Theory" },
  { id: "t28", semester: 6, date: "2027-05-21", time: "09:00 AM to 12:00 PM", subject: "CSE603 - DevOps", venue: "Room 603", type: "Theory" },
  { id: "t29", semester: 6, date: "2027-05-22", time: "09:00 AM to 12:00 PM", subject: "CSE604 - Edge Computing", venue: "Room 604", type: "Theory" },
  { id: "t30", semester: 6, date: "2027-05-23", time: "09:00 AM to 12:00 PM", subject: "CSE605 - Quantum Computing", venue: "Room 605", type: "Theory" },
];

const initialHallTickets = initialTimetable.map((t) => ({
  id: t.id,
  studentId: "STU-001",
  qrCode: "QR_CODE_PLACEHOLDER", // Would be generated in real system
  generated: true,
}));

const initialUpdates = [
  { id: "u1", semester: 1, date: "2025-09-10", content: "Exam Postponed for CSE101" },
  { id: "u2", semester: 1, date: "2025-09-15", content: "Hall Tickets Available for Download" },
  // Add more up to 30
];

const initialRevaluationRequests = [
  { id: "r1", semester: 1, subject: "CSE101", status: "Pending", fee: 500 },
  { id: "r2", semester: 1, subject: "MAT101", status: "Approved", fee: 500 },
  // Add more
];

export default function StudentExaminationPortal() {
  const [activeTab, setActiveTab] = useState("timetable");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [timetable, setTimetable] = useState(initialTimetable);
  const [hallTickets, setHallTickets] = useState(initialHallTickets);
  const [updates, setUpdates] = useState(initialUpdates);
  const [revaluationRequests, setRevaluationRequests] = useState(initialRevaluationRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Advanced Charts Data
  const passFailRateData = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: [jecrcColors.secondary, jecrcColors.danger],
      },
    ],
  };

  const performanceTrendData = {
    labels: ["Lecture 1", "Lecture 2", "Lecture 3", "Lecture 4", "Lecture 5"],
    datasets: [
      {
        label: "Preparation Level",
        data: [70, 75, 80, 85, 90],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Filters based on semester
  const filterData = (data) => {
    return data.filter((item) => 
      (selectedSemester ? item.semester === Number(selectedSemester) : true) &&
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredTimetable = filterData(timetable);
  const filteredHallTickets = filterData(hallTickets);
  const filteredUpdates = filterData(updates);
  const filteredRequests = filterData(revaluationRequests);

  const pagedTimetable = filteredTimetable.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedHallTickets = filteredHallTickets.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedUpdates = filteredUpdates.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedRequests = filteredRequests.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredTimetable.length / rowsPerPage);

  const handleDownloadHallTicket = (ticketId) => {
    console.log("Downloading QR-coded hall ticket for:", ticketId);
  };

  // Dummy export handler
  const handleExport = () => {
    alert("Export functionality is not implemented yet.");
  };

  const handleSubmitRevaluation = () => {
    console.log("Submitting revaluation request with fee payment.");
  };

  const handleViewExamDetails = (exam) => {
    console.log("Viewing exam details:", exam);
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  // Unique Features
  const uniqueFeatures = [
    { id: "countdown", title: "Exam Countdown Timer", icon: <Timer size={16} /> },
    { id: "reminders", title: "Personalized Exam Reminders", icon: <AlertTriangle size={16} /> },
    { id: "hallpreview", title: "Virtual Hall Ticket Preview", icon: <QrCode size={16} /> },
    { id: "tips", title: "Exam Anxiety Tips", icon: <HelpCircle size={16} /> },
    { id: "seating", title: "Interactive Exam Seating Plan Viewer", icon: <Map size={16} /> },
  ];

  const handleUniqueFeatureClick = (feature) => {
    console.log("Accessing unique feature:", feature.title);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold text-blue-900">Student Examination Portal</h2>
      </div>

      {/* Semester Filter */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="bg-white border border-gray-300 rounded p-2 w-full md:w-64"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["timetable", "halltickets", "updates", "revaluation", "analytics", "uniquefeatures"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "uniquefeatures" && <Lightbulb size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Revaluation Fee */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-md p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">Revaluation Request for {selectedRequest.subject}</h2>
            <p><strong>Fee:</strong> ₹{selectedRequest.fee}</p>
            <p className="mt-2">Proceed to payment for revaluation.</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => {
                handleSubmitRevaluation();
                closeModal();
              }}
            >
              Pay Fee
            </button>
          </div>
        </div>
      )}

      {/* Timetable Section */}
      {activeTab === "timetable" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search timetable..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Timetable (PDF with JECRC Branding)
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Venue</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedTimetable.length > 0 ? (
                  pagedTimetable.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.semester}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.time}</td>
                      <td className="p-2">{item.subject}</td>
                      <td className="p-2">{item.venue}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewExamDetails(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No timetable entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredTimetable.length)} of {filteredTimetable.length} entries
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

      {/* Hall Tickets Section */}
      {activeTab === "halltickets" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search hall tickets..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Hall Tickets
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Generated</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedHallTickets.length > 0 ? (
                  pagedHallTickets.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{timetable.find((t) => t.id === item.id)?.semester}</td>
                      <td className="p-2">{timetable.find((t) => t.id === item.id)?.subject}</td>
                      <td className="p-2">{item.generated ? "Yes" : "No"}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleDownloadHallTicket(item.id)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No hall tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredHallTickets.length)} of {filteredHallTickets.length} entries
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

      {/* Updates Section */}
      {activeTab === "updates" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search updates..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Updates
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Content</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedUpdates.length > 0 ? (
                  pagedUpdates.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.semester}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.content}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewExamDetails(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No updates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredUpdates.length)} of {filteredUpdates.length} entries
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

      {/* Revaluation Requests Section */}
      {activeTab === "revaluation" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search requests..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Requests
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Fee</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedRequests.length > 0 ? (
                  pagedRequests.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.semester}</td>
                      <td className="p-2">{item.subject}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">₹{item.fee}</td>
                      <td className="p-2">
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => handleViewRequest(item)}
                        >
                          View/Pay
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No revaluation requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredRequests.length)} of {filteredRequests.length} entries
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

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <PieChart size={20} className="mr-2 text-blue-900" /> Pass/Fail Rate
            </h3>
            <Pie data={passFailRateData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <LucideLineChart size={20} className="mr-2 text-blue-900" /> Performance Trend
            </h3>
            <ChartLine data={performanceTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
          </div>
        </div>
      )}

      {/* Unique Features Section */}
      {activeTab === "uniquefeatures" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Timer size={20} className="mr-2 text-blue-900" /> Exam Countdown Timer
            </h3>
            <p className="text-gray-600">Countdown to your next exam.</p>
            <div className="mt-2 text-center text-2xl font-bold">00:00:00</div> {/* Placeholder for timer */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <AlertTriangle size={20} className="mr-2 text-blue-900" /> Personalized Exam Reminders
            </h3>
            <p className="text-gray-600">Reminders for upcoming exams based on your courses.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <QrCode size={20} className="mr-2 text-blue-900" /> Virtual Hall Ticket Preview
            </h3>
            <p className="text-gray-600">Preview your hall ticket with QR code.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <HelpCircle size={20} className="mr-2 text-blue-900" /> Exam Anxiety Tips
            </h3>
            <p className="text-gray-600">Tips to manage exam stress.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Map size={20} className="mr-2 text-blue-900" /> Interactive Exam Seating Plan Viewer
            </h3>
            <p className="text-gray-600">View your seating plan interactively.</p>
          </div>
        </div>
      )}
    </div>
  );
}