import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Edit, Download, Plus, Search, Calendar, AlertTriangle, BarChart2, PieChart, FileText, Users, Bot, TrendingUp, Mic, Scan, CreditCard } from "lucide-react";
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

// Dummy data for JECRC Fee Management
const initialFeeStructures = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", feeType: "Tuition Fee", amount: 150000, semester: "1", dueDate: "2025-09-15" },
  { id: "2", school: "School of Sciences", branch: "Physics", feeType: "Hostel Fee", amount: 80000, semester: "1", dueDate: "2025-09-20" },
  // Expanded to 12
  { id: "3", school: "School of Engineering & Technology", branch: "Mechanical", feeType: "Lab Fee", amount: 20000, semester: "1", dueDate: "2025-09-25" },
  { id: "4", school: "School of Law", branch: "LLB", feeType: "Tuition Fee", amount: 120000, semester: "1", dueDate: "2025-09-30" },
  { id: "5", school: "School of Business", branch: "BBA", feeType: "Exam Fee", amount: 5000, semester: "1", dueDate: "2025-10-05" },
  { id: "6", school: "School of Design", branch: "B.Des", feeType: "Library Fee", amount: 3000, semester: "1", dueDate: "2025-10-10" },
  { id: "7", school: "School of Humanities & Social Sciences", branch: "BA", feeType: "Sports Fee", amount: 2000, semester: "1", dueDate: "2025-10-15" },
  { id: "8", school: "School of Allied Health Sciences", branch: "B.Sc Nursing", feeType: "Hostel Fee", amount: 85000, semester: "1", dueDate: "2025-10-20" },
  { id: "9", school: "School of Computer Applications", branch: "BCA", feeType: "Tuition Fee", amount: 100000, semester: "1", dueDate: "2025-10-25" },
  { id: "10", school: "School of Sciences", branch: "Chemistry", feeType: "Lab Fee", amount: 15000, semester: "1", dueDate: "2025-10-30" },
  { id: "11", school: "School of Engineering & Technology", branch: "Civil", feeType: "Exam Fee", amount: 6000, semester: "1", dueDate: "2025-11-05" },
  { id: "12", school: "School of Law", branch: "LLM", feeType: "Library Fee", amount: 4000, semester: "1", dueDate: "2025-11-10" },
];

const initialStudentFees = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", student: "Aarav Sharma", feeType: "Tuition Fee", amount: 150000, paid: 100000, due: 50000, status: "Partial Paid" },
  { id: "2", school: "School of Sciences", branch: "Physics", student: "Diya Patel", feeType: "Hostel Fee", amount: 80000, paid: 80000, due: 0, status: "Paid" },
  // Expanded
];

const initialPayments = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", student: "Aarav Sharma", amount: 100000, date: "2025-08-15", method: "Online", status: "Successful" },
  { id: "2", school: "School of Sciences", branch: "Physics", student: "Diya Patel", amount: 80000, date: "2025-08-20", method: "Cash", status: "Successful" },
  // Expanded
];

const initialScholarships = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", student: "Rohan Gupta", amount: 50000, status: "Approved" },
  { id: "2", school: "School of Sciences", branch: "Physics", student: "Priya Singh", amount: 30000, status: "Pending" },
  // Expanded
];

const initialFines = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", student: "Aarav Sharma", reason: "Late Payment", amount: 2000, status: "Unpaid" },
  { id: "2", school: "School of Sciences", branch: "Physics", student: "Diya Patel", reason: "Overdue Fee", amount: 1000, status: "Paid" },
  // Expanded
];

const initialReminders = [
  { id: "1", title: "Fee Deadline", date: "2025-09-15", description: "Last day for tuition fee payment." },
  { id: "2", title: "Scholarship Application", date: "2025-09-20", description: "Apply for merit scholarships." },
  // Expanded
];

const initialTopDefaulters = [
  { rank: 1, school: "School of Engineering & Technology", branch: "Computer Science", student: "Rohan Gupta", due: 50000 },
  { rank: 2, school: "School of Sciences", branch: "Physics", student: "Priya Singh", due: 30000 },
  // Expanded
];

const initialIndividualFeeHistory = [
  { id: "1", student: "Aarav Sharma", school: "School of Engineering & Technology", branch: "Computer Science", feeHistory: [{ feeType: "Tuition Fee", amount: 150000, paid: 100000, date: "2025-08-15" }, { feeType: "Hostel Fee", amount: 80000, paid: 0, date: null }] },
  { id: "2", student: "Diya Patel", school: "School of Sciences", branch: "Physics", feeHistory: [{ feeType: "Tuition Fee", amount: 120000, paid: 120000, date: "2025-08-20" }, { feeType: "Lab Fee", amount: 15000, paid: 15000, date: "2025-08-25" }] },
  // Expanded
];

export default function FeeManagement() {
  const [activeTab, setActiveTab] = useState("feestructure");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [feeStructures, setFeeStructures] = useState(initialFeeStructures);
  const [studentFees, setStudentFees] = useState(initialStudentFees);
  const [payments, setPayments] = useState(initialPayments);
  const [scholarships, setScholarships] = useState(initialScholarships);
  const [fines, setFines] = useState(initialFines);
  const [reminders, setReminders] = useState(initialReminders);
  const [topDefaulters, setTopDefaulters] = useState(initialTopDefaulters);
  const [individualFeeHistory, setIndividualFeeHistory] = useState(initialIndividualFeeHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Advanced Charts Data
  const collectionTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Fee Collection (₹ Lakh)",
        data: [120, 150, 130, 160, 180],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const feeCategoryDistributionData = {
    labels: ["Tuition", "Hostel", "Lab", "Exam", "Library"],
    datasets: [
      {
        data: [50, 20, 10, 10, 10],
        backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent, jecrcColors.danger, jecrcColors.neutral],
      },
    ],
  };

  const scholarshipAllocationData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: [jecrcColors.secondary, jecrcColors.accent, jecrcColors.danger],
      },
    ],
  };

  const aiFeePredictionData = {
    labels: ["Actual", "Predicted"],
    datasets: [
      {
        label: "Fee Collection (₹ Lakh)",
        data: [150, 170],
        backgroundColor: [jecrcColors.secondary, jecrcColors.accent],
      },
    ],
  };

  const branchFeeComparisonData = {
    labels: jecrcBranches[selectedSchool] || [],
    datasets: [
      {
        label: "Total Fees Collected (₹ Lakh)",
        data: [200, 180, 150, 120, 100],
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

  const filteredFeeStructures = filterData(feeStructures);
  const filteredStudentFees = filterData(studentFees);
  const filteredPayments = filterData(payments);
  const filteredScholarships = filterData(scholarships);
  const filteredFines = filterData(fines);
  const filteredReminders = filterData(reminders);
  const filteredTopDefaulters = filterData(topDefaulters);
  const filteredIndividualFeeHistory = filterData(initialIndividualFeeHistory);

  const pagedFeeStructures = filteredFeeStructures.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedStudentFees = filteredStudentFees.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedPayments = filteredPayments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedScholarships = filteredScholarships.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedFines = filteredFines.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedReminders = filteredReminders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedTopDefaulters = filteredTopDefaulters.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedIndividualFeeHistory = filteredIndividualFeeHistory.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredFeeStructures.length / rowsPerPage);

  const handleUploadFeeStructure = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploading fee structure:", file.name);
      setFeeStructures((prev) => [...prev, { id: Date.now().toString(), school: selectedSchool, branch: selectedBranch, feeType: "New Fee", amount: 0, semester: "1", dueDate: new Date().toISOString().split("T")[0] }]);
    }
  };

  const handleProcessPayment = (paymentId) => {
    console.log("Processing payment for:", paymentId);
  };

  const handleApproveScholarship = (scholarshipId) => {
    console.log("Approving scholarship:", scholarshipId);
  };

  const handleWaiveFine = (fineId) => {
    console.log("Waiving fine for:", fineId);
  };

  const handleAddReminder = () => {
    setReminders((prev) => [...prev, { id: Date.now().toString(), title: "New Reminder", date: new Date().toISOString().split("T")[0], description: "Enter description here." }]);
  };

  const handlePredictFeeCollection = (branch) => {
    console.log("AI predicting fee collection for branch:", branch);
  };

  const handleViewFeeHistory = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleVoiceInquiry = () => {
    console.log("Initiating voice fee inquiry...");
  };

  const handleARReceiptPreview = (paymentId) => {
    console.log("Launching AR fee receipt preview for payment:", paymentId);
  };

  const handleExport = () => {
    console.log("Exporting data to PDF with JECRC branding...");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="\image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold" style={{ color: `var(--text)` }}>Fee Management</h2>
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
        {["feestructure", "studentfees", "payments", "scholarships", "fines", "analytics", "aipredictions", "branchcomparison", "reminders", "topdefaulters", "feeinquiry", "arreceipt"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "aipredictions" && <Bot size={16} />}
            {tab === "branchcomparison" && <BarChart2 size={16} />}
            {tab === "feeinquiry" && <Mic size={16} />}
            {tab === "arreceipt" && <Scan size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Individual Fee History */}
      {modalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">{selectedStudent.student} - Fee History</h2>
            <table className="w-full text-left text-sm mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Fee Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Paid</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.feeHistory.map((history, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{history.feeType}</td>
                    <td className="p-2">₹{history.amount}</td>
                    <td className="p-2">₹{history.paid}</td>
                    <td className="p-2">{history.date || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Payment Trend</h3>
              <Line data={{
                labels: selectedStudent.feeHistory.map((h) => h.feeType),
                datasets: [
                  {
                    label: "Paid Amount",
                    data: selectedStudent.feeHistory.map((h) => h.paid),
                    borderColor: jecrcColors.primary,
                    fill: true,
                    backgroundColor: "rgba(30, 58, 138, 0.2)",
                  },
                ],
              }} options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }} />
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={() => handlePredictFeeCollection(selectedStudent.branch)}
            >
              <Bot size={16} className="mr-2" /> AI Predict Future Fees
            </button>
          </div>
        </div>
      )}

      {/* Fee Structure Section */}
      {activeTab === "feestructure" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <label className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer flex items-center">
              <Upload size={16} className="mr-2" />
              Upload Fee Structure
              <input type="file" className="hidden" onChange={handleUploadFeeStructure} accept=".pdf,.csv,.xlsx" />
            </label>
            <input
              type="text"
              placeholder="Search by fee type or semester..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Fee Structure (PDF with JECRC Branding)
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Fee Type</th>
                  <th className="p-2">Amount (₹)</th>
                  <th className="p-2">Semester</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFeeStructures.length > 0 ? (
                  pagedFeeStructures.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.feeType}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">{item.semester}</td>
                      <td className="p-2">{item.dueDate}</td>
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
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No fee structures found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredFeeStructures.length)} of {filteredFeeStructures.length} entries
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

      {/* Student Fees Section */}
      {activeTab === "studentfees" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by student or fee type..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Student Fees
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Fee Type</th>
                  <th className="p-2">Amount (₹)</th>
                  <th className="p-2">Paid (₹)</th>
                  <th className="p-2">Due (₹)</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedStudentFees.length > 0 ? (
                  pagedStudentFees.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">{item.feeType}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">₹{item.paid}</td>
                      <td className="p-2">₹{item.due}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Paid" ? "bg-green-500" : item.status === "Partial Paid" ? "bg-yellow-500" : "bg-red-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleViewFeeHistory(item)}
                        >
                          View History
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-500">
                      No student fees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredStudentFees.length)} of {filteredStudentFees.length} entries
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

      {/* Payments Section */}
      {activeTab === "payments" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search payments..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Payments
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Amount (₹)</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Method</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedPayments.length > 0 ? (
                  pagedPayments.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.method}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Successful" ? "bg-green-500" : "bg-red-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleProcessPayment(item.id)}
                        >
                          <CreditCard size={16} /> Process Refund
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredPayments.length)} of {filteredPayments.length} entries
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

      {/* Scholarships Section */}
      {activeTab === "scholarships" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search scholarships..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Scholarships
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Amount (₹)</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedScholarships.length > 0 ? (
                  pagedScholarships.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-green-500 hover:underline mr-2"
                          onClick={() => handleApproveScholarship(item.id)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No scholarships found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredScholarships.length)} of {filteredScholarships.length} entries
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

      {/* Fines Section */}
      {activeTab === "fines" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search fines..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Fines Report
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Reason</th>
                  <th className="p-2">Amount (₹)</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFines.length > 0 ? (
                  pagedFines.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">{item.reason}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Unpaid" ? "bg-red-500" : "bg-green-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleWaiveFine(item.id)}
                        >
                          Waive Fine
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No fines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredFines.length)} of {filteredFines.length} entries
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionTrendData && collectionTrendData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-900" /> Fee Collection Trend
              </h3>
              <Line data={collectionTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
            </div>
          )}
          {feeCategoryDistributionData && feeCategoryDistributionData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <PieChart size={20} className="mr-2 text-blue-900" /> Fee Category Distribution
              </h3>
              <Pie data={feeCategoryDistributionData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
            </div>
          )}
          {scholarshipAllocationData && scholarshipAllocationData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-900" /> Scholarship Allocation Status
              </h3>
              <Bar data={scholarshipAllocationData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
          )}
        </div>
      )}

      {/* AI Predictions Tab */}
      {activeTab === "aipredictions" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Bot size={20} className="mr-2 text-blue-900" /> AI Fee Collection Predictions (Unique to JECRC Fee ERP)
          </h3>
          <p className="text-gray-600 mb-4">AI-driven predictions for fee collection, defaulter risk, and scholarship eligibility based on historical data.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-2">Predicted vs Actual Collection</h4>
              <Bar data={aiFeePredictionData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
            <div>
              <h4 className="text-md font-medium mb-2">Defaulter Risk Trend</h4>
              <Line data={collectionTrendData} options={{ plugins: { filler: { propagate: true } } }} />
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
            <BarChart2 size={20} className="mr-2 text-blue-900" /> Branch-wise Fee Comparison (Unique Feature)
          </h3>
          <p className="text-gray-600 mb-4">Compare fee collection and due amounts across branches with interactive charts.</p>
          <Bar data={branchFeeComparisonData} options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }} />
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
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleAddReminder}
            >
              <Plus size={16} className="mr-2" /> Add Reminder
            </button>
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

      {/* Top Defaulters Tab */}
      {activeTab === "topdefaulters" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search defaulters..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Top Defaulters
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Rank</th>
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Due (₹)</th>
                </tr>
              </thead>
              <tbody>
                {pagedTopDefaulters.length > 0 ? (
                  pagedTopDefaulters.map((item) => (
                    <tr key={item.rank} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.rank}</td>
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">₹{item.due}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No top defaulters found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredTopDefaulters.length)} of {filteredTopDefaulters.length} entries
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

      {/* Fee Inquiry Tab (Voice-Activated) */}
      {activeTab === "feeinquiry" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Mic size={20} className="mr-2 text-blue-900" /> Voice-Activated Fee Inquiry (Unique to JECRC Fee ERP)
          </h3>
          <p className="text-gray-600 mb-4">Use voice commands to inquire about fee status, due dates, or payment history.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={handleVoiceInquiry}
          >
            <Mic size={16} className="mr-2" /> Start Voice Inquiry
          </button>
          <div className="mt-6">
            <h4 className="text-md font-medium mb-2">Inquiry Results (Placeholder)</h4>
            <p>Fee due: ₹50,000 by 2025-09-15</p>
          </div>
        </div>
      )}

      {/* AR Receipt Preview Tab */}
      {activeTab === "arreceipt" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Scan size={20} className="mr-2 text-blue-900" /> AR Fee Receipt Preview (Unique Feature)
          </h3>
          <p className="text-gray-600 mb-4">Use AR to preview fee receipts in 3D with interactive breakdowns.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={() => handleARReceiptPreview("paymentId")}
          >
            <Scan size={16} className="mr-2" /> Launch AR Preview
          </button>
          <div className="mt-6">
            <h4 className="text-md font-medium mb-2">Preview Breakdown (Placeholder)</h4>
            <p>Tuition: ₹100,000 | Hostel: ₹50,000</p>
          </div>
        </div>
      )}
    </div>
  );
}