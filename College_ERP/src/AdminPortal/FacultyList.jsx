import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Edit, Download, Plus, Search, Calendar, AlertTriangle, BarChart2, PieChart, FileText, Users, Bot, TrendingUp, Mic, Scan } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
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
  Filler,
} from "chart.js";

// Register Chart.js components with advanced features (zoom, filler for area charts)
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, zoomPlugin, Filler);

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A", // Blue
  secondary: "#10B981", // Green
  accent: "#F59E0B", // Yellow
  danger: "#EF4444", // Red
  neutral: "#6B7280", // Gray
};

// JECRC Schools and Branches
const jecrcSchools = ["School of Engineering & Technology", "School of Computer Applications", "School of Business", "School of Design", "School of Humanities & Social Sciences", "School of Allied Health Sciences", "School of Law", "School of Sciences"];
const jecrcBranches = {
  "School of Engineering & Technology": ["Computer Science", "Mechanical", "Civil", "Electronics", "Electrical"],
  "School of Computer Applications": ["BCA", "MCA"],
  "School of Business": ["BBA", "MBA"],
  "School of Design": ["B.Des", "M.Des"],
  "School of Humanities & Social Sciences": ["BA", "MA"],
  "School of Allied Health Sciences": ["B.Sc Nursing", "BPT"],
  "School of Law": ["LLB", "LLM"],
  "School of Sciences": ["Physics", "Chemistry", "Mathematics"],
};

// Dummy data for 30 faculties
const initialFaculties = [
  { id: "f1", school: "School of Engineering & Technology", branch: "Computer Science", name: "Dr. Emily Carter", facultyId: "FAC-001", designation: "Professor", email: "emily@jecrc.ac.in", phone: "111-222-3331" },
  { id: "f2", school: "School of Engineering & Technology", branch: "Mechanical", name: "Dr. Benjamin Lee", facultyId: "FAC-002", designation: "Associate Professor", email: "benjamin@jecrc.ac.in", phone: "111-222-3332" },
  { id: "f3", school: "School of Sciences", branch: "Physics", name: "Dr. Olivia Chen", facultyId: "FAC-003", designation: "Assistant Professor", email: "olivia@jecrc.ac.in", phone: "111-222-3333" },
  { id: "f4", school: "School of Law", branch: "LLB", name: "Dr. James Smith", facultyId: "FAC-004", designation: "Professor", email: "james@jecrc.ac.in", phone: "111-222-3334" },
  { id: "f5", school: "School of Business", branch: "BBA", name: "Dr. Sophia Brown", facultyId: "FAC-005", designation: "Associate Professor", email: "sophia@jecrc.ac.in", phone: "111-222-3335" },
  { id: "f6", school: "School of Design", branch: "B.Des", name: "Dr. Michael Davis", facultyId: "FAC-006", designation: "Assistant Professor", email: "michael@jecrc.ac.in", phone: "111-222-3336" },
  { id: "f7", school: "School of Humanities & Social Sciences", branch: "BA", name: "Dr. Sarah Wilson", facultyId: "FAC-007", designation: "Professor", email: "sarah@jecrc.ac.in", phone: "111-222-3337" },
  { id: "f8", school: "School of Allied Health Sciences", branch: "B.Sc Nursing", name: "Dr. David Taylor", facultyId: "FAC-008", designation: "Associate Professor", email: "david@jecrc.ac.in", phone: "111-222-3338" },
  { id: "f9", school: "School of Computer Applications", branch: "BCA", name: "Dr. Laura Martinez", facultyId: "FAC-009", designation: "Assistant Professor", email: "laura@jecrc.ac.in", phone: "111-222-3339" },
  { id: "f10", school: "School of Sciences", branch: "Chemistry", name: "Dr. John Anderson", facultyId: "FAC-010", designation: "Professor", email: "john@jecrc.ac.in", phone: "111-222-3340" },
  { id: "f11", school: "School of Engineering & Technology", branch: "Civil", name: "Dr. Anna White", facultyId: "FAC-011", designation: "Associate Professor", email: "anna@jecrc.ac.in", phone: "111-222-3341" },
  { id: "f12", school: "School of Law", branch: "LLM", name: "Dr. Robert Clark", facultyId: "FAC-012", designation: "Assistant Professor", email: "robert@jecrc.ac.in", phone: "111-222-3342" },
  { id: "f13", school: "School of Engineering & Technology", branch: "Electronics", name: "Dr. Emily Davis", facultyId: "FAC-013", designation: "Professor", email: "emilyd@jecrc.ac.in", phone: "111-222-3343" },
  { id: "f14", school: "School of Business", branch: "MBA", name: "Dr. Thomas Lee", facultyId: "FAC-014", designation: "Associate Professor", email: "thomas@jecrc.ac.in", phone: "111-222-3344" },
  { id: "f15", school: "School of Design", branch: "M.Des", name: "Dr. Rachel Green", facultyId: "FAC-015", designation: "Assistant Professor", email: "rachel@jecrc.ac.in", phone: "111-222-3345" },
  { id: "f16", school: "School of Humanities & Social Sciences", branch: "MA", name: "Dr. Paul Harris", facultyId: "FAC-016", designation: "Professor", email: "paul@jecrc.ac.in", phone: "111-222-3346" },
  { id: "f17", school: "School of Allied Health Sciences", branch: "BPT", name: "Dr. Lisa Turner", facultyId: "FAC-017", designation: "Associate Professor", email: "lisa@jecrc.ac.in", phone: "111-222-3347" },
  { id: "f18", school: "School of Computer Applications", branch: "MCA", name: "Dr. Mark Evans", facultyId: "FAC-018", designation: "Assistant Professor", email: "mark@jecrc.ac.in", phone: "111-222-3348" },
  { id: "f19", school: "School of Sciences", branch: "Mathematics", name: "Dr. Karen Scott", facultyId: "FAC-019", designation: "Professor", email: "karen@jecrc.ac.in", phone: "111-222-3349" },
  { id: "f20", school: "School of Engineering & Technology", branch: "Electrical", name: "Dr. Daniel King", facultyId: "FAC-020", designation: "Associate Professor", email: "daniel@jecrc.ac.in", phone: "111-222-3350" },
  { id: "f21", school: "School of Law", branch: "LLB", name: "Dr. Susan Adams", facultyId: "FAC-021", designation: "Assistant Professor", email: "susan@jecrc.ac.in", phone: "111-222-3351" },
  { id: "f22", school: "School of Business", branch: "BBA", name: "Dr. Peter Moore", facultyId: "FAC-022", designation: "Professor", email: "peter@jecrc.ac.in", phone: "111-222-3352" },
  { id: "f23", school: "School of Design", branch: "B.Des", name: "Dr. Nancy Young", facultyId: "FAC-023", designation: "Associate Professor", email: "nancy@jecrc.ac.in", phone: "111-222-3353" },
  { id: "f24", school: "School of Humanities & Social Sciences", branch: "BA", name: "Dr. George Hill", facultyId: "FAC-024", designation: "Assistant Professor", email: "george@jecrc.ac.in", phone: "111-222-3354" },
  { id: "f25", school: "School of Allied Health Sciences", branch: "B.Sc Nursing", name: "Dr. Helen Baker", facultyId: "FAC-025", designation: "Professor", email: "helen@jecrc.ac.in", phone: "111-222-3355" },
  { id: "f26", school: "School of Computer Applications", branch: "BCA", name: "Dr. William Gray", facultyId: "FAC-026", designation: "Associate Professor", email: "william@jecrc.ac.in", phone: "111-222-3356" },
  { id: "f27", school: "School of Sciences", branch: "Physics", name: "Dr. Barbara Lewis", facultyId: "FAC-027", designation: "Assistant Professor", email: "barbara@jecrc.ac.in", phone: "111-222-3357" },
  { id: "f28", school: "School of Engineering & Technology", branch: "Computer Science", name: "Dr. Richard Walker", facultyId: "FAC-028", designation: "Professor", email: "richard@jecrc.ac.in", phone: "111-222-3358" },
  { id: "f29", school: "School of Law", branch: "LLB", name: "Dr. Patricia Hall", facultyId: "FAC-029", designation: "Associate Professor", email: "patricia@jecrc.ac.in", phone: "111-222-3359" },
  { id: "f30", school: "School of Business", branch: "MBA", name: "Dr. Charles Allen", facultyId: "FAC-030", designation: "Assistant Professor", email: "charles@jecrc.ac.in", phone: "111-222-3360" },
];

const initialAttendance = initialFaculties.map((f) => ({
  id: f.id,
  name: f.name,
  attendanceRecords: Array.from({ length: 12 }, (_, month) => ({
    month: new Date(2025, month, 1).toLocaleString('default', { month: 'short' }),
    present: Math.floor(Math.random() * 25) + 5, // Random present days
    leaves: Math.floor(Math.random() * 5), // Random leaves
  })),
}));

const initialSalaries = initialFaculties.map((f) => ({
  id: f.id,
  name: f.name,
  baseSalary: 80000 + Math.floor(Math.random() * 20000), // Random base salary
  salaryRecords: Array.from({ length: 12 }, (_, month) => ({
    month: new Date(2025, month, 1).toLocaleString('default', { month: 'short' }),
    gross: 80000 + Math.floor(Math.random() * 20000),
    deductions: Math.floor(Math.random() * 5000),
    net: 0, // To be calculated
    status: Math.random() > 0.5 ? "Paid" : "Pending",
  })),
}));

export default function Faculty() {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [faculties, setFaculties] = useState(initialFaculties);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [salaries, setSalaries] = useState(initialSalaries.map(s => ({
    ...s,
    salaryRecords: s.salaryRecords.map(r => ({
      ...r,
      net: r.gross - r.deductions,
    })),
  })));
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Advanced Charts Data
  const attendanceTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Average Attendance (%)",
        data: [95, 92, 90, 88, 85, 95, 96, 94, 92, 90, 88, 85],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const salaryDistributionData = {
    labels: ["Professor", "Associate Professor", "Assistant Professor"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent],
      },
    ],
  };

  const salaryPayoutTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Salary Payout (₹ Lakh)",
        data: [50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78],
        borderColor: jecrcColors.secondary,
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const aiPredictionData = {
    labels: ["Actual", "Predicted"],
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: [90, 95],
        backgroundColor: [jecrcColors.secondary, jecrcColors.accent],
      },
    ],
  };

  const branchSalaryComparisonData = {
    labels: jecrcBranches[selectedSchool] || [],
    datasets: [
      {
        label: "Average Salary (₹)",
        data: [85000, 82000, 78000, 90000, 85000],
        backgroundColor: jecrcColors.primary,
      },
    ],
  };

  // Filters based on school and branch
  const filterData = (data) => {
    return data.filter((item) => 
      (selectedSchool ? item.school === selectedSchool : true) &&
      (selectedBranch ? item.branch === selectedBranch : true) &&
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredFaculties = filterData(faculties);
  const filteredAttendance = filterData(attendance);
  const filteredSalaries = filterData(salaries);

  const pagedFaculties = filteredFaculties.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedAttendance = filteredAttendance.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedSalaries = filteredSalaries.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredFaculties.length / rowsPerPage);

  const handleAddFaculty = () => {
    setFaculties((prev) => [...prev, { id: Date.now().toString(), school: selectedSchool, branch: selectedBranch, name: "New Faculty", facultyId: "FAC-" + Date.now().toString().slice(-3), designation: "Assistant Professor", email: "new@jecrc.ac.in", phone: "111-222-0000" }]);
  };

  const handleMarkAttendance = (facultyId, month, present) => {
    console.log("Marking attendance for faculty:", facultyId, month, present);
  };

  const handleUpdateSalary = (facultyId, month, gross) => {
    console.log("Updating salary for faculty:", facultyId, month, gross);
  };

  const handlePredictAttendance = (facultyId) => {
    console.log("AI predicting attendance for faculty:", facultyId);
  };

  const handleViewFacultyProfile = (faculty) => {
    setSelectedFaculty(faculty);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFaculty(null);
  };

  const handleVoiceAttendance = () => {
    console.log("Initiating voice-activated attendance marking...");
  };

  const handleARSalaryPreview = (facultyId) => {
    console.log("Launching AR salary slip preview for faculty:", facultyId);
  };

  const handleExport = () => {
    console.log("Exporting data to PDF with JECRC branding...");
  };

  const facultyAttendance = attendance.find(a => a.id === selectedFaculty?.id);
  const attendanceLabels = facultyAttendance?.attendanceRecords?.map(r => r.month);
  const attendanceData = facultyAttendance?.attendanceRecords?.map(r => r.present);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold" style={{ color: `var(--text)` }}>Faculty Management</h2>
      </div>

      {/* School and Branch Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="bg-white border border-gray-300 rounded p-2 w-full md:w-64"
          value={selectedSchool}
          onChange={(e) => {
            setSelectedSchool(e.target.value);
            setSelectedBranch("");
          }}
        >
          <option value="">All Schools</option>
          {jecrcSchools.map((school) => (
            <option key={school} value={school}>{school}</option>
          ))}
        </select>
        <select
          className="bg-white border border-gray-300 rounded p-2 w-full md:w-64"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          disabled={!selectedSchool}
        >
          <option value="">All Branches</option>
          {(jecrcBranches[selectedSchool] || []).map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["list", "attendance", "salarystructures", "salaryrecords", "analytics", "aipredictions", "branchcomparison", "reminders", "topfaculties", "profiles", "voiceattendance", "arsalarypreview"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "aipredictions" && <Bot size={16} />}
            {tab === "branchcomparison" && <BarChart2 size={16} />}
            {tab === "voiceattendance" && <Mic size={16} />}
            {tab === "arsalarypreview" && <Scan size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Individual Faculty Profile */}
      {modalOpen && selectedFaculty && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">{selectedFaculty.name} - Faculty Profile</h2>
            <p><strong>Faculty ID:</strong> {selectedFaculty.facultyId}</p>
            <p><strong>Designation:</strong> {selectedFaculty.designation}</p>
            <p><strong>Email:</strong> {selectedFaculty.email}</p>
            <p><strong>Phone:</strong> {selectedFaculty.phone}</p>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Attendance Trend</h3>
              {attendanceLabels && attendanceData ? (
                <Line
                  data={{
                    labels: attendanceLabels,
                    datasets: [{
                      label: "Present Days",
                      data: attendanceData,
                      borderColor: jecrcColors.primary,
                      fill: true,
                      backgroundColor: "rgba(30, 58, 138, 0.2)",
                    }],
                  }}
                  options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }}
                />
              ) : (
                <p>No attendance trend data available.</p>
              )}

            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Salary Trend</h3>
              <Line data={{
                labels: salaries.find(s => s.id === selectedFaculty.id)?.salaryRecords.map(r => r.month),
                datasets: [
                  {
                    label: "Net Salary (₹)",
                    data: salaries.find(s => s.id === selectedFaculty.id)?.salaryRecords.map(r => r.net),
                    borderColor: jecrcColors.secondary,
                    fill: true,
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                  },
                ],
              }} options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }} />
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={() => handlePredictAttendance(selectedFaculty.id)}
            >
              <Bot size={16} className="mr-2" /> AI Predict Attendance
            </button>
          </div>
        </div>
      )}

      {/* Faculty List Section */}
      {activeTab === "list" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleAddFaculty}
            >
              <Plus size={16} className="mr-2" /> Add Faculty
            </button>
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Faculty List
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Faculty ID</th>
                  <th className="p-2">Designation</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFaculties.length > 0 ? (
                  pagedFaculties.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.facultyId}</td>
                      <td className="p-2">{item.designation}</td>
                      <td className="p-2">{item.email}</td>
                      <td className="p-2">{item.phone}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => handleViewFacultyProfile(item)}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No faculties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredFaculties.length)} of {filteredFaculties.length} entries
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

      {/* Attendance Management Section */}
      {activeTab === "attendance" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleVoiceAttendance}
            >
              <Mic size={16} className="mr-2" /> Voice Attendance (Advanced Feature)
            </button>
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Attendance
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Jan Present/Leaves</th>
                  <th className="p-2">Feb Present/Leaves</th>
                  {/* Add columns for all 12 months */}
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedAttendance.length > 0 ? (
                  pagedAttendance.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{faculties.find(f => f.id === item.id)?.school}</td>
                      <td className="p-2">{faculties.find(f => f.id === item.id)?.branch}</td>
                      <td className="p-2">{item.name}</td>
                      {item.attendanceRecords.map((rec, index) => (
                        <td key={index} className="p-2">{rec.present}/{rec.leaves}</td>
                      ))}
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleMarkAttendance(item.id, "month", "present")}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="p-4 text-center text-gray-500">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredAttendance.length)} of {filteredAttendance.length} entries
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
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Line size={20} className="mr-2 text-blue-900" /> Attendance Trend (Unique Feature: AI-Predicted Leaves)
            </h3>
            <Line data={attendanceTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
          </div>
        </div>
      )}

      {/* Salary Structures Section */}
      {activeTab === "salarystructures" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name or designation..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Salary Structures
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Base Salary (₹)</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedSalaries.length > 0 ? (
                  pagedSalaries.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{faculties.find(f => f.id === item.id)?.school}</td>
                      <td className="p-2">{faculties.find(f => f.id === item.id)?.branch}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">₹{item.baseSalary}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleUpdateSalary(item.id, "month", "gross")}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No salary structures found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredSalaries.length)} of {filteredSalaries.length} entries
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

      {/* Salary Records Section */}
      {activeTab === "salaryrecords" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name or month..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Salary Records
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Jan Gross/Ded/Net</th>
                  <th className="p-2">Feb Gross/Ded/Net</th>
                  {/* Add columns for all 12 months */}
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedSalaries.length > 0 ? (
                  pagedSalaries.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{faculties.find(f => f.id === item.id)?.school}</td>
                      <td className="p-2">{faculties.find(f => f.id === item.id)?.branch}</td>
                      <td className="p-2">{item.name}</td>
                      {item.salaryRecords.map((rec, index) => (
                        <td key={index} className="p-2">₹{rec.gross}/₹{rec.deductions}/₹{rec.net}</td>
                      ))}
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleUpdateSalary(item.id, "month", "gross")}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="p-4 text-center text-gray-500">
                      No salary records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredSalaries.length)} of {filteredSalaries.length} entries
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
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Line size={20} className="mr-2 text-blue-900" /> Salary Payout Trend (Advanced Feature: Automated Deductions)
            </h3>
            <Line data={salaryPayoutTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendanceTrendData && attendanceTrendData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-900" /> Attendance Trend
              </h3>
              <Line data={attendanceTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
            </div>
          )}
          {salaryDistributionData && salaryDistributionData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <PieChart size={20} className="mr-2 text-blue-900" /> Salary Distribution by Designation
              </h3>
              <Pie data={salaryDistributionData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
            </div>
          )}
          {salaryPayoutTrendData && salaryPayoutTrendData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-900" /> Salary Payout Trend
              </h3>
              <Bar data={salaryPayoutTrendData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
          )}
        </div>
      )}

      {/* AI Predictions Tab */}
      {activeTab === "aipredictions" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Bot size={20} className="mr-2 text-blue-900" /> AI Faculty Performance Predictions (Unique to JECRC ERP)
          </h3>
          <p className="text-gray-600 mb-4">AI-driven predictions for attendance patterns, salary increments, and performance bonuses based on historical data.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-2">Predicted vs Actual Attendance</h4>
              <Bar data={aiPredictionData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
            <div>
              <h4 className="text-md font-medium mb-2">Salary Increment Prediction</h4>
              <Line data={salaryPayoutTrendData} options={{ plugins: { filler: { propagate: true } } }} />
            </div>
          </div>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={() => console.log("Running AI prediction model")}
          >
            <TrendingUp size={16} className="mr-2" /> Run AI Prediction for Selected Branch
          </button>
        </div>
      )}

      {/* Branch Comparison Tab */}
      {activeTab === "branchcomparison" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <BarChart2 size={20} className="mr-2 text-blue-900" /> Branch-wise Salary Comparison (Unique Feature)
          </h3>
          <p className="text-gray-600 mb-4">Compare salary structures and attendance across branches with interactive charts.</p>
          <Bar data={branchSalaryComparisonData} options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }} />
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={handleExport}
          >
            <FileText size={16} className="mr-2" /> Generate Comparative Report
          </button>
        </div>
      )}

      {/* Reminders Section */}
      {activeTab === "reminders" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search reminders..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Reminders
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedReminders.length > 0 ? (
                  pagedReminders.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.description}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No reminders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredReminders.length)} of {filteredReminders.length} entries
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

      {/* Top Faculties Tab */}
      {activeTab === "topfaculties" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search top faculties..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Top Faculties
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Rank</th>
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Attendance Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {pagedFaculties.slice(0, 5).map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{item.school}</td>
                    <td className="p-2">{item.branch}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">95%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Profiles Section */}
      {activeTab === "profiles" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search faculties..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Profiles
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFaculties.length > 0 ? (
                  pagedFaculties.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewFacultyProfile(item)}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No faculties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredFaculties.length)} of {filteredFaculties.length} entries
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

      {/* Voice Attendance Tab */}
      {activeTab === "voiceattendance" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Mic size={20} className="mr-2 text-blue-900" /> Voice-Activated Attendance Marking (Unique Feature)
          </h3>
          <p className="text-gray-600 mb-4">Use voice commands to mark attendance for faculties.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={handleVoiceAttendance}
          >
            <Mic size={16} className="mr-2" /> Start Voice Attendance
          </button>
        </div>
      )}

      {/* AR Salary Preview Tab */}
      {activeTab === "arsalarypreview" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Scan size={20} className="mr-2 text-blue-900" /> AR Salary Slip Preview (Unique Feature)
          </h3>
          <p className="text-gray-600 mb-4">Preview salary slips in AR with interactive breakdowns.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={() => handleARSalaryPreview("facultyId")}
          >
            <Scan size={16} className="mr-2" /> Launch AR Preview
          </button>
        </div>
      )}
    </div>
  );
}