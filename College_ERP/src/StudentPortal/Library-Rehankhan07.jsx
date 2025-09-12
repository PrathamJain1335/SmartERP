import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Edit, Download, Plus, Search, Calendar, AlertTriangle, BarChart2, PieChart as PieChartIcon, FileText, Users, Bot, TrendingUp, Mic, Scan, BookOpen, ThumbsUp, Group, MessageSquare, LucideTimer, Lightbulb } from "lucide-react";
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
import { Message } from "@mui/icons-material";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler, zoomPlugin);

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
  neutral: "#6B7280",
};

// Dummy data for JECRC Student Library
const initialBooks = [
  { id: "1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "9780262033848", type: "Print", status: "Available", category: "Computer Science" },
  { id: "2", title: "Quantum Mechanics", author: "David J. Griffiths", isbn: "9781107189638", type: "E-Book", status: "Available", category: "Physics" },
  { id: "3", title: "Thermodynamics", author: "Yunus Cengel", isbn: "9780073398174", type: "Print", status: "Borrowed", category: "Mechanical Engineering" },
  { id: "4", title: "Constitutional Law", author: "VN Shukla", isbn: "9789388822299", type: "E-Book", status: "Available", category: "Law" },
  { id: "5", title: "Principles of Management", author: "Peter Drucker", isbn: "9780060855865", type: "Print", status: "Available", category: "Business" },
  { id: "6", title: "Design Thinking", author: "Tim Brown", isbn: "9780061766084", type: "E-Book", status: "Borrowed", category: "Design" },
  { id: "7", title: "History of India", author: "Romila Thapar", isbn: "9780143104124", type: "Print", status: "Available", category: "Humanities" },
  { id: "8", title: "Nursing Fundamentals", author: "Barbara Kozier", isbn: "9780133974362", type: "E-Book", status: "Available", category: "Health Sciences" },
  { id: "9", title: "Database Systems", author: "Abraham Silberschatz", isbn: "9780078022159", type: "Print", status: "Borrowed", category: "Computer Applications" },
  { id: "10", title: "Organic Chemistry", author: "Jonathan Clayden", isbn: "9780198503460", type: "E-Book", status: "Available", category: "Chemistry" },
  { id: "11", title: "Structural Analysis", author: "R.C. Hibbeler", isbn: "9780134610672", type: "Print", status: "Available", category: "Civil Engineering" },
  { id: "12", title: "International Law", author: "Malcolm Shaw", isbn: "9781107612495", type: "E-Book", status: "Borrowed", category: "Law" },
  { id: "13", title: "Engineering Mathematics", author: "B.S. Grewal", isbn: "9788193328491", type: "Print", status: "Available", category: "Engineering" },
  { id: "14", title: "Digital Electronics", author: "Morris Mano", isbn: "9789332580060", type: "E-Book", status: "Available", category: "Electronics" },
  { id: "15", title: "Financial Management", author: "Prasanna Chandra", isbn: "9789352605590", type: "Print", status: "Borrowed", category: "Business" },
  { id: "16", title: "Graphic Design Basics", author: "David Dabner", isbn: "9780500519523", type: "E-Book", status: "Available", category: "Design" },
  { id: "17", title: "Sociology", author: "Anthony Giddens", isbn: "9780745643588", type: "Print", status: "Available", category: "Social Sciences" },
  { id: "18", title: "Human Anatomy", author: "Elaine Marieb", isbn: "9780135168059", type: "E-Book", status: "Borrowed", category: "Health Sciences" },
  { id: "19", title: "Computer Networks", author: "Andrew Tanenbaum", isbn: "9789332518742", type: "Print", status: "Available", category: "Computer Science" },
  { id: "20", title: "Physical Chemistry", author: "P.W. Atkins", isbn: "9780198817895", type: "E-Book", status: "Available", category: "Chemistry" },
  { id: "21", title: "Geotechnical Engineering", author: "Braja M. Das", isbn: "9781305970939", type: "Print", status: "Borrowed", category: "Civil Engineering" },
  { id: "22", title: "Criminal Law", author: "K.D. Gaur", isbn: "9788131253649", type: "E-Book", status: "Available", category: "Law" },
  { id: "23", title: "Linear Algebra", author: "Gilbert Strang", isbn: "9780980232776", type: "Print", status: "Available", category: "Mathematics" },
  { id: "24", title: "Power Systems", author: "Leonard L. Grigsby", isbn: "9781439856338", type: "E-Book", status: "Borrowed", category: "Electrical Engineering" },
  { id: "25", title: "Marketing Management", author: "Philip Kotler", isbn: "9780133856460", type: "Print", status: "Available", category: "Business" },
  { id: "26", title: "UI/UX Design", author: "Steve Krug", isbn: "9780321965516", type: "E-Book", status: "Available", category: "Design" },
  { id: "27", title: "Psychology", author: "Saundra Ciccarelli", isbn: "9780205972241", type: "Print", status: "Borrowed", category: "Social Sciences" },
  { id: "28", title: "Physiotherapy", author: "Susan B. O'Sullivan", isbn: "9780803661134", type: "E-Book", status: "Available", category: "Health Sciences" },
  { id: "29", title: "Software Engineering", author: "Ian Sommerville", isbn: "9780133943030", type: "Print", status: "Available", category: "Computer Science" },
  { id: "30", title: "Inorganic Chemistry", author: "J.D. Lee", isbn: "9788126566358", type: "E-Book", status: "Borrowed", category: "Chemistry" },
];

const initialBorrowHistory = [
  { id: "1", title: "Introduction to Algorithms", borrowDate: "2025-09-01", dueDate: "2025-09-15", returned: false, fine: 0 },
  { id: "2", title: "Quantum Mechanics", borrowDate: "2025-09-05", dueDate: "2025-09-20", returned: true, fine: 0 },
  { id: "3", title: "Thermodynamics", borrowDate: "2025-09-10", dueDate: "2025-09-25", returned: false, fine: 50 },
  { id: "4", title: "Constitutional Law", borrowDate: "2025-09-12", dueDate: "2025-09-27", returned: false, fine: 0 },
  { id: "5", title: "Principles of Management", borrowDate: "2025-09-15", dueDate: "2025-09-30", returned: true, fine: 0 },
  { id: "6", title: "Design Thinking", borrowDate: "2025-09-18", dueDate: "2025-10-03", returned: false, fine: 0 },
  { id: "7", title: "History of India", borrowDate: "2025-09-20", dueDate: "2025-10-05", returned: false, fine: 0 },
  { id: "8", title: "Nursing Fundamentals", borrowDate: "2025-09-22", dueDate: "2025-10-07", returned: true, fine: 0 },
  { id: "9", title: "Database Systems", borrowDate: "2025-09-25", dueDate: "2025-10-10", returned: false, fine: 0 },
  { id: "10", title: "Organic Chemistry", borrowDate: "2025-09-28", dueDate: "2025-10-13", returned: false, fine: 0 },
  { id: "11", title: "Structural Analysis", borrowDate: "2025-09-30", dueDate: "2025-10-15", returned: true, fine: 0 },
  { id: "12", title: "International Law", borrowDate: "2025-10-02", dueDate: "2025-10-17", returned: false, fine: 0 },
  // Add more up to 30
];

const initialFines = [
  { id: "1", book: "Thermodynamics", amount: 50, dueDate: "2025-09-25", status: "Unpaid" },
  { id: "2", book: "Design Thinking", amount: 30, dueDate: "2025-10-03", status: "Unpaid" },
  // Add more
];

const initialDigitalResources = [
  { id: "1", title: "DELNET E-Journals", type: "Journal", access: "Online" },
  { id: "2", title: "NPTEL Videos", type: "Video", access: "Online" },
  { id: "3", title: "IEEE Xplore", type: "Database", access: "Online" },
  { id: "4", title: "EBSCO E-Books", type: "E-Book", access: "Online" },
  { id: "5", title: "ProQuest Theses", type: "Theses", access: "Online" },
  { id: "6", title: "Shodhganga", type: "Theses", access: "Online" },
  { id: "7", title: "JSTOR", type: "Journal", access: "Online" },
  { id: "8", title: "SpringerLink", type: "Journal", access: "Online" },
  { id: "9", title: "ScienceDirect", type: "Journal", access: "Online" },
  { id: "10", title: "Wiley Online Library", type: "Journal", access: "Online" },
  // Add more up to 30
];

const initialRecommendations = [
  { id: "1", title: "Introduction to Algorithms", category: "Computer Science" },
  { id: "2", title: "Clean Code", category: "Skill Development" },
  // Add more
];

const initialStudyGroups = [
  { id: "1", book: "Introduction to Algorithms", members: 5, meetingDate: "2025-09-15" },
  { id: "2", book: "Quantum Mechanics", members: 3, meetingDate: "2025-09-20" },
  // Add more
];

const initialReadingProgress = initialBorrowHistory.map((h) => ({
  id: h.id,
  progress: Math.floor(Math.random() * 100),
}));

const initialFeedback = initialBooks.map((b) => ({
  id: b.id,
  feedback: "Great book for beginners.",
}));

export default function StudentLibrary() {
  const [activeTab, setActiveTab] = useState("catalog");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // State for books, borrow history, fines, etc.
  const [books, setBooks] = useState(initialBooks);
  const [borrowHistory, setBorrowHistory] = useState(initialBorrowHistory);
  const [fines, setFines] = useState(initialFines);
  const [digitalResources, setDigitalResources] = useState(initialDigitalResources);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [studyGroups, setStudyGroups] = useState(initialStudyGroups);
  const [readingProgress, setReadingProgress] = useState(initialReadingProgress);
  const [feedback, setFeedback] = useState(initialFeedback);

  // Advanced Charts Data
  const borrowTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Borrowed Books",
        data: [20, 35, 50, 65, 75, 85, 90, 95, 98],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const categoryDistributionData = {
    labels: ["Computer Science", "Physics", "Mechanical", "Law", "Business"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent, jecrcColors.danger, jecrcColors.neutral],
      },
    ],
  };

  const filterData = (data) => {
    return data.filter((item) => 
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredBooks = filterData(books);
  const filteredBorrowHistory = filterData(borrowHistory);
  const filteredFines = filterData(fines);
  const filteredDigitalResources = filterData(digitalResources);
  const filteredRecommendations = filterData(recommendations);
  const filteredStudyGroups = filterData(studyGroups);
  const filteredReadingProgress = filterData(readingProgress);
  const filteredFeedback = filterData(feedback);

  const pagedBooks = filteredBooks.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedBorrowHistory = filteredBorrowHistory.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedFines = filteredFines.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedDigitalResources = filteredDigitalResources.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedRecommendations = filteredRecommendations.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedStudyGroups = filteredStudyGroups.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedReadingProgress = filteredReadingProgress.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedFeedback = filteredFeedback.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredBooks.length / rowsPerPage);

  const handleBorrowBook = (bookId) => {
    console.log("Borrowing book:", bookId);
    // Simulate borrow action
    setBooks((prev) => prev.map((b) => b.id === bookId ? { ...b, status: "Borrowed" } : b));
    setBorrowHistory((prev) => [...prev, { id: Date.now().toString(), title: books.find((b) => b.id === bookId)?.title, borrowDate: new Date().toISOString().split("T")[0], dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], returned: false, fine: 0 }]);
  };

  const handleReturnBook = (historyId) => {
    console.log("Returning book:", historyId);
    // Simulate return action
    setBorrowHistory((prev) => prev.map((h) => h.id === historyId ? { ...h, returned: true } : h));
  };

  const handlePayFine = (fineId) => {
    console.log("Paying fine:", fineId);
    // Simulate payment
    setFines((prev) => prev.map((f) => f.id === fineId ? { ...f, status: "Paid" } : f));
  };

  const handleAccessResource = (resourceId) => {
    console.log("Accessing digital resource:", resourceId);
  };

  const handleViewBookDetails = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleSubmitFeedback = (bookId, feedbackText) => {
    console.log("Submitting feedback for book:", bookId, feedbackText);
    setFeedback((prev) => prev.map((f) => f.id === bookId ? { ...f, feedback: feedbackText } : f));
  };

  const handleJoinStudyGroup = (groupId) => {
    console.log("Joining study group:", groupId);
  };

  const handleTrackProgress = (historyId, progress) => {
    console.log("Updating reading progress for:", historyId, progress);
    setReadingProgress((prev) => prev.map((p) => p.id === historyId ? { ...p, progress } : p));
  };

  // Unique Features for Academics and Skill Development
  const uniqueFeatures = [
    { id: "recommendations", title: "Personalized Book Recommendations", icon: <ThumbsUp size={16} />, description: "Get book suggestions based on your courses." },
    { id: "study-groups", title: "Study Group Matching", icon: <Group size={16} />, description: "Join or create study groups for library sessions." },
    { id: "feedback", title: "Book Feedback System", icon: <MessageSquare size={16} />, description: "Submit and view feedback on books." },
    { id: "progress-tracker", title: "Reading Progress Tracker", icon: <LucideTimer size={16} />, description: "Track your reading progress for borrowed books." },
    { id: "virtual-preview", title: "Virtual Book Preview", icon: <Scan size={16} />, description: "Preview book contents before borrowing." },
    { id: "skill-resources", title: "Skill Development Resources", icon: <Lightbulb size={16} />, description: "Access resources for soft skills and career development." },
    { id: "exam-kits", title: "Exam Preparation Kits", icon: <BookOpen size={16} />, description: "Curated books and resources for exam prep." },
  ];

  // Export handler for various tabs
  const handleExport = () => {
    const data = activeTab === "catalog" ? filteredBooks 
      : activeTab === "borrowhistory" ? filteredBorrowHistory 
      : activeTab === "fines" ? filteredFines 
      : activeTab === "digitalresources" ? filteredDigitalResources 
      : activeTab === "recommendations" ? filteredRecommendations 
      : activeTab === "study-groups" ? filteredStudyGroups 
      : activeTab === "feedback" ? filteredFeedback 
      : activeTab === "progress-tracker" ? filteredReadingProgress 
      : [];

    const headers = Object.keys(data[0] || {}).join(",");
    const csv = [
      headers,
      ...data.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JECRC_Library_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUniqueFeatureClick = (feature) => {
    console.log("Accessing unique feature:", feature.title);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold text-blue-900">Student Library Portal</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["catalog", "borrowhistory", "fines", "digitalresources", "analytics", "recommendations", "study-groups", "feedback", "progress-tracker", "virtual-preview", "skill-resources", "exam-kits"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "recommendations" && <ThumbsUp size={16} />}
            {tab === "study-groups" && <Group size={16} />}
            {tab === "feedback" && <MessageSquare size={16} />}
            {tab === "progress-tracker" && <LucideTimer size={16} />}
            {tab === "virtual-preview" && <Scan size={16} />}
            {tab === "skill-resources" && <Lightbulb size={16} />}
            {tab === "exam-kits" && <BookOpen size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Book Details */}
      {modalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">{selectedBook.title} - Book Details</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
            <p><strong>Type:</strong> {selectedBook.type}</p>
            <p><strong>Status:</strong> {selectedBook.status}</p>
            <p><strong>Category:</strong> {selectedBook.category}</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={() => handleBorrowBook(selectedBook.id)}
            >
              Borrow
            </button>
          </div>
        </div>
      )}

      {/* Catalog Section */}
      {activeTab === "catalog" && (
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
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Catalog
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">ISBN</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedBooks.length > 0 ? (
                  pagedBooks.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.author}</td>
                      <td className="p-2">{item.isbn}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleViewBookDetails(item)}
                        >
                          View Details
                        </button>
                        {item.status === "Available" && (
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => handleBorrowBook(item.id)}
                          >
                            Borrow
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
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

      {/* Borrow History Section */}
      {activeTab === "borrowhistory" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search borrow history..."
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
                  <th className="p-2">Title</th>
                  <th className="p-2">Borrow Date</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Returned</th>
                  <th className="p-2">Fine</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedBorrowHistory.length > 0 ? (
                  pagedBorrowHistory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.borrowDate}</td>
                      <td className="p-2">{item.dueDate}</td>
                      <td className="p-2">{item.returned ? "Yes" : "No"}</td>
                      <td className="p-2">₹{item.fine}</td>
                      <td className="p-2">
                        {!item.returned && (
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => handleReturnBook(item.id)}
                          >
                            Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No borrow history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredBorrowHistory.length)} of {filteredBorrowHistory.length} entries
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
                  <th className="p-2">Book</th>
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
                      <td className="p-2">{item.book}</td>
                      <td className="p-2">₹{item.amount}</td>
                      <td className="p-2">{item.dueDate}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => handlePayFine(item.id)}
                        >
                          Pay Fine
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

      {/* Digital Resources Section */}
      {activeTab === "digitalresources" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Resources
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
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
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.access}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleAccessResource(item.id)}
                        >
                          Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
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

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <BarChart2 size={20} className="mr-2 text-blue-900" /> Borrow Trend
            </h3>
            {borrowTrendData && borrowTrendData.labels && borrowTrendData.datasets && (
              <Line data={borrowTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <PieChartIcon size={20} className="mr-2 text-blue-900" /> Category Distribution
            </h3>
            {categoryDistributionData && categoryDistributionData.labels && categoryDistributionData.datasets && (
              <Pie data={categoryDistributionData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
            )}
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {activeTab === "recommendations" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search recommendations..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Recommendations
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedRecommendations.length > 0 ? (
                  pagedRecommendations.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewBookDetails(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No recommendations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredRecommendations.length)} of {filteredRecommendations.length} entries
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

      {/* Study Groups Section */}
      {activeTab === "study-groups" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search study groups..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Study Groups
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Book</th>
                  <th className="p-2">Members</th>
                  <th className="p-2">Meeting Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedStudyGroups.length > 0 ? (
                  pagedStudyGroups.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.book}</td>
                      <td className="p-2">{item.members}</td>
                      <td className="p-2">{item.meetingDate}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleJoinStudyGroup(item.id)}
                        >
                          Join
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No study groups found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredStudyGroups.length)} of {filteredStudyGroups.length} entries
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

      {/* Feedback Section */}
      {activeTab === "feedback" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search feedback..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Feedback
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Feedback</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFeedback.length > 0 ? (
                  pagedFeedback.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{books.find((b) => b.id === item.id)?.title}</td>
                      <td className="p-2">{item.feedback}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => console.log("Editing feedback for book:", item.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No feedback found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredFeedback.length)} of {filteredFeedback.length} entries
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

      {/* Progress Tracker Section */}
      {activeTab === "progress-tracker" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search progress..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Progress
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Progress (%)</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedReadingProgress.length > 0 ? (
                  pagedReadingProgress.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{borrowHistory.find((h) => h.id === item.id)?.title}</td>
                      <td className="p-2">{item.progress}%</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleTrackProgress(item.id, item.progress + 10)} // Simulate update
                        >
                          Update Progress
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No reading progress found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredReadingProgress.length)} of {filteredReadingProgress.length} entries
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

      {/* Virtual Preview Section */}
      {activeTab === "virtual-preview" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Scan size={20} className="mr-2 text-blue-900" /> Virtual Book Preview
          </h3>
          <p className="text-gray-600 mb-4">Preview book contents before borrowing.</p>
          {/* Simulate preview */}
          <div className="border border-gray-300 p-4 rounded">
            <p>Sample Preview Content...</p>
          </div>
        </div>
      )}

      {/* Skill Resources Section */}
      {activeTab === "skill-resources" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search skill resources..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Skill Resources
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedRecommendations.length > 0 ? (
                  pagedRecommendations.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleAccessResource(item.id)}
                        >
                          Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No skill resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredRecommendations.length)} of {filteredRecommendations.length} entries
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

      {/* Exam Kits Section */}
      {activeTab === "exam-kits" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-blue-900" /> Exam Preparation Kits
          </h3>
          <p className="text-gray-600 mb-4">Curated books and resources for exam preparation.</p>
          {/* Simulate kits */}
          <div className="border border-gray-300 p-4 rounded">
            <p>Kit for Semester 1: Recommended books and notes.</p>
          </div>
        </div>
      )}
    </div>
  );
}