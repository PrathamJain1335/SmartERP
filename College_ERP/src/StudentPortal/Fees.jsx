import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search, Calendar, AlertTriangle, BarChart2, PieChart, Receipt, CreditCard, HelpCircle, Calculator, Lightbulb, TrendingUp } from "lucide-react";
import { Bar, Pie, Line as LineChart } from "react-chartjs-2";
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

// Sample data based on JECRC University B.Tech CSE fees (from research: Tuition ~₹1,75,000/year, Hostel ~₹1,00,000/year, Caution ~₹10,000)
const initialFeeOverview = {
  upcoming: [
    { id: "u1", description: "Semester 3 Tuition Fee", amount: 87500, dueDate: "2025-09-30", status: "Upcoming" },
    { id: "u2", description: "Hostel Fee (Semester 3)", amount: 50000, dueDate: "2025-09-30", status: "Upcoming" },
  ],
  pending: [
    { id: "p1", description: "Semester 2 Late Fine", amount: 500, dueDate: "2025-09-15", status: "Pending" },
  ],
  fines: 500,
  totalPaid: 262500,
  totalDue: 137500,
};

const initialPayments = [
  { id: "pay1", semester: 1, date: "2024-07-15", amount: 87500, type: "Tuition Fee", method: "Online" },
  { id: "pay2", semester: 1, date: "2024-07-15", amount: 50000, type: "Hostel Fee", method: "Cash" },
  { id: "pay3", semester: 2, date: "2025-01-10", amount: 87500, type: "Tuition Fee", method: "Online" },
  { id: "pay4", semester: 2, date: "2025-01-10", amount: 50000, type: "Hostel Fee", method: "Online" },
  { id: "pay5", semester: 1, date: "2024-07-10", amount: 10000, type: "Caution Money", method: "Online" },
  // Add more up to 30
];

const initialReceipts = [
  { id: "rec1", receiptId: "REC001", paidDate: "2024-07-15", dueDate: "2024-07-31", amount: 87500, fine: 0, status: "Paid" },
  { id: "rec2", receiptId: "REC002", paidDate: "2024-07-15", dueDate: "2024-07-31", amount: 50000, fine: 0, status: "Paid" },
  { id: "rec3", receiptId: "REC003", paidDate: "2025-01-10", dueDate: "2025-01-31", amount: 87500, fine: 0, status: "Paid" },
  { id: "rec4", receiptId: "REC004", paidDate: "2025-01-10", dueDate: "2025-01-31", amount: 50000, fine: 0, status: "Paid" },
  { id: "rec5", receiptId: "REC005", paidDate: "2024-07-10", dueDate: "2024-07-31", amount: 10000, fine: 0, status: "Paid" },
  // Add more up to 30
];

const initialFines = [
  { id: "f1", description: "Late Fee Payment (Semester 2)", amount: 500, dueDate: "2025-09-15", status: "Pending" },
  { id: "f2", description: "Library Book Overdue", amount: 100, dueDate: "2025-09-20", status: "Paid" },
  // Add more
];

const initialScholarships = [
  { id: "s1", title: "Merit-Based Scholarship", amount: 20000, status: "Applied", eligibility: "CGPA > 8.5" },
  { id: "s2", title: "Need-Based Scholarship", amount: 15000, status: "Eligible", eligibility: "Family Income < ₹5L" },
  // Add more
];

const profile = {
  fullName: "John Doe",
  studentId: "JECRC2025001",
  department: "Computer Science & Engineering",
  course: "B.Tech (CSE)",
  enrollmentYear: "2023",
  
  feeDetails: {
    totalFees: 120000,        // Total fees in currency units
    paidAmount: 90000,        // Amount paid so far
    dueAmount: 30000,         // Amount remaining
    installments: [
      {
        installmentName: "First Installment",
        dueDate: "2025-07-10",
        amount: 40000,
        paid: true,
        paidDate: "2025-07-08",
      },
      {
        installmentName: "Second Installment",
        dueDate: "2025-09-10",
        amount: 40000,
        paid: true,
        paidDate: "2025-09-05",
      },
      {
        installmentName: "Third Installment",
        dueDate: "2025-11-10",
        amount: 40000,
        paid: false,
        paidDate: null,
      },
    ],
    lateFeeCharges: 0,
    scholarshipAmount: 10000,
    paymentMethods: ["Online Bank Transfer", "Credit Card", "UPI"],
    lastPaymentDate: "2025-09-05",
  },

  contactDetails: {
    email: "john.doe@jecrcu.edu.in",
    phone: "+91-9876543210",
    emergencyContact: {
      name: "Robert Doe",
      relation: "Father",
      phone: "+91-8765432109",
    },
  },

  academicStatus: "Good Standing",
} ;

export default function Fees() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Chart Data
  const feeBreakdownData = {
    labels: ["Tuition", "Hostel", "Caution", "Fines"],
    datasets: [
      {
        data: [175000, 100000, 10000, 600],
        backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent, jecrcColors.danger],
      },
    ],
  };

  const paymentHistoryData = {
    labels: ["Jul 2024", "Jan 2025", "Jul 2025"],
    datasets: [
      {
        label: "Payments (₹)",
        data: [185000, 137500, 87500],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const filterData = (data) => {
    return data.filter((item) => 
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredPayments = filterData(initialPayments);
  const filteredReceipts = filterData(initialReceipts);
  const filteredFines = filterData(initialFines);
  const filteredScholarships = filterData(initialScholarships);

  const pagedPayments = filteredPayments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedReceipts = filteredReceipts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedFines = filteredFines.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedScholarships = filteredScholarships.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredPayments.length / rowsPerPage);

  const handleViewReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReceipt(null);
  };

  const handlePayFee = () => {
    console.log("Redirecting to payment gateway...");
  };

  const handleApplyScholarship = () => {
    console.log("Applying for scholarship...");
  };

  const handleExport = () => {
    console.log("Exporting fee data to PDF with JECRC branding...");
  };

  // Unique Features
  const uniqueFeatures = [
    { id: "simulator", title: "Fee Payment Simulator", icon: <Calculator size={16} /> },
    { id: "reminders", title: "Personalized Fee Reminders", icon: <AlertTriangle size={16} /> },
    { id: "visualizer", title: "Fee Breakdown Visualizer", icon: <PieChart size={16} /> },
    { id: "checker", title: "Scholarship Eligibility Checker", icon: <HelpCircle size={16} /> },
    { id: "advisor", title: "Virtual Fee Advisor", icon: <Lightbulb size={16} /> },
  ];

  const handleUniqueFeatureClick = (feature) => {
    console.log("Accessing unique feature:", feature.title);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold text-blue-900">Student Fee Portal</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["dashboard", "payments", "receipts", "fines", "scholarship", "analytics", "uniquefeatures"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "visualizer" && <PieChart size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Receipt View */}
      {modalOpen && selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-md p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">Fee Receipt - {selectedReceipt.receiptId}</h2>
            <p><strong>Paid Date:</strong> {selectedReceipt.paidDate}</p>
            <p><strong>Due Date:</strong> {selectedReceipt.dueDate}</p>
            <p><strong>Amount:</strong> ₹{selectedReceipt.amount}</p>
            <p><strong>Fine:</strong> ₹{selectedReceipt.fine}</p>
            <p><strong>Status:</strong> {selectedReceipt.status}</p>
            <div className="mt-4 border-t border-gray-300 pt-4">
              <p><strong>Student Name:</strong> {profile.name}</p>
              <p><strong>Student ID:</strong> {profile.rollNumber}</p>
              <p><strong>Course:</strong> B.Tech CSE</p>
              <p><strong>University:</strong> JECRC University</p>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Download Receipt
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Section */}
      {activeTab === "dashboard" && (
        <div>
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Fee Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-100 rounded">
                <p className="text-sm text-gray-500">Upcoming Fees</p>
                <p className="text-2xl font-bold">₹{initialFeeOverview.totalDue}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <p className="text-sm text-gray-500">Pending Fees</p>
                <p className="text-2xl font-bold">₹{initialFeeOverview.pending.reduce((acc, p) => acc + p.amount, 0)}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <p className="text-sm text-gray-500">Fines</p>
                <p className="text-2xl font-bold">₹{initialFeeOverview.fines}</p>
              </div>
            </div>
          </div>
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Upcoming Fees</h3>
            {initialFeeOverview.upcoming.map((fee) => (
              <div key={fee.id} className="mb-2 p-2 border-b">
                <p>{fee.description}</p>
                <p className="text-sm text-gray-500">Due: {fee.dueDate} - ₹{fee.amount}</p>
              </div>
            ))}
          </div>
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Pending Fees</h3>
            {initialFeeOverview.pending.map((fee) => (
              <div key={fee.id} className="mb-2 p-2 border-b">
                <p>{fee.description}</p>
                <p className="text-sm text-gray-500">Due: {fee.dueDate} - ₹{fee.amount}</p>
                <button
                  className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
                  onClick={handlePayFee}
                >
                  Pay Now
                </button>
              </div>
            ))}
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
                  <th className="p-2">Semester</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Method</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedPayments.length > 0 ? (
                  pagedPayments.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.semester}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.method}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewReceipt(item)}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
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

      {/* Receipts Section */}
      {activeTab === "receipts" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search receipts..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Receipts
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Receipt ID</th>
                  <th className="p-2">Paid Date</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Fine</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedReceipts.length > 0 ? (
                  pagedReceipts.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.receiptId}</td>
                      <td className="p-2">{item.paidDate}</td>
                      <td className="p-2">{item.dueDate}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">₹{item.fine}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewReceipt(item)}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No receipts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredReceipts.length)} of {filteredReceipts.length} entries
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
              <Download size={16} className="mr-2" /> Export Fines
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Description</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFines.length > 0 ? (
                  pagedFines.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.description}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">{item.dueDate}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handlePayFee()}
                        >
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
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

      {/* Scholarship Section */}
      {activeTab === "scholarship" && (
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
                  <th className="p-2">Title</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Eligibility</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedScholarships.length > 0 ? (
                  pagedScholarships.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">{item.eligibility}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleApplyScholarship()}
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
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

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <PieChart size={20} className="mr-2 text-blue-900" /> Fee Breakdown
            </h3>
            <Pie data={feeBreakdownData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <TrendingUp size={20} className="mr-2 text-blue-900" /> Payment History Trend
            </h3>
            <LineChart data={paymentHistoryData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
          </div>
        </div>
      )}

      {/* Unique Features Section */}
      {activeTab === "uniquefeatures" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uniqueFeatures.map((feature) => (
            <div key={feature.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                {feature.icon} {feature.title}
              </h3>
              <p className="text-gray-600">Click to access {feature.title.toLowerCase()}.</p>
              <button
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleUniqueFeatureClick(feature)}
              >
                Access
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}