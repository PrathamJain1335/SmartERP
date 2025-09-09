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
  neutral: "#6B7280", // Gray,
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

// Dummy data for JECRC Library
const initialBooks = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "9780262033848", type: "Print", status: "Available" },
  { id: "2", school: "School of Sciences", branch: "Physics", title: "Quantum Mechanics", author: "David J. Griffiths", isbn: "9781107189638", type: "E-Book", status: "Available" },
  { id: "3", school: "School of Engineering & Technology", branch: "Mechanical", title: "Thermodynamics", author: "Yunus Cengel", isbn: "9780073398174", type: "Print", status: "Borrowed" },
  { id: "4", school: "School of Law", branch: "LLB", title: "Constitutional Law", author: "VN Shukla", isbn: "9789388822299", type: "E-Book", status: "Available" },
  { id: "5", school: "School of Business", branch: "BBA", title: "Principles of Management", author: "Peter Drucker", isbn: "9780060855865", type: "Print", status: "Available" },
  { id: "6", school: "School of Design", branch: "B.Des", title: "Design Thinking", author: "Tim Brown", isbn: "9780061766084", type: "E-Book", status: "Borrowed" },
  { id: "7", school: "School of Humanities & Social Sciences", branch: "BA", title: "History of India", author: "Romila Thapar", isbn: "9780143104124", type: "Print", status: "Available" },
  { id: "8", school: "School of Allied Health Sciences", branch: "B.Sc Nursing", title: "Nursing Fundamentals", author: "Barbara Kozier", isbn: "9780133974362", type: "E-Book", status: "Available" },
  { id: "9", school: "School of Computer Applications", branch: "BCA", title: "Database Systems", author: "Abraham Silberschatz", isbn: "9780078022159", type: "Print", status: "Borrowed" },
  { id: "10", school: "School of Sciences", branch: "Chemistry", title: "Organic Chemistry", author: "Jonathan Clayden", isbn: "9780198503460", type: "E-Book", status: "Available" },
  { id: "11", school: "School of Engineering & Technology", branch: "Civil", title: "Structural Analysis", author: "R.C. Hibbeler", isbn: "9780134610672", type: "Print", status: "Available" },
  { id: "12", school: "School of Law", branch: "LLM", title: "International Law", author: "Malcolm Shaw", isbn: "9781107612495", type: "E-Book", status: "Borrowed" },
];

const initialDigitalResources = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", title: "DELNET E-Journals", type: "Journal", access: "Online" },
  { id: "2", school: "School of Sciences", branch: "Physics", title: "NPTEL Videos", type: "Video", access: "Online" },
];

const initialMembers = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", name: "Aarav Sharma", membershipId: "MEM-001", status: "Active", expiry: "2026-06-30" },
  { id: "2", school: "School of Sciences", branch: "Physics", name: "Diya Patel", membershipId: "MEM-002", status: "Expired", expiry: "2025-06-30" },
];

const initialFines = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", student: "Aarav Sharma", book: "Introduction to Algorithms", fine: 50, status: "Unpaid" },
  { id: "2", school: "School of Sciences", branch: "Physics", student: "Diya Patel", book: "Quantum Mechanics", fine: 30, status: "Paid" },
];

const initialRequests = [
  { id: "1", school: "School of Engineering & Technology", branch: "Computer Science", student: "Rohan Gupta", bookTitle: "Advanced AI", status: "Pending" },
  { id: "2", school: "School of Sciences", branch: "Physics", student: "Priya Singh", bookTitle: "Relativity", status: "Approved" },
];

const initialEvents = [
  { id: "1", title: "Book Fair", date: "2025-10-10", description: "Annual book fair with discounts." },
  { id: "2", title: "Workshop on Digital Resources", date: "2025-11-15", description: "Training on using DELNET and NPTEL." },
];

const initialTopBorrowedBooks = [
  { rank: 1, school: "School of Engineering & Technology", branch: "Computer Science", title: "Introduction to Algorithms", borrows: 150 },
  { rank: 2, school: "School of Sciences", branch: "Physics", title: "Quantum Mechanics", borrows: 120 },
];

const initialIndividualBorrowHistory = [
  { id: "1", student: "Aarav Sharma", school: "School of Engineering & Technology", branch: "Computer Science", borrowHistory: [{ book: "Introduction to Algorithms", date: "2025-08-01", returned: "2025-08-15" }, { book: "Database Systems", date: "2025-09-01", returned: null }] },
  { id: "2", student: "Diya Patel", school: "School of Sciences", branch: "Physics", borrowHistory: [{ book: "Quantum Mechanics", date: "2025-08-05", returned: "2025-08-20" }, { book: "Organic Chemistry", date: "2025-09-05", returned: null }] },
];

export default function SmartLibrary() {
  const [activeTab, setActiveTab] = useState("catalog");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [books, setBooks] = useState(initialBooks);
  const [digitalResources, setDigitalResources] = useState(initialDigitalResources);
  const [members, setMembers] = useState(initialMembers);
  const [fines, setFines] = useState(initialFines);
  const [requests, setRequests] = useState(initialRequests);
  const [events, setEvents] = useState(initialEvents);
  const [topBorrowedBooks, setTopBorrowedBooks] = useState(initialTopBorrowedBooks);
  const [individualBorrowHistory, setIndividualBorrowHistory] = useState(initialIndividualBorrowHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Advanced Charts Data
  const borrowingTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Borrowed Books",
        data: [200, 250, 220, 280, 300],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const resourceDistributionData = {
    labels: ["Print Books", "E-Books", "Journals", "Videos"],
    datasets: [
      {
        data: [60, 20, 10, 10],
        backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent, jecrcColors.danger],
      },
    ],
  };

  const fineCollectionData = {
    labels: ["Unpaid", "Paid"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: [jecrcColors.danger, jecrcColors.secondary],
      },
    ],
  };

  const aiRecommendationData = {
    labels: ["Recommended Books"],
    datasets: [
      {
        label: "Relevance Score",
        data: [90, 85, 80],
        backgroundColor: jecrcColors.accent,
      },
    ],
  };

  const branchResourceComparisonData = {
    labels: jecrcBranches[selectedSchool] || [],
    datasets: [
      {
        label: "Available Resources",
        data: [500, 450, 400, 350, 300],
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

  const filteredBooks = filterData(books);
  const filteredDigitalResources = filterData(digitalResources);
  const filteredMembers = filterData(members);
  const filteredFines = filterData(fines);
  const filteredRequests = filterData(requests);
  const filteredEvents = filterData(events);
  const filteredTopBorrowedBooks = filterData(topBorrowedBooks);
  const filteredIndividualBorrowHistory = filterData(initialIndividualBorrowHistory);

  const pagedBooks = filteredBooks.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedDigitalResources = filteredDigitalResources.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedMembers = filteredMembers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedFines = filteredFines.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedRequests = filteredRequests.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedEvents = filteredEvents.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedTopBorrowedBooks = filteredTopBorrowedBooks.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedIndividualBorrowHistory = filteredIndividualBorrowHistory.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredBooks.length / rowsPerPage);

  const handleUploadBook = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploading book:", file.name);
      setBooks((prev) => [...prev, { id: Date.now().toString(), school: selectedSchool, branch: selectedBranch, title: file.name, author: "Unknown", isbn: "N/A", type: "Print", status: "Available" }]);
    }
  };

  const handleAddDigitalResource = () => {
    setDigitalResources((prev) => [...prev, { id: Date.now().toString(), school: selectedSchool, branch: selectedBranch, title: "New Resource", type: "E-Book", access: "Online" }]);
  };

  const handleAddMember = () => {
    setMembers((prev) => [...prev, { id: Date.now().toString(), school: selectedSchool, branch: selectedBranch, name: "New Member", membershipId: "MEM-" + Date.now().toString().slice(-3), status: "Active", expiry: "2026-06-30" }]);
  };

  const handleCalculateFine = (fineId) => {
    console.log("Calculating fine for:", fineId);
  };

  const handleApproveRequest = (requestId) => {
    console.log("Approving requisition request:", requestId);
  };

  const handleAddEvent = () => {
    setEvents((prev) => [...prev, { id: Date.now().toString(), title: "New Event", date: new Date().toISOString().split("T")[0], description: "Enter description here." }]);
  };

  const handleRecommendBook = (studentId) => {
    console.log("AI recommending books for student:", studentId);
  };

  const handleViewBorrowHistory = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleVoiceSearch = () => {
    console.log("Initiating voice search...");
  };

  const handleARPreview = (bookId) => {
    console.log("Launching AR preview for book:", bookId);
  };

  const handleExport = () => {
    console.log("Exporting data to PDF with JECRC branding...");
    // Placeholder for actual export logic (e.g., using jsPDF or html2pdf)
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold" style={{ color: `var(--text)` }}> Library Management</h2>
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
        {["catalog", "digitalresources", "membership", "fines", "requisitions", "analytics", "arecommendations", "branchcomparison", "events", "borrowhistory", "topborrowed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "arecommendations" && <Bot size={16} />}
            {tab === "branchcomparison" && <BarChart2 size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Individual Borrow History */}
      {modalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">{selectedStudent.student} - Borrow History</h2>
            <table className="w-full text-left text-sm mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Book</th>
                  <th className="p-2">Borrow Date</th>
                  <th className="p-2">Returned</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.borrowHistory.map((history, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{history.book}</td>
                    <td className="p-2">{history.date}</td>
                    <td className="p-2">{history.returned || "Not Returned"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Borrow Trend</h3>
              <Line data={{
                labels: selectedStudent.borrowHistory.map((h) => h.date),
                datasets: [
                  {
                    label: "Borrowed Items",
                    data: selectedStudent.borrowHistory.map(() => 1), // Simple count
                    borderColor: jecrcColors.primary,
                    fill: true,
                    backgroundColor: "rgba(30, 58, 138, 0.2)",
                  },
                ],
              }} options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }} />
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={() => handleRecommendBook(selectedStudent.id)}
            >
              <Bot size={16} className="mr-2" /> AI Recommend Books
            </button>
          </div>
        </div>
      )}

      {/* Book Catalog Section */}
      {activeTab === "catalog" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <label className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer flex items-center">
              <Upload size={16} className="mr-2" />
              Upload Book
              <input type="file" className="hidden" onChange={handleUploadBook} accept=".pdf,.epub" />
            </label>
            <input
              type="text"
              placeholder="Search by title, author, ISBN..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleVoiceSearch}
            >
              <Mic size={16} className="mr-2" /> Voice Search
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Catalog (PDF with JECRC Branding)
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">ISBN</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedBooks.length > 0 ? (
                  pagedBooks.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.author}</td>
                      <td className="p-2">{item.isbn}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Available" ? "bg-green-500" : "bg-red-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-purple-500 hover:underline"
                          onClick={() => handleARPreview(item.id)}
                        >
                          <Scan size={16} /> AR Preview
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredBooks.length)} of {filteredBooks.length} entries
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

      {/* Digital Resources Section */}
      {activeTab === "digitalresources" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleAddDigitalResource}
            >
              <Plus size={16} className="mr-2" /> Add Digital Resource
            </button>
            <input
              type="text"
              placeholder="Search digital resources..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Resources List
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Access</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedDigitalResources.length > 0 ? (
                  pagedDigitalResources.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.access}</td>
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
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No digital resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredDigitalResources.length)} of {filteredDigitalResources.length} entries
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

      {/* Membership Section */}
      {activeTab === "membership" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleAddMember}
            >
              <Plus size={16} className="mr-2" /> Add/Renew Member
            </button>
            <input
              type="text"
              placeholder="Search members..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Membership List
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Membership ID</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Expiry</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedMembers.length > 0 ? (
                  pagedMembers.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.membershipId}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">{item.expiry}</td>
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
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredMembers.length)} of {filteredMembers.length} entries
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
                  <th className="p-2">Book</th>
                  <th className="p-2">Fine Amount</th>
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
                      <td className="p-2">{item.book}</td>
                      <td className="p-2">₹{item.fine}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Unpaid" ? "bg-red-500" : "bg-green-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleCalculateFine(item.id)}
                        >
                          Pay Fine
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

      {/* Requisitions Section */}
      {activeTab === "requisitions" && (
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
              <Download size={16} className="mr-2" /> Export Requisitions
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Student</th>
                  <th className="p-2">Book Title</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedRequests.length > 0 ? (
                  pagedRequests.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">{item.bookTitle}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${item.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          className="text-green-500 hover:underline mr-2"
                          onClick={() => handleApproveRequest(item.id)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No requisitions found.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowingTrendData && borrowingTrendData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-900" /> Borrowing Trend
              </h3>
              <Line data={borrowingTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
            </div>
          )}
          {resourceDistributionData && resourceDistributionData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <PieChart size={20} className="mr-2 text-blue-900" /> Resource Distribution
              </h3>
              <Pie data={resourceDistributionData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
            </div>
          )}
          {fineCollectionData && fineCollectionData.labels && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-900" /> Fine Collection Status
              </h3>
              <Bar data={fineCollectionData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
          )}
        </div>
      )}

      {/* AI Recommendations Tab */}
      {activeTab === "arecommendations" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Bot size={20} className="mr-2 text-blue-900" /> AI Book Recommendations (Unique to JECRC Library ERP)
          </h3>
          <p className="text-gray-600 mb-4">AI-driven recommendations based on borrow history, branch, and trending resources.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-2">Relevance Score</h4>
              <Bar data={aiRecommendationData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
            <div>
              <h4 className="text-md font-medium mb-2">Trending Resources</h4>
              <Line data={borrowingTrendData} options={{ plugins: { filler: { propagate: true } } }} />
            </div>
          </div>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={() => console.log("Running AI recommendation model")}
          >
            <TrendingUp size={16} className="mr-2" /> Generate Recommendations for Selected Branch
          </button>
        </div>
      )}

      {/* Branch Comparison Tab */}
      {activeTab === "branchcomparison" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <BarChart2 size={20} className="mr-2 text-blue-900" /> Branch-wise Resource Comparison (Unique Feature)
          </h3>
          <p className="text-gray-600 mb-4">Compare resource availability and usage across branches with interactive charts.</p>
          <Bar data={branchResourceComparisonData} options={{ plugins: { zoom: { zoom: { mode: 'x' } } } }} />
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={handleExport}
          >
            <FileText size={16} className="mr-2" /> Generate Comparative Report
          </button>
        </div>
      )}

      {/* Events Section */}
      {activeTab === "events" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleAddEvent}
            >
              <Plus size={16} className="mr-2" /> Add Event
            </button>
            <input
              type="text"
              placeholder="Search events..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Events Calendar
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
                {pagedEvents.length > 0 ? (
                  pagedEvents.map((item) => (
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
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredEvents.length)} of {filteredEvents.length} entries
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

      {/* Borrow History Tab */}
      {activeTab === "borrowhistory" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by student..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Borrow History
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Student</th>
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedIndividualBorrowHistory.length > 0 ? (
                  pagedIndividualBorrowHistory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.student}</td>
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewBorrowHistory(item)}
                        >
                          View History
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No borrow history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredIndividualBorrowHistory.length)} of {filteredIndividualBorrowHistory.length} entries
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

      {/* Top Borrowed Books Tab */}
      {activeTab === "topborrowed" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search books..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Top Borrowed Books
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Rank</th>
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Borrows</th>
                </tr>
              </thead>
              <tbody>
                {pagedTopBorrowedBooks.length > 0 ? (
                  pagedTopBorrowedBooks.map((item) => (
                    <tr key={item.rank} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.rank}</td>
                      <td className="p-2">{item.school}</td>
                      <td className="p-2">{item.branch}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.borrows}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No top borrowed books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredTopBorrowedBooks.length)} of {filteredTopBorrowedBooks.length} entries
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